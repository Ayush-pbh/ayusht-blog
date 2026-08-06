"use client";

import { useEffect, useRef, useState } from "react";

export type Theme = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Must match the 1s in the `.theme-transition` rule in globals.css. */
const TRANSITION_MS = 1000;

const ORDER: Theme[] = ["system", "light", "dark"];

function next(theme: Theme): Theme {
  return ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
}

/**
 * Cycles system → light → dark. "system" removes the attribute entirely so the
 * `prefers-color-scheme` block in globals.css takes back over; the other two
 * set `data-theme` on <html>, which the ramp overrides key off.
 *
 * The blocking script in `app/layout.tsx` applies the stored choice before
 * first paint — this component only handles the click and the label.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  // The server has no way to know the stored choice, so the label starts at
  // "system" and corrects on mount. Readers who never touched it see no change.
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  // The two <meta name="theme-color"> tags are scoped by prefers-color-scheme,
  // so an override would otherwise leave mobile browser chrome on the system
  // colour. Whichever tag the device matches now carries the resolved colour.
  useEffect(() => {
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => {
        meta.content = resolved === "dark" ? "#13120f" : "#faf9f5";
      });
  }, [theme]);

  function cycle() {
    const chosen = next(theme);
    const root = document.documentElement;
    setTheme(chosen);

    root.classList.add("theme-transition");
    // Transitions are resolved against the style *before* the change, so the
    // class has to be live in its own style recalc — otherwise the browser sees
    // "no transition -> new colour" and snaps. Reading offsetWidth forces that
    // flush. Removing this line is what breaks the fade.
    void root.offsetWidth;

    if (chosen === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
      delete root.dataset.theme;
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, chosen);
      root.dataset.theme = chosen;
    }

    // Restarts on a rapid second click rather than stripping the class mid-fade.
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      timeout.current = null;
    }, TRANSITION_MS);
  }

  const label = `Theme: ${theme}. Switch to ${next(theme)}.`;

  return (
    <button
      onClick={cycle}
      aria-label={label}
      title={label}
      className="cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900"
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}

/**
 * A moon phase: hollow for light, half for system, full for dark. Lives here
 * rather than in `icons/` because the shape is state, not a static asset.
 * Everything is `currentColor`, so the button's hover carries the icon with it.
 */
function ThemeIcon({ theme }: { theme: Theme }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="inline-block h-3.5 w-3.5 align-middle"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        fill={theme === "dark" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
      />
      {theme === "system" && (
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      )}
    </svg>
  );
}
