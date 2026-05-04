import styles from '../whelm.module.css'

/* Overcome stack — slide 255:357.
   Three "Overwhelm" lines stacked vertically. Each line dims relative
   to the one above it: brightest cream at top, mauve middle, deepest
   dim at bottom. Reads as the same word repeating and receding,
   visually demonstrating how overwhelm gets layered over and overlooked.
   The "is overlooked" punchline lives in the copy layer (kind=lead, br),
   not here — keeps composition responsive to changes in copy without
   touching the element. */
export default function OvercomeStack() {
  return (
    <div className={styles.overcomeStack} aria-hidden="true">
      <span className={styles.overcomeLine} data-tier="1">Overwhelm</span>
      <span className={styles.overcomeLine} data-tier="2">Overwhelm</span>
      <span className={styles.overcomeLine} data-tier="3">Overwhelm</span>
    </div>
  )
}
