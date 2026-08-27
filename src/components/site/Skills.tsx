"use client";

import Reveal from "./Reveal";
import {
  N8nIcon,
  MakeIcon,
  ZapierIcon,
  GoHighLevelIcon,
  HubSpotIcon,
  PostgresIcon,
  AirtableIcon,
  SlackIcon,
  AiAgentsIcon,
  HumanLoopIcon,
  ToolCallingIcon,
  ProbeTestingIcon,
} from "./SkillIcons";
import type { ComponentType } from "react";

type Tool = {
  label: string;
  category: string;
  Icon: ComponentType;
  tint: string; // rgba background for the icon badge
  ring: string; // rgba border for the icon badge
};

const GROUPS: { heading: string; items: Tool[]; reverse?: boolean }[] = [
  {
    heading: "AUTOMATION PLATFORMS",
    items: [
      { label: "n8n", category: "Workflow Engine", Icon: N8nIcon, tint: "rgba(234,75,113,0.1)", ring: "rgba(234,75,113,0.28)" },
      { label: "Make", category: "Integration", Icon: MakeIcon, tint: "rgba(168,85,247,0.1)", ring: "rgba(168,85,247,0.28)" },
      { label: "Zapier", category: "Automation", Icon: ZapierIcon, tint: "rgba(255,79,0,0.1)", ring: "rgba(255,79,0,0.28)" },
      { label: "GoHighLevel", category: "CRM & Growth", Icon: GoHighLevelIcon, tint: "rgba(255,106,77,0.1)", ring: "rgba(255,106,77,0.28)" },
    ],
  },
  {
    heading: "AI & AGENTS",
    items: [
      { label: "AI Agents", category: "Autonomous Systems", Icon: AiAgentsIcon, tint: "rgba(63,224,197,0.1)", ring: "rgba(63,224,197,0.28)" },
      { label: "Human-in-the-Loop", category: "Approval Gate", Icon: HumanLoopIcon, tint: "rgba(255,106,77,0.1)", ring: "rgba(255,106,77,0.28)" },
      { label: "Tool-Calling", category: "Function Calling", Icon: ToolCallingIcon, tint: "rgba(139,124,255,0.1)", ring: "rgba(139,124,255,0.28)" },
      { label: "Probe Testing", category: "Adversarial QA", Icon: ProbeTestingIcon, tint: "rgba(63,224,197,0.1)", ring: "rgba(63,224,197,0.28)" },
    ],
    reverse: true,
  },
  {
    heading: "INTEGRATION & DATA",
    items: [
      { label: "HubSpot", category: "CRM & Marketing", Icon: HubSpotIcon, tint: "rgba(255,122,89,0.1)", ring: "rgba(255,122,89,0.28)" },
      { label: "Postgres", category: "Database", Icon: PostgresIcon, tint: "rgba(51,103,145,0.14)", ring: "rgba(90,150,200,0.28)" },
      { label: "Airtable", category: "Relational DB", Icon: AirtableIcon, tint: "rgba(252,180,0,0.1)", ring: "rgba(252,180,0,0.28)" },
      { label: "Slack", category: "Team Chat", Icon: SlackIcon, tint: "rgba(224,30,90,0.1)", ring: "rgba(224,30,90,0.28)" },
    ],
  },
];

function Pill({ tool, reverse }: { tool: Tool; reverse?: boolean }) {
  const { label, category, Icon, tint, ring } = tool;

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }

  return (
    <span
      onMouseMove={handleMove}
      className="glow-card group mx-2 flex shrink-0 select-none items-center gap-3 rounded-2xl border border-border bg-white/[0.02] py-2.5 pl-2.5 pr-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
    >
      <span
        className={
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border p-2 shadow-inner transition-transform duration-300 group-hover:scale-110 " +
          (reverse ? "group-hover:-rotate-6" : "group-hover:rotate-6")
        }
        style={{ backgroundColor: tint, borderColor: ring }}
      >
        <Icon />
      </span>
      <span className="text-left leading-tight">
        <span className="block font-display text-sm font-bold tracking-tight text-ink">
          {label}
        </span>
        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-wider text-circuit">
          {category}
        </span>
      </span>
    </span>
  );
}

function MarqueeRow({ items, reverse }: { items: Tool[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((tool, i) => (
          <Pill key={`${tool.label}-${i}`} tool={tool} reverse={reverse} />
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
