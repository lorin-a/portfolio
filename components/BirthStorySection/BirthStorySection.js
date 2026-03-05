'use client'

import { useEffect, useRef, useState } from 'react'
import { cloudImg, cloudVideo, HOME_VIDEOS, HOME_IMAGES } from '@/lib/cloudinary'
import styles from './BirthStorySection.module.css'

const PILL_MAP = {
  'UX Research': 'pillSense',
  'UX Design': 'pillWeave',
  'Client Iteration': 'pillShape',
}

const CONTRIBUTIONS = [
  { label: 'UX Research' },
  { label: 'UX Design' },
  { label: 'Client Iteration' },
]

const GALLERY_IMAGES = ['bs', 'bs-2', 'bs-3', 'bs-4', 'bs-5']

/* Load GSAP + ScrollTrigger once, shared across all effects */
let gsapReady
function loadGsapWithScrollTrigger() {
  if (!gsapReady) {
    gsapReady = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    })
  }
  return gsapReady
}

export default function BirthStorySection() {
  const sectionRef = useRef(null)
  const runwayRef = useRef(null)
  const galleryRef = useRef(null)
  const stickyRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  /* Scroll-driven gallery */
  useEffect(() => {
    if (reducedMotion || !galleryRef.current || !runwayRef.current || !stickyRef.current) return

    let ctx

    loadGsapWithScrollTrigger().then(({ gsap }) => {
      ctx = gsap.context(() => {
        const layers = galleryRef.current?.querySelectorAll('[data-gallery-layer]')
        if (!layers?.length || layers.length < 2) return

        const stickyHeight = stickyRef.current.offsetHeight
        const swaps = layers.length - 1
        runwayRef.current.style.height = `${stickyHeight + swaps * stickyHeight * 0.8}px`

        layers.forEach((layer, i) => {
          gsap.set(layer, {
            yPercent: i === 0 ? 0 : 100,
            zIndex: i + 1,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: runwayRef.current,
            start: 'top 40%',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        })

        /* Hold on first image so user can see it */
        tl.to({}, { duration: 1.5 })

        for (let i = 1; i < layers.length; i++) {
          tl.to(layers[i], {
            yPercent: 0,
            duration: 1,
            ease: 'power1.inOut',
          })
          if (i < layers.length - 1) {
            tl.to({}, { duration: 0.4 })
          }
        }
      }, sectionRef.current)
    })

    return () => ctx?.revert()
  }, [reducedMotion])

  return (
    <section className={styles.section} aria-label="BirthStory" ref={sectionRef}>

      {/* Row 1: full-width video */}
      <div className={styles.inner}>
        <div className={styles.videoRow}>
          <video
            src={cloudVideo(HOME_VIDEOS['birthstory-default'], 1200)}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            className={styles.media}
          />
        </div>
      </div>

      {/* Row 2: sticky gallery + text together */}
      <div className={styles.galleryWrap}>
        <div className={styles.galleryRunway} ref={runwayRef}>
          <div className={styles.gallerySticky} ref={stickyRef}>
            <div className={styles.gallery} ref={galleryRef}>
              {GALLERY_IMAGES.map((key, i) => (
                <img
                  key={key}
                  src={cloudImg(HOME_IMAGES[key], 1200)}
                  alt={`BirthStory screen ${i + 1}`}
                  className={styles.galleryLayer}
                  data-gallery-layer
                  loading={i === 0 ? undefined : 'lazy'}
                />
              ))}
            </div>

            {/* Text row — visible while gallery cycles */}
            <div className={styles.textRow}>
              <div className={styles.textLeft}>
                <span className={styles.projectNum}>02</span>
                <h2 className={styles.title}>BirthStory</h2>
                <p className={styles.tagline}>A micro-app for birthing parents</p>
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
              </div>

              <div className={styles.textRight}>
                <p className={styles.description}>
                  Helping parents document and reflect on their birth experience for University of Pittsburgh Women&rsquo;s Health.
                </p>
                <span className={styles.comingSoon}>
                  Case study coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
