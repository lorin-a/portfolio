'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.4 — The Tangle. "Overwhelm is a tangle."
   Lorin's hand-drawn weave: cream Needs thread + purple Expectations
   thread woven together, with paired needs/expectation labels at each
   knot. Threads draw on with spatially-timed labels — each marker
   fades in as the drawing tip reaches it. */

const TANGLE_SRC = '/brand/Newest_Tangle.svg'

export default function WhelmTangle() {
  const svgHostRef = useRef(null)
  const [svgMarkup, setSvgMarkup] = useState('')

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

  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    deps: [svgMarkup],
    build(tl, root) {
      const host = svgHostRef.current
      if (!host) return
      const svgEl = host.querySelector('svg')
      if (!svgEl) return

      svgEl.setAttribute('width', '100%')
      svgEl.setAttribute('height', '100%')
      svgEl.style.display = 'block'
      svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')

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

      /* Color routing — see commit history for full explanation.
         Cream stroke = needs thread + tendrils.
         Purple stroke = expectations thread + decor.
         Word fills (cream/purple) = labels.
         Mauve fill = intersection nodules. */
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

      const reorder = (el) => el && svgEl.appendChild(el)
      dots.forEach(reorder)
      needsWords.forEach(reorder)
      expectWords.forEach(reorder)

      const strokedPaths = [needsThread, expectThread].filter(Boolean)

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

      host.style.visibility = 'visible'

      if (prefersReducedMotion()) {
        strokedPaths.forEach(p => { p.style.strokeDashoffset = '0' })
        gsap.set([needsDecor, expectDecor, needsWords, expectWords, dots, ornament], { autoAlpha: 1 })
        snapClaim(root)
        return
      }

      /* Spatial timing — each marker fades in as the drawing tip
         reaches it (sample thread, find closest point per marker). */
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

      const needsReversed = needsSamples.length > 0
        && needsSamples[0].x > needsSamples[needsSamples.length - 1].x
      const expectReversed = expectSamples.length > 0
        && expectSamples[0].x < expectSamples[expectSamples.length - 1].x

      const drawTime = (t, reversed, phaseDur) =>
        (reversed ? 1 - t : t) * phaseDur

      if (needsThread && needsReversed) {
        const len = needsThread.getTotalLength()
        needsThread.style.strokeDashoffset = `-${len}`
      }
      if (expectThread && expectReversed) {
        const len = expectThread.getTotalLength()
        expectThread.style.strokeDashoffset = `-${len}`
      }

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

      const namedDur = 0.7
      const needsPhaseDur = 3.2
      const expectPhaseDur = 4.0

      /* Phase 1 — Needs (after the claim has landed) */
      const phase1NameStart = revealClaim(tl, root)
      const phase1DrawStart = phase1NameStart + namedDur
      if (needsHeader) {
        tl.to(needsHeader.el, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, phase1NameStart)
      }
      if (needsHeaderDot) {
        tl.to(needsHeaderDot.el, { autoAlpha: 1, duration: 0.55, ease: 'back.out(1.6)' }, phase1NameStart + 0.1)
      }
      if (needsThread) {
        tl.fromTo(needsThread,
          { strokeDashoffset: needsReversed ? -needsThread.getTotalLength() : needsThread.getTotalLength() },
          { strokeDashoffset: 0, duration: needsPhaseDur, ease: 'power1.inOut' },
          phase1DrawStart,
        )
      }
      needsDecor.forEach(el => {
        const { cx, cy } = centerOf(el)
        const { t } = closestOnSamples(needsSamples, cx, cy)
        tl.to(el, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          phase1DrawStart + drawTime(t, needsReversed, needsPhaseDur))
      })
      cream.forEach(m => {
        if (namedSet.has(m.el)) return
        const { t } = closestOnSamples(needsSamples, m.cx, m.cy)
        tl.to(m.el, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          phase1DrawStart + drawTime(t, needsReversed, needsPhaseDur) + 0.05)
      })

      /* Phase 2 — Expectations */
      const phase2NameStart = phase1DrawStart + needsPhaseDur + 0.5
      const phase2DrawStart = phase2NameStart + namedDur
      if (expectHeader) {
        tl.to(expectHeader.el, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, phase2NameStart)
      }
      if (expectHeaderDot) {
        tl.to(expectHeaderDot.el, { autoAlpha: 1, duration: 0.55, ease: 'back.out(1.6)' }, phase2NameStart + 0.1)
      }
      if (expectThread) {
        tl.fromTo(expectThread,
          { strokeDashoffset: expectReversed ? -expectThread.getTotalLength() : expectThread.getTotalLength() },
          { strokeDashoffset: 0, duration: expectPhaseDur, ease: 'power1.inOut' },
          phase2DrawStart,
        )
      }
      expectDecor.forEach(el => {
        const { cx, cy } = centerOf(el)
        const { t } = closestOnSamples(expectSamples, cx, cy)
        tl.to(el, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          phase2DrawStart + drawTime(t, expectReversed, expectPhaseDur))
      })
      purple.forEach(m => {
        if (namedSet.has(m.el)) return
        const { t } = closestOnSamples(expectSamples, m.cx, m.cy)
        tl.to(m.el, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          phase2DrawStart + drawTime(t, expectReversed, expectPhaseDur) + 0.05)
      })
      mauve.forEach(m => {
        if (namedSet.has(m.el)) return
        const { t } = closestOnSamples(expectSamples, m.cx, m.cy)
        tl.to(m.el, { autoAlpha: 1, duration: 0.5, ease: 'back.out(1.6)' },
          phase2DrawStart + drawTime(t, expectReversed, expectPhaseDur))
      })
      if (ornament.length > 0) {
        tl.to(ornament, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' },
          phase2DrawStart + expectPhaseDur)
      }
    },
  })

  return (
    <StickySection ref={sectionRef} id="tangle" track="long" stage="grid">
      <div className={styles.tangleSticky}>
        <LensClaim
          className={styles.tangleClaim}
          srText="Overwhelm is a tangle. Where unmet needs and internalized expectations clash."
          heading={<>Over<span className={styles.overwhelmKern}>w</span>helm is a <Accent>tangle</Accent>.</>}
          body="Where unmet needs and internalized expectations clash."
        />

        <div className={styles.tangleStage}>
          <div
            ref={svgHostRef}
            className={styles.tangleSvgHost}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
      </div>
    </StickySection>
  )
}
