import styles from './Insight.module.css'

/**
 * Insight — labeled thesis-level reframe inside a Phase.
 * Use when the design team's structural insight needs more weight than
 * body prose but is not a pulled quote from a person.
 *
 * Usage:
 *   <Insight label="The Void">
 *     Patient-centered care often neglects the well-being of the workers...
 *   </Insight>
 */
export default function Insight({ label, children }) {
  return (
    <div data-evidence role="note" aria-label={label} className={styles.insight}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.body}>{children}</div>
    </div>
  )
}
