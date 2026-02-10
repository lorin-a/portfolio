'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './ProjectNav.module.css'

export default function ProjectNav({ prev, next, currentSlug }) {
  const [hoveredSide, setHoveredSide] = useState(null)
  
  return (
    <>
      {/* Previous Project Peek */}
      <Link 
        href={`/projects/${prev.slug}`}
        className={`${styles.peek} ${styles.left}`}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        aria-label={`Previous project: ${prev.title}`}
      >
        <div className={`${styles.peekContent} ${hoveredSide === 'left' ? styles.visible : ''}`}>
          <span className={styles.peekLabel}>Prev</span>
          <span className={styles.peekTitle}>{prev.title}</span>
        </div>
        <div className={styles.peekBar} aria-hidden="true" />
      </Link>
      
      {/* Next Project Peek */}
      <Link 
        href={`/projects/${next.slug}`}
        className={`${styles.peek} ${styles.right}`}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        aria-label={`Next project: ${next.title}`}
      >
        <div className={`${styles.peekContent} ${hoveredSide === 'right' ? styles.visible : ''}`}>
          <span className={styles.peekLabel}>Next</span>
          <span className={styles.peekTitle}>{next.title}</span>
        </div>
        <div className={styles.peekBar} aria-hidden="true" />
      </Link>
    </>
  )
}
