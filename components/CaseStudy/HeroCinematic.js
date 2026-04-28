'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, EASE } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './HeroCinematic.module.css'

gsap.registerPlugin(useGSAP)

/**
 * HeroCinematic — pinned, scroll-scrubbed hero for case studies that
 * want a cinematic open. The reader watches a single section transform:
 *
 *   Image fills the viewport in a dark surround. Wordmark sits on the
 *   left edge, tagline on the right. As you scroll, the image compresses
 *   toward the top, the surround fades dark → light, and wordmark +
 *   tagline migrate from the edges to a centered stack with a tight
 *   meta strip beneath. By the end, the page is a clean light reading
 *   surface with a small image at top — ready for the case study body.
 *
 * The metaphor is intentional: from inside the world (immersive, dark,
 * sensory) to stepping back to read about it (clear, bright, focused).
 *
 * Reduced motion: the resolved state renders on first paint. No scrub,
 * no pin. Image small at top, centered title + tagline, meta visible,
 * cream surround. Content fully readable.
 */
export default function HeroCinematic({ eyebrow, title, tagline, meta = {}, children }) {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const wordmarkRef = useRef(null)
  const taglineRef = useRef(null)
  const metaRef = useRef(null)
  const scrollCueRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      heroRef.current?.setAttribute('data-state', 'resolved')
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    /* Pinned scrub timeline.
       Stage 1 (0 → 0.7): image compresses, surround scrubs dark → light,
       wordmark + tagline converge from L/R viewport edges toward center.
       Stage 2 (0.7 → 1.0): tagline drops under wordmark, meta strip reveals,
       scroll cue fades. */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        pinType: isMobile ? 'fixed' : 'transform',
        scrub: 0.6,
        anticipatePin: 1,
      },
    })

    /* Stage 1 — converge + fade (drives a single CSS variable on the
       host so the surround color, image height, and text color all
       interpolate together in one tween). */
    tl.to(heroRef.current, { '--scrub': 1, ease: 'none' }, 0)
      .fromTo(wordmarkRef.current,
        { x: isMobile ? '-12vw' : '-28vw', scale: isMobile ? 1 : 1.08 },
        { x: 0, scale: 1, ease: 'none' }, 0)
      .fromTo(taglineRef.current,
        { x: isMobile ? '12vw' : '28vw' },
        { x: 0, ease: 'none' }, 0)
      .to(scrollCueRef.current, { autoAlpha: 0, ease: 'none' }, 0)

    /* Stage 2 — settle: tagline drops under wordmark, meta lifts in. */
    tl.to(taglineRef.current, { y: '2.4em', ease: 'none' }, 0.7)
      .fromTo(metaRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, ease: 'none' }, 0.75)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, { scope: heroRef })

  const hasMeta = Object.values(meta).some(Boolean)

  return (
    <section ref={heroRef} className={styles.hero} data-theme="dark">
      <div ref={imageRef} className={styles.imageWrap}>
        {children}
      </div>
      <div className={styles.surround}>
        <div className={styles.surroundInner}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
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
