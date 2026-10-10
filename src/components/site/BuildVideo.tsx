type BuildVideoInfo = {
  id: string;
  title: string;
  length: string;
  caption: string;
};

// Walkthrough videos exist only for the builds listed here.
// Make and Zapier have none, so nothing renders for them.
const VIDEOS: Record<string, BuildVideoInfo> = {
  N1: {
    id: "IHC5B4RFyWk",
    title: "N1 Lead Sorter & Demo Booker: walkthrough",
    length: "2:00",
    caption:
      "A walk through the finished workflow: the canvas, real runs, and the failure tests. Some run screenshots in the video were captured during the build, before the final fixes. The canvas shown is the finished 37-node version.",
  },
  G3: {
    id: "JOzW8yh0PxE",
    title: "G3 AI Email Qualifier: walkthrough",
    length: "1:34",
    caption:
      "A walk through the canvas, a good run, the booking-gate refusal, and what happens when the AI is offline. The gate test used a hand-built message, so it proves the gate works, not the AI. Contacts are test data and emails are masked.",
  },
};

export default function BuildVideo({ buildId }: { buildId: string }) {
  const video = VIDEOS[buildId];
  if (!video) return null;

  return (
    <div className="mt-6 max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.1em] text-ink-muted">
        WATCH IT RUN · {video.length}
      </p>
      <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black/20">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
      <p className="mt-3 text-sm text-ink-muted">{video.caption}</p>
      <p className="mt-2 text-sm">
        <a
          href={`https://youtu.be/${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-circuit hover:underline"
        >
          Can’t see the video? Watch it on YouTube →
        </a>
      </p>
    </div>
  );
}
