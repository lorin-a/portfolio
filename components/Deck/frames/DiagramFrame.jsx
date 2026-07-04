'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import f from '../frames.module.css'

/* DIAGRAM — the structure register. Content-driven: a set of labeled items
   builds inside the graphic, then (optionally) a "turn" figure lands and
   (optionally) a destination node resolves. `collapse` decides whether the
   items FADE when the turn/dest arrives (the "cut" story, e.g. 4 → 0) or STAY
   lit (the "unify" story, e.g. scattered pieces → one ecosystem). Labels live
   inside the graphic; the reveal enacts the decision. */
export default function DiagramFrame({
  active, step, headline, gateLabel, items = [], turn, dest, collapse = false,
}) {
  const root = useRef(null)

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-head]', { autoAlpha: 0, y: 20 })
      gsap.set('[data-gate-label]', { autoAlpha: 0, y: 12 })
      gsap.set('[data-item]', { autoAlpha: 0, x: -24 })
      gsap.set('[data-turn]', { autoAlpha: 0, scale: 0.9, transformOrigin: 'center' })
      gsap.set('[data-dest]', { autoAlpha: 0, x: 24 })

      // step 0 — the items build
      tl.to('[data-head]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      if (gateLabel) tl.to('[data-gate-label]', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      tl.to('[data-item]', { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 }, '-=0.1')
        .addLabel('step-0')

      let s = 0
      const fadeItems = (at) => {
        if (collapse) tl.to('[data-item]', { autoAlpha: 0.16, scale: 0.96, x: 8, duration: 0.5, ease: 'power2.inOut', stagger: 0.05 }, at)
      }

      if (turn) {
        s += 1
        tl.to('[data-turn]', { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)' }, '+=0.1')
        fadeItems('-=0.3')
        tl.addLabel(`step-${s}`)
      }
      if (dest) {
        s += 1
        tl.to('[data-dest]', { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '+=0.05')
        if (!turn) fadeItems('-=0.4')
        tl.addLabel(`step-${s}`)
      }
    },
    deps: [headline, items.length, turn?.a, dest?.label, collapse],
  })

  return (
    <div ref={root} className={`${f.frame} ${f.diagram}`}>
      <h2 data-head className={f.diagramHead}>{headline}</h2>

      <div className={f.flow}>
        <div className={f.gate}>
          {gateLabel && <p data-gate-label className={f.eyebrow} style={{ fontSize: '1.3cqh' }}>{gateLabel}</p>}
          {items.map((it, i) => (
            <div data-item key={i} className={f.qcard}>
              {it.n != null && <span className={f.qcardNum}>{it.n}</span>}
              <p className={f.qcardText}>{it.label ? <b>{it.label}. </b> : null}{it.text}</p>
            </div>
          ))}
        </div>

        {turn && (
          <div data-turn className={f.turn}>
            <span className={f.turnFig}>{turn.a} <span aria-hidden="true">→</span> <span className={f.to}>{turn.b}</span></span>
            {turn.label && <span className={f.turnLabel}>{turn.label}</span>}
          </div>
        )}

        {dest && (
          <div data-dest className={f.dest}>
            <span className={f.destNode}><span className={f.destNodeLabel}>{dest.label}</span></span>
            {dest.sub && <p className={f.destSub}>{dest.sub}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
