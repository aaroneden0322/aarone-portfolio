import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const CASES = [
  {
    n: "01",
    title: "AI Customer-Service Agent, With a Human in the Loop",
    body: "A knowledge-grounded AI agent that answers customer questions accurately — and knows when to say 'I don't know' and hand off to a person. Every AI-drafted reply passes human review before it reaches a real customer, tested against a 12-question boundary set that includes near-misses designed to tempt a confident wrong answer.",
    tags: ["AI Agents", "Human-in-the-Loop"],
    status: "Write-up coming",
  },
  {
    n: "02",
    title: "Multi-Prompt Strategy Document Pipeline",
    body: "A five-prompt generation pipeline that assembles a full GoHighLevel strategy document — tagging conventions applied systematically rather than re-generated per client, output styled in each client's own brand colors, not mine.",
    tags: ["GoHighLevel", "AI Content Pipeline"],
    status: "Write-up coming",
  },
  {
    n: "03",
    title: "More Case Studies Coming Soon",
    body: "This spot's reserved for the next build. Check back soon, or get in touch if you'd like to be the one who fills it.",
    tags: [] as string[],
    status: null,
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          MORE WORK
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Additional Case Studies
        </h2>
        <p className="mt-4 text-ink-muted">
          A closer look at two recent builds, with more on the way.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.n} delay={i * 100}>
            <GlowCard className="flex h-full flex-col p-6">
              <p className="text-xs font-semibold text-ink-muted">{c.n}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink-muted">{c.body}</p>
              {c.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {c.status && (
                <p className="mt-4 text-xs font-semibold text-flow">
                  {c.status}
                </p>
              )}
              <a
                href="#contact"
                className="mt-3 text-sm font-medium text-circuit hover:underline"
              >
                View case study →
              </a>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
