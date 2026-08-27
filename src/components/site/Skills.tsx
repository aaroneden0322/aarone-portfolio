import Reveal from "./Reveal";

const GROUPS: { heading: string; items: string[]; reverse?: boolean }[] = [
  {
    heading: "AUTOMATION PLATFORMS",
    items: ["n8n", "Make", "Zapier", "GoHighLevel"],
  },
  {
    heading: "AI & AGENTS",
    items: ["AI Agents", "Human-in-the-Loop", "Tool-Calling", "Probe Testing"],
    reverse: true,
  },
  {
    heading: "INTEGRATION & DATA",
    items: ["HubSpot", "Postgres", "Airtable", "Slack"],
  },
];

function Pill({ label }: { label: string }) {
  return (
    <span className="mx-2 flex shrink-0 items-center gap-2 rounded-full border border-border bg-white/[0.02] px-4 py-2 text-sm text-ink-muted">
      {label === "GoHighLevel" && (
        <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-flow text-[9px] font-bold text-bg">
          GO
        </span>
      )}
      {label}
    </span>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-8">
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.15em] text-circuit">
          STACK
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Skills &amp; Tools
        </h2>
        <p className="mt-4 max-w-3xl text-ink-muted">
          The platforms, integrations, and testing practices behind every
          build below. Stack keeps moving — just like the pipelines it
          builds.
        </p>
      </Reveal>

      <div className="mt-10 space-y-8">
        {GROUPS.map((g) => (
          <div key={g.heading}>
            <p className="mb-3 text-xs font-semibold tracking-widest text-ink-muted">
              {g.heading}
            </p>
            <MarqueeRow items={g.items} reverse={g.reverse} />
          </div>
        ))}
      </div>
    </section>
  );
}
