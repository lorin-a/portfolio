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
        <a
          href="https://github.com/lorin-a"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://drive.google.com/file/d/1v7_2V-vi9BQ3RgRMzg0MJNVb3Q-i_Iaq/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <a href="mailto:lorinanderberg1@gmail.com">Email</a>
      </div>
      <div className={styles.colophon}>
        <p>Type: Fraunces by Phaedra Charles &amp; Flavia Zimbardi (Undercase Type).</p>
        <p>Open Sans by Steve Matteson.</p>
        <p>Stack: Next.js, GSAP, Cloudinary, Vercel.</p>
        <p>Pair: Claude Code.</p>
      </div>
    </footer>
  )
}
