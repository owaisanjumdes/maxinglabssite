import { closing } from "@/content/site";
import { bookingHref, bookingTargetProps } from "@/lib/booking";
import { Container } from "@/components/ui/Primitives";
import { GlassButton } from "@/components/glass/GlassButton";
import { Reveal } from "@/components/ui/Reveal";

export function Closing() {
  return (
    <section id="book" className="band grain relative scroll-mt-36 overflow-hidden">
      <span className="grain-layer" aria-hidden="true" />

      <Container className="relative py-20 md:py-28">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="display text-[32px] leading-[1.05] text-ink sm:text-[46px] lg:text-[54px]">
            <span className="block">{closing.headlineSans}</span>
            <span className="serif-accent mt-1 block leading-[1.1]">
              {closing.headlineSerif}
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[540px] text-[15px] leading-relaxed text-body sm:text-[16.5px]">
            {closing.body}
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <GlassButton
              href={bookingHref()}
              variant="tinted"
              size="lg"
              arrow
              className="w-full sm:w-auto"
              {...bookingTargetProps()}
            >
              {closing.cta}
            </GlassButton>
            <p className="text-[12.5px] font-medium text-muted">
              {closing.meta}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
