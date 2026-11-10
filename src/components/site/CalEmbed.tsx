"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING_URL } from "@/data/contact";

// Inline Cal.com booking calendar. Nothing is requested from Cal.com until
// the visitor scrolls near it, so page load stays free of third-party calls.
// The calendar follows the site's light/dark theme (data-theme on <html>).

function currentTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export default function CalEmbed() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(currentTheme());
    const mo = new MutationObserver(() => setTheme(currentTheme()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = `${BOOKING_URL}?embed=true&layout=month_view&theme=${theme}`;

  return (
    <div ref={hostRef}>
      <div className="h-[720px] w-full overflow-hidden rounded-xl border border-border bg-bg md:h-[680px]">
        {near ? (
          <iframe
            key={theme}
            src={src}
            title="Book a 30 minute intro call with Aarone"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-muted">
            Loading the calendar...
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-ink-muted">
        Calendar not loading?{" "}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-circuit underline underline-offset-2 hover:opacity-80"
        >
          Open the booking page
        </a>
        .
      </p>
    </div>
  );
}
