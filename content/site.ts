/**
 * Single source of truth for every string, metric and quote on the site.
 * Swap placeholder copy for real client data here - no component edits needed.
 */

export const site = {
  name: "MaxingLabs",
  monogram: "ML",
  domain: "maxinglabs.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@maxinglabs.com",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  tagline: "We build YouTube channels that book 10-20 calls a month.",
  description:
    "MaxingLabs is a B2B YouTube agency. We run strategy, scripting, editing, packaging and publishing end to end - and measure it in booked sales calls, not views.",
};

export const nav = {
  links: [
    { label: "Results", href: "#results" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Book a call",
};

export const hero = {
  badge: "Trusted by dozens of B2B businesses",
  /* The headline is assembled in three parts so the YouTube logo can sit
     inline between them. Keep the trailing/leading spaces. */
  headlineBefore: "Add up to 30 calls/mo to your offer through ",
  headlineEmphasis: "organic",
  subtext: "Done-for-you. You record, and watch the qualified calls come in.",
  primaryCta: "Book a strategy call",
  secondaryCta: "See the results",
};

export const showreel = {
  eyebrow: "Case study",
  overlayTitle: "How a 0-sub channel became $36,000/mo in 94 days",
  overlayMeta: "12 min · Northwind Capital teardown",
  /** Drop a YouTube video ID here to swap the placeholder for a real embed. */
  youtubeId: "",
};

export const logos = {
  label: "Channels we operate",
  items: [
    "Northwind Capital",
    "Ledgerly",
    "Apex Roofing Co.",
    "Caldera Labs",
    "Vaultpay",
    "Orbit Dental",
    "Stackhouse",
    "Clearline Legal",
  ],
};

export const problem = {
  eyebrow: "The gap",
  headlineSans: "Most B2B Channels Get Views",
  headlineSerif: "And Nothing Else",
  items: [
    {
      title: "Content nobody searching for you can find",
      body: "Videos built on hunches instead of the queries your buyers already type. Impressions arrive from strangers who will never buy.",
    },
    {
      title: "Thumbnails that lose the click",
      body: "A 3% click-through rate caps your ceiling before the edit even matters. Most agencies ship one thumbnail and never test it.",
    },
    {
      title: "No path from watch time to a call",
      body: "The view happens, then nothing. No offer, no lead magnet, no retargeting, so your pipeline never sees the traffic you earned.",
    },
  ],
};

export const processSection = {
  eyebrow: "How it works",
  headlineSans: "Three Phases,",
  headlineSerif: "One Compounding Asset",
  steps: [
    {
      n: "01",
      title: "Audit & offer mapping",
      body: "We reverse-engineer the searches your buyers already make, map them to what you actually sell, and build a 90-day plan around the keywords with commercial intent. You approve it before anything is filmed.",
      bullets: [
        "Keyword & competitor teardown",
        "Offer-to-topic mapping",
        "90-day content calendar",
      ],
    },
    {
      n: "02",
      title: "Production sprint",
      body: "You record. We do everything else - scripts written in your voice, retention-engineered edits, three thumbnail variants per video, titles tested against your own back catalogue. One recording day covers a month of output.",
      bullets: [
        "Founder-voice scripting",
        "Retention editing",
        "3 thumbnail variants tested",
      ],
    },
    {
      n: "03",
      title: "Compound & convert",
      body: "Publishing cadence, description funnels, pinned-comment CTAs and retargeting audiences wired into your CRM. Every month you get a report that reads in calls booked and pipeline value, not impressions.",
      bullets: ["CTA & funnel wiring", "CRM attribution", "Monthly pipeline report"],
    },
  ],
};

export const services = {
  eyebrow: "Services we offer",
  headlineSans: "Everything Your Channel Needs,",
  headlineSerif: "Run By One Team",
  note: "One retainer. One point of contact. No freelancer roulette.",
  tiles: [
    { line1: "Channel Strategy", line2: "& Keyword Research", span: 2 },
    { line1: "Scriptwriting", line2: "For Founders Who Sell", span: 1 },
    { line1: "Retention Editing", line2: "& Motion Graphics", span: 1 },
    { line1: "Thumbnails", line2: "& Packaging Tests", span: 1 },
    { line1: "Publishing", line2: "& Search Optimisation", span: 1 },
    { line1: "Funnel Setup", line2: "& Call Booking", span: 2 },
    { line1: "Shorts Repurposing", line2: "Across LinkedIn & IG", span: 1 },
    { line1: "Monthly Reporting", line2: "Tied To Pipeline", span: 3 },
  ],
};

export const results = {
  eyebrow: "Results",
  headlineSans: "Receipts From",
  headlineSerif: "Real Clients",
  cases: [
    {
      name: "Marcus Reed",
      handle: "@northwindcapital",
      role: "Founder, Northwind Capital",
      initials: "MR",
      result: "$0 → $36,000 per month",
      window: "94 days",
      checks: [
        "19 inbound calls in the first 60 days",
        "412K views with $0 in ad spend",
        "Cost per booked call: $41",
      ],
      quote:
        "We'd spent two years on cold outreach. The channel now books more qualified calls in a week than our SDR did in a quarter.",
      stats: [
        { value: 412, suffix: "K", label: "Views in 94 days" },
        { value: 19, suffix: "", label: "Calls booked" },
      ],
      chart: [4, 7, 6, 12, 18, 24, 31, 44, 58, 71, 88, 100],
    },
    {
      name: "Priya Raghunathan",
      handle: "@ledgerly",
      role: "CEO, Ledgerly",
      initials: "PR",
      result: "3 calls → 27 calls per month",
      window: "6 months",
      checks: [
        "Click-through rate lifted from 3.1% to 9.4%",
        "Two videos ranking #1 for buying-intent keywords",
        "$212K in pipeline attributed to YouTube",
      ],
      quote:
        "They rewrote how we talk about the product. The scripts sound more like me than the things I write myself.",
      stats: [
        { value: 27, suffix: "/mo", label: "Inbound calls" },
        { value: 212, suffix: "K", label: "Pipeline added" },
      ],
      chart: [8, 10, 9, 15, 14, 22, 29, 35, 48, 60, 79, 96],
    },
    {
      name: "Danny Osei",
      handle: "@apexroofing",
      role: "Owner, Apex Roofing Co.",
      initials: "DO",
      result: "$4K → $118K in contract value",
      window: "5 months",
      checks: [
        "Ranked for 14 local commercial roofing keywords",
        "31 quote requests straight from video descriptions",
        "Closed the largest contract in company history",
      ],
      quote:
        "I thought YouTube was for influencers. It is the cheapest lead source we have and it does not stop working when we stop paying.",
      stats: [
        { value: 118, suffix: "K", label: "Contract value" },
        { value: 31, suffix: "", label: "Quote requests" },
      ],
      chart: [3, 5, 8, 7, 13, 19, 26, 30, 42, 55, 68, 91],
    },
  ],
};

export const testimonials = {
  eyebrow: "What clients say",
  headlineSans: "They Came For Views.",
  headlineSerif: "They Stayed For Revenue.",
  quotes: [
    {
      quote:
        "First month we booked 7 calls. Third month we had to pause publishing to catch up on delivery.",
      name: "Ellie Whitfield",
      role: "Founder, Caldera Labs",
      initials: "EW",
    },
    {
      quote:
        "The thumbnail testing alone doubled our CTR. Nobody else we spoke to even mentioned testing.",
      name: "Tomas Lindqvist",
      role: "CMO, Vaultpay",
      initials: "TL",
    },
    {
      quote:
        "I record one day a month. They handle the rest. That is the whole pitch and they deliver it.",
      name: "Dr. Amara Nwosu",
      role: "Orbit Dental",
      initials: "AN",
    },
    {
      quote:
        "Their monthly report is the only agency report I actually read. It is in calls and pipeline, not impressions.",
      name: "Grant Mbeki",
      role: "Partner, Clearline Legal",
      initials: "GM",
    },
    {
      quote:
        "We had been burned by two agencies before. These are the first people who showed us the plan before asking for a card.",
      name: "Sofia Marchetti",
      role: "Founder, Stackhouse",
      initials: "SM",
    },
    {
      quote:
        "Six videos in, we were outranking competitors who had been posting for four years.",
      name: "Ryan Takeda",
      role: "Head of Growth, Ledgerly",
      initials: "RT",
    },
  ],
};

export const receipts = {
  eyebrow: "Receipts",
  headlineSans: "Straight From",
  headlineSerif: "The Group Chat",
  note: "Unedited messages from active client channels.",
  messages: [
    {
      author: "Marcus Reed",
      initials: "MR",
      time: "9:42 AM",
      body: "another one just booked from the pricing video. that's 4 this week",
      reaction: "🔥 3",
    },
    {
      author: "Priya Raghunathan",
      initials: "PR",
      time: "2:15 PM",
      body: "the new thumbnail is at 11.2% CTR. our old best was 4%.",
      reaction: "📈 5",
    },
    {
      author: "Danny Osei",
      initials: "DO",
      time: "7:08 AM",
      body: "got a call about a $90k commercial job. found us on youtube. unreal",
      reaction: "🎉 8",
    },
    {
      author: "Ellie Whitfield",
      initials: "EW",
      time: "11:30 AM",
      body: "can we do 6 videos next month instead of 4? the demand is there",
      reaction: "✅ 2",
    },
  ],
};

export const about = {
  eyebrow: "Who we are",
  headlineSans: "A Small Team That",
  headlineSerif: "Only Does This",
  body: [
    "MaxingLabs is nine people - strategists, scriptwriters, editors and a packaging lead. We don't build websites, we don't run paid ads, and we don't take on creators chasing subscriber counts.",
    "We work with B2B founders who need YouTube to produce booked calls, and we cap the roster at twelve clients so every channel gets a named pod instead of a ticket queue.",
  ],
  stats: [
    { value: 41, suffix: "M+", label: "Views engineered" },
    { value: 1200, suffix: "+", label: "Calls booked for clients" },
    { value: 12, suffix: "", label: "Clients, capped" },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  headlineSans: "Questions We Get",
  headlineSerif: "Before Every Call",
  items: [
    {
      q: "How long until we see booked calls?",
      a: "First videos publish inside week three. Most clients see their first inbound call between day 30 and day 50, and a reliable weekly cadence by month three. YouTube compounds, so month six looks nothing like month one - which is why we don't take 30-day engagements.",
    },
    {
      q: "Do we own the channel and the footage?",
      a: "Always, and from day one. The channel stays under your Google account with us added as managers. Every project file, script, thumbnail and raw file is delivered to your drive monthly. If we part ways you lose nothing but us.",
    },
    {
      q: "How much of my time does this take?",
      a: "One recording day per month, roughly four to five hours, plus about 30 minutes a week reviewing scripts and thumbnails. We handle the plan, the edit, the packaging, the upload and the reporting.",
    },
    {
      q: "Will it sound like me or like an agency?",
      a: "We build a voice guide from your existing calls, posts and recordings before writing a single script, and the first two videos run through a tighter revision loop while we calibrate. Clients routinely tell us the scripts read more like them than their own writing.",
    },
    {
      q: "What does the guarantee actually mean?",
      a: "If you complete the recording days and approve content on schedule and you haven't hit 10 qualified calls in 90 days, we keep working at no cost until you do. Qualified means it matches the ICP we agree on in the audit, in writing.",
    },
    {
      q: "What size company is this for?",
      a: "It works best when you have an offer above roughly $3,000 in lifetime value and someone able to take sales calls. Below that the maths on a retainer rarely works, and we'll tell you so on the call rather than sell you anyway.",
    },
  ],
};

export const closing = {
  headlineSans: "Ready To Turn YouTube",
  headlineSerif: "Into Your Best Sales Channel?",
  body:
    "Book a 30-minute strategy call. We'll audit your channel live, show you the keywords your buyers are searching, and tell you honestly whether this is worth your money.",
  cta: "Book a strategy call",
  meta: "Free · 30 minutes · No pitch deck",
};

export const footer = {
  blurb: "A B2B YouTube agency measured in booked calls, not impressions.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "Results", href: "#results" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "Who we are", href: "#about" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Book a call", href: "#book" },
      ],
    },
  ],
  legal: "All rights reserved.",
};
