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

*This file is project-specific. Update it when patterns change or new conventions are established.*
