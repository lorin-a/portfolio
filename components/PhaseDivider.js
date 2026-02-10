import styles from './PhaseDivider.module.css'

/**
 * PhaseDivider - Chapter marker section between major phases
 * 
 * @param {string} id - Section ID (for navigation)
 * @param {string} title - Phase title
 * @param {string} intro - Introductory paragraph
 */
export default function PhaseDivider({ id, title, intro }) {
  return (
    <div id={id} className={styles.divider}>
      <h2 className={styles.title}>{title}</h2>
      {intro && (
        <p className={styles.intro}>{intro}</p>
      )}
    </div>
  )
}
