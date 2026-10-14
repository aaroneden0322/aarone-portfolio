import type { Metadata } from "next";
import LeadEnrichmentPage from "@/components/site/LeadEnrichmentPage";

export const metadata: Metadata = {
  title: "Lead research and outreach drafts (mock data) | Aarone Den Patayan",
  description:
    "A demo build on fictional data: an n8n workflow that enriches and scores new leads, drafts a first email with AI, checks it twice and hands it to a person in HubSpot.",
};

export default function Page() {
  return <LeadEnrichmentPage />;
}
