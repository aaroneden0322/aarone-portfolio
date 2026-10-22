import type { Metadata } from "next";
import LeadEnrichmentPage from "@/components/site/LeadEnrichmentPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Lead research and outreach drafts (mock data) | Aarone Den Patayan",
  description:
    "A demo build on fictional data: an n8n workflow that enriches and scores new leads, drafts a first email with AI, checks it twice and hands it to a person in HubSpot.",
  path: "/case-studies/lead-enrichment",
});

export default function Page() {
  return <LeadEnrichmentPage />;
}
