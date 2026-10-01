import { results } from "@/content/site";
import { AnalyticsPanel } from "@/components/ui/Analytics";
import { Check } from "@/components/ui/Icons";
import { CountUp } from "@/components/ui/CountUp";
import {
  Avatar,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Results() {
  return (
    <Section id="results" tone="warm">
      <Reveal className="mx-auto max-w-[680px] text-center">
        <Eyebrow>{results.eyebrow}</Eyebrow>
        <Heading
          sans={results.headlineSans}
          serif={results.headlineSerif}
          align="center"
          size="lg"
          className="mt-4"
        />
      </Reveal>

      <div className="mt-12 space-y-4 md:mt-16 md:space-y-5">
        {results.cases.map((item, i) => (
          <Reveal key={item.handle} delay={i * 70}>
            <article className="rounded-card border border-warm bg-surface p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left: who, what happened, proof, quote */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3.5">
                    <Avatar initials={item.initials} size={46} />
                    <div>
                      <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">
                        {item.name}
                      </p>
                      <p className="text-[13px] text-body/55">
                        {item.handle} · {item.role}
                      </p>
                    </div>
                  </div>

                  <h3 className="display mt-7 text-[28px] leading-[1.06] sm:text-[38px] lg:text-[42px]">
                    {item.result}
                  </h3>
                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-body/45">
                    in {item.window}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {item.checks.map((check) => (
                      <li
                        key={check}
                        className="flex items-start gap-2.5 text-[14.5px] font-medium text-ink/85"
                      >
                        <span className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-success/12">
                          <Check className="h-3 w-3 text-success" />
                        </span>
                        {check}
                      </li>
                    ))}
                  </ul>

                  <blockquote className="mt-7 border-l-2 border-accent pl-4">
                    <p className="text-[15.5px] leading-relaxed text-body/85 sm:text-[16.5px]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Right: analytics + the two oversized stats */}
                <div className="lg:col-span-5">
                  <AnalyticsPanel
                    uid={`case-${i}`}
                    data={item.chart}
                    metric={item.stats[0].label}
                    value={`${item.stats[0].value.toLocaleString("en-US")}${item.stats[0].suffix}`}
                    delta="↑ compounding"
                  />

                  <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[7px] border border-warm bg-warm">
                    {item.stats.map((stat) => (
                      <div key={stat.label} className="bg-surface p-5">
                        <p className="display text-[32px] leading-none sm:text-[40px]">
                          <CountUp value={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="mt-2 text-[12px] font-medium leading-snug text-body/55">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
