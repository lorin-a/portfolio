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

/**
 * GroundswellSection — Custom 2-row media-first layout for the Groundswell
 * homepage block. Row 1: hero image, flip card, walkthrough video.
 * Row 2: text column, iPhone mockup with video, flip card.
 */
export default function GroundswellSection() {
  const sectionRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const walkthroughRef = useRef(null)
  const qrVideoRef = useRef(null)

  /* ── Reduced motion check ── */
  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* ── GSAP scroll-triggered tile fade-in ── */
  useEffect(() => {
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        import('gsap').then(({ gsap }) => {
          const items = sectionRef.current?.querySelectorAll('[data-tile]')
          if (!items?.length) return

          gsap.fromTo(
            items,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power1.inOut',
            }
          )
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [reducedMotion])

  /* ── Video tap-to-pause ── */
  const toggleVideo = useCallback((videoRef) => {
    const vid = videoRef.current
    if (!vid) return
    if (vid.paused) {
      vid.play()
    } else {
      vid.pause()
    }
  }, [])

  const initialOpacity = reducedMotion ? undefined : { opacity: 0 }

  return (
    <section className={styles.section} aria-label="Groundswell">
      <div className={styles.inner} ref={sectionRef}>

        {/* ── Row 1: Hero image ── */}
        <div className={styles.heroImage} data-tile style={initialOpacity}>
          <img
            src={cloudImg(GS_IMAGES['gs-hero'], 900)}
            alt="Groundswell installation overview"
            className={styles.media}
            loading="lazy"
          />
        </div>

        {/* ── Row 1: Heartbroken flip card ── */}
        <div className={styles.flipCardSlotA} data-tile style={initialOpacity}>
          <FlipCard
            front={
              <img
                src={cloudImg(GS_CARDS['heartbroken-front'], 400)}
                alt="Heartbroken reflection card, front"
                className={styles.cardImage}
              />
            }
            back={
              <img
                src={cloudImg(GS_CARDS['heartbroken-back'], 400)}
                alt="Heartbroken reflection card, back"
                className={styles.cardImage}
              />
            }
          />
        </div>

        {/* ── Row 1: Walkthrough video ── */}
        <div
          className={styles.walkthroughSlot}
          data-tile
          style={initialOpacity}
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

        {/* ── Row 2: Text column ── */}
        <div className={styles.textColumn} data-tile style={initialOpacity}>
          <span className={styles.projectNum}>01</span>
          <h2 className={styles.title}>Groundswell</h2>
          <p className={styles.tagline}>Making Space to Restore, Together</p>
          <p className={styles.description}>
            A multi-suite design intervention built to support the complex
            emotional reality of oncology care. Co-designed with healthcare
            workers.
          </p>
          <div className={styles.pills}>
            {CONTRIBUTIONS.map((c) => (
              <span
                key={c.label}
                className={`${styles.pill} ${styles[PILL_MAP[c.label]]}`}
              >
                {c.label}
              </span>
            ))}
          </div>
          <a href="/projects/groundswell" className={styles.cta}>
            View Case Study <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* ── Row 2: iPhone mockup with QR library video ── */}
        <div className={styles.iphoneSlot} data-tile style={initialOpacity}>
          <div
            className={styles.iphoneFrame}
            onClick={() => toggleVideo(qrVideoRef)}
          >
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

        {/* ── Row 2: Grateful flip card ── */}
        <div className={styles.flipCardSlotB} data-tile style={initialOpacity}>
          <FlipCard
            front={
              <img
                src={cloudImg(GS_CARDS['grateful-front'], 400)}
                alt="Grateful reflection card, front"
                className={styles.cardImage}
              />
            }
            back={
              <img
                src={cloudImg(GS_CARDS['grateful-back'], 400)}
                alt="Grateful reflection card, back"
                className={styles.cardImage}
              />
            }
          />
        </div>
      </div>
    </section>
  )
}
