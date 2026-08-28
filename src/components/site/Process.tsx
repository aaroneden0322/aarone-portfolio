import Reveal from "./Reveal";
import WorkflowBackground from "./WorkflowBackground";

const STEPS = [
  {
    title: "Map the failure surface",
    body: "Before writing a single node, I list everything that could break it: malformed data, unsupported requests, edge cases a happy-path demo would never hit.",
  },
  {
    title: "Build against probes, not demos",
    body: "Every build gets a written set of adversarial test questions — things it should answer, things it shouldn't, and near-misses designed to tempt a confident wrong answer — before it's called done.",
  },
  {
    title: "Route AI judgment through a human gate",
    body: "Anything an AI system drafts for a real customer passes through approval before it goes out. Automation should remove the busywork, not the judgment call.",
  },
  {
    title: "Test for consistency, not just correctness",
    body: "AI tools don't behave identically run to run. I re-run the same prompt and check where the answer drifts, not just whether it passed once.",
  },
  {
    title: "Document the limits, not just the wins",
    body: "Every build ships with an honest account of what it can and can't do yet — no polished demo standing in for a guarantee.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 py-8"
    >
      <WorkflowBackground />
      <div className="relative">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          PROCESS
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          How I Test Before I Trust
        </h2>
        <p className="mt-4 max-w-3xl text-ink-muted">
          The delivery process, from scoping to launch — built around finding
          what breaks before a customer does.
        </p>
      </Reveal>

      <div className="mt-10 space-y-8 border-l border-border pl-8">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="relative">
            <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border border-circuit/50 bg-bg font-display text-sm font-semibold text-circuit">
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-semibold text-ink">
              {s.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">{s.body}</p>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
