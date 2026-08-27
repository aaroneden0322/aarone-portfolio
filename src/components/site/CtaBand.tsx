import Reveal from "./Reveal";

export default function CtaBand({ text }: { text: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <div className="rounded-3xl border border-border bg-white/[0.02] px-8 py-14 text-center">
          <p className="mx-auto max-w-2xl font-display text-2xl font-semibold text-ink md:text-3xl">
            {text}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-circuit px-7 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
          >
            Let&rsquo;s talk
          </a>
        </div>
      </Reveal>
    </section>
  );
}
