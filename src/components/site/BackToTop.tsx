"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const opacityClasses = !visible
    ? "pointer-events-none translate-y-4 opacity-0"
    : pressed
      ? "translate-y-0 opacity-100"
      : "translate-y-0 opacity-60";

  const fadeMs = pressed && visible ? 300 : 700;
  const transitionStyle = {
    transitionProperty: "opacity, transform, box-shadow",
    transitionDuration: `${fadeMs}ms, ${fadeMs}ms, 400ms`,
    transitionTimingFunction:
      "cubic-bezier(0, 0, 0.2, 1), cubic-bezier(0, 0, 0.2, 1), ease",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      aria-label="Back to top"
      style={transitionStyle}
      className={`btn-glow fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-circuit text-accent-ink shadow-lg shadow-circuit/20 ${opacityClasses}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
