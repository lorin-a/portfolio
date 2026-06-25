'use client'

import { useEffect, useRef, useState } from 'react'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './HeroOptions.module.css'

/* ============================================================================
   Three distinct hero directions for Groundswell — "I propose, you pick."
   Same content, completely different art direction. Pick one (or kill all).
   Nothing else on the case study gets built until the hero is locked.
   ============================================================================ */

const img = (key, w = 2200) => cloudImg(GS_IMAGES[key], w)

const KICKER = 'Groundswell'
const CONTEXT = 'Oncology well-being · UPMC Magee-Womens Hospital'
const Q = ['How might we create', 'supportive environments where', 'staff feel nurtured, recognized,', 'and celebrated?']
const META = [
  ['Role', 'Design research, co-design'],
  ['Year', '2023–24'],
  ['Scope', '15-week study · live pilot'],
]

function useEnter(threshold = 0.4) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, seen]
}

/* ── A · Cinematic — full-bleed photo, question revealed over it ── */
function HeroA() {
  const [ref, seen] = useEnter(0.35)
  return (
    <section ref={ref} className={`${styles.hero} ${styles.a} ${seen ? styles.in : ''}`} id="a">
      <img src={img('gs-hero')} alt="" className={styles.aImg} />
      <div className={styles.aScrim} aria-hidden="true" />
      <div className={styles.aInner}>
        <p className={styles.aKicker}>{KICKER}<span className={styles.aDot} /> {CONTEXT}</p>
        <h1 className={styles.aQ}>
          {Q.map((l, i) => <span key={i} className={styles.aLineMask}><span className={styles.aLine} style={{ transitionDelay: `${0.15 + i * 0.1}s` }}>{l}</span></span>)}
        </h1>
      </div>
      <p className={styles.aCredit}>Artwork: Carolyn Gavin</p>
    </section>
  )
}

/* ── B · Editorial — type is the hero on a light gallery, one image band ── */
function HeroB() {
  const [ref, seen] = useEnter(0.4)
  return (
    <section ref={ref} className={`${styles.hero} ${styles.b} ${seen ? styles.in : ''}`} id="b">
      <header className={styles.bTop}>
        <span className={styles.bMark}>{KICKER}</span>
        <span className={styles.bCtx}>{CONTEXT}</span>
      </header>
      <div className={styles.bBody}>
        <p className={styles.bLabel}>The brief</p>
        <h1 className={styles.bQ}>
          How might we create supportive environments where staff feel <em>nurtured</em>, <em>recognized</em>, and <em>celebrated?</em>
        </h1>
        <dl className={styles.bMeta}>
          {META.map(([k, v]) => <div key={k} className={styles.bMetaItem}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
      <div className={styles.bBand}>
        <img src={img('gs-artwall')} alt="The Community Art Wall" />
        <span className={styles.bBandCredit}>Artwork: Carolyn Gavin</span>
      </div>
    </section>
  )
}

/* ── C · Split — charcoal type panel + full-height photo, sans question ── */
function HeroC() {
  const [ref, seen] = useEnter(0.4)
  return (
    <section ref={ref} className={`${styles.hero} ${styles.c} ${seen ? styles.in : ''}`} id="c">
      <div className={styles.cPanel}>
        <p className={styles.cKicker}>{KICKER}</p>
        <h1 className={styles.cQ}>How might we create supportive environments where staff feel nurtured, recognized, and celebrated?</h1>
        <div className={styles.cMeta}>
          {META.map(([k, v]) => <div key={k} className={styles.cMetaItem}><span className={styles.cMetaK}>{k}</span><span className={styles.cMetaV}>{v}</span></div>)}
        </div>
        <p className={styles.cCtx}>{CONTEXT}</p>
      </div>
      <div className={styles.cMedia}>
        <img src={img('gs-hero')} alt="Groundswell installed at UPMC Magee-Womens Hospital" />
        <span className={styles.cCredit}>Artwork: Carolyn Gavin</span>
      </div>
    </section>
  )
}

export default function HeroOptions() {
  const [active, setActive] = useState('a')
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    ;['a', 'b', 'c'].forEach((id) => { const el = document.getElementById(id); if (el) o.observe(el) })
    return () => o.disconnect()
  }, [])

  return (
    <div className={styles.page}>
      <nav className={styles.switch} aria-label="Hero directions">
        {[['a', 'Cinematic'], ['b', 'Editorial'], ['c', 'Split']].map(([id, name], i) => (
          <a key={id} href={`#${id}`} className={`${styles.switchItem} ${active === id ? styles.switchOn : ''}`}>
            <span className={styles.switchLetter}>{String.fromCharCode(65 + i)}</span>
            <span className={styles.switchName}>{name}</span>
          </a>
        ))}
      </nav>
      <HeroA />
      <HeroB />
      <HeroC />
    </div>
  )
}
