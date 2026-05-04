'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Stage from './elements/Stage'
import SidebarAgenda from './SidebarAgenda'
import { ELEMENT_REGISTRY } from './elements/registry'
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
  const sidebarRef = useRef(null)

  /* Whelm is a cinematic case study; the global portfolio nav competes
     with the hero composition. Mark the body for the route lifetime so
     globals.css can hide the nav while we're on /projects/whelm. */
  useEffect(() => {
    document.body.dataset.page = 'whelm'
    return () => {
      delete document.body.dataset.page
    }
  }, [])

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ─── Initial state ─── */
    snapToLayout(INITIAL_LAYOUT)
    gsap.set(`.${styles.copyBlock}`, { autoAlpha: 0, y: 12 })
    gsap.set(`.${styles.kind_lead}, .${styles.kind_h2_inline}`, {
      clipPath: 'inset(-0.2em 100% -0.2em 0)',
    })
    /* Scroll cue is the LAST beat of the intro — hide until everything
       else has landed. snapToLayout sets it to --eo: 1 by default. */
    gsap.set('[data-element-id="scroll-cue"]', { '--eo': 0 })

    /* Hero is full-bleed: sidebar starts hidden. The first beat's
       tl.call (offset slightly into the beat) will fade it in once
       scroll moves past hero. */
    if (sidebarRef.current) {
      sidebarRef.current.dataset.state = 'hidden'
    }

    if (prefersReduced) {
      const finalName = BEATS.at(-1).layout
      snapToLayout(finalName)
      gsap.set(`[data-beat="${BEATS.at(-1).copyId}"] .${styles.copyBlock}`, {
        autoAlpha: 1, y: 0,
      })
      gsap.set(`.${styles.kind_lead}, .${styles.kind_h2_inline}`, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)',
      })
      gsap.set('[data-char]', { maxWidth: 'none', opacity: 1 })
      gsap.set('[data-cursor]', { autoAlpha: 0 })
      if (sidebarRef.current) sidebarRef.current.dataset.state = 'visible'
      return
    }

    /* ─── Intro animation (page load, one-shot) ───────────────
       Calm, playful pacing — the wordmark types deliberately, the
       cursor lingers, the cursive draws on slowly alongside, then the
       tagline + scroll cue settle in once the type has landed. */
    const intro = gsap.timeline()

    /* Wordmark: chars start at max-width:0 (no layout space) and
       smoothly grow to their natural width with a soft ease, so the
       centered wordmark recenters as each char joins. Per-char widths
       measured at mount via scrollWidth (works under max-width: 0).
       Stagger 0.22s/char gives "whelm." (6 chars) ~1.3s of typing. */
    const charEls = gsap.utils.toArray('[data-char]')
    charEls.forEach((el, i) => {
      const naturalW = el.scrollWidth
      intro.to(
        el,
        {
          maxWidth: naturalW,
          opacity: 1,
          duration: 0.22,
          ease: 'power2.out',
        },
        0.6 + i * 0.22,
      )
    })

    /* Cursive flourish — slowed to 4.6s for a meditative pen pull
       across the canvas. Starts alongside the typing so both arrive
       in the same window. */
    intro.to(
      '[data-cursive-path]',
      { strokeDashoffset: 0, duration: 4.6, ease: 'sine.inOut' },
      0.5,
    )

    /* Tagline + scroll cue fade up after the wordmark fully types in
       (typing lands ~1.92s). Hold off ~0.4s so the wordmark has a
       beat alone before the rest joins. */
    intro.to(
      `[data-beat="${INITIAL_COPY}"] .${styles.copyBlock}`,
      { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.18 },
      2.3,
    )
    intro.to(
      `[data-beat="${INITIAL_COPY}"] .${styles.kind_lead}, [data-beat="${INITIAL_COPY}"] .${styles.kind_h2_inline}`,
      { clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 1.4, ease: 'power2.inOut' },
      2.4,
    )

    /* Cursor lingers ~1.2s after the period lands, then fades slowly
       over 1.1s — gives the page a moment to breathe before the
       cursor ducks out. */
    intro.to(
      '[data-cursor]',
      { autoAlpha: 0, duration: 1.1, ease: 'power2.out' },
      3.1,
    )

    /* Scroll cue lands LAST — after the tagline reveal completes and
       the cursor has ducked out. Soft fade so it doesn't compete with
       the wordmark's settle. */
    intro.to(
      '[data-element-id="scroll-cue"]',
      { '--eo': 1, duration: 0.9, ease: 'power2.out' },
      4.4,
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

      /* ── Sidebar update — fires slightly into the beat so progress 0
         leaves the hero in its initial full-bleed state. ── */
      tl.call(() => {
        const s = sidebarRef.current
        if (!s) return
        s.dataset.state = beat.fullBleed ? 'hidden' : 'visible'
        if (beat.section) s.dataset.activeSection = beat.section
      }, [], `${beatLabel}+=${localDur * 0.08}`)

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

      /* ── Phase ordering ──
         Default: B (element) → C (copy)
         elementOrder='after-copy': C (copy) → B (element). Storyboard
         calls for this on Section 3 — copy reveals first, diagram
         animates in last. */
      const elementAfterCopy = beat.elementOrder === 'after-copy'

      const phaseB_start = elementAfterCopy
        ? `${beatLabel}+=${localDur * 0.55}`
        : `${beatLabel}+=${localDur * 0.25}`
      const phaseB_dur = localDur * (elementAfterCopy ? 0.40 : 0.40)

      /* Phase C waits for Phase B to complete on transitional beats so
         element entrances (e.g., the OvercomeStack waterfall cascade)
         land before copy reveals. Held beats keep the earlier start
         since there's no element transition competing for attention. */
      const phaseC_start = elementAfterCopy
        ? `${beatLabel}+=${localDur * 0.20}`
        : `${beatLabel}+=${localDur * (held ? 0.30 : 0.68)}`
      const phaseC_dur = elementAfterCopy
        ? localDur * 0.35
        : localDur * (held ? 0.50 : 0.30)

      /* ── Phase B — element transitions (skipped on held beats) ── */
      if (!held && diff) {
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

            /* Entrance hook fires FIRST so any registered initial-state
               gsap.set runs before the wrapper's opacity ramps in.
               Without this ordering, inner content paints briefly at
               full opacity before its entrance timeline hides it. */
            const entry = ELEMENT_REGISTRY[d.id]
            if (entry?.entrance) {
              tl.call(() => {
                const el = document.querySelector(node)
                if (!el) return
                const innerTl = entry.entrance(el, {
                  duration: phaseB_dur * 0.85,
                })
                if (innerTl?.play) innerTl.play()
              }, [], phaseB_start)
            }

            tl.to(node, {
              '--eo': d.target.opacity ?? 1,
              duration: phaseB_dur * 0.4,
              ease: 'power2.out',
            }, `${phaseB_start}+=${phaseB_dur * 0.05}`)
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
            tl.to(sel, { autoAlpha: 1, y: 0, duration: blockDur * 0.3, ease: 'power2.out' }, at)
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

      /* ── Settle — reveal lands, hold visible before next beat exits ── */
      tl.to({}, { duration: localDur * 0.20 }, '>')
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

        <SidebarAgenda ref={sidebarRef} />

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
