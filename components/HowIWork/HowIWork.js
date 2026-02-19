'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HowIWork.module.css'

const pillars = [
  {
    key: 'systems',
    color: 'olive',
    side: 'left',
    title: 'Systems',
    description:
      'I map complexity to reveal root causes using rigorous participatory research and systems thinking.',
  },
  {
    key: 'stories',
    color: 'terracotta',
    side: 'right',
    title: 'Stories',
    description:
      'I translate lived experience into narratives that make complexity accessible and catalyze change.',
  },
  {
    key: 'solutions',
    color: 'plum',
    side: 'left',
    title: 'Solutions',
    description:
      'I create interventions that transform both individual experiences and systemic barriers simultaneously.',
  },
]

const colorClass = {
  olive: styles.olive,
  terracotta: styles.terracotta,
  plum: styles.plum,
}

const sideClass = {
  left: styles.sideLeft,
  right: styles.sideRight,
}

export default function HowIWork() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const connectorRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)

    const el = sectionRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    )

    observer.observe(el)
    return () => {
      observer.unobserve(el)
      observer.disconnect()
    }
  }, [])

  // Position connector line to span exactly between first and last dot centers
  useEffect(() => {
    const timeline = timelineRef.current
    const connector = connectorRef.current
    if (!timeline || !connector) return

    const positionLine = () => {
      const dots = timeline.querySelectorAll(`.${styles.dot}`)
      if (dots.length < 2) return
      const timelineRect = timeline.getBoundingClientRect()
      const firstDotRect = dots[0].getBoundingClientRect()
      const lastDotRect = dots[dots.length - 1].getBoundingClientRect()
      const firstCenter = firstDotRect.top + firstDotRect.height / 2 - timelineRect.top
      const lastCenter = lastDotRect.top + lastDotRect.height / 2 - timelineRect.top
      connector.style.top = `${firstCenter}px`
      connector.style.bottom = `${timelineRect.height - lastCenter}px`
    }

    positionLine()
    window.addEventListener('resize', positionLine)
    return () => window.removeEventListener('resize', positionLine)
  }, [mounted])

  const wrapperClass = [
    styles.section,
    mounted ? styles.mounted : '',
    visible ? styles.visible : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      className={wrapperClass}
      aria-labelledby="how-i-work-heading"
    >
      <div className={styles.content}>
        <h2 id="how-i-work-heading" className={styles.heading}>
          How I Work
        </h2>

        <div className={styles.timeline} ref={timelineRef}>
          {/* Vertical dashed connector line */}
          <div className={styles.connectorLine} ref={connectorRef} aria-hidden="true" />

          {pillars.map((pillar, index) => (
            <div
              key={pillar.key}
              className={`${styles.pillar} ${colorClass[pillar.color]} ${sideClass[pillar.side]} ${styles[`pillar${index + 1}`]}`}
            >
              <div className={styles.dot} aria-hidden="true" />
              <div className={styles.textBlock}>
                <h3 className={styles.title}>{pillar.title}</h3>
                <p className={styles.description}>{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
