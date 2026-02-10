import Link from 'next/link'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ 
  title, 
  subtitle, 
  description, 
  tags = [], 
  image, 
  href, 
  size = 'medium' 
}) {
  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <Link href={href} className={styles.link}>
        <div className={styles.imageContainer}>
          {image ? (
            <img 
              src={image} 
              alt={`${title} project thumbnail`}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              [{title.toLowerCase().replace(/\s+/g, '-')}-hero.jpg]
            </div>
          )}
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
          
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
