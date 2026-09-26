import type { PlatformPageData } from "./types";

const zapier: PlatformPageData = {
  slug: "zapier",
  name: "Zapier",
  status: "3 of 3 builds complete",
  tagline:
    "Pay-per-task billing on a hard, undocumented step ceiling — the platform that forced real architecture trade-offs instead of just absorbing them.",
  whyThisPlatform: [
    {
      label: "Task billing, and a documentation gap caught on a live run",
      detail:
        "A successful action step costs 1 task; a halted or skipped step costs 0. Zapier's own docs predict a Sub-Zap call should cost more than what a real measured run actually billed — a genuine platform-documentation-vs-observed-reality gap, confirmed against the account's own live task counter, not assumed from the docs.",
    },
    {
      label: "A real step ceiling that changed what got built, not just how",
      detail:
        "A hard ~32-step-per-Zap limit (the UI's own counter under-reports it) forced a parent/child Sub-Zap split — and, under that same pressure, two planned features (Twilio SMS, company enrichment) were dropped outright rather than kept in degraded form the way n8n's and Make's builds both did.",
    },
    {
      label: "No native workflow export on this plan",
      detail:
        "Unlike n8n's full JSON export or Make's blueprint export, there is no re-importable format for a Zap or Sub-Zap here — confirmed by checking the editor's own menus directly. The live Zaps themselves are the only durable record of the build.",
    },
  ],
  builds: [
    {
      id: "Z1",
      title: "Trial-to-Demo Router",
      status: "Complete",
      summary:
        "Takes inbound leads, deduplicates and scores them, and routes each one to the right next step — the same specification as n8n's and Make's Trial-to-Demo Router, split here across a parent Zap and two child Sub-Zaps to fit under Zapier's step ceiling.",
      whatItDoes:
        "A webhook receives the lead, two Formatter steps normalize it, a guard-halted-logging Sub-Zap call and filter catch malformed intake, two HubSpot lookups guard against duplicates, and a three-way Paths router sends Founder/SDR/self-serve leads to their own CRM, Slack, and Sheets actions — with a second Sub-Zap handling existing-lead re-engagement and dormancy scoring.",
      testedAgainst: [
        "Malformed intake payloads",
        "Duplicate & dormant leads",
        "A live guard-halt run against a real Sub-Zap",
      ],
      whatWeFound: [
        {
          headline: "Zapier's own documented Sub-Zap billing doesn't match what a live run actually charges",
          detail:
            "Zapier's help docs predict a 2-action Sub-Zap child bills 2 tasks for those actions alone. A real, live guard-halted run — confirmed against the account's own task counter moving by exactly +1, not assumed from a green checkmark — billed only 1. A genuine, disclosed gap between the platform's own documentation and its observed behavior, never resolved against Zapier support.",
        },
        {
          headline: "The step ceiling isn't just friction — it deleted two features outright",
          detail:
            "A permanently-failing enrichment call and an undeliverable Twilio SMS step were both removed entirely to free up step slots, rather than kept in a degraded, gracefully-skipped form the way the same failures were handled on n8n and Make. The finished build is structurally smaller than its original specification because of a platform constraint, not a design choice.",
        },
      ],
      caveat:
        "Only 2 of the 5 standard break probes were run live; the other 3 (downstream timeout, enrichment failure, out-of-hours delay) are disclosed as structurally not applicable — the features they'd test were the two dropped above, not features that were built and passed.",
      proof: [
        {
          src: "/laneframe/zapier/z1-canvas.webp",
          alt: "Zapier canvas view of the Z1 Trial-to-Demo Router parent Zap, showing the full 31-step branching structure",
          caption:
            "The parent Zap's full 31-step structure — normalization, guard, dedupe, and the three-way tier router, kept in Draft throughout.",
        },
        {
          src: "/laneframe/zapier/z1-guard-halted-sheets-row.webp",
          alt: "Zapier run detail showing a real Google Sheets row written by the guard-halted Sub-Zap, with outcome marked guard-halted",
          caption:
            "A real, live-fired guard-halt run — the malformed lead correctly logged with outcome: guard-halted, confirmed against the run's own Data Out.",
        },
      ],
    },
    {
      id: "Z2",
      title: "Trial-to-Demo Router — Email Intake",
      status: "Complete",
      summary:
        "The same router specification reached through a second intake channel — an inbound email parser instead of a webhook — because Zapier can't share one trigger shape across intake types the way a single n8n or Make workflow can branch internally.",
      whatItDoes:
        "An Email Parser mailbox extracts lead fields from inbound referral emails, feeds the same fit-scoring and dedupe logic as Z1's router, and reuses Z1's own re-engagement Sub-Zap rather than duplicating it — a single 30-step Zap with no dedicated child Sub-Zaps of its own.",
      testedAgainst: [
        "A genuine, freshly-worded referral email (not a trained template)",
        "A second email deliberately phrased to mirror the trained template",
        "Duplicate-arrival dormancy logic (via cached-sample code execution)",
      ],
      whatWeFound: [
        {
          headline: "A normal-sounding lead tripped the guard-halt on a live send",
          detail:
            "A genuinely new referral email — not a synthetic malformed test — mis-extracted two fields and produced no domain at all, correctly triggering Path B's guard rather than routing to CRM logic with bad data. Zero HubSpot lookups fired, exactly as the guard is meant to do.",
        },
        {
          headline: "A second live test root-caused a durable configuration defect, not a phrasing problem",
          detail:
            "Rewording the test email to match the trained template fixed two of three broken fields but not the domain extractor, which was found to be reading a stale, broken field reference — a real bug in the step's own configuration, confirmed by inspecting its live Data In (a literal \"1\" instead of an email), not a one-off fluke.",
        },
      ],
      caveat:
        "This build has never reached its own Founder/SDR/self-serve success path on a live run — both live-fire attempts hit the guard-halt before getting there, and the root-caused domain-extractor bug means a third attempt wouldn't be expected to succeed without first fixing that step's field mapping.",
      proof: [
        {
          src: "/laneframe/zapier/z2-canvas-overview.webp",
          alt: "Zapier canvas view of the Z2 Trial-to-Demo Router — Email Parser Intake Zap, showing the full 30-step structure",
          caption:
            "The full 30-step email-intake router — trigger, dedupe, tier routing, and the shared guard-halt logging path.",
        },
        {
          src: "/laneframe/zapier/z2-canvas-path-b.webp",
          alt: "Zapier canvas detail of Path C and Path D routing alongside the guard-halted logging path",
          caption:
            "The dedupe-and-route split feeding new-lead tier scoring and existing-lead re-engagement, next to the shared guard-halt logging branch.",
        },
      ],
    },
    {
      id: "Z3",
      title: "Support Triage Agent",
      status: "Complete",
      summary:
        "An AI agent that classifies and answers support tickets from real documentation, escalating anything it can't ground in a quoted passage — the same specification as n8n's and Make's documentation support agent, built here with no dedicated approval-gate control and no retrieval-confidence score to fall back on.",
      whatItDoes:
        "A support ticket is classified, checked against two attached knowledge documents, and either answered with a quoted passage or escalated. Nothing reaches a customer without human approval — enforced entirely by a system-prompt rule and the deliberate choice of a draft-only Gmail action, since Zapier's Agents builder has no dedicated approval-gate toggle at all.",
      testedAgainst: [
        "A 12-question probe set (4 covered, 4 uncovered, 4 near-miss)",
        "A multi-branch mega-ticket touching every tool at once",
        "An organic Linear tool failure",
      ],
      whatWeFound: [
        {
          headline: "The escalation rule failed on half of the questions it exists to protect",
          detail:
            "8 of 12 probes passed overall, but the coverage rule — \"if you can't quote a passage, escalate\" — failed on 4 of the 8 uncovered and near-miss questions, including one case where the agent flatly denied having any escalation process when asked to invoke it. Zero failures occurred on the 4 covered questions; the gap is entirely in judgment calls, not lookups.",
        },
        {
          headline: "An urgent-outage alert was silently never sent, and nothing surfaced the miss",
          detail:
            "Fed a ticket containing the system prompt's own trigger phrase for an outage, the agent narrated an intention to post a Slack alert and then never did — confirmed by the run's own tool-usage log, which shows no Slack call at all. The ticket was still otherwise handled correctly, but the one safety action its own rules were written to guarantee simply didn't fire, and no summary or log flagged that gap to a human.",
        },
      ],
      caveat:
        "A genuine Linear tool failure (a required Team field with no valid default) surfaced correctly — the agent flagged it plainly and produced a manual fallback a human could act on — which is the one failure class this build handles reliably. The prompt-level judgment failures above are the one it doesn't.",
      proof: [
        {
          src: "/laneframe/zapier/z3-agent-config.webp",
          alt: "Zapier Agents configuration panel showing the Laneframe Support Triage agent's trigger and full system prompt instructions",
          caption:
            "The full system prompt — classify, ground in quoted passages, escalate what isn't covered, never send without approval.",
        },
        {
          src: "/laneframe/zapier/z3-megaticket-summary.webp",
          alt: "Zapier agent activity log showing a failed Linear action and a summary response that never mentions a Slack alert for the urgent outage ticket",
          caption:
            "The mega-ticket's own summary — a correct Gmail draft and cancellation-policy answer, and no mention anywhere of the Slack alert the agent said it would send.",
        },
      ],
    },
  ],
};

export default zapier;
