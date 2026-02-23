'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ProjectCard.module.css'

/** Map project keys to CSS module class names for per-project theming */
const THEME_MAP = {
  groundswell: 'cardGroundswell',
  birthstory: 'cardBirthstory',
  somebuddy: 'cardSomebuddy',
  'transition-design': 'cardTransition',
}

export default function ProjectCard({ project, flip = false, preload = false }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (preload) return
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
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    })
  }, [preload])

  /* Play video only when scrolled into view */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const [isHovered, setIsHovered] = useState(false)
  const hoverVideoRef = useRef(null)

  const themeClass = styles[THEME_MAP[project.slug]] || ''
  const isPortrait = project.variant === 'flagship'

  const handleMouseEnter = () => {
    if (!project.hoverVideo) return
    setIsHovered(true)
    hoverVideoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    if (!project.hoverVideo) return
    setIsHovered(false)
  }

  const card = (
    <div
      className={`${styles.projectCard} ${themeClass} ${flip ? styles.flipped : ''}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardMedia}>
        {project.video ? (
          <div className={isPortrait ? styles.portraitVideo : styles.landscapeImg}>
            <video
              ref={videoRef}
              src={project.video}
              loop
              muted
              playsInline
              aria-label={project.imageAlt || project.title}
              className={`${styles.mediaEl} ${isHovered ? styles.mediaHidden : ''}`}
            />
            {project.hoverVideo && (
              <video
                ref={hoverVideoRef}
                src={project.hoverVideo}
                autoPlay
                loop
                muted
                playsInline
                className={`${styles.mediaEl} ${styles.hoverMedia} ${isHovered ? styles.hoverMediaVisible : ''}`}
              />
            )}
          </div>
        ) : project.image ? (
          <div className={styles.landscapeImg}>
            <Image
              src={project.image}
              alt={project.imageAlt || project.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.mediaEl}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardNum}>{project.num}</span>
        <h2 className={styles.cardTitle}>{project.title}</h2>
        <p className={styles.cardDesc}>{project.context}</p>
        <div className={styles.cardTags}>
          {project.contributions.map((tag) => (
            <span key={tag.label} className={styles.tag}>
              {tag.label}
            </span>
          ))}
        </div>
        {project.href && (
          <span className={styles.cardCta}>
            View Case Study<span className={styles.arrow}> &rarr;</span>
          </span>
        )}
      </div>
    </div>
  )

  if (project.href) {
    return (
      <Link href={project.href} className={styles.cardLink}>
        {card}
      </Link>
    )
  }

  return card
}
