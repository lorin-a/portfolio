'use client'

import styles from '@/styles/project.module.css'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'

const iterations = [
  {
    label: 'Accessibility',
    problem: 'Participants with larger bodies reported discomfort with table positioning, limiting their ability to rest comfortably.',
    quote: 'Uncomfortable for larger people. I wished to rest my head on the table but couldn’t get comfortable. The biggest thing was getting comfortable.',
    solution: 'We sawed 2 inches from the table depth to accommodate a wider range of body sizes and postures.',
  },
  {
    label: 'Wayfinding',
    problem: 'Multiple participants expressed confusion about where to start, creating anxiety that undermined the calming intent.',
    quote: 'Not sure what to do first. I was worried about doing something wrong—eventually I let go of that, but it took time.',
    solution: 'We added clear step-by-step instructions, making the digital library the explicit first step to set intention.',
  },
  {
    label: 'Entry Ritual',
    problem: 'Participants who started with music reported significantly deeper engagement with other pod activities.',
    quote: 'The music was wonderful—it really set the tone and helped me settle in. I was able to engage with everything else more deeply after that.',
    solution: 'We repositioned the table centerpiece to center and ensured music exploration was the first instruction step.',
  },
]

export default function PlaytestGrid() {
  return (
    <div className={styles.playtestGrid} role="list" aria-label="Play testing iterations">
      {iterations.map((item, i) => (
        <AnimatedElement key={item.label} delay={i * 120} className={styles.playtestGridItem}>
          <article className={styles.playtestCarouselCard}>
            <span className={styles.playtestGridIndex} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.playtestLabel}>{item.label}</h3>
            <p className={styles.playtestProblem}>{item.problem}</p>
            <blockquote className={styles.playtestQuote}>
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className={styles.playtestSolution}>
              <span className={styles.playtestArrow} aria-hidden="true">&rarr;</span>
              <p>{item.solution}</p>
            </div>
          </article>
        </AnimatedElement>
      ))}
    </div>
  )
}
