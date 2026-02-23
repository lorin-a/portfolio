'use client'

import { useEffect, useRef } from 'react'
import FrameworkShuffle from '@/components/FrameworkShuffle/FrameworkShuffle'
import styles from './Hero.module.css'

export default function Hero() {
  const titleRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (titleRef.current) {
        titleRef.current.style.fontVariationSettings = "'SOFT' 100, 'WONK' 1"
      }
      // Show lines immediately
      if (line1Ref.current) line1Ref.current.style.opacity = 1
      if (line2Ref.current) line2Ref.current.style.opacity = 1
      return
    }

    import('gsap').then(({ gsap }) => {
      // SOFT axis tween: sharp serifs → soft/wonky over 1.2s
      const softObj = { soft: 0 }
      gsap.to(softObj, {
        soft: 100,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (titleRef.current) {
            titleRef.current.style.fontVariationSettings = `'SOFT' ${softObj.soft}, 'WONK' 1`
          }
        },
      })

      // Sequenced entrance: line 1 → line 2
      const tl = gsap.timeline()

      tl.fromTo(line1Ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }
      )

      tl.fromTo(line2Ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
        '-=0.2'
      )
      // Framework items pick up from here via their own startDelay
    })
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <h1 className={styles.heroTitle} ref={titleRef}>
        <span className={styles.titleLine} ref={line1Ref}>
          Design Researcher
        </span>
        <br />
        <span className={styles.titleLine} ref={line2Ref}>
          <span className={styles.amp}>&amp;</span> Strategist
        </span>
      </h1>
      <FrameworkShuffle startDelay={1.3} itemStagger={0.6} />
    </section>
  )
}
