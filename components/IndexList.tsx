import Link from "next/link";
import { cn } from "@/lib/utils";

export type IndexEntry = {
  key: string;
  href: string;
  title: string;
  description?: string;
  date: string;
  badges?: string[];
};

/**
 * The index shared by `/thoughts` and `/projects`: one ruled row per entry,
 * title in the text face, the promise underneath it, the date held right in
 * mono. Rows carry their own position so they can rise into place in sequence
 * (`.rise` in globals.css, which is inert under reduced motion).
 */
export default function IndexList({
  entries,
  className,
}: {
  entries: IndexEntry[];
  className?: string;
}) {
  return (
    <div className={cn("-mx-3", className)}>
      {entries.map((entry, index) => (
        <Link
          key={entry.key}
          href={entry.href}
          style={{ "--rise-index": index + 1 } as React.CSSProperties}
          className="rise group block border-t border-neutral-200 px-3 py-5 transition-colors last:border-b hover:bg-neutral-100/60"
        >
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="group-hover:text-accent font-serif text-lg leading-snug text-neutral-900 transition-colors">
              {entry.title}
              {entry.badges?.map((badge) => (
                <span
                  key={badge}
                  className="text-label ml-2 align-middle font-mono text-neutral-400 uppercase"
                >
                  {badge}
                </span>
              ))}
            </h2>
            <time className="text-label shrink-0 font-mono text-neutral-400 uppercase tabular-nums">
              {entry.date}
            </time>
          </div>
          {entry.description && (
            <p className="mt-2 max-w-[54ch] text-[0.875rem] leading-relaxed text-neutral-500">
              {entry.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
