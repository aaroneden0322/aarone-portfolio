"use client";

import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// "Chat with Aarone's assistant". Talks only to /api/chat (the thin Vercel
// gate), never to n8n. All rules about what the assistant may say live in the
// n8n workflow; this component only shows the conversation.

type Role = "assistant" | "user";
type Msg = { role: Role; text: string; verdict?: string };

type ApiReply = {
  type: string;
  reply: string;
  verdict: string;
  ended: boolean;
  sessionId?: string;
  sessionToken?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const PRIVACY_URL =
  process.env.NEXT_PUBLIC_ASSISTANT_PRIVACY_URL || "/privacy";
const STORAGE_KEY = "assistant-chat-v1";
const MAX_CHARS = 500;

const OPENING =
  "I'm an AI assistant on Aarone Den Patayan's site. I can tell you what he has built and help you work out whether a task is worth automating. I can't give prices or promise anything on his behalf. Please don't share passwords or customer data.";
const ERROR_TEXT = "Something went wrong on my side. Try again, or use the contact form.";

function linkify(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /https:\/\/www\.adautoteam\.top[^\s)]*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    const url = m[0].replace(/[.,;:!?]+$/, "");
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={`l${i++}`}
        href={url}
        className="font-medium text-circuit underline underline-offset-2 hover:opacity-80"
      >
        {url.replace("https://www.adautoteam.top", "") || "adautoteam.top"}
      </a>
    );
    last = m.index + url.length;
    re.lastIndex = last;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function readStore(): { sessionId: string; token: string; msgs: Msg[]; ended: boolean } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d || !Array.isArray(d.msgs) || typeof d.sessionId !== "string") return null;
    return { sessionId: d.sessionId, token: String(d.token || ""), msgs: d.msgs, ended: !!d.ended };
  } catch {
    return null;
  }
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: OPENING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [ended, setEnded] = useState(false);

  const sessionRef = useRef<{ id: string; token: string }>({ id: "", token: "" });
  const tokenRef = useRef<string>("");
  const tokenWaiters = useRef<Array<(t: string) => void>>([]);
  const widgetId = useRef<string>("");
  const tsHost = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Show the launcher after the hero; hide it near the Contact section, which
  // has its own form. Native scroll only, same as the pill it replaces.
  useEffect(() => {
    function onScroll() {
      setPastHero(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const contactEl = document.getElementById("contact");
    let observer: IntersectionObserver | undefined;
    if (contactEl) {
      observer = new IntersectionObserver(([e]) => setNearContact(e.isIntersecting), {
        rootMargin: "0px 0px -15% 0px",
        threshold: 0,
      });
      observer.observe(contactEl);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  // Restore an in-progress chat after a refresh in the same tab.
  useEffect(() => {
    const s = readStore();
    if (s && s.msgs.length) {
      sessionRef.current = { id: s.sessionId, token: s.token };
      setMsgs(s.msgs);
      setEnded(s.ended);
    }
  }, []);

  const persist = useCallback((m: Msg[], e: boolean) => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          sessionId: sessionRef.current.id,
          token: sessionRef.current.token,
          msgs: m.slice(-30),
          ended: e,
        })
      );
    } catch {
      /* storage unavailable: chat still works for this page view */
    }
  }, []);

  // Load Turnstile only once the panel is first opened.
  useEffect(() => {
    if (!open || !SITE_KEY || widgetId.current) return;
    function mount() {
      if (!window.turnstile || !tsHost.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(tsHost.current, {
        sitekey: SITE_KEY,
        appearance: "interaction-only",
        callback: (t: string) => {
          tokenRef.current = t;
          tokenWaiters.current.splice(0).forEach((w) => w(t));
        },
        "expired-callback": () => {
          tokenRef.current = "";
        },
        "error-callback": () => {
          tokenRef.current = "";
        },
      });
    }
    if (window.turnstile) {
      mount();
      return;
    }
    const existing = document.getElementById("cf-turnstile-script");
    if (existing) {
      existing.addEventListener("load", mount);
      return () => existing.removeEventListener("load", mount);
    }
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = mount;
    document.head.appendChild(s);
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }

  function waitForToken(): Promise<string> {
    if (tokenRef.current) return Promise.resolve(tokenRef.current);
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(""), 15000);
      tokenWaiters.current.push((t) => {
        clearTimeout(timer);
        resolve(t);
      });
    });
  }

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy || ended) return;
    const next: Msg[] = [...msgs, { role: "user", text }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    let finalMsgs = next;
    let finalEnded = false;
    let blocked = false;
    try {
      const payload: Record<string, unknown> = {
        message: text,
        page: window.location.href.split("#")[0],
      };
      const firstMessage = !sessionRef.current.id;
      if (firstMessage) {
        payload.turnstileToken = SITE_KEY ? await waitForToken() : "";
      } else {
        payload.sessionId = sessionRef.current.id;
        payload.sessionToken = sessionRef.current.token;
      }
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ApiReply;
      if (firstMessage) {
        tokenRef.current = "";
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      }
      if (data.sessionId && data.sessionToken) {
        sessionRef.current = { id: data.sessionId, token: data.sessionToken };
      }
      finalEnded = data.ended === true;
      blocked = data.type === "blocked";
      finalMsgs = [
        ...next,
        {
          role: "assistant",
          text: data.reply || ERROR_TEXT,
          verdict: data.type === "verdict" && data.verdict !== "none" ? data.verdict : undefined,
        },
      ];
    } catch {
      finalMsgs = [...next, { role: "assistant", text: ERROR_TEXT }];
    }
    setMsgs(finalMsgs);
    setEnded(finalEnded);
    setBusy(false);
    // A "blocked" reply (paused, daily cap, turn limit) is shown for this view
    // but not remembered, so a visitor who comes back after the assistant is
    // switched on again is not stuck on an ended chat. The limits themselves
    // are enforced server side, so forgetting the chat cannot dodge them.
    if (blocked) {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      sessionRef.current = { id: "", token: "" };
    } else {
      persist(finalMsgs, finalEnded);
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  const showLauncher = !open && (pastHero && !nearContact);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`btn-glow fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-circuit px-5 py-3 text-sm font-semibold text-accent-ink shadow-lg shadow-circuit/20 transition-[opacity,transform] duration-500 ${
          showLauncher
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        tabIndex={showLauncher ? 0 : -1}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.5a.5.5 0 0 1-.8-.4V16.2A2.5 2.5 0 0 1 4 13.5v-8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Chat with Aarone&apos;s assistant
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Aarone's assistant"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="fixed inset-x-3 bottom-3 z-50 flex h-[min(80vh,600px)] flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl shadow-black/40 md:inset-x-auto md:bottom-6 md:right-6 md:w-[390px]"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-ink">
                Aarone&apos;s assistant
              </span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                AI
              </span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-ink-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-circuit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed"
          >
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 ${
                    m.role === "user"
                      ? "bg-circuit/15 text-ink"
                      : "border border-border bg-surface/5 text-ink"
                  }`}
                >
                  {m.verdict && (
                    <span className="mb-1.5 inline-block rounded-full bg-circuit/20 px-2 py-0.5 text-xs font-semibold text-circuit">
                      {m.verdict}
                    </span>
                  )}
                  {m.verdict && <br />}
                  {m.role === "assistant" ? linkify(m.text) : m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start" role="status" aria-label="The assistant is typing">
                <div className="rounded-2xl border border-border bg-surface/5 px-3.5 py-2.5 text-ink-muted">
                  <span className="motion-safe:animate-pulse">Thinking…</span>
                </div>
              </div>
            )}
          </div>

          <div ref={tsHost} className="px-4 empty:hidden" />

          {ended ? (
            <div className="border-t border-border px-4 py-3 text-sm text-ink-muted">
              This chat has ended.{" "}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="font-medium text-circuit underline underline-offset-2"
              >
                Use the contact form
              </a>{" "}
              to reach Aarone.
            </div>
          ) : (
            <form onSubmit={send} className="border-t border-border px-3 py-3">
              <label htmlFor="assistant-input" className="sr-only">
                Your message
              </label>
              <div className="flex items-end gap-2">
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={onKeyDown}
                  rows={2}
                  maxLength={MAX_CHARS}
                  placeholder="Ask about Aarone's work, or describe a task"
                  className="min-h-[44px] flex-1 resize-none rounded-xl border border-border bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-circuit focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy || input.trim().length === 0}
                  className="rounded-xl bg-circuit px-4 py-2.5 text-sm font-semibold text-accent-ink disabled:opacity-40"
                >
                  Send
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-muted">
                <span>
                  AI assistant. Don&apos;t share passwords or customer data. Messages are
                  deleted after 30 days.
                  {PRIVACY_URL && (
                    <>
                      {" "}
                      <a href={PRIVACY_URL} className="underline underline-offset-2">
                        Privacy note
                      </a>
                    </>
                  )}
                </span>
                {input.length > 400 && <span>{input.length}/{MAX_CHARS}</span>}
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
