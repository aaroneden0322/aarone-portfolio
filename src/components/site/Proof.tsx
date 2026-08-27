import Reveal from "./Reveal";

const STATS = [
  {
    value: "12/12",
    label: "Adversarial probes passed",
    body: "The most recent AI agent build — a knowledge-grounded customer-service agent — tested against answerable, undocumented, and near-miss questions designed to tempt a confident wrong answer.",
  },
  {
    value: "0",
    label: "Platforms benchmarked independently",
    body: "The flagship automation build is being built separately on n8n, Make, Zapier, and GoHighLevel — same specification, measured honestly, nothing cherry-picked.",
  },
  {
    value: "0",
    label: "Invented numbers",
    body: "Every stat on this site is either measured during a real build or a named formula. Unmeasured is marked unmeasured — never estimated.",
  },
];

export default function Proof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          PROOF
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Measured, Not Just Claimed
        </h2>
        <p className="mt-4 text-ink-muted">
          No client testimonials yet — here&rsquo;s what&rsquo;s actually been
          verified instead.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div className="h-full rounded-2xl border border-border p-6">
              <p className="font-display text-3xl font-bold text-circuit">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">{s.label}</p>
              <p className="mt-3 text-sm text-ink-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
