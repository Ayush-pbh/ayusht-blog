"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

const IDLE_MS = 60_000;
const REPORT_MS = 15_000;

/**
 * Best-effort engagement estimate, not proof that someone read the page.
 * Mounted once, in `SiteChrome`, with the current route as `path`.
 */
export default function ActiveReadingTime({ path }: { path: string }) {
  useEffect(() => {
    let lastActivity = performance.now();
    let lastTick = lastActivity;
    let pendingMs = 0;
    let active = document.visibilityState === "visible" && document.hasFocus();

    const report = () => {
      const seconds = Math.floor(pendingMs / 1000);
      if (seconds === 0) return;
      pendingMs -= seconds * 1000;
      // Each event is a delta, not a cumulative session total.
      track("active_reading_time", { path, seconds });
    };

    const tick = () => {
      const now = performance.now();
      if (active) {
        pendingMs += Math.max(
          0,
          Math.min(now, lastActivity + IDLE_MS) - lastTick,
        );
      }
      lastTick = now;
      if (pendingMs >= REPORT_MS) report();
    };

    const onActivity = () => {
      tick();
      lastActivity = performance.now();
    };

    const onStateChange = () => {
      tick();
      active = document.visibilityState === "visible" && document.hasFocus();
      if (active) lastActivity = performance.now();
      else report();
    };

    const onPageHide = () => {
      tick();
      active = false;
      report();
    };

    const events = [
      "scroll",
      "pointerdown",
      "pointermove",
      "keydown",
      "touchstart",
    ];
    events.forEach((event) =>
      window.addEventListener(event, onActivity, { passive: true }),
    );
    document.addEventListener("visibilitychange", onStateChange);
    window.addEventListener("focus", onStateChange);
    window.addEventListener("blur", onStateChange);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onStateChange);
    const interval = window.setInterval(tick, 1000);

    return () => {
      tick();
      report();
      window.clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, onActivity));
      document.removeEventListener("visibilitychange", onStateChange);
      window.removeEventListener("focus", onStateChange);
      window.removeEventListener("blur", onStateChange);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onStateChange);
    };
  }, [path]);

  return null;
}
