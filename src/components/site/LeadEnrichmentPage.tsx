import Nav from "./Nav";
import Footer from "./Footer";
import FloatingAction from "./FloatingAction";
import BackToTop from "./BackToTop";
import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import CtaBand from "./CtaBand";
import ProofGrid from "./ProofGrid";
import { LEAD_ENRICHMENT as D, MOCK_NOTICE } from "@/data/leadEnrichment";

export default function LeadEnrichmentPage() {
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
              <span className="font-semibold text-flow">MOCK DATA.</span>{" "}
              {MOCK_NOTICE}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {D.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-surface/[0.02] p-5"
                >
                  <p className="font-display text-2xl font-bold text-circuit">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              Figures come from test runs on fictional leads.
            </p>
          </Reveal>

          <Reveal delay={120}>
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
                How a lead moves through it
              </h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                {D.steps.map((s) => (
                  <li
                    key={s.n}
                    className="rounded-xl border border-circuit/25 bg-circuit/[0.04] p-5"
                  >
                    <p className="font-display text-sm font-semibold text-ink">
                      {s.n}. {s.title}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{s.body}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <p className="text-xs font-semibold tracking-[0.1em] text-ink-muted">
                  WHAT I THREW AT IT
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {D.testedAgainst.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-8">
          <Reveal>
            <GlowCard className="p-6 md:p-10">
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                What testing found
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {D.findings.map((f) => (
                  <div
                    key={f.headline}
                    className="rounded-xl border border-circuit/25 bg-circuit/[0.04] p-5"
                  >
                    <p className="font-display text-sm font-semibold text-ink">
                      {f.headline}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{f.body}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 font-display text-lg font-semibold text-ink">
                {D.cost.headline}
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-ink-muted">
                {D.cost.body}
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold text-ink">
                Limits worth knowing
              </h3>
              <ul className="mt-2 max-w-3xl list-disc space-y-2 pl-5 text-sm text-ink-muted">
                {D.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>

              <details className="group mt-8 rounded-xl border border-border px-5 py-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-circuit [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">+ Show technical detail</span>
                  <span className="hidden group-open:inline">- Hide technical detail</span>
                  <span className="ml-2 text-xs font-normal text-ink-muted">
                    for builders and technical reviewers
                  </span>
                </summary>
                <div className="mt-4 space-y-3 text-sm text-ink-muted">
                  {D.technical.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </details>

              <ProofGrid proof={D.proof} />
            </GlowCard>
          </Reveal>
        </section>

        <CtaBand text="Want lead follow-up automated without letting an AI send anything on its own?" />
      </main>
      <Footer />
      <FloatingAction />
      <BackToTop />
    </>
  );
}
