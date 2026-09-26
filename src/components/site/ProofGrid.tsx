"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { BuildProof } from "@/data/laneframe/types";

export default function ProofGrid({ proof }: { proof: BuildProof[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const active = openIndex !== null ? proof[openIndex] : null;
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("keydown", onKeyDown);

    // iOS Safari ignores `overflow: hidden` on the body while a touch
    // scroll is already happening, so the page behind the modal keeps
    // moving. Locking with `position: fixed` (and restoring the exact
    // scroll offset on close) is the reliable cross-browser fix.
    scrollYRef.current = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };
    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [openIndex]);

  if (proof.length === 0) return null;

  const lightbox = active && (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setOpenIndex(null)}
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-bg/90 p-4 backdrop-blur-sm md:flex md:items-center md:justify-center md:p-10"
    >
      <button
        type="button"
        onClick={() => setOpenIndex(null)}
        aria-label="Close"
        className="fixed right-4 top-4 z-[61] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-ink shadow-lg backdrop-blur hover:border-circuit/40 hover:text-circuit"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
      <figure
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-8 max-w-full overflow-hidden rounded-xl border border-border bg-surface md:my-0 md:max-w-4xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active.src}
          alt={active.alt}
          className="max-h-[75vh] w-full object-contain"
        />
        <figcaption className="border-t border-border bg-surface/[0.02] px-4 py-3 text-sm text-ink-muted">
          {active.caption}
        </figcaption>
      </figure>
      <p className="pointer-events-none fixed inset-x-0 bottom-4 text-center text-xs text-ink-muted/70 md:hidden">
        Pinch to zoom · tap outside or press Esc to close
      </p>
    </div>
  );

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {proof.map((p, i) => (
          <figure
            key={p.src}
            className="overflow-hidden rounded-xl border border-border"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Zoom in: ${p.alt}`}
              className="block w-full cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" className="w-full" />
            </button>
            <figcaption className="border-t border-border bg-surface/[0.02] px-4 py-3 text-xs text-ink-muted">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Rendered through a portal straight into <body>: the card grid
          above sits inside a Reveal wrapper, and Reveal's entrance
          animation leaves a non-"none" `transform` on that ancestor
          permanently. A `transform` on any ancestor creates a new
          containing block for `position: fixed` descendants, which was
          trapping this dialog inside the card instead of covering the
          full viewport — the real cause of it feeling broken/unscrollable
          on mobile. Escaping via a portal sidesteps that entirely. */}
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
