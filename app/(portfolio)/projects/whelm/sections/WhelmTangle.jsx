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

const TANGLE_SRC = '/brand/Newest_Tangle.svg'

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

    /* Auto-crop the viewBox to actual content bounds. The hand-drawn
       export has internal padding around the weave; cropping makes
       the artwork (and its label glyphs) render larger in the
       container. Run after a tick so getBBox sees laid-out paths. */
    requestAnimationFrame(() => {
      try {
        const b = svgEl.getBBox()
        const pad = 24
        svgEl.setAttribute(
          'viewBox',
          `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`,
        )
      } catch {}
    })

    /* Newest_Tangle.svg palette (corrected mapping):
       - stroke="#F3EFF7" — 11 paths: longest = needs thread, rest = cream tendrils
       - stroke="#B168EF" — 2 paths: longest = expectations thread, other = decor
       - fill="#F3EFF7" (cream, 9) = NEEDS WORDS — "Needs" header + 8 paired words
       - fill="#B168EF" (purple, 9) = EXPECTATION WORDS — "Expectations" header + 8 paired
       - fill="#BDB7E9" (mauve, 9) = intersection dots / nodules

       Each pair label has a cream needs-word and a purple expect-word that
       sit near each other at the knot — animation routes them by color:
       cream fades in during Phase 1 (needs draw), purple in Phase 2.

       Length-based thread detection (rather than stroke-width) because the
       SVG export uses arbitrary precise widths that change on re-export. */
    const pickMainAndDecor = (paths) => {
      const list = Array.from(paths)
      if (list.length === 0) return { main: null, decor: [] }
      let main = list[0]
      let mainLen = main.getTotalLength()
      for (let i = 1; i < list.length; i++) {
        const len = list[i].getTotalLength()
        if (len > mainLen) { main = list[i]; mainLen = len }
      }
      return { main, decor: list.filter(p => p !== main) }
    }

    const creamStroked = svgEl.querySelectorAll('path[stroke="#F3EFF7"]')
    const purpleStroked = svgEl.querySelectorAll('path[stroke="#B168EF"]')
    const { main: needsThread, decor: needsDecor } = pickMainAndDecor(creamStroked)
    const { main: expectThread, decor: expectDecor } = pickMainAndDecor(purpleStroked)
    const needsWords = svgEl.querySelectorAll('path[fill="#F3EFF7"]')
    const expectWords = svgEl.querySelectorAll('path[fill="#B168EF"]')
    const dots = svgEl.querySelectorAll('path[fill="#BDB7E9"]')
    const ornament = svgEl.querySelectorAll('path[fill="#F0E2FF"]')

    /* Composition order: dots above threads (so nodules sit on top of
       crossings), then words above dots (so glyphs read clearly). */
    const reorder = (el) => el && svgEl.appendChild(el)
    dots.forEach(reorder)
    needsWords.forEach(reorder)
    expectWords.forEach(reorder)

    const strokedPaths = [needsThread, expectThread].filter(Boolean)

    const headingLine = root.querySelector('[data-tangle-line]')
    const headingBody = root.querySelector('[data-tangle-body]')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Initial state — threads hidden via dashoffset, decorative
       strokes + all fills invisible. */
    strokedPaths.forEach(p => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    gsap.set(needsDecor, { autoAlpha: 0 })
    gsap.set(expectDecor, { autoAlpha: 0 })
    gsap.set(needsWords, { autoAlpha: 0 })
    gsap.set(expectWords, { autoAlpha: 0 })
    gsap.set(dots, { autoAlpha: 0 })
    gsap.set(ornament, { autoAlpha: 0 })
    if (headingLine) headingLine.style.setProperty('--reveal', '100%')
    gsap.set(headingBody, { autoAlpha: 0, y: 14 })

    /* Reveal the SVG host now that initial state is locked. The host
       starts visibility:hidden via CSS to prevent a flash of fully-
       composed artwork between dangerouslySetInnerHTML mount and this
       useGSAP hook running. */
    host.style.visibility = 'visible'

    if (prefersReduced) {
      strokedPaths.forEach(p => { p.style.strokeDashoffset = '0' })
      gsap.set([needsDecor, expectDecor, needsWords, expectWords, dots, ornament], { autoAlpha: 1 })
      if (headingLine) headingLine.style.setProperty('--reveal', '0%')
      gsap.set(headingBody, { autoAlpha: 1, y: 0 })
      return
    }

    /* ---------- Spatial timing helpers ----------
       For each marker, find the parameter t (0..1) along the thread
       where the thread point is closest to the marker's center, plus
       the squared distance to that point. Markers fade in at the
       moment the drawing tip reaches them (or shortly after for
       readability). */
    const sampleThread = (thread, samples = 240) => {
      if (!thread) return []
      const total = thread.getTotalLength()
      const pts = []
      for (let i = 0; i <= samples; i++) {
        const p = thread.getPointAtLength((i / samples) * total)
        pts.push({ x: p.x, y: p.y, t: i / samples })
      }
      return pts
    }
    const closestOnSamples = (samples, cx, cy) => {
      let bestT = 0, bestD = Infinity
      for (const p of samples) {
        const d = (p.x - cx) ** 2 + (p.y - cy) ** 2
        if (d < bestD) { bestD = d; bestT = p.t }
      }
      return { t: bestT, d2: bestD }
    }
    const centerOf = (el) => {
      const b = el.getBBox()
      return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 }
    }

    const needsSamples = sampleThread(needsThread)
    const expectSamples = sampleThread(expectThread)

    /* Direction detection — the SVG path may natively start at either
       end. Needs should draw left-to-right; Expectations right-to-left.
       If the path's natural start is at the wrong end, flip the
       dashoffset sign so it draws in reverse, and remap the marker
       timings: when drawing in reverse, a marker at path-t = T is
       reached at phase time (1 - T) * phaseDur instead of T * phaseDur. */
    const needsReversed = needsSamples.length > 0
      && needsSamples[0].x > needsSamples[needsSamples.length - 1].x
    const expectReversed = expectSamples.length > 0
      && expectSamples[0].x < expectSamples[expectSamples.length - 1].x

    const drawTime = (t, reversed, phaseDur) =>
      (reversed ? 1 - t : t) * phaseDur

    /* Re-init dashoffset to negative when we want reverse draw. */
    if (needsThread && needsReversed) {
      const len = needsThread.getTotalLength()
      needsThread.style.strokeDashoffset = `-${len}`
    }
    if (expectThread && expectReversed) {
      const len = expectThread.getTotalLength()
      expectThread.style.strokeDashoffset = `-${len}`
    }

    /* ---------- Identify named markers ----------
       Animation routes by color:
       - Cream words → Phase 1 (needs draw, L→R)
       - Purple words → Phase 2 (expectations draw, R→L)
       - Mauve dots → split: leftmost dot pairs with "Needs" header
         (Phase 1 pre-roll), rightmost dot pairs with "Expectations"
         header (Phase 2 pre-roll), the remaining 7 are intersection
         nodules that appear during Phase 2 spatial timing.

       "Needs" header = leftmost cream word.
       "Expectations" header = rightmost purple word. */
    const cream = Array.from(needsWords).map(el => ({ el, ...centerOf(el) }))
    const purple = Array.from(expectWords).map(el => ({ el, ...centerOf(el) }))
    const mauve = Array.from(dots).map(el => ({ el, ...centerOf(el) }))

    const needsHeader = cream.length
      ? cream.reduce((a, b) => (a.cx <= b.cx ? a : b))
      : null
    const expectHeader = purple.length
      ? purple.reduce((a, b) => (a.cx >= b.cx ? a : b))
      : null
    const needsHeaderDot = mauve.length
      ? mauve.reduce((a, b) => (a.cx <= b.cx ? a : b))
      : null
    const expectHeaderDot = mauve.length
      ? mauve.reduce((a, b) => (a.cx >= b.cx ? a : b))
      : null

    const namedSet = new Set(
      [needsHeader?.el, expectHeader?.el, needsHeaderDot?.el, expectHeaderDot?.el].filter(Boolean),
    )

    const tl = gsap.timeline({ paused: true })
    const namedDur = 0.7
    const needsPhaseDur = 3.2  /* compressed from 5.6 */
    const expectPhaseDur = 4.0 /* compressed from 8.0 */

    /* ---------- Text first ----------
       Heading wipes in, body lifts right behind it. Both land
       before the threads start drawing. */
    if (headingLine) {
      tl.to(headingLine, {
        '--reveal': '0%',
        duration: 1.0, ease: 'power2.inOut',
      }, 0)
    }
    if (headingBody) {
      tl.to(headingBody, {
        autoAlpha: 1, y: 0,
        duration: 0.7, ease: 'power1.out',
      }, 0.5)
    }

    /* ---------- Phase 1 — Needs ---------- */
    const phase1NameStart = 1.3
    const phase1DrawStart = phase1NameStart + namedDur
    if (needsHeader) {
      tl.to(needsHeader.el, {
        autoAlpha: 1, duration: 0.7, ease: 'power2.out',
      }, phase1NameStart)
    }
    if (needsHeaderDot) {
      tl.to(needsHeaderDot.el, {
        autoAlpha: 1, duration: 0.55, ease: 'back.out(1.6)',
      }, phase1NameStart + 0.1)
    }

    if (needsThread) {
      tl.fromTo(needsThread,
        { strokeDashoffset: needsReversed ? -needsThread.getTotalLength() : needsThread.getTotalLength() },
        { strokeDashoffset: 0, duration: needsPhaseDur, ease: 'power1.inOut' },
        phase1DrawStart,
      )
    }

    /* Decorative cream tendrils — fade as needs tip passes them. */
    needsDecor.forEach(el => {
      const { cx, cy } = centerOf(el)
      const { t } = closestOnSamples(needsSamples, cx, cy)
      tl.to(el, {
        autoAlpha: 1, duration: 0.5, ease: 'power2.out',
      }, phase1DrawStart + drawTime(t, needsReversed, needsPhaseDur))
    })

    /* Remaining cream words appear as the line passes through them. */
    cream.forEach(m => {
      if (namedSet.has(m.el)) return
      const { t } = closestOnSamples(needsSamples, m.cx, m.cy)
      tl.to(m.el, {
        autoAlpha: 1, duration: 0.5, ease: 'power2.out',
      }, phase1DrawStart + drawTime(t, needsReversed, needsPhaseDur) + 0.05)
    })

    /* ---------- Phase 2 — Expectations ---------- */
    const phase2NameStart = phase1DrawStart + needsPhaseDur + 0.5
    const phase2DrawStart = phase2NameStart + namedDur
    if (expectHeader) {
      tl.to(expectHeader.el, {
        autoAlpha: 1, duration: 0.7, ease: 'power2.out',
      }, phase2NameStart)
    }
    if (expectHeaderDot) {
      tl.to(expectHeaderDot.el, {
        autoAlpha: 1, duration: 0.55, ease: 'back.out(1.6)',
      }, phase2NameStart + 0.1)
    }

    if (expectThread) {
      tl.fromTo(expectThread,
        { strokeDashoffset: expectReversed ? -expectThread.getTotalLength() : expectThread.getTotalLength() },
        { strokeDashoffset: 0, duration: expectPhaseDur, ease: 'power1.inOut' },
        phase2DrawStart,
      )
    }

    /* Decorative purple tendrils. */
    expectDecor.forEach(el => {
      const { cx, cy } = centerOf(el)
      const { t } = closestOnSamples(expectSamples, cx, cy)
      tl.to(el, {
        autoAlpha: 1, duration: 0.5, ease: 'power2.out',
      }, phase2DrawStart + drawTime(t, expectReversed, expectPhaseDur))
    })

    /* Remaining purple words appear as the expect line passes them. */
    purple.forEach(m => {
      if (namedSet.has(m.el)) return
      const { t } = closestOnSamples(expectSamples, m.cx, m.cy)
      tl.to(m.el, {
        autoAlpha: 1, duration: 0.5, ease: 'power2.out',
      }, phase2DrawStart + drawTime(t, expectReversed, expectPhaseDur) + 0.05)
    })

    /* Remaining mauve dots — intersection nodules. Appear as expect
       line passes each crossing. Both threads share these points but
       the expect draw is what "completes" the knot. */
    mauve.forEach(m => {
      if (namedSet.has(m.el)) return
      const { t } = closestOnSamples(expectSamples, m.cx, m.cy)
      tl.to(m.el, {
        autoAlpha: 1, duration: 0.5, ease: 'back.out(1.6)',
      }, phase2DrawStart + drawTime(t, expectReversed, expectPhaseDur))
    })

    if (ornament.length > 0) {
      tl.to(ornament, {
        autoAlpha: 1, duration: 0.7, ease: 'power2.out',
      }, phase2DrawStart + expectPhaseDur)
    }


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
        <div className={styles.tangleClaim}>
          <p className={styles.srOnly}>
            Overwhelm is a tangle. Where unmet needs and internalized
            expectations clash.
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
            Where unmet needs and internalized expectations clash.
          </p>
        </div>

        <div className={styles.tangleStage}>
          <div
            ref={svgHostRef}
            className={styles.tangleSvgHost}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
      </div>
    </section>
  )
}
