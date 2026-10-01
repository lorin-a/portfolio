'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellHero.module.css'

/* ============================================================================
   Groundswell — case-study OPENING (the hook). DARK throughout.
   A tight three-beat opener: the thesis question lands on load → the community
   art-wall image grows from a band to full-bleed (the emotional peak) → the
   promise settles on the artwork → "Process ↓" is the threshold into the work.
   The ecosystem diagram that used to live here now pays off in context, in the
   Weave act (the interactive SystemMap on her real connector geometry).
   ============================================================================ */

gsap.registerPlugin(ScrollTrigger)

const img = (key, w = 2000) => cloudImg(GS_IMAGES[key], w)

const META = [
  ['Role', 'Design research, co-design'],
  ['Timeline', '15-week course + 10-week production'],
  ['Year', '2025–26'],
  ['Outcome', 'Live 12-month pilot'],
]

export default function GroundswellHero() {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const heroTextRef = useRef(null)
  const qRef = useRef(null)
  const metaRef = useRef(null)
  const introRef = useRef(null)
  const artRef = useRef(null)
  const diveRef = useRef(null)
  const creditRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // on-load hero reveal — the thesis question wipes up, meta settles under it
      gsap.set(metaRef.current, { autoAlpha: 0, y: 16 })
      gsap.set(qRef.current, { clipPath: 'inset(100% 0 0 0)', y: 22 })
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(qRef.current, { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.05, onComplete: () => gsap.set(qRef.current, { clipPath: 'none' }) }, 0.2)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.75)

      const sw = () => stageRef.current.getBoundingClientRect().width
      const sh = () => stageRef.current.getBoundingClientRect().height
      const bandH = () => sh() * 0.34

      // the art-wall starts as a band along the bottom, then grows to full-bleed
      gsap.set(artRef.current, { top: () => sh() - bandH(), left: 0, width: sw, height: bandH })
      gsap.set([introRef.current, diveRef.current, creditRef.current], { autoAlpha: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: wrapRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
      })

      // 1 · thesis leaves; the art-wall grows to full-bleed (the reveal)
      tl.to(heroTextRef.current, { autoAlpha: 0, y: -48, duration: 0.55, ease: 'power2.in' }, 0)
      tl.to(artRef.current, { top: 0, left: 0, width: sw, height: sh, duration: 1.3, ease: 'power2.inOut' }, 0)
      // credit appears WITH the artwork (caption to the full-bleed image)
      tl.to(creditRef.current, { autoAlpha: 1, duration: 0.5 }, 0.7)
      // 2 · the promise settles on the artwork
      tl.to(introRef.current, { autoAlpha: 1, duration: 0.6 }, 1.45)
      // 3 · the threshold into the process
      tl.to(diveRef.current, { autoAlpha: 1, duration: 0.5 }, 2.15)
    }, wrapRef)

    return () => ctx.revert()
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
          When the people who give care help design it, scattered support
          becomes <em>a system that holds them</em>.
        </p>

        {/* the community art wall — grows from a band to full-bleed on scroll */}
        <figure className={`${styles.photo} ${styles.art}`} ref={artRef}>
          <span className={styles.clip}>
            <img src={img('gs-artwall')} alt="The community art wall on the oncology unit — Carolyn Gavin’s floral garden, where staff add anonymous tokens of what they carry." />
          </span>
        </figure>

        <p className={styles.dive} ref={diveRef}>
          <span className={styles.diveCta}>Process</span>
          <span className={styles.diveArrow} aria-hidden="true">↓</span>
        </p>

        <p className={styles.credit} ref={creditRef}>
          Artwork <b>Carolyn Gavin</b> · Photography <b>Kevin Lorenzi</b>
        </p>
      </div>
    </div>
  )
}
