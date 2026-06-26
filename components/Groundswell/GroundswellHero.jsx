'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellHero.module.css'

/* ============================================================================
   Groundswell — case-study OPENING (mega-hero). DARK throughout.
   Hero question → the art-wall image goes full-bleed → resolves into 4 LARGE
   photos + intro → they shrink → cross-fade into labelled circles (photo on
   hover) → Lorin's connector lines draw on → the ecosystem (with moment-pills)
   resolves. "Dive into the process ↓" is the threshold to the light process.
   Geometry + lines come verbatim from her Figma export (1736×1080).
   ============================================================================ */

gsap.registerPlugin(ScrollTrigger)

const img = (key, w = 1800) => cloudImg(GS_IMAGES[key], w)

const META = [
  ['Role', 'Design research, co-design'],
  ['Timeline', '15-week course + 10-week production'],
  ['Year', '2025–26'],
  ['Outcome', 'Live 12-month pilot'],   // placeholder to verify
]

// circles, her left→right order; node 2 (art-wall) is the morphing hero image.
const NODES = [
  { key: 'gs-ctb-email', label: 'CTB Email', circle: 0 },
  { key: 'gs-pod', label: 'Pod', circle: 1 },
  { key: 'gs-artwall', label: 'Garden / Art Wall', circle: 2, hero: true },
  { key: 'gs-cards', label: 'Reflection Cards', circle: 3 },
]

// moment-pills, from her SVG (dashed rects). col 0–2, row top/bottom.
const PILLS = [
  { label: 'Arrive at Work', col: 0, row: 't' },
  { label: 'Take a Break', col: 1, row: 't' },
  { label: 'Leave Work', col: 2, row: 't' },
  { label: 'Patient Loss', col: 0, row: 'b' },
  { label: 'Hard Moment', col: 1, row: 'b' },
  { label: '1:1 Meeting', col: 2, row: 'b' },
]

// fractions of the 1736×1080 map frame
const CX = [0.1230, 0.3745, 0.6261, 0.8777]   // circle centres x
const CY = 0.4703                              // circle centres y
const RAD = 0.0845                             // circle radius (frac of map width)
const PX = [0.1220, 0.5000, 0.8770]            // pill centres x
const PY = { t: 0.0598, b: 0.9402 }            // pill centres y
const PW = 0.2409                              // pill width (frac of map width)
const PH = 0.1145                              // pill height (frac of map height)
const MAP_AR = 1736 / 1080

export default function GroundswellHero({ connectorsSvg }) {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const heroTextRef = useRef(null)
  const qRef = useRef(null)
  const metaRef = useRef(null)
  const introRef = useRef(null)
  const nodeEls = useRef([])
  const discRefs = useRef([])
  const clipRefs = useRef([])
  const pillRefs = useRef([])
  const connRef = useRef(null)
  const diveRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hoverCleanups = []
    const ctx = gsap.context(() => {
      // on-load hero reveal
      gsap.set(metaRef.current, { autoAlpha: 0, y: 16 })
      gsap.set(qRef.current, { clipPath: 'inset(100% 0 0 0)', y: 22 })
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(qRef.current, { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.05, onComplete: () => gsap.set(qRef.current, { clipPath: 'none' }) }, 0.2)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.75)

      // ── map geometry: her layout, fit into a band below the thesis ──
      const sw = () => stageRef.current.getBoundingClientRect().width
      const sh = () => stageRef.current.getBoundingClientRect().height
      const fitH = () => sh() * 0.6
      const mw = () => Math.min(sw() * 0.92, fitH() * MAP_AR)
      const mh = () => mw() / MAP_AR
      const mL = () => (sw() - mw()) / 2
      const mT = () => sh() * 0.30 + (fitH() - mh()) / 2
      const cx = (i) => mL() + CX[i] * mw()
      const cy = () => mT() + CY * mh()
      const d = () => RAD * 2 * mw()           // final circle diameter
      const bandH = () => sh() * 0.34
      // half-stop: 4 big rectangles, evenly across, centred vertically
      const RX = [0.155, 0.385, 0.615, 0.845]
      const lx = (i) => sw() * RX[i]
      const ly = () => sh() * 0.50
      const rw = () => sw() * 0.21
      const rh = () => sh() * 0.40

      const photos = nodeEls.current.filter(Boolean)
      const discs = discRefs.current.filter(Boolean)
      const art = nodeEls.current[2]
      const others = NODES.map((n, i) => ({ p: nodeEls.current[i], circle: n.circle, hero: n.hero })).filter((o) => !o.hero)

      // position the connector layer + pills over the same map box
      gsap.set(connRef.current, { top: mT, left: mL, width: mw, height: mh, autoAlpha: 0 })
      gsap.set(connRef.current, { clipPath: 'inset(0 100% 0 0)' })   // hidden, will sweep open L→R
      pillRefs.current.filter(Boolean).forEach((el, i) => {
        const P = PILLS[i]
        gsap.set(el, {
          left: () => mL() + PX[P.col] * mw() - (PW * mw()) / 2,
          top: () => mT() + PY[P.row] * mh() - (PH * mh()) / 2,
          width: () => PW * mw(), height: () => PH * mh(), autoAlpha: 0,
        })
      })

      // discs (labelled circles) sit at final positions, hidden until reveal
      discs.forEach((el, i) => gsap.set(el, {
        top: () => cy() - d() / 2, left: () => cx(NODES[i].circle) - d() / 2,
        width: d, height: d, autoAlpha: 0,
      }))

      // photos: art-wall starts as the band; others start as LARGE circles (hidden)
      gsap.set(art, { top: () => sh() - bandH(), left: 0, width: sw, height: bandH })
      gsap.set(clipRefs.current.filter(Boolean), { borderRadius: 10 })
      others.forEach((o) => gsap.set(o.p, {
        top: () => ly() - rh() / 2, left: () => lx(o.circle) - rw() / 2,
        width: rw, height: rh, autoAlpha: 0, scale: 0.85, transformOrigin: '50% 50%',
      }))

      gsap.set([introRef.current, diveRef.current], { autoAlpha: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: wrapRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
      })

      // 1 · hero leaves; band image grows to full-bleed
      tl.to(heroTextRef.current, { autoAlpha: 0, y: -48, duration: 0.6, ease: 'power2.in' }, 0)
      tl.to(art, { top: 0, left: 0, width: sw, height: sh, duration: 1.4, ease: 'power2.inOut' }, 0)
      // 2 · HOLD full-bleed 1.4 → 2.6

      // 3 · resolve into 4 LARGE rectangles + intro (the half-stop)
      tl.to(art, {
        top: () => ly() - rh() / 2, left: () => lx(2) - rw() / 2, width: rw, height: rh,
        duration: 1.1, ease: 'power2.inOut',
      }, 2.6)
      others.forEach((o) => tl.to(o.p, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, 2.85))
      tl.to(introRef.current, { autoAlpha: 1, duration: 0.7 }, 3.2)
      // 4 · HOLD large rectangles 3.7 → 4.7

      // 5 · rectangles shrink + move to the circle POSITIONS (stay as rounded rects)
      photos.forEach((p, i) => tl.to(p, {
        top: () => cy() - d() / 2, left: () => cx(i) - d() / 2, width: d, height: d,
        duration: 1.2, ease: 'power3.inOut',
      }, 4.7))

      // 6 · pills + lines draw in around the images (images still present)
      tl.to(pillRefs.current.filter(Boolean), { autoAlpha: 1, duration: 0.5, stagger: 0.05 }, 6.1)
      tl.to(connRef.current, { autoAlpha: 1, duration: 0.2 }, 6.4)
      tl.to(connRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power1.inOut' }, 6.4)

      // 7 · LAST: images round to circles + cross-fade to the labelled discs
      tl.to(clipRefs.current.filter(Boolean), { borderRadius: '50%', duration: 0.9, ease: 'power2.inOut' }, 8.1)
      tl.to(discs, { autoAlpha: 1, duration: 0.6 }, 8.3)
      tl.to(photos, { autoAlpha: 0, duration: 0.6 }, 8.4)

      // 8 · dive
      tl.to(diveRef.current, { autoAlpha: 1, duration: 0.5 }, 9.1)

      // photo returns on hover of its labelled circle
      discs.forEach((disc, i) => {
        const photo = nodeEls.current[i]
        const enter = () => gsap.to(photo, { autoAlpha: 1, duration: 0.3, overwrite: 'auto' })
        const leave = () => gsap.to(photo, { autoAlpha: 0, duration: 0.3, overwrite: 'auto' })
        disc.addEventListener('mouseenter', enter)
        disc.addEventListener('mouseleave', leave)
        hoverCleanups.push(() => { disc.removeEventListener('mouseenter', enter); disc.removeEventListener('mouseleave', leave) })
      })
    }, wrapRef)

    return () => { hoverCleanups.forEach((fn) => fn()); ctx.revert() }
  }, [])

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.stage} ref={stageRef}>
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
                <div key={k} className={styles.metaItem}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>

        <p className={styles.intro} ref={introRef}>
          When the people who give care help design it, the outcome is a{' '}
          <em>connected system of care</em>.
        </p>

        {/* connector lines (her export), recoloured + revealed */}
        <div className={styles.connectors} ref={connRef} aria-hidden="true" dangerouslySetInnerHTML={{ __html: connectorsSvg }} />

        {/* moment-pills */}
        {PILLS.map((p, i) => (
          <span key={p.label} ref={(el) => (pillRefs.current[i] = el)} className={styles.pill}>{p.label}</span>
        ))}

        {/* labelled circles (end state) */}
        {NODES.map((n, i) => (
          <span key={`disc-${n.key}`} ref={(el) => (discRefs.current[i] = el)} className={styles.disc}>
            <span className={styles.discLabel}>{n.label}</span>
          </span>
        ))}

        {/* photos (node 2 morphs in from the band; all fade to the discs, photo on hover) */}
        {NODES.map((n, i) => (
          <figure
            key={n.key}
            ref={(el) => (nodeEls.current[i] = el)}
            className={`${styles.photo} ${n.hero ? styles.art : ''}`}
          >
            <span className={styles.clip} ref={(el) => (clipRefs.current[i] = el)}>
              <img src={img(n.key)} alt={n.label} />
            </span>
          </figure>
        ))}

        <p className={styles.dive} ref={diveRef}>
          How did we get there? <span className={styles.diveCta}>Dive into the process ↓</span>
        </p>

        <p className={styles.credit}>
          Photography <b>Kevin Lorenzi</b> · Artwork <b>Carolyn Gavin</b>
        </p>
      </div>
    </div>
  )
}
