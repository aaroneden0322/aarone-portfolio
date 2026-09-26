import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import WorkflowBackground from "./WorkflowBackground";

const PLATFORMS = [
  {
    name: "n8n",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three builds — a trial-to-demo lead router, a subscription billing & dunning workflow, and a documentation support agent — each run through a fixed set of break tests (malformed data, revoked credentials, retried webhooks) and confirmed live, not just a passing screenshot.",
    href: "/laneframe/n8n",
  },
  {
    name: "Make",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three builds — lead capture with dedupe, a subscription dunning ladder, and an AI concierge agent behind a human-approval gate — stress-tested against the same break scenarios, including a real webhook-queue incident found and fixed mid-build.",
    href: "/#work",
  },
  {
    name: "Zapier",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three builds — a lead-routing rebuild, a trial-to-demo router, and a documentation support agent. The agent's self-policed coverage rule was deliberately probed and found weaker than n8n's numeric confidence gate — a measured finding, not a hunch.",
    href: "/#work",
  },
  {
    name: "GoHighLevel",
    status: "In Progress",
    statusColor: "text-flow",
    body: "The demo-lifecycle phase is built and verified; the next phase hasn't started. This card updates as that work lands — not before.",
    href: "/#work",
  },
];

const STATS = [
  { value: "0", label: "CAPTURE FIELDS" },
  { value: "0", label: "FAILURE PROBES" },
  { value: "0", label: "PLATFORMS" },
  { value: "[--]", label: "[STAT PLACEHOLDER]" },
];

export default function Laneframe() {
  return (
    <section
      id="laneframe"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 py-8"
    >
      <WorkflowBackground />
      <div className="relative">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          FEATURED CASE STUDY
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Laneframe: Four Platforms, One Specification
        </h2>
        <p className="mt-4 max-w-3xl text-ink-muted">
          One lead-intake automation specification, built independently on
          four platforms for a composite client, instrumented identically and
          measured honestly.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-circuit/40 px-4 py-1.5 text-xs font-semibold text-circuit">
            Active build
          </span>
          <span className="text-sm text-ink-muted">
            n8n, Make, and Zapier builds complete — GoHighLevel in progress.
          </span>
        </div>

        <p className="mt-4 max-w-3xl text-xs text-ink-muted/80">
          Methodology note: every number on this page is either measured
          during a real build or a formula with its inputs named —
          unmeasured items are marked, never estimated.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PLATFORMS.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <GlowCard className="h-full p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {p.name}
                </h3>
                <span className={`text-xs font-semibold ${p.statusColor}`}>
                  {p.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink-muted">{p.body}</p>
              <a
                href={p.href}
                className="mt-4 inline-block text-sm font-medium text-circuit hover:underline"
              >
                View full build →
              </a>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-ink">
                {s.value}
              </p>
              <p className="mt-1 text-xs tracking-wide text-ink-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
      </div>
    </section>
  );
}
