'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, EASE } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './QuoteScene.module.css'

gsap.registerPlugin(useGSAP)

/**
 * QuoteScene — a full-viewport pinned typographic moment.
 * Use for cold opens or chapter breaks where a single voice needs to
 * own the reader's attention. Each line of the quote reveals in
 * sequence, scrubbed to scroll, then attribution lands. Reader has
 * to spend time with it; that's the point.
 *
 * Usage:
 *   <QuoteScene
 *     source="Oncology staff member"
 *     lines={[
 *       'A special person can do this work forever,',
 *       'a good person can do it for a little while,',
 *       "most people couldn't do it for a day.",
 *     ]}
 *   />
 */
export default function QuoteScene({ source, lines = [], theme = 'cream' }) {
  const sectionRef = useRef(null)
  const linesRef = useRef([])
  const sourceRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set([...linesRef.current, sourceRef.current].filter(Boolean), {
        autoAlpha: 1, y: 0,
      })
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    /* Pin for 2x viewport-height of scroll. Scrub: 0.8 keeps the reveal
       responsive to the user's scroll without feeling dragged. */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        pinType: isMobile ? 'fixed' : 'transform',
        scrub: 0.8,
      },
    })

    /* Phrase-by-phrase reveal. Each line takes ~1 unit, staggered 0.6.
       Calm power1.inOut to match the project's text-reveal voice. */
    linesRef.current.filter(Boolean).forEach((line, i) => {
      tl.from(line, {
        autoAlpha: 0, y: 24, duration: 1, ease: EASE.inOut,
      }, i * 0.6)
    })

    /* Attribution lands after the last line. Smaller, slower, off-axis. */
    if (sourceRef.current) {
      tl.from(sourceRef.current, {
        autoAlpha: 0, y: 12, duration: 0.6, ease: EASE.inOut,
      }, '>-0.1')
    }

    /* Hold tail — give the composed state a beat before unpin.
       Empty tween extends timeline duration without further visual change. */
    tl.to({}, { duration: 1.2 })

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, { scope: sectionRef })

  if (!lines.length) return null

  return (
    <section
      ref={sectionRef}
      className={styles.scene}
      aria-label="Opening quote"
      data-theme={theme}
      data-progress="hidden"
    >
      <figure className={styles.figure}>
        <blockquote className={styles.quote}>
          {lines.map((line, i) => (
            <span
              key={i}
              ref={(el) => (linesRef.current[i] = el)}
              className={styles.line}
            >
              {line}
            </span>
          ))}
        </blockquote>
        {source && (
          <figcaption ref={sourceRef} className={styles.source}>
            <span aria-hidden="true">— </span>{source}
          </figcaption>
        )}
      </figure>
    </section>
  )
}
