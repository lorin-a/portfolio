'use client'

import { Children, isValidElement, useMemo, useRef } from 'react'
import { gsap, ScrollTrigger, EASE } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './StickyScene.module.css'

gsap.registerPlugin(useGSAP)

/**
 * StickyScene — split-screen body section.
 *
 *   [ sticky copy column ]   [ scrolling media column ]
 *
 * Left: label, claim sentence, lead paragraph, body, optional pull-quote.
 *       Sticks while the right column scrolls past.
 * Right: any media — Artifact, video, image stack — or a choreographed
 *       <StickyScene.Steps>{stages}</StickyScene.Steps> progression.
 *
 * The pattern lives in the standalone Groundswell stakeholder site
 * (.parallaxSection in styles/project.module.css). This is the
 * generalized, V2-token version intended for the case-study system.
 *
 * Theme prop: 'dark' | 'light' | 'cream' applies a palette + sets
 * data-theme so the existing ProgressNav can flip its color over the
 * section.
 *
 * NYT-style choreography:
 *   <StickyScene.Steps> renders one stage at a time inside a sticky
 *   viewport on the right. Spacers below extend the section's scroll
 *   height; ScrollTriggers cross-fade between stages as the reader
 *   advances through the section. Use this when one visual transforms
 *   in place across multiple narrative beats.
 *
 * Reduced motion + mobile: sticky disengages, both columns flow inline.
 * Steps render as a vertical sequence with all stages visible. All
 * content remains readable.
 */
export default function StickyScene({
  theme = 'light',
  reverse = false,
  label,
  title,
  lead,
  pullQuote,
  pullQuoteCite,
  children,
}) {
  return (
    <section
      className={`${styles.scene} ${reverse ? styles.reverse : ''}`}
      data-theme={theme}
    >
      <div className={styles.sticky}>
        <div className={styles.stickyInner}>
          {label && <p className={styles.label}>{label}</p>}
          {title && <h3 className={styles.title}>{title}</h3>}
          {lead && <p className={styles.lead}>{lead}</p>}
          {pullQuote && (
            <figure className={styles.pullQuoteFigure}>
              <blockquote className={styles.pullQuote}>{pullQuote}</blockquote>
              {pullQuoteCite && (
                <figcaption className={styles.pullQuoteCite}>{pullQuoteCite}</figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
      <div className={styles.scroll}>{children}</div>
    </section>
  )
}

/**
 * StickyScene.Steps — choreographed progression inside the scrolling
 * column. Each child is a stage of a single visual that transforms as
 * the reader scrolls. Implementation:
 *   - One sticky viewport holds the active stage layer-stacked.
 *   - Below it, N invisible spacers (one per stage) extend the section
 *     scroll height so each stage gets ~one viewport of scroll.
 *   - ScrollTriggers at each spacer boundary cross-fade stages.
 *
 * Reduced motion: all stages render in sequence, vertically, fully
 * visible — no sticky, no fade.
 */
function Steps({ children }) {
  const wrapRef = useRef(null)
  const stages = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children]
  )

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !wrapRef.current || stages.length <= 1) return

    const stageEls = wrapRef.current.querySelectorAll(`.${styles.stage}`)
    const spacerEls = wrapRef.current.querySelectorAll(`.${styles.stageSpacer}`)
    if (stageEls.length <= 1 || spacerEls.length !== stageEls.length) return

    /* Initial state: only stage 0 visible. */
    gsap.set(Array.from(stageEls).slice(1), { autoAlpha: 0 })

    const triggers = []
    spacerEls.forEach((spacer, i) => {
      if (i === 0) return
      const prev = stageEls[i - 1]
      const next = stageEls[i]
      const t = ScrollTrigger.create({
        trigger: spacer,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(prev, { autoAlpha: 0, duration: 0.4, ease: EASE.inOut })
          gsap.to(next, { autoAlpha: 1, duration: 0.5, ease: EASE.inOut })
        },
        onLeaveBack: () => {
          gsap.to(next, { autoAlpha: 0, duration: 0.4, ease: EASE.inOut })
          gsap.to(prev, { autoAlpha: 1, duration: 0.5, ease: EASE.inOut })
        },
      })
      triggers.push(t)
    })

    return () => triggers.forEach(t => t.kill())
  }, { scope: wrapRef, dependencies: [stages.length] })

  return (
    <div ref={wrapRef} className={styles.steps} data-stage-count={stages.length}>
      <div className={styles.stagesViewport}>
        {stages.map((child, i) => (
          <div key={i} className={styles.stage} data-stage-index={i}>
            {child}
          </div>
        ))}
      </div>
      {stages.map((_, i) => (
        <div key={i} className={styles.stageSpacer} aria-hidden="true" />
      ))}
    </div>
  )
}

/**
 * StickyScene.Beat — a body-side caption that names the active stage.
 * Pair 1:1 with <Steps> stages. For first pass these are static text;
 * a future extension can sync the active beat highlight to scroll.
 */
function Beat({ children }) {
  return <p className={styles.beat}>{children}</p>
}

StickyScene.Steps = Steps
StickyScene.Beat = Beat
