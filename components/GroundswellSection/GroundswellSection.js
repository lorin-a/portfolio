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
 * GroundswellSection — Custom 2-row layout for the Groundswell homepage block.
 * Row 1: hero image (cols 1–8) + walkthrough video (cols 9–12).
 * Row 2: text (cols 1–5) + iPhone mockup (cols 6–8) + flip card (cols 9–12).
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

  const row2Ref = useRef(null)

  /* ── Row 1: animate on page load ── */
  useEffect(() => {
    if (reducedMotion) return

    const timeout = setTimeout(() => {
      import('gsap').then(({ gsap }) => {
        const row1Items = sectionRef.current?.querySelectorAll('[data-row1]')
        if (!row1Items?.length) return

        gsap.fromTo(
          row1Items,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power1.inOut',
          }
        )
      })
    }, 300)

    return () => clearTimeout(timeout)
  }, [reducedMotion])

  /* ── Row 2: scroll-triggered reveal ── */
  useEffect(() => {
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        import('gsap').then(({ gsap }) => {
          const el = row2Ref.current
          if (!el) return

          /* Text children stagger in softly */
          const textChildren = el.querySelector('[data-text]')?.children
          if (textChildren?.length) {
            gsap.fromTo(
              textChildren,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power1.inOut',
              }
            )
          }

          /* iPhone settles in */
          const phone = el.querySelector('[data-phone]')
          if (phone) {
            gsap.fromTo(
              phone,
              { opacity: 0, y: 14, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                delay: 0.2,
                ease: 'power1.inOut',
              }
            )
          }

          /* Flip card fades in (its own flip animation handles the rest) */
          const card = el.querySelector('[data-card]')
          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.3,
                ease: 'power1.inOut',
              }
            )
          }
        })
      },
      { threshold: 0.15 }
    )

    if (row2Ref.current) observer.observe(row2Ref.current)

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

  const hidden = reducedMotion ? undefined : { opacity: 0 }

  return (
    <section className={styles.section} aria-label="Groundswell">
      <div className={styles.inner} ref={sectionRef}>

        {/* ── Row 1: Hero image ── */}
        <div className={styles.heroImage} data-row1 style={hidden}>
          <img
            src={cloudImg(GS_IMAGES['gs-hero'], 900)}
            alt="Groundswell installation overview"
            className={styles.media}
            loading="lazy"
          />
        </div>

        {/* ── Row 1: Walkthrough video ── */}
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

        {/* ── Row 2 wrapper for scroll-triggered reveal ── */}
        <div className={styles.row2} ref={row2Ref}>

          {/* Text column — children stagger individually */}
          <div className={styles.textColumn} data-text>
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

          {/* iPhone mockup */}
          <div className={styles.iphoneSlot} data-phone style={hidden}>
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

          {/* Exhausted flip card */}
          <div className={styles.flipCardSlot} data-card style={hidden}>
            <FlipCard
              front={
                <img
                  src={cloudImg(GS_CARDS['exhausted-front'], 400)}
                  alt="Exhausted reflection card, front"
                  className={styles.cardImage}
                />
              }
              back={
                <img
                  src={cloudImg(GS_CARDS['exhausted-back'], 400)}
                  alt="Exhausted reflection card, back"
                  className={styles.cardImage}
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
