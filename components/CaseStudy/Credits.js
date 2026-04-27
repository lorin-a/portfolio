'use client'

import Link from 'next/link'
import styles from './Credits.module.css'

/**
 * Credits — collaborators + next-project link.
 * No animation; this is the rest stop, not a moment.
 */
export default function Credits({ collaborators, nextProject }) {
  return (
    <footer className={styles.credits}>
      <div className={styles.inner}>
        {collaborators && collaborators.length > 0 && (
          <div className={styles.collaborators}>
            <h3 className={styles.heading}>Credits</h3>
            <ul className={styles.list}>
              {collaborators.map((c, i) => (
                <li key={i}>
                  <span className={styles.name}>{c.name}</span>
                  {c.role && <span className={styles.role}>{c.role}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {nextProject && (
          <Link href={nextProject.href} className={styles.next}>
            <div>
              <span className={styles.nextLabel}>Next case study</span>
              <span className={styles.nextTitle}>{nextProject.title}</span>
            </div>
            <svg viewBox="0 0 24 24" className={styles.nextArrow} fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </footer>
  )
}
