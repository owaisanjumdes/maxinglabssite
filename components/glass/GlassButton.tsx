"use client";

import { GlassSurface } from "./GlassSurface";
import { ArrowUpRight } from "@/components/ui/Icons";

type GlassButtonProps = {
  href: string;
  children: React.ReactNode;
  /** "tinted" is reserved for the single primary action (spec 2.2). */
  variant?: "clear" | "tinted";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/* Radii match the boxy scale already established on the site, not the
   spec's capsule rule — see the note in README. */
const SIZES = {
  sm: { h: "h-9", pad: "px-4", text: "text-[13px]", radius: 8 },
  md: { h: "h-11", pad: "px-5", text: "text-[14px]", radius: 9 },
  lg: { h: "h-[52px]", pad: "px-7", text: "text-[15px]", radius: 10 },
} as const;

export function GlassButton({
  href,
  children,
  variant = "clear",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: GlassButtonProps) {
  const s = SIZES[size];

  return (
    /* The glass box owns the dimensions. Putting the height on the inner
       anchor instead makes the two size off each other, and `h-full` then
       resolves against an auto-height parent — which collapses the button
       to its line-height. */
    <GlassSurface
      tag="span"
      radius={s.radius}
      variant={variant}
      interactive
      className={`group/cta inline-flex shrink-0 items-stretch overflow-hidden ${s.h} ${className}`}
      /* Controls carry a stronger dim than the bar so labels stay legible
         over light content (spec 9: worst-case background). */
      style={
        variant === "clear"
          ? ({ "--lg-dim-clear": "var(--lg-dim-control)" } as React.CSSProperties)
          : undefined
      }
    >
      {/* Hover wipe: a solid #0000FF panel scaled up from the bottom edge.
          A transform, not a gradient — and it animates on the compositor. */}
      {variant === "tinted" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-y-100"
          style={{ backgroundColor: "var(--cta-hover)" }}
        />
      )}
      <a
        href={href}
        /* `grow`, not `w-full` — width:100% against an auto-width parent is
           the same circular trap as the height was. */
        className={`glass-vibrant group inline-flex grow items-center justify-center gap-2 font-semibold tracking-[-0.01em] ${s.pad} ${s.text}`}
        style={{ borderRadius: s.radius }}
        {...rest}
      >
        {children}
        {arrow && (
          <ArrowUpRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        )}
      </a>
    </GlassSurface>
  );
}
