'use client'

import { forwardRef } from 'react'
import styles from './ProjectHero.module.css'

/**
 * ProjectHero - Hero section with background image for case studies
 * 
 * @param {string} title - Main title
 * @param {string} subtitle - Subtitle (italic)
 * @param {string} descriptor - Additional descriptor text
 * @param {string[]} tags - Array of tag strings
 * @param {string} backgroundImage - Background image URL
 * @param {string} id - Element ID (for TimelineNav integration)
 * @param {React.Ref} ref - Forwarded ref for intersection observer
 */
const ProjectHero = forwardRef(function ProjectHero({ 
  title,
  subtitle,
  descriptor,
  tags = [],
  backgroundImage,
  id = 'hero'
}, ref) {
  return (
    <header 
      ref={ref}
      id={id}
      className={styles.hero}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Gradient overlay */}
      <div className={styles.overlay} aria-hidden="true" />
      
      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
        
        {descriptor && (
          <p className={styles.descriptor}>{descriptor}</p>
        )}
        
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </header>
  )
})

export default ProjectHero
