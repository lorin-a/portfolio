'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import f from '../frames.module.css'

/* DIAGRAM — the structure register. Labels live inside the graphic; the reveal
   enacts the decision rather than describing it: the branching gate builds,
   then collapses, and the path opens straight to a first entry. Draft content:
   the 4 → 0 architecture confrontation. The four gate prompts are draft anchors
   compressed from Lorin's real V1 questionnaire (exact wording is hers). */

const GATE = [
  'Where are you — before, during, or after?',
  'At home, or in the hospital?',
  'The parent, or a support person?',
  'New here, or returning to reflect?',
]

export default function DiagramFrame({ active, step }) {
  const root = useRef(null)

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-head]', { autoAlpha: 0, y: 20 })
      gsap.set('[data-gate-label]', { autoAlpha: 0, y: 12 })
      gsap.set('[data-qcard]', { autoAlpha: 0, x: -24 })
      gsap.set('[data-turn]', { autoAlpha: 0, scale: 0.9, transformOrigin: 'center' })
      gsap.set('[data-dest]', { autoAlpha: 0, x: 24 })

      // step 0 — the problem: a gate of questions before anything
      tl.to('[data-head]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to('[data-gate-label]', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .to('[data-qcard]', { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 }, '-=0.1')
        .addLabel('step-0')
        // step 1 — the cut: 4 → 0, the gate collapses
        .to('[data-turn]', { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(1.5)' }, '+=0.1')
        .to('[data-qcard]', { autoAlpha: 0.16, scale: 0.96, x: 8, duration: 0.5, ease: 'power2.inOut', stagger: 0.05 }, '-=0.3')
        .addLabel('step-1')
        // step 2 — the resolution: straight to a first entry
        .to('[data-dest]', { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '+=0.05')
        .addLabel('step-2')
    },
  })

  return (
    <div ref={root} className={`${f.frame} ${f.diagram}`}>
      <h2 data-head className={f.diagramHead}>
        The app opens straight into documentation, with no home screen and <em>nothing to answer first</em>.
      </h2>

      <div className={f.flow}>
        <div className={f.gate}>
          <p data-gate-label className={f.eyebrow} style={{ fontSize: '1.3cqh' }}>v1 · branching questionnaire</p>
          {GATE.map((q, i) => (
            <div data-qcard key={i} className={f.qcard}>
              <span className={f.qcardNum}>{i + 1}</span>
              <p className={f.qcardText}>{q}</p>
            </div>
          ))}
        </div>

        <div data-turn className={f.turn}>
          <span className={f.turnFig}>4 <span aria-hidden="true">→</span> <span className={f.to}>0</span></span>
          <span className={f.turnLabel}>questions before the first entry</span>
        </div>

        <div data-dest className={f.dest}>
          <span className={f.destNode}>
            <span className={f.destNodeLabel}>New note</span>
          </span>
          <p className={f.destSub}>Nothing to answer before beginning.</p>
        </div>
      </div>
    </div>
  )
}
