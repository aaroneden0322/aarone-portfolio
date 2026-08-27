# Aarone Den Patayan — Portfolio Site

Next.js 14 (App Router, TypeScript, Tailwind CSS), static export (`output: "export"`), deployed on Vercel's Hobby tier.

## Stack

- Next.js 14 App Router, static export — zero serverless functions
- Tailwind CSS — palette, keyframes and animations all live in `tailwind.config.js`
- Fonts: Inter (body) and Space Grotesk (display), via `next/font/google`
- Contact form posts client-side to a real n8n webhook (no API routes — this is a fully static export)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `out/`.

## A note on keyframes

Every CSS `@keyframes` used on this site (`marquee`, `marquee-reverse`, `fade-up`, `dashflow`, `drift`, `pulse-dot`) is registered in `tailwind.config.js` under `theme.extend.keyframes` + `theme.extend.animation`, and consumed in `app/globals.css` via `@apply animate-*`. Do not hand-write an `animation: name ...;` rule against one of these keyframes — if the corresponding `animate-*` utility class isn't literally consumed somewhere, Tailwind's content-based purge will silently strip the `@keyframes` rule out of the production build. This exact bug has shipped twice before on earlier rebuilds of this site.

## Deployment

Connected to Vercel project `aarone-portfolio` via this repository's git integration — pushes to `main` deploy automatically.
