'use client'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

gsap.registerPlugin(SplitText)

/* Section 2.5 — The reveal. "Overwhelm → whelm."

   The argumentative work is done. The lens trio (Signal/Tangle/Portal)
   has named what overwhelm carries. This beat performs the conceptual
   pivot in typography: a plain strikethrough draws across "Over," then
   "Over" lifts away and the wrapper collapses so "whelm." recomposes
   centered.

   Colors per Lorin: "Over" mauve (light purple), "whelm" cream (offwhite).
   Strike is a pseudo-element on .revealOver, scaled via --strike. */

export default function WhelmReveal() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    build(tl, root) {
      const overWrap = root.querySelector('[data-reveal-over-wrap]')
      const overSpan = root.querySelector('[data-reveal-over]')
      const whelmSpan = root.querySelector('[data-reveal-whelm]')
      if (!overWrap || !overSpan || !whelmSpan) return

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
      gsap.set(overSpan, { '--strike': 0 })

      if (prefersReducedMotion()) {
        gsap.set(splitWhelm.chars, { yPercent: 0, autoAlpha: 1 })
        gsap.set(splitOver.chars, { autoAlpha: 0 })
        return () => {
          splitOver.revert()
          splitWhelm.revert()
        }
      }

      // Chars descend in.
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

      // Strike draws across "Over" left-to-right.
      tl.to(
        overSpan,
        { '--strike': 1, duration: 0.55, ease: 'power2.out' },
        1.3,
      )

      // Lock the wrap width so the collapse animates cleanly.
      const overWidth = overWrap.getBoundingClientRect().width
      gsap.set(overWrap, { width: overWidth, overflow: 'hidden' })

      // "Over" + its strike fade together, then wrap collapses to 0.
      tl.to(
        overSpan,
        { autoAlpha: 0, duration: 0.7, ease: 'power2.in' },
        2.2,
      )
      tl.to(
        overWrap,
        { width: 0, duration: 0.85, ease: 'power2.inOut' },
        2.6,
      )

      return () => {
        splitOver.revert()
        splitWhelm.revert()
      }
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="reveal"
      track="medium"
      aria-labelledby="reveal-heading"
    >
      <h2 id="reveal-heading" className={styles.srOnly}>
        Whelm.
      </h2>

      <div className={styles.revealStage}>
        <p className={styles.revealHeading} aria-hidden="true">
          <span data-reveal-over-wrap className={styles.revealOverWrap}>
            <span data-reveal-over className={styles.revealOver}>
              Over
            </span>
          </span>
          <span data-reveal-whelm className={styles.revealWhelm}>
            <span className={styles.overwhelmKern}>w</span>helm.
          </span>
        </p>
      </div>
    </StickySection>
  )
}
