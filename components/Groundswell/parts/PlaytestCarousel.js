'use client'

import { useState } from 'react'
import styles from '@/styles/project.module.css'

export default function PlaytestCarousel() {
  const isMobileInit = typeof window !== 'undefined' && window.innerWidth <= 600
  const [current, setCurrent] = useState(isMobileInit ? 0 : 1)

  const iterations = [
    {
      label: 'Accessibility',
      problem: 'Participants with larger bodies reported discomfort with table positioning, limiting their ability to rest comfortably.',
      quote: "Uncomfortable for larger people. I wished to rest my head on the table but couldn’t get comfortable. The biggest thing was getting comfortable.",
      solution: 'We sawed 2 inches from the table depth to accommodate a wider range of body sizes and postures.',
    },
    {
      label: 'Wayfinding',
      problem: 'Multiple participants expressed confusion about where to start, creating anxiety that undermined the calming intent.',
      quote: "Not sure what to do first. I was worried about doing something wrong—eventually I let go of that, but it took time.",
      solution: 'We added clear step-by-step instructions, making the digital library the explicit first step to set intention.',
    },
    {
      label: 'Entry Ritual',
      problem: 'Participants who started with music reported significantly deeper engagement with other pod activities.',
      quote: "The music was wonderful—it really set the tone and helped me settle in. I was able to engage with everything else more deeply after that.",
      solution: 'We repositioned the table centerpiece to center and ensured music exploration was the first instruction step.',
    },
  ]

  const goNext = () => setCurrent((p) => Math.min(p + 1, iterations.length - 1))
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0))

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  const isMobile = w <= 600
  const isTablet = w > 600 && w <= 900

  const getPosition = (index) => {
    const diff = index - current
    if (isMobile) {
      if (diff === 0)  return { transform: 'translateX(0) scale(1)',       opacity: 1, z: 3 }
      if (diff === -1) return { transform: 'translateX(-110%) scale(0.9)', opacity: 0, z: 1 }
      if (diff === 1)  return { transform: 'translateX(110%) scale(0.9)',  opacity: 0, z: 1 }
      return { transform: 'translateX(0) scale(0.8)', opacity: 0, z: 0 }
    }
    if (isTablet) {
      if (diff === 0)  return { transform: 'translateX(0) scale(1)',       opacity: 1,    z: 3 }
      if (diff === -1) return { transform: 'translateX(-70%) scale(0.88)', opacity: 0.65, z: 2 }
      if (diff === 1)  return { transform: 'translateX(70%) scale(0.88)',  opacity: 0.65, z: 2 }
      return { transform: 'translateX(0) scale(0.7)', opacity: 0, z: 0 }
    }
    if (diff === 0)  return { transform: 'translateX(0) scale(1)',        opacity: 1,    z: 3 }
    if (diff === -1) return { transform: 'translateX(-85%) scale(0.88)',  opacity: 0.65, z: 2 }
    if (diff === 1)  return { transform: 'translateX(85%) scale(0.88)',   opacity: 0.65, z: 2 }
    if (diff === -2) return { transform: 'translateX(-115%) scale(0.76)', opacity: 0.3,  z: 1 }
    if (diff === 2)  return { transform: 'translateX(115%) scale(0.76)',  opacity: 0.3,  z: 1 }
    return { transform: 'translateX(0) scale(0.7)', opacity: 0, z: 0 }
  }

  return (
    <div
      className={styles.playtestCarouselContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Play testing iterations carousel"
    >
      <div className={styles.playtestCarouselTrack}>
        {iterations.map((item, i) => {
          const pos = getPosition(i)
          return (
            <div
              key={i}
              className={styles.playtestCarouselSlot}
              style={{
                transform: pos.transform,
                opacity: pos.opacity,
                zIndex: pos.z,
                cursor: i === current ? 'default' : 'pointer',
              }}
              onClick={() => i !== current && setCurrent(i)}
              onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && i !== current) { e.preventDefault(); setCurrent(i) }}}
              role={i !== current ? 'button' : undefined}
              tabIndex={i !== current ? 0 : -1}
              aria-label={i !== current ? `Go to ${item.label} iteration` : undefined}
            >
              <div className={styles.playtestCarouselCard}>
                <span className={styles.playtestCategoryLabel}>FEEDBACK</span>
                <span className={styles.playtestLabel}>{item.label}</span>
                <p className={styles.playtestProblem}>{item.problem}</p>
                <blockquote className={styles.playtestQuote}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className={styles.playtestSolution}>
                  <span className={styles.playtestArrow}>&rarr;</span>
                  <p>{item.solution}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.playtestCarouselControls}>
        <button
          onClick={goPrev}
          className={styles.playtestCarouselArrow}
          disabled={current === 0}
          aria-label="Previous iteration"
        >
          &#8592;
        </button>
        <div className={styles.playtestCarouselInfo}>
          <span className={styles.playtestCarouselCounter}>
            {current + 1} of {iterations.length}
          </span>
        </div>
        <button
          onClick={goNext}
          className={styles.playtestCarouselArrow}
          disabled={current === iterations.length - 1}
          aria-label="Next iteration"
        >
          &#8594;
        </button>
      </div>

      <div className={styles.playtestCarouselDots}>
        {iterations.map((_, i) => (
          <button
            key={i}
            className={`${styles.playtestCarouselDot} ${i === current ? styles.playtestCarouselDotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to iteration ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
