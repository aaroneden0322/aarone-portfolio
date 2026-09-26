import type { PlatformPageData } from "./types";

const make: PlatformPageData = {
  slug: "make",
  name: "Make",
  status: "3 of 3 builds complete",
  tagline:
    "Visual, module-based automation — billed per module call, so cost tracks how deep a run actually travels through the routing tree, not just that it ran.",
  whyThisPlatform: [
    {
      label: "Operation billing scales with routing depth",
      detail:
        "One operation = one module call, including calls on an error-handler branch. A guard-halted lead can cost as little as 4 operations while a full route with a live SMS attempt costs 19 — a 4.75x spread confirmed directly from live executions, not assumed from docs.",
    },
    {
      label: "Fully managed, no infrastructure to run",
      detail:
        "No VPS, no Docker, no TLS certificates to maintain — Make is SaaS end to end. The real maintenance burden shows up elsewhere: connection wiring, free-tier ceilings, and formula logic living inline rather than in a general-purpose scripting language.",
    },
    {
      label: "Visual branching with native error-handler routes",
      detail:
        "Every module can carry its own onerror branch for retries, fallbacks, and alerts — powerful when it's actually wired onto the right module, and a real gap when it isn't (see the M2 findings below).",
    },
  ],
  builds: [
    {
      id: "M1",
      title: "Lead Intake & Router",
      status: "Complete",
      summary:
        "Takes inbound leads from multiple sources, deduplicates and scores them, and routes each one to the right next step — the same specification as n8n's Trial-to-Demo Router, built independently on Make's visual module graph.",
      whatItDoes:
        "A webhook receives the lead, normalizes it, checks a Data Store for duplicate or dormant submissions, enriches company data, scores fit, and routes it one of several ways depending on tier and timing — including holding a Founder-tier lead's SMS send until business hours in Manila rather than sending it overnight. High-value leads get a real HubSpot deal and a live text message, not just a log entry.",
      testedAgainst: [
        "Malformed intake payloads",
        "Duplicate & dormant leads",
        "Downstream SMS-provider failures",
        "Enrichment API outage",
        "A deliberately broken CRM connection",
      ],
      whatWeFound: [
        {
          headline: "A failed SMS send doesn't show up in Make's own execution history",
          detail:
            "Forcing a real invalid-token failure on the SMS step still reported a clean top-level SUCCESS, because the built-in error handler caught it and resumed the run. The only honest signal anywhere was a Slack alert and a log row — a person watching only Make's own history would see nothing wrong.",
        },
        {
          headline: "Make blocks a broken CRM connection before the workflow can even run",
          detail:
            "Attempting to point the HubSpot step at a fake connection ID was rejected by Make's own API at save time, before the scenario could ever execute — a stale or revoked connection can't silently reach runtime the way a bad API key can, because the platform itself is the guard.",
        },
      ],
      caveat:
        "One open item found during testing: the out-of-hours queue correctly holds the SMS send, but the timestamp it logs for the queued send is miscalculated by several hours due to a timezone-arithmetic bug. The routing decision itself is unaffected — only the logged time is wrong — and it's disclosed here rather than smoothed over.",
      proof: [
        {
          src: "/laneframe/make/m1-guard-halt.webp",
          alt: "Make execution history showing a 4-operation run that halted at the input guard after a malformed payload",
          caption:
            "A malformed lead payload halted cleanly at the input guard — 4 operations, with the guard-failed alert and log both firing in about a second.",
        },
        {
          src: "/laneframe/make/m1-http-error-detail.webp",
          alt: "Make module detail showing the AbstractAPI enrichment call failing with a handled DataError",
          caption:
            "The enrichment call failing against a dead endpoint, caught by a built-in error handler — the lead still routes and scores correctly with no enrichment data.",
        },
      ],
    },
    {
      id: "M2",
      title: "Subscription Billing & Dunning",
      status: "Complete",
      summary:
        "Works failed subscription payments through a retry ladder and a widening dunning sequence, escalating to a human only when recovery genuinely fails — the same specification as n8n's build, on Make's module graph.",
      whatItDoes:
        "A Stripe webhook triggers the scenario, which checks for a duplicate event, verifies the account exists, and — on a failed payment — runs three retry attempts with backoff before opening a multi-step dunning sequence: widening wait-and-notify cycles, then a downgrade to read-only access, a Slack alert, and a churn-queue entry if nothing recovers.",
      testedAgainst: [
        "Replayed webhook events",
        "A real Stripe card decline through full dunning exhaustion",
        "A deliberately broken API key",
        "An unrecognized Stripe customer",
        "A daily reconciliation sweep for entitlement drift",
      ],
      whatWeFound: [
        {
          headline: "Make's own 'success' status isn't a reliable signal",
          detail:
            "A Stripe connection quietly holding a restricted key for the wrong account produced a clean top-level success while every downstream write silently failed. It was only caught by checking the actual billing records, not by anything Make's dashboard reported.",
        },
        {
          headline: "The retry ladder only protects half of the call chain it needed to protect",
          detail:
            "The scenario makes two sequential Stripe calls per event. Only the second one has the 3-attempt retry and escalation wired onto it — mangling the API key proved the first call dies silently in under a second, with zero retries and zero alerts, landing unnoticed in Make's incomplete-executions queue.",
        },
      ],
      caveat:
        "The second finding above is disclosed as found, not as fixed: production hardening would mean wiring the same retry and escalation protection onto the first Stripe call, which this build has not yet done.",
      proof: [
        {
          src: "/laneframe/make/m2-canvas.webp",
          alt: "Make canvas view of the M2 Subscription Billing and Dunning scenario, showing the full retry ladder and dunning sequence",
          caption:
            "The full billing scenario — idempotency check, account guard, retry ladder, and the widening dunning sequence to churn-queue escalation.",
        },
        {
          src: "/laneframe/make/m2-break4-incomplete-executions.webp",
          alt: "Make's Incomplete Executions queue showing two unresolved executions from the unprotected first Stripe call",
          caption:
            "The unprotected call's real failure mode: it doesn't retry or alert — it just lands here, unresolved, until someone goes looking.",
        },
      ],
    },
    {
      id: "M3",
      title: "AI Concierge Agent",
      status: "Complete",
      summary:
        "An AI agent that answers customer questions from a real knowledge base and routes anything it isn't confident about to a human-approval gate before any reply or booking goes out — the same specification as n8n's Documentation Support Agent.",
      whatItDoes:
        "An inbound email triggers Make's native AI Agent module, which retrieves from a knowledge base, can check calendar availability or draft a booking hold, and proposes either a direct reply or an escalation. Nothing reaches a real customer without a human approving it first through a separate Human Gate scenario, which reads the agent's proposal and writes the final decision.",
      testedAgainst: [
        "A 12-question refusal set (covered / near-miss / out-of-scope)",
        "A deliberately broken tool connection",
        "Run-to-run model output on repeated identical prompts",
        "A stale webhook queue on reactivation",
      ],
      whatWeFound: [
        {
          headline: "A broken tool connection blocks every message, not just the ones that need it",
          detail:
            "Deleting one of the agent's three tool connections blocked the entire module for every incoming message, including ones that never needed that tool — confirmed by sending both a calendar-relevant and a calendar-irrelevant question and watching both get identically refused before the model ever ran.",
        },
        {
          headline: "The model gets it wrong on its own, independent of any wiring bug",
          detail:
            "On the free-tier model, 2 of 9 fresh test messages came back with a malformed or mis-routed response, both corrected by an immediate retry of the same prompt. That's a real reliability tax on top of the build itself — the human-approval gate is what actually catches it before a customer ever sees it.",
        },
      ],
      caveat:
        "A separate mapping bug was found and fixed during testing: the agent's structured output lives nested one level deeper than the router originally referenced, so three log columns stayed blank on every run despite Make reporting a clean SUCCESS. Corrected and verified by replaying the same captured execution.",
      proof: [
        {
          src: "/laneframe/make/m3-agent-canvas.webp",
          alt: "Make canvas view of the M3 AI Concierge Agent scenario, showing the agent module, its three tools, and the escalation and reply branches",
          caption:
            "The agent workflow — knowledge retrieval, calendar tools, routing, and the escalation branch that feeds the human-approval gate.",
        },
        {
          src: "/laneframe/make/m3-tool-failure.webp",
          alt: "Make agent test panel showing a 'Connection not found' error blocking the agent for a calendar-irrelevant test message",
          caption:
            "The fail-loud pre-flight block: a broken calendar connection stops even a completely unrelated pricing question from getting an answer.",
        },
      ],
    },
  ],
};

export default make;
