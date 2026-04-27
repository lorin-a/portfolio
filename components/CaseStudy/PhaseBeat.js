import styles from './PhaseBeat.module.css'

/**
 * PhaseBeat — small sub-section divider inside a Phase.
 * Use to mark internal beats so the eye registers a thematic shift
 * without leaving the phase.
 *
 * Usage:
 *   <PhaseBeat label="Synthesis" />
 */
export default function PhaseBeat({ label }) {
  return (
    <div data-evidence className={styles.beat} role="presentation">
      <span className={styles.label}>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  )
}
