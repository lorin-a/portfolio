'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ProjectSection.module.css'

/**
 * ProjectSection — bento-style project display for the dark homepage.
 *
 * Props:
 *  project     — { num, title, tagline, description, href, contributions, pillVariant }
 *  tiles       — array of { src, alt, type?, span? } for bento grid media
 *  flip        — swap text/bento column order
 *  pillVariant — 'sense' | 'weave' | 'shape' (maps to mark-colored pill tokens)
 */
export default function ProjectSection({ project, tiles = [], flip = false, pillVariant = 'weave' }) {
  const tilesRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(prefersReduced)
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        import('gsap').then(({ gsap }) => {
          const items = tilesRef.current?.querySelectorAll('[data-tile]')
          if (!items?.length) return

          gsap.fromTo(
            items,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power1.inOut',
            }
          )
        })
      },
      { threshold: 0.15 }
    )

    if (tilesRef.current) observer.observe(tilesRef.current)

    return () => observer.disconnect()
  }, [])

  const pillClass = styles[`pill${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.pillWeave

  return (
    <section
      className={`${styles.section} ${flip ? styles.sectionFlip : ''}`}
      aria-label={project.title}
    >
      <div className={styles.inner}>
        {/* Text column */}
        <div className={styles.textColumn}>
          <span className={styles.projectNum}>{project.num}</span>
          <h2 className={styles.title}>{project.title}</h2>
          {project.tagline && (
            <p className={styles.tagline}>{project.tagline}</p>
          )}
          {project.description && (
            <p className={styles.description}>{project.description}</p>
          )}
          {project.contributions?.length > 0 && (
            <div className={styles.pills}>
              {project.contributions.map((c) => (
                <span key={c.label} className={`${styles.pill} ${pillClass}`}>
                  {c.label}
                </span>
              ))}
            </div>
          )}
          {project.href && !project.comingSoon && (
            <a href={project.href} className={styles.cta}>
              View Case Study <span aria-hidden="true">&rarr;</span>
            </a>
          )}
          {project.comingSoon && (
            <span className={styles.comingSoon}>Case study coming soon</span>
          )}
        </div>

        {/* Bento grid */}
        <div className={styles.bentoGrid} ref={tilesRef}>
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`${styles.tile} ${tile.span === 2 ? styles.tileWide : ''}`}
              data-tile
              style={reducedMotion ? undefined : { opacity: 0 }}
            >
              {tile.type === 'video' ? (
                <video
                  src={tile.src}
                  autoPlay={!reducedMotion}
                  muted
                  loop
                  playsInline
                  className={styles.tileMedia}
                />
              ) : (
                <img
                  src={tile.src}
                  alt={tile.alt || ''}
                  className={styles.tileMedia}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
