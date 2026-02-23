import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.warmth}>
        Let&apos;s make something that matters.
      </span>
      <div className={styles.footerLinks}>
        <a
          href="https://www.linkedin.com/in/lorinanderberg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="/resume"
        >
          Resume
        </a>
        <a href="mailto:lorinanderberg1@gmail.com">
          Email
        </a>
      </div>
    </footer>
  )
}
