'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import ProcessDot from '@/components/marks/ProcessDot'
import styles from './ProjectCard.module.css'

function FlagshipCard({ project }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    })
  }, [])

  const content = (
    <div className={styles.flagship} ref={cardRef}>
      <div className={styles.flVisual}>
        <div className={styles.flSurface} style={{ background: project.gradient }}>
          <span className={styles.placeholderText}>{project.placeholder}</span>
        </div>
      </div>
      <div className={styles.flMeta}>
        <span className={styles.flNum}>{project.num}</span>
        <h2 className={styles.flTitle}>{project.title}</h2>
        <p className={styles.flContext}>{project.context}</p>
        <ProcessDot />
      </div>
    </div>
  )

  if (project.href) {
    return (
      <Link href={project.href} className={styles.cardLink}>
        {content}
      </Link>
    )
  }

  return content
}

function StandardCard({ project, flip }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    })
  }, [])

  const content = (
    <div
      className={`${styles.std} ${flip ? styles.stdFlip : ''}`}
      ref={cardRef}
    >
      <div className={styles.stdVisual}>
        <div className={styles.stdSurface} style={{ background: project.gradient }}>
          <span className={styles.placeholderText}>{project.placeholder}</span>
        </div>
      </div>
      <div className={styles.stdMeta}>
        <span className={styles.stdNum}>{project.num}</span>
        <h3 className={styles.stdTitle}>{project.title}</h3>
        <p className={styles.stdContext}>{project.context}</p>
        <ProcessDot />
      </div>
    </div>
  )

  if (project.href) {
    return (
      <Link href={project.href} className={styles.cardLink}>
        {content}
      </Link>
    )
  }

  return content
}

export default function ProjectCard({ project, variant = 'standard', flip = false }) {
  if (variant === 'flagship') {
    return <FlagshipCard project={project} />
  }
  return <StandardCard project={project} flip={flip} />
}
