'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, EASE } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import styles from './Hero.module.css'

gsap.registerPlugin(useGSAP)

/**
 * Case study Hero — cinematic, image-led entry.
 * Full-bleed image fills the viewport on load with subtle Ken-Burns
 * scale-in. Foreground type layers in over the image in a choreographed
 * sequence: eyebrow → frame line → title (SplitText mask) → tagline →
 * meta → scroll cue. Each beat tells the eye where to land next.
 *
 * Pass the media element as children — usually a `<Image fill ... />`
 * which the .media wrapper positions absolute.
 */
export default function Hero({ title, tagline, role, year, collaborators, eyebrow, children }) {
  const heroRef = useRef(null)
  const mediaRef = useRef(null)
  const eyebrowRef = useRef(null)
  const frameLineRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const metaRef = useRef(null)
  const scrollCueRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(
        [eyebrowRef.current, titleRef.current, taglineRef.current, metaRef.current, scrollCueRef.current],
        { autoAlpha: 1, y: 0 }
      )
      gsap.set(frameLineRef.current, { scaleY: 1 })
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    /* Entry choreography. The eye is led:
       0.0s — image scales 1.04 → 1.0 (Ken Burns into stillness)
       0.5s — eyebrow fades in (top of frame, smallest weight)
       0.7s — frame line draws bottom → top (anchor for the title)
       0.9s — title reveals char-by-char via SplitText mask
       +0.2s — tagline lifts in
       +0.2s — meta cascades
       +0.4s — scroll cue invites you forward */
    const tl = gsap.timeline()

    tl.fromTo(
      mediaRef.current,
      { scale: 1.04 },
      { scale: 1, duration: 1.2, ease: EASE.out },
      0
    )
      .from(eyebrowRef.current, { autoAlpha: 0, y: 8, duration: 0.7, ease: EASE.inOut }, 0.5)
      .from(
        frameLineRef.current,
        { scaleY: 0, duration: 0.7, ease: EASE.inOut, transformOrigin: 'bottom' },
        0.7
      )

    /* Title: SplitText creates the masked chars synchronously, then we
       animate them on the parent timeline at 0.9s. autoAlpha: 1 set on
       the title parent here un-hides the visibility:hidden CSS state. */
    const split = SplitText.create(titleRef.current, {
      type: 'chars',
      mask: 'chars',
      charsClass: styles.gradient,
    })
    gsap.set(titleRef.current, { autoAlpha: 1 })
    const titleDuration = Math.max(1.0, (split.chars?.length || 1) * 0.08)
    tl.from(
      split.chars,
      { yPercent: 100, duration: titleDuration, stagger: 0.04, ease: EASE.inOut },
      0.9
    )

    tl.from(taglineRef.current, { autoAlpha: 0, y: 12, duration: 0.7, ease: EASE.inOut }, '>-0.5')

    if (metaRef.current) {
      tl.from(
        metaRef.current.querySelectorAll('div'),
        { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.06, ease: EASE.inOut },
        '<+0.2'
      )
    }

    tl.from(scrollCueRef.current, { autoAlpha: 0, y: 8, duration: 0.6, ease: EASE.inOut }, '+=0.4')

    /* Pin + scrub: ~30% viewport pin holds the hero in place while the
       image parallaxes up and the foreground type clears out. Mobile gets
       pinType:'fixed' to survive iOS Safari URL-bar drift. */
    const pin = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: '+=30%',
      pin: true,
      pinSpacing: true,
      pinType: isMobile ? 'fixed' : 'transform',
      scrub: 0.6,
      animation: gsap
        .timeline()
        .to(mediaRef.current, { yPercent: -10, ease: 'none' }, 0)
        .to(
          [eyebrowRef.current, titleRef.current, taglineRef.current, metaRef.current],
          { autoAlpha: 0, y: -20, ease: EASE.inOut },
          0
        )
        .to(scrollCueRef.current, { autoAlpha: 0, ease: EASE.inOut }, 0),
    })

    return () => {
      if (split && typeof split.revert === 'function') split.revert()
      tl.kill()
      pin.kill()
    }
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className={styles.hero}>
      <div ref={mediaRef} className={styles.media}>
        {children}
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.foreground}>
        {eyebrow && (
          <div ref={eyebrowRef} className={styles.eyebrow}>
            {eyebrow}
          </div>
        )}
        <div className={styles.titleBlock}>
          <span ref={frameLineRef} className={styles.frameLine} aria-hidden="true" />
          <div className={styles.titleContent}>
            <h1 ref={titleRef} className={styles.title}>{title}</h1>
            {tagline && (
              <p ref={taglineRef} className={styles.tagline}>{tagline}</p>
            )}
            {(role || year || collaborators) && (
              <dl ref={metaRef} className={styles.meta}>
                {role && (<div><dt>Role</dt><dd>{role}</dd></div>)}
                {year && (<div><dt>Year</dt><dd>{year}</dd></div>)}
                {collaborators && (<div><dt>With</dt><dd>{collaborators}</dd></div>)}
              </dl>
            )}
          </div>
        </div>
        <div ref={scrollCueRef} className={styles.scrollCue}>
          <span className={styles.scrollCueText}>Scroll</span>
          <svg className={styles.scrollCueArrow} viewBox="0 0 20 24" fill="none" aria-hidden="true">
            <path
              d="M10 2v18M5 14l5 6 5-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
