import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import AskAssistantLink from "./AskAssistantLink";

/**
 * "Pick your problem": a short strip under the Hero. Each tile names a problem
 * in plain words and links to the build that was tested for it. Only problems
 * with a published build get a tile. Data-driven, so adding or swapping a tile
 * (for example when a new case study ships) is a change to this list only.
 */
const TILES = [
  {
    problem: "Leads wait too long for a reply",
    proof: "Lead sorter, built on n8n",
    href: "/laneframe/n8n#n1",
  },
  {
    problem: "Failed card payments go unnoticed",
    proof: "Payment recovery, built on n8n",
    href: "/laneframe/n8n#n2",
  },
  {
    problem: "An AI assistant might answer wrongly",
    proof: "AI help-desk with a person’s approval, built on Make",
    href: "/laneframe/make#m3",
  },
  {
    problem: "Your lead list is thin or messy",
    proof: "Lead research and draft emails, on mock data",
    href: "/case-studies/lead-enrichment",
  },
];

export default function PickYourProblem() {
  return (
    <section
      id="problems"
      aria-labelledby="problems-title"
      className="mx-auto max-w-6xl px-6 py-8"
    >
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          PICK YOUR PROBLEM
        </p>
        <h2
          id="problems-title"
          className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl"
        >
          Start with what is slowing you down
        </h2>
        <p className="mt-4 text-ink-muted">
          Each one links to a build I tested on a sample business or mock data,
          not a real client.
        </p>
      </Reveal>

      <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((t, i) => (
          <li key={t.href} className="[&>div]:h-full">
            <Reveal delay={i * 80}>
              <a href={t.href} className="group block h-full">
                <GlowCard className="flex h-full flex-col p-5 transition-colors group-hover:border-circuit">
                  <p className="font-display text-lg font-semibold text-ink">
                    {t.problem}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-ink-muted">
                    {t.proof}
                  </p>
                  <span className="mt-4 text-sm font-medium text-circuit group-hover:underline">
                    See the proof →
                  </span>
                </GlowCard>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-ink-muted">
        Not sure which tool fits?{" "}
        <AskAssistantLink className="font-medium text-circuit hover:underline">
          Ask the assistant →
        </AskAssistantLink>
      </p>
    </section>
  );
}
