'use client'

import styles from './ProgressNav.module.css'

/**
 * ProgressNav — Minimal top-edge progress line.
 *
 * Renders a thin bar at the top of the viewport showing
 * reading progress. Switches color based on whether the
 * current section has a dark or light background.
 *
 * Props:
 *   scrollProgress — 0-100 percentage of page scrolled
 *   isDark         — true when over a dark section (bar turns white)
 *   isVisible      — false hides the bar (e.g. at page top)
 */
export default function ProgressNav({ scrollProgress, isDark, isVisible }) {
  return (
    <div
      className={`${styles.progressLine} ${!isVisible ? styles.progressLineHidden : ''}`}
      aria-label="Reading progress"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`${styles.progressLineFill} ${isDark ? styles.progressLineFillLight : ''}`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}