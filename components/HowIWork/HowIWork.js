'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HowIWork.module.css'

const columns = [
  {
    key: 'systems',
    color: 'olive',
    title: 'Systems',
    description:
      'I map complexity to reveal root causes using rigorous participatory research and systems thinking.',
  },
  {
    key: 'stories',
    color: 'terracotta',
    title: 'Stories',
    description:
      'I translate lived experience into narratives that make complexity accessible and catalyze change.',
  },
  {
    key: 'solutions',
    color: 'plum',
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

export default function HowIWork() {
  const sectionRef = useRef(null)
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
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => {
      observer.unobserve(el)
      observer.disconnect()
    }
  }, [])

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
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 id="how-i-work-heading" className={styles.heading}>
            How I Work
          </h2>
          <p className={styles.subhead}>
            My approach combines rigorous research, authentic storytelling, and
            collaborative design.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Connecting dashed line — real element for clip-path animation */}
          <div className={styles.connectingLine} aria-hidden="true" />

          {columns.map((col) => (
            <div key={col.key} className={`${styles.column} ${colorClass[col.color]}`}>
              <div className={styles.dot} aria-hidden="true" />
              <div className={styles.stem} aria-hidden="true" />
              <h3 className={styles.title}>{col.title}</h3>
              <p className={styles.description}>{col.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
