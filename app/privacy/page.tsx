import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { CONTACT_EMAIL } from "@/data/contact";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy note | Aarone Den Patayan",
  description:
    "What the chat, contact form, email and booking link keep, who helps run them, how long it is kept, and how to ask for it to be deleted.",
  path: "/privacy",
});

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What gets kept",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>The messages you type and the assistant&rsquo;s replies.</li>
        <li>
          Your IP address, so I can stop one person from flooding the chat.
        </li>
        <li>
          If you choose to share your name and email and agree to it, those
          details are sent to me so I can reply. The assistant asks first, and
          only then. They are stored in Airtable and I&rsquo;m notified
          through Slack.
        </li>
        <li>
          If you use the contact form or email me, I keep your name, email
          address and message so I can reply. They are stored in Airtable and
          I&rsquo;m notified through Slack.
        </li>
        <li>
          If you book a call, I keep your name, email address, the time you
          chose and any answers you give on the booking form. They are stored
          in Airtable and I&rsquo;m notified through Slack.
        </li>
      </ul>
    ),
  },
  {
    heading: "Who helps run the chat",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          An AI service (Anthropic) reads your chat messages to write the
          replies. It also reads contact form and email messages so it can
          draft a reply for me, which I check before anything is sent. Under
          its business terms it doesn&rsquo;t use them to train its models,
          and it normally deletes them within 30 days.
        </li>
        <li>
          Airtable stores the contact details described above, Slack sends me
          a notice when someone gets in touch, and Cal.com runs the booking
          link. Email to me is handled by Google Workspace.
        </li>
        <li>
          A bot check from Cloudflare runs when you send your first message,
          to keep automated spam out.
        </li>
        <li>
          The site is hosted by Vercel, and the chat and the automations behind
          the contact form run on a server I operate.
        </li>
        <li>
          Vercel Web Analytics counts page visits without cookies, and the
          counts can&rsquo;t be tied back to you.
        </li>
        <li>
          Some of these services are based in the United States, so your
          messages may be handled outside Australia.
        </li>
      </ul>
    ),
  },
  {
    heading: "What I don’t do",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>I don&rsquo;t sell your information.</li>
        <li>
          I don&rsquo;t use your chat to show you ads or to follow you around
          the web.
        </li>
        <li>
          I don&rsquo;t ask you for passwords or customer records. Please
          don&rsquo;t share them in the chat, the form or email.
        </li>
      </ul>
    ),
  },
  {
    heading: "How long I keep it",
    body: (
      <>
        <p>Chat messages are deleted after 30 days.</p>
        <p className="mt-3">
          If you chose to share your name and email, or you used the contact
          form, emailed me or booked a call, your details are kept in my
          contact records for up to 12 months after we last spoke, then
          deleted. Cal.com keeps its own record of a booking under its own
          privacy policy.
        </p>
      </>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask me to see, correct or delete what I kept about you. Email{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-circuit underline underline-offset-2"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        and, if you can, include roughly when you got in touch so I can find
        it.
        I&rsquo;ll reply within 24 hours on business days. The contact form on
        the site always works too.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-2xl px-6 py-12">
          <a href="/" className="text-sm font-medium text-circuit hover:underline">
            &larr; Back to the site
          </a>
          <h1 className="mt-6 font-display text-3xl font-bold text-ink md:text-4xl">
            Privacy note
          </h1>
          <p className="mt-4 text-ink-muted">
            I take your privacy seriously, and I&rsquo;ve kept this chat simple
            on purpose. This note says, in plain words, what the chat keeps,
            who helps run it, and how to get your messages deleted. It covers
            the chat assistant, the contact form, email to me, and the
            booking link.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.heading} className="mt-10">
              <h2 className="font-display text-xl font-semibold text-ink">
                {s.heading}
              </h2>
              <div className="mt-3 text-ink-muted">{s.body}</div>
            </div>
          ))}
          <p className="mt-12 text-sm text-ink-muted">Aarone Den Patayan</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
