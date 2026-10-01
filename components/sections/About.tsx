import { about } from "@/content/site";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow, Heading, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" tone="warm">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <Heading
            sans={about.headlineSans}
            serif={about.headlineSerif}
            className="mt-4"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={80}>
            <div className="space-y-4">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[15.5px] leading-relaxed text-body/85 sm:text-[16.5px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-warm bg-warm sm:grid-cols-3">
              {about.stats.map((stat) => (
                <div key={stat.label} className="bg-elevated p-6">
                  <p className="display text-[34px] leading-none sm:text-[38px]">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[12.5px] font-medium leading-snug text-body/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
