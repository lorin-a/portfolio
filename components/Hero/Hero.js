'use client'

import styles from './Hero.module.css'
import InteractiveDial from '../InteractiveDial/InteractiveDial'

export default function Hero() {
  const scrollToWork = () => {
    const workSection = document.getElementById('work')
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero} id="hero">
      {/* 1. Interactive Dial with photo */}
      <InteractiveDial />

      {/* 2. Greeting */}
      <p className={styles.greeting}>Hi, I&apos;m Lorin.</p>

      {/* 3. Headline */}
      <h1 className={styles.headline}>
        I translate <span className={styles.olive}>community wisdom</span>
        <br />
        into <span className={styles.plum}>systems change</span>
        <br />
        through{' '}
        <span className={styles.storiesUnderline}>
          stories
          <svg viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
            <path d="M3 8 C30 5, 60 3.5, 90 4.5 C105 5.2, 114 6.5, 117 7" />
          </svg>
        </span>
        .
      </h1>

      {/* 4. CTA Button */}
      <button className={styles.cta} onClick={scrollToWork}>
        <span className={styles.ctaText}>See my work</span>
        <svg
          className={styles.ctaArrow}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 4v10M6 10l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  )
}
