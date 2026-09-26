import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import WorkflowBackground from "./WorkflowBackground";

const PLATFORMS = [
  {
    name: "n8n",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three systems: one that sorts new leads and books demos, one that chases failed subscription payments, and an AI helper that answers questions from your help docs. Each was deliberately broken the same way and checked live — not just a passing screenshot.",
    href: "/laneframe/n8n",
  },
  {
    name: "Make",
    status: "Complete",
    statusColor: "text-circuit",
    body: "The same three jobs on Make: capturing leads without duplicates, chasing failed payments, and an AI helper whose replies a person approves before they go out. Testing uncovered a real problem — messages piling up while the system was switched off — which I found and fixed.",
    href: "/laneframe/make",
  },
  {
    name: "Zapier",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three systems: lead sorting from a web form, lead sorting from email, and an AI support helper. On Zapier, the AI helper was more likely than the n8n version to answer questions it should have passed to a person — I measured that rather than guessed it.",
    href: "/laneframe/zapier",
  },
  {
    name: "GoHighLevel",
    status: "In Progress",
    statusColor: "text-flow",
    body: "The first stage — handling demo bookings from start to finish — is built and checked. The next stage hasn't started yet. This card updates when that work is done, not before.",
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
            Laneframe: One Job, Built Four Ways
          </h2>
          <p className="mt-4 max-w-3xl text-ink-muted">
            I built the same lead-handling system on four popular automation
            tools for a realistic sample business (not a real client), then
            tested each one the same way — so you can see what each tool is
            good at, and where it struggles.
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
            How I count: every number here was measured in a real test or
            shows how it was worked out. If I didn&rsquo;t measure it, I say
            so.
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
