'use client'

import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useInlineSvg } from '../lib/useInlineSvg'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.4 — The Tangle. "Overwhelm is a tangle."

   Lorin's hand-drawn tangle (NewTangle-5-13.svg) is a single continuous
   white-filled thread that loops between two poles: "Needs" on the left,
   "Expectations" on the right. Six mauve dots mark the crossings; six
   pill labels (Identity / Social Roles, Rest / Productivity, etc.) name
   what gets tangled together.

   Animation sequence (2026-05-14):

     1. Claim wipes in.
     2. "Needs" + "Expectations" frame labels fade in together —
        establishing the axis before the chaos.
     3. The thread reveals left-to-right via an SVG clipPath sweep;
        dots, pills, and inner pill labels pop in spatially-timed by
        their x position so each appears as the sweep arrives.

   SVG structure (15 paths + 18 circles + 6 rects):
     - path[fill="white"]: the thread (one big filled shape)
     - 18 circle: the 6 dots (3 stacked circles each — base, gradient,
       outline — at 6 unique positions)
     - 6 rect[fill="#1F0536"]: pill backgrounds for the labeled crossings
     - 7 path[fill="#F3EFF7"]: cream text — 6 inside pills, 1 standalone
       ("Needs", leftmost)
     - 7 path[fill="#BDB7E9"]: mauve elements — 1 standalone label
       ("Expectations", rightmost), 6 small decorations near the dots */

const TANGLE_SRC = '/brand/NewTangle-5-13.svg'

export default function WhelmTangle() {
  const { hostRef: svgHostRef, markup: svgMarkup } = useInlineSvg(TANGLE_SRC, {
    padding: 24,
  })

  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    deps: [svgMarkup],
    build(tl, root) {
      const host = svgHostRef.current
      if (!host) return
      const svgEl = host.querySelector('svg')
      if (!svgEl) return

      // Collect categorised elements. All <rect> elements in the SVG
      // are pill backgrounds — most are exported without a fill
      // attribute and get force-filled below.
      const thread = svgEl.querySelector('path[fill="white"]')
      const pills = Array.from(svgEl.querySelectorAll('rect'))
      const circles = Array.from(svgEl.querySelectorAll('circle'))
      const creamFills = Array.from(svgEl.querySelectorAll('path[fill="#F3EFF7"]'))
      const mauveFills = Array.from(svgEl.querySelectorAll('path[fill="#BDB7E9"]'))

      // A label is "framing" (Needs / Expectations) if its centre sits
      // outside every pill rect. Inside-a-pill = inner pill label.
      // The mauve paths inside pills are the second half of each label
      // (e.g. "/ Social Roles") — animated together with the cream
      // first-word so the full phrase reads as one unit.
      const centerOf = el => {
        const b = el.getBBox()
        return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 }
      }
      const pillBoxes = pills.map(p => p.getBBox())
      const isInsideAnyPill = el => {
        const { cx, cy } = centerOf(el)
        return pillBoxes.some(
          b => cx >= b.x && cx <= b.x + b.width && cy >= b.y && cy <= b.y + b.height,
        )
      }

      const allLabels = [...creamFills, ...mauveFills]
      const frameLabels = allLabels.filter(el => !isInsideAnyPill(el))
      const innerLabels = allLabels.filter(isInsideAnyPill)

      // Force-fill the pill rects so the thread doesn't show through.
      pills.forEach(r => r.setAttribute('fill', '#1F0536'))

      // Restacking — thread (bottom) → pills → circles (dots) →
      // inner labels → frame labels (top). Last appended renders on
      // top in SVG.
      const append = el => el && svgEl.appendChild(el)
      append(thread)
      pills.forEach(append)
      circles.forEach(append)
      innerLabels.forEach(append)
      frameLabels.forEach(append)

      // Spatial timing extent — left edge to right edge of all dots
      // and pills, so the sequential reveal traces left → right.
      const xs = [...circles.map(c => parseFloat(c.getAttribute('cx'))),
                  ...pills.map(p => centerOf(p).cx)]
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const xRange = Math.max(1, maxX - minX)

      // Reveal/hide initial state — claim & frame labels handled
      // explicitly; everything else hidden until Beat 3.
      gsap.set(frameLabels, { autoAlpha: 0, y: 8 })
      gsap.set(thread, { autoAlpha: 0 })
      gsap.set([...circles, ...pills, ...innerLabels], { autoAlpha: 0, y: 8 })

      host.style.visibility = 'visible'

      if (prefersReducedMotion()) {
        gsap.set(
          [...frameLabels, thread, ...circles, ...pills, ...innerLabels],
          { autoAlpha: 1, y: 0 },
        )
        snapClaim(root)
        return
      }

      // Build the timeline against an internal "tangle" label so the
      // claim sub-timeline (which uses absolute positions starting at
      // 0) doesn't collide with our beat positioning.
      revealClaim(tl, root, { start: 0 })

      // Anchor everything after claim with a label, then chain via
      // relative "+=" offsets — empirically more reliable than passing
      // absolute numeric positions when multiple tweens target nested
      // SVG elements.
      tl.addLabel('framesIn', '+=0.3')

      // Beat 2 — Needs + Expectations frame labels reveal together.
      tl.to(
        frameLabels,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        'framesIn',
      )

      tl.addLabel('sweep', 'framesIn+=1.0')

      // Beat 3 — thread fades in across the full sweep window; dots,
      // pills, and inner labels appear in left-to-right order via
      // per-element labels offset from `sweep`.
      const sweepDuration = 3.0
      const offsetAt = x => `sweep+=${(((x - minX) / xRange) * sweepDuration).toFixed(3)}`

      tl.to(
        thread,
        { autoAlpha: 1, duration: sweepDuration, ease: 'power1.inOut' },
        'sweep',
      )

      // Group circles by (cx, cy) — 3 stacked circles per dot.
      const circleByPos = new Map()
      circles.forEach(c => {
        const key = `${c.getAttribute('cx')},${c.getAttribute('cy')}`
        if (!circleByPos.has(key)) circleByPos.set(key, [])
        circleByPos.get(key).push(c)
      })
      circleByPos.forEach(group => {
        const cx = parseFloat(group[0].getAttribute('cx'))
        tl.to(
          group,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' },
          offsetAt(cx),
        )
      })

      // Pills + their inner labels — pill lands a hair before its
      // label so the badge "arrives" then the word settles inside.
      pills.forEach(pill => {
        const { cx } = centerOf(pill)
        tl.to(
          pill,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          offsetAt(cx),
        )
      })
      innerLabels.forEach(el => {
        const { cx } = centerOf(el)
        const offset = ((cx - minX) / xRange) * sweepDuration + 0.12
        tl.to(
          el,
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          `sweep+=${offset.toFixed(3)}`,
        )
      })
    },
  })

  return (
    <StickySection ref={sectionRef} id="tangle" track="long" stage="grid">
      <div className={styles.tangleSticky}>
        <LensClaim
          className={styles.tangleClaim}
          srText="Overwhelm is a tangle. Where unmet needs and internalized expectations clash."
          heading={
            <>
              Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
              <Accent>tangle</Accent>.
            </>
          }
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
