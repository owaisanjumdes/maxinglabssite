import { logos } from "@/content/site";
import { Container, Marquee } from "@/components/ui/Primitives";

export function LogoMarquee() {
  return (
    <section className="border-y border-warm bg-surface/60 py-9">
      <Container>
        <p className="eyebrow text-center">{logos.label}</p>
      </Container>

      <Marquee className="mt-6" speed="slow">
        {logos.items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            /* Grayscale wordmarks: real logos go here as next/image with
               `grayscale opacity-60` to match. */
            className="whitespace-nowrap px-7 text-[17px] font-semibold tracking-[-0.03em] text-ink/35 grayscale sm:px-10 sm:text-[20px]"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
