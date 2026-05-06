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

    /* Stroked paths = the two threads. Filled paths = endpoint dots,
       intersection nodules, and outlined text labels. */
    const strokedPaths = svgEl.querySelectorAll('path[stroke]')
    const filledPaths = svgEl.querySelectorAll('path[fill]')

    const headingLine = root.querySelector('[data-tangle-line]')
    const headingBody = root.querySelector('[data-tangle-body]')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Initial state — threads hidden via dashoffset, fills invisible. */
    const lengths = []
    strokedPaths.forEach(p => {
      const len = p.getTotalLength()
      lengths.push(len)
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    gsap.set(filledPaths, { autoAlpha: 0 })
    if (headingLine) headingLine.style.setProperty('--reveal', '100%')
    gsap.set(headingBody, { autoAlpha: 0, y: 14 })

    if (prefersReduced) {
      strokedPaths.forEach(p => { p.style.strokeDashoffset = '0' })
      gsap.set(filledPaths, { autoAlpha: 1 })
      if (headingLine) headingLine.style.setProperty('--reveal', '0%')
      gsap.set(headingBody, { autoAlpha: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ paused: true })
    const drawDur = 5.5

    /* Both threads draw simultaneously — calm, like two pens
       gesturing toward each other across the page. */
    strokedPaths.forEach(p => {
      tl.to(p, {
        strokeDashoffset: 0,
        duration: drawDur,
        ease: 'power1.inOut',
      }, 0)
    })

    /* Endpoint dots, nodules, and text labels fade in across the
       latter half of the draw — by the time the threads finish the
       full diagram is composed. Stagger from start gives the labels
       a left-to-right reading reveal. */
    tl.to(filledPaths, {
      autoAlpha: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: { each: drawDur * 0.55 / Math.max(filledPaths.length, 1), from: 'start' },
    }, drawDur * 0.45)

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
