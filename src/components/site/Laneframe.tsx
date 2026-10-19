import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import WorkflowBackground from "./WorkflowBackground";
import LaneframeLoop from "./LaneframeLoop";

const PLATFORMS = [
  {
    name: "n8n",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three systems: one that sorts new leads and books demos, one that chases failed subscription payments, and an AI helper that answers questions from your help docs. I broke each one the same way and checked it live, not from a screenshot.",
    href: "/laneframe/n8n",
  },
  {
    name: "Make",
    status: "Complete",
    statusColor: "text-circuit",
    body: "The same three jobs on Make: capturing leads without duplicates, chasing failed payments, and an AI helper whose replies a person approves before they go out. Testing turned up a real problem (messages piling up while the system was switched off) and I found and fixed it.",
    href: "/laneframe/make",
  },
  {
    name: "Zapier",
    status: "Complete",
    statusColor: "text-circuit",
    body: "Three systems: lead sorting from a web form, lead sorting from email, and an AI support helper. On Zapier, the AI helper was more likely than the n8n version to answer questions it should have passed to a person. I measured that.",
    href: "/laneframe/zapier",
  },
  {
    name: "GoHighLevel",
    status: "Complete",
    statusColor: "text-circuit",
    body: "The demo-booking workflows are built and checked. The finished build on the page is an AI helper that qualifies leads by email, with hard limits on what it is allowed to do. I tested it by switching the AI off and by trying to make it book too early.",
    href: "/laneframe/gohighlevel",
  },
];

const RESULTS = [
  {
    value: "About 10 seconds",
    label: "From a new lead to the first text message",
    body: "Measured on the n8n build. The whole run on Make took under 3 seconds.",
  },
  {
    value: "12 of 12",
    label: "Trick questions handled correctly",
    body: "The AI helper on Make got all 12, with a second try on two of them. The Zapier version got 8 of 12: it answered four questions it should have passed to a person.",
  },
  {
    value: "$5.35 a month",
    label: "To run the n8n version",
    body: "That is the cost of its own server, backup included. It stays flat as volume grows.",
  },
];

const STATS = [
  { value: "4", label: "TOOLS COMPARED" },
  { value: "5", label: "BREAK TESTS ON EACH" },
  { value: "8", label: "REQUIREMENTS PER BUILD" },
  { value: "16", label: "DETAILS RECORDED PER BUILD" },
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
            FEATURED BUILD · SAMPLE BUSINESS, NOT A REAL CLIENT
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-3xl font-bold text-ink md:text-4xl">
            Leads answered in seconds. Failed payments chased. An AI that asks a
            person when it isn&rsquo;t sure.
          </h2>
          <p className="mt-4 max-w-3xl text-ink-muted">
            I built three systems for a sample software company. The first
            sorts new leads and books demos, the second follows up failed card
            payments, and the third is an AI helper that answers customer
            questions from the help docs and hands anything else to a person. I
            then built the whole set on four automation tools and tried to
            break every version the same way.
          </p>
        </Reveal>

        <Reveal>
          <LaneframeLoop />
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {RESULTS.map((r, i) => (
            <Reveal key={r.value} delay={i * 80}>
              <GlowCard className="h-full p-6">
                <p className="font-display text-3xl font-bold text-ink">
                  {r.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-circuit">
                  {r.label}
                </p>
                <p className="mt-3 text-sm text-ink-muted">{r.body}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/laneframe/n8n"
              className="btn-glow rounded-full bg-circuit px-5 py-2 text-sm font-semibold text-accent-ink hover:opacity-90"
            >
              See the n8n build
            </a>
            <a
              href="/laneframe/capstone#film"
              className="rounded-full border border-circuit/40 px-5 py-2 text-sm font-semibold text-circuit hover:bg-circuit/10"
            >
              Watch the film
            </a>
            <a
              href="#contact"
              className="rounded-full border border-circuit/40 px-5 py-2 text-sm font-semibold text-circuit hover:bg-circuit/10"
            >
              Fix My Bottleneck
            </a>
            <a
              href="/laneframe/capstone"
              className="text-sm font-medium text-circuit hover:underline"
            >
              What building it four times taught me →
            </a>
          </div>

          <h3 className="mt-14 font-display text-xl font-semibold text-ink">
            The proof underneath: one job, four tools
          </h3>
          <p className="mt-2 max-w-3xl text-ink-muted">
            Building it four times shows what each tool does well and where it
            struggles, so you can pick the right one for your business.
          </p>
          <p className="mt-3 max-w-3xl text-xs text-ink-muted/80">
            How I count: every number here was measured in a real test or
            comes with the formula that produced it. If I didn&rsquo;t
            measure something, I say so.
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
                {p.href ? (
                  <a
                    href={p.href}
                    className="mt-4 inline-block text-sm font-medium text-circuit hover:underline"
                  >
                    View full build →
                  </a>
                ) : (
                  <p className="mt-4 text-sm font-medium text-ink-muted">
                    Full write-up once it&rsquo;s finished
                  </p>
                )}
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
