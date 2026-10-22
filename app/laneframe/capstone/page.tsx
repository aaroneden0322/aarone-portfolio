import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import BackToTop from "@/components/site/BackToTop";
import CtaBand from "@/components/site/CtaBand";
import FloatingAction from "@/components/site/FloatingAction";
import CapstoneFilm from "@/components/site/CapstoneFilm";
import CapstoneMeters from "@/components/site/CapstoneMeters";
import { FILM_DURATION } from "@/data/laneframe/film";
import { SITE_URL, pageMeta } from "@/lib/seo";
import "./capstone.css";

const TITLE =
  "Four platforms, one specification | Laneframe capstone | Aarone Den Patayan";
const DESC =
  "The same lead-handling system built on n8n, Make, Zapier and GoHighLevel, compared against one specification, with measured results and what was not measured.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/laneframe/capstone",
});

/**
 * The capstone body is one authored HTML string. It is cut in three so the
 * film can sit under the header and the meters animation inside section 3.
 * Ids are added to every h2 (#s1..#s10) and to the probes heading so the
 * film's chapter links have somewhere to land.
 */
function splitCapstone(raw: string) {
  let n = 0;
  let html = raw.replace(/<h2>/g, () => `<h2 id="s${++n}">`);
  html = html.replace(
    "<h3>The five probes, as run rather than as specified</h3>",
    '<h3 id="probes">The five probes, as run rather than as specified</h3>',
  );
  html = html.replace(/^\s*<div class="wrap">/, "").replace(/<\/div>\s*$/, "");

  const a = html.indexOf("</header>") + "</header>".length;
  const h3 = html.indexOf('<h2 id="s3">');
  const b = html.indexOf('<div class="card"', html.indexOf("</div>", h3));
  if (a < 20 || h3 < 0 || b < 0) throw new Error("capstone.html layout changed");
  return [html.slice(0, a), html.slice(a, b), html.slice(b)];
}

export default function Page() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "src/data/laneframe/capstone.html"),
    "utf8",
  );
  const [head, mid, tail] = splitCapstone(raw);
  const iso = `PT${Math.floor(FILM_DURATION / 60)}M${Math.round(FILM_DURATION % 60)}S`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "One job, four automation tools: the Laneframe capstone in under three minutes",
    description:
      "A short animated film of the Laneframe capstone: one sample-business job built on n8n, Make, Zapier and GoHighLevel, then five break tests on each. A sample business, not a real client.",
    thumbnailUrl: `${SITE_URL}/laneframe/film/poster-dark.webp`,
    contentUrl: `${SITE_URL}/laneframe/film/film-dark.mp4`,
    duration: iso,
    uploadDate: "2026-10-19",
    inLanguage: "en",
  };
  return (
    <>
      <Nav />
      <main className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <a href="/#laneframe" className="text-sm font-medium text-circuit hover:underline">
            ← Back to Laneframe
          </a>
        </div>
        <div className="capstone mx-auto mt-6 max-w-[1060px]">
          <div className="wrap">
            <div dangerouslySetInnerHTML={{ __html: head }} />
            <CapstoneFilm />
            <div dangerouslySetInnerHTML={{ __html: mid }} />
            <CapstoneMeters />
            <div dangerouslySetInnerHTML={{ __html: tail }} />
          </div>
        </div>
        <CtaBand text="Want your next automation tested like this before your customers touch it?" />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <Footer />
      <FloatingAction />
      <BackToTop />
    </>
  );
}
