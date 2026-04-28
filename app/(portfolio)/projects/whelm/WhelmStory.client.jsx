'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import DotsCanvas from './DotsCanvas'
import { COPY } from './content'
import {
  ALL_DOTS, LAYOUTS, BEATS, TOTAL_VH,
  INITIAL_LAYOUT, INITIAL_COPY,
} from './data'
import styles from './whelm.module.css'

gsap.registerPlugin(useGSAP)

const offstage = { x: 500, y: 700, scale: 0, opacity: 0 }

/* Snap every dot to a layout's specified position (or offstage if absent). */
function snapToLayout(layoutName) {
  const layout = LAYOUTS[layoutName] || {}
  ALL_DOTS.forEach(dot => {
    const target = layout[dot.id] || offstage
    gsap.set(`[data-dot-id="${dot.id}"]`, {
      x: target.x, y: target.y, scale: target.scale,
      opacity: target.opacity ?? 1,
    })
  })
}

export default function WhelmStory() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Set every dot's initial state from the title layout. Hide all copy. */
    snapToLayout(INITIAL_LAYOUT)
    gsap.set(`.${styles.copyBlock}`, { autoAlpha: 0, y: 12 })

    if (prefersReduced) {
      /* Reduced motion: render the truth-state as a single static frame. */
      const finalLayoutName = BEATS.at(-1).layout
      const finalLayout = LAYOUTS[finalLayoutName] || {}
      ALL_DOTS.forEach(dot => {
        const target = finalLayout[dot.id] || offstage
        gsap.set(`[data-dot-id="${dot.id}"]`, {
          x: target.x, y: target.y, scale: target.scale,
          opacity: target.opacity ?? 1,
        })
      })
      gsap.set(`[data-beat="truth"] .${styles.copyBlock}`, { autoAlpha: 1, y: 0 })
      return
    }

    /* ─── Intro animation (page load, one-shot) ─────────────────
       Dots already in title layout via snapToLayout, but their
       scale was set; we re-tween from scale: 0 for the entrance.
       Title copy wipes in line by line. */
    const intro = gsap.timeline()

    intro.from('[data-dot-id]', {
      scale: 0,
      transformOrigin: 'center center',
      stagger: { each: 0.06, from: 'end' },
      ease: 'back.out(1.4)',
      duration: 0.9,
    })

    intro.fromTo(
      `.${styles.titleLine}`,
      { clipPath: 'inset(-0.2em 100% -0.2em 0)' },
      { clipPath: 'inset(-0.2em 0% -0.2em 0)', stagger: 0.18, duration: 0.95, ease: 'power1.inOut' },
      '-=0.55',
    )

    intro.to(
      `[data-beat="${INITIAL_COPY}"] .${styles.copyBlock}`,
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.inOut' },
      '-=0.7',
    )

    /* ─── Scroll timeline (beats) ───────────────────────────────
       First beat tweens FROM title state INTO thought, fading
       title copy out as it goes. */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${TOTAL_VH}%`,
        pin: true,
        pinType: 'transform',
        scrub: 0.6,
        anticipatePin: 1,
      },
    })

    BEATS.forEach((beat, i) => {
      const localDur = beat.span / TOTAL_VH
      const layout = LAYOUTS[beat.layout] || {}
      const beatLabel = `beat-${beat.id}`
      tl.addLabel(beatLabel, '>')

      /* Tween every dot to its layout target (or offstage). All
         dot tweens overlap perfectly within this beat span. */
      ALL_DOTS.forEach(dot => {
        const target = layout[dot.id] || offstage
        tl.to(
          `[data-dot-id="${dot.id}"]`,
          {
            x: target.x, y: target.y, scale: target.scale,
            opacity: target.opacity ?? 1,
            duration: localDur, ease: 'power1.inOut',
          },
          beatLabel,
        )
      })

      /* Fade prior copy out (first beat fades out the title copy). */
      const prevCopyId = i === 0 ? INITIAL_COPY : BEATS[i - 1].copyId
      if (prevCopyId) {
        tl.to(
          `[data-beat="${prevCopyId}"] .${styles.copyBlock}`,
          { autoAlpha: 0, y: -8, duration: localDur * 0.4, ease: 'power1.inOut' },
          beatLabel,
        )
      }

      /* Fade this beat's copy in slightly later in the span so copy
         and dot motion feel coupled rather than simultaneous. */
      if (beat.copyId) {
        tl.to(
          `[data-beat="${beat.copyId}"] .${styles.copyBlock}`,
          { autoAlpha: 1, y: 0, duration: localDur * 0.6, ease: 'power1.inOut' },
          `${beatLabel}+=${localDur * 0.4}`,
        )
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      intro.kill()
    }
  }, { scope: sectionRef })

  /* Combine title + scroll beats for rendering. Title block is just
     another data-beat container so the orchestrator can address it. */
  const allCopyBeats = [
    { id: INITIAL_COPY, copyId: INITIAL_COPY },
    ...BEATS.filter(b => b.copyId),
  ]

  return (
    <section ref={sectionRef} className={styles.story}>
      <div className={styles.stage}>
        <DotsCanvas ref={canvasRef} />

        {allCopyBeats.map(beat => {
          const blocks = COPY[beat.copyId] || []
          return (
            <div key={beat.id} data-beat={beat.id} className={styles.copyLayer}>
              {blocks.map((block, i) => (
                <div
                  key={i}
                  className={`${styles.copyBlock} ${styles[`pos_${block.position}`]} ${styles[`kind_${block.kind}`]}`}
                >
                  {block.kind === 'h1'
                    ? <TitleLines html={block.html} />
                    : <span dangerouslySetInnerHTML={{ __html: block.html }} />}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* Wrap each <br>-separated line of the title in a span so we can
   stagger-wipe them in. */
function TitleLines({ html }) {
  const lines = html.split(/<br\s*\/?>/i)
  return (
    <h1 className={styles.titleH1}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={styles.titleLine}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </h1>
  )
}
