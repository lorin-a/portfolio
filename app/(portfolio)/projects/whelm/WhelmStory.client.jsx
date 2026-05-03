'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Stage from './elements/Stage'
import { COPY } from './content'
import {
  ELEMENT_IDS, LAYOUTS, BEATS, TOTAL_VH,
  INITIAL_LAYOUT, INITIAL_COPY,
} from './data'
import styles from './whelm.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Snap every element to its initial state per the given layout.
   Elements present in the layout sit at full opacity at their xy/scale.
   Elements absent sit invisible. The orchestrator drives CSS custom
   properties; .element wrappers resolve them in transform/left/top. */
function snapToLayout(layoutName) {
  const layout = LAYOUTS[layoutName] || {}
  ELEMENT_IDS.forEach(id => {
    const target = layout[id]
    const node = `[data-element-id="${id}"]`
    if (target) {
      gsap.set(node, {
        '--ex': target.x,
        '--ey': target.y,
        '--es': target.scale,
        '--eo': target.opacity ?? 1,
      })
    } else {
      gsap.set(node, { '--eo': 0 })
    }
  })
}

/* Per-element diff between two layouts.
   carrying:  present in both — travel between positions
   incoming:  present in current only — snap to position, fade in
   outgoing:  present in prev only — fade out in place
   absent:    in neither — already invisible, do nothing */
function diffLayouts(prevName, currName) {
  const prev = LAYOUTS[prevName] || {}
  const curr = LAYOUTS[currName] || {}
  return ELEMENT_IDS.map(id => {
    const p = prev[id]
    const c = curr[id]
    if (p && c) return { id, state: 'carrying', target: c }
    if (!p && c) return { id, state: 'incoming', target: c }
    if (p && !c) return { id, state: 'outgoing' }
    return { id, state: 'absent' }
  })
}

function isHeldBeat(beat, prevLayoutName) {
  return beat.layout === prevLayoutName
}

export default function WhelmStory() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Initial state. */
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

    /* ─── Intro animation (page load, one-shot) ─────────────── */
    const intro = gsap.timeline()
    intro.to(
      `[data-beat="${INITIAL_COPY}"] .${styles.copyBlock}`,
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 },
      0.4,
    )
    intro.to(
      `[data-beat="${INITIAL_COPY}"] .${styles.kind_lead}, [data-beat="${INITIAL_COPY}"] .${styles.kind_h2_inline}`,
      { clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 1.0, ease: 'power2.inOut' },
      0.5,
    )

    /* ─── Pinned scrub timeline ─────────────────────────────── */
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
      const prevCopyId = i === 0 ? INITIAL_COPY : BEATS[i - 1].copyId
      const beatLabel = `beat-${beat.id}`
      tl.addLabel(beatLabel, '>')

      /* ── Phase A — outgoing copy fades out ── */
      const phaseA_dur = localDur * (held ? 0.30 : 0.22)
      if (prevCopyId && prevCopyId !== beat.copyId) {
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

      /* ── Phase A.5 — apply per-beat attrs (held morph) ── */
      if (beat.attrs) {
        tl.call(() => {
          Object.entries(beat.attrs).forEach(([elId, attrMap]) => {
            const el = document.querySelector(`[data-element-id="${elId}"]`)
            if (!el) return
            Object.entries(attrMap).forEach(([k, v]) => el.setAttribute(k, v))
          })
        }, [], `${beatLabel}+=${localDur * 0.15}`)
      }

      /* ── Phase B — element transitions (skipped on held beats) ── */
      if (!held && diff) {
        const phaseB_start = `${beatLabel}+=${localDur * 0.25}`
        const phaseB_dur = localDur * 0.4

        diff.forEach(d => {
          const node = `[data-element-id="${d.id}"]`
          if (d.state === 'carrying') {
            tl.to(node, {
              '--ex': d.target.x,
              '--ey': d.target.y,
              '--es': d.target.scale,
              '--eo': d.target.opacity ?? 1,
              duration: phaseB_dur,
              ease: 'power3.inOut',
            }, phaseB_start)
          } else if (d.state === 'incoming') {
            tl.set(node, {
              '--ex': d.target.x,
              '--ey': d.target.y,
              '--es': d.target.scale,
            }, phaseB_start)
            tl.to(node, {
              '--eo': d.target.opacity ?? 1,
              duration: phaseB_dur * 0.7,
              ease: 'power2.out',
            }, `${phaseB_start}+=${phaseB_dur * 0.2}`)
          } else if (d.state === 'outgoing') {
            tl.to(node, {
              '--eo': 0,
              duration: phaseB_dur * 0.55,
              ease: 'power2.in',
            }, phaseB_start)
          }
        })
      }

      /* ── Phase C — incoming copy reveals, sequenced ── */
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

  /* Render initial copy beat + every scroll beat. data-block-idx
     lets the orchestrator target each block precisely. */
  const allCopyBeats = [
    { id: INITIAL_COPY, copyId: INITIAL_COPY },
    ...BEATS.filter(b => b.copyId),
  ]

  return (
    <section ref={sectionRef} className={styles.story}>
      <div className={styles.stage}>
        <Stage />

        {allCopyBeats.map(beat => {
          const blocks = COPY[beat.copyId] || []
          return (
            <div key={beat.id} data-beat={beat.id} className={styles.copyLayer}>
              {blocks.map((block, i) => (
                <div
                  key={i}
                  data-block-idx={i}
                  className={`${styles.copyBlock} ${styles[`pos_${block.position}`] || ''} ${styles[`kind_${block.kind}`] || ''}`}
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
