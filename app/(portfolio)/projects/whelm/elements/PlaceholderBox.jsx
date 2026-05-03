import styles from '../whelm.module.css'

/* Phase 0 visual proxy. Real renderers replace these in Phase 1. */
export default function PlaceholderBox({ label, kind }) {
  return (
    <div className={styles.placeholder} data-kind={kind}>
      <span>{label}</span>
    </div>
  )
}
