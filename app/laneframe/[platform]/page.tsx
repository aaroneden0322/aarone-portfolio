import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlatformBuildPage from "@/components/site/PlatformBuildPage";
import n8n from "@/data/laneframe/n8n";
import make from "@/data/laneframe/make";
import zapier from "@/data/laneframe/zapier";
import gohighlevel from "@/data/laneframe/gohighlevel";
import type { PlatformPageData } from "@/data/laneframe/types";

const PLATFORMS: Record<string, PlatformPageData> = {
  n8n,
  make,
  zapier,
  gohighlevel,
};

export function generateStaticParams() {
  return Object.keys(PLATFORMS).map((platform) => ({ platform }));
}

export function generateMetadata({
  params,
}: {
  params: { platform: string };
}): Metadata {
  const data = PLATFORMS[params.platform];
  if (!data) return {};
  return {
    title: `${data.name} build detail — Laneframe | Aarone Den Patayan`,
    description: data.tagline,
  };
}

export default function Page({ params }: { params: { platform: string } }) {
  const data = PLATFORMS[params.platform];
  if (!data) notFound();
  return <PlatformBuildPage data={data} />;
}
