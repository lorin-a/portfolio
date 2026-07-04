'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useDeckBuild } from '../useDeckBuild'
import f from '../frames.module.css'

/* SPECIMEN — the evidence register. The headline asserts what the artifact
   shows before the eye parses it; the annotations draw in one at a time so the
   audience can't outrun the narration. Draft content: the documentation screen
   that opens straight to capture. Headline + screen are Lorin's real material. */
export default function SpecimenFrame({ active, step }) {
  const root = useRef(null)

  useDeckBuild({
    scope: root,
    active,
    step,
    build(tl) {
      gsap.set('[data-head]', { autoAlpha: 0, y: 22 })
      gsap.set('[data-phone]', { autoAlpha: 0, y: 30, scale: 0.97, transformOrigin: 'center' })
      gsap.set('[data-annot]', { autoAlpha: 0, y: 14 })
      gsap.set('[data-leader]', { scaleX: 0 })

      // step 0 — the claim + the artifact
      tl.to('[data-head]', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to('[data-phone]', { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.35')
        .addLabel('step-0')
        // step 1 — first annotation
        .to('[data-annot="0"]', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05')
        .to('[data-leader="0"]', { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
        .addLabel('step-1')
        // step 2 — second annotation
        .to('[data-annot="1"]', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05')
        .to('[data-leader="1"]', { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.2')
        .addLabel('step-2')
    },
  })

  return (
    <div ref={root} className={`${f.frame} ${f.specimen}`}>
      <div className={f.specimenText}>
        <h2 data-head className={f.specimenHead}>
          The app opens straight into <em>note-taking</em>, the thing parents most wanted.
        </h2>
        <div className={f.annots}>
          <div data-annot="0" className={f.annot}>
            <div className={f.annotRow}>
              <span className={f.annotDot} aria-hidden="true" />
              <p className={f.annotLabel}>No triage screen</p>
            </div>
            <p className={f.annotText}>Nothing to answer first. The blank note is the front door.</p>
            <span data-leader="0" className={f.leader} aria-hidden="true" />
          </div>
          <div data-annot="1" className={f.annot}>
            <div className={f.annotRow}>
              <span className={f.annotDot} aria-hidden="true" />
              <p className={f.annotLabel}>One capture, many kinds</p>
            </div>
            <p className={f.annotText}>Medical, contextual, narrative, and feelings all land on one timeline.</p>
            <span data-leader="1" className={f.leader} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className={f.specimenStage}>
        <span data-phone className={f.phone}>
          <span className={f.phoneNotch} aria-hidden="true" />
          <span className={f.phoneScreen}>
            <img
              src="/images/birthstory/bs-doc-note.png"
              alt="The documentation screen: a blank note open for capture, with no form to complete first."
              draggable="false"
            />
          </span>
        </span>
      </div>
    </div>
  )
}
