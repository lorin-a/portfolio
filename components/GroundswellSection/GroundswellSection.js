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

        /* Phone fades in */
        const phone = el.querySelector('[data-phone]')
        if (phone) {
          gsap.set(phone, { opacity: 0, y: 12, scale: 0.97 })
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(phone, {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7, ease: 'power1.inOut',
              })
            },
          })
        }

        /* Center card fades in */
        const centerCard = el.querySelector('[data-center-card]')
        if (centerCard) {
          gsap.set(centerCard, { opacity: 0, y: 12, scale: 0.97 })
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(centerCard, {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7, delay: 0.1, ease: 'power1.inOut',
              })
            },
          })
        }

        /* Side cards reveal from behind center */
        const leftCard = el.querySelector('[data-card-left]')
        const rightCard = el.querySelector('[data-card-right]')

        if (leftCard && rightCard && centerCard) {
          /* Get center card's grid position for starting point */
          ScrollTrigger.create({
            trigger: el,
            start: 'top 60%',
            once: true,
            onEnter: () => {
              const centerRect = centerCard.getBoundingClientRect()
              const leftRect = leftCard.getBoundingClientRect()
              const rightRect = rightCard.getBoundingClientRect()

              /* Offset = how far each side card needs to travel from center */
              const leftOffset = centerRect.left - leftRect.left
              const rightOffset = centerRect.left - rightRect.left

              gsap.fromTo(leftCard,
                { x: leftOffset, opacity: 0, scale: 0.95 },
                { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power1.inOut' }
              )
              gsap.fromTo(rightCard,
                { x: rightOffset, opacity: 0, scale: 0.95 },
                { x: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.08, ease: 'power1.inOut' }
              )
            },
          })
        }
      }, sectionRef.current)
    }

    loadGsap()
    return () => ctx?.revert()
  }, [reducedMotion])

  /* ── Row 3: text reveal ── */
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
          trigger: sectionRef.current.querySelector('[data-row3]'),
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

  const toggleVideo = useCallback((videoRef) => {
    const vid = videoRef.current
    if (!vid) return
    vid.paused ? vid.play() : vid.pause()
  }, [])

  const hidden = reducedMotion ? undefined : { opacity: 0 }

  return (
    <section className={styles.section} aria-label="Groundswell">
      <div className={styles.inner} ref={sectionRef}>

        {/* ── Row 1: Hero + video ── */}
        <div className={styles.heroImage} data-row1 style={hidden}>
          <img
            src={cloudImg(GS_IMAGES['gs-hero'], 900)}
            alt="Groundswell installation overview"
            className={styles.media}
            loading="lazy"
          />
        </div>

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

        {/* ── Row 2: Phone + 3 cards (4 equal items) ── */}
        <div className={styles.row2} ref={row2Ref}>

          <div className={styles.phoneSlot} data-phone>
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

          <div className={styles.cardSlot} data-card-left>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['grateful-front'], 400)} alt="Grateful reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['grateful-back'], 400)} alt="Grateful reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-center-card>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['heartbroken-front'], 400)} alt="Heartbroken reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['heartbroken-back'], 400)} alt="Heartbroken reflection card, back" className={styles.cardImage} />}
            />
          </div>

          <div className={styles.cardSlot} data-card-right>
            <FlipCard
              clickOnly
              front={<img src={cloudImg(GS_CARDS['valued-front'], 400)} alt="Valued reflection card, front" className={styles.cardImage} />}
              back={<img src={cloudImg(GS_CARDS['valued-back'], 400)} alt="Valued reflection card, back" className={styles.cardImage} />}
            />
          </div>

        </div>

        {/* ── Row 3: Horizontal text strip ── */}
        <div className={styles.row3} data-row3>
          <span className={styles.projectNum} data-text-item>01</span>
          <h2 className={styles.title} data-text-item>Groundswell</h2>
          <p className={styles.tagline} data-text-item>Making Space to Restore, Together</p>
          <p className={styles.description} data-text-item>
            A multi-suite design intervention built to support the complex
            emotional reality of oncology care. Co-designed with healthcare workers.
          </p>
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
          <a href="/projects/groundswell" className={styles.cta} data-text-item>
            View Case Study <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  )
}
