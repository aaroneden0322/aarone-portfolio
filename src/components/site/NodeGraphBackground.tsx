"use client";

import { useEffect, useRef } from "react";

const BASE_NODE_COUNT = 90;
const MAX_DIST = 120;
const SPEED = 0.22;
const NODE_RADIUS_MIN = 1.2;
const NODE_RADIUS_MAX = 2.4;
const MOUSE_RADIUS = 160;
const MOUSE_REPEL_STRENGTH = 0.6;

type GraphNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Full-viewport, fixed, mouse-reactive node-graph background. Mounted once
 * in app/layout.tsx as the first child of <body>, sitting behind every
 * page's content (-z-10) — this replaces the old static dot-grid `body`
 * background in globals.css.
 *
 * Nodes drift slowly and connect to nearby nodes with faint lines; nodes
 * near the cursor are gently pushed away and gain a brighter accent line
 * back to the cursor. Colors are read live via getComputedStyle from the
 * site's real CSS custom properties (--color-ink-muted for nodes/lines,
 * --color-flow for the cursor accent), and re-read whenever the
 * data-theme attribute on <html> changes, so it re-colors correctly across
 * the dark/light toggle instead of hard-coding either palette.
 *
 * Fixed to the viewport (not the document), so cost stays constant
 * regardless of page length — same reasoning as AiSphere.tsx staying
 * scoped to its section, just applied at the viewport level here since
 * this layer spans the whole site. Does nothing when the visitor prefers
 * reduced motion, and cleans up all listeners/RAF/observers on unmount,
 * matching AiSphere.tsx's pattern.
 */
export default function NodeGraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: GraphNode[] = [];
    let rafId: number | undefined;

    // "R G B" triplets, matching how globals.css stores these tokens for
    // the rgb(var(--x) / <alpha-value>) pattern. Sensible dark-mode
    // fallbacks in case the read happens before styles are ready.
    const colors = {
      node: "147 160 181",
      line: "147 160 181",
      accent: "255 106 77",
    };

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const inkMuted = styles.getPropertyValue("--color-ink-muted").trim();
      const flow = styles.getPropertyValue("--color-flow").trim();
      if (inkMuted) {
        colors.node = inkMuted;
        colors.line = inkMuted;
      }
      if (flow) colors.accent = flow;
    };
    readColors();

    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale node count with viewport area (capped) so small/mobile
      // screens don't get an over-dense mesh.
      const area = width * height;
      const targetCount = Math.round(
        Math.min(BASE_NODE_COUNT, Math.max(40, area / 14000))
      );
      nodes = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r:
          NODE_RADIUS_MIN +
          Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0.01) {
            const force =
              ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_REPEL_STRENGTH;
            n.vx += (dx / dist) * force * 0.06;
            n.vy += (dy / dist) * force * 0.06;
          }
        }

        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.98;
        n.vy *= 0.98;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.strokeStyle = `rgb(${colors.line} / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.35;
            ctx.strokeStyle = `rgb(${colors.accent} / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgb(${colors.node} / 0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
      themeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen opacity-70"
    />
  );
}
