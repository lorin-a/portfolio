'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
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
  const bylineRef = useRef(null)
  const ledeRef = useRef(null)
  const cardRefs = useRef([])
  const practiceRef = useRef(null)
  const contactRef = useRef(null)

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
      const elements = [
        bylineRef.current,
        ledeRef.current,
        ...cards,
        practiceRef.current,
        contactRef.current,
      ].filter(Boolean)

      if (prefersReduced) {
        gsap.set(elements, { autoAlpha: 1, y: 0, scale: 1 })
        return
      }

      // Initial hidden state for each element
      gsap.set(bylineRef.current, { autoAlpha: 0, y: 40, scale: 0.96 })
      gsap.set(ledeRef.current, { autoAlpha: 0, y: 40 })
      cards.forEach((el) => gsap.set(el, { autoAlpha: 0, y: 40 }))
      gsap.set(practiceRef.current, { autoAlpha: 0, y: 40 })
      gsap.set(contactRef.current, { autoAlpha: 0, y: 40 })

      // Per-element scroll-driven reveal.
      // Each element animates as it crosses the 90% → 50% viewport band.
      // scrub:1 ties motion to scroll position with light smoothing.
      elements.forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        })
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
          <div ref={bylineRef} className={styles.byline}>
            <div className={styles.photoWrap}>
              <div className={styles.photoHalo} aria-hidden="true" />
              <div className={styles.photoInner}>
                <Image
                  src={cloudImg(HOME_IMAGES['lorin-photo'], 480)}
                  alt="Lorin Anderberg, smiling warmly at the camera"
                  fill
                  sizes="(max-width: 600px) 160px, (max-width: 900px) 200px, 240px"
                  className={styles.photoImage}
                />
              </div>
            </div>

            <div className={styles.bylineText}>
              <p className={styles.name}>Lorin Anderberg</p>
              <p className={styles.title}>Designer &amp; Researcher</p>
              <p className={styles.location}>Based in NYC</p>
            </div>
          </div>

          {/* ── Lede ── */}
          <div ref={ledeRef} className={styles.ledeWrap}>
            <p className={styles.lede}>
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
          <div ref={practiceRef} className={styles.practiceWrap}>
            <p className={styles.practiceLabel}>How I work</p>
            <div className={styles.practiceRow} role="group" aria-label="My practice">
              {PRACTICES.map((p) => {
                const isActive = activePractice === p.id
                const Mark =
                  p.id === 'sense' ? SenseMark : p.id === 'weave' ? WeaveMark : ShapeMark
                return (
                  <button
                    key={p.id}
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
              <li>
                <a
                  className={styles.contactPill}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  className={styles.contactPill}
                  href="https://www.linkedin.com/in/lorin-anderberg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
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
