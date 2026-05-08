'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'

import styles from '../whelm.module.css'

gsap.registerPlugin(useGSAP, SplitText)

/* Section 2.5 — The reveal. "Overwhelm → whelm."

   The argumentative work is done. The lens trio (Signal/Tangle/Portal)
   has named what overwhelm carries. This beat performs the conceptual
   pivot in typography: a hand-drawn cancellation crosses out "Over,"
   and "whelm" stands alone — what's left when the prefix lifts away.

   ─── Sequence ───
   1. "Overwhelm" lays in (chars descend through line-mask, sine.out)
   2. Hand-drawn cursive cancellation draws left → right across "Over"
   3. "Over" rises up and dissolves; the strike fades with it
   4. "whelm." remains — the takeaway, italic accent

   ─── Pattern ───
   Cinematic-anchor sticky (tall outer, 100vh inner) + paused timeline
   + IntersectionObserver play-once. No scrub. */

export default function WhelmReveal() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const sticky = root.querySelector('[data-reveal-sticky]')
      const overWrap = root.querySelector('[data-reveal-over-wrap]')
      const overSpan = root.querySelector('[data-reveal-over]')
      const whelmSpan = root.querySelector('[data-reveal-whelm]')
      const strikePath = root.querySelector('[data-reveal-strike-path]')
      if (!sticky || !overWrap || !overSpan || !whelmSpan) return

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      /* Both halves split into chars within line-masks so the descend
         vocabulary matches the rest of the case study. */
      const splitOver = SplitText.create(overSpan, {
        type: 'lines, chars',
        mask: 'lines',
      })
      const splitWhelm = SplitText.create(whelmSpan, {
        type: 'lines, chars',
        mask: 'lines',
      })

      gsap.set([...splitOver.chars, ...splitWhelm.chars], {
        yPercent: -100,
        autoAlpha: 0,
      })
      if (strikePath) gsap.set(strikePath, { strokeDashoffset: 1 })

      if (prefersReduced) {
        /* Reduced motion: show the resolved state — "whelm" only. */
        gsap.set(splitWhelm.chars, { yPercent: 0, autoAlpha: 1 })
        gsap.set(splitOver.chars, { autoAlpha: 0 })
        return
      }

      const tl = gsap.timeline({ paused: true })

      /* Phase 1 — "Overwhelm" lays in. Both halves descend together
         so the word reads as one. */
      tl.to(
        [...splitOver.chars, ...splitWhelm.chars],
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: { each: 0.022, from: 'start' },
          ease: 'sine.out',
        },
        0,
      )

      /* Phase 2 — Cancellation. Strike draws across "Over" with the
         same easing as the heading squiggle. */
      if (strikePath) {
        tl.to(
          strikePath,
          { strokeDashoffset: 0, duration: 0.7, ease: 'sine.out' },
          1.3,
        )
      }

      /* Phase 3 — "Over" lifts and dissolves; strike fades with it.
         Right-to-left stagger so the dissolve feels like the cross-out
         pushing the prefix off-screen. The wrapper then collapses to
         width 0 so the inline-flex parent recomposes around "whelm,"
         centering it instead of leaving it orphaned right-of-center. */
      const overWidth = overWrap.getBoundingClientRect().width
      gsap.set(overWrap, { width: overWidth, overflow: 'hidden' })

      tl.to(
        splitOver.chars,
        {
          yPercent: -80,
          autoAlpha: 0,
          duration: 0.9,
          stagger: { each: 0.04, from: 'end' },
          ease: 'sine.inOut',
        },
        2.1,
      )
      if (strikePath) {
        tl.to(
          strikePath,
          { autoAlpha: 0, duration: 0.7, ease: 'sine.inOut' },
          2.3,
        )
      }
      tl.to(
        overWrap,
        { width: 0, duration: 0.9, ease: 'power2.inOut' },
        2.6,
      )

      let played = false
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !played) {
            played = true
            tl.play()
            observer.disconnect()
          }
        },
        { threshold: 0.5 },
      )
      observer.observe(sticky)

      return () => {
        observer.disconnect()
        tl.kill()
        splitOver.revert()
        splitWhelm.revert()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className={styles.revealWrap}
      aria-labelledby="reveal-heading"
    >
      <h2 id="reveal-heading" className={styles.srOnly}>
        Whelm.
      </h2>

      <div data-reveal-sticky="true" className={styles.revealSticky}>
        <div className={styles.revealStage}>
          <p className={styles.revealHeading} aria-hidden="true">
            <span data-reveal-over-wrap className={styles.revealOverWrap}>
              <span data-reveal-over className={styles.revealOver}>
                Over
              </span>
              <svg
                className={styles.revealStrike}
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="revealStrikeGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0.4"
                  >
                    <stop offset="0" stopColor="#4d1c7a" />
                    <stop offset="0.4" stopColor="#8552B2" />
                    <stop offset="0.85" stopColor="#BDB7E9" />
                  </linearGradient>
                </defs>
                <path
                  data-reveal-strike-path
                  d="M4 28 C 50 12, 95 32, 140 16 S 188 8, 196 14"
                  pathLength="1"
                  stroke="url(#revealStrikeGradient)"
                  strokeWidth="4"
                  strokeOpacity="0.95"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            <span data-reveal-whelm className={styles.revealWhelm}>
              <span className={styles.overwhelmKern}>w</span>helm.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
