'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import ShapeMark from '@/components/marks/ShapeMark'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import { useHeroIntro } from '@/components/HeroIntroContext'
import styles from './HeroScatter.module.css'

gsap.registerPlugin(useGSAP)

const LIGHT_GRADIENT = ['#8A9263', '#9F84A9', '#C97D64']
const DARK_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* Per-character kerning from original Figma spec */
const KERN_D = { 0: -1.12, 3: -1.12, 4: 2.24, 5: 2.24, 6: 1.12 }
const KERN_C = { 0: 1.12, 1: -2.24, 2: 2.24, 3: -2.24, 6: 1.12, 7: -2.24, 8: -2.24 }

/*
 * Scatter: golden angle spiral distribution.
 * Places 22 elements (all chars + marks) using the golden angle (~137.5°)
 * at increasing radius from center. This creates a natural, sunflower-like
 * distribution with no visible grid, no columns, and guaranteed spacing.
 *
 * Then we assign specific elements to specific positions, interleaving
 * D (white) and C (gradient) chars so colors alternate spatially.
 */
function generateScatterPositions(count) {
  const goldenAngle = 137.508 * (Math.PI / 180)
  const positions = []
  /* Adjust spread based on viewport aspect ratio */
  const isNarrow = typeof window !== 'undefined' && window.innerWidth < 700
  const spreadX = isNarrow ? 38 : 42
  const spreadY = isNarrow ? 36 : 40
  for (let i = 0; i < count; i++) {
    const angle = i * goldenAngle
    const r = Math.sqrt((i + 0.5) / count)
    const x = 50 + r * spreadX * Math.cos(angle)
    const y = 50 + r * spreadY * Math.sin(angle)
    /* Clamp to 6-94% to keep chars fully visible */
    positions.push([
      Math.round(Math.max(6, Math.min(94, x)) * 10) / 10,
      Math.round(Math.max(6, Math.min(94, y)) * 10) / 10,
    ])
  }
  return positions
}

/* Generate 23 positions, skip index 0 (too close to center flower) */
const RAW_POSITIONS = generateScatterPositions(23)
const ALL_POSITIONS = RAW_POSITIONS.slice(1)

/* Interleave: D, C, D, C, mark, D, C, D, C, mark, D, C, D, C, D, C, D, C, D, C, D, mark */
/* Pick positions that spread D and C chars across the spiral */
/* Interleave D and C chars across the spiral for color balance.
   All positions are safely away from center (index 0 was removed). */
const D_SCATTER = [
  ALL_POSITIONS[0],   // D
  ALL_POSITIONS[2],   // e
  ALL_POSITIONS[4],   // s
  ALL_POSITIONS[6],   // i
  ALL_POSITIONS[8],   // g
  ALL_POSITIONS[10],  // n
  ALL_POSITIONS[13],  // i
  ALL_POSITIONS[15],  // n
  ALL_POSITIONS[17],  // g
]
const C_SCATTER = [
  ALL_POSITIONS[1],   // C
  ALL_POSITIONS[3],   // o
  ALL_POSITIONS[5],   // n
  ALL_POSITIONS[7],   // n
  ALL_POSITIONS[9],   // e
  ALL_POSITIONS[12],  // c
  ALL_POSITIONS[14],  // t
  ALL_POSITIONS[16],  // i
  ALL_POSITIONS[18],  // o
  ALL_POSITIONS[19],  // n
]
const MARK_SCATTER = {
  sense: ALL_POSITIONS[11],
  weave: ALL_POSITIONS[20],
}

/*
 * OFFSCREEN starting positions — where letters come from before scatter.
 * Each letter enters from a different edge for visual variety.
 * Values are % offsets: negative = off left/top, >100 = off right/bottom.
 */
/* Compute offscreen position: push each element beyond its nearest edge */
function toOffscreen(pos) {
  const [x, y] = pos
  const distLeft = x, distRight = 100 - x, distTop = y, distBottom = 100 - y
  const min = Math.min(distLeft, distRight, distTop, distBottom)
  if (min === distLeft) return [-18, y]
  if (min === distRight) return [118, y]
  if (min === distTop) return [x, -18]
  return [x, 118]
}

const D_OFFSCREEN = D_SCATTER.map(toOffscreen)
const C_OFFSCREEN = C_SCATTER.map(toOffscreen)
const MARK_OFFSCREEN = {
  sense: toOffscreen(MARK_SCATTER.sense),
  weave: toOffscreen(MARK_SCATTER.weave),
}

/* PEEK: a few letters start cropped at their nearest edge instead of fully
   offscreen. Acts as a wordless "more below" affordance during Welcome,
   then continues onto the existing scatter trajectory when scroll begins. */
function toPeek(pos) {
  const [x, y] = pos
  const distLeft = x, distRight = 100 - x, distTop = y, distBottom = 100 - y
  const min = Math.min(distLeft, distRight, distTop, distBottom)
  if (min === distLeft) return [8, y]
  if (min === distRight) return [92, y]
  if (min === distTop) return [x, 8]
  return [x, 92]
}
/* Slide-in direction in pixels — letter starts pushed further toward
   its nearest edge, then slides back to its peek resting position. */
function peekSlideOffset(pos) {
  const [x, y] = pos
  const distLeft = x, distRight = 100 - x, distTop = y, distBottom = 100 - y
  const min = Math.min(distLeft, distRight, distTop, distBottom)
  if (min === distLeft) return { x: -80, y: 0 }
  if (min === distRight) return { x: 80, y: 0 }
  if (min === distTop) return { x: 0, y: -80 }
  return { x: 0, y: 80 }
}
const D_PEEK = new Set([0, 1, 2])  /* D, e, s */
const C_PEEK = new Set([0])        /* C */

export default function HeroScatter() {
  const heroRef = useRef(null)
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const flowerRef = useRef(null)
  const arrowRef = useRef(null)
  const welcomeTextRef = useRef(null)
  const scrollHintRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const dRefs = useRef([])
  const cRefs = useRef([])
  const senseRef = useRef(null)
  const weaveRef = useRef(null)
  const measureRef = useRef(null)

  const [senseReplay, setSenseReplay] = useState(0)
  const [weaveReplay, setWeaveReplay] = useState(0)
  const flowerHoverable = useRef(false)
  const introDone = useRef(false)

  /* Mark intro as played so future visits in the same session skip
     straight to the static homepage. The provider already gates the
     intro by reading sessionStorage on mount, so firing this any time
     after the hero is on screen is safe — the flag is only consulted
     on the *next* mount. */
  const { markDone } = useHeroIntro()
  useEffect(() => {
    const t = setTimeout(markDone, 1500)
    return () => clearTimeout(t)
  }, [markDone])

  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const root = document.documentElement
    const check = () => setIsDark(root.dataset.theme === 'dark')
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  /* Hover handlers — each element type responds differently */
  const { contextSafe } = useGSAP({ scope: heroRef })

  const hoverDesigning = contextSafe((el) => {
    /* Check if scale is already animating (not left/top from scrub) */
    if (el._hoverActive) return
    el._hoverActive = true
    gsap.to(el, { scale: 1.2, duration: 0.2, ease: 'power1.out',
      onComplete: () => gsap.to(el, { scale: 1, duration: 0.4, ease: 'power1.inOut',
        onComplete: () => { el._hoverActive = false },
      }),
    })
  })

  const hoverConnection = contextSafe((el) => {
    if (el._hoverActive) return
    el._hoverActive = true
    gsap.to(el, { rotation: '+=12', duration: 0.25, ease: 'power1.out',
      onComplete: () => gsap.to(el, { rotation: '-=12', duration: 0.4, ease: 'power1.inOut',
        onComplete: () => { el._hoverActive = false },
      }),
    })
  })


  useGSAP(() => {
    const section = sectionRef.current
    const flower = flowerRef.current
    if (!section || !flower) return

    const dChars = dRefs.current.filter(Boolean)
    const cChars = cRefs.current.filter(Boolean)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(flower, { display: 'none' })
      gsap.set(measureRef.current, { autoAlpha: 1 })
      return
    }

    document.body.classList.add('hero-loading')
    window.scrollTo(0, 0)

    /* ─── INITIAL STATE: everything offscreen, flower centered ─── */
    const flowerSize = Math.min(Math.max(window.innerWidth * 0.22, 160), 280)
    gsap.set(flower, {
      left: '50%', top: '50%', xPercent: -50, yPercent: -50,
      width: flowerSize, height: flowerSize, autoAlpha: 1,
    })

    /* Place elements at their starting positions.
       Non-PEEK letters: full OFFSCREEN, autoAlpha:1 (invisible past edge).
       PEEK letters: at PEEK position (so the timeline captures peek as their
       "from"), but pushed further out via x/y offset and hidden via autoAlpha:0
       — they slide in + fade in when Welcome appears. */
    const peekEls = []
    dChars.forEach((el, i) => {
      if (D_PEEK.has(i)) {
        const peek = toPeek(D_SCATTER[i])
        const off = peekSlideOffset(D_SCATTER[i])
        gsap.set(el, { left: peek[0] + '%', top: peek[1] + '%', xPercent: -50, yPercent: -50, x: off.x, y: off.y, autoAlpha: 0 })
        peekEls.push(el)
      } else {
        gsap.set(el, { left: D_OFFSCREEN[i][0] + '%', top: D_OFFSCREEN[i][1] + '%', autoAlpha: 1 })
      }
    })
    cChars.forEach((el, i) => {
      if (C_PEEK.has(i)) {
        const peek = toPeek(C_SCATTER[i])
        const off = peekSlideOffset(C_SCATTER[i])
        gsap.set(el, { left: peek[0] + '%', top: peek[1] + '%', xPercent: -50, yPercent: -50, x: off.x, y: off.y, autoAlpha: 0 })
        peekEls.push(el)
      } else {
        gsap.set(el, { left: C_OFFSCREEN[i][0] + '%', top: C_OFFSCREEN[i][1] + '%', autoAlpha: 1 })
      }
    })
    if (senseRef.current) gsap.set(senseRef.current, { left: MARK_OFFSCREEN.sense[0] + '%', top: MARK_OFFSCREEN.sense[1] + '%', autoAlpha: 1 })
    if (weaveRef.current) gsap.set(weaveRef.current, { left: MARK_OFFSCREEN.weave[0] + '%', top: MARK_OFFSCREEN.weave[1] + '%', autoAlpha: 1 })

    gsap.set(subtitleRef.current, { autoAlpha: 0 })
    gsap.set(ctaRef.current, { autoAlpha: 0 })
    gsap.set(arrowRef.current, { autoAlpha: 1, xPercent: -50 })
    /* Both texts visible at element-level; per-char masking handles the swap.
       SplitText needs the elements rendered with their final font metrics
       before splitting, so we split here (after fonts loaded via opener)
       and stash the splits on the refs for the timeline to drive. */
    gsap.set(welcomeTextRef.current, { autoAlpha: 1 })
    gsap.set(scrollHintRef.current, { autoAlpha: 0.75 })
    const welcomeSplit = SplitText.create(welcomeTextRef.current, {
      type: 'chars', mask: 'chars', charsClass: 'wChar',
    })
    const hintSplit = SplitText.create(scrollHintRef.current, {
      /* words,chars so the words are separate elements; mask:'chars' clips
         each char for the wipe. The space between words still collapses under
         the mask, so the gap is restored explicitly via .hWord margin in CSS. */
      type: 'words,chars', mask: 'chars', charsClass: 'hChar', wordsClass: 'hWord',
    })
    /* Welcome chars start in place (visible). Hint chars start lifted out
       of their mask (below the mask box), so they wipe up into view. */
    gsap.set(welcomeSplit.chars, { yPercent: 0 })
    gsap.set(hintSplit.chars, { yPercent: 110 })
    gsap.set(measureRef.current, { autoAlpha: 0 })

    /* ─── A fresh welcome (cold-start) ───
       A self-contained entrance, NOT a fragment of the old opener. One
       gentle, intentional gesture: the flower blooms in on a soft bounce —
       the hello — then the Welcome cue rises beneath it, then the peek
       letters drift home from beyond the frame, a quiet preview of the
       scatter the scroll will continue. Each element owns its own clean
       fade (no whole-section opacity hack — that's what made it read as a
       glitch). Nothing is locked: scroll is live, and a first scroll snaps
       the entrance to its composed end so the scrub never inherits a
       half-bloomed flower. */

    /* `intro` is read by the scroll timeline's onUpdate (to snap it done on
       a first scroll), so it must exist before the trigger is built. */
    let intro
    buildScrollTimeline()
    ScrollTrigger.normalizeScroll(true)
    ScrollTrigger.refresh()

    intro = gsap.timeline({
      onComplete: () => {
        introDone.current = true
        document.body.classList.remove('hero-loading')
        /* Arm hover-spin only AFTER the one-time load spin finishes, so the
           two can never overlap. */
        flowerHoverable.current = true
      },
    })
    intro
      /* First the flower grows into place — gentle overshoot, the hello. */
      .fromTo(
        flower,
        { autoAlpha: 0, scale: 0.72 },
        { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'back.out(1.3)' },
        0
      )
      /* …THEN, once it has settled, a single slow spin (starts as the grow
         finishes). After the entrance the flower spins solely on hover
         (gated by flowerHoverable above). */
      .fromTo(
        flower,
        { rotation: 0 },
        { rotation: 360, duration: 1.2, ease: 'power2.inOut' },
        0.85
      )
      /* …and a little bounce to land — the invitational pulse, just as the
         spin settles (spin ends ~2.05s). */
      .to(flower, { scale: 1.15, duration: 0.22, ease: 'power2.out' }, 2.0)
      .to(flower, { scale: 1, duration: 0.32, ease: 'power1.inOut' }, 2.22)
      /* Welcome + arrow rise softly beneath it. */
      .fromTo(
        arrowRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        0.4
      )
      /* Peek letters drift in from off-frame, arriving last and gently so it
         reads as composed, not snapped. */
      .to(
        peekEls,
        { x: 0, y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
        0.55
      )

    function buildScrollTimeline() {
      /* ─── MEASURE final positions with kerning ─── */
      gsap.set(measureRef.current, { autoAlpha: 1 })

      /* Apply kerning to measurement chars */
      const mDChars = measureRef.current.querySelectorAll('[data-d]')
      const mCChars = measureRef.current.querySelectorAll('[data-c]')
      Object.entries(KERN_D).forEach(([i, px]) => {
        if (mDChars[i]) mDChars[i].style.marginRight = `${px}px`
      })
      Object.entries(KERN_C).forEach(([i, px]) => {
        if (mCChars[i]) mCChars[i].style.marginRight = `${px}px`
      })

      const sRect = section.getBoundingClientRect()
      const toPos = (r) => ({
        left: ((r.left + r.width / 2 - sRect.left) / sRect.width) * 100,
        top: ((r.top + r.height / 2 - sRect.top) / sRect.height) * 100,
        w: r.width, h: r.height,
      })

      const dFinals = Array.from(mDChars).map(el => toPos(el.getBoundingClientRect()))
      const cFinals = Array.from(mCChars).map(el => toPos(el.getBoundingClientRect()))
      const mFinals = Array.from(measureRef.current.querySelectorAll('[data-mark]')).map(el => toPos(el.getBoundingClientRect()))
      const subEl = measureRef.current.querySelector('[data-sub]')
      const subFinal = subEl ? toPos(subEl.getBoundingClientRect()) : null

      gsap.set(measureRef.current, { autoAlpha: 0 })

      if (subFinal) gsap.set(subtitleRef.current, { left: subFinal.left + '%', top: subFinal.top + '%' })

      /* ─── MASTER SCROLL TIMELINE ─── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          /* Pin length = how much you scroll to form the hero. 500% was too
             much, 160% felt too fast; ~300% is the middle. With scrub the
             sentence forms WITH the scroll, so you can never pass it before
             it's done and scrolling up rewinds it. This is the main pace dial. */
          end: '+=300%',
          pin: sectionRef.current,
          /* On mobile (touch + iOS Safari address-bar show/hide),
             transform-based pins drift and the section scrolls past
             into glitchy/layered states. position:fixed escapes that
             entirely. Desktop keeps transform — it's smoother there
             and avoids creating a containing block. */
          pinType: window.matchMedia('(max-width: 768px)').matches ? 'fixed' : 'transform',
          /* Higher scrub = more smoothing: the timeline keeps catching up
             for ~1s after you stop, so fast and slow scrolls both play out
             more evenly. Raise toward 1.5 for a more uniform pace. */
          scrub: 1,
          /* Welcome → Keep Scrolling crossfade is built into the timeline below
             (search "WELCOME → KEEP SCROLLING SWAP"), so progress drives the swap
             and the hint persists through scatter, fading as gather begins.

             onUpdate: when scrub is below the welcome exit tween's start
             position (0.06), force the welcome group back to its initial
             pose. Plain `tl.to` only renders within its own time range, so
             scrubbing back below the tween otherwise leaves the element
             stuck at the TO state (autoAlpha:0). Putting an anchor tween
             at position 0 of the timeline would fire at build time and
             show welcome during the flower opener — this callback avoids
             both pitfalls. */
          onUpdate: (self) => {
            /* First real scroll during the entrance: snap it to its composed
               end so the scrub takes over a finished frame, never a
               half-bloomed flower. */
            if (self.progress > 0 && !introDone.current) {
              introDone.current = true
              if (intro) intro.progress(1)
            }
            /* Restore the welcome cue if scrubbed back to the very top after
               the entrance has finished. */
            if (introDone.current && self.progress < 0.05 && arrowRef.current) {
              gsap.set(arrowRef.current, { y: 0, autoAlpha: 1 })
            }
          },
        },
      })

      /* ── WELCOME → KEEP SCROLLING SWAP ──
           Per-character clip-mask swap (SplitText with mask: 'chars'):
           Welcome chars wipe up out of their masks while KEEP SCROLLING
           chars wipe up into theirs from below, slightly staggered.
           Reads as a coordinated split-flap — a single magic gesture,
           not two competing animations.

           Dismiss is a typewriter back-step: KEEP SCROLLING chars retract
           right-to-left (last char first), each lifting and clipping out
           of its mask. Arrow holds, then fades only after the last char
           is gone, so the message visibly finishes retracting. */

      /* Welcome chars wipe up out (left-to-right stagger) */
      tl.to(welcomeSplit.chars, {
        yPercent: -110,
        duration: 0.02,
        ease: 'power1.inOut',
        stagger: { each: 0.002, from: 'start' },
      }, 0)

      /* KEEP SCROLLING chars wipe up into place (left-to-right stagger,
         starting just after Welcome begins exiting so they overlap) */
      tl.to(hintSplit.chars, {
        yPercent: 0,
        duration: 0.025,
        ease: 'power1.inOut',
        stagger: { each: 0.002, from: 'start' },
      }, 0.008)

      /* Hold KEEP SCROLLING briefly, then a long, scrub-tied dissolve:
         the whole group drifts down ~12px and fades over a wide swath of
         the timeline (0.06 → 0.30, ~24% of total scroll). Stretching the
         tween ensures each scroll tick maps to a small alpha delta, which
         is what makes scrub feel like scrub instead of a trigger.

         fromTo with immediateRender:false is required so that scrubbing
         BACK below the tween start (e.g. user scrolls back to top after
         the hero exit) restores autoAlpha:1 + y:0. With a plain `to`,
         autoAlpha gets stuck at 0 / visibility:hidden when scrubbed
         below the start — `to` only renders within its time range. */
      /* Long, scrub-tied dissolve via the timeline. */
      tl.to(arrowRef.current, {
        y: 12,
        autoAlpha: 0,
        duration: 0.24,
        ease: 'sine.inOut',
      }, 0.06)

      /* ── 0–68%: ONE CONTINUOUS SWEEP — offscreen → through the scatter
           cluster → into the kerned sentence, as a single gesture.

           Each element runs ONE keyframed tween (not a drag-in tween that
           settles, then a separate gather tween that re-eases in). The
           scatter position is a *pass-through* waypoint, never a rest:
             • phase 1 `power2.in`  — accelerates INTO the cluster, so the
               letters are at peak velocity exactly as they reach it;
             • phase 2 `power2.out` — leaves immediately and decelerates
               only as it settles into the final position.
           Peak speed sits at the junction, so there is no velocity-zero at
           the midpoint — the cluster reads as the fastest moment, not a
           landing the user has to re-initiate scroll to escape. One tween
           per property also means the two phases can't fight mid-scrub
           (the old overlapping drag-in/gather pair did, which is why timing
           tweaks alone never removed the felt stop). "Keep Scrolling" now
           cues a single continuous build. ── */
      const SWEEP_IN = 0.30   /* offscreen → cluster */
      const SWEEP_OUT = 0.34  /* cluster → sentence */

      /* Flower is the centre anchor: it shrinks in place through phase 1,
         then darts to its mark slot in phase 2. Same easing handoff so the
         shrink flows straight into the move with no settle between. */
      tl.to(flower, {
        keyframes: [
          { width: 70, height: 70, duration: SWEEP_IN, ease: 'power2.in' },
          mFinals[2]
            ? {
                left: mFinals[2].left + '%', top: mFinals[2].top + '%',
                width: mFinals[2].w, height: mFinals[2].h,
                duration: SWEEP_OUT, ease: 'power2.out',
              }
            : { duration: SWEEP_OUT },
        ],
      }, 0)

      dChars.forEach((el, i) => {
        if (!dFinals[i]) return
        tl.to(el, {
          keyframes: [
            { left: D_SCATTER[i][0] + '%', top: D_SCATTER[i][1] + '%', duration: SWEEP_IN, ease: 'power2.in' },
            { left: dFinals[i].left + '%', top: dFinals[i].top + '%', duration: SWEEP_OUT, ease: 'power2.out' },
          ],
        }, i * 0.005)
      })

      cChars.forEach((el, i) => {
        if (!cFinals[i]) return
        tl.to(el, {
          keyframes: [
            { left: C_SCATTER[i][0] + '%', top: C_SCATTER[i][1] + '%', duration: SWEEP_IN, ease: 'power2.in' },
            { left: cFinals[i].left + '%', top: cFinals[i].top + '%', duration: SWEEP_OUT, ease: 'power2.out' },
          ],
        }, 0.02 + i * 0.005)
      })

      if (senseRef.current && mFinals[0]) {
        tl.to(senseRef.current, {
          keyframes: [
            { left: MARK_SCATTER.sense[0] + '%', top: MARK_SCATTER.sense[1] + '%', duration: SWEEP_IN, ease: 'power2.in' },
            { left: mFinals[0].left + '%', top: mFinals[0].top + '%', width: mFinals[0].w, height: mFinals[0].h, duration: SWEEP_OUT, ease: 'power2.out' },
          ],
        }, 0.02)
      }
      if (weaveRef.current && mFinals[1]) {
        tl.to(weaveRef.current, {
          keyframes: [
            { left: MARK_SCATTER.weave[0] + '%', top: MARK_SCATTER.weave[1] + '%', duration: SWEEP_IN, ease: 'power2.in' },
            { left: mFinals[1].left + '%', top: mFinals[1].top + '%', width: mFinals[1].w, height: mFinals[1].h, duration: SWEEP_OUT, ease: 'power2.out' },
          ],
        }, 0.03)
      }

      /* ── 60–70%: Subtitle fades in (just after gather completes ~0.68) ── */
      tl.to(subtitleRef.current, {
        autoAlpha: 1, duration: 0.10, ease: 'power1.inOut',
      }, 0.60)

      /* ── 68–78%: "View Work" CTA + nav appear ── */
      tl.to(ctaRef.current, {
        autoAlpha: 1, duration: 0.10, ease: 'power1.inOut',
      }, 0.68)

      const header = document.querySelector('header')
      if (header) {
        tl.to(header, {
          autoAlpha: 1, pointerEvents: 'auto',
          duration: 0.10, ease: 'power1.inOut',
        }, 0.68)
      }

      /* ── 78–100%: Hold — let the composed state breathe ── */

      return tl.scrollTrigger
    }

    return () => {
      document.body.classList.remove('hero-loading')
      document.body.style.overflow = ''
      /* Revert the splits so a remount (React Strict Mode double-invokes
         effects in dev) re-splits clean text instead of an already-split
         DOM — otherwise "Welcome" splits twice and renders doubled. */
      welcomeSplit?.revert()
      hintSplit?.revert()
    }
  }, { scope: heroRef })

  return (
    <div ref={heroRef}>
      <div ref={wrapperRef}>
        <section ref={sectionRef} className={styles.hero} aria-label="Introduction">

          <div ref={flowerRef} className={styles.flower}
            onMouseEnter={() => {
              if (!flowerHoverable.current) return
              const el = flowerRef.current
              if (!el || el._hoverActive) return
              el._hoverActive = true
              gsap.to(el, { rotation: '+=360', duration: 0.8, ease: 'power1.inOut',
                onComplete: () => { el._hoverActive = false },
              })
            }}>
            <ShapeMark complete showBrush
              gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
          </div>

          {'Designing'.split('').map((c, i) => (
            <div key={`d${i}`} ref={el => { dRefs.current[i] = el }}
              className={styles.scatterChar}
              onMouseEnter={(e) => hoverDesigning(e.currentTarget)}>{c}</div>
          ))}

          {'Connection'.split('').map((c, i) => (
            <div key={`c${i}`} ref={el => { cRefs.current[i] = el }}
              className={`${styles.scatterChar} ${styles.gradient}`}
              onMouseEnter={(e) => hoverConnection(e.currentTarget)}>{c}</div>
          ))}

          <div ref={senseRef} className={styles.mark}
            onMouseEnter={() => setSenseReplay(r => r + 1)}>
            <SenseMark animate showBrush replay={senseReplay} gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
          </div>
          <div ref={weaveRef} className={styles.mark}
            onMouseEnter={() => setWeaveReplay(r => r + 1)}>
            <WeaveMark animate showBrush replay={weaveReplay} gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
          </div>

          <p ref={subtitleRef} className={styles.subtitle}>
            Emotion-Centered Research, Strategy{' '}
            <span style={{ fontStyle: 'normal', fontWeight: 333, fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 72" }}>&amp;</span> Design
          </p>

          <a ref={ctaRef} href="#work" className={styles.cta}>
            View Work
            <svg viewBox="0 0 20 24" fill="none" className={styles.ctaArrow} aria-hidden="true">
              <path d="M10 2v18M5 14l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div ref={arrowRef} className={styles.welcomeGroup}>
            <div className={styles.welcomeSwap}>
              <p ref={welcomeTextRef} className={styles.welcomeText}>Welcome</p>
              <p ref={scrollHintRef} className={styles.scrollHint}>Keep Scrolling</p>
            </div>
            <svg className={styles.arrow} viewBox="0 0 20 24" fill="none" aria-hidden="true">
              <path d="M10 2v18M5 14l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div ref={measureRef} className={styles.measureLayer} aria-hidden="true">
            <div className={styles.measureMarks}>
              <div className={styles.measureMarkIcon} data-mark />
              <div className={styles.measureMarkIconWeave} data-mark />
              <div className={styles.measureMarkIcon} data-mark />
            </div>
            <div className={styles.measureTitle}>
              {'Designing'.split('').map((c, i) => (
                <span key={i} data-d className={styles.measureChar}>{c}</span>
              ))}
            </div>
            <div className={styles.measureTitle}>
              {'Connection'.split('').map((c, i) => (
                <span key={i} data-c className={styles.measureChar}>{c}</span>
              ))}
            </div>
            <p className={styles.measureSubtitle} data-sub>
              Emotion-Centered Research, Strategy &amp; Design
            </p>
          </div>

        </section>
      </div>
    </div>
  )
}
