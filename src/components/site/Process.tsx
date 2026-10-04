import Reveal from "./Reveal";
import WorkflowBackground from "./WorkflowBackground";

const STEPS = [
  {
    title: "List everything that could go wrong",
    body: "Before I build anything, I list what could break it: half-filled forms, the same form sent twice, apps that go down. These are the cases a perfect demo never shows.",
  },
  {
    title: "Test with messy, real-world data",
    body: "Before a build counts as done, I feed it what it will see once it’s live: bad data, messages that arrive twice or out of order, other apps having a bad day.",
  },
  {
    title: "A person approves anything involving money or customers",
    body: "Anything that touches money, messages a real customer, or can't easily be undone gets a review step before it runs. Automation should take over the busywork and leave the judgment calls to a person.",
  },
  {
    title: "Make sure it gives the same result every time",
    body: "Automations run at all hours and get hit with repeats and duplicates, so they have to give the same result each time. I re-run each build under those conditions and check where it slips.",
  },
  {
    title: "Write down the limits",
    body: "Every build ships with a plain account of what it can and can't do yet.",
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
          The delivery process, from scoping to launch, built around finding
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
