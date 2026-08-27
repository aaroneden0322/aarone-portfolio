"use client";

export default function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={handleMove}
      className={`glow-card rounded-2xl border border-border bg-white/[0.02] ${className}`}
    >
      {children}
    </div>
  );
}
