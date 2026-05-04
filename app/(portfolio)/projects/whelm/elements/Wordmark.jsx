import styles from '../whelm.module.css'

/* Hero brand mark — slide 255:355.
   Rendered as semantic <h1> so screen readers and SEO get the page
   heading, but visually carries Whelm's display type at full editorial
   scale. The orchestrator runs a clip-path wipe on `.wordmarkText`
   during the intro timeline (and on incoming transitions if the
   wordmark ever returns to layout — e.g., the closing beat). */
export default function Wordmark() {
  return (
    <h1 className={styles.wordmark}>
      <span className={styles.wordmarkText} data-wipe="true">whelm.</span>
    </h1>
  )
}
