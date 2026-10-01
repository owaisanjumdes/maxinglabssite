import { Play } from "./Icons";

/**
 * Stand-ins for real YouTube Studio screenshots.
 *
 * Rendered as SVG/CSS with plausible data rather than grey placeholder boxes,
 * so the page reads as proof-driven from day one. When you have the real
 * screenshots, swap these for next/image inside the same slots.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Smooths a 0-100 series into a bezier path across a 100x40 viewBox. */
function buildPath(data: number[]) {
  const max = Math.max(...data, 1);
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 40 - (value / max) * 34 - 2,
  }));

  let line = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    line += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  const area = `${line} L 100 40 L 0 40 Z`;
  return { line, area, last: points[points.length - 1] };
}

export function AnalyticsPanel({
  uid,
  data,
  metric = "Views",
  value,
  delta,
  className = "",
}: {
  uid: string;
  data: number[];
  metric?: string;
  value: string;
  delta: string;
  className?: string;
}) {
  const { line, area, last } = buildPath(data);
  const gradientId = `grad-${uid}`;

  return (
    <div
      className={`overflow-hidden rounded-[7px] border border-warm bg-surface ${className}`}
    >
      {/* Studio-style chrome */}
      <div className="flex items-center justify-between border-b border-warm px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-[11px] font-semibold tracking-[-0.01em] text-ink">
            Channel analytics
          </span>
        </div>
        <span className="text-[10px] font-medium text-body/45">Last 12 months</span>
      </div>

      <div className="px-4 pt-4">
        <p className="text-[11px] font-medium text-body/55">{metric}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="display text-[26px] sm:text-[30px]">{value}</span>
          <span className="text-[12px] font-semibold text-success">{delta}</span>
        </div>
      </div>

      <div className="relative px-1 pt-3">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="h-28 w-full sm:h-32"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.30" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[10, 20, 30].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="var(--border-subtle)"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={area} fill={`url(#${gradientId})`} />
          <path
            d={line}
            fill="none"
            stroke="var(--accent-text)"
            strokeWidth="1.6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={last.x} cy={last.y} r="2.2" fill="var(--accent-text)" />
        </svg>
      </div>

      <div className="flex justify-between px-4 pb-3.5 pt-1">
        {[0, 3, 6, 9, 11].map((i) => (
          <span key={i} className="text-[9px] font-medium text-body/35">
            {MONTHS[i]}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Compact inline trend line, no chrome. */
export function Sparkline({ uid, data }: { uid: string; data: number[] }) {
  const { line, area } = buildPath(data);
  const gradientId = `spark-${uid}`;

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="h-12 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--success)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--success)"
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Placeholder video thumbnail. Deterministic tint per index so the grid looks
 * designed rather than random. Replace with next/image when real ones land.
 */
export function ThumbnailTile({
  index,
  title,
  duration = "11:42",
  views = "84K views",
  className = "",
}: {
  index: number;
  title: string;
  duration?: string;
  views?: string;
  className?: string;
}) {
  const tints = [
    "from-[#07080F] to-[#1D254C]",
    "from-[#0B0E1C] to-[#272742]",
    "from-[#071861] to-[#1D254C]",
    "from-[#07080F] to-[#272742]",
    "from-[#0B0E1C] to-[#1D254C]",
    "from-[#071861] to-[#3150CB]",
  ];

  return (
    <figure className={`w-[236px] shrink-0 sm:w-[268px] ${className}`}>
      <div
        className={`relative aspect-video overflow-hidden rounded-[7px] bg-gradient-to-br ${
          tints[index % tints.length]
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <Play className="ml-[1px] h-3.5 w-3.5 text-white" />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {duration}
        </span>
      </div>
      <figcaption className="mt-2.5">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] text-body/50">{views}</p>
      </figcaption>
    </figure>
  );
}
