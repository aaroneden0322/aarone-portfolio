import type { PlatformPageData } from "./types";

const n8n: PlatformPageData = {
  slug: "n8n",
  name: "n8n",
  status: "3 of 3 builds complete",
  tagline:
    "Self-hosted, node-based automation — full control over the infrastructure, billed flat regardless of how complex a workflow gets.",
  whyThisPlatform: [
    {
      label: "Flat execution cost",
      detail:
        "One execution = one workflow run, no matter how many nodes it touches. A 4-node dead-end costs the platform exactly the same as a 37-node full route — confirmed directly against n8n's own Executions log, not assumed from docs.",
    },
    {
      label: "Cost falls as volume grows",
      detail:
        "Because the real cost here is a fixed $5.35/month VPS, not per-run billing, the cost per 1,000 executions drops the more a workflow is actually used — the opposite of per-task or per-module pricing.",
    },
    {
      label: "Self-hosted, self-owned",
      detail:
        "Runs on infrastructure we control end to end — no third-party rate limits or plan tiers between a workflow and the systems it talks to.",
    },
  ],
  builds: [
    {
      id: "N1",
      title: "Trial-to-Demo Router",
      status: "Complete",
      summary:
        "Takes inbound leads from five different sources, cleans and scores them, and routes each one to the right next step — automatically, in under a minute.",
      whatItDoes:
        "Leads come in from five different intake sources in five different shapes. This workflow normalizes all of them into one format, screens out anything malformed before it can cause downstream problems, checks for duplicate or dormant leads, enriches company data, scores fit, and then routes each lead one of four ways — straight to the founder, to a sales rep with automatic round-robin assignment, into a self-serve email sequence, or into a re-engagement flow for leads that have gone cold. High-value leads also get a real text message, not just an email.",
      testedAgainst: [
        "Malformed intake payloads",
        "Duplicate & dormant leads",
        "Enrichment API outage",
        "Out-of-hours timing",
        "SMS delivery failure",
      ],
      whatWeFound: [
        {
          headline: "Caught a silent SMS failure the API itself didn't report",
          detail:
            "The workflow doesn't just trust that the text-message API returned success — it reads back and confirms the carrier actually delivered it. That check caught a real failure mode where the gateway reported \"sent\" on a message that never reached the phone.",
        },
        {
          headline: "Every lead is logged, no matter which path it takes",
          detail:
            "Success, guard-halt, or duplicate — every outcome writes to a master log, so nothing about how a lead was handled is ever a mystery after the fact.",
        },
      ],
      proof: [
        {
          src: "/laneframe/n8n/n1-canvas.webp",
          alt: "n8n canvas view of the N1 Trial-to-Demo Router workflow, showing the full 37-node routing path",
          caption: "The full routing workflow — intake through scoring, four-way routing, and logging.",
        },
        {
          src: "/laneframe/n8n/n1-run-success.webp",
          alt: "n8n executions list showing execution #186 succeeded in 7.806 seconds",
          caption: "A real, live-logged run: execution #186, the full 37-node founder route, succeeded in 7.8 seconds.",
        },
      ],
    },
    {
      id: "N2",
      title: "Subscription Billing & Dunning",
      status: "Complete",
      summary:
        "Automatically works failed subscription payments through a retry and notification sequence, so a business doesn't quietly lose paying customers to an expired card.",
      whatItDoes:
        "When a subscription payment fails, this workflow doesn't just flag it and stop — it runs the account through a dunning sequence: retry attempts, customer notifications, and escalation if the payment still hasn't recovered. The goal is to save the subscription automatically wherever possible, and only surface it to a human when it genuinely needs one.",
      testedAgainst: [
        "Replayed webhooks",
        "Revoked payment credentials",
        "Unknown accounts",
        "Entitlement mismatches",
        "6 deliberate break scenarios end to end",
      ],
      whatWeFound: [
        {
          headline: "Found and fixed a logic bug that could never actually trigger",
          detail:
            "A recovery-check condition was written in a way that could never evaluate true — meaning it would have silently failed to detect when a customer's payment actually recovered. Fixed and re-verified live; fixing it also exposed a second, unrelated bug (a database column reference that didn't exist), which was fixed and confirmed the same way.",
        },
        {
          headline: "A revoked API key looks identical to a real cancellation",
          detail:
            "Deliberately revoking the payment provider's API key produced the exact same operator-facing alert as a customer's subscription genuinely lapsing. Without extra work, whoever is monitoring this system can't tell \"our integration broke\" from \"we lost a customer\" — a real blind spot that only surfaces when you actually test failure modes instead of just the happy path.",
        },
      ],
      caveat:
        "Both findings above were caught because we deliberately broke things that were already working. That's the point of testing this way — the bugs were real, and they're fixed and re-verified against live execution logs, not just reasoned about on paper.",
      proof: [
        {
          src: "/laneframe/n8n/n2-break3-fix.webp",
          alt: "n8n executions list showing execution #275 succeeded, labeled 'Fix churn_queue column name'",
          caption: "Execution #275 — the second, dormant bug fixed and re-verified live after the first fix exposed it.",
        },
        {
          src: "/laneframe/n8n/n2-break4-stripe.webp",
          alt: "n8n canvas showing the entitlements-Stripe reconciliation sweep succeeding and sending a Slack alert",
          caption: "The reconciliation sweep that surfaced the revoked-key-vs-real-cancellation blind spot.",
        },
      ],
    },
    {
      id: "N3",
      title: "Documentation Support Agent",
      status: "Complete",
      summary:
        "An AI support agent that answers from real documentation and is built to say \"I don't know, let me get you a person\" rather than guess.",
      whatItDoes:
        "Customers ask questions in plain language; the agent retrieves the relevant documentation, and answers only when it's confident the documentation actually supports the answer. When it isn't confident, it refuses cleanly, opens a support ticket, and alerts the team — rather than making something up. It was calibrated against a 60-question set built specifically to include near-miss questions designed to tempt a wrong answer.",
      testedAgainst: [
        "60-question calibration set (20 covered / 20 near-miss / 20 out of scope)",
        "Deliberately broken retrieval credential",
        "Rate-limit conditions",
        "Malformed model output",
      ],
      whatWeFound: [
        {
          headline: "A measured 4.8-second response time",
          detail:
            "Not an estimate — timed directly from a real webhook call to final reply, and re-confirmed on a second run.",
        },
        {
          headline: "Passed a genuine fail-closed test",
          detail:
            "We deliberately broke the database credential the agent uses to retrieve documentation, then sent it a real question. It didn't crash, and it didn't guess — it refused cleanly, filed a support ticket, and alerted the team, exactly as designed.",
        },
        {
          headline: "Calibration is reported honestly, not rounded up",
          detail:
            "Out of 60 test questions, 2 genuine false-positive risks were found and are disclosed plainly rather than smoothed over — the agent correctly refuses every in-scope question, but a small number of out-of-scope questions still slip through to an answer.",
        },
      ],
      proof: [
        {
          src: "/laneframe/n8n/n3-canvas.webp",
          alt: "n8n canvas view of the N3 Documentation Support Agent workflow",
          caption: "The agent workflow — retrieval, confidence gating, human-review escalation, and refusal handling.",
        },
        {
          src: "/laneframe/n8n/n3-fail-closed.webp",
          alt: "Evidence card showing the N3 fail-closed test: a broken retrieval credential caught cleanly and refused without crashing",
          caption:
            "The fail-closed test: a broken credential is caught cleanly, and the customer still gets an honest reply instead of a crash.",
        },
        {
          src: "/laneframe/n8n/n3-confusion-matrix.webp",
          alt: "3x3 confusion matrix showing calibration results across covered, near-miss, and uncovered questions",
          caption: "The full calibration matrix — including the 2 real false-positive risks, reported plainly.",
        },
      ],
    },
  ],
};

export default n8n;
