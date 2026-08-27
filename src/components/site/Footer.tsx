const NAV_COL_1 = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Case Studies" },
  { href: "#process", label: "Process" },
];
const NAV_COL_2 = [
  { href: "#laneframe", label: "Laneframe" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
const SOCIALS = [
  { href: "https://linkedin.com/in/aarone-den-patayan-688974341", label: "LinkedIn" },
  { href: "https://x.com/aarone_den", label: "X / Twitter" },
  { href: "https://github.com/aaroneden0322", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            Aarone Den Patayan
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Built to break first, so it doesn&rsquo;t break for you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col gap-2">
            {NAV_COL_1.map((l) => (
              <a key={l.href} href={l.href} className="text-ink-muted hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {NAV_COL_2.map((l) => (
              <a key={l.href} href={l.href} className="text-ink-muted hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex gap-5 md:justify-end">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
