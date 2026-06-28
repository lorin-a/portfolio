'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './SystemEvolution.module.css'

/* ============================================================================
   SystemEvolution — the zoomed-OUT view: the information architecture
   resolving across the project. A branching questionnaire (V1) organises into
   two verbs (V1 → V2) and finally lands as one five-tab home. Shown as
   Lorin's own flow diagrams on dark bands, so the simplification reads at a
   glance. This is the "system" end of the system-to-interaction arc; the
   iteration section that follows is the flows, then one interaction up close.

   Captions are descriptive (mine), grounded in the diagrams — hers to bless.
   ============================================================================ */

const STAGES = [
  {
    id: 'v1', label: 'V1', tag: 'First architecture',
    src: '/images/birthstory/system/ia-v1.png',
    alt: 'V1 information architecture: a wide branching tree starting from “What phase in your birth story are you currently in?”, fanning into conditional paths for location, timing, and entry type.',
    note: 'A branching questionnaire. The app tried to triage every situation before a parent could begin.',
  },
  {
    id: 'v1v2', label: 'V1 → V2', tag: 'Organising',
    src: '/images/birthstory/system/ia-v1v2.png',
    alt: 'V1 to V2 information architecture: Home splits into Document and Reflect, each opening media types — Note, Voice Note, Images, Timeline, Journal, Photo Album, Data Viz.',
    note: 'Reorganised around two verbs, Document and Reflect, with the media types nested beneath each.',
  },
  {
    id: 'final', label: 'Final', tag: 'Shipped navigation',
    src: '/images/birthstory/system/ia-final.png',
    alt: 'Final information architecture: a five-tab home — Notes/Journal, Care Pod (Updates, Stories), New Note, Book (About, Story), and Search.',
    note: 'Resolved into one five-tab home: a parent just starts, and the structure gets out of the way.',
  },
]

export default function SystemEvolution() {
  const [seen, setSeen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.12 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={ref} className={`${styles.beat} ${seen ? styles.in : ''}`}>
      <div className={styles.head}>
        <p className={styles.kicker}>The system</p>
        <h2 className={styles.statement}>From a branching questionnaire to a <em>five-tab home</em>.</h2>
        <p className={styles.intro}>
          Before any screen, the information architecture had to simplify. Here it is at three points,
          zoomed out, getting calmer as the core need came into focus.
        </p>
      </div>

      <ol className={styles.stages}>
        {STAGES.map((s, i) => (
          <li key={s.id} className={styles.stage}>
            <div className={styles.stageHead}>
              <span className={styles.stageTag}>{s.label} · {s.tag}</span>
              <p className={styles.stageNote}>{s.note}</p>
            </div>
            <div className={styles.diagram} role="group" aria-label={`${s.label} information architecture, scroll to explore`} tabIndex={0}>
              <img className={styles.diagramImg} src={s.src} alt={s.alt} loading="lazy" draggable="false" />
            </div>
            {i < STAGES.length - 1 && <span className={styles.thread} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </section>
  )
}
