import { hero } from "@/content/site";
import { bookingHref, bookingTargetProps } from "@/lib/booking";
import { Button, Container } from "@/components/ui/Primitives";
import Image from "next/image";
import { XIcon, YouTube } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassSurface } from "@/components/glass/GlassSurface";

const ORBIT_SECONDS = 40;

/* Four marks riding a squircle. YouTube and X are inline SVG painted in their
   brand colours; Shorts and Reels are the supplied WebP assets. */
/* Six riders so three are on screen at once across the half-circle window.
   Four unique marks, so two repeat — the order is arranged so no visible
   trio ever contains the same logo twice. */
const ORBIT = [
  { kind: "svg", Icon: YouTube, color: "#FF0000", label: "YouTube" },
  { kind: "img", src: "/Youtube_shorts_icon.svg.webp", label: "YouTube Shorts" },
  { kind: "img", src: "/Instagram_Reels_logo.svg.webp", label: "Instagram Reels" },
  { kind: "svg", Icon: YouTube, color: "#FF0000", label: "YouTube 2" },
  { kind: "svg", Icon: XIcon, color: "#000000", label: "X" },
  { kind: "img", src: "/Instagram_Reels_logo.svg.webp", label: "Instagram Reels 2" },
] as const;

/** Social marks riding the lower arc of a circle. */
function OrbitBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2"
      /* Positioned by its centre so 3 and 9 o'clock sit beside the headline. */
      style={{
        width: "var(--orbit-size)",
        height: "var(--orbit-size)",
        top: "calc(var(--orbit-center-y) - var(--orbit-size) / 2)",
        ["--orbit-seconds" as string]: `${ORBIT_SECONDS}s`,
      }}
    >
      {/* Only the bottom half of the circle is drawn. Percentage viewBox so
          one path serves every breakpoint; the stroke stays 1px at any size. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,50 A 50,50 0 0 0 50,100 A 50,50 0 0 0 100,50"
          stroke="var(--border)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {ORBIT.map((item, i) => (
        <div
          key={item.label}
          className="orbit-rider"
          /* Negative delay spaces them evenly around one shared path. */
          style={{ animationDelay: `-${(i * ORBIT_SECONDS) / ORBIT.length}s` }}
        >
          <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] border border-white bg-paper sm:h-[70px] sm:w-[70px]">
            {item.kind === "svg" ? (
              /* The inline SVGs paint with currentColor, so the brand
                 colour goes on the wrapper rather than the icon props. */
              <span className="flex" style={{ color: item.color }}>
                <item.Icon className="h-[28px] w-[28px] sm:h-[32px] sm:w-[32px]" />
              </span>
            ) : (
              <Image
                src={item.src}
                alt=""
                width={72}
                height={72}
                className="h-[28px] w-[28px] object-contain sm:h-[32px] sm:w-[32px]"
              />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pt-40">
      <OrbitBackdrop />

      <Container className="relative">
        <div className="mx-auto max-w-[940px] text-center">
          <Reveal>
            {/* Explicit heights + leading-none: the pill's box is defined by
                the container, not by whatever line-height the children
                inherit, so nothing can spill outside the rounded background. */}
            <span className="inline-flex h-[40px] max-w-full items-center gap-[9px] overflow-hidden rounded-full bg-surface pl-[6px] pr-[15px] sm:h-[48px] sm:gap-[12px] sm:pl-[8px] sm:pr-[20px]">
              {/* Glass chip. Radius 16 capsules it at both heights. The tint
                  keeps a little translucency so the rim, inner shading and
                  bezel refraction read as thickness rather than flat fill. */}
              <GlassSurface
                tag="span"
                radius={16}
                variant="tinted"
                className="inline-flex h-[28px] shrink-0 items-center px-[11px] sm:h-[32px] sm:px-[13px]"
                style={
                  {
                    boxShadow: "none",
                    "--lg-tint-accent":
                      "color-mix(in srgb, var(--accent) 86%, transparent)",
                  } as React.CSSProperties
                }
              >
                <span className="text-[11.5px] font-semibold leading-none tracking-[-0.01em] text-on-accent sm:text-[13px]">
                  {hero.badgeChip}
                </span>
              </GlassSurface>
              <span className="truncate text-[14px] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[17px]">
                {hero.badgeLabel}
              </span>
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1
              className="display mt-6 text-[36px] uppercase leading-[1.04] sm:mt-7 sm:text-[54px] lg:text-[66px]"
              style={{ fontWeight: 600 }}
            >
              {/* The h1 supplies family, weight, colour, caps and tracking;
                  only accent segments override the colour. */}
              {hero.headline.map((line, i) => (
                <span key={i} className="block">
                  {line.map((seg, j) =>
                    seg.accent ? (
                      <span key={j} className="text-accent-text">
                        {seg.text}
                      </span>
                    ) : (
                      <span key={j}>{seg.text}</span>
                    ),
                  )}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mx-auto mt-5 max-w-[470px] text-[14px] font-medium leading-relaxed text-body/70 sm:text-[15px]">
              {hero.subtext}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* One tinted primary; the secondary stays Clear (spec 2.2) */}
              <GlassButton
                href={bookingHref()}
                size="lg"
                variant="tinted"
                arrow
                className="w-full sm:w-auto"
                {...bookingTargetProps()}
              >
                {hero.primaryCta}
              </GlassButton>
              <GlassButton href="#results" size="lg" className="w-full sm:w-auto">
                {hero.secondaryCta}
              </GlassButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
