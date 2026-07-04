'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import { renderText } from '../text'
import f from '../frames.module.css'

/* SPECIMEN — the evidence register. Content-driven: an asserting headline, one
   artifact (a phone screen for app work, or a framed photo/flat artifact for
   everything else), and annotations whose dotted leaders draw in one at a time
   so the audience can't outrun the narration. */
export default function SpecimenFrame({ active, step, headline, media, annotations = [] }) {
  const root = useRef(null)
  const isPhone = media?.kind === 'phone'

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-head]', { autoAlpha: 0, y: 22 })
      gsap.set('[data-media]', { autoAlpha: 0, y: 30, scale: 0.97, transformOrigin: 'center' })
      gsap.set('[data-annot]', { autoAlpha: 0, y: 14 })
      gsap.set('[data-leader]', { scaleX: 0 })

      tl.to('[data-head]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to('[data-media]', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.35')
        .addLabel('step-0')

      annotations.forEach((_, i) => {
        tl.to(`[data-annot="${i}"]`, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05')
          .to(`[data-leader="${i}"]`, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
          .addLabel(`step-${i + 1}`)
      })
    },
    deps: [media?.kind, annotations.length],
  })

  return (
    <div ref={root} className={`${f.frame} ${f.specimen}`}>
      <div className={f.specimenText}>
        <h2 data-head className={f.specimenHead}>{renderText(headline)}</h2>
        {annotations.length > 0 && (
          <div className={f.annots}>
            {annotations.map((a, i) => (
              <div data-annot={i} key={i} className={f.annot}>
                <div className={f.annotRow}>
                  <span className={f.annotDot} aria-hidden="true" />
                  <p className={f.annotLabel}>{renderText(a.label)}</p>
                </div>
                {a.text && <p className={f.annotText}>{renderText(a.text)}</p>}
                <span data-leader={i} className={f.leader} aria-hidden="true" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={f.specimenStage}>
        {isPhone ? (
          <span data-media className={f.phone}>
            <span className={f.phoneNotch} aria-hidden="true" />
            <span className={f.phoneScreen}>
              <img src={media.src} alt={media.alt} draggable="false" />
            </span>
          </span>
        ) : (
          <span data-media className={f.mediaImage}>
            <img src={media?.src} alt={media?.alt} draggable="false" />
          </span>
        )}
      </div>
    </div>
  )
}
