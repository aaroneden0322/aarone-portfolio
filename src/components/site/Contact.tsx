import Reveal from "./Reveal";
import { CONTACT_EMAIL, BOOKING_URL } from "@/data/contact";

export default function Contact() {
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
          Got a system that keeps breaking, or marketing work that&rsquo;s
          outgrown doing it by hand? Pick a time and we&rsquo;ll talk it
          through.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 max-w-2xl rounded-2xl border border-border p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-ink">
            Book a 30 minute intro call
          </h3>
          <p className="mt-3 text-ink-muted">
            Tell me what&rsquo;s slowing you down. I&rsquo;ll give you an
            honest read on whether it&rsquo;s worth automating and what the
            next step would be. There&rsquo;s no pitch and no obligation. You
            can pick any time that suits you, and the booking page shows it in
            your own time zone.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow mt-6 inline-block rounded-full bg-circuit px-8 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
          >
            Book a call
          </a>
          <p className="mt-8 text-sm text-ink-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all font-medium text-circuit underline underline-offset-2 hover:opacity-80"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            I keep contact details for up to 12 months after we last speak.{" "}
            <a
              href="/privacy"
              className="text-circuit underline underline-offset-2"
            >
              Read the privacy note
            </a>
            .
          </p>
        </div>
      </Reveal>
    </section>
  );
}
