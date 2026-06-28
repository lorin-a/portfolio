'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './EvolutionViewer.module.css'

/* ============================================================================
   EvolutionViewer — the iteration, told at two zoom levels.

   Lorin's note: it's good to learn a system zoomed-out to zoomed-in, from
   systems to interactions — the diversification tells the bigger story. So:

   1. THE SYSTEM (zoomed out) — the whole onboarding flow at each version, every
      screen laid out, with the feedback that came in and the change it drove.
   2. UP CLOSE (zoomed in) — one interaction in Lorin's own slide-deck annotation
      style: a titled panel, a couple of screens, labelled callouts on dotted
      leaders, a studio credit line.

   Onboarding feedback + the Care Pod annotations are Lorin's verbatim words;
   "what changed" lines are my distillation. All hers to bless. Everything is in
   the DOM and scrollable; reduced motion only skips the entrance fade.
   ============================================================================ */

const VERSIONS = [
  {
    id: 'v1', label: 'V1', tag: 'First wireframes',
    was: 'Every tool, every path.',
    flow: '/images/birthstory/evolution/flows/onboarding-v1.png',
    flowAlt: 'Onboarding V1, seven screens: welcome chat bubbles, a Reflect / Document / Connect fork, a four-tile reflect grid, a notes entry, a confirmation, and a voice-recording screen — cream UI with a colourful tab bar.',
    screens: 7,
    heardLabel: 'What the interviews told us', heardKind: 'insight',
    heard: [
      'Our first wireframes tried to offer every tool we could imagine.',
      'Feedback taught us that simple is better for postpartum brain fog.',
    ],
    changed: 'Collapsed the scattered paths into a single guided menu.',
    pivot: 'Less, not more',
  },
  {
    id: 'v2', label: 'V2', tag: 'Consolidation',
    was: 'One menu, four ways in.',
    flow: '/images/birthstory/evolution/flows/onboarding-v2.png',
    flowAlt: 'Onboarding V2, seven screens: a plum splash, a Welcome screen, then one menu of four options walked through one at a time — dark grey UI with purple accents.',
    screens: 7,
    heardLabel: 'What testers told us', heardKind: 'feedback',
    heard: [
      'Onboarding is nice, too many buttons and options.',
      'Reconsider language, why “reclaim”? Compassionate copy may be indicating a negative experience.',
      'Too many options, lots of icons and their function is not immediately obvious.',
      'Love the ability to add multimedia, big yes to voice recording, collections idea may not work.',
      'Timeline is a must, journaling is unique for everyone, nice to have the option.',
      'Reflecting on the medical experience is valuable, may not need its own category.',
    ],
    changed: 'Stripped to one home, softened the voice to community-first, kept voice and timeline, dropped collections.',
    pivot: 'Fewer options, softer voice',
  },
  {
    id: 'v3', label: 'V3', tag: 'Shipped concept',
    was: 'One home. Just begin.',
    flow: '/images/birthstory/evolution/flows/onboarding-v3.png',
    flowAlt: 'Onboarding V3, seven screens: a brand-gradient splash, one unified home with Notes and Journal, then Care Pod, Birth Story Book, and Search introduced in turn, ending on a tag-based search — calm dark gradient UI.',
    screens: 7,
    heardLabel: 'What shipped', heardKind: 'shipped',
    heard: [
      'A minimal UI walks you in through the navigation bar.',
      'An automatic timeline introduces tagging for organisation across the app.',
      'A feature walkthrough showcases the keepsake Birth Story Book.',
    ],
    changed: null,
  },
]

/* zoomed-in panel — Lorin's deck annotation style */
const CAREPOD = {
  title: 'Care Pod',
  screens: [
    { src: '/images/birthstory/bs-carepod.png', alt: 'The Care Pod: loved ones’ photos orbiting a central heart marked “You”, with a Send Update button.' },
    { src: '/images/birthstory/bs-messages.png', alt: 'The Care Pod live message board: supportive messages between Care Pod members during labor.' },
  ],
  annotations: [
    { side: 'left', label: 'Updates', text: 'Easy messaging with pre-selected Care Pod members for live labor communication.' },
    { side: 'right', label: 'Message Board', text: 'Receive real-time support messages from Care Pod members, and let others communicate on your behalf.' },
  ],
  credit: ['CMU IXD Studio · Spring 2025', 'Lorin Anderberg + Michael Juan'],
}

function Filmstrip({ src, alt, count }) {
  return (
    <div className={styles.stripWrap}>
      <div className={styles.strip} role="group" aria-label={`${count} screens, scroll horizontally`} tabIndex={0}>
        <img className={styles.stripImg} src={src} alt={alt} loading="lazy" draggable="false" />
      </div>
      <span className={styles.stripHint} aria-hidden="true">{count} screens · scroll →</span>
    </div>
  )
}

function VersionBlock({ v, showPivot }) {
  return (
    <div className={styles.version}>
      <header className={styles.vHead}>
        <span className={styles.vTag}>{v.label} · {v.tag}</span>
        <h3 className={styles.vWas}>{v.was}</h3>
      </header>

      <Filmstrip src={v.flow} alt={v.flowAlt} count={v.screens} />

      <div className={styles.dossier}>
        <div className={styles.dossierCol}>
          <p className={`${styles.dossierLabel} ${styles[v.heardKind]}`}>{v.heardLabel}</p>
          <ul className={styles.heardList}>
            {v.heard.map((line, i) => <li key={i} className={styles.heardItem}>{line}</li>)}
          </ul>
        </div>
        {v.changed && (
          <div className={styles.dossierCol}>
            <p className={styles.dossierLabel}>What changed</p>
            <p className={styles.changeText}>{v.changed}</p>
          </div>
        )}
      </div>

      {showPivot && (
        <div className={styles.pivot} aria-hidden="true">
          <span className={styles.pivotLine} />
          <span className={styles.pivotLabel}>{v.pivot}</span>
        </div>
      )}
    </div>
  )
}

function Annotation({ a }) {
  return (
    <div className={`${styles.annot} ${styles[a.side]}`}>
      <p className={styles.annotLabel}>{a.label}</p>
      <p className={styles.annotText}>{a.text}</p>
      <span className={styles.leader} aria-hidden="true" />
    </div>
  )
}

function AnnotationPanel({ panel }) {
  const left = panel.annotations.filter((a) => a.side === 'left')
  const right = panel.annotations.filter((a) => a.side === 'right')
  return (
    <figure className={styles.panel}>
      <figcaption className={styles.panelTitle}>{panel.title}</figcaption>
      <div className={styles.panelStage}>
        <div className={styles.annotCol}>{left.map((a, i) => <Annotation key={i} a={a} />)}</div>
        <div className={styles.panelScreens}>
          {panel.screens.map((s, i) => (
            <span key={i} className={styles.panelPhone}>
              <span className={styles.panelScreen} style={{ aspectRatio: '430 / 932' }}>
                <img src={s.src} alt={s.alt} loading="lazy" draggable="false" />
              </span>
            </span>
          ))}
        </div>
        <div className={styles.annotCol}>{right.map((a, i) => <Annotation key={i} a={a} />)}</div>
      </div>
      <div className={styles.panelCredit}>
        <span>{panel.credit[0]}</span>
        <span>{panel.credit[1]}</span>
      </div>
    </figure>
  )
}

export default function EvolutionViewer() {
  const [seen, setSeen] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } },
      { threshold: 0.08 }
    )
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.beat} ${seen ? styles.in : ''}`}>
      <div className={styles.head}>
        <p className={styles.kicker}>The iteration</p>
        <h2 className={styles.statement}>From the full flow down to one <em>interaction</em>.</h2>
        <p className={styles.intro}>
          Closer in now. First the onboarding flow, every screen across three rounds, with the feedback
          and the change each round drove. Then one feature up close, annotated.
        </p>
      </div>

      {/* 1 — zoomed out: the system evolving */}
      <div className={styles.movement}>
        <p className={styles.movementLabel}>The flow, round by round</p>
        {VERSIONS.map((v, i) => (
          <VersionBlock key={v.id} v={v} showPivot={i < VERSIONS.length - 1} />
        ))}
      </div>

      {/* 2 — zoomed in: one interaction, annotated (Lorin's deck style) */}
      <div className={styles.movement}>
        <p className={styles.movementLabel}>Up close</p>
        <AnnotationPanel panel={CAREPOD} />
      </div>
    </section>
  )
}
