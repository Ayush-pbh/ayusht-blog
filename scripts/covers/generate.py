#!/usr/bin/env python3
"""Generate the cover illustrations for /thoughts posts.

Reads the art direction in `art-direction.json` (one concept, prompt and alt text
per slug), asks Gemini Nano Banana 2.1 on Vertex AI for each image, and writes a
1200x630 WebP to `public/images/thoughts/<slug>.webp` — the size `PostHeader`
and the OG card both expect.

Auth is Application Default Credentials: point GOOGLE_APPLICATION_CREDENTIALS at
a service-account key before running. Needs `gcloud`, `ffmpeg` and `cwebp`.

    GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \\
      python3 scripts/covers/generate.py [--only slug ...] [--force]

The untouched model output is kept under --raw-dir so a crop or an encode can
be redone without paying for the image again.
"""

import argparse
import base64
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ART_DIRECTION = ROOT / "scripts/covers/art-direction.json"
OUT_DIR = ROOT / "public/images/thoughts"

MODEL = "gemini-nano-banana-2.1"
# Nano Banana 2.1 is served from the global location only.
ENDPOINT = (
    "https://aiplatform.googleapis.com/v1/projects/{project}/locations/global"
    f"/publishers/google/models/{MODEL}:generateContent"
)

# The model has no 1.91:1 option. 16:9 is the nearest, and the prompts keep the
# subject away from the edges, so a centred crop to 1200x630 loses only sky.
ASPECT = "16:9"
WIDTH, HEIGHT = 1200, 630


def access_token() -> str:
    return subprocess.run(
        ["gcloud", "auth", "application-default", "print-access-token"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()


def project_id() -> str:
    key = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not key:
        sys.exit("Set GOOGLE_APPLICATION_CREDENTIALS to a service-account key.")
    return json.loads(Path(key).read_text())["project_id"]


def generate(prompt: str, token: str, project: str) -> bytes:
    body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": ASPECT, "imageSize": "2K"},
        },
    }
    request = urllib.request.Request(
        ENDPOINT.format(project=project),
        data=json.dumps(body).encode(),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    for attempt in range(4):
        try:
            with urllib.request.urlopen(request, timeout=240) as response:
                data = json.load(response)
            break
        except urllib.error.HTTPError as error:
            # 429 and 5xx are worth waiting out; anything else is a real fault.
            if error.code in (429, 500, 503) and attempt < 3:
                time.sleep(15 * (attempt + 1))
                continue
            raise RuntimeError(f"HTTP {error.code}: {error.read().decode()[:500]}")

    for part in data["candidates"][0]["content"]["parts"]:
        if "inlineData" in part:
            return base64.b64decode(part["inlineData"]["data"])
    reason = data["candidates"][0].get("finishReason")
    raise RuntimeError(f"no image in response (finishReason={reason})")


def encode(raw: Path, out: Path) -> None:
    """Centre-crop to 1.905:1, Lanczos down to 1200x630, WebP at quality 86."""
    staged = raw.with_suffix(".1200.png")
    subprocess.run(
        [
            "ffmpeg", "-y", "-loglevel", "error", "-i", str(raw), "-vf",
            f"crop=iw:iw*{HEIGHT}/{WIDTH},scale={WIDTH}:{HEIGHT}:flags=lanczos",
            str(staged),
        ],
        check=True,
    )
    # sharp_yuv keeps the halftone dots from bleeding colour into each other.
    subprocess.run(
        ["cwebp", "-quiet", "-q", "86", "-m", "6", "-sharp_yuv", str(staged), "-o", str(out)],
        check=True,
    )
    staged.unlink()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*", help="slugs to (re)generate")
    parser.add_argument("--force", action="store_true", help="regenerate existing images")
    parser.add_argument("--raw-dir", default="/tmp/covers-raw", help="where model output is kept")
    args = parser.parse_args()

    entries = json.loads(ART_DIRECTION.read_text())
    if args.only:
        entries = [entry for entry in entries if entry["slug"] in args.only]
    raw_dir = Path(args.raw_dir)
    raw_dir.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    project, token = project_id(), access_token()
    for entry in entries:
        slug = entry["slug"]
        out = OUT_DIR / f"{slug}.webp"
        if out.exists() and not args.force:
            print(f"skip  {slug} (exists)")
            continue
        raw = raw_dir / f"{slug}.png"
        try:
            raw.write_bytes(generate(entry["prompt"], token, project))
            encode(raw, out)
            print(f"ok    {slug}  {out.stat().st_size // 1024} KB")
        except Exception as error:  # keep going; report every failure at the end
            print(f"FAIL  {slug}: {error}")


if __name__ == "__main__":
    main()
