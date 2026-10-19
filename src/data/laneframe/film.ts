// Generated from the film (storify-ad/transcript.js). Times are seconds into the video.
export interface FilmChapter { name: string; start: number; proof: { label: string; href: string }[] }
export const FILM_DURATION = 175;
export const FILM_CHAPTERS: FilmChapter[] = [
  { name: "The job", start: 18.7, proof: [{ label: "The scenario", href: "#s1" }] },
  { name: "Four tools", start: 44.4, proof: [{ label: "The four builds", href: "#s2" }] },
  { name: "Break tests", start: 71.1, proof: [{ label: "The break test results", href: "#probes" }] },
  { name: "Results", start: 104.5, proof: [{ label: "The measured findings", href: "#s6" }, { label: "The cost figures", href: "#s4" }, { label: "The 12 trick questions (Make page)", href: "/laneframe/make#m3" }] },
  { name: "Recap", start: 147.3, proof: [{ label: "The recommendations", href: "#s7" }] },
];
export const FILM_LINES = [
  { start: 21.6, who: "Circuit", text: "I built three systems for a sample software company." },
  { start: 26.8, who: "Circuit", text: "One sorts new leads and books demos." },
  { start: 32.2, who: "Circuit", text: "One follows up failed card payments." },
  { start: 37.6, who: "Circuit", text: "One is an AI helper that hands the rest to a person." },
  { start: 45.6, who: "Circuit", text: "Then I built the whole set on four tools." },
  { start: 51.7, who: "Circuit", text: "Four complete builds of the same job." },
  { start: 59.9, who: "Circuit", text: "They all did the job. Next question: how do they hold up?" },
  { start: 72.3, who: "Flow", text: "Now I try to break every one of them." },
  { start: 78.2, who: "Flow", text: "Same break tests, run on every build." },
  { start: 90.0, who: "Flow", text: "Eight requirements and sixteen details per build." },
  { start: 101.0, who: "Circuit", text: "Here is what the testing showed." },
  { start: 105.7, who: "Circuit", text: "A new lead gets a first text in about 10 seconds on n8n." },
  { start: 114.5, who: "Circuit", text: "On Make, the whole run took under 3 seconds." },
  { start: 121.8, who: "Flow", text: "On trick questions, Make got 12 of 12." },
  { start: 129.5, who: "Flow", text: "Zapier got 8 of 12, answering four it should have passed." },
  { start: 136.6, who: "Circuit", text: "n8n runs on its own server for $5.35 a month." },
  { start: 142.8, who: "Circuit", text: "Testing found a real problem on Make, and I fixed it." },
  { start: 148.5, who: "Circuit", text: "Let's recap what happened." },
];
export const FILM_BLOCKS = [
  { start: 0.1, heading: "The results first", items: ["About 10 seconds. From a new lead to the first text message. Measured on the n8n build. The whole run on Make took under 3 seconds.", "12 of 12. Trick questions handled correctly. The AI helper on Make got all 12, with a second try on one of them. The Zapier version got 8 of 12: it answered four questions it should have passed to a person.", "$5.35 a month. To run the n8n version. That is the cost of its own server, backup included. It stays flat as volume grows."] },
  { start: 5.4, heading: "What this film shows", items: ["the choice: I built three systems for a sample software company, on four automation tools.", "the catch: A build that works once proves little, so I tried to break every version.", "watch for: What each tool does well, and where it struggles."] },
  { start: 152.0, heading: "What happened", items: ["The job: Three systems for a sample software company: lead sorting and demo booking, failed-payment follow-up, and an AI helper that hands the rest to a person.", "The tests: Four tools, five break tests on each, eight requirements and sixteen details recorded per build.", "What showed up: About 10 seconds to a first text on n8n. 12 of 12 trick questions on Make, 8 of 12 on Zapier. $5.35 a month to run n8n.", "Key takeaway: Building it four times shows what each tool does well and where it struggles, so you can pick the right one for your business."] },
  { start: 173.4, heading: "The full build", items: ["Aarone Den Patayan. www.adautoteam.top. Sample business, not a real client."] },
];
