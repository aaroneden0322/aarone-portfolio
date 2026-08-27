import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const CARDS = [
  {
    title: "Patch-based iterative delivery",
    body: "Builds ship in small, reviewable changes instead of one big handoff. Each patch is tested and confirmed working before the next one starts, so problems surface early and stay easy to trace.",
  },
  {
    title: "Zero-knowledge-loss handoffs",
    body: "Every session ends with a written handoff — decisions made, what's still open, what to check next — so context never has to be re-explained or rediscovered between sessions, platforms, or people.",
  },
  {
    title: "Execution-ready outputs",
    body: "Specs and playbooks are written for the person who has to actually build them: exact steps, named inputs, no guesswork. If a number isn't measured yet, it's marked unmeasured — never estimated.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          ABOUT
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          How I Work
        </h2>
        <p className="mt-6 max-w-3xl text-ink-muted">
          I&rsquo;m Aarone Den Patayan, a marketing &amp; AI specialist. I
          build multi-prompt AI pipelines that turn a business&rsquo;s
          marketing strategy into automation-ready specs — then build the
          automation itself, on whichever platform fits the job: n8n, Make,
          Zapier, or GoHighLevel, wired into the CRMs, databases, and
          messaging tools a team already runs on, like HubSpot, Postgres,
          Airtable, and Slack. From there I operationalize those specs into
          playbooks, copy, and dashboards a real team can execute against.
          Most of the value gets lost at the handoff between strategy and
          build — so I treat documentation and testing as part of the
          deliverable, not an afterthought.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <GlowCard className="h-full p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-ink-muted">{c.body}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
