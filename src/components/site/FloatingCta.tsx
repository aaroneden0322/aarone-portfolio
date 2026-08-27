"use client";

import { useEffect, useState } from "react";

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Real native window scroll — do not route this through any
      // smooth-scroll wrapper, and don't call scrollTo() to test it.
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#contact"
      className={`fixed bottom-6 right-6 z-50 rounded-full bg-circuit px-6 py-3 text-sm font-semibold text-bg shadow-lg shadow-circuit/20 transition-all duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      Let&rsquo;s talk
    </a>
  );
}
