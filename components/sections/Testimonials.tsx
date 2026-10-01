import { testimonials } from "@/content/site";
import { Star } from "@/components/ui/Icons";
import {
  Avatar,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-[700px] text-center">
        <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        <Heading
          sans={testimonials.headlineSans}
          serif={testimonials.headlineSerif}
          align="center"
          className="mt-4"
        />
      </Reveal>

      {/* Quote wall. CSS columns so cards of unequal height still tile. */}
      <div className="mt-12 gap-4 md:mt-16 sm:columns-2 lg:columns-3">
        {testimonials.quotes.map((item, i) => (
          <Reveal key={item.name} delay={(i % 3) * 80} className="mb-4 break-inside-avoid">
            <figure className="rounded-card border border-warm bg-surface p-6">
              <div className="flex gap-0.5" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3 w-3 text-success" />
                ))}
              </div>

              <blockquote className="mt-4 text-[15px] leading-relaxed text-ink/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-warm pt-4">
                <Avatar initials={item.initials} size={36} />
                <div>
                  <p className="text-[13.5px] font-semibold tracking-[-0.02em] text-ink">
                    {item.name}
                  </p>
                  <p className="text-[12px] text-body/55">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
