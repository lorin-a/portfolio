'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import ShapeMark from '@/components/marks/ShapeMark'
import { useHeroIntro } from '@/components/HeroIntroContext'
import styles from './Nav.module.css'

gsap.registerPlugin(useGSAP)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { phase, markDone } = useHeroIntro()
  const pathname = usePathname()
  const headerRef = useRef(null)
  const flowerRef = useRef(null)
  const flowerInnerRef = useRef(null)

  /* Theme for flower gradient */
  const [isDark, setIsDark] = useState(true)

  useGSAP(() => {
    /* Theme detection */
    const root = document.documentElement
    const check = () => setIsDark(root.dataset.theme === 'dark')
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    /* Hide nav during the hero intro — but ONLY on the homepage, where the
       hero scroll timeline reveals it. On case-study / other routes there is
       no intro, so the nav must be visible immediately (it was staying hidden
       forever, leaving those pages with no chrome). */
    const isHome = pathname === '/'
    if (isHome && (phase === null || phase === 'waiting' || phase === 'playing')) {
      gsap.set(headerRef.current, { autoAlpha: 0, pointerEvents: 'none' })
    } else if (!isHome) {
      gsap.set(headerRef.current, { autoAlpha: 1, pointerEvents: 'auto' })
    }

    /* Nav reveal is handled by the hero scroll timeline.
       Just mark the intro as done when transitioning. */
    if (phase === 'transitioning') {
      markDone()
    }

    /* Nav flower: appears only after scrolling past the entire hero.
       Uses scroll listener instead of ScrollTrigger (pinned sections
       create timing issues with trigger-based detection). */
    gsap.set(flowerRef.current, { autoAlpha: 0, scale: 0.5 })
    let flowerVisible = false

    const checkFlower = () => {
      /* Hero pin ends at ~500vh of scroll. Check if we're past it. */
      const heroSection = document.querySelector('[aria-label="Introduction"]')
      if (!heroSection) return

      const heroBottom = heroSection.getBoundingClientRect().bottom
      const pastHero = heroBottom < 80

      if (pastHero && !flowerVisible) {
        flowerVisible = true
        gsap.to(flowerRef.current, {
          autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)',
        })
      } else if (!pastHero && flowerVisible) {
        flowerVisible = false
        gsap.to(flowerRef.current, {
          autoAlpha: 0, scale: 0.5, duration: 0.3, ease: 'power1.inOut',
        })
      }
    }

    ScrollTrigger.addEventListener('refresh', checkFlower)
    window.addEventListener('scroll', checkFlower, { passive: true })

    /* Scroll background */
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', checkFlower)
      ScrollTrigger.removeEventListener('refresh', checkFlower)
    }
  }, {
    scope: headerRef,
    dependencies: [phase, pathname],
  })

  /* Spin on hover */
  const { contextSafe } = useGSAP({ scope: headerRef })
  const handleFlowerHover = contextSafe(() => {
    if (gsap.isTweening(flowerInnerRef.current)) return
    gsap.to(flowerInnerRef.current, {
      rotation: '+=360',
      duration: 0.8,
      ease: 'power1.inOut',
    })
  })

  /* About → the bio photo at the bottom of the homepage. On the homepage,
     smooth-scroll there; on any other portfolio page, let the link navigate
     home to the hash (native hash scroll honors scroll-margin-top).

     Why the two-pass scroll: the hero is a pinned ScrollTrigger, so its pin
     spacer can change the document height mid-scroll. A single native smooth
     scroll computes its target pixel once and then drifts — overshooting the
     photo and landing on the cards below. We recompute the photo's true
     position after the motion + any ScrollTrigger refresh settle, then snap
     to it so the photo is always the resting frame. */
  const handleAboutClick = (e) => {
    if (pathname !== '/') return
    const target = document.getElementById('about')
    if (!target) return
    e.preventDefault()

    const NAV_OFFSET = 96 // clear the fixed nav, leave breathing room above the photo
    const scrollToPhoto = (behavior) => {
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top: Math.max(0, top), behavior })
    }

    scrollToPhoto('smooth')
    // Corrective snap once the smooth scroll + pin recalcs settle.
    window.setTimeout(() => scrollToPhoto('auto'), 700)
  }

  const LIGHT_GRADIENT = ['#8A9263', '#9F84A9', '#C97D64']
  const DARK_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.navName}>
          Lorin Anderberg
        </Link>

        {/* Center flower — brand mark, scrolls to hero */}
        <button
          className={styles.navFlower}
          ref={flowerRef}
          onMouseEnter={handleFlowerHover}
          onClick={() => {
            /* Scroll to the composed hero state (80% of pin distance), not the top */
            const heroPin = ScrollTrigger.getAll().find(st => st.pin)
            if (heroPin) {
              const composedPosition = heroPin.start + (heroPin.end - heroPin.start) * 0.98
              window.scrollTo({ top: composedPosition, behavior: 'smooth' })
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          aria-label="Back to top"
        >
          <div ref={flowerInnerRef} className={styles.navFlowerInner}>
            <ShapeMark
              animate
              showBrush
              gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT}
            />
          </div>
        </button>

        <div className={styles.navRight}>
          <Link href="/#about" className={styles.navLink} onClick={handleAboutClick}>
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
