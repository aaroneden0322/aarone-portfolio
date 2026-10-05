import type { PlatformPageData } from "./types";

const gohighlevel: PlatformPageData = {
  slug: "gohighlevel",
  name: "GoHighLevel",
  status: "1 build complete, more in progress",
  tagline:
    "GoHighLevel plus an AI helper that qualifies leads by email, with hard limits on what the AI is allowed to do.",
  whyThisPlatform: [
    {
      label: "One place for the customer",
      detail:
        "GoHighLevel holds the contact, the email thread, the sales pipeline and the calendar. When the AI answers a lead, the answer lands where the sales team already works.",
    },
    {
      label: "A safety net built in",
      detail:
        "Workflows can wait, check, tag, assign a person and send alerts without extra tools. That is what makes the hard limits on the AI possible.",
    },
    {
      label: "A separate brain, on purpose",
      detail:
        "GoHighLevel’s own AI agent wasn’t live on this account, so the AI step runs in n8n and reports back. That let me test the AI on its own and see exactly what it was told and what it said.",
    },
  ],
  builds: [
    {
      id: "G3",
      title: "AI Email Qualifier with a Booking Gate",
      status: "Complete",
      summary:
        "A prospect replies to an email. The AI reads the reply, pulls out four facts (how many trucks they run, what system they use now, when they plan to decide, and their role) and writes a short answer asking for whatever is missing. It has to quote the prospect’s own words for every fact it records. When all four are confirmed, the system books the demo. If the AI doesn’t answer within 90 seconds, a person takes over automatically.",
      whatItDoes:
        "Three GoHighLevel workflows around one n8n workflow. G3·01 (Bridge Out) fires on a prospect reply and posts the message to n8n. G3·01a (Agent Timeout Watch) waits 90 seconds and checks for the agent-replied tag; on Timeout it tags the contact, assigns a team member, sends a handover email, notifies the team and posts a Slack alert. G3·02 (Bridge In) receives the model’s structured answer on an inbound webhook, checks turn_id against the contact’s Last Turn ID for duplicates, checks payload integrity, writes the four fields with their evidence quotes, and branches on the agent’s action (ask, confirm, book, escalate). The booking branch re-checks the held fields on the contact before it books. G3·03 sweeps stale conversations. The model call itself (one call per turn, through OpenRouter) lives in n8n, with a validator that rejects values the evidence quote doesn’t support.",
      testedAgainst: [
        "The AI service switched off",
        "A garbled message",
        "The same message twice",
        "A vague answer (“a dozen and a half trucks”)",
        "The AI asking to book too early",
        "A question it should not answer",
      ],
      whatWeFound: [
        {
          headline: "The system won’t book a demo just because the AI says so",
          plain:
            "I sent a “book now” instruction with the truck count missing. GoHighLevel checked the facts itself and refused. It tagged the contact agent-overreach, alerted the sales owner, sent no booking link and created no deal.",
          detail:
            "The booking gate in G3·02 re-checks the held fields on the contact before the booking branch runs. On a failed check it takes None - Gate Failed, adds the agent-overreach tag (11f), fires the internal notification (11g) and skips the booking email (11h, Skipped) and the opportunity. The test payload was a hand-built message with action=book and every field null, posted straight to the G3·02 webhook, so it proves the gate’s behavior and not what the real AI would have said.",
        },
        {
          headline: "I caught the AI turning “a dozen and a half” into 15",
          plain:
            "The prospect only said “about a dozen and a half,” yet the system saved a firm fleet size of 15. (A dozen and a half is 18.) I changed the AI’s instructions so a truck count has to be digits the prospect actually wrote, and added a code check as a second lock. On the re-run it left the field empty and asked, “What exact number of trucks do you run?” A real answer (“14 trucks”) is still accepted.",
          detail:
            "The validator already enforced a verbatim evidence quote and valid timeline options, but not the value itself. In the failing run (n8n execution 568) the model wrote “about 15” with the evidence “about a dozen and a half trucks, give or take” and Validate Model Output accepted it. The fix is a prompt rule plus a digits-in-evidence check in Validate Model Output. In the re-run (execution 570) the model returned null on its own, so the code check has not fired live yet; it is a backstop. A regression run (execution 571) confirmed “14 trucks” still passes.",
        },
        {
          headline: "With the AI offline, a person took over within 90 seconds",
          plain:
            "I turned the AI service off and replied as a prospect. The send failed, GoHighLevel waited 90 seconds, saw no AI reply, then tagged the contact, assigned a team member, emailed a handover note, notified the team and posted an alert. When I switched the AI back on, the next reply went through normally with no handover.",
          detail:
            "With the n8n workflow unpublished, the G3·01 webhook step returned an immediate 404 (one failed attempt, no visible retries). G3·01a waited 90 seconds, found no agent-replied tag, and ran the Timeout branch, steps 02b to 02j. After the n8n workflow was republished, the same check took the Agent Replied branch.",
        },
        {
          headline: "The same message sent twice only counted once",
          plain:
            "Sending the same turn twice didn’t update the contact twice. The second copy was tagged bridge-dupe-suppressed and stopped.",
          detail:
            "G3·02 compares the incoming turn_id with the contact’s Last Turn ID; a match takes A - Duplicate, then the Held check, adds the bridge-dupe-suppressed tag and ends. The two copies were posted 5 seconds apart as hand-built messages straight to GoHighLevel.",
        },
        {
          headline: "A garbled message was rejected before anything ran",
          plain:
            "A deliberately broken message was refused at the door with an error. No AI call and no GoHighLevel update happened.",
          detail:
            "Invalid JSON posted to the n8n webhook returns HTTP 422 (“Failed to parse request body”) before an execution is created, so nothing reaches the model or GoHighLevel.",
        },
        {
          headline: "A question the AI shouldn’t answer went to a person",
          plain:
            "Asked about SOC 2 reporting and a custom EDI integration, the AI said a Laneframe specialist would follow up, set the out-of-scope flag and stopped. The contact was assigned to a team member and tagged escalated-human and out-of-scope. No deal was created.",
          detail:
            "n8n execution 569: action=escalate, out_of_scope=true, every extracted field null, and a reply that declines both topics and offers a specialist. In GoHighLevel the contact owner was set and the escalated-human and out-of-scope tags were added, with no opportunity.",
        },
      ],
      caveatPlain:
        "Everything ran against test contacts and a sample company, not a real client. Two of the six tests (the booking gate and the repeated message) used hand-built messages sent straight to GoHighLevel. The vague-number fix and the escalation test went through the real AI. The offline and garbled-message tests never reach the AI by design. No texts were sent; email only, to test inboxes. On cost, the AI step runs at about $0.0004 per lead (worked out from measured usage, not measured per lead). GoHighLevel’s premium-action charges read $0.00 during the free trial, so I have no real per-lead figure for them and I don’t quote one.",
      caveat:
        "Costs: model usage was 16 requests and 11K tokens at a blended $0.21 per 1M tokens (OpenRouter activity page, 2026-10-01), about $0.00014 per request and about 3 requests per qualified lead, so about $0.0004 per lead. That per-lead figure is derived from those inputs. GoHighLevel premium workflow usage showed $0.00 during the trial and the cause is not established, so no premium cost per lead is given. List rate is $0.01 per premium execution. Plan price is $297 a month after the trial. Hosting is a shared $5.35 a month VPS, not specific to this build.",
      proof: [
        {
          src: "/laneframe/gohighlevel/g3-02-bridge-in-canvas.webp",
          alt: "GoHighLevel canvas for the G3·02 Bridge In workflow showing the duplicate check, payload integrity check and held-field branches",
          caption:
            "The inbound workflow: duplicate check first, then payload integrity, then a check that the evidence fields are held.",
        },
        {
          src: "/laneframe/gohighlevel/g3-f5-gate-failed-log.webp",
          alt: "GoHighLevel execution log showing the booking gate failing, the agent-overreach tag added, an internal notification sent and the booking email skipped",
          caption:
            "The booking gate refusing an early “book now”: gate failed, overreach tag, team alerted, booking email skipped.",
        },
        {
          src: "/laneframe/gohighlevel/g3-f4-fleet-size-15-fail.webp",
          alt: "GoHighLevel contact record showing Fleet Size 15 with the evidence quote about a dozen and a half trucks",
          caption:
            "The failure before the fix: a vague “dozen and a half” saved as a fleet size of 15.",
        },
        {
          src: "/laneframe/gohighlevel/g3-f1-timeout-takeover-steps.webp",
          alt: "GoHighLevel execution log for the Agent Timeout Watch workflow showing the 90 second wait finishing and the handover steps running",
          caption:
            "AI offline: the 90-second wait ends and the handover steps run, from tagging and assigning a person to the Slack alert.",
        },
        {
          src: "/laneframe/gohighlevel/g3-f3-duplicate-suppressed-log.webp",
          alt: "GoHighLevel execution log showing a repeated message taking the duplicate branch and being tagged bridge-dupe-suppressed",
          caption:
            "The second copy of the same message taking the duplicate branch and stopping.",
        },
        {
          src: "/laneframe/gohighlevel/g3-f6-escalated-contact-tags.webp",
          alt: "GoHighLevel contact record showing the escalated-human and out-of-scope tags, an assigned owner and no opportunities",
          caption:
            "The out-of-scope question: owner assigned, escalated-human and out-of-scope tags, no deal. (The other tags are left over from earlier tests on the same test contact.)",
        },
      ],
    },
  ],
};

export default gohighlevel;
