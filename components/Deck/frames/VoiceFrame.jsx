'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import { renderText } from '../text'
import f from '../frames.module.css'

/* VOICE — the human register. Content-driven: when the quote is the specimen,
   show it and stop. `placeholder` marks a quote slot still awaiting Lorin's
   words — rendered honestly as a to-write prompt, never a fabricated quote. */
export default function VoiceFrame({ active, step, chip, quote, attribution, placeholder = false }) {
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
      if (attribution) {
        tl.to('[data-attr]', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.1')
          .addLabel('step-1')
      }
    },
    deps: [Boolean(attribution), placeholder],
  })

  return (
    <figure ref={root} className={`${f.frame} ${f.voice}`} style={{ margin: 0 }}>
      <figcaption data-chip className={f.voiceChip}>{chip}</figcaption>
      {placeholder ? (
        <blockquote data-quote className={f.voiceQuote} style={{ margin: 0 }}>
          <span className={f.toWrite}>Lorin to write</span>
          <span className={f.voiceQuotePlaceholder}>{quote}</span>
        </blockquote>
      ) : (
        <blockquote data-quote className={f.voiceQuote} style={{ margin: 0 }}>“{renderText(quote)}”</blockquote>
      )}
      {attribution && <p data-attr className={f.voiceAttr}>{renderText(attribution)}</p>}
    </figure>
  )
}
