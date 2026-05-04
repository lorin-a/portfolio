'use client'

import styles from '../whelm.module.css'

/* Hero scroll cue. "Learn More" + chevron arrow with a slow vertical
   bob. Hidden once user has scrolled past the hero beat (orchestrator
   fades opacity via the wrapper's --eo CSS variable like any element). */
export default function ScrollCue() {
  return (
    <div className={styles.scrollCue} aria-hidden="true">
      <span className={styles.scrollCueLabel}>Learn More</span>
      <svg
        viewBox="0 0 20 24"
        width="20"
        height="24"
        fill="none"
        className={styles.scrollCueArrow}
      >
        <path
          d="M10 2v18M5 14l5 6 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
