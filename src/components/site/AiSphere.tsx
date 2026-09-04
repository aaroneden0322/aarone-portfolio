"use client";

import { useEffect, useRef } from "react";

const MAX_OPACITY = 0.6;
// Distance (px) from any edge/corner of the Hero section within which the
// sphere ramps down to fully transparent, so it never gets visibly clipped
// by the section's overflow-hidden boundary.
const EDGE_FADE_PX = 140;

/**
 * A soft, glowing sphere that drifts toward the cursor while it's inside the
 * Hero section. Purely decorative: pointer-events-none throughout, sits
 * behind the Hero content in paint order, and fades out smoothly as the
 * cursor nears any edge or corner (rather than cutting off abruptly at the
 * boundary). Invisible when idle, and does nothing when the visitor prefers
 * reduced motion.
 */
export default function AiSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0.5, y: 0.5 });
  const currentPos = useRef({ x: 0.5, y: 0.5 });
  const targetOpacity = useRef(0);
  const currentOpacity = useRef(0);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const section = wrapRef.current?.closest("section");
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      targetPos.current = { x: px / rect.width, y: py / rect.height };

      // Fade proportionally to distance from the nearest edge/corner so the
      // glow never appears to hit a hard boundary.
      const distFromEdge = Math.min(px, rect.width - px, py, rect.height - py);
      const proximity = Math.max(
        0,
        Math.min(1, distFromEdge / EDGE_FADE_PX)
      );
      targetOpacity.current = MAX_OPACITY * proximity;
    };
    const handleLeave = () => {
      targetOpacity.current = 0;
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    const tick = () => {
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.05;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.05;
      currentOpacity.current +=
        (targetOpacity.current - currentOpacity.current) * 0.08;

      if (sphereRef.current) {
        sphereRef.current.style.left = `${currentPos.current.x * 100}%`;
        sphereRef.current.style.top = `${currentPos.current.y * 100}%`;
        sphereRef.current.style.opacity = String(currentOpacity.current);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", handleMove);
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
        className="absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{
          left: "50%",
          top: "50%",
          opacity: 0,
          background:
            "radial-gradient(circle, rgba(63,224,197,0.55) 0%, rgba(139,124,255,0.35) 45%, rgba(255,106,77,0.12) 70%, transparent 80%)",
        }}
      />
    </div>
  );
}
