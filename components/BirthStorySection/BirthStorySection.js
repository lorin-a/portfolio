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

export default function BirthStorySection() {
  const sectionRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    let ctx

    import('gsap').then(({ gsap }) => {
      const items = sectionRef.current?.querySelectorAll('[data-reveal]')
      if (!items?.length) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer.disconnect()

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
        },
        { threshold: 0.15 }
      )

      if (sectionRef.current) observer.observe(sectionRef.current)
      ctx = { revert: () => observer.disconnect() }
    })

    return () => ctx?.revert()
  }, [reducedMotion])

  const hidden = reducedMotion ? undefined : { opacity: 0 }

  return (
    <section className={styles.section} aria-label="BirthStory">
      <div className={styles.inner} ref={sectionRef}>
        <div className={styles.grid}>

          {/* Top-left: default video */}
          <div
            className={`${styles.mediaSlot} ${styles.topLeft}`}
            data-reveal
            style={hidden}
          >
            <video
              src={cloudVideo(HOME_VIDEOS['birthstory-default'], 680)}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              className={styles.media}
            />
          </div>

          {/* Top-right: navbar image */}
          <div
            className={`${styles.mediaSlot} ${styles.topRight}`}
            data-reveal
            style={hidden}
          >
            <img
              src={cloudImg(HOME_IMAGES['bs-navbar'], 680)}
              alt="BirthStory navigation architecture"
              className={styles.media}
              loading="lazy"
            />
          </div>

          {/* Bottom-left: hover video */}
          <div
            className={`${styles.mediaSlot} ${styles.bottomLeft}`}
            data-reveal
            style={hidden}
          >
            <video
              src={cloudVideo(HOME_VIDEOS['birthstory-hover'], 680)}
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              className={styles.media}
            />
          </div>

          {/* Bottom-right: text */}
          <div className={styles.textBlock}>
            <span className={styles.projectNum} data-reveal style={hidden}>02</span>
            <h2 className={styles.title} data-reveal style={hidden}>BirthStory</h2>
            <p className={styles.tagline} data-reveal style={hidden}>
              A micro-app for birthing parents
            </p>
            <p className={styles.description} data-reveal style={hidden}>
              Helping parents document and reflect on their birth experience for University of Pittsburgh Women&rsquo;s Health.
            </p>
            <span className={styles.comingSoon} data-reveal style={hidden}>
              Case study coming soon
            </span>
            <div className={styles.pills} data-reveal style={hidden}>
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

        </div>
      </div>
    </section>
  )
}
