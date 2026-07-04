'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import f from '../frames.module.css'

/* STATEMENT — the sparse register. Content-driven: opens either on a FIGURE
   (a big "from → to", e.g. 4 → 0) or on a LINE (a single assertion sentence).
   Wonky Fraunces is permitted here and only here. */
export default function StatementFrame({ active, step, eyebrow, figure, headline, caption }) {
  const root = useRef(null)

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-eyebrow]', { autoAlpha: 0, y: 16 })
      gsap.set('[data-hero]', { autoAlpha: 0, y: 26 })
      gsap.set('[data-cap]', { autoAlpha: 0, y: 20 })

      if (eyebrow) tl.to('[data-eyebrow]', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      tl.to('[data-hero]', { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, eyebrow ? '-=0.2' : 0)
        .addLabel('step-0')
      if (caption) {
        tl.to('[data-cap]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '+=0.05')
          .addLabel('step-1')
      }
    },
    deps: [figure?.from, figure?.to, headline, caption],
  })

  return (
    <div ref={root} className={`${f.frame} ${f.statement}`}>
      {eyebrow && <p data-eyebrow className={f.eyebrow}>{eyebrow}</p>}

      {figure ? (
        <p data-hero className={f.statementFig}>
          <span>{figure.from}</span>
          <span className={f.arrow} aria-hidden="true">→</span>
          <span className={f.to}>{figure.to}</span>
        </p>
      ) : (
        <h2 data-hero className={f.statementLine}>{headline}</h2>
      )}

      {caption && <p data-cap className={figure ? f.statementCap : f.statementCap}>{caption}</p>}
    </div>
  )
}
