"use client";

import { useEffect, useState } from "react";

/**
 * Scroll edge effect (spec 5.7). Content scrolling under the top bar
 * dissolves rather than sliding cleanly behind it.
 *
 * True progressive blur needs more than one strip: a single backdrop-filter
 * with a gradient mask blurs uniformly and just fades the result out. Stacking
 * four strips with decreasing blur and overlapping masks approximates a real
 * blur ramp from the bar edge down into the content.
 */
const LAYERS = [
  { blur: 8, mask: "linear-gradient(to bottom, #000 0%, #000 22%, transparent 44%)" },
  { blur: 4, mask: "linear-gradient(to bottom, #000 0%, #000 44%, transparent 64%)" },
  { blur: 2, mask: "linear-gradient(to bottom, #000 0%, #000 64%, transparent 84%)" },
  { blur: 1, mask: "linear-gradient(to bottom, #000 0%, #000 84%, transparent 100%)" },
];

export function ScrollEdge() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[180px] transition-opacity duration-500"
      style={{ opacity: active ? 1 : 0 }}
    >
      {LAYERS.map((layer) => (
        <div
          key={layer.blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}
