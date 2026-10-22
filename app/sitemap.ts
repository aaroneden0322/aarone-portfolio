import type { MetadataRoute } from "next";
import { SITE_URL, SITEMAP_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((p) => ({
    url: p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`,
  }));
}
