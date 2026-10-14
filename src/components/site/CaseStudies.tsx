import Reveal from "./Reveal";
import GlowCard from "./GlowCard";

const CASES = [
  {
    n: "01",
    title: "AI Customer-Service Assistant That Checks With a Person First",
    body: "An AI assistant that answers only from your own help documents and says “I don’t know, let me get someone” when it isn’t sure. A person approves every reply before a customer sees it. I tested it with 12 tricky questions, some designed to tempt it into a confident wrong answer.",
    tags: ["AI Agents", "Human-in-the-Loop"],
    status: "Write-up coming",
  },
  {
    n: "02",
    title: "AI-Written Marketing Automation Plans",
    body: "A chain of prompts that turns a discovery call into a complete GoHighLevel marketing plan, with the same labels every time and the client’s own brand colours. Tested end to end on one test client. No live client results yet.",
    tags: ["GoHighLevel", "AI Content Pipeline"],
    status: "Process write-up · One test client",
    href: "/case-studies/ai-strategy-pipeline",
    linkLabel: "Read how it works →",
  },
  {
    n: "03",
    title: "AI Lead Research and First Emails That Never Send Themselves",
    body: "A new lead comes in, the workflow looks up the company, scores it and writes a short first email. Nothing is sent. Each draft waits in HubSpot as a task for a person to review. Built and tested on fictional property-management leads: 112 drafts, no invented facts found.",
    tags: ["n8n", "HubSpot", "AI Drafting"],
    status: "MOCK DATA · Demo build",
    href: "/case-studies/lead-enrichment",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          MORE WORK
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Additional Case Studies
        </h2>
        <p className="mt-4 text-ink-muted">
          A closer look at three recent builds, with more on the way.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.n} delay={i * 100}>
            <GlowCard className="flex h-full flex-col p-6">
              <p className="text-xs font-semibold text-ink-muted">{c.n}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink-muted">{c.body}</p>
              {c.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {c.status && (
                <p className="mt-4 text-xs font-semibold text-flow">
                  {c.status}
                </p>
              )}
              <a
                href={"href" in c && c.href ? c.href : "#contact"}
                className="mt-3 text-sm font-medium text-circuit hover:underline"
              >
                View case study →
              </a>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
