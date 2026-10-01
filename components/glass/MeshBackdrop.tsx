/**
 * Ambient glow. The only decorative colour effect on the site.
 *
 * Two very soft radial fields over black — one from the top-right, one from
 * the lower-left — running accent-glow -> accent-deep -> transparent with a
 * heavy falloff and no hard edges. Atmosphere, not a background colour: the
 * page underneath stays black.
 */
export function MeshBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-20 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 48% at 82% 6%, color-mix(in srgb, var(--accent-glow) 40%, transparent), color-mix(in srgb, var(--accent-deep) 55%, transparent) 42%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 54% 46% at 14% 88%, color-mix(in srgb, var(--accent-glow) 34%, transparent), color-mix(in srgb, var(--accent-deep) 50%, transparent) 40%, transparent 70%)",
        }}
      />

      {/* Fine grid: high-frequency detail is what makes the glass rim
          distortion legible. Kept at very low opacity. */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent 75%)",
        }}
      />
    </div>
  );
}
