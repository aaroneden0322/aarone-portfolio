export type BuildStatus = "Complete" | "In Progress" | "Not Started";

export interface BuildFinding {
  headline: string;
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
