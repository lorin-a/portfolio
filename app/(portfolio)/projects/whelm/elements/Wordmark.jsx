import styles from '../whelm.module.css'

/* Hero brand mark — slide 255:355.
   Semantic <h1> with per-character spans for the typewriter intro:
   each char starts hidden, the orchestrator reveals them sequentially
   via gsap.to('[data-char]', { autoAlpha: 1, stagger, ease: 'steps(1)' })
   to feel like live typing. The cursor span sits at the end and blinks
   via CSS until the orchestrator fades it once typing finishes. */

const CHARS = ['w', 'h', 'e', 'l', 'm', '.']

export default function Wordmark() {
  return (
    <h1 className={styles.wordmark} aria-label="whelm.">
      <span className={styles.wordmarkInner}>
        {CHARS.map((char, i) => (
          <span
            key={i}
            data-char={i}
            className={styles.wordmarkChar}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
        <span
          data-cursor="true"
          className={styles.wordmarkCursor}
          aria-hidden="true"
        />
      </span>
    </h1>
  )
}
