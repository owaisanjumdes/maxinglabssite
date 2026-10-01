import { receipts } from "@/content/site";
import { AnalyticsPanel, ThumbnailTile } from "@/components/ui/Analytics";
import {
  Container,
  Eyebrow,
  Heading,
  Marquee,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

const THUMBNAILS = [
  "The pricing question every buyer asks (and how to answer it)",
  "We audited 40 B2B channels. 38 made the same mistake.",
  "Why your demo video is costing you deals",
  "How we rank for buying-intent keywords in 6 weeks",
  "The founder video that booked 19 calls",
  "Stop making content for your competitors",
];

/** A single Slack-style message, rendered in CSS rather than screenshotted. */
function SlackMessage({
  author,
  initials,
  time,
  body,
  reaction,
}: {
  author: string;
  initials: string;
  time: string;
  body: string;
  reaction: string;
}) {
  return (
    <div className="rounded-[7px] border border-warm bg-surface p-4">
      <div className="flex gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] bg-accent text-[12px] font-semibold text-on-accent"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="flex items-baseline gap-2">
            <span className="text-[13.5px] font-semibold tracking-[-0.02em] text-ink">
              {author}
            </span>
            <span className="text-[11px] text-body/40">{time}</span>
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-body/85">{body}</p>
          <span className="mt-2.5 inline-flex items-center rounded-full border border-warm bg-subtle px-2 py-0.5 text-[11px] font-medium text-body/60">
            {reaction}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Receipts() {
  const [first, second, third, fourth] = receipts.messages;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Eyebrow>{receipts.eyebrow}</Eyebrow>
          <Heading
            sans={receipts.headlineSans}
            serif={receipts.headlineSerif}
            align="center"
            className="mt-4"
          />
          <p className="mt-4 text-[14.5px] text-body/70">{receipts.note}</p>
        </Reveal>

        {/* Collage: messages flanking a live-looking analytics panel. */}
        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4 lg:pt-8">
            <Reveal>
              <SlackMessage {...first} />
            </Reveal>
            <Reveal delay={90}>
              <SlackMessage {...second} />
            </Reveal>
          </div>

          <Reveal delay={60} className="lg:col-span-4">
            <AnalyticsPanel
              uid="receipts"
              data={[6, 9, 14, 12, 21, 28, 34, 47, 59, 68, 84, 97]}
              metric="Views"
              value="1.24M"
              delta="+318%"
            />
          </Reveal>

          <div className="space-y-4 lg:col-span-4 lg:pt-8">
            <Reveal delay={130}>
              <SlackMessage {...third} />
            </Reveal>
            <Reveal delay={200}>
              <SlackMessage {...fourth} />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Thumbnail marquee: swap ThumbnailTile for next/image when real ones land. */}
      <Marquee className="mt-14" speed="slow">
        {THUMBNAILS.map((title, i) => (
          <div key={title} className="pl-4">
            <ThumbnailTile index={i} title={title} />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
