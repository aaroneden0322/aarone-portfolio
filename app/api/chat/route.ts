import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

// Thin gate in front of the n8n assistant webhook. No AI and no business
// logic lives here: it checks the request, adds the secret header the
// browser must never see, and forwards. n8n owns every rule about what the
// assistant says (kill switch, caps, strikes, output checks).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_ORIGIN = "https://www.adautoteam.top";
const DEFAULT_WEBHOOK = "https://assistant.adautoteam.top/webhook/assistant-chat";
const MAX_BODY_BYTES = 4096;
const MAX_MESSAGE_CHARS = 500;
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;
const FORWARD_TIMEOUT_MS = 45_000;
const SESSION_ID_RE = /^[A-Za-z0-9_-]{16,64}$/;
const RESPONSE_TYPES = new Set([
  "question",
  "verdict",
  "kb_answer",
  "decline",
  "blocked",
  "invalid",
]);

const PAUSED_REPLY =
  "The assistant is paused right now. The contact form still works, and Aarone replies within 24 hours.";
const ERROR_REPLY =
  "Something went wrong on my side. Try again, or use the contact form.";

type Reply = {
  type: string;
  reply: string;
  verdict: string;
  ended: boolean;
  sessionId?: string;
  sessionToken?: string;
};

function respond(body: Reply, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function fail(type: string, reply: string, status: number, ended = false) {
  return respond({ type, reply, verdict: "none", ended }, status);
}

// ---- allowed origins -------------------------------------------------------
function originAllowed(origin: string | null): boolean {
  if (!origin) return false;
  if (origin === SITE_ORIGIN) return true;
  // Vercel preview deployments of this project and local dev, so the widget
  // can be tested before merge. Real chats from these origins still need a
  // valid Turnstile token for the site key in use.
  if (/^https:\/\/aarone-portfolio[a-z0-9-]*\.vercel\.app$/.test(origin)) return true;
  if (process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin)) return true;
  return false;
}

// ---- client IP -------------------------------------------------------------
function clientIp(req: Request): string {
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim().slice(0, 64);
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 64);
  return "unknown";
}

// ---- best-effort burst limiter ---------------------------------------------
// Serverless instances do not share memory, so this only smooths bursts that
// land on one instance. The hard limits live in n8n (3 chats per IP per day,
// 12 turns per chat, daily spend cap) and in the Vercel firewall rule.
const hits = new Map<string, number[]>();
function burstLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || now - v[v.length - 1] > windowMs) hits.delete(k);
    }
  }
  return arr.length > max;
}

// ---- stateless signed session token ----------------------------------------
// The server issues the session id after Turnstile passes, and signs it with a
// key derived from the shared secret. Later messages must present a valid,
// unexpired token for the same session id and IP, so one solved challenge
// cannot be reused to mint unlimited sessions.
function signingKey(secret: string): Buffer {
  return createHmac("sha256", secret).update("assistant-session-v1").digest();
}
function signToken(secret: string, sessionId: string, ip: string, exp: number): string {
  const sig = createHmac("sha256", signingKey(secret))
    .update(`${sessionId}.${ip}.${exp}`)
    .digest("base64url");
  return `${exp}.${sig}`;
}
function tokenValid(secret: string, sessionId: string, ip: string, token: unknown): boolean {
  if (typeof token !== "string") return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!sig || !Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = signToken(secret, sessionId, ip, exp).split(".")[1];
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// ---- Turnstile -------------------------------------------------------------
async function turnstileOk(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || typeof token !== "string" || token.length < 10 || token.length > 4096) {
    return false;
  }
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const secret = process.env.ASSISTANT_SECRET;
  if (!secret || !process.env.TURNSTILE_SECRET_KEY) {
    return fail("blocked", PAUSED_REPLY, 503, true);
  }

  if (!originAllowed(req.headers.get("origin"))) {
    return fail("invalid", ERROR_REPLY, 403);
  }
  if (!(req.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) {
    return fail("invalid", ERROR_REPLY, 415);
  }

  const raw = await req.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
    return fail("invalid", "That message is too long. Please keep it under 500 characters.", 413);
  }
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("invalid", ERROR_REPLY, 400);
  }

  const ip = clientIp(req);
  if (burstLimited(`ip:${ip}`, 20, 60_000)) {
    return fail("invalid", "You're sending messages too fast. Wait a moment and try again.", 429);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length === 0) return fail("invalid", "Please type a message.", 400);
  if (message.length > MAX_MESSAGE_CHARS) {
    return fail("invalid", "That message is too long. Please keep it under 500 characters.", 400);
  }

  let page = typeof body.page === "string" ? body.page.slice(0, 200) : "";
  if (!/^https:\/\/www\.adautoteam\.top(\/|$)/.test(page)) page = "";

  // New chat: needs a solved Turnstile challenge, and the server picks the id.
  // Existing chat: needs the signed token from the first reply.
  let sessionId: string;
  let issuedToken: string | undefined;
  if (typeof body.sessionId !== "string" || body.sessionId === "") {
    if (!(await turnstileOk(body.turnstileToken, ip))) {
      return fail("invalid", "Please complete the quick check and try again.", 403);
    }
    sessionId = randomBytes(24).toString("base64url");
    issuedToken = signToken(secret, sessionId, ip, Date.now() + SESSION_TTL_MS);
  } else {
    sessionId = body.sessionId;
    if (!SESSION_ID_RE.test(sessionId) || !tokenValid(secret, sessionId, ip, body.sessionToken)) {
      return fail(
        "invalid",
        "This chat has timed out. Please refresh the page and start again.",
        403,
        true
      );
    }
    if (burstLimited(`sid:${sessionId}`, 6, 60_000)) {
      return fail("invalid", "You're sending messages too fast. Wait a moment and try again.", 429);
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(process.env.ASSISTANT_WEBHOOK_URL || DEFAULT_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Assistant-Secret": secret,
      },
      body: JSON.stringify({ sessionId, message, ip, page }),
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch {
    return fail("invalid", ERROR_REPLY, 502);
  }

  // A 403 here means the shared secret is wrong or rotated, a 404 means the
  // n8n workflow is unpublished. Either way the visitor sees the paused line.
  if (upstream.status === 403 || upstream.status === 404) {
    return fail("blocked", PAUSED_REPLY, 503, true);
  }
  if (!upstream.ok) return fail("invalid", ERROR_REPLY, 502);

  let data: Record<string, unknown>;
  try {
    data = (await upstream.json()) as Record<string, unknown>;
  } catch {
    return fail("invalid", ERROR_REPLY, 502);
  }
  const type = typeof data.type === "string" ? data.type : "";
  const reply = typeof data.reply === "string" ? data.reply.slice(0, 1200) : "";
  if (!RESPONSE_TYPES.has(type) || !reply) return fail("invalid", ERROR_REPLY, 502);

  return respond({
    type,
    reply,
    verdict: typeof data.verdict === "string" ? data.verdict.slice(0, 20) : "none",
    ended: data.ended === true,
    ...(issuedToken ? { sessionId, sessionToken: issuedToken } : {}),
  });
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
