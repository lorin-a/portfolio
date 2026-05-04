import styles from '../whelm.module.css'

/* Cursive flourish that draws on alongside the wordmark — slide 255:355.
   A stylized cursive "whelm"-feeling stroke: a series of connected loops
   that read as handwritten without being a literal letterform. Rendered
   as a single SVG path so it animates as one continuous draw-on via
   stroke-dashoffset. The path is hand-shaped, smoothed beyond Lorin's
   Figma sketch per direction. */

const FLOURISH_D =
  'M 30 90 ' +
  'C 50 60, 90 60, 90 100 ' +
  'S 60 150, 80 150 ' +
  'S 130 100, 130 130 ' +
  'S 100 170, 130 165 ' +
  'S 200 80, 220 110 ' +
  'S 200 160, 230 155 ' +
  'S 290 80, 320 120 ' +
  'S 300 170, 340 160'

export default function HeroFlourish() {
  return (
    <svg
      viewBox="0 0 380 220"
      className={styles.heroFlourish}
      aria-hidden="true"
    >
      <path
        d={FLOURISH_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset="100"
        className={styles.heroFlourishPath}
      />
    </svg>
  )
}
