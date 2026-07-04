'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import f from '../frames.module.css'

/* STATEMENT — the sparse register. The punchline carries the argument; the
   verbal channel stays free for Lorin to speak over it. Wonky Fraunces is
   permitted here (and only here). Draft content: Birth Story's cold open. */
export default function StatementFrame({ active, step }) {
  const root = useRef(null)

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-eyebrow]', { autoAlpha: 0, y: 16 })
      gsap.set('[data-fig]', { autoAlpha: 0, y: 26 })
      gsap.set('[data-cap]', { autoAlpha: 0, y: 20 })

      tl.to('[data-eyebrow]', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .to('[data-fig]', { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.2')
        .addLabel('step-0')
        .to('[data-cap]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '+=0.05')
        .addLabel('step-1')
    },
  })

  return (
    <div ref={root} className={`${f.frame} ${f.statement}`}>
      <p data-eyebrow className={f.eyebrow}>Birth Story · the punchline</p>
      <p data-fig className={f.statementFig}>
        <span>4</span>
        <span className={f.arrow} aria-hidden="true">→</span>
        <span className={f.to}>0</span>
      </p>
      <p data-cap className={f.statementCap}>questions before the first entry</p>
    </div>
  )
}
