'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, SplitText, DrawSVGPlugin } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'
import styles from './AboutSection.module.css'

gsap.registerPlugin(useGSAP)

const CARDS = [
  {
    id: 'currently',
    label: 'Currently',
    body:
      'Building a mental-health product from scratch with Claude Code. Diving deep into Storytelling with Data Humanism. Getting curious about projects in end-of-life care.',
  },
  {
    id: 'seeking',
    label: 'Seeking',
    body:
      'Collaborative teams working on social impact projects, with processes that integrate play, rigor, empathy, and justice.',
  },
  {
    id: 'range',
    label: 'Range',
    body:
      'Participatory research, systems mapping, brand and experience design, facilitation, co-design. Built on nine years across journalism, marketing, caregiving, and creative.',
  },
]

const PRACTICES = [
  {
    id: 'sense',
    label: 'Sense',
    mantra: 'Distil Complexity',
    body:
      'I start with feeling, foraging, and gathering: details, patterns, tensions, emotions.',
  },
  {
    id: 'weave',
    label: 'Weave',
    mantra: 'Amplify Voices',
    body:
      'I weave narratives that balance nuance between: stories & systems, empathy & evidence, details & dreams.',
  },
  {
    id: 'shape',
    label: 'Shape',
    mantra: 'Create Together',
    body:
      'I collaborate to build immersive experiences, supportive environments, and brand identities.',
  },
]

// Gradient values reused from HeroScatter for the "signature" moments.
const PRACTICE_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

export default function AboutSection() {
  const [openCards, setOpenCards] = useState(() => new Set(['currently']))
  const [replayMap, setReplayMap] = useState({})

  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)

  const photoInnerRef = useRef(null)
  const wigglePathRef = useRef(null)
  const bylineTextRef = useRef(null)
  const ledeRef = useRef(null)
  const ledeBeforeRef = useRef(null)
  const ledeAccentRef = useRef(null)
  const ledeAfterRef = useRef(null)
  const cardRefs = useRef([])
  const practiceWrapRef = useRef(null)
  const practiceLabelRef = useRef(null)
  const practiceMarkRefs = useRef([])
  const closerRef = useRef(null)
  const closerQuestionRef = useRef(null)
  const closerCtaRef = useRef(null)

  const toggleCard = useCallback((id) => {
    setOpenCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Hover or focus on a practice card replays just that mark's draw.
  const replayMark = useCallback((id) => {
    setReplayMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }, [])

  const handleCardKeyDown = useCallback(
    (e, id) => {
      if (e.key === 'Escape' && openCards.has(id)) {
        e.preventDefault()
        setOpenCards((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }
    },
    [openCards]
  )

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const cards = cardRefs.current.filter(Boolean)
      const marks = practiceMarkRefs.current.filter(Boolean)
      const allTargets = [
        photoInnerRef.current,
        bylineTextRef.current,
        ledeRef.current,
        ...cards,
        practiceLabelRef.current,
        ...marks,
      ].filter(Boolean)

      if (prefersReduced) {
        gsap.set(allTargets, { autoAlpha: 1, y: 0, x: 0, scale: 1, rotation: 0 })
        gsap.set(photoInnerRef.current, { clipPath: 'circle(75% at 50% 50%)' })
        if (wigglePathRef.current) gsap.set(wigglePathRef.current, { drawSVG: '100%' })
        if (ledeAccentRef.current) gsap.set(ledeAccentRef.current, { autoAlpha: 1, yPercent: 0 })
        // Card bodies inside practice cards.
        const bodies = marks.map((m) => m?.querySelector(`.${styles.practiceCardBody}`)).filter(Boolean)
        if (bodies.length) gsap.set(bodies, { autoAlpha: 1, scale: 1 })
        if (closerQuestionRef.current && closerCtaRef.current) {
          gsap.set([closerQuestionRef.current, closerCtaRef.current], { autoAlpha: 1, y: 0 })
        }
        return
      }

      // Split the lede around the gradient accent: split before + after
      // separately, leave the accent span intact so its gradient renders as
      // one coherent unit across the phrase.
      let beforeChars = []
      let afterChars = []
      if (ledeBeforeRef.current) {
        const splitBefore = SplitText.create(ledeBeforeRef.current, {
          type: 'words,chars',
          mask: 'chars',
          autoSplit: true,
        })
        beforeChars = splitBefore.chars || []
      }
      if (ledeAfterRef.current) {
        const splitAfter = SplitText.create(ledeAfterRef.current, {
          type: 'words,chars',
          mask: 'chars',
          autoSplit: true,
        })
        afterChars = splitAfter.chars || []
      }

      // The pin scrub timeline that drives the byline / lede / cards
      // cascade does not translate well to touch + iOS Safari (pin spacer
      // height calc + address-bar show/hide cause closer/footer overlap
      // and feel glitchy). On mobile, skip the pin and play the same
      // beats via an IntersectionObserver-driven paused timeline below.
      const isAboutMobile = window.matchMedia('(max-width: 900px)').matches

      // Initial hidden states (both platforms). On mobile the cascade
      // plays at natural pace once the byline enters viewport; on desktop
      // it scrubs along the pin timeline.
      gsap.set(photoInnerRef.current, { clipPath: 'circle(0% at 50% 50%)' })
      if (wigglePathRef.current) gsap.set(wigglePathRef.current, { drawSVG: '50% 50%' })
      gsap.set(bylineTextRef.current, { autoAlpha: 0, y: 20 })
      gsap.set([...beforeChars, ...afterChars], { yPercent: 110 })
      if (ledeAccentRef.current) gsap.set(ledeAccentRef.current, { autoAlpha: 0, yPercent: 30 })
      // Drop-down menu cards (Currently/Seeking/Range) — vertical cascade reveal.
      gsap.set(cards, { autoAlpha: 0, y: -30 })

      // Practice cards (Sense/Weave/Shape). Below 800px the cards stack
      // vertically (CSS), so the horizontal cluster→spread x-shift would
      // push them off the viewport. Switch to a simple fade-up stagger
      // on mobile.
      const isPracticeMobile = window.matchMedia('(max-width: 800px)').matches

      if (isPracticeMobile) {
        marks.forEach((m) => {
          if (m) gsap.set(m, { autoAlpha: 0, y: 24 })
        })
      } else {
        if (marks[0]) gsap.set(marks[0], { autoAlpha: 0, x: 260, rotation: -8 })
        if (marks[1]) gsap.set(marks[1], { autoAlpha: 0, x: 0, rotation: 0 })
        if (marks[2]) gsap.set(marks[2], { autoAlpha: 0, x: -260, rotation: 8 })
      }

      // Practice card body copy starts hidden — blooms inside each card after spread.
      const cardBodies = marks
        .map((m) => m?.querySelector(`.${styles.practiceCardBody}`))
        .filter(Boolean)
      gsap.set(cardBodies, { autoAlpha: 0, scale: 0.85, transformOrigin: 'center top' })
      gsap.set(practiceLabelRef.current, { autoAlpha: 0, y: 16 })

      // ─── Pre-pin: photo iris opens as section enters viewport ───
      gsap.to(photoInnerRef.current, {
        clipPath: 'circle(75% at 50% 50%)',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 10%',
          scrub: true,
        },
      })

      // ─── Pinned scrub timeline: each beat cascades, once revealed stays
      // visible. Desktop only — mobile gets the same beats via a paused
      // timeline + IntersectionObserver in the else branch below.
      if (!isAboutMobile) {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            pinType: 'transform',
            scrub: 0.4,
            anticipatePin: 1,
          },
        })

        // Beat 1 — Wiggle ring draws (0 → 1.4s)
        pinTl.to(
          wigglePathRef.current,
          { drawSVG: '0% 100%', duration: 1.4, ease: 'power2.inOut' },
          0
        )

        // Beat 2 — Byline text slides up (1.7 → 2.5s)
        pinTl.to(
          bylineTextRef.current,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          1.7
        )

        // Beat 3a — "Translating lived experience into " types on (2.6 → ~3.4s)
        if (beforeChars.length) {
          pinTl.to(
            beforeChars,
            {
              yPercent: 0,
              duration: 0.5,
              ease: 'power1.inOut',
              stagger: 0.022,
            },
            2.6
          )
        }

        // Beat 3b — Gradient accent "thoughtful design" fades up (3.2 → 3.8s)
        pinTl.to(
          ledeAccentRef.current,
          { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: 'power2.out' },
          3.2
        )

        // Beat 3c — " to improve complex systems." types on (3.4 → ~4.1s)
        if (afterChars.length) {
          pinTl.to(
            afterChars,
            {
              yPercent: 0,
              duration: 0.5,
              ease: 'power1.inOut',
              stagger: 0.022,
            },
            3.4
          )
        }

        // Beat 4 — Drop-down menus cascade vertically (4.2 → ~5.1s)
        pinTl.to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
          },
          4.2
        )
      } else {
        // ─── Mobile cascade: same beats as the desktop pin scrub but
        // played at natural pace, triggered when the byline enters the
        // viewport. Tighter durations than desktop since there's no
        // scroll-velocity smoothing — the user dwells on the section.
        const mobileTl = gsap.timeline({ paused: true })

        if (wigglePathRef.current) {
          mobileTl.to(
            wigglePathRef.current,
            { drawSVG: '0% 100%', duration: 1.0, ease: 'power2.inOut' },
            0
          )
        }

        mobileTl.to(
          bylineTextRef.current,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.4
        )

        if (beforeChars.length) {
          mobileTl.to(
            beforeChars,
            { yPercent: 0, duration: 0.4, ease: 'power1.inOut', stagger: 0.018 },
            1.0
          )
        }

        if (ledeAccentRef.current) {
          mobileTl.to(
            ledeAccentRef.current,
            { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power2.out' },
            1.4
          )
        }

        if (afterChars.length) {
          mobileTl.to(
            afterChars,
            { yPercent: 0, duration: 0.4, ease: 'power1.inOut', stagger: 0.018 },
            1.5
          )
        }

        mobileTl.to(
          cards,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 },
          2.0
        )

        // Trigger the cascade when the byline enters the viewport — by
        // that point the photo iris has already opened (its own scrub
        // trigger) so this kicks in just as the user starts to read.
        const mobileObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              mobileTl.play()
              mobileObserver.disconnect()
            }
          },
          { threshold: 0.3 }
        )
        if (bylineTextRef.current) mobileObserver.observe(bylineTextRef.current)
      }

      // ─── Practice timeline: paused until IntersectionObserver fires.
      // Plays at its own natural pace when the practice block is visibly
      // in view — not tied to scroll velocity or scrub smoothing.
      if (practiceWrapRef.current) {
        const practiceTl = gsap.timeline({ paused: true })

        practiceTl
          .to(
            practiceLabelRef.current,
            { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            0
          )
          .to(
            marks,
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.08,
            },
            0.2
          )
          .to(
            marks,
            isPracticeMobile
              ? {
                  y: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                  stagger: 0.08,
                }
              : {
                  x: 0,
                  rotation: 0,
                  duration: 0.7,
                  ease: 'power2.out',
                  stagger: 0.06,
                },
            0.8
          )

        if (cardBodies.length) {
          practiceTl.to(
            cardBodies,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.4)',
              stagger: 0.1,
            },
            1.5
          )
        }

        // Play once and stay revealed. Reverse-on-exit was animating the
        // cards back to invisible whenever the section left the viewport
        // (in either direction), so they appeared "gone" the moment the
        // user scrolled past to the closer/footer.
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              practiceTl.play()
              observer.disconnect()
            }
          },
          { threshold: 0.35 }
        )
        observer.observe(practiceWrapRef.current)
      }

      // ─── Closer: question stagger-types in, then "Reach out!" pops as
      // one bouncy unit. The CTA is animated whole (not split) so its
      // gradient text-fill survives — background-clip: text on a parent
      // does not propagate through transformed character spans.
      if (closerQuestionRef.current && closerCtaRef.current) {
        // Split into words AND chars so chars animate individually but
        // word wrappers prevent mid-word line breaks (e.g., "somethin"
        // / "g meaningful").
        const splitQ = SplitText.create(closerQuestionRef.current, { type: 'words,chars' })
        const qChars = splitQ.chars || []

        gsap.set(qChars, { autoAlpha: 0, y: 14 })
        gsap.set(closerCtaRef.current, {
          autoAlpha: 0,
          yPercent: 60,
          scale: 0.6,
          transformOrigin: 'center bottom',
        })

        // Paused timeline driven by IntersectionObserver — same pattern as
        // the practice section. ScrollTrigger's calculated start position
        // was firing while the closer was still offscreen because the
        // about section's pin shifts the closer's effective viewport
        // position. IntersectionObserver fires on actual viewport
        // intersection, so the animation plays exactly when the closer
        // becomes visible.
        const closerTl = gsap.timeline({ paused: true })

        closerTl
          .to(qChars, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power1.inOut',
            stagger: 0.018,
          })
          .to(
            closerCtaRef.current,
            {
              autoAlpha: 1,
              yPercent: 0,
              scale: 1,
              duration: 0.9,
              ease: 'back.out(2.6)',
            },
            '-=0.1'
          )

        // Play once and stay revealed (same reasoning as the practice
        // observer above — reverse-on-exit was animating the closer
        // back to invisible whenever it briefly left the viewport).
        const closerObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              closerTl.play()
              closerObserver.disconnect()
            }
          },
          { threshold: 0.3 }
        )
        closerObserver.observe(closerRef.current)
      }
    },
    { scope: wrapperRef, dependencies: [] }
  )

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section
        ref={sectionRef}
        className={styles.about}
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className={styles.visuallyHidden}>
          About Lorin Anderberg
        </h2>

        <div className={styles.inner}>
          {/* ── Byline: photo centered, name stacked beneath ── */}
          <div className={styles.anchor}>
            <div className={styles.photoWrap}>
              <div className={styles.photoRing} aria-hidden="true">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient
                      id="aboutWiggleGrad"
                      x1="5%"
                      y1="5%"
                      x2="88%"
                      y2="88%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: 'var(--color-sage-soft)' }}
                      />
                      <stop
                        offset="45%"
                        style={{ stopColor: 'var(--color-plum-soft)' }}
                      />
                      <stop
                        offset="88%"
                        style={{ stopColor: 'var(--color-terracotta-soft)' }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    ref={wigglePathRef}
                    d="M100 8 C 145 6, 188 38, 193 85 C 198 132, 168 180, 118 192 C 68 204, 15 175, 7 125 C -1 75, 30 18, 78 9 C 82 8.3, 90 7.5, 100 8 Z"
                    fill="none"
                    stroke="url(#aboutWiggleGrad)"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div ref={photoInnerRef} className={styles.photoInner}>
                <Image
                  src={cloudImg(HOME_IMAGES['lorin-photo'], 480)}
                  alt="Lorin Anderberg, smiling warmly at the camera"
                  fill
                  sizes="(max-width: 600px) 220px, (max-width: 900px) 220px, 280px"
                  className={styles.photoImage}
                />
              </div>
            </div>

            <div ref={bylineTextRef} className={styles.bylineText}>
              <p className={styles.name}>Lorin Anderberg</p>
              <p className={styles.title}>Designer &amp; Researcher</p>
              <p className={styles.location}>Based in NYC</p>
            </div>
          </div>

          {/* ── Lede ── */}
          <div className={styles.ledeWrap}>
            <p ref={ledeRef} className={styles.lede}>
              <span ref={ledeBeforeRef}>{'Translating lived experience into '}</span>
              <span ref={ledeAccentRef} className={styles.ledeAccent}>
                thoughtful design
              </span>
              <span ref={ledeAfterRef}>{' to improve complex systems.'}</span>
            </p>
          </div>

          {/* ── Three cards ── */}
          <div className={styles.cards}>
            {CARDS.map((card, i) => {
              const isOpen = openCards.has(card.id)
              const panelId = `about-card-${card.id}-panel`
              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  className={styles.cardWrap}
                >
                  <article
                    className={`${styles.card} ${isOpen ? styles.cardOpen : ''} ${styles[`cardTilt${i}`]}`}
                  >
                    <button
                      type="button"
                      className={styles.cardHeader}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleCard(card.id)}
                      onKeyDown={(e) => handleCardKeyDown(e, card.id)}
                    >
                      <span className={styles.cardLabel}>{card.label}</span>
                      <svg
                        className={styles.cardChevron}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 7.5l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </button>
                    <div
                      id={panelId}
                      className={`${styles.cardPanel} ${isOpen ? styles.cardPanelOpen : ''}`}
                      aria-hidden={!isOpen}
                    >
                      <p className={styles.cardBody}>{card.body}</p>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          {/* ── Practice: Sense / Weave / Shape fanned cards ── */}
          <div ref={practiceWrapRef} className={styles.practiceWrap}>
            <p ref={practiceLabelRef} className={styles.practiceLabel}>
              How I work
            </p>
            <div className={styles.practiceFan} role="group" aria-label="My practice">
              {PRACTICES.map((p, i) => {
                const Mark =
                  p.id === 'sense' ? SenseMark : p.id === 'weave' ? WeaveMark : ShapeMark
                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      practiceMarkRefs.current[i] = el
                    }}
                    data-practice={p.id}
                    className={styles.practiceCard}
                    onMouseEnter={() => replayMark(p.id)}
                    onFocus={() => replayMark(p.id)}
                    tabIndex={0}
                    aria-label={`${p.label}: ${p.mantra}. ${p.body}`}
                  >
                    <span className={styles.practiceCardMark} aria-hidden="true">
                      <Mark
                        animate
                        showBrush
                        replay={replayMap[p.id] || 0}
                        gradientColors={PRACTICE_GRADIENT}
                      />
                    </span>
                    <span className={styles.practiceCardName} aria-hidden="true">
                      {p.label}
                    </span>
                    <span className={styles.practiceCardMantra} aria-hidden="true">
                      {p.mantra}
                    </span>
                    <span className={styles.practiceCardBody}>{p.body}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Closer ── */}
          <p ref={closerRef} className={styles.closer}>
            <span ref={closerQuestionRef} className={styles.closerQuestion}>
              Want to make something meaningful?
            </span>
            {' '}
            <a
              ref={closerCtaRef}
              href="mailto:lorinanderberg1@gmail.com"
              className={styles.closerCta}
            >
              Reach out!
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
