import { problem } from "@/content/site";
import { Eyebrow, Heading, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-[680px] text-center">
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <Heading
          sans={problem.headlineSans}
          serif={problem.headlineSerif}
          align="center"
          className="mt-4"
        />
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-warm bg-warm md:mt-16 md:grid-cols-3">
        {problem.items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 80}
            className="bg-surface p-7 sm:p-8"
          >
            <span className="display text-[13px] text-accent-text">
              0{i + 1}
            </span>
            <h3 className="display mt-4 text-[19px] leading-snug sm:text-[20px]">
              {item.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-body/75">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
