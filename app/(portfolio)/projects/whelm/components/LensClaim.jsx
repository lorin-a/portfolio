'use client'

import styles from '../whelm.module.css'

/* LensClaim — the heading+body editorial moment shared by Signal,
   Tangle, and Portal. Reveal and Gap have their own typographic
   compositions and don't use this.

   Renders:
     - sr-only sentence (full claim for screen readers)
     - aria-hidden visible heading with clip-path wipe target
     - aria-hidden visible body (lifts in)

   Props:
     srText  — full claim sentence ("Overwhelm is a signal. A message
               from the nervous system, asking for support.")
     heading — JSX for the visible heading. Pass the `<em>` accent
               directly. Use the `accent` class via the `as` prop or
               inline via {styles.claim_accent}.
     body    — JSX or string for the visible body line.

   Animation hooks:
     [data-claim-line] — clip-path target on the heading wrapper
     [data-claim-body] — autoAlpha + y target on the body

   Consumers: import revealClaim from '../lib/revealClaim' and call
   it with the timeline. */

export default function LensClaim({ srText, heading, body, className = '' }) {
  return (
    <div className={`${styles.claim} ${className}`}>
      {srText && <p className={styles.srOnly}>{srText}</p>}
      <h2 className={styles.claim_heading} aria-hidden="true">
        <span className={styles.claim_line} data-claim-line>
          <span className={styles.claim_lineText}>{heading}</span>
        </span>
      </h2>
      <p data-claim-body className={styles.claim_body}>
        {body}
      </p>
    </div>
  )
}

/* Convenience accent — wraps an italic mauve span. Consumers do:
   heading={<>Overwhelm is a <Accent>signal</Accent>.</>} */
export function Accent({ children }) {
  return <em className={styles.claim_accent}>{children}</em>
}
