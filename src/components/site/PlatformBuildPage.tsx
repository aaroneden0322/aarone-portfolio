import Nav from "./Nav";
import Footer from "./Footer";
import FloatingCta from "./FloatingCta";
import Reveal from "./Reveal";
import GlowCard from "./GlowCard";
import CtaBand from "./CtaBand";
import type { BuildStatus, PlatformPageData } from "@/data/laneframe/types";

const STATUS_COLOR: Record<BuildStatus, string> = {
  Complete: "text-circuit",
  "In Progress": "text-flow",
  "Not Started": "text-ink-muted",
};

const ALL_PLATFORMS = [
  { slug: "n8n", label: "n8n" },
  { slug: "make", label: "Make" },
  { slug: "zapier", label: "Zapier" },
  { slug: "gohighlevel", label: "GoHighLevel" },
];

export default function PlatformBuildPage({ data }: { data: PlatformPageData }) {
  const siblings = ALL_PLATFORMS.filter((p) => p.slug !== data.slug);

  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-5xl px-6 py-8">
          <Reveal>
            <a
              href="/#laneframe"
              className="text-sm font-medium text-circuit hover:underline"
            >
              ← Back to Laneframe
            </a>
            <p className="mt-6 font-display text-sm font-semibold tracking-[0.15em] text-circuit">
              LANEFRAME · {data.name.toUpperCase()}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
              {data.name} build detail
            </h1>
            <p className="mt-3 text-sm font-semibold text-circuit">{data.status}</p>
            <p className="mt-4 max-w-2xl text-ink-muted">{data.tagline}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {data.whyThisPlatform.map((w) => (
                <div
                  key={w.label}
                  className="rounded-2xl border border-border bg-surface/[0.02] p-5"
                >
                  <p className="font-display text-sm font-semibold text-ink">
                    {w.label}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{w.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {data.builds.map((build, i) => (
          <section key={build.id} className="mx-auto max-w-5xl px-6 py-8">
            <Reveal delay={i * 60}>
              <GlowCard className="p-6 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] text-ink-muted">
                      {build.id}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">
                      {build.title}
                    </h2>
                  </div>
                  <span
                    className={`text-xs font-semibold ${STATUS_COLOR[build.status]}`}
                  >
                    {build.status}
                  </span>
                </div>

                <p className="mt-4 max-w-3xl text-ink-muted">{build.summary}</p>
                <p className="mt-4 max-w-3xl text-sm text-ink-muted">
                  {build.whatItDoes}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-semibold tracking-[0.1em] text-ink-muted">
                    TESTED AGAINST
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {build.testedAgainst.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {build.whatWeFound.map((f) => (
                    <div
                      key={f.headline}
                      className="rounded-xl border border-circuit/25 bg-circuit/[0.04] p-5"
                    >
                      <p className="font-display text-sm font-semibold text-ink">
                        {f.headline}
                      </p>
                      <p className="mt-2 text-sm text-ink-muted">{f.detail}</p>
                    </div>
                  ))}
                </div>

                {build.caveat && (
                  <p className="mt-6 max-w-3xl text-xs text-ink-muted/80">
                    Methodology note: {build.caveat}
                  </p>
                )}

                {build.proof.length > 0 && (
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {build.proof.map((p) => (
                      <figure
                        key={p.src}
                        className="overflow-hidden rounded-xl border border-border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading="lazy"
                          className="w-full"
                        />
                        <figcaption className="border-t border-border bg-surface/[0.02] px-4 py-3 text-xs text-ink-muted">
                          {p.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </GlowCard>
            </Reveal>
          </section>
        ))}

        <CtaBand text="Want a build stress-tested like this before it reaches your customers?" />

        <section className="mx-auto max-w-5xl px-6 pb-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.1em] text-ink-muted">
              SEE THE SAME SPECIFICATION ON ANOTHER PLATFORM
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {siblings.map((s) => (
                <a
                  key={s.slug}
                  href={`/laneframe/${s.slug}`}
                  className="rounded-full border border-border px-4 py-2 text-sm text-ink-muted transition-colors hover:border-circuit/40 hover:text-ink"
                >
                  {s.label} →
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
