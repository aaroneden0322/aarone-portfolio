import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Privacy note for the chat assistant | Aarone Den Patayan",
  description:
    "What the chat assistant keeps, who helps run it, how long messages are kept, and how to ask for them to be deleted.",
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What the chat keeps",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>The messages you type and the assistant&rsquo;s replies.</li>
        <li>
          Your IP address, so I can stop one person from flooding the chat.
        </li>
        <li>
          If you choose to share your name and email and agree to it, those
          details are sent to me so I can reply. The assistant asks first, and
          only then.
        </li>
      </ul>
    ),
  },
  {
    heading: "Who helps run the chat",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          An AI service (Anthropic) reads your messages to write the replies.
          Under its business terms it doesn&rsquo;t use them to train its
          models, and it normally deletes them within 30 days.
        </li>
        <li>
          A bot check from Cloudflare runs when you send your first message,
          to keep automated spam out.
        </li>
        <li>
          The site is hosted by Vercel, and the chat itself runs on a server I
          operate.
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
          don&rsquo;t share them.
        </li>
      </ul>
    ),
  },
  {
    heading: "How long I keep it",
    body: <p>Chat messages are deleted after 30 days.</p>,
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask me to see, correct or delete what the chat kept about you.
        Email{" "}
        <a
          href="mailto:automate@aarone.adautoteam.top"
          className="text-circuit underline underline-offset-2"
        >
          automate@aarone.adautoteam.top
        </a>{" "}
        and, if you can, include roughly when you chatted so I can find it.
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
            Privacy note for the chat assistant
          </h1>
          <p className="mt-4 text-ink-muted">
            I take your privacy seriously, and I&rsquo;ve kept this chat simple
            on purpose. This note says, in plain words, what the chat keeps,
            who helps run it, and how to get your messages deleted. It covers
            the chat assistant only.
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
