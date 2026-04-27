import styles from './DataNote.module.css'

/**
 * DataNote — number/stat evidence inside a Phase.
 * For research findings, sample sizes, outcomes, framing data.
 *
 * Usage:
 *   <DataNote stat="38" unit="hours" note="Listening sessions across 6 hospital units" />
 *   <DataNote stat="3 of 4" note="Nurses reported reduced moral injury after pilot" />
 */
export default function DataNote({ stat, unit, note }) {
  return (
    <div data-evidence className={styles.dataNote}>
      <div className={styles.statBlock}>
        <span className={styles.stat}>{stat}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
