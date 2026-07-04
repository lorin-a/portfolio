'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import f from '../frames.module.css'

/* VOICE — the human register. When the quote is the specimen, show it and stop
   talking. The periwinkle chip is the testers' voice in the study's color
   system. Draft content: a verbatim parent-tester quote, its attribution kept
   role-only per the study's attribution policy. */
export default function VoiceFrame({ active, step }) {
  const root = useRef(null)

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-chip]', { autoAlpha: 0, y: 14 })
      gsap.set('[data-quote]', { autoAlpha: 0, y: 22 })
      gsap.set('[data-attr]', { autoAlpha: 0, y: 12 })

      tl.to('[data-chip]', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
        .to('[data-quote]', { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.1')
        .addLabel('step-0')
        .to('[data-attr]', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.1')
        .addLabel('step-1')
    },
  })

  return (
    <figure ref={root} className={`${f.frame} ${f.voice}`} style={{ margin: 0 }}>
      <figcaption data-chip className={f.voiceChip}>a tester said</figcaption>
      <blockquote data-quote className={f.voiceQuote} style={{ margin: 0 }}>
        “It would be tragic to lose these moments if the app went away.”
      </blockquote>
      <p data-attr className={f.voiceAttr}>Parent tester · on the keepsake book</p>
    </figure>
  )
}
