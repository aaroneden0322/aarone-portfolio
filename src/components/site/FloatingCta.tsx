"use client";

import { useEffect, useState } from "react";

export default function FloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Real native window scroll — do not route this through any
      // smooth-scroll wrapper, and don't call scrollTo() to test it.
      setPastHero(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // The Contact section has its own real "Send Message" CTA, and the
    // Footer follows right after it — the floating pill is redundant
    // (and visually overlaps the QR code / footer links) from that point
    // on, so hide it as soon as Contact starts entering the viewport.
    const contactEl = document.getElementById("contact");
    let observer: IntersectionObserver | undefined;
    if (contactEl) {
      observer = new IntersectionObserver(
        ([entry]) => setNearContact(entry.isIntersecting),
        { rootMargin: "0px 0px -15% 0px", threshold: 0 }
      );
      observer.observe(contactEl);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !nearContact;

  // Idle it sits semi-opaque (so page content scrolling underneath stays
  // legible, like iOS's AssistiveTouch button) and brightens to fully
  // opaque on touch/press — it doesn't relocate, just dims/undims.
  const opacityClasses = !visible
    ? "pointer-events-none translate-y-4 opacity-0"
    : pressed
      ? "translate-y-0 opacity-100"
      : "translate-y-0 opacity-60";

  return (
    <a
      href="#contact"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={`btn-glow fixed bottom-6 right-6 z-50 rounded-full bg-circuit px-6 py-3 text-sm font-semibold text-accent-ink shadow-lg shadow-circuit/20 transition-all duration-300 md:hidden ${opacityClasses}`}
    >
      Fix My Bottleneck
    </a>
  );
}
