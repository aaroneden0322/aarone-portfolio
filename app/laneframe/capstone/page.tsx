import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import BackToTop from "@/components/site/BackToTop";
import "./capstone.css";

export const metadata: Metadata = {
  title: "Four platforms, one specification | Laneframe capstone | Aarone Den Patayan",
  description:
    "The same lead-handling system built on n8n, Make, Zapier and GoHighLevel, compared against one specification, with measured results and what was not measured.",
};

export default function Page() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/data/laneframe/capstone.html"),
    "utf8"
  );
  return (
    <>
      <Nav />
      <main className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <a href="/#laneframe" className="text-sm font-medium text-circuit hover:underline">
            ← Back to Laneframe
          </a>
        </div>
        <div
          className="capstone mx-auto mt-6 max-w-[1060px]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
