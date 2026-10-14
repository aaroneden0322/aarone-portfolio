import type { BuildProof } from "@/data/laneframe/types";

export const MOCK_NOTICE =
  "Demo build with fictional data. Every lead, company and contact on this page is made up for testing (property-management owners, demo domains, 555 phone numbers). This is not client work, and no real person was emailed. Nothing in this workflow sends email.";

export const LEAD_ENRICHMENT = {
  eyebrow: "CASE STUDY · MOCK DATA",
  title: "Lead research and first-touch drafts, checked before a person sees them",
  tagline:
    "A new lead comes in. The workflow cleans it up, looks up the company, scores it, writes a short first email and checks that email twice. Then it stops and hands the draft to a person in HubSpot.",
  stats: [
    { value: "112", label: "drafts written under the final rules" },
    { value: "110", label: "passed every check, 2 held for a person to edit" },
    { value: "28 of 30", label: "trick leads stopped before the AI saw them" },
    { value: "$0.007", label: "estimated cost per drafted lead" },
  ],
  why: [
    {
      label: "The problem",
      detail:
        "Writing a first email to every new lead takes time, and an AI that writes it alone will eventually invent a fact or obey an instruction hidden in a form field.",
    },
    {
      label: "The approach",
      detail:
        "Let the AI write only from a few safe fields, check the result with plain code and a second AI call, and keep a person as the final step.",
    },
    {
      label: "The scenario",
      detail:
        "Vacation-rental management leads for a fictional property-management company. All data is invented and labelled as a demo.",
    },
  ],
  steps: [
    {
      n: "1",
      title: "Clean up the lead",
      body: "Emails are lowercased and tidied, duplicates inside a batch are rejected, and bad rows are logged with a reason instead of quietly dropped.",
    },
    {
      n: "2",
      title: "Look up the company",
      body: "Company details come from a lookup service. Results are cached for 30 days, so the same domain is never paid for twice. Free email addresses are skipped, and a failed lookup is never saved as an answer.",
    },
    {
      n: "3",
      title: "Score the lead",
      body: "Each lead is hot, warm or nurture, with a written reason for every point of the score.",
    },
    {
      n: "4",
      title: "Screen for tricks",
      body: "Text that tries to give the AI orders, such as an instruction to ignore its rules, is quarantined. Flagged leads never reach the AI and get a flagged task for a person instead.",
    },
    {
      n: "5",
      title: "Draft and double-check",
      body: "The AI sees only the first name, full name, street, city and state. Code then checks the draft: 45 to 110 words, one question, no links, every number taken from the address. A second, separate AI call checks each claim against the lead data.",
    },
    {
      n: "6",
      title: "Hand it to a person",
      body: "The contact and a review task are created in HubSpot. A clean draft is marked as passed, and anything else is marked for editing with the list of issues. If the lead replies, the follow-up stops. If not, one reminder task appears after 3 days.",
    },
  ],
  testedAgainst: [
    "30 prompt-injection leads",
    "110 ordinary leads",
    "Same person entered three ways",
    "Wrong or missing access key",
    "Malformed rows",
    "AI model outage",
    "Fact-checker outage",
    "HubSpot error mid-batch",
    "Lookup service outage",
    "Real and automatic replies",
  ],
  findings: [
    {
      headline: "The AI fact-checker alone was not enough",
      body: "In the first big run it missed 13 drafts that tied a lead to a company the data never mentioned. The fix was upstream: company data is never sent to the drafting AI at all, and rules written in code carry the safety.",
    },
    {
      headline: "28 of 30 trick leads were stopped",
      body: "The other two got through the screen but could only produce clean drafts, because the AI sees nothing except a name and an address. No injected instruction was ever obeyed, and none of the 110 ordinary leads was wrongly quarantined.",
    },
    {
      headline: "A real lead was getting lost",
      body: "When two lookups missed the cache in the same batch, one lead vanished. Testing found it and it was fixed and retested. A later round of failure tests also found that malformed rows were being dropped silently, so they are now rejected and logged.",
    },
    {
      headline: "Outages keep the lead",
      body: "If the AI is down, the lead is kept and a no-draft task goes to a person. If HubSpot rejects one lead, the rest of the batch continues and the failure is logged with the lead's email.",
    },
  ],
  cost: {
    headline: "What it costs to run",
    body: "Drafting and fact-checking use Claude Sonnet 4.6 through OpenRouter. In a clean demo run the estimate was about $0.0070 per drafted lead, or roughly $7 per 1,000. Token counts are estimates calibrated against the OpenRouter activity export, where 196 drafts averaged 804 tokens in and 166 out. Leads that are rejected or quarantined never reach the AI and cost nothing.",
  },
  limits: [
    "The drafts are short and plain on purpose. The rules ban claims about clients, results, markets or the lead's situation, so they read as safe and generic. More personal drafts need verified data fields, because loosening the rules would invite invented facts.",
    "Everything was tested on synthetic leads. Real leads will be messier.",
    "There is no real mailbox. Replies arrive through a webhook, so reply detection was tested with test replies only.",
    "Only one reminder is sent, 3 days after the review task is created, and deals are not tracked.",
    "A lead sent again in a later run updates the same contact but creates a new review task. The same domain twice in one batch misses the cache twice.",
    "If the run log itself cannot be written, the n8n execution list is the only record, and failed leads are re-run by hand.",
  ],
  technical: [
    "Built in n8n as one workflow with eight sections: intake (webhook with a header key, a CSV upload form behind Basic Auth, and a mock batch), enrichment with a Data Table cache, scoring and routing with an injection pre-screen, AI drafting with a verifier, CRM and human gate, reply detection, a follow-up reminder, and a health report.",
    "The health report is a protected page that shows outcomes, cache hit rate, estimated cost and reply counts. It contains totals only, with no names or emails.",
    "Access checks on the published URLs: no key and a wrong key return 403, an unknown path returns 404, and the report page without a login returns 401.",
    "Drafting protocol: the validation layer follows OWASP LLM01:2025 guidance on prompt injection (constrain the model, validate output in code, filter input, keep a human in the loop), and the separate verifier call follows the Chain-of-Verification idea. Phrases are banned only when they assert something the lead data does not contain or apply pressure, not because a word list sounds like AI.",
  ],
  proof: [
    {
      src: "/case-studies/lead-enrichment/le-canvas-overview.webp",
      alt: "n8n canvas showing the whole lead enrichment workflow in eight labelled sections",
      caption: "MOCK DATA. The whole workflow in n8n, from intake to the health report.",
    },
    {
      src: "/case-studies/lead-enrichment/le-verifier-pass.webp",
      alt: "n8n Merge Verdict node output showing a draft with an empty unsupported-claims list and status pass",
      caption: "MOCK DATA. A draft that passed: no unsupported claims, and every fact traced to a lead field.",
    },
    {
      src: "/case-studies/lead-enrichment/le-human-gate-task.webp",
      alt: "HubSpot review task listing the score reasons, the automated checks result and the draft email",
      caption: "MOCK DATA. The review task a person sees in HubSpot. Nothing is sent until they decide.",
    },
    {
      src: "/case-studies/lead-enrichment/le-health-outcomes.webp",
      alt: "Health report showing 8 leads, where each one went and the enrichment cache split",
      caption: "MOCK DATA. Health report: where every lead went and how often the cache saved a paid lookup.",
    },
    {
      src: "/case-studies/lead-enrichment/le-health-cost.webp",
      alt: "Health report showing estimated AI cost, tokens and about 6.62 dollars per 1,000 drafted leads",
      caption: "MOCK DATA. Health report: estimated cost per drafted lead, and reply and follow-up counts.",
    },
    {
      src: "/case-studies/lead-enrichment/le-auth-checks.webp",
      alt: "PowerShell showing 403, 403, 404 and 401 responses from the published webhooks",
      caption: "Access checks on the published URLs: no key, wrong key, unknown path and a report without a login.",
    },
  ] as BuildProof[],
};
