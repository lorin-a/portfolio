'use client'

import styles from './AudioCard.module.css'

/**
 * AudioCard - Card with audio player for meditations, poems, etc.
 * 
 * @param {string} type - Content type label (e.g., "Guided Meditation", "Poem")
 * @param {string} title - Title of the audio content
 * @param {string} artist - Creator/reader name
 * @param {string} src - Audio file source path
 * @param {string} variant - 'dark' (default) or 'light'
 */
export default function AudioCard({ 
  type,
  title, 
  artist, 
  src,
  variant = 'dark'
}) {
  const isDark = variant === 'dark'
  
  return (
    <div className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}>
      {type && (
        <p className={`${styles.type} ${isDark ? styles.typeDark : styles.typeLight}`}>
          {type}
        </p>
      )}
      
      <h4 className={`${styles.title} ${isDark ? styles.titleDark : styles.titleLight}`}>
        {title}
      </h4>
      
      {artist && (
        <p className={`${styles.artist} ${isDark ? styles.artistDark : styles.artistLight}`}>
          {artist}
        </p>
      )}
      
      <audio 
        src={src} 
        controls 
        className={styles.audio}
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

/**
 * AudioCardGrid - Grid layout for multiple AudioCards
 * 
 * @param {React.ReactNode} children - AudioCard components
 * @param {number} columns - Number of columns (default: 2)
 */
export function AudioCardGrid({ children, columns = 2 }) {
  return (
    <div 
      className={styles.grid}
      style={{ '--columns': columns }}
    >
      {children}
    </div>
  )
}
