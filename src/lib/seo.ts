import type { Metadata } from "next";

export const SITE_URL = "https://www.adautoteam.top";
export const SITE_NAME = "Aarone Den Patayan";
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Aarone Den Patayan, Marketing & AI Automation Specialist. I break it first, so it doesn't break for you.",
};

// Every page sets its own title, description and canonical. Next.js replaces
// (does not merge) the openGraph and twitter objects per route, so this helper
// repeats the share image each time.
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

// Public pages that belong in the sitemap. Add new routes here.
export const SITEMAP_PATHS = [
  "/",
  "/laneframe/n8n",
  "/laneframe/make",
  "/laneframe/zapier",
  "/laneframe/gohighlevel",
  "/laneframe/capstone",
  "/case-studies/lead-enrichment",
  "/privacy",
];
