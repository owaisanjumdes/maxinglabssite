/**
 * Displacement-map generator for the Liquid Glass refraction filter.
 * Spec section 6.1.
 *
 * The glass is modelled as a convex slab with a bevelled rim. The flat centre
 * leaves the backdrop untouched; inside the bezel the surface curves, so light
 * bends toward the centre and the background appears pulled and magnified.
 *
 * Encoding: R = 128 + dx*127, G = 128 + dy*127, B = 128, A = 255.
 * Neutral grey (128,128) means no displacement, which is what the centre gets.
 */

export type GlassMapSpec = {
  width: number;
  height: number;
  radius: number;
  bezel: number;
};

/** Maps are expensive and size-stable, so cache by geometry. */
const cache = new Map<string, string>();

/** Signed distance to a rounded rectangle. Negative inside. */
function sdRoundRect(
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
): number {
  const qx = Math.abs(px - w / 2) - (w / 2 - r);
  const qy = Math.abs(py - h / 2) - (h / 2 - r);
  const ax = Math.max(qx, 0);
  const ay = Math.max(qy, 0);
  return Math.hypot(ax, ay) + Math.min(Math.max(qx, qy), 0) - r;
}

/**
 * Squircle bevel profile, h(t) = (1 - t^4)^(1/4), where t is 0 at the inner
 * edge of the bezel and 1 at the rim. Its slope drives refraction strength,
 * which is why the distortion stays near zero across the centre and ramps
 * hard in the last few pixels — the behaviour that separates a lens from
 * a blur.
 */
function bevelSlope(t: number): number {
  const t4 = t * t * t * t;
  return (t * t * t) / Math.pow(Math.max(1e-4, 1 - t4), 0.75);
}

export function buildDisplacementMap({
  width,
  height,
  radius,
  bezel,
}: GlassMapSpec): string {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const r = Math.min(radius, Math.min(w, h) / 2);
  // Spec 2.1: bezel ~20-30% of the smaller dimension, capped at 24px.
  const bz = Math.max(1, Math.min(bezel, Math.min(w, h) * 0.3, 24));

  const key = `${w}x${h}r${r}b${bz}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: false });
  if (!ctx) return "";

  const image = ctx.createImageData(w, h);
  const data = image.data;
  const eps = 1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const cx = x + 0.5;
      const cy = y + 0.5;

      // Distance from the edge, measured inward.
      const d = -sdRoundRect(cx, cy, w, h, r);

      let dx = 0;
      let dy = 0;

      if (d >= 0 && d < bz) {
        const t = 1 - d / bz;
        // n ~ 1.5: magnitude scales with surface slope, clamped at the rim.
        const magnitude = Math.min(1, bevelSlope(t) * 0.3);

        // Outward normal = gradient of the SDF.
        const gx =
          sdRoundRect(cx + eps, cy, w, h, r) - sdRoundRect(cx - eps, cy, w, h, r);
        const gy =
          sdRoundRect(cx, cy + eps, w, h, r) - sdRoundRect(cx, cy - eps, w, h, r);
        const len = Math.hypot(gx, gy) || 1;

        // Displace toward the centre, i.e. against the outward normal.
        dx = -(gx / len) * magnitude;
        dy = -(gy / len) * magnitude;
      }

      data[i] = Math.round(128 + dx * 127);
      data[i + 1] = Math.round(128 + dy * 127);
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const url = canvas.toDataURL();
  cache.set(key, url);
  return url;
}
