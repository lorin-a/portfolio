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
    paradox: 'meticulous dreamer',
    mantra: 'Distilling Complexity',
    body:
      'I map complexity to reveal root causes, using participatory research and systems thinking.',
  },
  {
    id: 'weave',
    label: 'Weave',
    paradox: 'playful perfectionist',
    mantra: 'Amplifying Voices',
    body:
      'I translate lived experience into narratives that make complexity accessible and catalyze change.',
  },
  {
    id: 'shape',
    label: 'Shape',
    paradox: 'hopeful realist',
    mantra: 'Holding Space',
    body:
      'I create interventions that transform individual experiences and systemic barriers at the same time.',
  },
]

export default function AboutSection() {
  const [openCards, setOpenCards] = useState(() => new Set(['currently']))
  const [activePractice, setActivePractice] = useState(null)

  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const photoInnerRef = useRef(null)
  const wigglePathRef = useRef(null)
  const bylineTextRef = useRef(null)
  const ledeRef = useRef(null)
  const cardRefs = useRef([])
  const practiceLabelRef = useRef(null)
  const practiceMarkRefs = useRef([])
  const contactRef = useRef(null)
  const pillRefs = useRef([])

  const toggleCard = useCallback((id) => {
    setOpenCards((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const togglePractice = useCallback((id) => {
    setActivePractice((prev) => (prev === id ? null : id))
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
      const pills = pillRefs.current.filter(Boolean)
      const allTargets = [
        photoInnerRef.current,
        bylineTextRef.current,
        ledeRef.current,
        ...cards,
        practiceLabelRef.current,
        ...marks,
        ...pills,
      ].filter(Boolean)

      if (prefersReduced) {
        gsap.set(allTargets, { autoAlpha: 1, y: 0, x: 0, scale: 1, rotation: 0 })
        gsap.set(photoInnerRef.current, { clipPath: 'circle(75% at 50% 50%)' })
        if (wigglePathRef.current) gsap.set(wigglePathRef.current, { drawSVG: '100%' })
        return
      }

      // SplitText on the lede (char-by-char mask reveal).
      let ledeSplit = null
      if (ledeRef.current) {
        ledeSplit = SplitText.create(ledeRef.current, {
          type: 'chars',
          mask: 'chars',
          autoSplit: true,
        })
      }

      // Initial hidden states. Each element starts off-position/invisible;
      // the timeline animates them in as the section enters view.
      gsap.set(photoInnerRef.current, { clipPath: 'circle(0% at 50% 50%)' })
      if (wigglePathRef.current) gsap.set(wigglePathRef.current, { drawSVG: '50% 50%' })
      gsap.set(bylineTextRef.current, { autoAlpha: 0, x: -24 })
      if (ledeSplit) gsap.set(ledeSplit.chars, { yPercent: 110 })
      gsap.set(cards, { autoAlpha: 0, y: -80 })
      gsap.set(practiceLabelRef.current, { autoAlpha: 0, y: 16 })
      gsap.set(marks, { autoAlpha: 0, scale: 0.4 })
      gsap.set(pills, { autoAlpha: 0, scale: 0.8, y: 20 })

      // ─── Pre-pin reveal: photo iris opens as the section enters the viewport.
      // By the time pin starts at 'top top', the photo is fully revealed and
      // anchors the view. Wiggle ring waits for pin to draw on.

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

      // ─── Pinned scrub timeline: each beat cascades sequentially with a
      // 0.3s gap between them so the user can absorb each element in turn.
      // Pin distance (+=400%) matches the case study rhythm — heavy, deliberate.

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          pinType: 'transform',
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Beat 1 — Wiggle ring draws around photo (0 → 1.4s)
      pinTl.to(
        wigglePathRef.current,
        { drawSVG: '0% 100%', duration: 1.4, ease: 'power2.inOut' },
        0
      )

      // Beat 2 — Byline text slides in (1.7 → 2.5s)
      pinTl.to(
        bylineTextRef.current,
        { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        1.7
      )

      // Beat 3 — Lede chars type on (2.8 → 3.6s)
      if (ledeSplit) {
        pinTl.to(
          ledeSplit.chars,
          {
            yPercent: 0,
            duration: 0.8,
            ease: 'power1.inOut',
            stagger: 0.025,
          },
          2.8
        )
      }

      // Beat 4 — Cards drop with stagger (4.0 → ~5.7s)
      pinTl.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          ease: 'back.out(1.15)',
          stagger: 0.22,
        },
        4.0
      )

      // ─── Below-fold reveals (practice + pills): per-element triggers that
      // fire as they enter the viewport after the pin releases.

      gsap.to(practiceLabelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: practiceLabelRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(marks, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.4)',
        stagger: 0.18,
        scrollTrigger: {
          trigger: marks[0],
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(pills, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.2)',
        stagger: 0.12,
        scrollTrigger: {
          trigger: pills[0],
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
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
          {/* ── Byline: photo + name + meta ── */}
          <div className={styles.byline}>
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
              Translating lived experience into{' '}
              <span className={styles.ledeAccent}>thoughtful design</span>{' '}
              to improve complex systems.
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

          {/* ── Practice: Sense / Weave / Shape ── */}
          <div className={styles.practiceWrap}>
            <p ref={practiceLabelRef} className={styles.practiceLabel}>
              How I work
            </p>
            <div className={styles.practiceRow} role="group" aria-label="My practice">
              {PRACTICES.map((p, i) => {
                const isActive = activePractice === p.id
                const Mark =
                  p.id === 'sense' ? SenseMark : p.id === 'weave' ? WeaveMark : ShapeMark
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      practiceMarkRefs.current[i] = el
                    }}
                    type="button"
                    className={`${styles.practiceMark} ${isActive ? styles.practiceMarkActive : ''}`}
                    aria-pressed={isActive}
                    aria-label={`${p.label}: ${p.paradox}. ${p.mantra}. ${p.body}`}
                    onClick={() => togglePractice(p.id)}
                  >
                    <span className={styles.practiceMarkInner} aria-hidden="true">
                      <Mark animate showBrush />
                    </span>
                    <span className={styles.practiceMarkName} aria-hidden="true">
                      {p.label}
                    </span>
                  </button>
                )
              })}
            </div>
            <div
              className={styles.practiceReveal}
              aria-live="polite"
              aria-atomic="true"
            >
              {activePractice &&
                (() => {
                  const p = PRACTICES.find((x) => x.id === activePractice)
                  if (!p) return null
                  return (
                    <div className={styles.practiceRevealInner}>
                      <p className={styles.practiceParadox}>{p.paradox}</p>
                      <p className={styles.practiceMantra}>{p.mantra}</p>
                      <p className={styles.practiceBody}>{p.body}</p>
                    </div>
                  )
                })()}
            </div>
          </div>

          {/* ── Contact pills ── */}
          <div ref={contactRef} className={styles.contactWrap}>
            <ul className={styles.contact}>
              <li
                ref={(el) => {
                  pillRefs.current[0] = el
                }}
              >
                <a
                  className={styles.contactPill}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>
              <li
                ref={(el) => {
                  pillRefs.current[1] = el
                }}
              >
                <a
                  className={styles.contactPill}
                  href="https://www.linkedin.com/in/lorin-anderberg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li
                ref={(el) => {
                  pillRefs.current[2] = el
                }}
              >
                <a className={styles.contactPill} href="mailto:lorin@lorin.work">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
