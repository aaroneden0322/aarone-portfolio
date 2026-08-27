export default function NodeDivider() {
  return (
    <div className="relative mx-auto my-16 h-px w-full max-w-6xl px-6" aria-hidden="true">
      <svg
        className="absolute left-0 top-1/2 h-6 w-full -translate-y-1/2 overflow-visible"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="12"
          x2="100%"
          y2="12"
          stroke="#3FE0C5"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="animate-dashflow"
        />
        <circle cx="4%" cy="12" r="5" fill="#3FE0C5" className="node-dot" />
        <circle cx="62%" cy="12" r="5" fill="#3FE0C5" className="node-dot" style={{ animationDelay: "1.1s" }} />
      </svg>
    </div>
  );
}
