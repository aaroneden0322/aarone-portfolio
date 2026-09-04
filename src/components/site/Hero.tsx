import Reveal from "./Reveal";
import NodeDivider from "./NodeDivider";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="drift-blob pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-volt/20 blur-3xl" />
      <div
        className="drift-blob pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-flow/10 blur-3xl"
        style={{ animationDelay: "2.4s" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-8 pt-16 md:grid-cols-2 md:items-center md:pt-24">
        <Reveal delay={150} className="order-first md:order-last">
          <div className="relative mx-auto w-full max-w-[160px] sm:max-w-sm">
            <div
              aria-hidden="true"
              className="hero-glow pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-circuit/25 via-volt/15 to-flow/15 blur-2xl"
            />
            <div className="aspect-[2/3] w-full overflow-hidden rounded-3xl border border-border bg-surface/[0.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.jpg"
                alt="Aarone Den Patayan"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="order-last md:order-first">
          <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
            AARONE DEN PATAYAN
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">
            Automations that hold up when it counts — because I break them
            first.
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-ink-muted">
            I build automation systems in n8n, Make, Zapier, and GoHighLevel
            — then stress-test each one against real failure cases before you
            ever see it.
          </p>
          <p className="mt-4 max-w-xl text-ink-muted">
            Lead routing, billing and dunning, multi-step nurture sequences —
            built for founders and marketing teams who need something that
            works the first time a real customer hits it wrong. Every build
            gets broken on purpose with malformed data, timeouts, and edge
            cases before it ever reaches your business, so the failure modes
            get found on my time, not yours.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="#laneframe"
              className="btn-glow rounded-full bg-circuit px-6 py-3 text-center text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03] sm:w-auto"
            >
              See the Laneframe build
            </a>
            <a
              href="#contact"
              className="btn-glow relative rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-circuit/60 sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute -inset-2 -z-10 rounded-full bg-circuit/20 blur-lg"
              />
              Fix My Bottleneck
            </a>
          </div>
        </Reveal>
      </div>

      <NodeDivider />
    </section>
  );
}
