import Hero from '@/components/Hero/Hero'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import HowIWork from '@/components/HowIWork/HowIWork'
import FeaturedWork from '@/components/FeaturedWork/FeaturedWork'
import styles from './page.module.css'
import { cloudVideo, GS_VIDEOS, OTHER_VIDEOS } from '@/lib/cloudinary'

const buildingProjects = [
  {
    title: 'Groundswell Data Viz',
    tags: ['Data Visualization', 'Research'],
    stage: 'In Production',
    stageColor: '#6B8F5E',
    description: 'Interactive visualization of relationship patterns from healthcare worker QI study.',
    previewType: 'video',
    preview: cloudVideo(GS_VIDEOS['entrypage']),
  },
  {
    title: 'Whelm',
    tags: ['Mental Health', 'Web-App'],
    stage: 'Active Development',
    stageColor: '#7B6B8A',
    description: 'Mental health app for untangling overwhelm with somatic self-awareness.',
    previewType: 'video',
    preview: cloudVideo(OTHER_VIDEOS['whelm-preview']),
    videoZoom: true,
  },
  {
    title: 'TRO Tool',
    tags: ['Documentation', 'Legal Access'],
    stage: 'Concept Phase',
    stageColor: '#B07255',
    description: 'Documentation system for survivors of abuse navigating restraining orders.',
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
    </main>
  )
}
