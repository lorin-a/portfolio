# GSAP Patterns — lorin.work

This is the GSAP reference for this project. Read it at the start of every session before writing animation code.

**Version:** GSAP 3.14.2 + @gsap/react 2.1.2 (latest, all plugins free)

---

## Core Rule

**Think in GSAP, not CSS.** All animation in this project is GSAP-driven. Never use CSS `transition` or `@keyframes` on elements that GSAP also animates. CSS handles static styles. GSAP handles motion.

---

## React Pattern

Always use `useGSAP` from `@gsap/react`, never `useEffect` for animation.

```jsx
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, /* other plugins */)

function Component() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // All animation code here — auto cleanup on unmount
    gsap.to('.target', { x: 100 })
  }, { scope: containerRef })

  return <div ref={containerRef}>...</div>
}
```

**Key rules:**
- `scope` restricts selector text to the container's descendants
- Animations inside click handlers or timeouts must use `contextSafe()`
- `useGSAP` handles React 18 strict mode double-fire automatically
- Use `dependencies` array to control when the effect re-runs

```jsx
const { contextSafe } = useGSAP({ scope: containerRef })

const handleClick = contextSafe(() => {
  gsap.to('.box', { rotation: 360 })
})
```

---

## Visibility & FOUC Prevention

**Always use `autoAlpha` instead of `opacity`.**

```css
/* CSS: hide element initially */
.element { visibility: hidden; }
```

```js
/* GSAP: reveal with autoAlpha (sets visibility: visible when opacity > 0) */
gsap.to('.element', { autoAlpha: 1, duration: 0.6 })
```

Never use `opacity: 0` in CSS for GSAP-animated elements — invisible elements still receive pointer events. `autoAlpha` handles both `opacity` and `visibility` together.

---

## Text Animation: SplitText

For any text reveal, split, or character animation:

```js
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

const split = SplitText.create('.text', {
  type: 'chars',          // 'chars', 'words', 'lines', or combinations
  mask: 'chars',           // creates clip container for reveal effects
  autoSplit: true,         // re-splits on font load or resize
  onSplit(self) {
    // Extend mask for descenders
    self.masks.forEach(m => { m.style.paddingBottom = '0.15em' })
  }
})

// Wave reveal — chars rise from behind mask
gsap.from(split.chars, {
  y: '100%', duration: 0.8, stagger: 0.04, ease: 'power1.inOut'
})
```

**Gradient text with SplitText:** Apply gradient per-character after splitting, with background spanning so the gradient reads as continuous:

```js
const wrapRect = element.getBoundingClientRect()
split.chars.forEach(char => {
  const charRect = char.getBoundingClientRect()
  char.style.background = gradient
  char.style.backgroundSize = `${wrapRect.width}px ${wrapRect.height}px`
  char.style.backgroundPosition = `-${charRect.left - wrapRect.left}px 0px`
  char.style.webkitBackgroundClip = 'text'
  char.style.backgroundClip = 'text'
  char.style.color = 'transparent'
})
```

---

## SVG Animation

**DrawSVG** — for stroke reveals (replaces manual strokeDasharray):
```js
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
gsap.registerPlugin(DrawSVGPlugin)

gsap.from('.path', { drawSVG: 0, duration: 1.8 })
// Or partial reveal:
gsap.to('.path', { drawSVG: '20% 80%' })
```

**MorphSVG** — shape-to-shape morphing:
```js
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
gsap.registerPlugin(MorphSVGPlugin)

gsap.to('#shape1', { morphSVG: '#shape2', duration: 1 })
```

**MotionPath** — animate along a path:
```js
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
gsap.registerPlugin(MotionPathPlugin)

gsap.to('.element', {
  motionPath: { path: '#svgPath', align: '#svgPath', autoRotate: true },
  duration: 3
})
```

---

## Scroll Animation

**ScrollTrigger** — link animations to scroll position:
```js
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

gsap.to('.element', {
  y: 0, autoAlpha: 1,
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',     // when element's top hits 80% down viewport
    end: 'bottom 20%',
    scrub: 0.5,            // smooth tie to scroll (seconds to catch up)
    markers: true,         // dev only — visual debugging
  }
})
```

**Pinning:**
```js
ScrollTrigger.create({
  trigger: '.section',
  pin: true,
  start: 'top top',
  end: '+=500',           // pin for 500px of scroll
})
```

---

## Layout Animation: Flip

For state changes that move elements (reparenting, class toggles, layout shifts):

```js
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

const state = Flip.getState('.items')
// ... make DOM changes ...
Flip.from(state, {
  duration: 0.8,
  ease: 'power1.inOut',
  absolute: true,         // prevents layout thrashing during animation
})
```

---

## Timeline Choreography

```js
const tl = gsap.timeline({ defaults: { ease: 'power1.inOut' } })

tl.to('.a', { x: 100, duration: 0.6 })           // sequential
  .to('.b', { y: 50, duration: 0.4 }, '-=0.2')   // overlap by 0.2s
  .to('.c', { scale: 1.2 }, '<')                  // start with previous
  .to('.d', { autoAlpha: 1 }, '>-0.1')            // 0.1s before previous ends
  .addLabel('reveal')
  .to('.e', { rotation: 360 }, 'reveal+=0.5')     // 0.5s after label
```

**Position parameter cheat sheet:**
| Syntax | Meaning |
|--------|---------|
| `3` | Absolute: 3 seconds from start |
| `"+=0.5"` | 0.5s after end of timeline |
| `"-=0.3"` | Overlap by 0.3s |
| `"<"` | Same start as previous animation |
| `">"` | After previous animation ends |
| `"<0.2"` | 0.2s after previous animation starts |
| `">-0.1"` | 0.1s before previous animation ends |
| `"myLabel"` | At label position |
| `"myLabel+=1"` | 1s after label |

---

## Easing

**This project's 3-curve system:**

| Role | CSS token | GSAP string |
|------|-----------|-------------|
| Settling, reveals, hovers | `--ease-out` | `'power2.out'` |
| Sustained movement, scroll | `--ease-in-out` | `'power1.inOut'` |
| Soft overshoot landing | `--ease-bounce` | `'back.out(1.4)'` |

**All available eases:** `none`, `power1-4`, `back`, `bounce`, `circ`, `elastic`, `expo`, `sine`, `steps`

**Custom eases available:** CustomEase, CustomBounce, CustomWiggle, RoughEase, SlowMo, ExpoScaleEase, SteppedEase

**Rule of thumb:** `ease: 'power1.inOut'` for most things. `.out` eases for UI responses. Never `linear` unless continuous rotation.

---

## Staggers

```js
// Simple: 0.1s between each element
gsap.to('.items', { y: 0, stagger: 0.1 })

// Advanced: from center outward
gsap.to('.items', { y: 0, stagger: { each: 0.1, from: 'center' } })

// Grid-aware (card layouts)
gsap.to('.cards', { scale: 1, stagger: { each: 0.08, grid: 'auto', from: 'center' } })

// Custom distribution
gsap.to('.items', { y: 0, stagger: { amount: 0.8, ease: 'power2.inOut' } })
```

---

## Common Mistakes to Avoid

1. **Never mix CSS transitions with GSAP** on the same element
2. **Never set transforms in CSS** on GSAP-animated elements — use `gsap.set()`
3. **Use `xPercent`/`yPercent`** not `x: '-50%'`
4. **Don't recreate animations in handlers** — build paused, use control methods
5. **Use `gsap.utils.toArray()`** for multi-element selection
6. **Don't use `useEffect`** — use `useGSAP`
7. **Register all plugins** at module scope to prevent tree-shaking

---

## Available Plugins (all free, all installed)

| Plugin | Use for |
|--------|---------|
| SplitText | Text splitting + reveals |
| DrawSVG | Stroke animation |
| MorphSVG | Shape morphing |
| MotionPath | Path following |
| Flip | Layout state transitions |
| ScrollTrigger | Scroll-driven animation |
| ScrollSmoother | Smooth scrolling |
| ScrollTo | Programmatic scroll |
| Observer | Unified input events |
| Draggable | Drag interactions |
| Inertia | Momentum physics |
| ScrambleText | Text decoding effect |
| TextPlugin | Character replacement |
| Physics2D | 2D physics simulation |
| CustomEase | Custom easing curves |
| GSDevTools | Visual timeline debug |

---

## ScrollSmoother Setup

Requires specific HTML wrapper structure:
```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- ALL content here -->
  </div>
</div>
<!-- position: fixed elements OUTSIDE wrapper (nav, modals) -->
```

```js
import { ScrollSmoother } from 'gsap/ScrollSmoother'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

ScrollSmoother.create({
  smooth: 1,            // seconds to catch up (0.8 default)
  effects: true,        // enables data-speed and data-lag attributes
  normalizeScroll: true, // prevents address bar shifts on mobile
})
```

**Parallax via data attributes:**
```html
<div data-speed="0.5">slower</div>    <!-- half speed -->
<div data-speed="2">faster</div>      <!-- double speed -->
<div data-lag="0.5">lazy</div>        <!-- 0.5s lag -->
<div data-speed="clamp(0.5)">safe</div> <!-- clamped to viewport -->
```

**Warning:** `position: fixed` elements inside the wrapper become fixed to content, not viewport. Place nav/modals outside.

---

## Responsive Animations: matchMedia

```js
const mm = gsap.matchMedia()

mm.add({
  isDesktop: '(min-width: 901px)',
  isTablet: '(max-width: 900px)',
  isMobile: '(max-width: 600px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions

  gsap.to('.box', {
    x: isDesktop ? 200 : 50,
    duration: reduceMotion ? 0 : 1,
  })

  // Automatically reverts when conditions change
})
```

---

## Reusable Effects: registerEffect

```js
gsap.registerEffect({
  name: 'fadeUp',
  effect: (targets, config) => {
    return gsap.from(targets, {
      y: config.y,
      autoAlpha: 0,
      duration: config.duration,
      stagger: config.stagger,
    })
  },
  defaults: { y: 30, duration: 0.6, stagger: 0.1 },
  extendTimeline: true,  // adds as timeline method
})

// Usage
gsap.effects.fadeUp('.cards')
// Or in timeline
tl.fadeUp('.cards', { y: 50 })
```

---

## Performance: quickTo & quickSetter

For high-frequency updates (mousemove, scroll-driven values):

```js
// quickTo — creates reusable tween for one property
const xTo = gsap.quickTo('.cursor', 'x', { duration: 0.3, ease: 'power2.out' })
const yTo = gsap.quickTo('.cursor', 'y', { duration: 0.3, ease: 'power2.out' })

document.addEventListener('mousemove', (e) => {
  xTo(e.clientX)
  yTo(e.clientY)
})

// quickSetter — instant set, no animation (50-250% faster than gsap.set)
const setX = gsap.quickSetter('.element', 'x', 'px')
const setRotation = gsap.quickSetter('.element', 'rotation', 'deg')
```

---

## ScrollTrigger.batch — Batched Reveals

For revealing multiple elements as they scroll into view (cards, grid items):

```js
ScrollTrigger.batch('.card', {
  onEnter: (elements) => {
    gsap.to(elements, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,
      ease: 'power1.inOut',
    })
  },
  start: 'top 85%',
})
```

---

## Organic Easing: RoughEase

For hand-drawn, organic feeling motion (matches our natural material aesthetic):

```js
import { EasePack } from 'gsap/EasePack'
gsap.registerPlugin(EasePack)

gsap.to('.element', {
  x: 100,
  ease: 'rough({ strength: 1.5, points: 20, taper: "out" })',
})
```

---

## ScrollTrigger Mistakes to Avoid

1. **Never nest ScrollTriggers inside timeline tweens** — use one ScrollTrigger on the parent timeline
2. **Loop through elements** for individual triggers — don't apply one trigger to multiple sections
3. **Use function-based start/end values** for responsive measurements: `end: () => "+=" + el.offsetHeight`
4. **Call `ScrollTrigger.refresh()`** after dynamically loaded content
5. **Create ScrollTriggers in scroll order** (top to bottom) when pinning
6. **Set `immediateRender: false`** when multiple tweens target the same property

---

## Utility Methods (most useful)

```js
// Convert anything to array
const boxes = gsap.utils.toArray('.box')

// Map one range to another
const mapProgress = gsap.utils.mapRange(0, 500, 0, 1)

// Clamp values
const clampedValue = gsap.utils.clamp(0, 100, rawValue)

// Snap to nearest increment or array value
const snapped = gsap.utils.snap(50, value)        // nearest 50
const snapped = gsap.utils.snap([0, 25, 75, 100], value) // nearest in array

// Pipe multiple utils together
const transform = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.snap(5),
  gsap.utils.mapRange(0, 100, -1, 1)
)

// Random value
const r = gsap.utils.random(0, 100)              // number
const r = gsap.utils.random([1, 5, 10, 20])       // from array
const randomFunc = gsap.utils.random(0, 100, true) // reusable function
```

---

## CSS Properties Quick Reference

**GPU-accelerated (prefer these):** `x`, `y`, `z`, `rotation`, `scale`, `scaleX`, `scaleY`, `skewX`, `skewY`, `autoAlpha`

**Use percentage versions:** `xPercent`, `yPercent` (not `x: '-50%'`)

**Special:** `autoAlpha` (opacity + visibility), `clearProps` (remove inline styles), `force3D` (GPU promotion, auto by default)

**Naming:** CSS hyphenated names → camelCase (`background-color` → `backgroundColor`)

---

## Accessible Animation with GSAP

All GSAP animation in this project must degrade gracefully under `prefers-reduced-motion: reduce`. This section covers the GSAP-specific implementation.

### gsap.matchMedia() for Reduced Motion

This is the primary tool. It handles setup and automatic cleanup when conditions change:

```js
const mm = gsap.matchMedia()

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Full animation: transforms, staggers, scroll-driven motion
  gsap.from('.element', {
    y: 30, autoAlpha: 0, duration: 0.8, ease: 'power1.inOut'
  })
})

mm.add('(prefers-reduced-motion: reduce)', () => {
  // Safe alternative: opacity only, or instant reveal
  gsap.set('.element', { autoAlpha: 1 })
})
```

**Combined with other conditions:**
```js
mm.add({
  isDesktop: '(min-width: 901px)',
  isMobile: '(max-width: 600px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions

  if (reduceMotion) {
    gsap.set('.element', { autoAlpha: 1 })
    return  // skip all motion
  }

  gsap.from('.element', {
    y: isDesktop ? 30 : 15,
    autoAlpha: 0,
    duration: 0.8,
  })
})
```

### FOUC Prevention + Reduced Motion

The standard FOUC pattern (`visibility: hidden` in CSS, `autoAlpha: 1` in GSAP) creates invisible content if GSAP never runs. Under reduced motion, you must still reveal content:

```css
.gsap-hidden { visibility: hidden; }

@media (prefers-reduced-motion: reduce) {
  .gsap-hidden { visibility: visible; }
}
```

Or handle it in GSAP's matchMedia:
```js
mm.add('(prefers-reduced-motion: reduce)', () => {
  gsap.set('.gsap-hidden', { autoAlpha: 1 })
})
```

### SplitText Accessibility

**Built-in ARIA (v3.13.0+):** SplitText auto-adds `aria-label` to the parent element and `aria-hidden="true"` to all split children. Screen readers announce the full text, not individual letters/words.

```html
<!-- After SplitText.create('.heading', { type: 'chars' }) -->
<h2 aria-label="Groundswell">
  <div aria-hidden="true">G</div>
  <div aria-hidden="true">r</div>
  <div aria-hidden="true">o</div>
  <!-- ... -->
</h2>
```

**Nested interactive content:** If the text contains links, `<em>`, `<strong>`, or other semantic elements, the auto-ARIA breaks them for screen readers. Use `aria: false` and provide a screenreader-only duplicate:

```jsx
{/* Visible: animated split text */}
<p className="split-target">Read about <a href="/groundswell">Groundswell</a></p>

{/* Accessible: hidden duplicate with working links */}
<p className="visually-hidden">Read about <a href="/groundswell">Groundswell</a></p>
```

```js
SplitText.create('.split-target', {
  type: 'chars',
  mask: 'chars',
  aria: false,  // disable auto-ARIA since we have a duplicate
})
```

### ScrollTrigger and Screen Readers

ScrollTrigger animations reveal content visually but screen readers read the DOM in source order regardless of scroll position. Considerations:

- Content hidden with `autoAlpha: 0` for scroll reveals is invisible to screen readers until GSAP sets it visible. Under reduced motion, ensure all content starts visible.
- Don't use ScrollTrigger to reorder or move content. DOM order must match logical reading order.
- For significant content that appears on scroll (not just decorative motion), consider an `aria-live="polite"` container so screen readers are notified.

### Reduction vs. Removal Decision Guide

| Animation type | Reduced motion behavior |
|---------------|------------------------|
| Hero text reveal (SplitText) | Show instantly, no stagger |
| Scroll-triggered fade-up | Show all content visible, no animation |
| Parallax / data-speed | Remove. Static positioning. |
| Hover micro-interaction | Keep if opacity/color only. Remove if transform-based. |
| Page transition | Instant crossfade or no transition |
| Loading spinner / progress | Keep. Functional animation is exempt. |
| Continuous background motion | Remove entirely |
| Scale-in (images, cards) | Show at full scale, no animation |

### UI Animation Toggle

Beyond system `prefers-reduced-motion`, consider providing a site-level toggle for users who want reduced motion only on your site:

```js
// Custom toggle feeds into matchMedia conditions
mm.add({
  systemReduced: '(prefers-reduced-motion: reduce)',
  userReduced: '(prefers-reduced-motion: reduce)', // replace with custom class check
}, (context) => {
  // Responds to either system or user preference
})
```

For this project, the site-wide toggle is TBD. System preference support is required immediately.

---

*This file is project-specific. Update it when patterns change or new conventions are established.*
