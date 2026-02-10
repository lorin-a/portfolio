'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './HeroProject.module.css'

export default function HeroProject({ project }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const altText = `${project.title} - ${project.subtitle}`
  
  return (
    <article 
      className={styles.project}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/projects/${project.slug}`} className={styles.link}>
        {/* Full-Width Image */}
        <div className={`${styles.imageContainer} ${isHovered ? styles.hovered : ''}`}>
          {project.hero ? (
            <img 
              src={`/images/${project.hero}`}
              alt={altText}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder} role="img" aria-label={altText}>
              [{project.slug}-hero.jpg]
            </div>
          )}
          <div className={styles.overlay} aria-hidden="true" />
        </div>
        
        {/* Project Info */}
        <div className={styles.info}>
          <h2 className={`${styles.title} ${isHovered ? styles.titleHovered : ''}`}>
            {project.title}
          </h2>
          
          <p className={styles.subtitle}>{project.subtitle}</p>
          
          <p className={styles.description}>{project.description}</p>
          
          <ul className={styles.tags} aria-label="Project tags">
            {project.tags.map((tag, i) => (
              <li key={i} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  )
}
