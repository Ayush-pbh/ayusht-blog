import fs from "fs";
import path from "path";

const WORDS_PER_MINUTE = 200;

/** Read once per slug per build — the source file cannot change mid-render. */
const cache = new Map<string, number | undefined>();

/**
 * Estimates a post's reading time from its own source file.
 *
 * Posts here are React components rather than markdown, so there is no body
 * text to measure — the prose only exists as JSX children. This strips the
 * code away (imports, tags, attributes, expressions) and counts what is left,
 * which is the sentences a reader actually reads, plus footnote content, which
 * they also read.
 *
 * It runs at build time: every `/thoughts/<slug>` page is statically
 * prerendered, so the file is on disk when this is called. Anything that could
 * call it from a serverless render gets `undefined` and omits the label rather
 * than failing.
 */
export function estimateReadingTime(slug: string): number | undefined {
  if (cache.has(slug)) return cache.get(slug);

  let minutes: number | undefined;

  try {
    const source = fs.readFileSync(
      path.join(process.cwd(), "app", "thoughts", slug, "page.tsx"),
      "utf8",
    );

    const prose = source
      .replace(/^import[\s\S]*?from\s+["'][^"']+["'];?$/gm, "")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(
        /\b(?:className|href|src|alt|id|meta)=(?:"[^"]*"|\{[^}]*\})/g,
        "",
      )
      .replace(/<[^>]*>/g, " ")
      .replace(/\{[^{}]*\}/g, " ")
      // Latin-only on purpose: tsconfig targets es5, where the `u` flag and
      // \p{…} classes are unavailable. Stray non-Latin words cost a word each.
      .replace(/[^A-Za-z0-9'’-]+/g, " ")
      .trim();

    const words = prose ? prose.split(/\s+/).length : 0;
    minutes = words
      ? Math.max(1, Math.round(words / WORDS_PER_MINUTE))
      : undefined;
  } catch {
    minutes = undefined;
  }

  cache.set(slug, minutes);
  return minutes;
}
