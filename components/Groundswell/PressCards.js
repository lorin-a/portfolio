'use client'

import styles from './PressCards.module.css'

const ARTICLES = [
  {
    title: 'Groundswell Creates Space for the Soul: Co-designing with Oncology Staff',
    source: 'Carnegie Mellon School of Design',
    rotate: -2.5,
    href: '#',
  },
  {
    title: 'Concept to Care: Designing Groundswell for Oncology Caregivers',
    source: 'Carnegie Mellon School of Design',
    rotate: 1.8,
    href: '#',
  },
]

export default function PressCards() {
  return (
    <div className={styles.wrapper}>
      {ARTICLES.map((article, i) => (
        <a
          key={i}
          href={article.href}
          className={styles.card}
          style={{ transform: `rotate(${article.rotate}deg)` }}
        >
          <div className={styles.cardFold} aria-hidden="true" />
          <p className={styles.cardSource}>{article.source}</p>
          <p className={styles.cardTitle}>{article.title}</p>
          <span className={styles.cardLink}>Read Article →</span>
        </a>
      ))}
    </div>
  )
}
