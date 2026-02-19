'use client'

import { useState } from 'react'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import styles from '@/app/page.module.css'

function VideoOverlay({ src, onClose }) {
  return (
    <div
      className={styles.videoOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video preview"
    >
      <button
        className={styles.videoOverlayClose}
        onClick={onClose}
        aria-label="Close video preview"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoOverlayPlayer}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function BuildingNow({ projects }) {
  const [previewSrc, setPreviewSrc] = useState(null)

  return (
    <section className={styles.building}>
      {previewSrc && (
        <VideoOverlay src={previewSrc} onClose={() => setPreviewSrc(null)} />
      )}
      <div className={styles.buildingInner}>
        <AnimatedElement>
          <div className={styles.buildingHeader}>
            <h2 className={styles.buildingTitle}>Building Now</h2>
            <p className={styles.buildingDescription}>
              Active explorations and projects in development. These aren&apos;t full case studies (yet), but they show where my curiosity is taking me.
            </p>
          </div>
        </AnimatedElement>
        <div className={styles.buildingGrid}>
          {projects.map((project, i) => (
            <AnimatedElement key={project.title} delay={i * 150}>
              <article className={styles.buildingCard}>
                <div
                  className={`${styles.buildingPreview} ${project.previewType === 'video' ? styles.buildingPreviewClickable : ''}`}
                  onClick={() => project.previewType === 'video' && setPreviewSrc(project.preview)}
                  role={project.previewType === 'video' ? 'button' : undefined}
                  tabIndex={project.previewType === 'video' ? 0 : undefined}
                  aria-label={project.previewType === 'video' ? `Preview ${project.title} video` : undefined}
                  onKeyDown={(e) => {
                    if (project.previewType === 'video' && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      setPreviewSrc(project.preview)
                    }
                  }}
                >
                  {project.previewType === 'video' && (
                    <video
                      src={project.preview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className={`${styles.buildingPreviewVideo} ${project.videoZoom ? styles.buildingPreviewZoomed : ''}`}
                    />
                  )}
                  {project.previewType === 'none' && (
                    <div className={styles.buildingPreviewPlaceholder}>
                      <span className={styles.placeholderText}>Coming Soon</span>
                    </div>
                  )}
                </div>
                <div className={styles.buildingCardContent}>
                  <h4 className={styles.buildingCardTitle}>{project.title}</h4>
                  <div className={styles.buildingCardTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.buildingTag}>{tag}</span>
                    ))}
                  </div>
                  <p className={styles.buildingCardDescription}>{project.description}</p>
                  <span className={styles.stagePill} style={{ '--stage-color': project.stageColor }}>{project.stage}</span>
                </div>
              </article>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
