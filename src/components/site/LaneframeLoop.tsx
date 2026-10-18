"use client";

import { useEffect, useRef } from "react";

/**
 * 20-second looping summary of the Laneframe build (rendered with Remotion,
 * source in the vault under portfolio-site/hero-video). Two MP4s, one per
 * theme; CSS (.lf-loop-*) shows the one matching <html data-theme>. Nothing
 * downloads until the video is near the screen, only the visible theme's file
 * loads, it pauses off-screen, and visitors who prefer reduced motion get the
 * still image with controls instead of autoplay.
 */
export default function LaneframeLoop() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const videos = Array.from(root.querySelectorAll("video"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    const sync = () => {
      for (const v of videos) {
        const shown = getComputedStyle(v).display !== "none";
        v.controls = reduce.matches;
        if (inView && shown && !reduce.matches) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(root);

    // Re-run when the theme toggle flips data-theme.
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    reduce.addEventListener("change", sync);

    return () => {
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const common = {
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none" as const,
    width: 1280,
    height: 720,
    "aria-label":
      "Animated summary: one job built on four automation tools, then five break tests run on each, with every number measured or shown with its formula.",
  };

  return (
    <div
      ref={wrap}
      className="mt-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-bg"
    >
      <video
        {...common}
        className="lf-loop-dark block aspect-video h-auto w-full"
        poster="/laneframe/loop/poster-dark.webp"
      >
        <source src="/laneframe/loop/loop-dark.mp4" type="video/mp4" />
      </video>
      <video
        {...common}
        className="lf-loop-light block aspect-video h-auto w-full"
        poster="/laneframe/loop/poster-light.webp"
      >
        <source src="/laneframe/loop/loop-light.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
