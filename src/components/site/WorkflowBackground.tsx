/**
 * Faint "workflow moving from node to node" background layer. Reuses the
 * existing purge-safe `dashflow` (animated dash-offset) and `pulse-dot`
 * (pulsing node) keyframes already registered in tailwind.config.js and
 * already consumed via literal `animate-dashflow` / `node-dot` classes in
 * NodeDivider.tsx — no new keyframes are introduced here, only inline
 * `animationDuration` / `animationDelay` / `animationDirection` overrides
 * to slow the same animations down into an ambient background instead of
 * NodeDivider's fast in-content flow line. This keeps Tailwind's
 * content-based purge from ever having a reason to drop them (see the
 * purge-safety note on `.reveal` in globals.css).
 *
 * Render this as the first child of a `relative overflow-hidden` section,
 * with the section's real content wrapped in its own `relative` element
 * so it paints on top (same pattern as the drift-blobs in Hero.tsx).
 */
export default function WorkflowBackground({
  className = "",
}: {
  className?: string;
}) {
  const nodes = [
    { cx: 80, cy: 90 },
    { cx: 340, cy: 45 },
    { cx: 620, cy: 130 },
    { cx: 900, cy: 60 },
    { cx: 1130, cy: 150 },
    { cx: 220, cy: 330 },
    { cx: 520, cy: 385 },
    { cx: 820, cy: 305 },
    { cx: 1080, cy: 400 },
  ];

  const paths = [
    "M80,90 C200,45 260,45 340,45",
    "M340,45 C460,45 540,110 620,130",
    "M620,130 C760,160 820,70 900,60",
    "M900,60 C990,50 1050,100 1130,150",
    "M220,330 C340,290 420,340 520,385",
    "M520,385 C640,420 720,320 820,305",
    "M820,305 C930,285 990,340 1080,400",
    "M80,90 C140,200 180,270 220,330",
    "M620,130 C645,220 585,300 520,385",
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1200 450"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-circuit opacity-[0.09]"
      >
        {paths.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            className="animate-dashflow"
            style={{
              animationDuration: `${9 + (i % 4) * 1.5}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={`${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r={4}
            fill="currentColor"
            className="node-dot"
            style={{ animationDelay: `${i * 0.35}s`, animationDuration: "5s" }}
          />
        ))}
      </svg>
    </div>
  );
}
