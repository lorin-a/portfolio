'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellHero.module.css'

/* ============================================================================
   Groundswell — case-study HERO (locked direction: Editorial).
   Type is the hero on cream. Emphasis comes from weight + form (light roman +
   italic), not size or color — the way Lorin's homepage works. Structured meta
   and nav. The art-wall band parallaxes on scroll so the image gains depth.
   ============================================================================ */

gsap.registerPlugin(ScrollTrigger)

const img = (key, w = 2400) => cloudImg(GS_IMAGES[key], w)

// NOTE: Outcome value is a placeholder to verify with Lorin.
const META = [
  ['Role', 'Design research, co-design'],
  ['Timeline', '15-week course + 10-week production'],
  ['Year', '2025–26'],
  ['Outcome', 'Live 12-month pilot'],
]

export default function GroundswellHero() {
  const rootRef = useRef(null)
  const qRef = useRef(null)
  const metaRef = useRef(null)
  const bandImgRef = useRef(null)
  const bandRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // ── on-load reveal: kicker → masked heading rise → meta settle ──
      gsap.set(metaRef.current, { autoAlpha: 0, y: 16 })
      gsap.set(qRef.current, { clipPath: 'inset(100% 0 0 0)', y: 22 })

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(qRef.current, {
          clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.05,
          onComplete: () => gsap.set(qRef.current, { clipPath: 'none' }),
        }, 0.2)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.75)

      // ── scroll interaction: the band image drifts within its frame ──
      gsap.fromTo(
        bandImgRef.current,
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: bandRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page} ref={rootRef}>
      <header className={styles.nav}>
        <span className={styles.navMark}>Groundswell</span>
        <span className={styles.navLabel}>Case study</span>
        <span className={styles.navCtx}>Oncology well-being · UPMC Magee-Womens Hospital</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.body}>
          <h1 className={styles.q} ref={qRef}>
            Who better to design care than those who <em>give it</em>?
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

        <div className={styles.band} ref={bandRef}>
          <img
            ref={bandImgRef}
            src={img('gs-artwall')}
            alt="The Community Art Wall, co-created by oncology staff"
            className={styles.bandImg}
          />
          <span className={styles.bandCredit}>Artwork: Carolyn Gavin</span>
        </div>
      </section>
    </div>
  )
}
