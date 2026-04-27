import styles from './Framework.module.css'

/**
 * Framework — labeled list of named items with brief descriptions.
 * Use for synthesis frameworks, dimensions, principles, or any
 * structured set the case study refers back to.
 *
 * Usage:
 *   <Framework
 *     label="Four dimensions"
 *     items={[
 *       { name: 'Recognition', description: 'feeling appreciated' },
 *       { name: 'Environment', description: 'workspace quality and wellbeing resources' },
 *     ]}
 *   />
 */
export default function Framework({ label, items = [] }) {
  if (!items.length) return null
  return (
    <section data-evidence className={styles.framework}>
      {label && <span className={styles.label}>{label}</span>}
      <dl className={styles.list}>
        {items.map(({ name, description }, i) => (
          <div key={i} className={styles.row}>
            <dt className={styles.name}>{name}</dt>
            {description && <dd className={styles.description}>{description}</dd>}
          </div>
        ))}
      </dl>
    </section>
  )
}
