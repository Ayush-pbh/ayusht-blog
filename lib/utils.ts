import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The type scale in `app/globals.css` adds sizes tailwind-merge has never
 * heard of. Left to guess, it files `text-title` under text-colour, and then
 * a later `text-neutral-900` in the same `cn()` call silently deletes the
 * size. Teaching it the five names is what keeps `cn()` safe to use on
 * anything that carries one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["2xs", "label", "body", "lede", "title", "display"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
