'use client'

import styles from './BlobLabel.module.css'

/**
 * Domain color mapping for contribution pill labels.
 * Each domain maps to a CSS custom property set defined in globals.css.
 *
 * sage       = healthcare / care / wellbeing
 * plum       = systems thinking / research / synthesis
 * terracotta = creative / brand / visual design
 * chalcedony = technology / data / tools
 */
const DOMAIN_COLORS = {
  sage: {
    bg: 'var(--color-sage-muted)',
    border: 'var(--color-sage-soft)',
    text: 'var(--color-sage-light)',
  },
  plum: {
    bg: 'var(--color-plum-muted)',
    border: 'var(--color-plum-soft)',
    text: 'var(--color-plum-light)',
  },
  terracotta: {
    bg: 'var(--color-terracotta-muted)',
    border: 'var(--color-terracotta-soft)',
    text: 'var(--color-terracotta-light)',
  },
  chalcedony: {
    bg: 'var(--color-chalcedony-muted)',
    border: 'var(--color-chalcedony-soft)',
    text: 'var(--color-chalcedony-light)',
  },
}

function PillLabel({ label, domain }) {
  const colors = DOMAIN_COLORS[domain] || DOMAIN_COLORS.plum

  return (
    <span
      className={styles.pill}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
      }}
    >
      {label}
    </span>
  )
}

export default function BlobLabels({ labels }) {
  if (!labels || labels.length === 0) return null

  return (
    <div className={styles.pillRow} aria-label="Contributions">
      {labels.map((item) => (
        <PillLabel
          key={item.label}
          label={item.label}
          domain={item.domain}
        />
      ))}
    </div>
  )
}
