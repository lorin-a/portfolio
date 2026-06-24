import styles from './CardCopyShowcase.module.css'

/**
 * CardCopyShowcase — the Reflection Cards' writing (Lorin's copy) rendered as
 * type: refined specimen cards with an index, the feeling as display type, and
 * the somatic cue set apart as the exercise. Complements the documentary photos
 * of the deck; shows the writing the photos can't render legibly.
 *
 * @param {{feeling: string, validation: string, cue: string}[]} cards
 */
export default function CardCopyShowcase({ cards = [] }) {
  return (
    <ul className={styles.deck} aria-label="Reflection card writing">
      {cards.map((card, i) => (
        <li key={card.feeling} className={styles.card}>
          <div className={styles.head}>
            <span className={styles.label}>Reflection card</span>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
          </div>

          <p className={styles.feeling}>{card.feeling}</p>
          <p className={styles.validation}>{card.validation}</p>

          <div className={styles.cue}>
            <p className={styles.cueLabel}>Somatic cue</p>
            <p className={styles.cueText}>{card.cue}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
