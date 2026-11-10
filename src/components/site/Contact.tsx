import Reveal from "./Reveal";
import CalEmbed from "./CalEmbed";
import { CONTACT_EMAIL } from "@/data/contact";

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
          outgrown doing it by hand? Tell me what&rsquo;s slowing you down and
          I&rsquo;ll give you an honest read on whether it&rsquo;s worth
          automating. It&rsquo;s a 30 minute call with no pitch and no
          obligation. Pick any time below, and it shows in your own time zone.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 max-w-3xl">
          <CalEmbed />
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
