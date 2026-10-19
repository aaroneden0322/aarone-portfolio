"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "The same lead, four different meters": one guard-halted lead, counted the
 * way each platform counts it. The numbers are the page's own (section 4):
 * 1 Zapier task, 4 Make credits, 1 n8n execution, 2 GoHighLevel premium items.
 * The units are different things, so the pips are not drawn to compare sizes.
 */
const LANES = [
  { id: "z", name: "Zapier", unit: "task", n: 1 },
  { id: "m", name: "Make", unit: "credits", n: 4 },
  { id: "n", name: "n8n", unit: "execution", n: 1 },
  { id: "g", name: "GoHighLevel", unit: "premium items", n: 2 },
] as const;

export default function CapstoneMeters() {
  const root = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState<number[]>([0, 0, 0, 0]);
  const [run, setRun] = useState(0);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const start = () => {
    clear();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLit(LANES.map((l) => l.n));
      return;
    }
    setLit([0, 0, 0, 0]);
    let at = 350;
    LANES.forEach((l, li) => {
      for (let p = 1; p <= l.n; p++) {
        timers.current.push(
          window.setTimeout(
            () =>
              setLit((prev) => prev.map((v, i) => (i === li ? p : v))),
            at,
          ),
        );
        at += 420;
      }
      at += 260;
    });
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="meters card">
      <p className="meters-kicker">The same lead, four different meters</p>
      <p className="meters-sub">A lead that the guard check stops early.</p>
      <div className="meters-grid">
        {LANES.map((l, li) => (
          <div key={l.id} className={`meter meter-${l.id}`}>
            <p className="meter-name">{l.name}</p>
            <p className="meter-count" aria-live="off">
              <b>{lit[li]}</b> <span>{lit[li] === 1 && l.unit === "credits" ? "credit" : l.unit}</span>
            </p>
            <div className="meter-pips" aria-hidden="true">
              {Array.from({ length: l.n }).map((_, p) => (
                <i key={p} data-on={lit[li] > p || undefined} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="meters-note">
        The same guard-halted lead cost 1 Zapier task, 4 Make credits, 1 n8n
        execution or 2 GoHighLevel premium items, so plan prices alone
        don&rsquo;t compare the platforms. A task, a credit, an execution and a
        premium item are different things, so these counts are not a ranking.
        (Zapier is 1 task, or 3 if two Formatter steps bill.)
      </p>
      <button
        type="button"
        className="film-btn-ghost"
        onClick={() => {
          setRun((r) => r + 1);
          start();
        }}
        data-run={run}
      >
        Replay
      </button>
    </div>
  );
}
