'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './ProjectPreview.module.css'

gsap.registerPlugin(useGSAP)

/**
 * ProjectPreview — scroll-driven project showcase.
 *
 * Starts as a large rounded image filling most of the viewport.
 * On scroll: image shrinks and slides to one side,
 * text reveals on the other side.
 * On hover: secondary images fan out from behind the main image
 * like a stack of cards, revealing project depth.
 *
 * @param {string} num — project number ("01")
 * @param {string} title — project title
 * @param {string} tagline — one-line description
 * @param {string} description — longer description
 * @param {Array} contributions — [{ label }] pills
 * @param {string} pillVariant — 'sense' | 'weave' | 'shape'
 * @param {string} mediaSrc — image or video URL
 * @param {string} mediaType — 'image' | 'video'
 * @param {string} mediaAlt — alt text
 * @param {Array} peekImages — [{src, alt}] secondary images that fan on hover
 * @param {string} href — case study link
 * @param {boolean} comingSoon — disable CTA
 * @param {boolean} flip — image right, text left
 */
export default function ProjectPreview({
  num, title, tagline, description, contributions = [],
  pillVariant = 'weave', mediaSrc, mediaType = 'image', mediaAlt = '',
  peekImages = [], href, comingSoon = false, flip = false,
}) {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const textRef = useRef(null)
  const stackRef = useRef(null)
  const peekRefs = useRef([])

  /* Hover: fan out peek images from behind the main media */
  const { contextSafe } = useGSAP({ scope: sectionRef })

  const peekOut = contextSafe(() => {
    const peeks = peekRefs.current.filter(Boolean)
    if (!peeks.length) return

    /* Peek images slide out to the right, forming a horizontal strip */
    peeks.forEach((el, i) => {
      gsap.to(el, {
        autoAlpha: 1,
        x: 0,
        duration: 0.4,
        ease: 'power1.out',
        delay: i * 0.08,
      })
    })
  })

  const peekIn = contextSafe(() => {
    const peeks = peekRefs.current.filter(Boolean)
    if (!peeks.length) return

    gsap.to(peeks, {
      autoAlpha: 0,
      x: -20,
      duration: 0.25,
      ease: 'power1.inOut',
      stagger: 0.03,
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
      return
    }

    /* Initial state: text hidden, media at full size */
    gsap.set(text, { autoAlpha: 0, x: flip ? -40 : 40 })

    /* Scroll-driven timeline with pin — section stays while composition reveals,
       holds for reading, then releases */
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

    /* 0–40%: Media stack shrinks from full-width to contained card */
    tl.to(media, {
      width: '55%',
      duration: 0.40,
      ease: 'power1.inOut',
    }, 0)

    /* 20–60%: Text fades in from the side */
    tl.to(text, {
      autoAlpha: 1,
      x: 0,
      duration: 0.35,
      ease: 'power1.inOut',
    }, 0.20)

    /* 60–100%: Hold — the composed state sits for the user to read and engage.
       No tweens here, the timeline just holds. */

  }, { scope: sectionRef })

  const pillClass = styles[`pill${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.pillWeave

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${flip ? styles.flip : ''}`}
      aria-label={title}
    >
      {/* Media strip — main image + peek images extending horizontally */}
      <div
        ref={mediaRef}
        className={styles.mediaStrip}
        onMouseEnter={peekOut}
        onMouseLeave={peekIn}
      >
        {/* Main media */}
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

        {/* Peek images — slide out beside the main media on hover */}
        {peekImages.map((img, i) => (
          <div
            key={i}
            ref={el => { peekRefs.current[i] = el }}
            className={styles.peekCard}
          >
            <img src={img.src} alt={img.alt || ''} className={styles.peekImg} />
          </div>
        ))}
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
