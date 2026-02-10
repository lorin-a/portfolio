import styles from './QuoteBlock.module.css'

/**
 * QuoteBlock - Styled quote with optional attribution
 * 
 * @param {string} quote - The quote text
 * @param {string} attribution - Optional source/speaker
 * @param {string} variant - 'default', 'large', or 'bordered'
 * @param {string} theme - 'light' or 'dark'
 * @param {boolean} isInterpretation - If true, styled as team interpretation (smaller, no quotes)
 */
export default function QuoteBlock({ 
  quote, 
  attribution,
  variant = 'default',
  theme = 'light',
  isInterpretation = false
}) {
  const isDark = theme === 'dark'
  const isBordered = variant === 'bordered'
  const isLarge = variant === 'large'
  
  return (
    <blockquote 
      className={`
        ${styles.quote}
        ${isBordered ? styles.bordered : ''}
        ${isDark ? styles.dark : styles.light}
      `}
    >
      <p 
        className={`
          ${styles.text}
          ${isLarge ? styles.textLarge : ''}
          ${isInterpretation ? styles.interpretation : ''}
        `}
      >
        {!isInterpretation && '"'}{quote}{!isInterpretation && '"'}
      </p>
      
      {attribution && (
        <cite className={styles.attribution}>
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}

/**
 * QuoteGrid - Grid layout for participant quotes with interpretations
 * 
 * @param {Object[]} quotes - Array of quote objects
 * @param {string} quotes[].quote - The participant quote
 * @param {string} quotes[].interpretation - Team interpretation
 * @param {string} variant - 'light' or 'dark' (default: 'dark')
 */
export function QuoteGrid({ quotes, variant = 'dark' }) {
  const isLight = variant === 'light'
  
  return (
    <div className={`${styles.grid} ${isLight ? styles.gridLight : ''}`}>
      {quotes.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          <p className={styles.participantQuote}>"{item.quote}"</p>
          <p className={styles.participantInterpretation}>{item.interpretation}</p>
        </div>
      ))}
    </div>
  )
}