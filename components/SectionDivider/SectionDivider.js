import styles from './SectionDivider.module.css'

export default function SectionDivider({ label }) {
  return (
    <div className={styles.sectionDivider} role="presentation">
      <span className={styles.label}>{label}</span>
    </div>
  )
}
