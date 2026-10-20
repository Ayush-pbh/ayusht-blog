import { cn } from "@/lib/utils";

/**
 * The frame every chart sits in. The claim is written above the plot and the
 * source below it, inside the same <figure>, so a screenshot shared on its own
 * still says what it shows and where the numbers came from.
 *
 * `legend` is optional — a single-series chart doesn't need one. `table` is the
 * same data as a plain table behind a native <details>, so nothing depends on
 * reading colour or hovering a mark.
 */
export default function ChartFigure({
  title,
  subtitle,
  legend,
  source,
  table,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  legend?: { label: string; emphasis?: boolean }[];
  source: React.ReactNode;
  table?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "my-12 border-y border-neutral-200 py-6 xl:-mx-6 xl:px-6",
        className,
      )}
    >
      <p className="font-serif text-lg leading-snug text-neutral-900">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-neutral-500">
          {subtitle}
        </p>
      )}

      {legend && (
        <ul className="text-label mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-neutral-500 uppercase">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                aria-hidden="true"
              >
                {item.emphasis && (
                  <circle
                    cx="9"
                    cy="9"
                    r="8"
                    fill="none"
                    className="stroke-chart-emph"
                    strokeWidth="1"
                  />
                )}
                <circle
                  cx="9"
                  cy="9"
                  r={item.emphasis ? 5 : 4}
                  className={
                    item.emphasis ? "fill-chart-emph" : "fill-chart-context"
                  }
                />
              </svg>
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {/* Wide enough to read on a phone by scrolling, rather than shrinking
          the labels to nothing. */}
      <div className="xs:mr-0 xs:pr-0 mt-3 -mr-5 overflow-x-auto pr-5">
        {children}
      </div>

      <figcaption className="text-label mt-3 font-mono text-neutral-400 uppercase">
        {source}
      </figcaption>

      {table && (
        <details className="group mt-3">
          <summary className="text-label cursor-pointer font-mono text-neutral-500 uppercase transition-colors hover:text-neutral-900">
            Show the numbers
          </summary>
          <div className="mt-3 overflow-x-auto">{table}</div>
        </details>
      )}
    </figure>
  );
}
