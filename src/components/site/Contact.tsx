"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const CONTACT_EMAIL = "automate@aarone.adautoteam.top";
const WEBHOOK_URL = "https://n8n.adautoteam.top/webhook/portfolio-contact-form";

const WEBMAIL_LINKS = [
  {
    label: "Gmail",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`,
  },
  {
    label: "Outlook",
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${CONTACT_EMAIL}`,
  },
  {
    label: "Yahoo",
    href: `https://compose.mail.yahoo.com/?to=${CONTACT_EMAIL}`,
  },
  {
    label: "Proton Mail",
    href: `https://mail.proton.me/u/0/inbox?compose=new&to=${CONTACT_EMAIL}`,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Non-200 response");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          CONTACT
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Let&rsquo;s Talk
        </h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          Have a build that needs stress-testing, or a marketing system
          that&rsquo;s outgrown manual work? Tell me what you&rsquo;re dealing
          with — I&rsquo;ll get back to you within 24 hours.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm text-ink-muted">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface/[0.03] px-4 py-3 text-ink outline-none focus:border-circuit/60"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-ink-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface/[0.03] px-4 py-3 text-ink outline-none focus:border-circuit/60"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-ink-muted">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full resize-y rounded-lg border border-border bg-surface/[0.03] px-4 py-3 text-ink outline-none focus:border-circuit/60"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-glow w-full rounded-full bg-circuit px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send My Message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-circuit">
                Thanks — I&rsquo;ll get back to you within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-flow">
                Something went wrong sending that — email me directly instead
                at {CONTACT_EMAIL}.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={100}>
          <div className="h-full rounded-2xl border border-border p-6">
            <p className="text-sm text-ink-muted">
              Prefer email? Reach me directly and skip the form.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block break-all font-display text-lg font-semibold text-circuit hover:underline"
            >
              {CONTACT_EMAIL}
            </a>

            <p className="mt-6 text-xs font-semibold tracking-widest text-ink-muted">
              MOBILE APP → EMAIL ME
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn-glow rounded-full border border-border px-4 py-2 text-sm text-ink hover:border-circuit/60"
              >
                Email Me
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-glow rounded-full border border-border px-4 py-2 text-sm text-ink hover:border-circuit/60"
              >
                {copied ? "Copied!" : "Copy address"}
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold tracking-widest text-ink-muted">
              WEBMAIL → COMPOSE IN YOUR BROWSER
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {WEBMAIL_LINKS.map((w) => (
                <a
                  key={w.label}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow rounded-full border border-border px-4 py-2 text-sm text-ink hover:border-circuit/60"
                >
                  {w.label}
                </a>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qr-email.png"
                alt="QR code to email Aarone"
                className="h-20 w-20 rounded-md border border-border bg-white p-1"
              />
              <p className="text-xs font-semibold tracking-widest text-ink-muted">
                SCAN TO EMAIL ME
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
