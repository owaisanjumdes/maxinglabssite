"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faq } from "@/content/site";
import { Plus } from "@/components/ui/Icons";
import { Eyebrow, Heading, Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <Heading
            sans={faq.headlineSans}
            serif={faq.headlineSerif}
            className="mt-4"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-card border border-warm bg-surface">
            {faq.items.map((item, i) => {
              const isOpen = open === i;

              return (
                <div
                  key={item.q}
                  className="border-b border-warm last:border-b-0"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-subtle/60 sm:px-7 sm:py-6"
                    >
                      <span className="display text-[16.5px] sm:text-[18px]">
                        {item.q}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-accent bg-accent text-on-accent"
                            : "border-warm text-ink/50"
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 pr-12 text-[14.5px] leading-relaxed text-body/80 sm:px-7 sm:pb-7 sm:pr-16">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
