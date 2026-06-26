'use client'

import styles from './GroundswellLook.module.css'

/* ============================================================================
   Groundswell — HERO LOOK options ("I propose, you pick").
   Three visual directions for the cinematic system-diagram hook, same content
   (the question + her connector map, art-free), three distinct treatments inside
   her taste band: dark cinematic / cream calm / warm system-forward.
   Static here — the look first; motion comes after she picks one.
   ============================================================================ */

// reuse the spine's system geometry (viewBox 0 0 100 56)
const MOMENTS = [
  { x: 18, y: 8 }, { x: 50, y: 8 }, { x: 82, y: 8 },
  { x: 18, y: 48 }, { x: 50, y: 48 }, { x: 82, y: 48 },
]
const NODES = [
  { label: 'CTB Email', x: 15, y: 28 },
  { label: 'Pod', x: 38, y: 28 },
  { label: 'Art Wall', x: 62, y: 28 },
  { label: 'Cards', x: 85, y: 28 },
]
const LINKS = [
  [0, 1], [0, 2], [1, 1], [1, 3], [2, 1], [2, 3],
  [3, 0], [3, 1], [3, 2], [4, 1], [4, 3], [4, 2], [5, 3], [5, 2],
]

function Diagram() {
  return (
    <div className={styles.diagram}>
      <svg viewBox="0 0 100 56" preserveAspectRatio="xMidYMid meet" className={styles.dsvg} aria-hidden="true">
        {LINKS.map(([m, n], i) => (
          <line key={i} x1={MOMENTS[m].x} y1={MOMENTS[m].y} x2={NODES[n].x} y2={NODES[n].y} className={styles.dline} />
        ))}
        {MOMENTS.map((m, i) => <circle key={i} cx={m.x} cy={m.y} r="1.1" className={styles.dmoment} />)}
        {NODES.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="2" className={styles.ddot} />)}
      </svg>
      {NODES.map((n) => (
        <span key={n.label} className={styles.dnode} style={{ left: `${n.x}%`, top: `${(n.y / 56) * 100}%` }}>{n.label}</span>
      ))}
    </div>
  )
}

function Variant({ id, name, blurb, className }) {
  return (
    <section className={`${styles.hero} ${className}`}>
      <span className={styles.tag}><b>Direction {id}</b> · {name} · {blurb}</span>
      <div className={styles.inner}>
        <p className={styles.kicker}>Groundswell · case study</p>
        <h1 className={styles.q}>Who better to design care than those who <em>give it?</em></h1>
        <Diagram />
        <p className={styles.dive}>dive into the process ↓</p>
      </div>
    </section>
  )
}

export default function GroundswellLook() {
  return (
    <div className={styles.page}>
      <Variant id="A" name="Dark cinematic" blurb="atmospheric, bridges the dark homepage" className={styles.va} />
      <Variant id="B" name="Cream calm" blurb="quiet, editorial, white-space-rich" className={styles.vb} />
      <Variant id="C" name="Warm, system-forward" blurb="the diagram leads" className={styles.vc} />
    </div>
  )
}
