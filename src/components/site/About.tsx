import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const CARDS = [
  {
    title: "Plan It",
    body: "I turn your marketing plan into a clear, step-by-step build plan.",
  },
  {
    title: "Build It",
    body: "I connect it to the tools your team already uses: your customer database, email, calendar, and chat.",
  },
  {
    title: "Test It, Then Hand It Over",
    body: "I break it on purpose before launch, then give your team simple instructions they can follow from day one.",
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
          Specialist. Most of a project&rsquo;s value gets lost between
          the plan and the build, so testing and clear instructions are part
          of the job.
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
