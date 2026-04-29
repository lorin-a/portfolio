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

/* Layout is "held" if identical to its predecessor — no dots travel,
   only copy reveals. Held beats deserve a different motion grammar:
   no dot tweens, longer copy dwell, ambient breath gets the spotlight. */
function isHeldBeat(beat, prevLayoutName) {
  return beat.layout === prevLayoutName
}

export default function WhelmStory() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Initial state: title layout dots visible at title positions.
       All copy hidden. */
    snapToLayout(INITIAL_LAYOUT)
    gsap.set(`.${styles.copyBlock}`, { autoAlpha: 0, y: 12 })
    gsap.set(`.${styles.kind_lead}, .${styles.kind_h2_inline}`, {
      clipPath: 'inset(-0.2em 100% -0.2em 0)',
    })

    if (prefersReduced) {
      const finalName = BEATS.at(-1).layout
      snapToLayout(finalName)
      gsap.set(`[data-beat="${BEATS.at(-1).copyId}"] .${styles.copyBlock}`, {
        autoAlpha: 1, y: 0,
      })
      gsap.set(`.${styles.kind_lead}, .${styles.kind_h2_inline}`, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)',
      })
      return
    }

    /* ─── Intro animation (page load, one-shot) ───────────────── */
    const intro = gsap.timeline()

    intro.from('[data-dot-id]', {
      scale: 0,
      transformOrigin: 'center center',
      stagger: { each: 0.06, from: 'end' },
      ease: 'back.out(1.4)',
      duration: 0.95,
    })

    intro.fromTo(
      `.${styles.titleLine}`,
      { clipPath: 'inset(-0.2em 100% -0.2em 0)' },
      { clipPath: 'inset(-0.2em 0% -0.2em 0)', stagger: 0.18, duration: 1.0, ease: 'power2.inOut' },
      '-=0.6',
    )

    intro.to(
      `[data-beat="${INITIAL_COPY}"] .${styles.copyBlock}`,
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.7',
    )

    /* ─── Scroll timeline (beats) ───────────────────────────────
       Three sequenced phases per beat:
         A (0–25%):   outgoing copy fades out
         B (25–60%):  dot transitions (skip on held beats)
         C (60–100%): incoming copy reveals, sequenced

       Lead/h2_inline use clip-path wipe entrance (editorial). Other
       kinds use autoAlpha + small y. Easings vary by phase: copy
       transitions use power2 (more deliberate); dot travel uses
       power3.inOut (smoother arc); incoming dots use power2.out. */
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
      const held = isHeldBeat(beat, prevName)
      const diff = held ? null : diffLayouts(prevName, currName)

      const beatLabel = `beat-${beat.id}`
      tl.addLabel(beatLabel, '>')

      /* ── Phase A — outgoing copy fades out ──
         Held beats give Phase A more time (no dot work crowding it),
         transition beats keep it tight so the dots can land sooner. */
      const prevCopyId = i === 0 ? INITIAL_COPY : BEATS[i - 1].copyId
      const phaseA_dur = localDur * (held ? 0.30 : 0.22)
      if (prevCopyId) {
        const prevSel = `[data-beat="${prevCopyId}"]`
        const otherKinds = `${prevSel} .${styles.copyBlock}:not(.${styles.kind_lead}):not(.${styles.kind_h2_inline})`
        const wipeKinds = `${prevSel} .${styles.kind_lead}, ${prevSel} .${styles.kind_h2_inline}`

        tl.to(otherKinds, { autoAlpha: 0, y: -8, duration: phaseA_dur, ease: 'power2.in' }, beatLabel)
        tl.to(wipeKinds, {
          clipPath: 'inset(-0.2em 0% -0.2em 100%)',
          duration: phaseA_dur,
          ease: 'power2.in',
        }, beatLabel)
      }

      /* ── Phase B — dot transitions (skipped on held beats) ── */
      if (!held && diff) {
        const phaseB_start = `${beatLabel}+=${localDur * 0.25}`
        const phaseB_dur = localDur * 0.4

        diff.forEach(d => {
          const node = `[data-dot-id="${d.id}"]`
          if (d.state === 'carrying') {
            tl.to(node, {
              x: d.target.x, y: d.target.y, scale: d.target.scale,
              opacity: 1,
              duration: phaseB_dur,
              ease: 'power3.inOut',
            }, phaseB_start)
          } else if (d.state === 'incoming') {
            tl.set(node, {
              x: d.target.x, y: d.target.y, scale: d.target.scale,
            }, phaseB_start)
            tl.to(node, {
              opacity: 1,
              duration: phaseB_dur * 0.7,
              ease: 'power2.out',
            }, `${phaseB_start}+=${phaseB_dur * 0.2}`)
          } else if (d.state === 'outgoing') {
            tl.to(node, {
              opacity: 0,
              duration: phaseB_dur * 0.55,
              ease: 'power2.in',
            }, phaseB_start)
          }
        })
      }

      /* ── Phase C — incoming copy reveals, sequenced ──
         Editorial wipe for lead/h2_inline (clip-path, no y); soft
         lift for body/quote/note/tag (autoAlpha + y). Each block
         starts later than the last so the reader meets one phrase
         at a time as scroll progresses. */
      const phaseC_start = `${beatLabel}+=${localDur * (held ? 0.35 : 0.6)}`
      const phaseC_dur = localDur * (held ? 0.55 : 0.35)
      if (beat.copyId) {
        const blocks = COPY[beat.copyId] || []
        const blockDur = phaseC_dur * 0.5
        const stagger = blocks.length > 1
          ? (phaseC_dur - blockDur) / (blocks.length - 1)
          : 0

        blocks.forEach((block, idx) => {
          const sel = `[data-beat="${beat.copyId}"] [data-block-idx="${idx}"]`
          const at = `${phaseC_start}+=${stagger * idx}`
          const isWipe = block.kind === 'lead' || block.kind === 'h2_inline'

          if (isWipe) {
            tl.to(sel, { autoAlpha: 1, y: 0, duration: blockDur * 0.2, ease: 'power2.out' }, at)
            tl.to(sel, {
              clipPath: 'inset(-0.2em 0% -0.2em 0)',
              duration: blockDur,
              ease: 'power2.inOut',
            }, at)
          } else {
            tl.to(sel, {
              autoAlpha: 1, y: 0,
              duration: blockDur,
              ease: 'power2.out',
            }, at)
          }
        })
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      intro.kill()
    }
  }, { scope: sectionRef })

  /* Title block + scroll beats render together. Each block has a
     data-block-idx so the orchestrator can target it precisely. */
  const allCopyBeats = [
    { id: INITIAL_COPY, copyId: INITIAL_COPY },
    ...BEATS.filter(b => b.copyId),
  ]

  return (
    <section ref={sectionRef} className={styles.story}>
      <div className={styles.stage}>
        <div className={styles.canvasWrap}>
          <DotsCanvas ref={canvasRef} />
        </div>

        {allCopyBeats.map(beat => {
          const blocks = COPY[beat.copyId] || []
          return (
            <div key={beat.id} data-beat={beat.id} className={styles.copyLayer}>
              {blocks.map((block, i) => (
                <div
                  key={i}
                  data-block-idx={i}
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
