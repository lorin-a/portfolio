'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 1 — The Gap.
   Three "Overwhelm" lines waterfall down from the same point, then
   "is overlooked." types in below with a blinking cursor. */

const PUNCHLINE = [
  { text: 'is  ', italic: false },
  { text: 'overlooked', italic: true },
  { text: '.', italic: false },
]

const PUNCHLINE_CHARS = PUNCHLINE.flatMap(seg =>
  Array.from(seg.text).map(c => ({ c, italic: seg.italic }))
)

export default function WhelmGap() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.85,
    build(tl, root) {
      const lines = root.querySelectorAll('[data-gap-line]')
      const chars = root.querySelectorAll('[data-gap-char]')
      const cursor = root.querySelector('[data-gap-cursor]')
      const arrow = root.querySelector('[data-gap-arrow]')

      if (prefersReducedMotion()) {
        gsap.set(lines, { yPercent: 0, autoAlpha: 1 })
        gsap.set(chars, { maxWidth: 'none', opacity: 1 })
        gsap.set(cursor, { autoAlpha: 0 })
        gsap.set(arrow, { autoAlpha: 1 })
        return
      }

      gsap.set(lines, { yPercent: i => -100 * i, autoAlpha: 0 })
      gsap.set(chars, { maxWidth: 0, opacity: 0 })
      gsap.set(cursor, { autoAlpha: 0 })
      gsap.set(arrow, { autoAlpha: 0 })

      tl.to(lines, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.22,
      })

      tl.to(cursor, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, '-=0.3')

      chars.forEach((el, i) => {
        tl.to(
          el,
          {
            maxWidth: el.scrollWidth,
            opacity: 1,
            duration: 0.12,
            ease: 'power2.out',
            onComplete: () => {
              el.style.maxWidth = 'none'
              el.style.overflow = 'visible'
            },
          },
          `>${i === 0 ? 0 : -0.05}`,
        )
      })

      tl.to(cursor, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '+=0.4')
      tl.to(arrow, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, '+=0.2')
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="gap"
      track="long"
      stage="grid"
      aria-labelledby="gap-thesis"
    >
      <p id="gap-thesis" className={styles.srOnly}>
        Overwhelm is overlooked.
      </p>

      <div className={styles.gapSticky}>
        <div className={styles.gapComposition}>
          <div className={styles.overcomeStack} aria-hidden="true">
            <span className={styles.overcomeLine} data-tier="1" data-gap-line="0">Over<span className={styles.overwhelmKern}>w</span>helm</span>
            <span className={styles.overcomeLine} data-tier="2" data-gap-line="1">Over<span className={styles.overwhelmKern}>w</span>helm</span>
            <span className={styles.overcomeLine} data-tier="3" data-gap-line="2">Over<span className={styles.overwhelmKern}>w</span>helm</span>
            <span className={styles.gapPunchline} aria-hidden="true">
              <span className={styles.gapPunchlineInner}>
                {PUNCHLINE_CHARS.map((entry, i) => (
                  <span
                    key={i}
                    data-gap-char={i}
                    data-italic={entry.italic ? 'true' : undefined}
                    className={styles.gapPunchlineChar}
                  >
                    {entry.c}
                  </span>
                ))}
                <span
                  data-gap-cursor="true"
                  className={styles.gapPunchlineCursor}
                  aria-hidden="true"
                />
              </span>
            </span>
          </div>

          <div data-gap-arrow="true" className={styles.gapArrow} aria-hidden="true">
            <svg viewBox="0 0 20 24" fill="none" aria-hidden="true">
              <path
                d="M10 2v18M5 14l5 6 5-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
