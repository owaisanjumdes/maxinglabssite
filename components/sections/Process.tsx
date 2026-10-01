import { processSection } from "@/content/site";
import { Check } from "@/components/ui/Icons";
import { Eyebrow, Heading, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <Section id="process" tone="warm">
      <Reveal className="mx-auto max-w-[680px] text-center">
        <Eyebrow>{processSection.eyebrow}</Eyebrow>
        <Heading
          sans={processSection.headlineSans}
          serif={processSection.headlineSerif}
          align="center"
          className="mt-4"
        />
      </Reveal>

      <ol className="mt-12 md:mt-16">
        {processSection.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 90}
            className="border-t border-ink/10 py-9 first:border-t-0 md:py-11"
          >
            <div className="grid gap-5 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-2">
                <span className="display text-[42px] leading-none text-ink/15 md:text-[56px]">
                  {step.n}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="display text-[22px] sm:text-[26px]">
                  {step.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {step.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[13.5px] font-medium text-body/70"
                    >
                      <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-success" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-5">
                <p className="text-[14.5px] leading-relaxed text-body/80 sm:text-[15px]">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
