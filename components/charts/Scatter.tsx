/**
 * A scatter plot drawn as plain SVG on the server: no chart library, no
 * JavaScript, colours from the theme tokens so it follows light and dark.
 *
 * Labels are placed by hand (`label`) because a dozen model names near each
 * other will always collide under any automatic rule, and the chart exists to
 * be screenshotted. Every point also carries a native tooltip.
 *
 * Emphasis points get a larger mark *and* a halo ring, so "retiring" is told
 * apart by shape as well as colour.
 */

import { cn } from "@/lib/utils";

export type ScatterPoint = {
  key: string;
  x: number;
  y: number;
  emphasis?: boolean;
  /** Text beside the point; omit to leave it to the tooltip. */
  label?: string;
  /** Where the label sits relative to the point. */
  side?: "right" | "left" | "above" | "below";
  /** Nudge in px after `side` places it. */
  dx?: number;
  dy?: number;
  tooltip: string;
};

type Axis = {
  domain: [number, number];
  ticks: number[];
  format: (value: number) => string;
  label: string;
  log?: boolean;
};

const W = 680;
const H = 430;
const M = { top: 20, right: 28, bottom: 58, left: 58 };

function scale(axis: Axis, from: number, to: number) {
  const [a, b] = axis.domain;
  const f = axis.log ? Math.log10 : (v: number) => v;
  return (v: number) => from + ((f(v) - f(a)) / (f(b) - f(a))) * (to - from);
}

export default function Scatter({
  points,
  x,
  y,
  arrow,
  ariaLabel,
}: {
  points: ScatterPoint[];
  x: Axis;
  y: Axis;
  /** A single annotated move between two points — the point of the chart. */
  arrow?: { from: string; to: string; text: string[]; bend?: number };
  ariaLabel: string;
}) {
  const sx = scale(x, M.left, W - M.right);
  const sy = scale(y, H - M.bottom, M.top);
  const at = (key: string) => {
    const p = points.find((point) => point.key === key);
    if (!p) throw new Error(`No point ${key}`);
    return { x: sx(p.x), y: sy(p.y) };
  };

  let arrowPath: { d: string; tx: number; ty: number } | null = null;
  if (arrow) {
    const a = at(arrow.from);
    const b = at(arrow.to);
    // Stop short of both marks so the arrow never sits on top of them.
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const ux = (b.x - a.x) / len;
    const uy = (b.y - a.y) / len;
    const start = { x: a.x + ux * 14, y: a.y + uy * 14 };
    const end = { x: b.x - ux * 16, y: b.y - uy * 16 };
    const bend = arrow.bend ?? 0.25;
    const mid = {
      x: (start.x + end.x) / 2 - uy * len * bend,
      y: (start.y + end.y) / 2 + ux * len * bend,
    };
    arrowPath = {
      d: `M ${start.x} ${start.y} Q ${mid.x} ${mid.y} ${end.x} ${end.y}`,
      tx: mid.x,
      ty: mid.y,
    };
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className="block w-full min-w-[540px] overflow-visible"
    >
      <defs>
        <marker
          id="scatter-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-chart-emph" />
        </marker>
      </defs>

      {/* Grid: recessive, so the marks carry the eye. */}
      {y.ticks.map((t) => (
        <g key={`y${t}`}>
          <line
            x1={M.left}
            x2={W - M.right}
            y1={sy(t)}
            y2={sy(t)}
            className="stroke-neutral-200"
            strokeWidth="1"
          />
          <text
            x={M.left - 10}
            y={sy(t)}
            dy="0.32em"
            textAnchor="end"
            className="fill-neutral-400 font-mono text-[11px] tabular-nums"
          >
            {y.format(t)}
          </text>
        </g>
      ))}
      {x.ticks.map((t) => (
        <g key={`x${t}`}>
          <line
            x1={sx(t)}
            x2={sx(t)}
            y1={M.top}
            y2={H - M.bottom}
            className="stroke-neutral-200"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <text
            x={sx(t)}
            y={H - M.bottom + 20}
            textAnchor="middle"
            className="fill-neutral-400 font-mono text-[11px] tabular-nums"
          >
            {x.format(t)}
          </text>
        </g>
      ))}
      <text
        x={(M.left + W - M.right) / 2}
        y={H - 12}
        textAnchor="middle"
        className="fill-neutral-500 font-mono text-[11px] tracking-wider uppercase"
      >
        {x.label}
      </text>
      <text
        transform={`translate(16 ${(M.top + H - M.bottom) / 2}) rotate(-90)`}
        textAnchor="middle"
        className="fill-neutral-500 font-mono text-[11px] tracking-wider uppercase"
      >
        {y.label}
      </text>

      {arrow && arrowPath && (
        <g>
          <path
            d={arrowPath.d}
            fill="none"
            className="stroke-chart-emph"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            markerEnd="url(#scatter-arrow)"
          />
          {arrow.text.map((line, i) => (
            <text
              key={line}
              x={arrowPath.tx}
              y={arrowPath.ty + i * 16}
              dy="-0.4em"
              textAnchor="middle"
              className="fill-neutral-900 font-serif text-[15px] italic"
            >
              {line}
            </text>
          ))}
        </g>
      )}

      {/* Context first, emphasis last, so the subject always paints on top. */}
      {[...points]
        .sort((a, b) => Number(!!a.emphasis) - Number(!!b.emphasis))
        .map((p) => {
          const cx = sx(p.x);
          const cy = sy(p.y);
          const r = p.emphasis ? 6 : 4.5;
          const gap = r + 7;
          const side = p.side ?? "right";
          const lx =
            cx +
            (side === "right" ? gap : side === "left" ? -gap : 0) +
            (p.dx ?? 0);
          const ly =
            cy +
            (side === "above" ? -gap : side === "below" ? gap + 8 : 0) +
            (p.dy ?? 0);
          const anchor =
            side === "right" ? "start" : side === "left" ? "end" : "middle";
          return (
            <g key={p.key} className="group">
              <title>{p.tooltip}</title>
              {p.emphasis && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={11}
                  fill="none"
                  className="stroke-chart-emph"
                  strokeWidth="1"
                />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                className={cn(
                  p.emphasis ? "fill-chart-emph" : "fill-chart-context",
                  "stroke-neutral-50 transition-[r] duration-200 group-hover:[r:8]",
                )}
                strokeWidth="2"
              />
              {/* A hit target bigger than the mark, for the tooltip. */}
              <circle cx={cx} cy={cy} r={14} fill="transparent" />
              {p.label && (
                <text
                  x={lx}
                  y={ly}
                  dy="0.32em"
                  textAnchor={anchor}
                  className={
                    p.emphasis
                      ? "fill-neutral-900 text-[12.5px] font-semibold"
                      : "fill-neutral-600 text-[12px]"
                  }
                >
                  {p.label}
                </text>
              )}
            </g>
          );
        })}
    </svg>
  );
}
