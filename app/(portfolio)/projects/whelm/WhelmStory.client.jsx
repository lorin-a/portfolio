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

/* Snap every dot to its initial state per the given layout. Dots
   present in the layout sit at full opacity at their xyScale. Dots
   absent sit invisible (opacity 0). */
function snapToLayout(layoutName) {
  const layout = LAYOUTS[layoutName] || {}
  ALL_DOTS.forEach(dot => {
    const target = layout[dot.id]
    const node = `[data-dot-id="${dot.id}"]`
    if (target) {
      gsap.set(node, {
        x: target.x, y: target.y, scale: target.scale, opacity: 1,
      })
    } else {
      gsap.set(node, { opacity: 0, scale: 0 })
    }
  })
}

/* Per-dot state diff between two layouts.
   carrying:  present in both — travel between positions
   incoming:  present in current only — snap to position, fade in
   outgoing:  present in prev only — fade out in place
   absent:    in neither — already invisible, do nothing */
function diffLayouts(prevName, currName) {
  const prev = LAYOUTS[prevName] || {}
  const curr = LAYOUTS[currName] || {}
  return ALL_DOTS.map(dot => {
    const p = prev[dot.id]
    const c = curr[dot.id]
    if (p && c) return { id: dot.id, state: 'carrying', target: c }
    if (!p && c) return { id: dot.id, state: 'incoming', target: c }
    if (p && !c) return { id: dot.id, state: 'outgoing' }
    return { id: dot.id, state: 'absent' }
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
      /* Render the truth-state as a single static frame. */
      const finalName = BEATS.at(-1).layout
      snapToLayout(finalName)
      gsap.set(`[data-beat="truth"] .${styles.copyBlock}`, { autoAlpha: 1, y: 0 })
      return
    }

    /* ─── Intro animation (page load, one-shot) ─────────────────
       Dots in the title layout scale in from 0; title lines wipe
       in staggered; subtitle fades up. */
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
       Each beat span has three sequenced phases so the reader
       reads outgoing → watches dot motion → reads incoming.

         Phase A (0–25%):   outgoing copy fades out
         Phase B (25–65%):  dots transition (carry/in/out)
         Phase C (65–100%): incoming copy reveals, staggered

       This editorial pacing replaces the prior simultaneous
       fade-and-move pattern. */
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
      const prevName = i === 0 ? INITIAL_LAYOUT : BEATS[i - 1].layout
      const currName = beat.layout
      const diff = diffLayouts(prevName, currName)

      const beatLabel = `beat-${beat.id}`
      tl.addLabel(beatLabel, '>')

      /* Phase A — outgoing copy fades out. */
      const prevCopyId = i === 0 ? INITIAL_COPY : BEATS[i - 1].copyId
      const phaseA_dur = localDur * 0.25
      if (prevCopyId) {
        tl.to(
          `[data-beat="${prevCopyId}"] .${styles.copyBlock}`,
          { autoAlpha: 0, y: -8, duration: phaseA_dur, ease: 'power1.inOut' },
          beatLabel,
        )
      }

      /* Phase B — dot transitions. Carrying dots travel; outgoing
         dots fade in place; incoming dots snap-position then fade in. */
      const phaseB_start = `${beatLabel}+=${localDur * 0.25}`
      const phaseB_dur = localDur * 0.4

      diff.forEach(d => {
        const node = `[data-dot-id="${d.id}"]`
        if (d.state === 'carrying') {
          tl.to(
            node,
            {
              x: d.target.x, y: d.target.y, scale: d.target.scale,
              opacity: 1,
              duration: phaseB_dur,
              ease: 'power1.inOut',
            },
            phaseB_start,
          )
        } else if (d.state === 'incoming') {
          tl.set(
            node,
            { x: d.target.x, y: d.target.y, scale: d.target.scale },
            phaseB_start,
          )
          tl.to(
            node,
            {
              opacity: 1,
              duration: phaseB_dur * 0.7,
              ease: 'power1.inOut',
            },
            `${phaseB_start}+=${phaseB_dur * 0.2}`,
          )
        } else if (d.state === 'outgoing') {
          tl.to(
            node,
            {
              opacity: 0,
              duration: phaseB_dur * 0.55,
              ease: 'power1.inOut',
            },
            phaseB_start,
          )
        }
      })

      /* Phase C — incoming copy reveals, staggered by document order
         in COPY[beatId] so the reader meets blocks one at a time. */
      const phaseC_start = `${beatLabel}+=${localDur * 0.65}`
      const phaseC_dur = localDur * 0.35
      if (beat.copyId) {
        const blocks = COPY[beat.copyId] || []
        const blockDur = phaseC_dur * 0.45
        const stagger = blocks.length > 1
          ? (phaseC_dur - blockDur) / (blocks.length - 1)
          : 0

        tl.to(
          `[data-beat="${beat.copyId}"] .${styles.copyBlock}`,
          {
            autoAlpha: 1, y: 0,
            duration: blockDur,
            stagger,
            ease: 'power1.inOut',
          },
          phaseC_start,
        )
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      intro.kill()
    }
  }, { scope: sectionRef })

  /* Title block uses INITIAL_COPY; remaining beats render their copy. */
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
