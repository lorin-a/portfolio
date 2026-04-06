'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { useHeroIntro } from '@/components/HeroIntroContext'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { phase, markDone } = useHeroIntro()
  const nameRef = useRef(null)
  const rightRef = useRef(null)
  const navRef = useRef(null)
  const centeredRef = useRef(false)

  /* ─── Hide entire nav during intro ─── */
  const headerRef = useRef(null)

  useEffect(() => {
    if (phase === null || (phase !== 'waiting' && phase !== 'playing')) return
    if (!headerRef.current) return

    /* Hide the whole nav bar */
    gsap.set(headerRef.current, { opacity: 0, pointerEvents: 'none' })
  }, [phase])

  /* ─── Fade nav in when intro transitions ─── */
  useEffect(() => {
    if (phase !== 'transitioning') return
    if (!headerRef.current) return

    gsap.to(headerRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.6,
      ease: 'power1.inOut',
      onComplete: markDone,
    })
  }, [phase, markDone])

  /* ─── Scroll background ─── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} ref={navRef} aria-label="Main navigation">
        <Link href="/" className={styles.navName} ref={nameRef}>
          Lorin Anderberg
        </Link>
        <div className={styles.navRight} ref={rightRef}>
          <Link href="/#work" className={styles.navLink}>
            Work
          </Link>
          <span className={`${styles.navLink} ${styles.navLinkDisabled}`}>
            About
          </span>
          <a href="mailto:lorinanderberg1@gmail.com" className={styles.navLink}>
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
