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
 * SCATTER positions — even distribution across the full viewport.
 * Grid-like thinking: divide viewport into a 5×4 grid, place one element per cell
 * with organic offset so it doesn't look mechanical.
 * Values are % of section width/height.
 */
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
  for (let i = 0; i < count; i++) {
    const angle = i * goldenAngle
    /* Radius increases with sqrt for even area distribution */
    const r = Math.sqrt((i + 0.5) / count)
    /* Map to viewport: center at 50,50 with range 5-95% */
    const x = 50 + r * 42 * Math.cos(angle)
    const y = 50 + r * 40 * Math.sin(angle)
    positions.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10])
  }
  return positions
}

/* Generate 22 positions, then assign to elements with color interleaving */
const ALL_POSITIONS = generateScatterPositions(22)

/* Interleave: D, C, D, C, mark, D, C, D, C, mark, D, C, D, C, D, C, D, C, D, C, D, mark */
/* Pick positions that spread D and C chars across the spiral */
const D_SCATTER = [
  ALL_POSITIONS[4],   // D — pushed further from center
  ALL_POSITIONS[2],   // e
  ALL_POSITIONS[5],   // s
  ALL_POSITIONS[7],   // i
  ALL_POSITIONS[9],   // g
  ALL_POSITIONS[11],  // n
  ALL_POSITIONS[14],  // i
  ALL_POSITIONS[16],  // n
  ALL_POSITIONS[18],  // g
]
const C_SCATTER = [
  ALL_POSITIONS[1],   // C
  ALL_POSITIONS[3],   // o
  ALL_POSITIONS[0],   // n — takes D's old inner position
  ALL_POSITIONS[6],   // n
  ALL_POSITIONS[8],   // e
  ALL_POSITIONS[10],  // c
  ALL_POSITIONS[13],  // t
  ALL_POSITIONS[15],  // i
  ALL_POSITIONS[17],  // o
  ALL_POSITIONS[19],  // n
]
const MARK_SCATTER = {
  sense: ALL_POSITIONS[12],
  weave: ALL_POSITIONS[20],
}
/* Flower (shape mark) goes to ALL_POSITIONS[21] during shrink */
const FLOWER_SCATTER = ALL_POSITIONS[21]

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

export default function HeroScatter() {
  const heroRef = useRef(null)
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const flowerRef = useRef(null)
  const arrowRef = useRef(null)
  const subtitleRef = useRef(null)
  const dRefs = useRef([])
  const cRefs = useRef([])
  const senseRef = useRef(null)
  const weaveRef = useRef(null)
  const measureRef = useRef(null)
  const idleTweens = useRef([])

  const [shapeAnimate, setShapeAnimate] = useState(false)
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

  useGSAP(() => {
    const section = sectionRef.current
    const flower = flowerRef.current
    if (!section || !flower) return

    const dChars = dRefs.current.filter(Boolean)
    const cChars = cRefs.current.filter(Boolean)
    const allChars = [...dChars, ...cChars]
    const marks = [senseRef.current, weaveRef.current].filter(Boolean)
    const allScatter = [...allChars, ...marks]

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(flower, { display: 'none' })
      gsap.set(measureRef.current, { autoAlpha: 1 })
      return
    }

    window.scrollTo(0, 0)

    /* Hide everything below the hero immediately to prevent flash */
    let sibling = wrapperRef.current?.nextElementSibling
    while (sibling) {
      gsap.set(sibling, { autoAlpha: 0 })
      sibling = sibling.nextElementSibling
    }

    /* ─── INITIAL STATE: everything offscreen, flower centered ─── */
    const flowerSize = Math.min(Math.max(window.innerWidth * 0.22, 160), 280)
    gsap.set(flower, {
      left: '50%', top: '50%', xPercent: -50, yPercent: -50,
      width: flowerSize, height: flowerSize, autoAlpha: 1,
    })

    /* Place all elements at their OFFSCREEN positions (visible but off-viewport) */
    dChars.forEach((el, i) => {
      gsap.set(el, { left: D_OFFSCREEN[i][0] + '%', top: D_OFFSCREEN[i][1] + '%', autoAlpha: 1 })
    })
    cChars.forEach((el, i) => {
      gsap.set(el, { left: C_OFFSCREEN[i][0] + '%', top: C_OFFSCREEN[i][1] + '%', autoAlpha: 1 })
    })
    if (senseRef.current) gsap.set(senseRef.current, { left: MARK_OFFSCREEN.sense[0] + '%', top: MARK_OFFSCREEN.sense[1] + '%', autoAlpha: 1 })
    if (weaveRef.current) gsap.set(weaveRef.current, { left: MARK_OFFSCREEN.weave[0] + '%', top: MARK_OFFSCREEN.weave[1] + '%', autoAlpha: 1 })

    gsap.set(subtitleRef.current, { autoAlpha: 0 })
    gsap.set(arrowRef.current, { autoAlpha: 0 })
    gsap.set(measureRef.current, { autoAlpha: 0 })

    /* ─── FLOWER OPENER (time-based) ─── */
    setShapeAnimate(true)
    /* Prevent elastic overscroll that fights with ScrollTrigger */
    ScrollTrigger.normalizeScroll(true)

    shapeDrawDone.current = () => {
      /* Bounce after spin — invitational pulse */
      const bounceTl = gsap.timeline({
        onComplete: () => {
          gsap.to(arrowRef.current, { autoAlpha: 0.5, duration: 0.5, ease: 'power1.inOut' })
          window.scrollTo(0, 0)
          buildScrollTimeline()
          /* Reveal content below after pin is established */
          let s = wrapperRef.current?.nextElementSibling
          while (s) { gsap.set(s, { autoAlpha: 1 }); s = s.nextElementSibling }
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
          end: '+=400%',
          pin: sectionRef.current,
          pinType: 'transform',
          scrub: 1.5,
          onUpdate: (self) => {
            /* Kill floats only when gather is nearly done */
            if (self.progress > 0.75 && idleTweens.current.length) {
              idleTweens.current.forEach(t => t.kill())
              idleTweens.current = []
              allScatter.forEach(el => { if (el) gsap.set(el, { y: 0 }) })
              gsap.set(flower, { y: 0 })
            }
          },
        },
      })

      /* ── 0–3%: Hide arrow ── */
      tl.to(arrowRef.current, { autoAlpha: 0, duration: 0.02 }, 0)

      /* ── 0–25%: DRAG IN — letters travel from offscreen to scatter positions.
           Flower shrinks simultaneously. Same scroll range = same gesture. ── */

      /* Flower shrinks to mark size, stays center */
      tl.to(flower, {
        width: 70, height: 70,
        duration: 0.22, ease: 'power1.inOut',
      }, 0)

      /* Each Designing char drags from offscreen to scatter position */
      dChars.forEach((el, i) => {
        tl.to(el, {
          left: D_SCATTER[i][0] + '%', top: D_SCATTER[i][1] + '%',
          duration: 0.22, ease: 'power1.out',
        }, i * 0.005)
      })

      /* Each Connection char drags from offscreen to scatter position */
      cChars.forEach((el, i) => {
        tl.to(el, {
          left: C_SCATTER[i][0] + '%', top: C_SCATTER[i][1] + '%',
          duration: 0.22, ease: 'power1.out',
        }, 0.02 + i * 0.005)
      })

      /* Marks drag in */
      if (senseRef.current) {
        tl.to(senseRef.current, {
          left: MARK_SCATTER.sense[0] + '%', top: MARK_SCATTER.sense[1] + '%',
          duration: 0.20, ease: 'power1.out',
        }, 0.03)
      }
      if (weaveRef.current) {
        tl.to(weaveRef.current, {
          left: MARK_SCATTER.weave[0] + '%', top: MARK_SCATTER.weave[1] + '%',
          duration: 0.20, ease: 'power1.out',
        }, 0.04)
      }

      /* Idle float — starts immediately, runs until near end of gather.
         Uses y transform which is independent of left/top positioning. */
      allScatter.forEach(el => {
        if (!el) return
        idleTweens.current.push(gsap.to(el, {
          y: '+=14',
          duration: gsap.utils.random(2, 3.5),
          ease: 'sine.inOut', repeat: -1, yoyo: true,
          delay: gsap.utils.random(0, 2),
        }))
      })
      idleTweens.current.push(gsap.to(flower, {
        y: '+=10',
        duration: 3,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
      }))

      /* ── 22–32%: Brief scatter hold ── */

      /* ── 32–78%: GATHER — every element to its kerned final position ── */
      dChars.forEach((el, i) => {
        if (!dFinals[i]) return
        tl.to(el, {
          left: dFinals[i].left + '%', top: dFinals[i].top + '%',
          duration: 0.38, ease: 'power2.inOut',
        }, 0.32 + i * 0.01)
      })

      cChars.forEach((el, i) => {
        if (!cFinals[i]) return
        tl.to(el, {
          left: cFinals[i].left + '%', top: cFinals[i].top + '%',
          duration: 0.38, ease: 'power2.inOut',
        }, 0.34 + i * 0.01)
      })

      if (senseRef.current && mFinals[0]) {
        tl.to(senseRef.current, {
          left: mFinals[0].left + '%', top: mFinals[0].top + '%',
          width: mFinals[0].w, height: mFinals[0].h,
          duration: 0.34, ease: 'power2.inOut',
        }, 0.36)
      }
      if (weaveRef.current && mFinals[1]) {
        tl.to(weaveRef.current, {
          left: mFinals[1].left + '%', top: mFinals[1].top + '%',
          width: mFinals[1].w, height: mFinals[1].h,
          duration: 0.34, ease: 'power2.inOut',
        }, 0.36)
      }
      if (mFinals[2]) {
        tl.to(flower, {
          left: mFinals[2].left + '%', top: mFinals[2].top + '%',
          width: mFinals[2].w, height: mFinals[2].h,
          duration: 0.34, ease: 'power2.inOut',
        }, 0.36)
      }

      /* ── 82–100%: Subtitle ── */
      tl.to(subtitleRef.current, {
        autoAlpha: 1, duration: 0.15, ease: 'power1.inOut',
      }, 0.84)
    }

    return () => {
      idleTweens.current.forEach(t => t.kill())
      idleTweens.current = []
    }
  }, { scope: heroRef })

  return (
    <div ref={heroRef}>
      <div ref={wrapperRef}>
        <section ref={sectionRef} className={styles.hero} aria-label="Introduction">

          <div ref={flowerRef} className={styles.flower}>
            <ShapeMark animate={shapeAnimate} showBrush fillReveal
              gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT}
              onDrawComplete={onShapeDrawComplete} />
          </div>

          {'Designing'.split('').map((c, i) => (
            <div key={`d${i}`} ref={el => { dRefs.current[i] = el }}
              className={styles.scatterChar}>{c}</div>
          ))}

          {'Connection'.split('').map((c, i) => (
            <div key={`c${i}`} ref={el => { cRefs.current[i] = el }}
              className={`${styles.scatterChar} ${styles.gradient}`}>{c}</div>
          ))}

          <div ref={senseRef} className={styles.mark}>
            <SenseMark animate showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
          </div>
          <div ref={weaveRef} className={styles.mark}>
            <WeaveMark animate showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
          </div>

          <p ref={subtitleRef} className={styles.subtitle}>
            Emotion-Centered Research, Strategy{' '}
            <span style={{ fontStyle: 'normal', fontWeight: 333 }}>&amp;</span> Design
          </p>

          <div ref={arrowRef} className={styles.arrow}>
            <svg viewBox="0 0 20 24" fill="none" aria-hidden="true">
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
