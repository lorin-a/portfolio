'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ProjectSidebar.module.css'
import { SenseIcon, WeaveIcon, ShapeIcon } from '@/components/Groundswell/PhaseIcons'

const PHASE_ICONS = { sense: SenseIcon, weave: WeaveIcon, shape: ShapeIcon }
// Lightened phase colors for dark sidebar background
const PHASE_COLORS = {
  sense: 'var(--color-sage-soft)',
  weave: 'var(--color-plum-soft)',
  shape: 'var(--color-terracotta-soft)',
}

export default function ProjectSidebar({ sections, metadata }) {
  const [activeId, setActiveId] = useState(null)
  const [pastHook, setPastHook] = useState(false)
  const observerRef = useRef(null)
  const hookObserverRef = useRef(null)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionEls = document.querySelectorAll('[data-section]')
    if (!sectionEls.length) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
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

  // Track whether we're past the hook section
  useEffect(() => {
    const hookEl = document.getElementById('hook')
    if (!hookEl) return

    hookObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        setPastHook(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )

    hookObserverRef.current.observe(hookEl)
    return () => hookObserverRef.current?.disconnect()
  }, [])

  // Determine current phase from active section
  const activeSection = sections.find((s) => s.id === activeId)
  const currentPhase = activeSection?.phase || null
  const PhaseIconComponent = currentPhase ? PHASE_ICONS[currentPhase] : null
  const phaseColor = currentPhase ? PHASE_COLORS[currentPhase] : null

  return (
    <aside className={styles.sidebar} aria-label="Case study navigation">
      {/* Pre-hook: show metadata */}
      {!pastHook && metadata && (
        <div className={styles.metadataBlock}>
          {metadata.map((item, i) => (
            <div key={i} className={styles.metadataItem}>
              <p className={styles.metadataLabel}>{item.label}</p>
              <p className={styles.metadataValue}>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Post-hook: show phase + section nav */}
      {pastHook && (
        <>
          {PhaseIconComponent && (
            <div className={styles.phaseIndicator}>
              <PhaseIconComponent />
              <span className={styles.phaseLabel} style={{ color: phaseColor }}>
                {currentPhase}
              </span>
            </div>
          )}

          <nav>
            <ul className={styles.navList}>
              {sections.map((section) => {
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
          </nav>
        </>
      )}
    </aside>
  )
}
