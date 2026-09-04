"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft, glowing sphere that drifts toward the cursor while it's inside the
 * Hero section. Purely decorative: pointer-events-none throughout, sits
 * behind the Hero content in paint order, fades in/out on hover so it's
 * invisible when idle, and does nothing when the visitor prefers reduced
 * motion.
 */
export default function AiSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = wrapRef.current?.closest("section");
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    const handleEnter = () => setActive(true);
    const handleLeave = () => setActive(false);

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseenter", handleEnter);
    section.addEventListener("mouseleave", handleLeave);

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;
      if (sphereRef.current) {
        sphereRef.current.style.left = `${current.current.x * 100}%`;
        sphereRef.current.style.top = `${current.current.y * 100}%`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseenter", handleEnter);
      section.removeEventListener("mouseleave", handleLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        ref={sphereRef}
        className={`absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] transition-opacity duration-700 ease-out ${
          active ? "opacity-60" : "opacity-0"
        }`}
        style={{
          left: "50%",
          top: "50%",
          background:
            "radial-gradient(circle, rgba(63,224,197,0.55) 0%, rgba(139,124,255,0.35) 45%, rgba(255,106,77,0.12) 70%, transparent 80%)",
        }}
      />
    </div>
  );
}
