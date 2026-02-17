import Hero from '@/components/Hero/Hero'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import HowIWork from '@/components/HowIWork/HowIWork'
import FeaturedWork from '@/components/FeaturedWork/FeaturedWork'
import styles from './page.module.css'

const buildingProjects = [
  {
    title: 'Groundswell Data Viz',
    tags: 'Data Visualization • Research',
    stage: 'In Development',
    description: 'Interactive visualization of relationship patterns from healthcare worker interviews.',
    previewType: 'video',
    preview: '/video/groundswell/entrypage.mp4',
  },
  {
    title: 'Whelm',
    tags: 'Mental Health • Emotional Granularity',
    stage: 'Active Development',
    description: 'Mental health app exploring emotional granularity and nuanced self-awareness beyond binary good/bad feelings.',
    previewType: 'video',
    preview: '/video/whelm-preview.mp4',
    videoZoom: true,
  },
  {
    title: 'TRO Tool',
    tags: 'Safety • Documentation • Access',
    stage: 'Concept Phase',
    description: 'Documentation system for survivors of abuse navigating temporary restraining orders. Early exploration.',
    previewType: 'none',
    preview: null,
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero - Cinematic Title Sequence */}
      <Hero />

      {/* How I Work — Connected Nodes */}
      <HowIWork />

      {/* Featured Work Section */}
      <FeaturedWork />

      {/* Building Now Section */}
      <section className={styles.building}>
        <AnimatedElement>
          <div className={styles.buildingHeader}>
            <h2 className={styles.buildingTitle}>Building Now</h2>
            <p className={styles.buildingDescription}>
              Active explorations and projects in development. These aren&apos;t full case studies (yet), but they show where my curiosity is taking me.
            </p>
          </div>
        </AnimatedElement>
        <div className={styles.buildingGrid}>
          {buildingProjects.map((project, i) => (
            <AnimatedElement key={project.title} delay={i * 150}>
              <article className={styles.buildingCard}>
                <div className={styles.buildingPreview}>
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
                  <span className={styles.stageBadge}>{project.stage}</span>
                </div>
                <div className={styles.buildingCardContent}>
                  <h4 className={styles.buildingCardTitle}>{project.title}</h4>
                  <p className={styles.buildingCardTags}>{project.tags}</p>
                  <p className={styles.buildingCardDescription}>{project.description}</p>
                </div>
              </article>
            </AnimatedElement>
          ))}
        </div>
      </section>
    </main>
  )
}
