'use client'

import { useState, useEffect, useCallback } from 'react'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './SystemMap.module.css'

const COMPONENTS = [
  {
    id: 'ctb',
    label: 'CTB\nEmail',
    color: 'var(--color-sage)',
    desc: 'Updated patient death notification — compassionate redesign honoring a nurse\'s original innovation',
    imageKey: 'gs-ctb-email',
  },
  {
    id: 'pod',
    label: 'Pod',
    color: 'var(--color-plum)',
    desc: 'Dedicated space for emotional decompression — meditation, reflection, or simply pausing',
    imageKey: 'gs-pod',
  },
  {
    id: 'wall',
    label: 'Garden\nArt Wall',
    color: 'var(--color-terracotta)',
    desc: 'Anonymous shared emotional expression across staff, patients, and families',
    imageKey: 'gs-artwall',
  },
  {
    id: 'cards',
    label: 'Reflection\nCards',
    color: 'var(--color-chalcedony)',
    desc: 'Guided emotional validation and somatic exercises — every staff member received a deck',
    imageKey: 'gs-context-01',
  },
]

const POSITIONS = [
  { x: 80, y: 160 },
  { x: 260, y: 160 },
  { x: 440, y: 160 },
  { x: 620, y: 160 },
]

const TOP_LABELS = [
  { label: 'Arrive at Work', x: 120, y: 30 },
  { label: 'Take a Break', x: 340, y: 30 },
  { label: 'Leave Work', x: 560, y: 30 },
]

const BOTTOM_LABELS = [
  { label: 'Patient Loss', x: 120, y: 310 },
  { label: 'Hard Moment', x: 340, y: 310 },
  { label: '1:1 Meeting', x: 560, y: 310 },
]

const CONNECTION_PATHS = [
  'M120,295 C120,240 80,200 80,185',
  'M340,295 C340,240 260,200 260,185',
  'M340,295 C340,240 440,210 440,185',
  'M560,295 C560,240 620,210 620,185',
  'M120,45 C120,90 80,130 80,140',
  'M340,45 C340,90 260,130 260,140',
  'M340,45 C340,90 440,120 440,140',
  'M560,45 C560,90 620,130 620,140',
  'M105,160 Q180,130 235,160',
  'M285,160 Q360,130 415,160',
  'M465,160 Q540,130 595,160',
]

export default function SystemMap() {
  const [active, setActive] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggle = useCallback((id) => {
    setActive((prev) => (prev === id ? null : id))
  }, [])

  const activeComp = active ? COMPONENTS.find((c) => c.id === active) : null

  if (isMobile) {
    return (
      <div className={styles.accordion} role="list">
        {COMPONENTS.map((c) => {
          const isActive = active === c.id
          return (
            <button
              key={c.id}
              role="listitem"
              className={`${styles.accordionButton} ${isActive ? styles.accordionButtonActive : ''}`}
              style={{
                borderColor: c.color,
                background: isActive ? c.color : undefined,
                color: isActive ? 'var(--color-cream)' : 'var(--color-ink)',
              }}
              onClick={() => toggle(c.id)}
              aria-expanded={isActive}
              aria-label={`${c.label.replace('\n', ' ')} — ${isActive ? 'collapse' : 'expand'}`}
            >
              <p className={styles.accordionTitle}>
                {c.label.replace('\n', ' ')}
              </p>
              {isActive && (
                <div className={styles.accordionDetail}>
                  {c.imageKey && GS_IMAGES[c.imageKey] && (
                    <img
                      src={cloudImg(GS_IMAGES[c.imageKey], 400)}
                      alt={c.label.replace('\n', ' ')}
                      className={styles.accordionImage}
                      loading="lazy"
                    />
                  )}
                  <p className={styles.accordionDesc}>{c.desc}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 720 360"
        className={styles.svg}
        role="img"
        aria-label="System map showing how the four Groundswell components fit into a healthcare worker's day"
      >
        {/* Context labels */}
        {TOP_LABELS.map((r, i) => (
          <text
            key={`top-${i}`}
            x={r.x}
            y={r.y}
            className={styles.contextLabel}
            fontFamily="var(--font-body)"
            fontSize={10}
            fill="var(--color-ink-faint)"
            textAnchor="middle"
          >
            {r.label}
          </text>
        ))}
        {BOTTOM_LABELS.map((r, i) => (
          <text
            key={`bot-${i}`}
            x={r.x}
            y={r.y}
            className={styles.contextLabel}
            fontFamily="var(--font-body)"
            fontSize={10}
            fill="var(--color-ink-faint)"
            textAnchor="middle"
          >
            {r.label}
          </text>
        ))}

        {/* Connection lines */}
        {CONNECTION_PATHS.map((d, i) => (
          <path
            key={`line-${i}`}
            d={d}
            className={styles.connectionLine}
            stroke="var(--color-ink-faint)"
            strokeWidth={1}
            fill="none"
            opacity={0.2}
            strokeLinecap="round"
          />
        ))}

        {/* Component nodes */}
        {COMPONENTS.map((c, ci) => {
          const isActive = active === c.id
          const lines = c.label.split('\n')
          return (
            <g
              key={c.id}
              onMouseEnter={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => toggle(c.id)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label={`${c.label.replace('\n', ' ')}: ${c.desc}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggle(c.id)
                }
              }}
            >
              <circle
                cx={POSITIONS[ci].x}
                cy={POSITIONS[ci].y}
                r={36}
                className={styles.node}
                style={{
                  fill: isActive ? c.color : 'var(--color-cream-dark)',
                  stroke: c.color,
                  strokeWidth: isActive ? 2 : 1.5,
                }}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={POSITIONS[ci].x}
                  y={POSITIONS[ci].y + (li - (lines.length - 1) / 2) * 13}
                  className={styles.nodeLabel}
                  fontFamily="var(--font-body)"
                  fontSize={10}
                  style={{ fill: isActive ? 'var(--color-cream)' : 'var(--color-ink)' }}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>

      {activeComp && (
        <div className={styles.tooltip} role="tooltip">
          {activeComp.imageKey && GS_IMAGES[activeComp.imageKey] && (
            <img
              src={cloudImg(GS_IMAGES[activeComp.imageKey], 600)}
              alt={activeComp.label.replace('\n', ' ')}
              className={styles.tooltipImage}
              loading="lazy"
            />
          )}
          <p className={styles.tooltipDesc}>{activeComp.desc}</p>
        </div>
      )}
    </div>
  )
}
