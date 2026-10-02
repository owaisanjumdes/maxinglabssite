import { ArrowUpRight } from "./Icons";

/* ------------------------------------------------------------------ */
/* Layout                                                             */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "paper",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "warm";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-36 py-20 md:py-28 ${
        tone === "warm" ? "bg-subtle" : ""
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                               */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={`eyebrow ${onDark ? "text-white/45" : ""} ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The signature heading: a sans line, then the same phrase continued in red
 * italic serif. Used by every section so the pairing stays consistent.
 */
export function Heading({
  sans,
  serif,
  size = "md",
  align = "left",
  onDark = false,
  className = "",
  as: Tag = "h2",
}: {
  sans: string;
  serif: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const sizes = {
    sm: "text-[26px] sm:text-[30px]",
    md: "text-[30px] sm:text-[38px] lg:text-[44px]",
    lg: "text-[34px] sm:text-[46px] lg:text-[56px]",
    xl: "text-[38px] sm:text-[56px] lg:text-[68px]",
  } as const;

  return (
    <Tag
      className={`display ${sizes[size]} ${
        align === "center" ? "text-center" : ""
      } ${onDark ? "text-white" : ""} ${className}`}
    >
      {sans}{" "}
      <span className="serif-accent whitespace-pre-wrap">{serif}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                            */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "red";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  href,
  children,
  variant = "dark",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: ButtonProps) {
  const variants = {
    dark: "bg-[var(--cta)] text-on-accent transition-colors duration-300 hover:bg-[var(--cta-hover)]",
    light:
      "bg-cta2 text-cta2-text border border-cta2 hover:brightness-95",
    red: "bg-[var(--cta)] text-on-accent transition-colors duration-300 hover:bg-[var(--cta-hover)]",
  } as const;

  const sizes = {
    sm: "h-9 rounded-[8px] px-4 text-[13px]",
    md: "h-11 rounded-[9px] px-5 text-[14px]",
    lg: "h-[52px] rounded-[10px] px-7 text-[15px]",
  } as const;

  return (
    <a
      href={href}
      /* Boxy, not pill — radius steps with the button so it reads the same
         as the navbar's rounded rectangle at every size. */
      className={`group inline-flex shrink-0 items-center justify-center gap-2 font-semibold tracking-[-0.01em] transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowUpRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
      )}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Bits                                                              */
/* ------------------------------------------------------------------ */

export function Avatar({
  initials,
  size = 44,
  className = "",
}: {
  initials: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent font-semibold tracking-[-0.02em] text-on-accent select-none ${className}`}
    >
      {initials}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-warm bg-surface ${className}`}
    >
      {children}
    </div>
  );
}

/** Grayscale infinite marquee. Children are rendered twice for the loop. */
export function Marquee({
  children,
  speed = "normal",
  className = "",
}: {
  children: React.ReactNode;
  speed?: "normal" | "slow";
  className?: string;
}) {
  return (
    <div className={`fade-x overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
