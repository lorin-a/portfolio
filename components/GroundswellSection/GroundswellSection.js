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
  const [gsapControlled, setGsapControlled] = useState(true)
  const walkthroughRef = useRef(null)
  const qrVideoRef = useRef(null)
  const row2Ref = useRef(null)

  /* Refs for FlipCard imperative handles + inner divs */
  const cardRefs = useRef([null, null, null, null])
  const innerRefs = useRef([null, null, null, null])

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* ── Row 1: scroll-triggered reveal + video play ── */
  useEffect(() => {
    if (reducedMotion) return
    if (!sectionRef.current) return

    let ctx

    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const row1 = sectionRef.current?.querySelector('[data-row1-wrap]')
        const items = sectionRef.current?.querySelectorAll('[data-row1]')
        if (!row1 || !items?.length) return

        gsap.set(items, { opacity: 0, scale: 0.97 })
        ScrollTrigger.create({
          trigger: row1,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power1.inOut',
            })
            walkthroughRef.current?.play()
            qrVideoRef.current?.play()
          },
        })
      }, sectionRef.current)
    }

    loadGsap()
    return () => ctx?.revert()
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

  /* ── Row 2: scrub-driven fan-out + sequential 3D flips ── */
  useEffect(() => {
    if (reducedMotion) {
      setGsapControlled(false)
      return
    }
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
        const inners = innerRefs.current.filter(Boolean)
        if (!cards.length || inners.length !== 4) return

        /* Cards start stacked at center, invisible */
        const fanOffsets = [50, 18, -18, -50]
        gsap.set(cards, (i) => ({
          xPercent: fanOffsets[i],
          opacity: 0,
          scale: 0.92,
        }))
        gsap.set(inners, { rotateY: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'center 25%',
            scrub: 0.4,
            onLeave: () => {
              setGsapControlled(false)
              cardRefs.current.forEach((ref) => ref?.setFlipped(true))
              gsap.set(inners, { clearProps: 'transform' })
            },
            onEnterBack: () => {
              setGsapControlled(true)
            },
          },
        })

        /* Phase 1a — Opacity pop so fan-out is visible */
        tl.to(cards, {
          opacity: 1,
          duration: 0.15,
          stagger: 0.03,
          ease: 'power1.inOut',
        })

        /* Phase 1b — Fan-out slide to grid positions */
        tl.to(cards, {
          xPercent: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power1.inOut',
        }, 0.05)

        /* Breathing room */
        tl.to({}, { duration: 0.1 })

        /* Phase 2 — Sequential 3D flips */
        inners.forEach((inner, i) => {
          tl.to(inner, {
            rotateY: 180,
            duration: 0.3,
            ease: 'power1.inOut',
          }, i === 0 ? '>' : `-=${0.3 - 0.1}`)
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
        <div className={styles.row1} data-row1-wrap>
          <div
            className={styles.walkthroughSlot}
            data-row1
            style={hidden}
            onClick={() => toggleVideo(walkthroughRef)}
          >
            <video
              ref={walkthroughRef}
              src={cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 480)}
              autoPlay={false}
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
              <div className={styles.iphoneInner}>
                <video
                  ref={qrVideoRef}
                  src={cloudVideo(GS_VIDEOS['gs-qr-library'], 480)}
                  autoPlay={false}
                  muted
                  loop
                  playsInline
                  className={styles.iphoneVideo}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: 4 flip cards ── */}
        <div className={styles.row2} ref={row2Ref}>
          <div className={styles.cardSlot} data-card>
            <FlipCard
              ref={(el) => { cardRefs.current[0] = el }}
              innerRef={(el) => { innerRefs.current[0] = el }}
              clickOnly
              gsapControlled={gsapControlled}
              front={<img src={cloudImg(GS_CARDS['grateful-front'], 400)} alt="Grateful reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['grateful-back'], 400)} alt="Grateful reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card>
            <FlipCard
              ref={(el) => { cardRefs.current[1] = el }}
              innerRef={(el) => { innerRefs.current[1] = el }}
              clickOnly
              gsapControlled={gsapControlled}
              front={<img src={cloudImg(GS_CARDS['heartbroken-front'], 400)} alt="Heartbroken reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['heartbroken-back'], 400)} alt="Heartbroken reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card>
            <FlipCard
              ref={(el) => { cardRefs.current[2] = el }}
              innerRef={(el) => { innerRefs.current[2] = el }}
              clickOnly
              gsapControlled={gsapControlled}
              front={<img src={cloudImg(GS_CARDS['valued-front'], 400)} alt="Valued reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['valued-back'], 400)} alt="Valued reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card>
            <FlipCard
              ref={(el) => { cardRefs.current[3] = el }}
              innerRef={(el) => { innerRefs.current[3] = el }}
              clickOnly
              gsapControlled={gsapControlled}
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
