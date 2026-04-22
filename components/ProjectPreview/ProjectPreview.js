'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './ProjectPreview.module.css'

gsap.registerPlugin(useGSAP)

/**
 * ProjectPreview — scroll-driven project showcase.
 *
 * On scroll: media shrinks and text reveals on the other side.
 * Once composed, continued scrolling rotates through additional media
 * in-place (each new slide crossfades in over the previous).
 *
 * @param {string} mediaSrc — initial media src (image or video)
 * @param {'image'|'video'} mediaType — initial media type
 * @param {string} mediaAlt — alt text for initial media
 * @param {Array<{src,type,alt}>} [mediaSequence] — additional slides that
 *   crossfade in-place after the composed state, in scroll order
 */
export default function ProjectPreview({
  num, title, tagline, description, contributions = [],
  pillVariant = 'weave', mediaSrc, mediaType = 'image', mediaAlt = '',
  mediaSequence = [],
  href, comingSoon = false, flip = false,
}) {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const textRef = useRef(null)
  const slidesRef = useRef([])

  useGSAP(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    const text = textRef.current
    if (!section || !media || !text) return

    const slides = slidesRef.current.filter(Boolean)
    const rotationSlides = slides.slice(1) /* slides that lift in after the initial */

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(text, { autoAlpha: 1 })
      /* Rotation slides parked below the frame and hidden under reduced motion */
      rotationSlides.forEach(s => gsap.set(s, { yPercent: 101, autoAlpha: 0 }))
      return
    }

    /* Initial state: text hidden, rotation slides revealed (CSS hid them
       pre-hydration) and parked just below the frame. yPercent: 101 gives
       a 1% buffer so sub-pixel rounding and tiny scroll deltas can't flash
       a sliver of the slide above the bottom edge. */
    gsap.set(text, { autoAlpha: 0, x: flip ? -40 : 40 })
    rotationSlides.forEach(s => gsap.set(s, { yPercent: 101, autoAlpha: 1 }))

    /* Pin length: 100vh compose + 160vh per rotation slide + 100vh final
       hold after the last slide settles, so the user can dwell on it
       before the section releases. */
    const composeUnits = 100
    const perSlideUnits = 160
    const finalHoldUnits = rotationSlides.length > 0 ? 100 : 0
    const pinUnits = composeUnits + rotationSlides.length * perSlideUnits + finalHoldUnits

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${pinUnits}%`,
        pin: true,
        pinType: 'transform',
        scrub: 1, /* heavier — scroll and motion feel weighted together */
      },
    })

    /* Compose: media shrinks and text reveals */
    const composeEnd = composeUnits / pinUnits
    tl.to(media, {
      width: '55%',
      duration: composeEnd,
      ease: 'power1.inOut',
    }, 0)

    tl.to(text, {
      autoAlpha: 1,
      x: 0,
      duration: composeEnd * 0.75,
      ease: 'power1.inOut',
    }, composeEnd * 0.30)

    /* Rotate: each subsequent slide lifts up from below the frame,
       stacking on top of the previous one. Each slide occupies 90% of
       its segment so the glide feels continuous with a short settle. */
    if (rotationSlides.length > 0) {
      const rotateStart = composeEnd + (20 / pinUnits) /* small pause after compose */
      const rotateEnd = 1 - (finalHoldUnits / pinUnits) /* leaves a hold after the last slide */
      const rotateSpan = rotateEnd - rotateStart
      const perSlide = rotateSpan / rotationSlides.length

      rotationSlides.forEach((slide, i) => {
        const enterAt = rotateStart + i * perSlide
        tl.to(slide, {
          yPercent: 0,
          duration: perSlide * 0.95, /* near-full segment so slide is almost always in motion while within its scroll range */
          ease: 'power2.inOut', /* stronger S-curve — slide resists at start and settles at end */
        }, enterAt)
      })
    }

  }, { scope: sectionRef, dependencies: [mediaSrc, mediaSequence.length] })

  const pillClass = styles[`pill${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.pillWeave

  /* Build the ordered slide list: initial media first, then rotation slides */
  const allSlides = [
    { src: mediaSrc, type: mediaType, alt: mediaAlt },
    ...mediaSequence,
  ]

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${flip ? styles.flip : ''}`}
      aria-label={title}
    >
      {/* Media wrapper — the sizing element GSAP shrinks on scroll */}
      <div ref={mediaRef} className={styles.mediaWrap}>
        <div className={styles.media}>
          {allSlides.map((slide, i) => (
            <div
              key={i}
              ref={el => { slidesRef.current[i] = el }}
              className={styles.slide}
              aria-hidden={i > 0 ? 'true' : undefined}
            >
              {slide.type === 'video' ? (
                <video
                  src={slide.src}
                  autoPlay muted loop playsInline
                  preload={i === 0 ? 'auto' : 'metadata'}
                  className={styles.slideInner}
                  style={slide.zoom ? { transform: `scale(${slide.zoom})` } : undefined}
                  aria-label={slide.alt}
                />
              ) : (
                <img
                  src={slide.src}
                  alt={i === 0 ? slide.alt : ''}
                  className={styles.slideInner}
                  style={slide.zoom ? { transform: `scale(${slide.zoom})` } : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              )}
            </div>
          ))}
        </div>
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
