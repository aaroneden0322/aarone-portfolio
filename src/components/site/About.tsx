import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const CARDS = [
  {
    title: "Architect the Spec",
    body: "AI-assisted pipelines turn your marketing strategy into a concrete, automation-ready blueprint.",
  },
  {
    title: "Build the Engine",
    body: "Backend logic built in n8n, Make, Zapier, or GoHighLevel — wired straight into the CRMs and tools your team already uses.",
  },
  {
    title: "Stress-Test, Then Hand Off",
    body: "Broken on purpose with bad data and edge cases before launch, then delivered as a playbook your team can run on day one.",
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
          I&rsquo;m Aarone Den Patayan, a Marketing &amp; AI Automation
          Specialist. Most of a project&rsquo;s value gets lost in the
          handoff between strategy and execution — so I treat resilience,
          testing, and documentation as core deliverables, not extras.
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
