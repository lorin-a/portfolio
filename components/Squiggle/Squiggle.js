'use client'

import { useState, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './Squiggle.module.css'

gsap.registerPlugin(useGSAP)

export default function Squiggle() {
  const ref = useRef(null)
  const pathRef = useRef(null)
  const [isDark, setIsDark] = useState(false)

  useGSAP(() => {
    /* Theme detection */
    const root = document.documentElement
    const check = () => setIsDark(root.dataset.theme === 'dark')
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

    /* ScrollTrigger-driven dash offset — no manual scroll listener, no setState */
    const path = pathRef.current
    if (!path) return

    gsap.to(path, {
      strokeDashoffset: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
      },
    })

    return () => observer.disconnect()
  }, { scope: ref })

  return (
    <div className={styles.container} ref={ref}>
      <svg
        viewBox="0 0 1440 24"
        className={styles.svg}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="squiggle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {isDark ? (
              <>
                <stop offset="5%" stopColor="#C5CFA6" />
                <stop offset="45%" stopColor="#C7AAD1" />
                <stop offset="88%" stopColor="#F79C7E" />
              </>
            ) : (
              <>
                <stop offset="5%" stopColor="#8A9263" />
                <stop offset="45%" stopColor="#9F84A9" />
                <stop offset="88%" stopColor="#C97D64" />
              </>
            )}
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 0 12 Q 30 4, 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 T 480 12 T 540 12 T 600 12 T 660 12 T 720 12 T 780 12 T 840 12 T 900 12 T 960 12 T 1020 12 T 1080 12 T 1140 12 T 1200 12 T 1260 12 T 1320 12 T 1380 12 T 1440 12"
          fill="none"
          stroke="url(#squiggle-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 5"
        />
      </svg>
    </div>
  )
}
