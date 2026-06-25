'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellHero.module.css'

/* ============================================================================
   Groundswell — case-study OPENING (hero + ecosystem map in one).
   DARK throughout. The hero's art-wall image is the SAME element that grows to
   full-bleed (held a good while), then contracts into its circle on Lorin's
   ecosystem-map SVG (used verbatim as the backdrop; its pale marks read on the
   dark field). Photos fill the circles. Reduced-motion: static hero only.
   ============================================================================ */

gsap.registerPlugin(ScrollTrigger)

const img = (key, w = 2000) => cloudImg(GS_IMAGES[key], w)
const MAP_SRC = '/images/groundswell/gs-ecosystem-diagram.svg'

const META = [
  ['Role', 'Design research, co-design'],
  ['Timeline', '15-week course + 10-week production'],
  ['Year', '2025–26'],
  ['Outcome', 'Live 12-month pilot'],   // placeholder to verify
]

// her map, left→right. `hero` = the morphing art-wall (circle index 2).
const NODES = [
  { key: 'gs-ctb-email', label: 'CTB Email', circle: 0 },
  { key: 'gs-pod', label: 'Pod', circle: 1 },
  { key: 'gs-artwall', label: 'Garden / Art Wall', circle: 2, hero: true },
  { key: 'gs-cards', label: 'Reflection Cards', circle: 3 },
]

// from gs-ecosystem-diagram.svg (viewBox 1736×1080): clip squares 293.441².
const CX = [0.1230, 0.3745, 0.6261, 0.8777]
const CY = 0.4703
const RAD = 0.0845                       // circle radius as fraction of map width
const MAP_AR = 1736 / 1080

export default function GroundswellHero() {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const heroTextRef = useRef(null)
  const qRef = useRef(null)
  const metaRef = useRef(null)
  const mapRef = useRef(null)
  const nodeEls = useRef([])
  const artClipRef = useRef(null)
  const capRefs = useRef([])
  const thesisRef = useRef(null)
  const diveRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // ── on-load hero reveal ──
      gsap.set(metaRef.current, { autoAlpha: 0, y: 16 })
      gsap.set(qRef.current, { clipPath: 'inset(100% 0 0 0)', y: 22 })
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(qRef.current, {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.05,
          onComplete: () => gsap.set(qRef.current, { clipPath: 'none' }),
        }, 0.2)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.75)

      // ── map geometry: her layout, fit into a band BELOW the thesis ──
      const sw = () => stageRef.current.getBoundingClientRect().width
      const sh = () => stageRef.current.getBoundingClientRect().height
      const fitH = () => sh() * 0.54
      const mw = () => Math.min(sw() * 0.9, fitH() * MAP_AR)
      const mh = () => mw() / MAP_AR
      const mL = () => (sw() - mw()) / 2
      const mT = () => sh() * 0.32 + (fitH() - mh()) / 2
      const cx = (i) => mL() + CX[i] * mw()
      const cy = () => mT() + CY * mh()
      const d = () => RAD * 2 * mw()
      const bandH = () => sh() * 0.40

      const art = nodeEls.current[2]
      const others = NODES
        .map((n, i) => ({ el: nodeEls.current[i], circle: n.circle, hero: n.hero }))
        .filter((o) => !o.hero)

      // initial states
      gsap.set(art, { top: () => sh() - bandH(), left: 0, width: sw, height: bandH })
      gsap.set(artClipRef.current, { borderRadius: 0 })
      others.forEach((o) => gsap.set(o.el, {
        top: () => cy() - d() / 2, left: () => cx(o.circle) - d() / 2,
        width: d, height: d, autoAlpha: 0, scale: 0.8, transformOrigin: '50% 50%',
      }))
      gsap.set(mapRef.current, { top: mT, left: mL, width: mw, height: mh, autoAlpha: 0 })
      gsap.set([thesisRef.current, diveRef.current], { autoAlpha: 0 })
      gsap.set(capRefs.current.filter(Boolean), { autoAlpha: 0 })

      // ── scrubbed transformation (slow; long dwell on the full image) ──
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: wrapRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
      })

      // 1 · hero leaves; the band image slowly grows to full-bleed
      tl.to(heroTextRef.current, { autoAlpha: 0, y: -48, duration: 0.6, ease: 'power2.in' }, 0)
      tl.to(art, { top: 0, left: 0, width: sw, height: sh, duration: 1.6, ease: 'power2.inOut' }, 0)

      // 2 · HOLD full-bleed (see most of the image) — 1.6 → 2.7

      // 3 · image contracts into its circle on her map (map fades in)
      tl.to(mapRef.current, { autoAlpha: 1, duration: 0.6 }, 2.85)
      tl.to(art, {
        top: () => cy() - d() / 2, left: () => cx(2) - d() / 2,
        width: d, height: d, duration: 1, ease: 'power2.inOut',
      }, 2.7)
      tl.to(artClipRef.current, { borderRadius: '50%', duration: 1 }, 2.7)

      // 4 · thesis answers; other photos fill their circles; labels
      tl.to(thesisRef.current, { autoAlpha: 1, duration: 0.6 }, 3.25)
      others.forEach((o, i) => {
        tl.to(o.el, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, 3.4 + i * 0.12)
      })
      tl.to(capRefs.current.filter(Boolean), { autoAlpha: 1, duration: 0.5, stagger: 0.05 }, 3.85)
      tl.to(diveRef.current, { autoAlpha: 1, duration: 0.5 }, 4.15)
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.stage} ref={stageRef}>
        {/* Lorin's ecosystem map, used verbatim as the backdrop (pale on dark) */}
        <img className={styles.map} ref={mapRef} src={MAP_SRC} alt="" aria-hidden="true" />

        <header className={styles.nav}>
          <span className={styles.navMark}>Groundswell</span>
          <span className={styles.navLabel}>Case study</span>
          <span className={styles.navCtx}>Oncology well-being · UPMC Magee-Womens Hospital</span>
        </header>

        <div className={styles.heroText} ref={heroTextRef}>
          <div className={styles.body}>
            <h1 className={styles.q} ref={qRef}>
              Who better to design care than those who <em>give it?</em>
            </h1>
            <dl className={styles.meta} ref={metaRef}>
              {META.map(([k, v]) => (
                <div key={k} className={styles.metaItem}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* circles — node 2 (art-wall) is the morphing hero image */}
        {NODES.map((n, i) => (
          <figure
            key={n.key}
            ref={(el) => (nodeEls.current[i] = el)}
            className={`${styles.node} ${n.hero ? styles.art : ''}`}
          >
            <span className={styles.clip} ref={n.hero ? artClipRef : null}>
              <img src={img(n.key)} alt={n.label} />
            </span>
            <figcaption className={styles.cap} ref={(el) => (capRefs.current[i] = el)}>{n.label}</figcaption>
          </figure>
        ))}

        {/* thesis (placeholder copy) */}
        <p className={styles.thesis} ref={thesisRef}>
          When the people who give care help design it, the outcome is a{' '}
          <em>connected system of care</em> — one that centers recognition,
          environment, and culture.
        </p>

        <p className={styles.dive} ref={diveRef}>
          How did we get there? <span className={styles.diveCta}>Dive into the process ↓</span>
        </p>
      </div>
    </div>
  )
}
