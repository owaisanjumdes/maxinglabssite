import { hero } from "@/content/site";
import { bookingHref, bookingTargetProps } from "@/lib/booking";
import { Button, Container } from "@/components/ui/Primitives";
import {
  Instagram,
  LinkedIn,
  Star,
  XIcon,
  YouTube,
  YouTubeLockup,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { MeshBackdrop } from "@/components/glass/MeshBackdrop";
import { GlassButton } from "@/components/glass/GlassButton";

const ORBIT_SECONDS = 28;

/** Faint concentric arcs with social icons riding the ring. */
function OrbitBackdrop() {
  const icons = [
    { Icon: YouTube, angle: 0 },
    { Icon: LinkedIn, angle: 90 },
    { Icon: Instagram, angle: 180 },
    { Icon: XIcon, angle: 270 },
  ];

  /* Sits low enough that the orbiting icons never travel under the navbar —
     refracted through the glass they read as smudges, not decoration. */
  const ring = 540;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[62%] -z-10 -translate-x-1/2 -translate-y-1/2"
    >
      {[280, 400, 540, 700, 880].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-ink/[0.065]"
          style={{
            width: size,
            height: size,
            left: -size / 2,
            top: -size / 2,
          }}
        />
      ))}

      {/* Rotating ring; each icon counter-rotates so it stays upright. */}
      <div
        className="absolute animate-orbit"
        style={{
          width: ring,
          height: ring,
          left: -ring / 2,
          top: -ring / 2,
          animationDuration: `${ORBIT_SECONDS}s`,
        }}
      >
        {icons.map(({ Icon, angle }) => (
          <div
            key={angle}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${angle}deg) translateY(-${ring / 2}px)`,
            }}
          >
            <span
              className="animate-orbit flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-warm bg-surface text-ink/45"
              style={{
                animationDuration: `${ORBIT_SECONDS}s`,
                animationDirection: "reverse",
              }}
            >
              <Icon className="h-[15px] w-[15px]" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-44 lg:pt-52">
      <MeshBackdrop />
      <OrbitBackdrop />

      <Container className="relative">
        <div className="mx-auto max-w-[860px] text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-warm bg-surface px-4 py-2 text-[13.5px] font-medium tracking-[-0.01em] text-body/75 sm:px-5 sm:py-2.5 sm:text-[15px]">
              <Star className="h-4 w-4 text-success" />
              {hero.badge}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mx-auto mt-6 max-w-[900px] text-[34px] leading-[1.08] sm:mt-7 sm:text-[48px] lg:text-[58px]">
              {hero.headlineBefore}
              <YouTubeLockup />{" "}
              <strong className="font-bold">{hero.headlineEmphasis}</strong>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mx-auto mt-5 max-w-[470px] text-[14px] leading-relaxed text-body/70 sm:text-[15px]">
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
