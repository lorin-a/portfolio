'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './ProjectSection.module.css'

gsap.registerPlugin(useGSAP)

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
  const sectionRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    /* Set initial hidden state via GSAP (not inline styles) */
    gsap.set('[data-tile]', { autoAlpha: 0, y: 12 })

    /* ScrollTrigger-driven reveal — replaces IntersectionObserver */
    ScrollTrigger.batch('[data-tile]', {
      start: 'top 85%',
      onEnter: (tiles) => {
        gsap.to(tiles, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power1.inOut',
        })
      },
      once: true,
    })
  }, { scope: sectionRef })

  const pillClass = styles[`pill${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.pillWeave

  return (
    <section
      className={`${styles.section} ${flip ? styles.sectionFlip : ''}`}
      ref={sectionRef}
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
        <div className={styles.bentoGrid}>
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`${styles.tile} ${tile.span === 2 ? styles.tileWide : ''}`}
              data-tile
            >
              {tile.type === 'video' ? (
                <video
                  src={tile.src}
                  autoPlay
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
