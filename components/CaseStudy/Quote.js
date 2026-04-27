import styles from './Quote.module.css'

/**
 * Quote — pull-quote evidence inside a Phase.
 * Use for participant quotes, stakeholder reactions, framing language.
 *
 * Usage:
 *   <Quote source="ICU nurse, age 47" context="Co-design session, week 3">
 *     We don't need another wellness app. We need ten minutes that aren't a meeting.
 *   </Quote>
 */
export default function Quote({ source, context, children }) {
  return (
    <figure data-evidence className={styles.quote}>
      <blockquote className={styles.body}>{children}</blockquote>
      {(source || context) && (
        <figcaption className={styles.attribution}>
          {source && <span className={styles.source}>{source}</span>}
          {context && <span className={styles.context}>{context}</span>}
        </figcaption>
      )}
    </figure>
  )
}
