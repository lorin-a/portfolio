import Squiggle from './Squiggle'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Squiggle />
        
        <h2 className={styles.heading}>Let's chat</h2>
        
        <a 
          href="mailto:lorinanderberg1@gmail.com" 
          className={styles.email}
        >
          lorinanderberg1@gmail.com
        </a>
        
        <div className={styles.social}>
          <a 
            href="https://medium.com/@lorinanderberg" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Medium profile"
          >
            Medium
          </a>
          <span aria-hidden="true">·</span>
          <a 
            href="https://www.linkedin.com/in/lorinanderberg/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>
        
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Lorin Anderberg
        </p>
      </div>
    </footer>
  )
}