import type { PlatformPageData } from "./types";

const zapier: PlatformPageData = {
  slug: "zapier",
  name: "Zapier",
  status: "3 of 3 builds complete",
  tagline:
    "You pay per completed step, and each automation has a hard size limit. It forced the hardest trade-offs of the four.",
  whyThisPlatform: [
    {
      label: "It charged less than its own help pages said",
      detail:
        "A completed step costs 1 unit and a skipped one costs nothing. On one live run, Zapier charged less than its own documentation predicted, confirmed against the account’s real usage counter.",
    },
    {
      label: "A size limit changed what got built",
      detail:
        "Each Zap is capped at about 32 steps. To fit, the build was split into smaller linked parts, and two planned features (text messages and company lookups) had to be dropped. n8n and Make kept both.",
    },
    {
      label: "No way to export or back it up",
      detail:
        "On this plan there’s no file you can export to copy or restore a build, unlike n8n and Make. The live Zaps are the only record.",
    },
  ],
  builds: [
    {
      id: "Z1",
      title: "Lead Sorter & Demo Booker",
      status: "Complete",
      summary:
        "Takes in leads, removes duplicates, scores them and sends each one to the right next step. It’s the same job as the n8n and Make versions, split into three linked parts to fit under Zapier’s size limit.",
      whatItDoes:
        "A webhook receives the lead, two Formatter steps normalize it, a guard-halted-logging Sub-Zap call and filter catch malformed intake, two HubSpot lookups guard against duplicates, and a three-way Paths router sends Founder/SDR/self-serve leads to their own CRM, Slack, and Sheets actions — with a second Sub-Zap handling existing-lead re-engagement and dormancy scoring.",
      testedAgainst: [
        "Badly filled-in forms",
        "Duplicate and long-silent leads",
        "A live test of the safety check",
      ],
      whatWeFound: [
        {
          headline: "Zapier’s bill didn’t match its own documentation",
          plain: "Zapier’s help pages said this run should cost 2 units; the account’s own counter showed it cost 1. A real gap between what the docs say and what actually happens, disclosed here.",
          detail:
            "Zapier's help docs predict a 2-action Sub-Zap child bills 2 tasks for those actions alone. A real, live guard-halted run — confirmed against the account's own task counter moving by exactly +1, not assumed from a green checkmark — billed only 1. A genuine, disclosed gap between the platform's own documentation and its observed behavior, never resolved against Zapier support.",
        },
        {
          headline: "The size limit forced two features out",
          plain: "To stay under the limit, the company-lookup and text-message steps were removed completely. On n8n and Make they were kept and fail gracefully. This build is smaller than planned because of Zapier’s size limit.",
          detail:
            "A permanently-failing enrichment call and an undeliverable Twilio SMS step were both removed entirely to free up step slots, rather than kept in a degraded, gracefully-skipped form the way the same failures were handled on n8n and Make. The finished build is structurally smaller than its original specification because of a platform constraint, not a design choice.",
        },
      ],
      caveatPlain:
        "Only 2 of the 5 standard break tests could be run. The other 3 tested features that were removed because of the size limit, so those features don’t exist in this build.",
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
      title: "Lead Sorter: Email Version",
      status: "Complete",
      summary:
        "The same lead sorter, but taking leads from incoming emails instead of a web form, because on Zapier each way in needs its own build.",
      whatItDoes:
        "An Email Parser mailbox extracts lead fields from inbound referral emails, feeds the same fit-scoring and dedupe logic as Z1's router, and reuses Z1's own re-engagement Sub-Zap rather than duplicating it — a single 30-step Zap with no dedicated child Sub-Zaps of its own.",
      testedAgainst: [
        "A genuinely new referral email",
        "An email written to match the training example",
        "Repeat enquiries from the same lead",
      ],
      whatWeFound: [
        {
          headline: "A normal-looking email was stopped by the safety check",
          plain: "A real referral email was read wrongly: two details came out wrong and the company website was missing. The safety check stopped it, as designed, so no bad data reached the customer database.",
          detail:
            "A genuinely new referral email — not a synthetic malformed test — mis-extracted two fields and produced no domain at all, correctly triggering Path B's guard rather than routing to CRM logic with bad data. Zero HubSpot lookups fired, exactly as the guard is meant to do.",
        },
        {
          headline: "The second test found the real cause",
          plain: "Rewording the email fixed two of the three wrong details, but not the website. The cause was a setup mistake inside one step. It’s a real bug, not a one-off.",
          detail:
            "Rewording the test email to match the trained template fixed two of three broken fields but not the domain extractor, which was found to be reading a stale, broken field reference — a real bug in the step's own configuration, confirmed by inspecting its live Data In (a literal \"1\" instead of an email), not a one-off fluke.",
        },
      ],
      caveatPlain:
        "This build has never taken a lead all the way through on a live test. Both attempts were stopped by the safety check, and it won’t until that setup mistake is fixed.",
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
      title: "AI Support-Ticket Assistant",
      status: "Complete",
      summary:
        "An AI assistant that sorts and answers support tickets from real documents and passes anything it can’t back up with a quote to a person. It’s the same job as the n8n and Make versions, but Zapier has no built-in approval step or confidence score.",
      whatItDoes:
        "A support ticket is classified, checked against two attached knowledge documents, and either answered with a quoted passage or escalated. Nothing reaches a customer without human approval — enforced entirely by a system-prompt rule and the deliberate choice of a draft-only Gmail action, since Zapier's Agents builder has no dedicated approval-gate toggle at all.",
      testedAgainst: [
        "12 test questions (4 answerable, 4 not covered, 4 near-miss)",
        "One big ticket that uses every tool at once",
        "A real failure in a connected app",
      ],
      whatWeFound: [
        {
          headline: "The hand-off rule failed half the time it mattered",
          plain: "It answered all 4 straightforward questions correctly. But on the 8 questions it should have passed to a person, it got 4 wrong, once even denying it could hand off at all.",
          detail:
            "8 of 12 probes passed overall, but the coverage rule — \"if you can't quote a passage, escalate\" — failed on 4 of the 8 uncovered and near-miss questions, including one case where the agent flatly denied having any escalation process when asked to invoke it. Zero failures occurred on the 4 covered questions; the gap is entirely in judgment calls, not lookups.",
        },
        {
          headline: "An urgent alert never went out, and nothing flagged it",
          plain: "Given a ticket about an outage, the AI said it would post an urgent Slack alert, then never did. Its own log confirms it, and nothing warned a person that the alert was missed.",
          detail:
            "Fed a ticket containing the system prompt's own trigger phrase for an outage, the agent narrated an intention to post a Slack alert and then never did — confirmed by the run's own tool-usage log, which shows no Slack call at all. The ticket was still otherwise handled correctly, but the one safety action its own rules were written to guarantee simply didn't fire, and no summary or log flagged that gap to a human.",
        },
      ],
      caveatPlain:
        "When a connected app genuinely failed, the AI flagged it clearly and gave a manual workaround. It handles that kind of failure well. The judgment calls above are where it doesn’t.",
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
