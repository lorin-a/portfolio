'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import ShapeMark from '@/components/marks/ShapeMark'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
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
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const dRefs = useRef([])
  const cRefs = useRef([])
  const senseRef = useRef(null)
  const weaveRef = useRef(null)
  const measureRef = useRef(null)

  const [shapeAnimate, setShapeAnimate] = useState(false)
  const [senseReplay, setSenseReplay] = useState(0)
  const [weaveReplay, setWeaveReplay] = useState(0)
  const flowerHoverable = useRef(false)
  const shapeDrawDone = useRef(null)
  const onShapeDrawComplete = useCallback(() => shapeDrawDone.current?.(), [])

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
    gsap.set(arrowRef.current, { autoAlpha: 0 })
    gsap.set(measureRef.current, { autoAlpha: 0 })

    /* Lock scrolling during flower opener */
    document.body.style.overflow = 'hidden'

    /* Build scroll timeline (establishes pin) but disable it until flower completes */
    const heroST = buildScrollTimeline()
    if (heroST) heroST.disable()

    /* ─── FLOWER OPENER (time-based) ─── */
    setShapeAnimate(true)
    shapeDrawDone.current = () => {
      /* Bounce after spin — invitational pulse */
      const bounceTl = gsap.timeline({
        onComplete: () => {
          flowerHoverable.current = true
          /* Enable the scroll timeline + unlock scrolling. normalizeScroll
             keeps the pin holding through native scroll on macOS/iOS
             (prevents elastic bounce from desyncing the scrub). Note:
             Lenis is intentionally disabled on the homepage in
             PortfolioShell so it does not fight this trigger. */
          document.body.style.overflow = ''
          if (heroST) heroST.enable()
          ScrollTrigger.normalizeScroll(true)
          ScrollTrigger.refresh()
          gsap.to(arrowRef.current, { autoAlpha: 1, duration: 0.5, ease: 'power1.inOut' })
          /* Peek letters slide in from further offscreen, fading in alongside
             Welcome — a wordless hint that more exists beyond the frame. */
          gsap.to(peekEls, {
            x: 0, y: 0, autoAlpha: 1,
            duration: 0.9, ease: 'power1.inOut',
            stagger: 0.08,
          })
          document.body.classList.remove('hero-loading')
        },
      })
      bounceTl.to(flower, { scale: 1.15, duration: 0.25, ease: 'power2.out' })
      bounceTl.to(flower, { scale: 1, duration: 0.3, ease: 'power1.inOut' })
    }

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
          end: '+=500%',
          pin: sectionRef.current,
          /* On mobile (touch + iOS Safari address-bar show/hide),
             transform-based pins drift and the section scrolls past
             into glitchy/layered states. position:fixed escapes that
             entirely. Desktop keeps transform — it's smoother there
             and avoids creating a containing block. */
          pinType: window.matchMedia('(max-width: 768px)').matches ? 'fixed' : 'transform',
          scrub: 0.8,
          onUpdate: (self) => {
            /* Show welcome only when at the very start (flower state) */
            if (arrowRef.current) {
              if (self.progress < 0.005) {
                gsap.set(arrowRef.current, { autoAlpha: 1 })
              } else {
                gsap.set(arrowRef.current, { autoAlpha: 0 })
              }
            }
          },
        },
      })

      /* Welcome arrow hidden via onUpdate callback (handles all scroll states) */

      /* ── 0–25%: DRAG IN — letters travel from offscreen to scatter positions.
           Flower shrinks simultaneously. Same scroll range = same gesture. ── */

      /* Flower shrinks to mark size, stays center */
      tl.to(flower, {
        width: 70, height: 70,
        duration: 0.22, ease: 'power1.inOut',
      }, 0)

      /* Each Designing char drags from offscreen to scatter position.
         power2.out = pure deceleration, no bounce or direction change at end */
      dChars.forEach((el, i) => {
        tl.to(el, {
          left: D_SCATTER[i][0] + '%', top: D_SCATTER[i][1] + '%',
          duration: 0.24, ease: 'power2.out',
        }, i * 0.004)
      })

      /* Each Connection char */
      cChars.forEach((el, i) => {
        tl.to(el, {
          left: C_SCATTER[i][0] + '%', top: C_SCATTER[i][1] + '%',
          duration: 0.24, ease: 'power2.out',
        }, 0.015 + i * 0.004)
      })

      /* Marks drag in */
      if (senseRef.current) {
        tl.to(senseRef.current, {
          left: MARK_SCATTER.sense[0] + '%', top: MARK_SCATTER.sense[1] + '%',
          duration: 0.22, ease: 'power2.out',
        }, 0.02)
      }
      if (weaveRef.current) {
        tl.to(weaveRef.current, {
          left: MARK_SCATTER.weave[0] + '%', top: MARK_SCATTER.weave[1] + '%',
          duration: 0.22, ease: 'power2.out',
        }, 0.03)
      }

      /* ── 22–68%: GATHER — every element to its kerned final position.
           No scatter hold: drag-in flows directly into gather so the user
           never feels stopped at the mid-point. ── */
      dChars.forEach((el, i) => {
        if (!dFinals[i]) return
        tl.to(el, {
          left: dFinals[i].left + '%', top: dFinals[i].top + '%',
          duration: 0.38, ease: 'power2.inOut',
        }, 0.22 + i * 0.01)
      })

      cChars.forEach((el, i) => {
        if (!cFinals[i]) return
        tl.to(el, {
          left: cFinals[i].left + '%', top: cFinals[i].top + '%',
          duration: 0.38, ease: 'power2.inOut',
        }, 0.24 + i * 0.01)
      })

      if (senseRef.current && mFinals[0]) {
        tl.to(senseRef.current, {
          left: mFinals[0].left + '%', top: mFinals[0].top + '%',
          width: mFinals[0].w, height: mFinals[0].h,
          duration: 0.34, ease: 'power2.inOut',
        }, 0.26)
      }
      if (weaveRef.current && mFinals[1]) {
        tl.to(weaveRef.current, {
          left: mFinals[1].left + '%', top: mFinals[1].top + '%',
          width: mFinals[1].w, height: mFinals[1].h,
          duration: 0.34, ease: 'power2.inOut',
        }, 0.26)
      }
      if (mFinals[2]) {
        /* Flower uses xPercent/yPercent for centering, which is already applied.
           The measurement gives us center coordinates, so left/top targets are correct. */
        tl.to(flower, {
          left: mFinals[2].left + '%', top: mFinals[2].top + '%',
          width: mFinals[2].w, height: mFinals[2].h,
          duration: 0.34, ease: 'power2.inOut',
        }, 0.26)
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
            <ShapeMark animate={shapeAnimate} showBrush fillReveal
              gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT}
              onDrawComplete={onShapeDrawComplete} />
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
            <p className={styles.welcomeText}>Welcome</p>
            <p className={styles.scrollHint}>Keep Scrolling</p>
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
