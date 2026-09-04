import Reveal from "./Reveal";
import WorkflowBackground from "./WorkflowBackground";

const STEPS = [
  {
    title: "Map the failure surface",
    body: "Before I build a single workflow, I list everything that could break it: malformed data, missing fields, rate limits, duplicate triggers — the edge cases a happy-path demo would never hit.",
  },
  {
    title: "Build against probes, not demos",
    body: "Every workflow gets fed the inputs it will actually see in production — bad data, retried webhooks, out-of-order triggers, third-party API hiccups — before it's called done, not just the one clean example that looks good in a walkthrough.",
  },
  {
    title: "Route irreversible actions through a human gate",
    body: "Anything that touches money, sends a message to a real customer, or can't be easily undone gets a review step before it fires. Automation should remove the busywork, not the judgment call.",
  },
  {
    title: "Test for consistency, not just correctness",
    body: "Automations run at all hours and get hit with retries and duplicate triggers, but still have to produce the same result every time. I re-run each build under those conditions and check where it drifts, not just whether it passed once.",
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
