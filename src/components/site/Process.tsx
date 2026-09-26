import Reveal from "./Reveal";
import WorkflowBackground from "./WorkflowBackground";

const STEPS = [
  {
    title: "List everything that could go wrong",
    body: "Before I build anything, I list everything that could break it: half-filled forms, the same form sent twice, apps that go down — the odd cases a perfect demo would never show.",
  },
  {
    title: "Test with messy real-world data, not a perfect demo",
    body: "Every build gets fed what it will actually see once it’s live — bad data, messages that arrive twice or out of order, other apps having a bad day — before it’s called done, not just the one clean example that looks good in a walkthrough.",
  },
  {
    title: "A person approves anything involving money or customers",
    body: "Anything that touches money, sends a message to a real customer, or can't be easily undone gets a review step before it fires. Automation should remove the busywork, not the judgment call.",
  },
  {
    title: "Make sure it gives the same result every time",
    body: "Automations run at all hours and get hit with repeats and duplicates, but still have to produce the same result every time. I re-run each build under those conditions and check where it slips, not just whether it passed once.",
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
