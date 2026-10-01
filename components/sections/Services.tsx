import { services } from "@/content/site";
import { Eyebrow, Heading, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/* Tile widths only diverge at lg. Below that the grid stays uniform
   (2 cols on sm, 1 on mobile) so nothing leaves a ragged gap. */
const SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

export function Services() {
  return (
    <Section id="services">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-[560px]">
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <Heading
            sans={services.headlineSans}
            serif={services.headlineSerif}
            className="mt-4"
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-[260px] text-[14px] leading-relaxed text-body/70 md:text-right">
            {services.note}
          </p>
        </Reveal>
      </div>

      {/* Bento: plain white tiles, no icons, text stacked on two lines.
         Spans are literal class names so Tailwind's scanner picks them up.
         They sum to 12 over the 3-column grid, so every row fills exactly. */}
      <div className="mt-11 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {services.tiles.map((tile, i) => (
          <Reveal key={tile.line1} delay={i * 55} className={SPAN[tile.span]}>
            <div className="group flex h-full min-h-[132px] flex-col justify-end rounded-card border border-warm bg-surface p-6 transition-colors duration-200 hover:border-ink/15 sm:p-7">
              <h3 className="display text-[19px] leading-[1.15] sm:text-[21px]">
                <span className="block">{tile.line1}</span>
                <span className="block text-ink/35 transition-colors duration-200 group-hover:text-ink/55">
                  {tile.line2}
                </span>
              </h3>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
