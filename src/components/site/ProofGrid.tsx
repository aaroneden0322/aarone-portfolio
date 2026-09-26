"use client";

import { useEffect, useState } from "react";
import type { BuildProof } from "@/data/laneframe/types";

export default function ProofGrid({ proof }: { proof: BuildProof[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? proof[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  if (proof.length === 0) return null;

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

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm md:p-10"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-ink hover:border-circuit/40 hover:text-circuit"
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
            className="max-h-full max-w-4xl overflow-hidden rounded-xl border border-border bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[80vh] w-full object-contain"
            />
            <figcaption className="border-t border-border bg-surface/[0.02] px-4 py-3 text-sm text-ink-muted">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
