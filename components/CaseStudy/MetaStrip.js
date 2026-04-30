import styles from './MetaStrip.module.css'

const meta = [
  { label: 'Role', value: 'Lead designer' },
  { label: 'Client', value: 'UPMC Magee-Womens Hospital' },
  { label: 'Duration', value: '2024 – 2025' },
  { label: 'Status', value: 'Installed' },
  { label: 'Team', value: <span className={styles.placeholder}>collaborators</span> },
  { label: 'Live site', value: <a href="/groundswell">View site →</a> },
]

const stats = [
  { value: <span className={styles.placeholder}>stat 1</span>, label: 'outcome metric / quote' },
  { value: <span className={styles.placeholder}>stat 2</span>, label: 'outcome metric / quote' },
  { value: <span className={styles.placeholder}>stat 3</span>, label: 'outcome metric / quote' },
]

export default function MetaStrip() {
  return (
    <section className={styles.strip} aria-label="Project metadata and outcomes">
      <div className={styles.meta}>
        {meta.map(({ label, value }) => (
          <div key={label} className={styles.metaItem}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
      <div className={styles.stats}>
        {stats.map(({ value, label }, i) => (
          <div key={i} className={styles.statCard}>
            <p className={styles.statValue}>{value}</p>
            <p className={styles.statLabel}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
