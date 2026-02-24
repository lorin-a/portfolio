import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.warmth}>
        Want to make something meaningful? Reach out!
      </span>
      <div className={styles.footerLinks}>
        <a
          href="https://www.linkedin.com/in/lorinanderberg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <span className={styles.linkDisabled}>
          Resume
        </span>
        <a href="mailto:lorinanderberg1@gmail.com">
          Email
        </a>
      </div>
    </footer>
  )
}
