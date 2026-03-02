'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import FlipCard from '@/components/FlipCard/FlipCard'
import { cloudImg, cloudVideo, GS_IMAGES, GS_CARDS, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './GroundswellSection.module.css'

const PILL_MAP = {
  'Participatory Research': 'pillSense',
  'Copywriting': 'pillWeave',
  'Experience Design': 'pillShape',
}

const CONTRIBUTIONS = [
  { label: 'Participatory Research' },
  { label: 'Copywriting' },
  { label: 'Experience Design' },
]

export default function GroundswellSection() {
  const sectionRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const walkthroughRef = useRef(null)
  const qrVideoRef = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* ── Row 1: animate on page load ── */
  useEffect(() => {
    if (reducedMotion) return
    const timeout = setTimeout(() => {
      import('gsap').then(({ gsap }) => {
        const items = sectionRef.current?.querySelectorAll('[data-row1]')
        if (!items?.length) return
        gsap.fromTo(items,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power1.inOut' }
        )
      })
    }, 300)
    return () => clearTimeout(timeout)
  }, [reducedMotion])

  /* ── Text reveal ── */
  useEffect(() => {
    if (reducedMotion) return
    if (!sectionRef.current) return

    let ctx

    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const textItems = sectionRef.current?.querySelectorAll('[data-text-item]')
        if (!textItems?.length) return

        gsap.set(textItems, { opacity: 0, y: 10 })
        ScrollTrigger.create({
          trigger: sectionRef.current.querySelector('[data-text-left]'),
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(textItems, {
              opacity: 1, y: 0,
              duration: 0.6, stagger: 0.06, ease: 'power1.inOut',
            })
          },
        })
      }, sectionRef.current)
    }

    loadGsap()
    return () => ctx?.revert()
  }, [reducedMotion])

  /* ── Row 2: scroll-triggered card reveal ── */
  useEffect(() => {
    if (reducedMotion) return
    if (!row2Ref.current) return

    let ctx

    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const el = row2Ref.current
        if (!el) return

        const cards = el.querySelectorAll('[data-card]')
        if (!cards.length) return

        gsap.set(cards, { opacity: 0, y: 12, scale: 0.97 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.7, stagger: 0.1, ease: 'power1.inOut',
            })
          },
        })
      }, sectionRef.current)
    }

    loadGsap()
    return () => ctx?.revert()
  }, [reducedMotion])

  const toggleVideo = useCallback((videoRef) => {
    const vid = videoRef.current
    if (!vid) return
    vid.paused ? vid.play() : vid.pause()
  }, [])

  const hidden = reducedMotion ? undefined : { opacity: 0 }

  return (
    <section className={styles.section} aria-label="Groundswell">
      <div className={styles.inner} ref={sectionRef}>

        {/* ── Row 1: Walkthrough + Hero + Phone ── */}
        <div className={styles.row1}>
          <div
            className={styles.walkthroughSlot}
            data-row1
            style={hidden}
            onClick={() => toggleVideo(walkthroughRef)}
          >
            <video
              ref={walkthroughRef}
              src={cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 480)}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              className={styles.media}
            />
          </div>

          <div className={styles.heroSlot} data-row1 style={hidden}>
            <img
              src={cloudImg('gs-artwall_kfw1u7', 900)}
              alt="Groundswell installation overview"
              className={styles.media}
              loading="lazy"
            />
          </div>

          <div
            className={styles.phoneMediaSlot}
            data-row1
            style={hidden}
          >
            <div className={styles.iphoneFrame} onClick={() => toggleVideo(qrVideoRef)}>
              <video
                ref={qrVideoRef}
                src={cloudVideo(GS_VIDEOS['gs-qr-library'], 480)}
                autoPlay={!reducedMotion}
                muted
                loop
                playsInline
                className={styles.iphoneVideo}
              />
            </div>
          </div>
        </div>

        {/* ── Row 2: 4 flip cards ── */}
        <div className={styles.row2} ref={row2Ref}>
          <div className={styles.cardSlot} data-card>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['grateful-front'], 400)} alt="Grateful reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['grateful-back'], 400)} alt="Grateful reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['heartbroken-front'], 400)} alt="Heartbroken reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['heartbroken-back'], 400)} alt="Heartbroken reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['valued-front'], 400)} alt="Valued reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['valued-back'], 400)} alt="Valued reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['exhausted-front'], 400)} alt="Exhausted reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['exhausted-back'], 400)} alt="Exhausted reflection card, back" className={styles.cardImage} />}
            />
          </div>
        </div>

        {/* ── Row 3: Text ── */}
        <div className={styles.textLeft} data-text-left>
          <h2 className={styles.title} data-text-item>Groundswell</h2>
          <p className={styles.tagline} data-text-item>Making Space to Restore, Together</p>
          <div className={styles.pills} data-text-item>
            {CONTRIBUTIONS.map((c) => (
              <span
                key={c.label}
                className={`${styles.pill} ${styles[PILL_MAP[c.label]]}`}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.textRight}>
          <p className={styles.description} data-text-item>
            A multi-suite design intervention built to support the complex
            emotional reality of oncology care. Co-designed with healthcare workers.
          </p>
          <a href="/projects/groundswell" className={styles.cta} data-text-item>
            <span className={styles.ctaText}>View Case Study</span> <span className={styles.ctaArrow} aria-hidden="true">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  )
}
