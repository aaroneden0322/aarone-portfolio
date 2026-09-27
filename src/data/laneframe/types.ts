export type BuildStatus = "Complete" | "In Progress" | "Not Started";

export interface BuildFinding {
  headline: string;
  /** Plain-English one-liner shown to every visitor. */
  plain?: string;
  /** Full technical explanation, shown inside "Technical detail". */
  detail: string;
}

export interface BuildProof {
  src: string;
  alt: string;
  caption: string;
}

export interface PlatformBuild {
  id: string;
  title: string;
  status: BuildStatus;
  summary: string;
  whatItDoes: string;
  testedAgainst: string[];
  whatWeFound: BuildFinding[];
  /** Plain-English version of the caveat, shown to every visitor. */
  caveatPlain?: string;
  caveat?: string;
  proof: BuildProof[];
}

export interface WhyPoint {
  label: string;
  detail: string;
}

export interface PlatformPageData {
  slug: string;
  name: string;
  status: string;
  tagline: string;
  whyThisPlatform: WhyPoint[];
  builds: PlatformBuild[];
}
