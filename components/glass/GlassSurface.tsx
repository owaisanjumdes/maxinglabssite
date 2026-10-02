"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { buildDisplacementMap } from "@/lib/glass/displacement";
import { SPRINGS } from "@/lib/glass/spring";

type GlassSurfaceProps = {
  children: React.ReactNode;
  /** Outer corner radius in px. Inner shapes should be radius - padding (spec 4). */
  radius: number;
  /** "clear" = near-zero tint + dimming layer. "tinted" = the one primary action. */
  variant?: "clear" | "tinted";
  /** Press physics from spec 5.1. Off for bars, on for controls. */
  interactive?: boolean;
  tag?: "div" | "nav" | "header" | "span";
  className?: string;
  style?: React.CSSProperties;
};

const TAGS = {
  div: motion.div,
  nav: motion.nav,
  header: motion.header,
  span: motion.span,
} as const;

/**
 * One Liquid Glass element, built as the layer stack in spec section 2:
 *
 *   7. content            (vibrant, on top)
 *   6. interaction glow   (radial, blooms from the pointer)
 *   5. specular rim       (conic gradient ring, tracks --lg-light-angle)
 *   4. inner shading      (inset top-light / bottom-dark, reads as thickness)
 *   3. tint / dim         (Clear variant keeps a dimming layer for legibility)
 *   2. refraction         (backdrop displacement — the defining effect)
 *   1. shadow             (soft, scales with element height)
 */
export function GlassSurface({
  children,
  radius,
  variant = "clear",
  interactive = false,
  tag = "div",
  className = "",
  style,
}: GlassSurfaceProps) {
  const Tag = TAGS[tag];
  const rawId = useId();
  const filterId = `lg-${rawId.replace(/[:]/g, "")}`;

  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [map, setMap] = useState("");
  const [tier, setTier] = useState<"refract" | "frost">("frost");

  useEffect(() => {
    const read = () =>
      setTier(
        document.documentElement.dataset.glassTier === "refract"
          ? "refract"
          : "frost",
      );
    read();
    // GlassRuntime sets the tier in its own effect, which may land after this one.
    const timer = window.setTimeout(read, 0);
    return () => window.clearTimeout(timer);
  }, []);

  /* Regenerate the displacement map when the element resizes (spec 6.1.7). */
  useEffect(() => {
    const node = ref.current;
    if (!node || tier !== "refract") return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const w = Math.round(width);
      const h = Math.round(height);
      if (w < 2 || h < 2) return;
      setSize({ width: w, height: h });
      setMap(
        buildDisplacementMap({
          width: w,
          height: h,
          radius,
          // spec 2.1: bezel ~20-30% of the smaller dimension
          bezel: Math.min(24, Math.min(w, h) * 0.28),
        }),
      );
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [radius, tier]);

  /* ---------------- press physics (spec 5.1) ---------------- */

  const pressed = useMotionValue(0);
  const scale = useSpring(1, SPRINGS.press);
  const glow = useSpring(0, { stiffness: 260, damping: 30, mass: 1 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Rim brightens while held (spec 5.1).
  const rimOpacity = useTransform(pressed, [0, 1], [0.78, 1]);

  /* Hoisted: hooks cannot live inside the conditional JSX below. */
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.45), rgba(255,255,255,0.10) 38%, transparent 70%)`,
  );

  const onPointerDown = (event: React.PointerEvent) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(((event.clientX - rect.left) / rect.width) * 100);
    glowY.set(((event.clientY - rect.top) / rect.height) * 100);
    pressed.set(1);
    // Glass swells on press rather than shrinking.
    scale.set(1.05);
    glow.set(1);
  };

  const release = () => {
    if (!interactive) return;
    pressed.set(0);
    scale.set(1);
    glow.set(0);
  };

  /* ---------------- layers ---------------- */

  const backdrop =
    tier === "refract" && map
      ? `url(#${filterId}) saturate(var(--lg-saturate)) blur(var(--lg-blur))`
      : "blur(8px) saturate(1.8) brightness(1.05)";

  /* No drop shadow anywhere. Spec 2.5 scales one with element height, but
     the site's standing rule is shadow-free; edge definition comes from the
     specular rim and the hairline below instead. */

  return (
    <Tag
      ref={ref as never}
      onPointerDown={onPointerDown}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className={`glass-surface relative isolate ${className}`}
      style={{
        borderRadius: radius,
        boxShadow: "none",
        scale: interactive ? scale : undefined,
        ...style,
      }}
    >
      {/* SVG filter, sized to this element */}
      {tier === "refract" && map && (
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          className="pointer-events-none absolute"
        >
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={map}
                result="map"
                x="0"
                y="0"
                width={size.width}
                height={size.height}
                preserveAspectRatio="none"
              />
              {/* Chromatic aberration: each channel bends slightly differently */}
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={18}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dR"
              />
              <feColorMatrix
                in="dR"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="r"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={18 * 1.02}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dG"
              />
              <feColorMatrix
                in="dG"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="g"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={18 * 1.04}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dB"
              />
              <feColorMatrix
                in="dB"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="b"
              />
              <feBlend in="r" in2="g" mode="screen" result="rg" />
              <feBlend in="rg" in2="b" mode="screen" />
            </filter>
          </defs>
        </svg>
      )}

      {/* 2. refraction */}
      <span
        aria-hidden="true"
        className="glass-refract pointer-events-none absolute inset-0 -z-10"
        style={{
          borderRadius: radius,
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
        }}
      />

      {/* 3. tint / dim — Clear carries a dimming layer so labels stay legible */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          borderRadius: radius,
          background:
            variant === "tinted"
              ? "var(--lg-tint-accent)"
              : "var(--lg-dim-clear)",
        }}
      />

      {/* 4. inner shading — the thickness cue */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          borderRadius: radius,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08), inset 0 0 12px rgba(255,255,255,0.12)",
        }}
      />

      {/* 5. specular rim — ring only, via mask-composite */}
      <motion.span
        aria-hidden="true"
        className="glass-rim pointer-events-none absolute inset-0 -z-10"
        style={{ borderRadius: radius, opacity: rimOpacity }}
      />

      {/* 6. interaction glow */}
      {interactive && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            borderRadius: radius,
            opacity: glow,
            background: glowBackground,
          }}
        />
      )}

      {children}
    </Tag>
  );
}
