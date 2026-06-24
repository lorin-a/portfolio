import styles from './CardCopyShowcase.module.css'

/**
 * CardCopyShowcase — the Reflection Cards rendered as TYPE rather than as scans
 * of the artwork-bearing faces. Each card pairs a feeling, a brief validation,
 * and a somatic cue — all of it Lorin's copywriting. This is the section's
 * showpiece: the writing carries the visual.
 *
 * @param {{feeling: string, validation: string, cue: string}[]} cards
 */
export default function CardCopyShowcase({ cards = [] }) {
  return (
    <ul className={styles.deck} aria-label="Reflection card writing">
      {cards.map((card) => (
        <li key={card.feeling} className={styles.card}>
          <p className={styles.kicker}>When you feel</p>
          <p className={styles.feeling}>{card.feeling}</p>
          <p className={styles.validation}>{card.validation}</p>
          <hr className={styles.rule} />
          <p className={styles.cueLabel}>
            <span className={styles.mark} aria-hidden="true">✦</span> Somatic cue
          </p>
          <p className={styles.cue}>{card.cue}</p>
        </li>
      ))}
    </ul>
  )
}
