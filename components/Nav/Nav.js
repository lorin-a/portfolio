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

  /* ─── Center the name during intro ─── */
  useEffect(() => {
    if (phase !== 'waiting' && phase !== 'playing') return
    if (!nameRef.current || !navRef.current || !rightRef.current) return

    const centerName = () => {
      const navRect = navRef.current.getBoundingClientRect()
      const nameRect = nameRef.current.getBoundingClientRect()
      const offset = (navRect.left + navRect.width / 2) - (nameRect.left + nameRect.width / 2)
      gsap.set(nameRef.current, { x: offset })
      centeredRef.current = true
    }

    gsap.set(rightRef.current, { opacity: 0, pointerEvents: 'none' })
    requestAnimationFrame(centerName)

    window.addEventListener('resize', centerName)
    return () => window.removeEventListener('resize', centerName)
  }, [phase])

  /* ─── Animate nav into normal state ─── */
  useEffect(() => {
    if (phase !== 'transitioning') return
    if (!nameRef.current || !rightRef.current) return

    gsap.to(nameRef.current, {
      x: 0,
      duration: 0.8,
      ease: 'power1.inOut',
    })

    gsap.to(rightRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.6,
      delay: 0.3,
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
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
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
