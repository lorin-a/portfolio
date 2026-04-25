import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a
          href="https://www.linkedin.com/in/lorinanderberg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <span className={styles.linkDisabled}>Resume</span>
        <a href="mailto:lorinanderberg1@gmail.com">Email</a>
      </div>
      <div className={styles.colophon}>
        <p>Type: Fraunces by Phaedra Charles &amp; Flavia Zimbardi (Undercase Type). Open Sans by Steve Matteson.</p>
        <p>Stack: Next.js, GSAP, Cloudinary, Vercel.</p>
        <p>Pair: Claude Code.</p>
      </div>
    </footer>
  )
}
