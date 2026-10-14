import Nav from "./Nav";
import Footer from "./Footer";
import FloatingAction from "./FloatingAction";
import BackToTop from "./BackToTop";
import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import CtaBand from "./CtaBand";
import { PIPELINE as D, PIPELINE_NOTICE } from "@/data/strategyPipeline";

export default function StrategyPipelinePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-5xl px-6 py-8">
          <Reveal>
            <a
              href="/#work"
              className="text-sm font-medium text-circuit hover:underline"
            >
              ← Back to case studies
            </a>
            <p className="mt-6 font-display text-sm font-semibold tracking-[0.15em] text-circuit">
              {D.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-ink md:text-4xl">
              {D.title}
            </h1>
            <p className="mt-4 max-w-2xl text-ink-muted">{D.tagline}</p>
            <p className="mt-6 max-w-3xl rounded-xl border border-flow/40 bg-flow/[0.06] p-4 text-sm text-ink-muted">
              <span className="font-semibold text-flow">READ THIS FIRST.</span>{" "}
              {PIPELINE_NOTICE}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {D.why.map((w) => (
                <div
                  key={w.label}
                  className="rounded-2xl border border-border bg-surface/[0.02] p-5"
                >
                  <p className="font-display text-sm font-semibold text-ink">
                    {w.label}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{w.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-8">
          <Reveal>
            <GlowCard className="p-6 md:p-10">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                What stays the same every time
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {D.rules.map((r) => (
                  <div
                    key={r.headline}
                    className="rounded-xl border border-border p-5"
                  >
                    <p className="font-display text-sm font-semibold text-ink">
                      {r.headline}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{r.body}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-8">
          <Reveal>
            <GlowCard className="p-6 md:p-10">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                What I have checked
              </h2>
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-ink-muted">
                {D.testing.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <h3 className="mt-8 font-display text-lg font-semibold text-ink">
                Limits worth knowing
              </h3>
              <ul className="mt-2 max-w-3xl list-disc space-y-2 pl-5 text-sm text-ink-muted">
                {D.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        </section>

        <CtaBand text="Want a marketing automation plan built on a process that is checked, not improvised?" />
      </main>
      <Footer />
      <FloatingAction />
      <BackToTop />
    </>
  );
}
