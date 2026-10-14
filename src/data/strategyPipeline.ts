export const PIPELINE_NOTICE =
  "Process write-up. The system has been tested end to end on one test client. I have no live client results or measured accuracy to show yet, so this page describes how it is built and what I have checked, nothing more.";

export const PIPELINE = {
  eyebrow: "CASE STUDY · PROCESS WRITE-UP",
  title: "AI-written marketing automation plans, built in stages",
  tagline:
    "A process that turns the recording of a discovery call into a complete GoHighLevel strategy document, then carries the work through to delivery. The labels are the same every time and the styling uses the client's own brand colours.",
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
        "Split the work into smaller steps, organised by how data flows between the sections instead of by section number, so each step gets what it depends on.",
    },
  ],
  rules: [
    {
      headline: "Locked data moves in a structured handoff",
      body: "Decisions made early are passed forward as structured data, so later steps read them instead of working them out again.",
    },
    {
      headline: "Client colours on every document",
      body: "Strategy documents are styled in the client's own brand colours, not mine. That was a deliberate decision.",
    },
    {
      headline: "Tags follow a locked rule",
      body: "The GoHighLevel tagging convention is written into the build step as a locked rule. It is applied the same way on every client instead of being invented fresh each time, which keeps labels consistent.",
    },
    {
      headline: "Every version can be traced",
      body: "Each part of the process has a version number and its own changelog, and the current files are checked by checksum. I can say exactly which version produced a document.",
    },
  ],
  testing: [
    "The system has been through about 76 working sessions of testing and revision.",
    "End-to-end runs used one test client, and a validation pass was added after those runs.",
    "An audit of an early HTML output found six serious bugs, including a script that pointed at the wrong element IDs, stray style classes, a missing footer and a conflicting billing date. All were patched.",
  ],
  limits: [
    "Only one test client so far, so I do not yet know how well it handles a very different kind of business. A second test client is on my list.",
    "There are no live client results yet.",
    "I have not measured how often a generated plan needs editing before it is ready.",
    "It has several steps and is built for me to run, not for a client to run alone.",
  ],
};
