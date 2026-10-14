export const PIPELINE_NOTICE =
  "Process write-up. The system has been tested end to end on one test client. I have no live client results or measured accuracy to show yet, so this page describes how it is built and what I have checked, nothing more.";

export const PIPELINE = {
  eyebrow: "CASE STUDY · PROCESS WRITE-UP",
  title: "AI-written marketing automation plans, built in stages",
  tagline:
    "A set of prompts that turns a discovery call into a complete GoHighLevel strategy document, with the same labels every time and the client's own brand colours.",
  why: [
    {
      label: "The problem",
      detail:
        "My first version was one prompt of about 3,500 lines. Add a discovery call going in and a full document coming out, and it was more than one run could handle reliably. The model started improvising and the output fell apart in places.",
    },
    {
      label: "The cause",
      detail:
        "The cause was the design of the job. Tweaking the instructions could not fix a task that was too big for a single run.",
    },
    {
      label: "The fix",
      detail:
        "Split the work into a chain of prompts, cut by how data flows between sections instead of by section number, so each prompt gets what it depends on.",
    },
  ],
  stagesIntro:
    "The strategy document has ten sections. Several depend on earlier ones, so I mapped those dependencies first and grouped the sections around them.",
  stages: [
    { id: "A", title: "Classify the business", body: "Phase 0 classification, done before any section is written." },
    { id: "B", title: "Sections 2 to 4", body: "The first block of the document." },
    { id: "C", title: "Sections 5 and 6", body: "The next block of the document." },
    { id: "D", title: "Sections 7 to 9", body: "Includes scope, budget, phasing and the measurable goals." },
    { id: "E", title: "Sections 1 and 10, plus the bridge", body: "The opening and closing sections, and the handoff into the build." },
    { id: "F", title: "Assembly and validation", body: "Puts the pieces together and checks the result." },
  ],
  rules: [
    {
      headline: "Locked data moves in a structured handoff",
      body: "Decisions made early are passed to later prompts as structured data, so a later prompt reads them instead of working them out again. Every prompt in the chain uses the same schema version.",
    },
    {
      headline: "Client colours on every document",
      body: "Strategy documents are styled in the client's own brand colours, not mine. That was a deliberate decision.",
    },
    {
      headline: "Tags follow a locked rule",
      body: "The GoHighLevel tagging convention is written into the build-stage prompt as a locked rule. It is applied the same way on every client instead of being invented fresh each time, which keeps labels consistent.",
    },
    {
      headline: "Every version can be traced",
      body: "Each prompt has a version number and its own changelog, and the current files are checked by checksum. I can say exactly which version produced a document.",
    },
  ],
  afterPlan:
    "After the plan, four playbook prompts take over: one extracts the key details, one writes the copy assets, one plans the build and its analytics, and one assembles the result.",
  testing: [
    "The system has been through about 76 working sessions of testing and revision.",
    "End-to-end runs used one test client, and a validation pass was added after those runs.",
    "An audit of an early HTML output found six serious bugs, including a script that pointed at the wrong element IDs, stray style classes, a missing footer and a conflicting billing date. All were patched.",
  ],
  limits: [
    "Only one test client so far, so I do not yet know how well it handles a very different kind of business. A second test client is on my list.",
    "There are no live client results yet.",
    "I have not measured how often a generated plan needs editing before it is ready.",
    "It is a long chain. Running it takes several steps, and it is built for me or a trained operator, not for a client to run alone.",
  ],
};
