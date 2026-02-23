'use client'

import styles from './BlobLabel.module.css'

/**
 * Domain color mapping for contribution blob labels.
 * Each domain maps to a CSS custom property set defined in globals.css.
 *
 * sage       = healthcare / care / wellbeing
 * plum       = systems thinking / research / synthesis
 * terracotta = creative / brand / visual design
 * chalcedony = technology / data / tools
 */
const DOMAIN_COLORS = {
  sage: {
    fill: 'var(--color-sage-soft)',
    stroke: 'var(--color-sage)',
    text: 'var(--color-sage)',
  },
  plum: {
    fill: 'var(--color-plum-soft)',
    stroke: 'var(--color-plum)',
    text: 'var(--color-plum)',
  },
  terracotta: {
    fill: 'var(--color-terracotta-soft)',
    stroke: 'var(--color-terracotta)',
    text: 'var(--color-terracotta)',
  },
  chalcedony: {
    fill: 'var(--color-chalcedony-soft)',
    stroke: 'var(--color-chalcedony)',
    text: 'var(--color-chalcedony)',
  },
}

/** Hand-drawn pill shape from pill-label.svg (196×48 viewBox) */
const PILL_PATH = 'M96.3134 0H39.3134C-17.6866 0 -7.39078 46 36.3134 47.5C57.5966 48.2305 68.1089 47.5 96.3134 47.5C115.609 47.5 137.113 48.3 156.313 47.5C180.313 46.5 195.313 34.5434 195.313 23C195.314 7 175.313 0 156.313 0H96.3134Z'

function BlobLabel({ label, domain }) {
  const colors = DOMAIN_COLORS[domain] || DOMAIN_COLORS.plum

  return (
    <span className={styles.blobLabel} aria-label={label}>
      <svg
        className={styles.blobSvg}
        viewBox="0 0 196 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={PILL_PATH}
          fill={colors.fill}
          fillOpacity="0.18"
          stroke={colors.stroke}
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
      </svg>
      <span className={styles.blobText} style={{ color: colors.text }}>
        {label}
      </span>
    </span>
  )
}

export default function BlobLabels({ labels }) {
  if (!labels || labels.length === 0) return null

  return (
    <div className={styles.blobRow} aria-label="Contributions">
      {labels.map((item) => (
        <BlobLabel
          key={item.label}
          label={item.label}
          domain={item.domain}
        />
      ))}
    </div>
  )
}
