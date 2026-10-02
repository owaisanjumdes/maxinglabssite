"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { bookingHref, bookingTargetProps } from "@/lib/booking";
import { Container } from "@/components/ui/Primitives";
import { Logo } from "@/components/ui/Logo";
import { GlassSurface } from "@/components/glass/GlassSurface";
import { GlassButton } from "@/components/glass/GlassButton";

/**
 * The displacement map is generated for one concrete radius, so the bar's
 * corner radius has to be a number rather than a responsive class.
 */
function useBarRadius() {
  const [radius, setRadius] = useState(18);

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setRadius(w >= 1024 ? 18 : w >= 640 ? 16 : 15);
    };
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  return radius;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const glassRadius = useBarRadius();

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <Container>
        <GlassSurface
          tag="nav"
          radius={glassRadius}
          variant="clear"
          /* Floats narrower than the 1400px content grid below it. */
          className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between pl-4 pr-3 sm:h-[84px] sm:pl-6 sm:pr-4 lg:h-[100px] lg:pl-8 lg:pr-5"
        >
          {/* White artwork reads directly on the dimmed Clear glass */}
          <a href="#top" className="flex items-center">
            <Logo
              tone="light"
              priority
              className="logo-on-bar h-[26px] sm:h-[30px] lg:h-[36px]"
            />
          </a>

          {/* Centered links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-medium tracking-[-0.015em] text-ink/70 transition-colors hover:text-ink lg:text-[16px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* The single tinted action (spec 2.2 — never tint everything).
               Visibility lives on a wrapper: GlassButton sets `inline-flex`
               on its own box, and Tailwind emits `.inline-flex` after
               `.hidden`, so `hidden` on the button itself never wins. */}
            <span className="hidden sm:block">
              <GlassButton
                href={bookingHref()}
                size="md"
                variant="tinted"
                arrow
                {...bookingTargetProps()}
              >
                {nav.cta}
              </GlassButton>
            </span>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-ink/15 text-ink transition-colors hover:bg-ink/5 md:hidden"
            >
              <span className="relative block h-[10px] w-[16px]">
                <span
                  className={`absolute left-0 block h-[1.6px] w-full bg-current transition-transform duration-300 ${
                    open ? "top-[4px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.6px] w-full bg-current transition-transform duration-300 ${
                    open ? "top-[4px] -rotate-45" : "top-[8px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </GlassSurface>

        {/* Mobile sheet. Concentric: inner radius = outer - padding (spec 4). */}
        <div
          className={`mx-auto mt-2 max-w-[1100px] origin-top overflow-hidden rounded-[12px] transition-all duration-300 md:hidden ${
            open ? "max-h-[340px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <GlassSurface radius={12} variant="clear" className="p-2">
            <ul>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[7px] px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-ink/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-2 pt-1">
                <GlassButton
                  href={bookingHref()}
                  variant="tinted"
                  arrow
                  className="w-full"
                  onClick={() => setOpen(false)}
                  {...bookingTargetProps()}
                >
                  {nav.cta}
                </GlassButton>
              </li>
            </ul>
          </GlassSurface>
        </div>
      </Container>
    </header>
  );
}
