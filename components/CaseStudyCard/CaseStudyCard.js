'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './CaseStudyCard.module.css'

const colorMap = {
  olive: styles.tagOlive,
  terracotta: styles.tagTerracotta,
  plum: styles.tagPlum,
}

export default function CaseStudyCard({
  title,
  subtitle,
  description,
  tags = [],
  heroImage,
  heroAlt,
  slug,
  status = null,
  priority = false,
}) {
  return (
    <Link href={slug} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 100vw, 1200px"
          className={styles.image}
          priority={priority}
        />
        {status && (
          <span className={styles.statusBadge} aria-label={`Project status: ${status}`}>
            {status}
          </span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag.label} className={`${styles.tag} ${colorMap[tag.color] || ''}`}>
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div className={styles.body}>
          <p className={styles.description}>{description}</p>
          <span className={styles.cta}>
            <span>View case study</span>
            <span className={styles.ctaArrow}>→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
