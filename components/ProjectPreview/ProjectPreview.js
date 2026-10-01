'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './ProjectPreview.module.css'
import AtmosphericStack from '@/components/CardStack/AtmosphericStack'
import FileStack from '@/components/CardStack/FileStack'
import ProjectSheet from '@/components/ProjectSheet/ProjectSheet'

/* Prompts, not copy. Every project gets the same four questions; the
   answers are Lorin's and are marked until she writes them. */
const DEFAULT_STATEMENTS = [
  { label: 'What it proved', todo: 'The outcome in one sentence — what is true now that would not be true without this work?' },
  { label: 'My role', todo: 'What you specifically did, and what your collaborators did. “I” and “we,” both explicit.' },
  { label: 'The decision', todo: 'One decision a non-designer would miss, and why you made it.' },
  { label: 'What I’d change', todo: 'One thing that did not work, and what you would do differently.' },
]

const DEFAULT_META = [
  ['Role', { todo: 'What you led' }],
  ['Team', { todo: 'Who you built it with' }],
  ['Timeline', { todo: 'Season and year' }],
  ['Context', { todo: 'Client, studio, or course' }],
]

gsap.registerPlugin(useGSAP)

/**
 * ProjectPreview — scroll-driven project showcase (skim-test variant).
 *
 * On scroll: media shrinks and text reveals on the other side, then the
 * pin releases. Skimmer scrolls past at native speed after the compose
 * moment. Diver opts into depth via the carousel — click/tap the media
 * to advance, click a dot to jump to a specific slide.
 *
 * @param {string} mediaSrc — initial media src (image or video)
 * @param {'image'|'video'} mediaType — initial media type
 * @param {string} mediaAlt — alt text for initial media
 * @param {Array<{src,type,alt}>} [mediaSequence] — additional slides
 *   surfaced via the click/dot interactive carousel after the compose
 *   moment lands
 */
export default function ProjectPreview({
  num, title, tagline, description, contributions = [],
  pillVariant = 'weave', mediaSrc, mediaType = 'image', mediaAlt = '',
  mediaSequence = [],
  href, external = false, ctaLabel, comingSoon = false, flip = false,
  /* Press citation ({ publisher, publication, title }) when the href is a
     real editorial feature — the sheet sets it as a credential. */
  press = null,
  /** 'carousel' (default) | 'atmospheric' | 'file' */
  cardVariant = 'carousel',
  /** Sheet content. Both default to prompts so nothing is invented. */
  /* New sheet content shape; falls through to statements when absent. */
  sheet = null,
  statements = DEFAULT_STATEMENTS,
  meta = DEFAULT_META,
}) {
  const stackApiRef = useRef(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  /* The sheet grows out of the folder, so it only exists where a folder
     does — the other card variants keep the plain case-study link. */
  /* FS294: only a FINISHED case study opens as a sheet, and a case study is
     finished when it has sheet content (Groundswell, today). Every other
     folder keeps its original link (Medium, the feature) on the homepage;
     their draft sheets stay in the code, out of public view. */
  const canExpand = cardVariant === 'file' && contributions.length > 0 && !!sheet

  const getOrigin = useCallback(() => {
    const api = stackApiRef.current
    if (!api) return null
    return {
      el: api.getActiveCard(),
      index: api.getActiveIndex(),
      slots: api.getSlots(),
    }
  }, [])
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const textRef = useRef(null)
  const controlsRef = useRef(null)
  const slidesRef = useRef([])
  const prevActiveRef = useRef(0)
  /* Tracks which arrow / control caused the most recent slide change so
     the GSAP transition can move in a matching direction. 'next' = new
     slide rises from below; 'previous' = new slide descends from above. */
  const directionRef = useRef('next')

  /* Build the ordered slide list: initial media first, then carousel slides */
  const allSlides = [
    { src: mediaSrc, type: mediaType, alt: mediaAlt },
    ...mediaSequence,
  ]
  const hasCarousel = allSlides.length > 1

  const [activeSlide, setActiveSlide] = useState(0)
  const advance = useCallback(() => {
    if (!hasCarousel) return
    directionRef.current = 'next'
    setActiveSlide(prev => (prev + 1) % allSlides.length)
  }, [hasCarousel, allSlides.length])
  const previous = useCallback(() => {
    if (!hasCarousel) return
    directionRef.current = 'previous'
    setActiveSlide(prev => (prev - 1 + allSlides.length) % allSlides.length)
  }, [hasCarousel, allSlides.length])

  /* Slide-in animation on activeSlide change. Direction-aware: next =
     rise from below, previous = descend from above. The CSS opacity
     crossfade still runs underneath, so the incoming slide both fades
     in AND moves into place — a composed transition rather than a
     bare replace. Skips the initial render (activeSlide === 0 ===
     prevActiveRef.current). */
  useEffect(() => {
    if (prevActiveRef.current === activeSlide) return
    const slide = slidesRef.current[activeSlide]
    if (slide) {
      const fromY = directionRef.current === 'next' ? 100 : -100
      gsap.fromTo(
        slide,
        { yPercent: fromY },
        { yPercent: 0, duration: 0.55, ease: 'power2.inOut' }
      )
    }
    prevActiveRef.current = activeSlide
  }, [activeSlide])

  useGSAP(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    const text = textRef.current
    if (!section || !media || !text) return

    const controls = controlsRef.current

    /* Initial mediaWrap centering. At 95% width with flex-start anchoring
       there's a 5% gap on the opposite side, which reads as off-center.
       Shifting the wrap by 2.5% of section width (≈ 2.632% of its own
       95%-of-section width) puts it visually centered. During compose,
       xPercent tweens back to 0 so the final 55% width lands flush at
       its natural flex anchor. On mobile (column layout) this trick
       isn't needed — the media is full-width and stacks above the text. */
    const isMobile = window.matchMedia('(max-width: 900px)').matches
    const centerShift = isMobile ? 0 : (flip ? -2.632 : 2.632)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(text, { autoAlpha: 1 })
      gsap.set(media, { xPercent: centerShift })
      if (controls) gsap.set(controls, { autoAlpha: 1 })
      return
    }

    /* Initial state: text hidden, dots hidden until compose lands. */
    gsap.set(text, isMobile
      ? { autoAlpha: 0, y: 24 }
      : { autoAlpha: 0, x: flip ? -40 : 40 })
    gsap.set(media, { xPercent: centerShift })
    if (controls) gsap.set(controls, { autoAlpha: 0, y: 8 })

    /* Compose timeline: paused, played by IntersectionObserver when the
       section enters view. No scrub, no pin — same model as the bio and
       practice cards. Section's min-height: 90vh provides natural
       dwell; the cascade lands in ~0.9s, well within the user's normal
       scroll-through window. */
    const tl = gsap.timeline({ paused: true })

    /* Compose: media shrinks (desktop only — on mobile the column
       layout keeps media full-width, since shrinking to 55% leaves the
       imagery tiny and pushed up off-screen) and text reveals. */
    if (!isMobile) {
      tl.to(media, {
        width: '55%',
        xPercent: 0,
        duration: 1.6,
        ease: 'power1.inOut',
      }, 0)
    }

    tl.to(text, isMobile
      ? {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power1.inOut',
        }
      : {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'power1.inOut',
        },
      0.6,
    )

    /* Dots fade up after compose has mostly landed — signaling the
       interactive carousel is ready to use. */
    if (controls) {
      tl.to(controls, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 1.4)
    }

    /* Threshold 0.35: fires once roughly a third of the section is in
       view, so the compose only begins once the user has clearly
       transitioned to looking at this card and not the previous one. */
    const composeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play()
          composeObserver.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    composeObserver.observe(section)
  }, { scope: sectionRef, dependencies: [mediaSrc, mediaSequence.length] })

  const pillClass = styles[`pill${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.pillWeave

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${flip ? styles.flip : ''}`}
      aria-label={title}
    >
      {/* Media wrapper — the sizing element GSAP shrinks on scroll */}
      <div ref={mediaRef} className={styles.mediaWrap}>
        {cardVariant === 'atmospheric' ? (
          <AtmosphericStack slides={allSlides} />
        ) : cardVariant === 'file' ? (
          <FileStack
            slides={allSlides}
            contributions={contributions}
            pillVariant={pillVariant}
            stackApiRef={stackApiRef}
          />
        ) : (
          <>
            <div
              className={`${styles.media} ${hasCarousel ? styles.mediaInteractive : ''}`}
              onClick={hasCarousel ? advance : undefined}
              role={hasCarousel ? 'button' : undefined}
              tabIndex={hasCarousel ? 0 : undefined}
              aria-label={hasCarousel ? `View next image (${activeSlide + 1} of ${allSlides.length})` : undefined}
              onKeyDown={hasCarousel ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance() } } : undefined}
            >
              {allSlides.map((slide, i) => (
                <div
                  key={i}
                  ref={el => { slidesRef.current[i] = el }}
                  className={`${styles.slide} ${activeSlide === i ? styles.slideActive : ''}`}
                  aria-hidden={activeSlide === i ? undefined : 'true'}
                >
                  {slide.type === 'video' ? (
                    <video
                      src={slide.src}
                      autoPlay muted loop playsInline
                      ref={el => { if (el) el.muted = true }}
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

            {hasCarousel && (
              <div ref={controlsRef} className={styles.carouselControls}>
                <button
                  type="button"
                  className={styles.carouselArrow}
                  onClick={(e) => { e.stopPropagation(); previous() }}
                  aria-label="Previous image"
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span
                  className={styles.carouselCounter}
                  aria-live="polite"
                  aria-label={`Image ${activeSlide + 1} of ${allSlides.length}`}
                >
                  {String(activeSlide + 1).padStart(2, '0')}
                  <span className={styles.carouselCounterDivider} aria-hidden="true"> / </span>
                  {String(allSlides.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className={styles.carouselArrow}
                  onClick={(e) => { e.stopPropagation(); advance() }}
                  aria-label="Next image"
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Text — hidden initially, reveals on scroll */}
      <div ref={textRef} className={styles.text}>
        <span className={styles.num}>{num}</span>
        <h2 className={styles.title}>{title}</h2>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
        {description && <p className={styles.description}>{description}</p>}
        {contributions.length > 0 && (
          <div className={styles.pills}>
            {contributions.map(c => (
              <span key={c.label} className={`${styles.pill} ${pillClass}`}>{c.label}</span>
            ))}
          </div>
        )}
        {canExpand && (
          <button
            type="button"
            className={styles.expand}
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen(true)}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path className={styles.c1} d="M6 1.5H1.5V6" />
              <path className={styles.c2} d="M10 1.5H14.5V6" />
              <path className={styles.c3} d="M14.5 10V14.5H10" />
              <path className={styles.c4} d="M1.5 10V14.5H6" />
            </svg>
            Open project
          </button>
        )}
        {href && !comingSoon && !canExpand && (
          <a
            href={href}
            className={styles.cta}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {ctaLabel || (external ? 'Read on Medium' : 'View Case Study')}{' '}
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
        {comingSoon && !canExpand && (
          <span className={styles.comingSoon}>Case study coming soon</span>
        )}
      </div>

      {canExpand && (
        <ProjectSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          getOrigin={getOrigin}
          num={num}
          title={title}
          tagline={tagline}
          sheet={sheet}
          facets={contributions}
          meta={meta}
          statements={statements}
          href={comingSoon ? null : href}
          hrefLabel={ctaLabel}
          press={press}
          external={external}
        />
      )}
    </section>
  )
}
