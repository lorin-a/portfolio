'use client'

import { Children, isValidElement, useMemo, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const EASE_INOUT = 'power1.inOut'
import { useGSAP } from '@gsap/react'
import styles from './HeroCinematic.module.css'

gsap.registerPlugin(useGSAP)

/**
 * HeroCinematic — pinned, scroll-scrubbed hero for case studies that
 * want a cinematic open. Three stages on one timeline:
 *
 *   Stage A (0 → 0.45)   Image carousel + ken-burns. Pass multiple
 *                        children; each is a stage of the immersive
 *                        opening — corridor, room, detail. Surround
 *                        holds dark; wordmark + tagline wait offstage.
 *                        Eyebrow visible early as a quiet anchor.
 *   Stage B (0.45 → 0.85) Surround scrubs dark → light via color-mix
 *                        on --scrub. Wordmark + tagline converge from
 *                        opposite viewport edges to a centered stack.
 *   Stage C (0.85 → 1.0)  Meta strip reveals; scroll cue fades.
 *
 * Pass a single child for a still hero with ken-burns; pass multiple
 * children for the carousel.
 *
 * data-progress="hidden" on the section signals to CaseStudyProgress
 * that the reading-progress bar should be hidden over this section —
 * the cinematic open shouldn't compete with a scroll indicator.
 *
 * Reduced motion: the resolved state renders on first paint. No scrub,
 * no pin. The first frame shows full, centered title + tagline + meta.
 */
export default function HeroCinematic({ eyebrow, title, tagline, meta = {}, children }) {
  const heroRef = useRef(null)
  const wordmarkRef = useRef(null)
  const taglineRef = useRef(null)
  const eyebrowRef = useRef(null)
  const metaRef = useRef(null)
  const scrollCueRef = useRef(null)
  const framesRef = useRef([])

  const frames = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children]
  )

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      heroRef.current?.setAttribute('data-state', 'resolved')
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const liveFrames = framesRef.current.filter(Boolean)
    const N = Math.max(1, liveFrames.length)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=240%',
        pin: true,
        pinType: isMobile ? 'fixed' : 'transform',
        scrub: 0.6,
        anticipatePin: 1,
      },
    })

    /* Stage A — image carousel + ken-burns. Each frame holds for
       (0.45 / N) of the timeline. Frame i fades in at its boundary
       (i > 0) and ken-burns scale 1.06 → 1.0 across its full window. */
    const stageADuration = 0.45
    liveFrames.forEach((el, i) => {
      const start = (i / N) * stageADuration
      const dur = stageADuration / N
      tl.fromTo(
        el,
        { scale: 1.06 },
        { scale: 1.0, ease: 'none', duration: dur },
        start
      )
      if (i > 0) {
        const fadeOverlap = Math.min(0.04, dur * 0.25)
        tl.fromTo(
          el,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: EASE_INOUT, duration: Math.min(0.12, dur * 0.45) },
          Math.max(0, start - fadeOverlap)
        )
      }
    })

    /* Eyebrow lifts in early (over the second beat of the carousel)
       so the reader has a quiet anchor while the photography moves. */
    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, ease: EASE_INOUT, duration: 0.08 },
        0.10
      )
    }

    /* Stage B — surround color scrub + wordmark/tagline convergence.
       The convergence is the single longest tween in the timeline so
       the dark→light transition has time to read as a deliberate beat,
       not a flash. */
    tl.to(
      heroRef.current,
      { '--scrub': 1, ease: 'none', duration: 0.40 },
      0.45
    )
    tl.fromTo(
      wordmarkRef.current,
      { x: isMobile ? '-14vw' : '-30vw' },
      { x: 0, ease: 'none', duration: 0.40 },
      0.45
    )
    tl.fromTo(
      taglineRef.current,
      { x: isMobile ? '14vw' : '30vw' },
      { x: 0, ease: 'none', duration: 0.40 },
      0.45
    )
    tl.to(
      scrollCueRef.current,
      { autoAlpha: 0, ease: 'none', duration: 0.20 },
      0.45
    )

    /* Stage C — meta strip lifts in. */
    tl.fromTo(
      metaRef.current,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, ease: EASE_INOUT, duration: 0.12 },
      0.86
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, { scope: heroRef, dependencies: [frames.length] })

  const hasMeta = Object.values(meta).some(Boolean)

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      data-theme="dark"
      data-progress="hidden"
    >
      <div className={styles.imageWrap}>
        {frames.map((child, i) => (
          <div
            key={i}
            ref={el => { framesRef.current[i] = el }}
            className={styles.frame}
            data-frame-index={i}
          >
            {child}
          </div>
        ))}
      </div>
      <div className={styles.surround}>
        <div className={styles.surroundInner}>
          {eyebrow && (
            <p ref={eyebrowRef} className={styles.eyebrow}>{eyebrow}</p>
          )}
          <div className={styles.titleStack}>
            <h1 ref={wordmarkRef} className={styles.wordmark}>{title}</h1>
            {tagline && (
              <p ref={taglineRef} className={styles.tagline}>{tagline}</p>
            )}
          </div>
          {hasMeta && (
            <dl ref={metaRef} className={styles.meta} aria-label="Project details">
              {meta.role && (<div><dt>Role</dt><dd>{meta.role}</dd></div>)}
              {meta.client && (<div><dt>Client</dt><dd>{meta.client}</dd></div>)}
              {meta.year && (<div><dt>Year</dt><dd>{meta.year}</dd></div>)}
              {meta.category && (<div><dt>Category</dt><dd>{meta.category}</dd></div>)}
              {meta.team && (<div><dt>Team</dt><dd>{meta.team}</dd></div>)}
              {meta.duration && (<div><dt>Duration</dt><dd>{meta.duration}</dd></div>)}
            </dl>
          )}
        </div>
      </div>
      <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueText}>Scroll</span>
        <svg viewBox="0 0 20 24" fill="none">
          <path d="M10 2v18M5 14l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
