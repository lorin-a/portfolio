import styles from './HeroHeadingOptions.module.css'

/* Compare the two weight logics for the hero question. Emphasis ("give it?") is
   green italic in both; what changes is which is heavier — the question or the
   emphasis. */

function Variant({ tag, note, qWeight, emWeight }) {
  return (
    <section className={styles.block}>
      <span className={styles.tag}>{tag}</span>
      <h2 className={styles.q} style={{ fontWeight: qWeight }}>
        Who better to design care than those who{' '}
        <em style={{ fontWeight: emWeight }}>give it?</em>
      </h2>
      <span className={styles.note}>{note}</span>
    </section>
  )
}

export default function HeroHeadingOptions() {
  return (
    <div className={styles.page}>
      <Variant tag="A · Current" note="Question 300 · emphasis 460 (thicker green italic)" qWeight={300} emWeight={460} />
      <Variant tag="B · Question lighter" note="Question 200 (lighter) · emphasis 460 (thicker green italic)" qWeight={200} emWeight={460} />
    </div>
  )
}
