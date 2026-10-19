"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import IndexList, { type IndexEntry } from "@/components/IndexList";
import { cn } from "@/lib/utils";

export type TaggedEntry = IndexEntry & { tag?: string };

/**
 * The `/thoughts` list with a topic filter above it.
 *
 * The filter lives in `?tag=` so a link can land on one topic — the obvious
 * use is a post on X pointing at `/thoughts?tag=tech`. It is read once on mount
 * and written back with `replaceState`, deliberately not through the router:
 * a router navigation would fire the page-level view transition and crossfade
 * the whole article for what is only a change of filter.
 *
 * The server renders "All", so the full list is in the HTML for crawlers and
 * for anyone without JavaScript; a `?tag=` link narrows it after hydration.
 */
export default function ThoughtsIndex({
  entries,
  tags,
}: {
  entries: TaggedEntry[];
  tags: string[];
}) {
  const [active, setActive] = useState<string | null>(null);

  // One accent bar shared by every option, measured off the active button and
  // eased across to the next one — rather than each button drawing its own
  // underline and the mark jumping. `placed` stays false for the first
  // measurement so the bar appears where it belongs instead of sliding in.
  const group = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<{ x: number; y: number; w: number } | null>(
    null,
  );
  const [placed, setPlaced] = useState(false);

  useLayoutEffect(() => {
    const container = group.current;
    if (!container) return;
    const measure = () => {
      const button = container.querySelector<HTMLElement>(
        'button[aria-pressed="true"]',
      );
      if (!button) return;
      // offsetTop matters because the row wraps to two lines on a phone.
      setBar({
        x: button.offsetLeft,
        y: button.offsetTop + button.offsetHeight - 1,
        w: button.offsetWidth,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [active]);

  // A passive effect runs after the first placement has been painted, so the
  // transition switches on only from the second position onward. No rAF: it is
  // paused in background tabs, and the bar would never start animating.
  useEffect(() => {
    if (bar && !placed) setPlaced(true);
  }, [bar, placed]);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("tag");
    // Case-insensitive so ?tag=space and ?tag=Space agree; an unknown tag
    // quietly falls back to everything rather than an empty page.
    const match = tags.find(
      (tag) => tag.toLowerCase() === requested?.toLowerCase(),
    );
    if (match) setActive(match);
  }, [tags]);

  function select(tag: string | null) {
    setActive(tag);
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set("tag", tag.toLowerCase());
    else url.searchParams.delete("tag");
    window.history.replaceState(window.history.state, "", url);
  }

  const visible = active
    ? entries.filter((entry) => entry.tag === active)
    : entries;

  const options: { tag: string | null; label: string; count: number }[] = [
    { tag: null, label: "All", count: entries.length },
    ...tags.map((tag) => ({
      tag,
      label: tag,
      count: entries.filter((entry) => entry.tag === tag).length,
    })),
  ];

  return (
    <>
      <div
        ref={group}
        role="group"
        aria-label="Filter by topic"
        className="rise text-label relative mb-8 flex flex-wrap gap-x-6 gap-y-3 font-mono uppercase"
        style={{ "--rise-index": 1 } as React.CSSProperties}
      >
        {options.map((option) => {
          const isActive = option.tag === active;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(option.tag)}
              className={cn(
                // Preflight resets text-transform on <button>, so the
                // group's `uppercase` has to be restated here.
                "group flex cursor-pointer items-baseline gap-1.5 border-b border-transparent pb-1 uppercase transition-colors",
                isActive
                  ? // Until the shared bar is measured, the active button
                    // draws its own underline so there's never a frame
                    // without one.
                    cn("text-accent", !bar && "border-accent")
                  : "text-neutral-400 hover:text-neutral-900",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "tabular-nums transition-colors",
                  isActive
                    ? "text-accent/70"
                    : "text-neutral-300 group-hover:text-neutral-500",
                )}
              >
                {option.count}
              </span>
            </button>
          );
        })}

        {bar && (
          <span
            aria-hidden="true"
            className={cn(
              "bg-accent pointer-events-none absolute top-0 left-0 h-px",
              placed &&
                "motion-safe:transition-[transform,width] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
            )}
            style={{
              width: bar.w,
              transform: `translate(${bar.x}px, ${bar.y}px)`,
            }}
          />
        )}
      </div>

      <IndexList entries={visible} />
    </>
  );
}
