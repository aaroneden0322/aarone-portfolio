import type { PlatformPageData } from "./types";

const make: PlatformPageData = {
  slug: "make",
  name: "Make",
  status: "3 of 3 builds complete",
  tagline:
    "A fully hosted, visual tool. You pay per step, so the price depends on how far each lead travels through the system.",
  whyThisPlatform: [
    {
      label: "The price depends on the path",
      detail:
        "Every step counts toward your bill. A bad lead stopped early cost 4 steps; a high-value lead that went all the way cost 19, nearly 5 times as much. Measured on real runs, not taken from the documentation.",
    },
    {
      label: "Nothing to host or maintain",
      detail:
        "Make runs everything for you, with no server to look after. The upkeep shows up elsewhere: wiring up connections, free-plan limits, and logic tucked inside small formula boxes.",
    },
    {
      label: "A built-in backup plan for each step",
      detail:
        "Each step can have its own “if this fails, do that” route for retries and alerts. It’s powerful when it’s attached to the right step — and a real gap when it isn’t (see the payment findings below).",
    },
  ],
  builds: [
    {
      id: "M1",
      title: "Lead Sorter & Demo Booker",
      status: "Complete",
      summary:
        "Takes in leads from several places, removes duplicates, scores them and sends each one to the right next step. It’s the same job as the n8n version, built separately on Make.",
      whatItDoes:
        "A webhook receives the lead, normalizes it, checks a Data Store for duplicate or dormant submissions, enriches company data, scores fit, and routes it one of several ways depending on tier and timing — including holding a Founder-tier lead's SMS send until business hours in Manila rather than sending it overnight. High-value leads get a real HubSpot deal and a live text message, not just a log entry.",
      testedAgainst: [
        "Badly filled-in forms",
        "Duplicate and long-silent leads",
        "Text-message service failing",
        "Company-lookup service down",
        "A deliberately broken customer-database connection",
      ],
      whatWeFound: [
        {
          headline: "A failed text message didn’t show up in Make’s own history",
          plain: "When the text message failed, Make still marked the run a success. The only warning was a Slack alert and a log entry I’d built in. Someone watching Make alone would have seen nothing wrong.",
          detail:
            "Forcing a real invalid-token failure on the SMS step still reported a clean top-level SUCCESS, because the built-in error handler caught it and resumed the run. The only honest signal anywhere was a Slack alert and a log row — a person watching only Make's own history would see nothing wrong.",
        },
        {
          headline: "Make blocks a broken connection before it can run",
          plain: "When I pointed the build at a fake customer-database connection, Make refused to save it. That kind of mistake can’t sneak into a live run, because the platform itself stops it.",
          detail:
            "Attempting to point the HubSpot step at a fake connection ID was rejected by Make's own API at save time, before the scenario could ever execute — a stale or revoked connection can't silently reach runtime the way a bad API key can, because the platform itself is the guard.",
        },
      ],
      caveatPlain:
        "One issue is still open: when a text is held until business hours, the time it logs for the send is off by several hours. Leads still go to the right place; only the logged time is wrong.",
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
      title: "Failed-Payment Recovery",
      status: "Complete",
      summary:
        "Retries failed subscription payments, sends reminders that space out over time, and only brings in a person when recovery really fails. It’s the same job as the n8n version, built on Make.",
      whatItDoes:
        "A Stripe webhook triggers the scenario, which checks for a duplicate event, verifies the account exists, and — on a failed payment — runs three retry attempts with backoff before opening a multi-step dunning sequence: widening wait-and-notify cycles, then a downgrade to read-only access, a Slack alert, and a churn-queue entry if nothing recovers.",
      testedAgainst: [
        "The same payment alert sent twice",
        "A real declined card, all the way through",
        "A deliberately broken payment connection",
        "A payment from an unknown customer",
        "A daily check that access matches what customers pay for",
      ],
      whatWeFound: [
        {
          headline: "Make’s “success” label can’t be trusted on its own",
          plain: "A payment connection set up for the wrong account showed a clean success while nothing was actually saved. I only caught it by checking the real billing records, not Make’s dashboard.",
          detail:
            "A Stripe connection quietly holding a restricted key for the wrong account produced a clean top-level success while every downstream write silently failed. It was only caught by checking the actual billing records, not by anything Make's dashboard reported.",
        },
        {
          headline: "Only half the payment process had a safety net",
          plain: "The build talks to the payment system twice per event, but only the second step retries and alerts on failure. When I broke the first one, it failed silently in under a second, with no retry and no warning.",
          detail:
            "The scenario makes two sequential Stripe calls per event. Only the second one has the 3-attempt retry and escalation wired onto it — mangling the API key proved the first call dies silently in under a second, with zero retries and zero alerts, landing unnoticed in Make's incomplete-executions queue.",
        },
      ],
      caveatPlain:
        "The second problem is found but not fixed yet: the same retry and alert still need adding to the first payment step.",
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
      title: "AI Concierge Assistant",
      status: "Complete",
      summary:
        "An AI assistant that answers customer questions from a real knowledge base and passes anything it isn’t sure about to a person. Nothing goes out until a human approves it. It’s the same job as the n8n version.",
      whatItDoes:
        "An inbound email triggers Make's native AI Agent module, which retrieves from a knowledge base, can check calendar availability or draft a booking hold, and proposes either a direct reply or an escalation. Nothing reaches a real customer without a human approving it first through a separate Human Gate scenario, which reads the agent's proposal and writes the final decision.",
      testedAgainst: [
        "12 test questions (answerable, near-miss, off-topic)",
        "One of its app connections deliberately broken",
        "The same question asked again and again",
        "A backlog of old messages when switched back on",
      ],
      whatWeFound: [
        {
          headline: "One broken connection stopped every reply",
          plain: "I removed its calendar connection. After that it refused every message, even simple questions that had nothing to do with the calendar.",
          detail:
            "Deleting one of the agent's three tool connections blocked the entire module for every incoming message, including ones that never needed that tool — confirmed by sending both a calendar-relevant and a calendar-irrelevant question and watching both get identically refused before the model ever ran.",
        },
        {
          headline: "The AI itself sometimes gets it wrong",
          plain: "On the free AI model, 2 of 9 new test messages came back garbled or sent the wrong way, and both were fixed by simply retrying. That’s why a person approves every reply before a customer sees it.",
          detail:
            "On the free-tier model, 2 of 9 fresh test messages came back with a malformed or mis-routed response, both corrected by an immediate retry of the same prompt. That's a real reliability tax on top of the build itself — the human-approval gate is what actually catches it before a customer ever sees it.",
        },
      ],
      caveatPlain:
        "A separate bug left three log columns blank on every run while Make reported success. It’s been found, fixed and re-checked.",
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
