/**
 * Spring presets from spec section 7. Every glass animation uses one of
 * these — no plain ease or linear transitions on glass.
 */
export const SPRINGS = {
  press: { stiffness: 400, damping: 22, mass: 1 },
  morph: { stiffness: 300, damping: 26, mass: 1 },
  minimize: { stiffness: 260, damping: 30, mass: 1 },
  lens: { stiffness: 500, damping: 30, mass: 1 },
  light: { stiffness: 120, damping: 20, mass: 1 },
  toneFlip: { stiffness: 200, damping: 28, mass: 1 },
} as const;

export type SpringConfig = { stiffness: number; damping: number; mass: number };

/**
 * Minimal semi-implicit Euler spring, used where a raw number needs driving
 * outside React (the specular light angle). Interruptible by design: retarget
 * mid-flight and velocity carries over rather than restarting.
 */
export class Spring {
  value: number;
  velocity = 0;
  target: number;

  constructor(
    initial: number,
    private config: SpringConfig,
  ) {
    this.value = initial;
    this.target = initial;
  }

  setTarget(next: number) {
    this.target = next;
  }

  /** dt in seconds, clamped so a backgrounded tab cannot explode the sim. */
  step(dt: number): number {
    const t = Math.min(dt, 1 / 30);
    const { stiffness, damping, mass } = this.config;
    const force = -stiffness * (this.value - this.target);
    const drag = -damping * this.velocity;
    const acceleration = (force + drag) / mass;
    this.velocity += acceleration * t;
    this.value += this.velocity * t;
    return this.value;
  }

  get settled(): boolean {
    return (
      Math.abs(this.velocity) < 0.01 &&
      Math.abs(this.value - this.target) < 0.01
    );
  }
}

/**
 * Spec 7: stretch scales with velocity during movement and relaxes on settle.
 * Returns a non-uniform scale pair, volume roughly preserved.
 */
export function velocityStretch(velocity: number): { x: number; y: number } {
  const stretch = Math.min(Math.max(Math.abs(velocity) * 0.0006, 0), 0.12);
  const signed = velocity < 0 ? -stretch : stretch;
  return { x: 1 + Math.abs(signed), y: 1 - Math.abs(signed) / 2 };
}
