/**
 * Before-and-after on one log axis: each row is a move from a value you pay
 * today to the value you'd pay after a switch. Plain SVG, rendered on the
 * server, coloured from the theme tokens.
 *
 * The "from" end is the emphasised one — the thing going away — with the halo
 * ring the scatter uses, so the two ends differ in shape as well as colour.
 */

export type DumbbellRow = {
  key: string;
  label: string;
  sublabel?: string;
  from: number;
  to: number;
  /** Set on one row only when every row moves to the same place. */
  toLabel?: string;
  /** The headline for the row, set at the right-hand edge. */
  note: string;
  tooltip: string;
};

const W = 680;
const ROW = 62;
const M = { top: 14, right: 126, bottom: 46, left: 150 };

export default function Dumbbell({
  rows,
  domain,
  ticks,
  format,
  axisLabel,
  ariaLabel,
}: {
  rows: DumbbellRow[];
  domain: [number, number];
  ticks: number[];
  format: (value: number) => string;
  axisLabel: string;
  ariaLabel: string;
}) {
  const H = M.top + rows.length * ROW + M.bottom;
  const [a, b] = domain.map(Math.log10);
  const sx = (v: number) =>
    M.left + ((Math.log10(v) - a) / (b - a)) * (W - M.left - M.right);
  const plotBottom = H - M.bottom;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className="block w-full min-w-[540px]"
    >
      <defs>
        <marker
          id="dumbbell-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-neutral-400" />
        </marker>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={sx(t)}
            x2={sx(t)}
            y1={M.top}
            y2={plotBottom}
            className="stroke-neutral-200"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <text
            x={sx(t)}
            y={plotBottom + 20}
            textAnchor="middle"
            className="fill-neutral-400 font-mono text-[11px] tabular-nums"
          >
            {format(t)}
          </text>
        </g>
      ))}
      <text
        x={(M.left + W - M.right) / 2}
        y={H - 6}
        textAnchor="middle"
        className="fill-neutral-500 font-mono text-[11px] tracking-wider uppercase"
      >
        {axisLabel}
      </text>

      {rows.map((row, i) => {
        const cy = M.top + i * ROW + ROW / 2;
        const x1 = sx(row.from);
        const x2 = sx(row.to);
        return (
          <g key={row.key} className="group">
            <title>{row.tooltip}</title>
            <rect
              x={0}
              y={cy - ROW / 2}
              width={W}
              height={ROW}
              fill="transparent"
            />
            <text
              x={M.left - 20}
              y={cy - (row.sublabel ? 6 : 0)}
              dy="0.32em"
              textAnchor="end"
              className="fill-neutral-900 text-[13px] font-semibold"
            >
              {row.label}
            </text>
            {row.sublabel && (
              <text
                x={M.left - 20}
                y={cy + 11}
                dy="0.32em"
                textAnchor="end"
                className="fill-neutral-500 font-mono text-[10.5px]"
              >
                {row.sublabel}
              </text>
            )}

            <line
              x1={x1 - 12}
              x2={x2 + 10}
              y1={cy}
              y2={cy}
              className="stroke-neutral-400 transition-colors group-hover:stroke-neutral-900"
              strokeWidth="1.5"
              markerEnd="url(#dumbbell-arrow)"
            />

            <circle
              cx={x1}
              cy={cy}
              r={11}
              fill="none"
              className="stroke-chart-emph"
              strokeWidth="1"
            />
            <circle
              cx={x1}
              cy={cy}
              r={6}
              className="fill-chart-emph stroke-neutral-50"
              strokeWidth="2"
            />
            <circle
              cx={x2}
              cy={cy}
              r={5}
              className="fill-chart-context stroke-neutral-50"
              strokeWidth="2"
            />

            {row.toLabel && (
              <text
                x={x2}
                y={cy - 16}
                textAnchor="middle"
                className="fill-neutral-600 text-[11.5px]"
              >
                {row.toLabel}
              </text>
            )}
            <text
              x={W - 4}
              y={cy}
              dy="0.32em"
              textAnchor="end"
              className="fill-neutral-900 font-serif text-[15px] italic tabular-nums"
            >
              {row.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
