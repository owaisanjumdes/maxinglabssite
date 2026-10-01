# Liquid Glass for the Web — Build Spec

A complete specification for recreating Apple's **Liquid Glass** material (iOS 26 / macOS 26) on a website as closely as the browser allows. Hand this whole file to Claude Code as the brief.

> **Note on numbers.** Apple does not publish pixel values for Liquid Glass. Everything below marked *(tuned)* is a starting value chosen to match Apple's material by eye; adjust after comparing side by side with a real iPhone screenshot. Behaviors (what the material does and when) come from Apple's WWDC25 "Meet Liquid Glass" session and the Human Interface Guidelines.

---

## 0. Instructions for Claude Code

1. Build a reusable Liquid Glass system (vanilla JS + CSS, framework-agnostic; wrap it in React components if the project uses React).
2. Implement **three render tiers** with feature detection (section 6): true refraction (Chromium), frosted fallback (Safari/Firefox), and accessibility-reduced.
3. Build every component in section 8 and a demo page (section 11) over a colorful, scrollable background so the effect is visible.
4. Use **spring physics** for all motion (section 7). No plain `ease` or `linear` transitions on glass.
5. Meet every item in the acceptance checklist (section 12) before calling it done.

---

## 1. What Liquid Glass is

Liquid Glass is a **digital meta-material**: a floating, clear, liquid-like pane that sits above content and *bends light* rather than scattering it. Key differences from the old iOS "blur" material:

| Old frosted blur (iOS 7–18) | Liquid Glass (iOS 26) |
|---|---|
| Scatters light — heavy Gaussian blur, content behind is mush | **Lenses** light — content stays mostly sharp and readable in the center, and is **bent and magnified toward the edges** |
| Flat, uniform tint | Thick-glass look: bright **specular rim**, inner shadow, edge refraction |
| Static | Reacts to touch (flexes, glows), to motion/pointer (highlight moves), and to the content beneath (adapts tint, shadow, light/dark) |
| Fades in/out | **Materializes** by ramping the lensing strength up/down |

It is reserved for the **navigation layer** (tab bars, toolbars, floating buttons, menus, sheets, controls). It is *never* used on the content itself (list rows, cards in a feed).

---

## 2. Anatomy — the layers of one glass element

Build each glass element as a stack. Order from bottom to top:

```
┌─────────────────────────────────────────────┐
│ 7. Content (icons/labels) – vibrant, on top │
│ 6. Interaction glow (radial, at touch point)│
│ 5. Specular rim highlight (edge light)      │
│ 4. Inner shading (inset top-light/bottom-dark)│
│ 3. Tint layer (neutral or brand, adaptive)  │
│ 2. Refraction/lens (backdrop displacement)  │
│ 1. Shadow (soft, adaptive, below element)   │
└─────────────────────────────────────────────┘
          ↑ page content scrolls beneath
```

### 2.1 Refraction / lensing (the defining effect)
- The glass behaves like a **convex slab with rounded, bevelled edges**. The flat center barely distorts; the **bezel zone** near the edge bends the background inward, so content near the rim appears pulled/magnified and curved.
- Bezel width: **~20–30% of the element's smaller dimension**, capped at ~24px on small controls *(tuned)*.
- Displacement magnitude at the rim: **~10–25px** for a 60px-tall bar, scaling with element size — larger elements look *thicker* and refract more (Apple: bigger glass = "thicker, more substantial material").
- Very light background blur only: **1–3px** *(tuned)*. The content must remain readable through the center. This is the #1 thing people get wrong — do **not** use `blur(20px)`.
- Slight saturation boost: `saturate(1.4–1.8)` *(tuned)*.
- Subtle **chromatic aberration** at the extreme rim: red/green/blue displaced by slightly different amounts (e.g. 1.00×, 1.02×, 1.04×) so edges get a faint rainbow fringe.

### 2.2 Tint
- **Regular** variant: very light neutral fill — light mode `rgba(255,255,255,0.08–0.18)`, dark mode `rgba(0,0,0,0.12–0.25)` *(tuned)*.
- **Clear** variant: almost no fill `rgba(255,255,255,0.02–0.05)`, and requires a **dimming layer** behind its content (section 3).
- **Tinted** glass (used selectively for the primary action only): a colored fill at ~35–55% opacity that shifts in brightness/saturation with the content below while staying recognizably the same hue. Never tint every element.

### 2.3 Inner shading (thickness)
- Top-inner edge brighter, bottom-inner edge slightly darker, simulating light from above:
  - `inset 0 1px 0 rgba(255,255,255,0.5)` (top lip)
  - `inset 0 -1px 0 rgba(0,0,0,0.08)` (bottom lip)
  - `inset 0 0 12px rgba(255,255,255,0.12)` (inner glow for body)
  *(all tuned)*

### 2.4 Specular rim highlight
- A thin (**1–1.5px**) bright stroke that hugs the shape's outline, **brightest on the side facing the light** and fading to near-invisible on the opposite side.
- Implement as a gradient border drawn with a mask (`mask-composite: exclude`) so only the ring shows. Use a `conic-gradient` whose angle is driven by a CSS variable `--light-angle`.
- Two soft hot-spots on opposite corners (top-left strong, bottom-right weaker) — the classic "glass bead" look.
- `--light-angle` follows device tilt on phones (`DeviceOrientationEvent`) and the pointer position on desktop, with spring smoothing. Movement range: ±25–40° *(tuned)*. At rest it points from the top-left.

### 2.5 Shadow
- Soft and wide, low opacity: `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)` *(tuned)*.
- **Adaptive**: shadow opacity increases when text/busy content is under the glass and decreases over plain light backgrounds (section 3).
- Larger elements get deeper shadows (scale blur and offset with element height).

### 2.6 Content on glass
- Icons and labels use **vibrancy**: high-contrast but not pure black/white — light mode `rgba(0,0,0,0.85)`, dark mode `rgba(255,255,255,0.95)`, with `mix-blend-mode: normal` (plus-lighter for the selected state in dark).
- Font: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif`. Labels 10–11px medium in tab bars, 15–17px semibold in toolbars.
- Selected tab: the icon is tinted with the accent color and sits on an inner **glass pill** (a nested lens, not a second full glass layer — see "no glass on glass").

---

## 3. Adaptivity (reacting to what's underneath)

Apple's glass continuously samples the content beneath it. On the web, approximate this:

1. **Luminance sampling.** Every scroll frame (throttled with `requestAnimationFrame`), estimate the average luminance of the content under each glass element. Practical methods, in order of preference:
   - Tag sections with `data-glass-tone="light|dark"` and use `IntersectionObserver`/`elementsFromPoint` to see which section is under the glass.
   - Or read the computed background color of the element returned by `document.elementsFromPoint(centerX, centerY)` (skipping the glass itself).
2. **Small elements** (tab bar, nav bar, floating buttons): **flip between light and dark appearance** when the underlying tone changes. Animate the flip over ~250ms with a spring, cross-fading tint, content color and shadow together.
3. **Large elements** (menus, sidebars, sheets): **do not flip**; only nudge tint and shadow.
4. **Shadow and tint strength** rise when busy content (text) is beneath, fall over flat areas.
5. **Clear variant** never adapts; instead it always has a dimming layer: `rgba(0,0,0,0.25–0.35)` behind the glass (full) or a localized radial dim just behind the icons.
6. Never mix Regular and Clear in the same UI.

---

## 4. Shape language

- **Capsules** everywhere for bars and buttons (`border-radius: 9999px`). Circles for single icon buttons.
- **Concentricity**: nested shapes share a center. Inner radius = outer radius − padding. E.g. tab bar radius 32px with 4px inset → selected pill radius 28px. Sheets that sit near the screen edge use a radius matching the device corner (~44–55px on modern iPhones; use `--screen-radius: 48px` on mobile web).
- Floating, **inset from edges** (never touching the viewport edge): bottom tab bar ~12–16px from the sides and ~8px above the safe-area inset (`env(safe-area-inset-bottom)`).
- Use **continuous (squircle) corners** where possible: `corner-shape: squircle` (Chromium experimental) with `border-radius` fallback.

---

## 5. Behaviors and animations

All timings are springs (section 7). Durations listed are the approximate settle time.

### 5.1 Press / touch
- On `pointerdown`: the element **scales up** to ~1.04–1.08 (not down — glass *swells*), a **radial glow** blooms from the exact touch point and spreads across the surface (and faintly onto adjacent glass elements), the rim highlight brightens ~30%.
- The shape **flexes like gel**: it stretches slightly toward the pointer direction while held (≤ 3–5% non-uniform scale), then springs back.
- On `pointerup`: glow fades over ~350ms, scale springs back with a slight overshoot (one small bounce).

### 5.2 Materialize / dematerialize
- Appearing: **do not just fade opacity.** Ramp the refraction scale from 0 → full, scale from 0.85 → 1, blur of content 4px → 0, opacity 0 → 1 over ~350ms. The glass looks like it "condenses" out of the background.
- Disappearing: reverse, slightly faster (~250ms).

### 5.3 Morphing between controls
- When one glass control turns into another (e.g., a "+" button expanding into a menu, a search icon expanding into a search field, a toolbar button group becoming a single button), it's **one continuous blob**: position, width, height and border-radius animate together with a spring; content cross-fades inside with a slight blur (content out by 40% of the timeline, content in from 40%).
- Neighboring glass elements that come close **merge like liquid droplets** (metaball effect): when two glass capsules are within ~20px, a neck of glass bridges them, then they join. Implement with an SVG goo filter (`feGaussianBlur` + `feColorMatrix` alpha threshold) on the glass *shape masks* inside a shared container (the equivalent of SwiftUI's `GlassEffectContainer`).

### 5.4 Menu / popover open
- The source button **bubbles open** in place: the glass grows from the button's rect into the menu's rect (anchored to the tapped corner), overshooting ~2–3%, then settles. Menu items fade/slide in 30ms staggered. Closing reverses into the button.

### 5.5 Tab bar minimize on scroll
- Scrolling **down** past ~40px: the tab bar **shrinks** into a compact capsule showing only the selected tab icon (and optionally slides a floating search/accessory button beside it). Width, height and label opacity animate together.
- Scrolling **up** (any upward delta > ~10px) or reaching the top: it **expands** back to full.

### 5.6 Controls that "lift into glass"
While being manipulated, a control's thumb becomes a glass lens, then returns to solid at rest:
- **Toggle switch**: at rest a solid white knob. While pressed/dragged the knob **grows ~1.5× wide into a clear glass lens**, magnifying the track beneath; releases back to solid white with a bounce.
- **Slider**: thumb becomes a larger glass lens during drag that magnifies the filled track; the track fill stays sharp through the lens.
- **Segmented control**: the selection indicator is a glass pill that **slides with a stretch** (elongates in the direction of travel, then catches up) and magnifies the label under it while moving.

### 5.7 Scroll edge effect
- Under top/bottom glass bars, content scrolling beneath **dissolves**: a progressive blur + fade from the bar edge ~40–60px into the content.
- Implement as a fixed strip with `backdrop-filter: blur()` masked by a `linear-gradient` from opaque to transparent (stack 3–4 strips with increasing blur for a smooth progressive blur).
- Over dark content, switch from the fade style to a **subtle dimming** gradient.
- **Hard** variant (for pinned headers like table column headers): uniform blur/dim across the whole bar height, no gradient.

### 5.8 Sheets
- Bottom sheets at partial height are **floating glass inset from the edges** with concentric corners. Dragged to full height, they become more opaque and snap flush to the edges; corner radius animates to match. Drag uses the same gel stretch at the top when over-pulled (rubber-banding).

---

## 6. Web implementation

### 6.1 Tier A — true refraction (Chromium: Chrome, Edge, Arc, Opera)
Chromium supports SVG filters inside `backdrop-filter`. Use a **displacement map** generated per element size.

```css
.glass {
  backdrop-filter: url(#lg-filter-<id>) saturate(1.6) blur(2px);
}
```

Filter structure:
```xml
<filter id="lg-filter-<id>" x="0" y="0" width="100%" height="100%"
        color-interpolation-filters="sRGB">
  <feImage href="<displacement map data URL>" result="map"
           x="0" y="0" width="{w}" height="{h}" preserveAspectRatio="none"/>
  <!-- chromatic aberration: 3 channels, slightly different scales -->
  <feDisplacementMap in="SourceGraphic" in2="map" scale="{s*1.00}"
                     xChannelSelector="R" yChannelSelector="G" result="dR"/>
  <feColorMatrix in="dR" type="matrix"
     values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  <feDisplacementMap in="SourceGraphic" in2="map" scale="{s*1.02}"
                     xChannelSelector="R" yChannelSelector="G" result="dG"/>
  <feColorMatrix in="dG" type="matrix"
     values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  <feDisplacementMap in="SourceGraphic" in2="map" scale="{s*1.04}"
                     xChannelSelector="R" yChannelSelector="G" result="dB"/>
  <feColorMatrix in="dB" type="matrix"
     values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/>
  <feBlend in="rg" in2="b" mode="screen"/>
</filter>
```

**Generating the displacement map** (canvas, per element size, cached by `w×h×radius`):
1. For each pixel, compute the signed distance `d` to the rounded-rect (capsule) edge.
2. Inside the bezel (`d < bezel`), compute a normalized depth `t = 1 - d/bezel` (1 at the edge, 0 at the inner bezel boundary).
3. Glass surface profile: use a **convex squircle** height function `h(t) = (1 - t^4)^(1/4)` (a "squircle bevel"); its slope gives the refraction strength. Approximate Snell's law with refractive index **n ≈ 1.5**: displacement magnitude ∝ slope × thickness.
4. Displacement direction = **toward the center** along the surface normal (gradient of the SDF).
5. Encode: `R = 128 + dx * 127`, `G = 128 + dy * 127` (normalized to max displacement), `B = 128`, `A = 255`. Center (flat area) is neutral gray (128,128) = no displacement.
6. Set `scale` on `feDisplacementMap` to the max displacement in px (section 2.1).
7. Regenerate on resize (ResizeObserver) and during morph animations at most every other frame; during animation you may animate only the `scale` attribute and stretch the existing map (`preserveAspectRatio="none"`) for performance.

### 6.2 Tier B — frosted fallback (Safari, Firefox, low-power devices)
Safari and Firefox don't support SVG filters in `backdrop-filter`. Use:
```css
.glass {
  backdrop-filter: blur(8px) saturate(1.8) brightness(1.05);
  -webkit-backdrop-filter: blur(8px) saturate(1.8) brightness(1.05);
}
```
Keep every other layer (rim, inner shading, shadow, glow, springs, morphing) identical so the look stays close. Optional: fake edge refraction with a masked inner ring that uses a slightly stronger blur and `scale(1.03)` background — only if performance allows.

### 6.3 Tier C — accessibility-reduced (section 9).

### 6.4 Detection
```js
const supportsSvgBackdrop = (() => {
  const isChromium = !!window.chrome && CSS.supports('backdrop-filter', 'url(#x)');
  return isChromium; // Safari reports support but does not render it
})();
document.documentElement.dataset.glassTier = supportsSvgBackdrop ? 'refract' : 'frost';
```

### 6.5 Optional Tier A+ (WebGL)
For hero-only showcases where the background is an image/video you control (not live DOM), render the glass in WebGL: sample the background texture with a refraction shader (SDF-based normal, IOR 1.5, per-channel dispersion, Fresnel rim, specular via Blinn-Phong with the `--light-angle` light). This is the most accurate option but cannot refract arbitrary HTML.

### 6.6 Performance rules
- Keep the number of simultaneously refracting elements ≤ ~6.
- Add `will-change: transform` only during animation; remove after.
- Animate only `transform`, `opacity` and CSS variables driving gradients; animate width/height of morphing blobs with a FLIP technique where possible.
- Cache displacement maps; never regenerate every frame at full resolution.
- Drop to Tier B when `navigator.hardwareConcurrency <= 4` or a frame-time monitor detects sustained drops below 50fps.

---

## 7. Motion system (springs)

Use a physics spring for every glass animation (the `motion` library, or a small custom spring solver; CSS `linear()` easing generated from a spring is acceptable for simple transitions).

| Use | Stiffness | Damping | Mass | Feel |
|---|---|---|---|---|
| Press swell / release | 400 | 22 | 1 | Quick, one small bounce |
| Morph / menu open | 300 | 26 | 1 | Fluid, slight overshoot |
| Tab bar minimize/expand | 260 | 30 | 1 | Smooth, near-critical |
| Segmented / toggle lens slide | 500 | 30 | 1 | Snappy with stretch |
| Specular light follow | 120 | 20 | 1 | Lazy, floaty |
| Light/dark flip | 200 | 28 | 1 | Calm |
*(all tuned; Apple's defaults are roughly "response 0.3–0.5s, damping fraction 0.7–0.85")*

- Interruptible: any new gesture retargets the spring from its current velocity; never jump or restart.
- Stretch during movement: scaleX = 1 + clamp(velocityX × 0.0006, 0, 0.12), scaleY = 1 − half of that; relax to 1 on settle.

---

## 8. Components to build

Each is a glass element following sections 2–7.

1. **`<GlassTabBar>`** — floating bottom capsule, 4–5 tabs (icon + label), selected tab on an inner glass pill that slides between tabs with stretch; minimizes on scroll down (5.5); optional separate floating circular search button to its right.
2. **`<GlassNavBar>`** — top bar with large title that collapses into an inline title on scroll; back/action buttons are individual glass capsules/circles (not one full-width bar); scroll edge effect beneath.
3. **`<GlassButton>`** — capsule and circle variants, regular / clear / tinted (primary); press behavior 5.1.
4. **`<GlassButtonGroup>`** — 2–3 icon buttons sharing one capsule, which morphs/merges with neighbors (5.3).
5. **`<GlassMenu>`** — opens from a button by bubbling (5.4), items with dividers as thin vibrant lines, highlight row is a soft fill (not a second glass).
6. **`<GlassToggle>`**, **`<GlassSlider>`**, **`<GlassSegmented>`** — lift-into-glass behavior (5.6).
7. **`<GlassSheet>`** — bottom sheet, detents at 40% / 90%, inset-to-flush transition (5.8).
8. **`<GlassSearchField>`** — circular search button that morphs into a full-width glass capsule field with keyboard focus.
9. **`<ScrollEdgeEffect>`** — fade, dim and hard variants (5.7).

Tokens (CSS custom properties) to expose:
```css
:root {
  --lg-tint-light: rgba(255,255,255,.12);
  --lg-tint-dark: rgba(0,0,0,.18);
  --lg-clear-tint: rgba(255,255,255,.04);
  --lg-dim-clear: rgba(0,0,0,.3);
  --lg-rim-strength: .55;
  --lg-light-angle: 135deg;
  --lg-blur: 2px;
  --lg-saturate: 1.6;
  --lg-refraction: 18;          /* px at rim */
  --lg-bezel: 22px;
  --lg-dispersion: .04;
  --lg-shadow: 0 8px 32px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08);
  --lg-accent: #0A84FF;         /* iOS system blue; swap for brand */
  --lg-screen-radius: 48px;
}
```

---

## 9. Accessibility

| Setting | Web signal | Behavior |
|---|---|---|
| Reduce Transparency | `@media (prefers-reduced-transparency: reduce)` | Glass becomes **frostier**: blur 20px+, tint opacity ~0.75, refraction off |
| Increase Contrast | `@media (prefers-contrast: more)` | Mostly solid black or white fills, plus a **contrasting 1.5px border**; no chromatic aberration |
| Reduce Motion | `@media (prefers-reduced-motion: reduce)` | **Disable elastic/gel stretching and overshoot**; morphs become short cross-fades; specular light stops following tilt |
| Keyboard | — | Every glass control focusable; focus ring = 2px accent ring offset 2px, concentric with the shape |
| Text contrast | — | Labels on glass must meet WCAG AA against the *worst case* background; adaptivity (section 3) exists to guarantee this |

Also provide a manual site setting (Glass: Clear / Tinted / Off) similar to iOS 26.1's Clear vs Tinted option.

---

## 10. Do / Don't

**Do**
- Use glass only for floating navigation and controls.
- Keep the center of the glass clear enough to read content through it.
- Let one primary action be tinted.
- Keep shapes concentric and inset from edges.

**Don't**
- Stack glass on glass (a glass button on a glass card). Content on glass uses fills/vibrancy, not more glass.
- Put glass on content cards, list rows or large text areas.
- Use heavy blur (that's the old material).
- Fade glass in with plain opacity.
- Mix Regular and Clear in one UI.
- Tint everything.

---

## 11. Demo page

Build `/liquid-glass-demo` with:
- A tall, scrollable background with **varied content**: a colorful photo band, a dark section, a white text-heavy section, a gradient section and a video — so refraction, adaptivity and the light/dark flip are all visible.
- Top nav bar, bottom tab bar with search button, a floating tinted primary button, a menu button, a sheet trigger, and a controls panel (toggle, slider, segmented) placed over the photo band.
- A debug panel (toggle with `?debug`) with sliders for every token in section 8 and a tier switch (Refract / Frost / Reduced) for side-by-side tuning against real iOS screenshots.

---

## 12. Acceptance checklist

- [ ] Content under the glass center is clearly readable; edges visibly **bend and magnify** the background (Chromium).
- [ ] Faint rainbow fringe on the rim over high-contrast content.
- [ ] Rim highlight is brightest on the light side and moves with pointer/tilt smoothly.
- [ ] Press: element swells, glow blooms from the exact touch point, springs back with one bounce.
- [ ] Glass appears by condensing (refraction + scale), not by opacity alone.
- [ ] Button → menu and search button → search field morph as one continuous shape.
- [ ] Two nearby glass capsules merge like droplets.
- [ ] Tab bar minimizes on scroll down, expands on scroll up.
- [ ] Toggle, slider and segmented thumbs turn into glass lenses while dragged.
- [ ] Small bars flip light/dark over dark sections; large surfaces don't.
- [ ] Scroll edge effect fades content under bars; dims over dark content.
- [ ] Safari/Firefox show the frosted tier with all other layers and motion intact.
- [ ] Reduce Transparency, Increase Contrast and Reduce Motion each produce the specified result.
- [ ] 60fps while scrolling on a mid-range laptop and a recent iPhone.
- [ ] No glass-on-glass anywhere.

---

### References
- Apple, *Meet Liquid Glass* (WWDC25 session 219): https://developer.apple.com/videos/play/wwdc2025/219/
- Apple Human Interface Guidelines — Materials: https://developer.apple.com/design/human-interface-guidelines/materials
