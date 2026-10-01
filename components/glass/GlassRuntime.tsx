"use client";

import { useEffect } from "react";
import { Spring, SPRINGS } from "@/lib/glass/spring";

/**
 * Mounted once in the layout. Does two jobs:
 *
 * 1. Tier detection (spec 6.4). Safari reports support for SVG filters inside
 *    backdrop-filter but does not render them, so the check is Chromium-gated
 *    rather than feature-gated. Low-core devices drop to the frosted tier per
 *    the performance rules in 6.6.
 * 2. Drives --lg-light-angle from the pointer with a lazy spring (7), so the
 *    specular rim highlight tracks where the "light" is. At rest it returns to
 *    135deg, i.e. light from the top-left.
 */
export function GlassRuntime() {
  useEffect(() => {
    const root = document.documentElement;

    const isChromium =
      typeof window !== "undefined" &&
      "chrome" in window &&
      CSS.supports("backdrop-filter", "url(#x)");
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;

    root.dataset.glassTier = isChromium && !lowPower ? "refract" : "frost";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    // Spec 9: the specular light stops following the pointer under reduced motion.
    if (reducedMotion.matches) {
      root.style.setProperty("--lg-light-angle", "135deg");
      return;
    }

    const REST = 135;
    const RANGE = 32; // spec 2.4: +/- 25-40deg
    const spring = new Spring(REST, SPRINGS.light);

    let frame = 0;
    let last = performance.now();
    let running = false;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const value = spring.step(dt);
      root.style.setProperty("--lg-light-angle", `${value.toFixed(2)}deg`);

      if (spring.settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      spring.setTarget(REST + nx * RANGE - ny * (RANGE * 0.5));
      start();
    };

    const onPointerLeave = () => {
      spring.setTarget(REST);
      start();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
