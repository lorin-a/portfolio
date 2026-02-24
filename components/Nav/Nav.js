'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.navName}>
          Lorin Anderberg
        </Link>
        <div className={styles.navRight}>
          <Link href="/#work" className={styles.navLink}>
            Work
          </Link>
          <span className={`${styles.navLink} ${styles.navLinkDisabled}`}>
            About
          </span>
          <a href="mailto:lorinanderberg1@gmail.com" className={styles.navLink}>
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
