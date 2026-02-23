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
      if (line1Ref.current) {
        line1Ref.current.style.opacity = 1
        line1Ref.current.style.clipPath = 'inset(0 0% 0 0)'
      }
      if (line2Ref.current) {
        line2Ref.current.style.opacity = 1
        line2Ref.current.style.clipPath = 'inset(0 0% 0 0)'
      }
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

      const tl = gsap.timeline()

      // Line 1: "Design Researcher" wipes left → right
      tl.set(line1Ref.current, { opacity: 1 })
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' }
      )

      // Line 2: "& Strategist" wipes left → right, slightly overlapping
      tl.set(line2Ref.current, { opacity: 1 })
      tl.fromTo(line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut' },
        '-=0.25'
      )

      // Framework icons pick up via their own startDelay
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
          <span className={styles.amp}>&amp;</span> Creative Strategist
        </span>
      </h1>
      <FrameworkShuffle startDelay={2.4} itemStagger={0.6} />
    </section>
  )
}
