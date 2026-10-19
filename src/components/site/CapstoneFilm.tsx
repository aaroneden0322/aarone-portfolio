"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FILM_BLOCKS,
  FILM_CHAPTERS,
  FILM_DURATION,
  FILM_LINES,
} from "@/data/laneframe/film";

/**
 * Front-of-page film for the Laneframe capstone. Two MP4s, one per theme
 * (rendered from the storify-ad film). Nothing downloads until the visitor
 * presses play. Chapter chips jump the video and link to the proof further
 * down the page; when the film ends, the proof button is offered again.
 * Styles live in capstone.css (.film-*), because this block sits inside the
 * capstone's dark panel in both site themes.
 */
const BASE = "/laneframe/film";
type Theme = "dark" | "light";

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

export default function CapstoneFilm() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [active, setActive] = useState(-1);
  const video = useRef<HTMLVideoElement>(null);
  // Where to resume after the video element is (re)created.
  const resume = useRef<{ t: number; play: boolean } | null>(null);

  useEffect(() => {
    setTheme(readTheme());
    const mo = new MutationObserver(() => {
      const next = readTheme();
      const v = video.current;
      // Keep a pending resume if the previous swap has not loaded yet.
      if (v && !resume.current)
        resume.current = { t: v.currentTime, play: !v.paused && !v.ended };
      setTheme(next);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  const onMeta = useCallback(() => {
    const v = video.current;
    const r = resume.current;
    if (!v || !r) return;
    resume.current = null;
    if (r.t > 0) v.currentTime = r.t;
    if (r.play) v.play().catch(() => {});
  }, []);

  const play = useCallback((at?: number) => {
    setEnded(false);
    if (!started) {
      resume.current = { t: at ?? 0, play: true };
      setStarted(true);
      return;
    }
    const v = video.current;
    if (!v) return;
    if (at !== undefined) v.currentTime = at;
    v.play().catch(() => {});
  }, [started]);

  const onTime = () => {
    const v = video.current;
    if (!v) return;
    let i = -1;
    FILM_CHAPTERS.forEach((c, j) => {
      if (v.currentTime >= c.start - 0.05) i = j;
    });
    setActive(i);
  };

  const mins = fmt(FILM_DURATION);

  return (
    <section id="film" className="film" aria-labelledby="film-title">
      <p className="film-kicker">Watch first</p>
      <p id="film-title" className="film-title">
        The whole build in under three minutes
      </p>
      <p className="film-sub">
        A sample business, not a real client. The walkthrough covers the job, the four
        builds, the break tests and the results. The proof it comes from is
        further down this page.
      </p>

      <div className="film-player">
        {started ? (
          <video
            key={theme}
            ref={video}
            className="film-video"
            controls
            playsInline
            preload="metadata"
            autoPlay={false}
            poster={`${BASE}/poster-${theme}.webp`}
            onLoadedMetadata={onMeta}
            onTimeUpdate={onTime}
            onEnded={() => setEnded(true)}
            onPlay={() => setEnded(false)}
            aria-label="Video walkthrough: one job built on four automation tools, then five break tests run on each. A sample business, not a real client."
          >
            <source src={`${BASE}/film-${theme}.mp4`} type="video/mp4" />
            <track
              kind="captions"
              src={`${BASE}/captions.vtt`}
              srcLang="en"
              label="English captions"
            />
          </video>
        ) : (
          <button
            type="button"
            className="film-poster"
            onClick={() => play()}
            aria-label={`Play the walkthrough, ${mins}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="film-img film-img-dark"
              src={`${BASE}/poster-dark.webp`}
              alt=""
              width={1280}
              height={720}
              loading="lazy"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="film-img film-img-light"
              src={`${BASE}/poster-light.webp`}
              alt=""
              width={1280}
              height={720}
              loading="lazy"
            />
            <span className="film-play">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4l13 8-13 8z" />
              </svg>
              <span>
                Play the walkthrough <b>{mins}</b>
              </span>
            </span>
          </button>
        )}

        {ended && (
          <div className="film-end">
            <p>The proof is on this page.</p>
            <div>
              <a className="film-btn" href="#s2">
                See the real proof
              </a>
              <button type="button" className="film-btn-ghost" onClick={() => play(0)}>
                Watch again
              </button>
            </div>
          </div>
        )}
      </div>

      <ol className="film-chapters">
        {FILM_CHAPTERS.map((c, i) => (
          <li key={c.name} data-active={active === i || undefined}>
            <button type="button" onClick={() => play(c.start)}>
              <span className="film-chap-name">{c.name}</span>
              <span className="film-chap-time">{fmt(c.start)}</span>
            </button>
            <span className="film-chap-proof">
              {c.proof.map((p) => (
                <a key={p.href} href={p.href}>
                  {p.label} <span aria-hidden="true">↓</span>
                </a>
              ))}
            </span>
          </li>
        ))}
      </ol>

      <div className="film-actions">
        <a className="film-btn" href="#s2">
          See the real proof
        </a>
        <p>
          Screenshots and findings from each build:{" "}
          <a href="/laneframe/n8n">n8n</a>, <a href="/laneframe/make">Make</a>,{" "}
          <a href="/laneframe/zapier">Zapier</a>,{" "}
          <a href="/laneframe/gohighlevel">GoHighLevel</a>
        </p>
      </div>

      <details className="film-transcript">
        <summary>Read the transcript</summary>
        {FILM_BLOCKS.map((b) => (
          <div key={b.heading}>
            <h4>
              {b.heading} <span>{fmt(b.start)}</span>
            </h4>
            {b.items.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        ))}
        <div>
          <h4>The story, line by line</h4>
          {FILM_LINES.map((l) => (
            <p key={l.start}>
              <span className="film-t">{fmt(l.start)}</span> <b>{l.who}:</b>{" "}
              {l.text}
            </p>
          ))}
        </div>
      </details>
    </section>
  );
}
