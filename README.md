# MaxingLabs

One-page marketing site for a B2B YouTube agency. Editorial and minimal: warm
paper background, near-black ink, one sharp red, and a two-font headline — clean
sans line followed by a red italic serif line.

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

| Path | What it is |
|---|---|
| `content/site.ts` | **Every string, metric, quote and FAQ on the site.** Start here. |
| `app/globals.css` | Design tokens, display/serif utilities, grain, marquee, reveal. |
| `components/sections/` | The 13 page sections, in the order `app/page.tsx` composes them. |
| `components/ui/` | Primitives: buttons, headings, analytics panels, reveal, count-up. |
| `lib/booking.ts` | Single choke point for every CTA link. |

## Swapping in real content

Everything is placeholder — invented clients, plausible metrics. All of it is in
`content/site.ts`, so no component needs editing.

1. **Booking link.** Copy `.env.example` to `.env.local` and set
   `NEXT_PUBLIC_BOOKING_URL` to your Cal.com or Calendly link. Unset, every CTA
   falls back to a pre-filled `mailto:` so the page is never a dead end.
2. **Hero video.** Set `showreel.youtubeId` to a video ID. The placeholder frame
   is replaced by a real `youtube-nocookie` embed automatically.
3. **Client logos.** `logos.items` renders text wordmarks in grayscale. Swap the
   `<span>` in `LogoMarquee.tsx` for `next/image` with `grayscale opacity-60`.
4. **Analytics screenshots.** `AnalyticsPanel` and `Sparkline` draw SVG charts
   from the `chart` arrays in `results.cases`. They exist so the page reads as
   proof-driven before you have real screenshots — replace with `next/image` in
   the same slots when you do.
5. **Thumbnails.** `ThumbnailTile` renders a tinted gradient with a play glyph.
   Same deal: drop in real thumbnails when they exist.

## Type

The brief specified Apple SF Pro. It ships with macOS/iOS but **cannot legally be
self-hosted as a webfont**, so `--font-sans` in `globals.css` requests it from the
OS first and falls back to self-hosted Inter — the closest widely licensed
grotesk. Apple devices render real SF Pro; Windows and Android render Inter.
On Windows you will see Inter, which is expected, not a bug.

Display tracking is set in `em` (`-0.045em`), not px, so the brief's measured
`-2px at 42px` holds at every viewport instead of breaking when type scales.

## Liquid Glass

Implements `LIQUID_GLASS_SPEC.md`, applied to the site's navigation layer only.
Per spec section 10, glass never goes on content cards — service tiles, case
studies, testimonials and FAQ stay flat.

| Path | Role |
|---|---|
| `lib/glass/displacement.ts` | SDF + squircle-bevel displacement map generator (spec 6.1) |
| `lib/glass/spring.ts` | Spring presets from spec 7, plus a standalone solver |
| `components/glass/GlassRuntime.tsx` | Tier detection, pointer-driven `--lg-light-angle` |
| `components/glass/GlassSurface.tsx` | The seven-layer stack from spec 2 |
| `components/glass/GlassButton.tsx` | Control with press physics (spec 5.1) |
| `components/glass/ScrollEdge.tsx` | Progressive blur under the bar (spec 5.7) |
| `components/glass/MeshBackdrop.tsx` | Colour fields so refraction has something to bend |

Tokens live in `:root` in `globals.css` — tune `--lg-refraction`, `--lg-blur`,
`--lg-saturate`, `--lg-bezel`, `--lg-rim-strength` and `--lg-dim-clear` there.

**Two deliberate departures from the spec:**

1. **Radii, not capsules.** Spec section 4 wants `border-radius: 9999px` on all
   bars and buttons. The site's established shape language is boxy (8–18px), set
   deliberately, so that was kept and the glass built to fit it.
2. **Clear variant means a dark navbar.** Clear has almost no tint and requires a
   permanent dimming layer (spec 2.2 / 3.5), so the bar reads as dark smoked
   glass over the warm paper, with white vibrant content on it. This is what
   Clear *is* — Regular is the variant that would stay light and adapt.

Tiers: Chromium gets true refraction with chromatic aberration; Safari, Firefox
and devices with ≤4 cores get the frosted fallback with every other layer
intact. SSR renders the frosted tier, and refraction is swapped in on mount.

## Notes

- Section order in `app/page.tsx` is the whole page structure — reorder or delete
  an import to change it.
- `Problem.tsx` ("The gap") was not in the agreed section list; it was added as
  problem-agitation before the process. Delete the import to drop it.
- All motion sits behind `prefers-reduced-motion`.
- No pricing section by design — `Process` and `Services` carry that weight.
