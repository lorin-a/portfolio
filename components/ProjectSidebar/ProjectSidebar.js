'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ProjectSidebar.module.css'

const PHASE_META = {
  sense: { label: 'Sense', color: 'var(--color-sage)' },
  weave: { label: 'Weave', color: 'var(--color-plum)' },
  shape: { label: 'Shape', color: 'var(--color-terracotta)' },
}

export default function ProjectSidebar({ sections }) {
  const [activeId, setActiveId] = useState(null)
  const observerRef = useRef(null)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionEls = document.querySelectorAll('[data-section]')
    if (!sectionEls.length) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.getAttribute('data-section'))
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    sectionEls.forEach((el) => observerRef.current.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  // Group sections: ungrouped items render directly, phase items render under phase labels
  const groups = []
  let currentPhase = null

  sections.forEach((section) => {
    if (section.phase && section.phase !== currentPhase) {
      currentPhase = section.phase
      groups.push({ type: 'phase', phase: section.phase, sections: [section] })
    } else if (section.phase && section.phase === currentPhase) {
      groups[groups.length - 1].sections.push(section)
    } else {
      currentPhase = null
      groups.push({ type: 'link', section })
    }
  })

  return (
    <aside className={styles.sidebar} aria-label="Case study navigation">
      <nav>
        <ul className={styles.navList}>
          {groups.map((group, i) => {
            if (group.type === 'link') {
              const { section } = group
              const isActive = section.id === activeId
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {section.label}
                  </a>
                </li>
              )
            }

            // Phase group
            const phase = PHASE_META[group.phase]
            return (
              <li key={group.phase} className={styles.phaseGroup}>
                <p className={styles.phaseLabel} style={{ color: phase.color }}>
                  <span className={styles.phaseDot} style={{ background: phase.color }} />
                  {phase.label}
                </p>
                <ul className={styles.phaseLinks}>
                  {group.sections.map((section) => {
                    const isActive = section.id === activeId
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                          aria-current={isActive ? 'true' : undefined}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                          }}
                        >
                          {section.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
