import styles from './MetaVariants.module.css'

/* ============================================================================
   MetaVariants — 2–3 alternative treatments of the hero metadata for review.
   The current hero uses the centered "spec strip." These are fresher directions
   to compare. All on the hero's dark ground; roman values (not italic), type at
   the site scale, AA-clear. Pick one (or keep the strip) and it folds into
   GroundswellHero.
   ============================================================================ */

const FIELDS = [
  ['Role', 'Design research, co-design'],
  ['Timeline', '15-week course + 10-week production'],
  ['Year', '2025–26'],
  ['Outcome', 'Live 12-month pilot'],
]

export default function MetaVariants() {
  return (
    <div className={styles.page}>
      <p className={styles.context}>
        Who better to design care than <em>those who give it</em>?
      </p>

      {/* Option 1 — inline editorial line */}
      <section className={styles.opt}>
        <span className={styles.tag}>Option 1 · Inline</span>
        <p className={styles.inline}>
          {FIELDS.map(([, v], i) => (
            <span key={v}>
              {i > 0 && <span className={styles.dot} aria-hidden="true">·</span>}
              {v}
            </span>
          ))}
        </p>
      </section>

      {/* Option 2 — stacked pairs, serif values */}
      <section className={styles.opt}>
        <span className={styles.tag}>Option 2 · Stacked serif</span>
        <dl className={styles.stack}>
          {FIELDS.map(([k, v]) => (
            <div key={k} className={styles.stackItem}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Option 3 — ruled ledger */}
      <section className={styles.opt}>
        <span className={styles.tag}>Option 3 · Ledger</span>
        <dl className={styles.ledger}>
          {FIELDS.map(([k, v]) => (
            <div key={k} className={styles.ledgerRow}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* current, for reference */}
      <section className={styles.opt}>
        <span className={styles.tag}>Current · Spec strip</span>
        <dl className={styles.strip}>
          {FIELDS.map(([k, v]) => (
            <div key={k} className={styles.stripItem}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
