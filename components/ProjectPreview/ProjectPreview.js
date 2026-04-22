'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './ProjectPreview.module.css'

gsap.registerPlugin(useGSAP)

/**
 * ProjectPreview — scroll-driven project showcase with peek artifact.
 *
 * On scroll: media shrinks and text reveals on the other side.
 * After composed state settles: a single physical artifact peeks from
 * behind the media edge — a subtle easter egg grounded in the project's
 * real deliverables. Hover lifts the artifact slightly.
 *
 * @param {Object} peek — single artifact that peeks from the media edge
 *   @param {string} peek.src — image URL
 *   @param {string} peek.alt — alt text
 *   @param {'bottom-left'|'bottom-right'|'top-right'|'top-left'} peek.corner — where it peeks from
 *   @param {number} peek.rotation — tilt angle in degrees (e.g. -8)
 *   @param {string} [peek.width] — CSS width (default '22%')
 *   @param {string} [peek.aspectRatio] — CSS aspect-ratio (default '3 / 4')
 */
export default function ProjectPreview({
  num, title, tagline, description, contributions = [],
  pillVariant = 'weave', mediaSrc, mediaType = 'image', mediaAlt = '',
  peek, href, comingSoon = false, flip = false,
}) {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const textRef = useRef(null)
  const peekRef = useRef(null)

  const { contextSafe } = useGSAP({ scope: sectionRef })

  const peekLift = contextSafe(() => {
    if (!peekRef.current || !peek) return
    gsap.to(peekRef.current, {
      y: -10,
      rotation: peek.rotation * 0.4,
      duration: 0.35,
      ease: 'power2.out',
    })
  })

  const peekSettle = contextSafe(() => {
    if (!peekRef.current || !peek) return
    gsap.to(peekRef.current, {
      y: 0,
      rotation: peek.rotation,
      duration: 0.4,
      ease: 'power2.out',
    })
  })

  useGSAP(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    const text = textRef.current
    if (!section || !media || !text) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(text, { autoAlpha: 1 })
      if (peekRef.current) {
        gsap.set(peekRef.current, { autoAlpha: 1, rotation: peek?.rotation || 0 })
      }
      return
    }

    /* Initial state: text hidden, peek hidden behind media */
    gsap.set(text, { autoAlpha: 0, x: flip ? -40 : 40 })
    if (peekRef.current && peek) {
      gsap.set(peekRef.current, {
        autoAlpha: 0,
        rotation: peek.rotation,
        y: 24,
      })
    }

    /* Scroll-driven timeline with pin */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinType: 'transform',
        scrub: 0.6,
      },
    })

    /* 0–40%: Media shrinks from full-width to contained card */
    tl.to(media, {
      width: '55%',
      duration: 0.40,
      ease: 'power1.inOut',
    }, 0)

    /* 20–55%: Text fades in from the side */
    tl.to(text, {
      autoAlpha: 1,
      x: 0,
      duration: 0.35,
      ease: 'power1.inOut',
    }, 0.20)

    /* 60–80%: Peek artifact slides in from behind — the easter egg,
       only appearing once the composed state has settled */
    if (peekRef.current && peek) {
      tl.to(peekRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.20,
        ease: 'power2.out',
      }, 0.60)
    }

    /* 80–100%: Hold — composed state with peek sits for the user to engage */

  }, { scope: sectionRef, dependencies: [peek?.src] })

  const pillClass = styles[`pill${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.pillWeave

  const peekCornerClass = peek
    ? styles[`peek${peek.corner.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}`]
    : ''

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${flip ? styles.flip : ''}`}
      aria-label={title}
    >
      {/* Media wrapper — holds the rounded media + the peeking artifact */}
      <div ref={mediaRef} className={styles.mediaWrap}>
        <div className={styles.media}>
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              autoPlay muted loop playsInline
              className={styles.mediaInner}
            />
          ) : (
            <img
              src={mediaSrc}
              alt={mediaAlt}
              className={styles.mediaInner}
              loading="lazy"
            />
          )}
        </div>

        {peek && (
          <div
            ref={peekRef}
            className={`${styles.peek} ${peekCornerClass}`}
            style={{
              width: peek.width || '22%',
              aspectRatio: peek.aspectRatio || '3 / 4',
            }}
            onMouseEnter={peekLift}
            onMouseLeave={peekSettle}
            aria-hidden="true"
          >
            <img src={peek.src} alt={peek.alt || ''} className={styles.peekImg} />
          </div>
        )}
      </div>

      {/* Text — hidden initially, reveals on scroll */}
      <div ref={textRef} className={styles.text}>
        <span className={styles.num}>{num}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.tagline}>{tagline}</p>
        {description && <p className={styles.description}>{description}</p>}
        {contributions.length > 0 && (
          <div className={styles.pills}>
            {contributions.map(c => (
              <span key={c.label} className={`${styles.pill} ${pillClass}`}>{c.label}</span>
            ))}
          </div>
        )}
        {href && !comingSoon && (
          <a href={href} className={styles.cta}>
            View Case Study <span aria-hidden="true">&rarr;</span>
          </a>
        )}
        {comingSoon && (
          <span className={styles.comingSoon}>Case study coming soon</span>
        )}
      </div>
    </section>
  )
}
