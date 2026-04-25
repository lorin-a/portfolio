import styles from './marks.module.css'

export default function ProcessDot() {
  return (
    <div className={styles.processMark} aria-hidden="true">
      <span className={`${styles.processDot} ${styles.processDotSage}`} />
      <span className={`${styles.processDot} ${styles.processDotPlum}`} />
      <span className={`${styles.processDot} ${styles.processDotTerracotta}`} />
    </div>
  )
}
