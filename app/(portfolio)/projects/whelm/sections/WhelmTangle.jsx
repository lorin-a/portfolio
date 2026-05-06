'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from '../whelm.module.css'

/* Section 2.4 — The Tangle.
   "Overwhelm is a tangle." The diagram is Lorin's hand-drawn SVG
   (public/brand/NewTangle.svg). Two stroked threads — cream Needs
   and purple Expectations — woven together with endpoint dots,
   intersection nodules, and outlined text labels for each
   need/expectation pair.

   The SVG file is the source of truth. We fetch it on mount, strip
   its background rect (we want the section's bg to show through),
   then animate the two stroke paths drawing on while the rest of the
   composition fades in. */

const TANGLE_SRC = '/brand/NewTangle.svg'

export default function WhelmTangle() {
  const sectionRef = useRef(null)
  const svgHostRef = useRef(null)
  const [svgMarkup, setSvgMarkup] = useState('')

  /* Fetch the SVG and inline it so we can animate individual paths.
     Strip the dark background rect — the section already has the
     correct bg. */
  useEffect(() => {
    let cancelled = false
    fetch(TANGLE_SRC)
      .then(r => r.text())
      .then(text => {
        if (cancelled) return
        const cleaned = text.replace(
          /<rect[^>]*fill="#1F0536"[^>]*\/>\s*/i,
          '',
        )
        setSvgMarkup(cleaned)
      })
    return () => { cancelled = true }
  }, [])

  useGSAP(() => {
    const root = sectionRef.current
    if (!root) return
    const host = svgHostRef.current
    if (!host) return

    const svgEl = host.querySelector('svg')
    if (!svgEl) return

    /* Make the SVG fluid inside its container. */
    svgEl.setAttribute('width', '100%')
    svgEl.setAttribute('height', '100%')
    svgEl.style.display = 'block'
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    /* Threads are differentiated by stroke color: cream = needs,
       purple = expectations. Fills are the labels (cream) and the
       intersection dots + endpoint (purple). */
    const needsThread = svgEl.querySelector('path[stroke="#F3EFF7"]')
    const expectThread = svgEl.querySelector('path[stroke="#B168EF"]')
    const needsLabels = svgEl.querySelectorAll('path[fill="#F3EFF7"]')
    const expectDots = svgEl.querySelectorAll('path[fill="#B168EF"]')

    /* Composition order: dots above threads (so the nodules sit on
       top of the line crossings), labels above everything. */
    const reorder = (el) => el && svgEl.appendChild(el)
    needsLabels.forEach(reorder)
    expectDots.forEach(reorder)

    const strokedPaths = [needsThread, expectThread].filter(Boolean)

    const headingLine = root.querySelector('[data-tangle-line]')
    const headingBody = root.querySelector('[data-tangle-body]')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Initial state — threads hidden via dashoffset, all fills invisible. */
    strokedPaths.forEach(p => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    gsap.set(needsLabels, { autoAlpha: 0 })
    gsap.set(expectDots, { autoAlpha: 0 })
    if (headingLine) headingLine.style.setProperty('--reveal', '100%')
    gsap.set(headingBody, { autoAlpha: 0, y: 14 })

    if (prefersReduced) {
      strokedPaths.forEach(p => { p.style.strokeDashoffset = '0' })
      gsap.set(needsLabels, { autoAlpha: 1 })
      gsap.set(expectDots, { autoAlpha: 1 })
      if (headingLine) headingLine.style.setProperty('--reveal', '0%')
      gsap.set(headingBody, { autoAlpha: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ paused: true })
    /* Each thread takes the same draw duration, played sequentially. */
    const phaseDur = 4.0

    /* Phase 1 — Needs thread (cream) draws on alone. As it draws,
       the cream labels fade in left-to-right so the user reads the
       system of needs first, with no dots or expectations yet. */
    if (needsThread) {
      tl.to(needsThread, {
        strokeDashoffset: 0,
        duration: phaseDur,
        ease: 'power1.inOut',
      }, 0)
    }

    if (needsLabels.length > 0) {
      tl.to(needsLabels, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: { each: phaseDur * 0.65 / needsLabels.length, from: 'start' },
      }, phaseDur * 0.3)
    }

    /* Phase 2 — Expectations thread (purple) draws on. The dots /
       endpoints fade in as it crosses, giving the friction points
       their visible markers. */
    if (expectThread) {
      tl.to(expectThread, {
        strokeDashoffset: 0,
        duration: phaseDur,
        ease: 'power1.inOut',
      }, phaseDur + 0.3)
    }

    if (expectDots.length > 0) {
      tl.to(expectDots, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
        stagger: { each: phaseDur * 0.7 / expectDots.length, from: 'start' },
      }, phaseDur + 0.6)
    }

    tl.to(headingLine, {
      '--reveal': '0%',
      duration: 1.4,
      ease: 'power2.inOut',
    }, '+=0.3')
    tl.to(headingBody, {
      autoAlpha: 1, y: 0,
      duration: 1.0, ease: 'power1.inOut',
    }, '-=0.4')

    const stickyEl = root.querySelector('[data-tangle-sticky]')
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
    if (stickyEl) observer.observe(stickyEl)

    return () => {
      observer.disconnect()
      tl.kill()
    }
  }, { dependencies: [svgMarkup], scope: sectionRef })

  return (
    <section ref={sectionRef} id="tangle" className={styles.tangleSection}>
      <div data-tangle-sticky="true" className={styles.tangleSticky}>
        <div className={styles.tangleStage}>
          <div
            ref={svgHostRef}
            className={styles.tangleSvgHost}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>

        <div className={styles.tangleClaim}>
          <p className={styles.srOnly}>
            Overwhelm is a tangle of core needs and internalized expectations.
          </p>
          <h2 className={styles.tangleHeading} aria-hidden="true">
            <span className={styles.tangleLine} data-tangle-line>
              <span className={styles.tangleLineText}>
                Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
                <em className={styles.tangleAccent}>tangle</em>.
              </span>
            </span>
          </h2>
          <p data-tangle-body className={styles.tangleBody}>
            Each knot is where a need meets a rule. Rest tangled in productivity
            you call burnout. Self-expression tangled in self-doubt you call
            masking. Each name is a meeting.
          </p>
        </div>
      </div>
    </section>
  )
}
