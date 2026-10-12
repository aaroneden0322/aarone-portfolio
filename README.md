# Aarone Den Patayan — Portfolio Site

Next.js 14 (App Router, TypeScript, Tailwind CSS), deployed on Vercel's Hobby tier. All pages are prerendered; the only serverless function is `/api/chat`.

## Stack

- Next.js 14 App Router. Pages are static; `app/api/chat/route.ts` is the one serverless function (the assistant gate)
- Tailwind CSS — palette, keyframes and animations all live in `tailwind.config.js`
- Fonts: Inter (body) and Space Grotesk (display), via `next/font/google`
- Contact form posts client-side to a real n8n webhook
- "Chat with Aarone's assistant" widget (`src/components/site/ChatAssistant.tsx`) talks only to `/api/chat`, which checks the request and forwards to a second n8n instance

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Next.js builds to `.next/` (no `out/` folder any more; Vercel handles the output).

## A note on keyframes

Every CSS `@keyframes` used on this site (`marquee`, `marquee-reverse`, `fade-up`, `dashflow`, `drift`, `pulse-dot`) is registered in `tailwind.config.js` under `theme.extend.keyframes` + `theme.extend.animation`, and consumed in `app/globals.css` via `@apply animate-*`. Do not hand-write an `animation: name ...;` rule against one of these keyframes — if the corresponding `animate-*` utility class isn't literally consumed somewhere, Tailwind's content-based purge will silently strip the `@keyframes` rule out of the production build. This exact bug has shipped twice before on earlier rebuilds of this site.

## Deployment

Connected to Vercel project `aarone-portfolio` via this repository's git integration — pushes to `main` deploy automatically.


## Assistant chat

Browser widget -> `/api/chat` (this repo, no AI) -> n8n webhook `assistant-chat` (separate n8n + Postgres on the VPS). The route checks origin, content type, body size and message length, verifies Cloudflare Turnstile on the first message of a chat, issues a signed session token (HMAC, 2 hours, tied to the visitor IP), and adds the `X-Assistant-Secret` header the browser must never see. n8n owns every rule about what the assistant says: kill switch, daily spend cap, per-IP and per-chat limits, strikes, output checks.

Environment variables (see `.env.example`; set in Vercel, never commit values):

| Variable | Where | Purpose |
|---|---|---|
| `ASSISTANT_SECRET` | server | Same value as the n8n credential "Header Auth - Portfolio Assistant" |
| `TURNSTILE_SECRET_KEY` | server | Cloudflare Turnstile secret |
| `ASSISTANT_WEBHOOK_URL` | server, optional | Defaults to the production webhook |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | Turnstile site key (hostname `www.adautoteam.top`) |
| `NEXT_PUBLIC_ASSISTANT_ENABLED` | public | `true` swaps the "Fix My Bottleneck" pill for the chat widget. Public vars are inlined at build, so redeploy after changing |
| `NEXT_PUBLIC_ASSISTANT_PRIVACY_URL` | public, optional | Adds a Privacy link under the chat box |

Turning it off, fastest first: set `kill_switch` to `on` in the n8n `assistant_config` table (visitors see the paused message, no deploy needed); unpublish the n8n workflow (route shows the same paused message); set `NEXT_PUBLIC_ASSISTANT_ENABLED` to `false` and redeploy (brings the old pill back).

Testing without Cloudflare: use Turnstile's test keys (site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`) in a preview deployment.
