'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Squiggle from '@/components/Squiggle/Squiggle'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'
import styles from './about.module.css'

export default function AboutContent() {
  const heroRef = useRef(null)
  const howIWorkRef = useRef(null)
  const groundedInRef = useRef(null)

  const [heroVisible, setHeroVisible] = useState(false)
  const [howIWorkVisible, setHowIWorkVisible] = useState(false)
  const [groundedInVisible, setGroundedInVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setHeroVisible(true)
      setHowIWorkVisible(true)
      setGroundedInVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          if (entry.target === heroRef.current) setHeroVisible(true)
          if (entry.target === howIWorkRef.current) setHowIWorkVisible(true)
          if (entry.target === groundedInRef.current) setGroundedInVisible(true)

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15 }
    )

    if (heroRef.current) observer.observe(heroRef.current)
    if (howIWorkRef.current) observer.observe(howIWorkRef.current)
    if (groundedInRef.current) observer.observe(groundedInRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <article className={styles.about}>
      {/* Section 1: Hero */}
      <header
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.visible : ''}`}
        aria-labelledby="about-title"
      >
        <div className={styles.photoWrap}>
          <Image
            src={cloudImg(HOME_IMAGES['lorin-photo'], 360)}
            alt="Lorin Anderberg, smiling warmly at the camera"
            width={180}
            height={180}
            className={styles.photo}
          />
        </div>

        <p className={styles.role}>
          Design Researcher · Social Impact Strategist
        </p>

        <h1 id="about-title" className={styles.tagline}>
          I translate lived experience into design solutions that transform how
          people navigate healthcare, education, and complex systems.
        </h1>

        <p className={styles.philosophy}>
          My practice is grounded in narrative storytelling and honors the
          complexity of human experience while making systems more accessible,
          equitable, and humane.
        </p>
      </header>

      {/* Squiggle divider */}
      <div className={styles.squiggleDivider}>
        <Squiggle />
      </div>

      {/* Section 2: How I Work */}
      <section
        ref={howIWorkRef}
        className={`${styles.howIWork} ${howIWorkVisible ? styles.visible : ''}`}
        aria-labelledby="how-i-work-heading"
      >
        <h2 id="how-i-work-heading" className={styles.sectionHeading}>
          How I Work
        </h2>

        <div className={styles.processBeats}>
          {/* Beat 1 — Systems (olive) */}
          <div className={styles.beatRow} style={{ '--delay': '0s' }}>
            <div className={styles.dotColumn}>
              <span
                className={`${styles.dot} ${styles.dotFilled} ${styles.colorOlive}`}
                aria-hidden="true"
              />
              <span
                className={`${styles.connector} ${styles.connectorOlive}`}
                aria-hidden="true"
              />
            </div>
            <div className={styles.beatContent}>
              <h3 className={`${styles.beatTitle} ${styles.colorOlive}`}>
                Systems
              </h3>
              <p className={`${styles.paradox} ${styles.colorOlive}`}>
                meticulous dreamer
              </p>
              <p className={styles.description}>
                I map complexity to reveal root causes using rigorous
                participatory research and systems thinking.
              </p>
              <p className={styles.mantra}>
                <span className={`${styles.mantraLabel} ${styles.colorOlive}`}>
                  Distilling Complexity
                </span>
                <span className={styles.mantraRest}>
                  {' '}— Honoring nuance and making information approachable
                </span>
              </p>
              <p className={styles.skills}>
                Design Research · UX Research · Systems Thinking
              </p>
            </div>
          </div>

          {/* Beat 2 — Stories (terracotta) */}
          <div className={styles.beatRow} style={{ '--delay': '0.18s' }}>
            <div className={styles.dotColumn}>
              <span
                className={`${styles.dot} ${styles.dotFilled} ${styles.colorTerracotta}`}
                aria-hidden="true"
              />
              <span
                className={`${styles.connector} ${styles.connectorTerracotta}`}
                aria-hidden="true"
              />
            </div>
            <div className={styles.beatContent}>
              <h3 className={`${styles.beatTitle} ${styles.colorTerracotta}`}>
                Stories
              </h3>
              <p className={`${styles.paradox} ${styles.colorTerracotta}`}>
                playful perfectionist
              </p>
              <p className={styles.description}>
                I translate lived experience into narratives that make complexity
                accessible and catalyze change.
              </p>
              <p className={styles.mantra}>
                <span
                  className={`${styles.mantraLabel} ${styles.colorTerracotta}`}
                >
                  Amplifying Voices
                </span>
                <span className={styles.mantraRest}>
                  {' '}— Centering the stories of the people closest to the
                  problem
                </span>
              </p>
              <p className={styles.skills}>
                Copywriting · Storytelling · Photo/Video
              </p>
            </div>
          </div>

          {/* Beat 3 — Solutions (plum) */}
          <div className={styles.beatRow} style={{ '--delay': '0.36s' }}>
            <div className={styles.dotColumn}>
              <span
                className={`${styles.dot} ${styles.dotFilled} ${styles.colorPlum}`}
                aria-hidden="true"
              />
              <span
                className={`${styles.connector} ${styles.connectorPlum}`}
                aria-hidden="true"
              />
            </div>
            <div className={styles.beatContent}>
              <h3 className={`${styles.beatTitle} ${styles.colorPlum}`}>
                Solutions
              </h3>
              <p className={`${styles.paradox} ${styles.colorPlum}`}>
                hopeful realist
              </p>
              <p className={styles.description}>
                I create interventions that transform both individual experiences
                and systemic barriers simultaneously.
              </p>
              <p className={styles.mantra}>
                <span className={`${styles.mantraLabel} ${styles.colorPlum}`}>
                  Holding Space
                </span>
                <span className={styles.mantraRest}>
                  {' '}— Creating room for hard truths to surface safely
                </span>
              </p>
              <p className={styles.skills}>
                Co-Design · Brand Design · Marketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Grounded In */}
      <section
        ref={groundedInRef}
        className={`${styles.groundedIn} ${groundedInVisible ? styles.visible : ''}`}
        aria-labelledby="grounded-in-heading"
      >
        <div className={styles.groundedInInner}>
          <h2 id="grounded-in-heading" className={styles.sectionHeading}>
            Grounded In
          </h2>

          <p className={styles.experience}>
            9+ years across communications, marketing, customer service, sales,
            events, and creative
          </p>

          <div className={styles.credentials}>
            {/* Education — filled sage dots */}
            <div className={styles.credentialRow} style={{ '--delay': '0s' }}>
              <div className={styles.dotColumn}>
                <span
                  className={`${styles.dot} ${styles.dotFilled} ${styles.colorSage}`}
                  aria-hidden="true"
                />
                <span
                  className={`${styles.connector} ${styles.connectorSage}`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.credentialContent}>
                <p>
                  <strong>MA in Design</strong> — Carnegie Mellon University ·
                  2025
                </p>
              </div>
            </div>

            <div className={styles.credentialRow} style={{ '--delay': '0.12s' }}>
              <div className={styles.dotColumn}>
                <span
                  className={`${styles.dot} ${styles.dotFilled} ${styles.colorSage}`}
                  aria-hidden="true"
                />
                <span
                  className={`${styles.connector} ${styles.connectorSage}`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.credentialContent}>
                <p>
                  <strong>BA in Journalism &amp; Advertising</strong> —
                  University of Oregon · 2016
                </p>
              </div>
            </div>

            {/* Certificates — hollow sage dots */}
            <div className={styles.credentialRow} style={{ '--delay': '0.24s' }}>
              <div className={styles.dotColumn}>
                <span
                  className={`${styles.dot} ${styles.dotHollow} ${styles.colorSage}`}
                  aria-hidden="true"
                />
                <span
                  className={`${styles.connector} ${styles.connectorSage}`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.credentialContent}>
                <p>
                  <strong>LUMA Human-Centered Design Practitioner</strong> —
                  2024
                </p>
              </div>
            </div>

            <div className={styles.credentialRow} style={{ '--delay': '0.36s' }}>
              <div className={styles.dotColumn}>
                <span
                  className={`${styles.dot} ${styles.dotHollow} ${styles.colorSage}`}
                  aria-hidden="true"
                />
              </div>
              <div className={styles.credentialContent}>
                <p>
                  <strong>IDEO Design Thinking</strong> — 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
