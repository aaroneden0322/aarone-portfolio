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

  // .btn-glow (globals.css) declares its own `transition: box-shadow 0.4s
  // ease, transform 0.3s ease` and, being defined after Tailwind's
  // utilities layer, that shorthand wins the cascade outright — it
  // replaces transition-property entirely, silently dropping "opacity"
  // from what's animated. That's why the appear/disappear fade never
  // actually eased: only the slide (transform) was ever transitioning:
  // opacity was snapping instantly the whole time regardless of any
  // Tailwind duration-*/ease-* class. Fix: declare the transition inline
  // (highest specificity, wins over the .btn-glow class rule) so opacity
  // gets its own eased duration while box-shadow keeps its original
  // 0.4s hover-glow ramp and transform keeps pace with the fade.
  const fadeMs = pressed && visible ? 300 : 700;
  const transitionStyle = {
    transitionProperty: "opacity, transform, box-shadow",
    transitionDuration: `${fadeMs}ms, ${fadeMs}ms, 400ms`,
    transitionTimingFunction:
      "cubic-bezier(0, 0, 0.2, 1), cubic-bezier(0, 0, 0.2, 1), ease",
  };

  return (
    <a
      href="#contact"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={transitionStyle}
      className={`btn-glow fixed bottom-6 right-6 z-50 rounded-full bg-circuit px-6 py-3 text-sm font-semibold text-accent-ink shadow-lg shadow-circuit/20 md:hidden ${opacityClasses}`}
    >
      Fix My Bottleneck
    </a>
  );
}
