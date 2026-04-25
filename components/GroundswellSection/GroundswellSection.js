'use client'

import { useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import FlipCard from '@/components/FlipCard/FlipCard'
import { cloudImg, cloudVideo, GS_IMAGES, GS_CARDS, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './GroundswellSection.module.css'

gsap.registerPlugin(useGSAP)

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

const FAN_OFFSETS = [50, 18, -18, -50]

export default function GroundswellSection() {
  const sectionRef = useRef(null)
  const [gsapControlled, setGsapControlled] = useState(true)
  const walkthroughRef = useRef(null)
  const qrVideoRef = useRef(null)

  const cardRefs = useRef([null, null, null, null])
  const innerRefs = useRef([null, null, null, null])

  /* All animations in one useGSAP — single context, automatic cleanup */
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setGsapControlled(false)
      return
    }

    /* ── Row 1: scroll-triggered reveal + video play ── */
    gsap.set('[data-row1]', { autoAlpha: 0, scale: 0.97 })

    ScrollTrigger.create({
      trigger: '[data-row1-wrap]',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to('[data-row1]', {
          autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power1.inOut',
        })
        walkthroughRef.current?.play()
        qrVideoRef.current?.play()
      },
    })

    /* ── Text reveal ── */
    gsap.set('[data-text-item]', { autoAlpha: 0, y: 10 })

    ScrollTrigger.create({
      trigger: '[data-text-left]',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to('[data-text-item]', {
          autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power1.inOut',
        })
      },
    })

    /* ── Row 2: scrub-driven fan-out + sequential 3D flips ── */
    const row2 = sectionRef.current?.querySelector('[data-row2]')
    if (!row2) return

    const cards = row2.querySelectorAll('[data-card]')
    const inners = innerRefs.current.filter(Boolean)
    if (!cards.length || inners.length !== 4) return

    gsap.set(cards, (i) => ({
      xPercent: FAN_OFFSETS[i],
      autoAlpha: 0,
      scale: 0.92,
    }))
    gsap.set(inners, { rotateY: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row2,
        start: 'top 90%',
        end: 'center 25%',
        scrub: 0.4,
        onLeave: () => {
          setGsapControlled(false)
          cardRefs.current.forEach((ref) => ref?.setFlipped(true))
          gsap.set(inners, { clearProps: 'transform' })
        },
        onEnterBack: () => setGsapControlled(true),
      },
    })

    /* Phase 1a — pop */
    tl.to(cards, {
      autoAlpha: 1, duration: 0.3, stagger: 0.06, ease: 'power1.inOut',
    })

    /* Phase 1b — fan-out to grid */
    tl.to(cards, {
      xPercent: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power1.inOut',
    }, 0.05)

    /* Breathing room */
    tl.to({}, { duration: 0.15 })

    /* Phase 2 — sequential 3D flips with lift */
    inners.forEach((inner, i) => {
      const flipStart = i === 0 ? '>' : `-=${0.5 - 0.15}`

      tl.to(cards[i], {
        scale: 1.05,
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.15)',
        duration: 0.25, ease: 'power1.inOut',
      }, flipStart)

      tl.to(inner, {
        rotateY: 180, duration: 0.5, ease: 'power1.inOut',
      }, flipStart)

      tl.to(cards[i], {
        scale: 1,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        duration: 0.25, ease: 'power1.inOut',
      }, `>-${0.1}`)
    })

  }, { scope: sectionRef })

  const toggleVideo = useCallback((videoRef) => {
    const vid = videoRef.current
    if (!vid) return
    vid.paused ? vid.play() : vid.pause()
  }, [])

  return (
    <section className={styles.section} aria-label="Groundswell">
      <div className={styles.inner} ref={sectionRef}>

        {/* ── Row 1: Walkthrough + Hero + Phone ── */}
        <div className={styles.row1} data-row1-wrap>
          <div className={styles.walkthroughSlot} data-row1
            onClick={() => toggleVideo(walkthroughRef)}>
            <video ref={walkthroughRef}
              src={cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 480)}
              autoPlay={false} muted loop playsInline className={styles.media} />
          </div>
          <div className={styles.heroSlot} data-row1>
            <img src={cloudImg('gs-artwall_kfw1u7', 900)}
              alt="Groundswell installation overview" className={styles.media} loading="lazy" />
          </div>
          <div className={styles.phoneMediaSlot} data-row1>
            <div className={styles.iphoneFrame} onClick={() => toggleVideo(qrVideoRef)}>
              <div className={styles.iphoneInner}>
                <video ref={qrVideoRef}
                  src={cloudVideo(GS_VIDEOS['gs-qr-library'], 480)}
                  autoPlay={false} muted loop playsInline className={styles.iphoneVideo} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: 4 flip cards ── */}
        <div className={styles.row2} data-row2>
          {['grateful', 'heartbroken', 'valued', 'exhausted'].map((name, i) => (
            <div key={name} className={styles.cardSlot} data-card>
              <FlipCard
                ref={(el) => { cardRefs.current[i] = el }}
                innerRef={(el) => { innerRefs.current[i] = el }}
                clickOnly
                gsapControlled={gsapControlled}
                front={<img src={cloudImg(GS_CARDS[`${name}-front`], 400)} alt={`${name} reflection card, front`} className={styles.cardImage} />}
                back={<img src={cloudImg(GS_CARDS[`${name}-back`], 400)} alt={`${name} reflection card, back`} className={styles.cardImage} />}
              />
            </div>
          ))}
        </div>

        {/* ── Text ── */}
        <div className={styles.textLeft} data-text-left>
          <span className={styles.projectNum} data-text-item>01</span>
          <h2 className={styles.title} data-text-item>Groundswell</h2>
          <p className={styles.tagline} data-text-item>Making Space to Restore, Together</p>
          <div className={styles.pills} data-text-item>
            {CONTRIBUTIONS.map((c) => (
              <span key={c.label} className={`${styles.pill} ${styles[PILL_MAP[c.label]]}`}>{c.label}</span>
            ))}
          </div>
        </div>
        <div className={styles.textRight}>
          <p className={styles.description} data-text-item>
            A multi-scale design ecology built to support the complex
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
