import Squiggle from '@/components/Squiggle/Squiggle'
import Hero from '@/components/Hero/Hero'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import CaseStudyCard from '@/components/CaseStudyCard/CaseStudyCard'
import HowIWork from '@/components/HowIWork/HowIWork'
import styles from './page.module.css'

const projects = [
  {
    title: 'Groundswell',
    subtitle: 'Making Space to Restore, Together',
    description: 'Transforming healthcare worker wellbeing through participatory design and narrative research. A grant-funded ecosystem of emotional support at UPMC Magee-Womens Hospital.',
    tags: [
      { label: 'Healthcare', color: 'olive' },
      { label: 'Co-Design', color: 'terracotta' },
      { label: 'Systems Change', color: 'plum' },
    ],
    heroImage: '/images/projects/groundswell-hero.jpg',
    heroAlt: 'A healthcare worker walks down a hospital hallway toward a colorful mural installation',
    slug: '/projects/groundswell',
    status: 'Live Study',
  },
  {
    title: 'BirthStory',
    subtitle: 'Documenting What Matters Most',
    description: 'Empowering pregnant individuals to document and share their birth experiences through a thoughtfully designed mobile app.',
    tags: [
      { label: 'UX Research', color: 'terracotta' },
      { label: 'App Design', color: 'olive' },
      { label: 'Healthcare', color: 'plum' },
    ],
    heroImage: '/images/projects/birthstory-cover.jpg',
    heroAlt: 'BirthStory app interface showing birth experience documentation',
    slug: '/projects/birthstory',
    status: null,
  },
  {
    title: 'SomeBuddy',
    subtitle: 'Connection Beyond the Surface',
    description: 'Reducing loneliness through authentic peer-to-peer connections designed around shared vulnerability.',
    tags: [
      { label: 'UX Design', color: 'olive' },
      { label: 'Social Connection', color: 'terracotta' },
      { label: 'Wellbeing', color: 'plum' },
    ],
    heroImage: '/images/projects/somebuddy-cover.gif',
    heroAlt: 'SomeBuddy app concept showing peer connection interface',
    slug: '/projects/somebuddy',
    status: null,
  },
  {
    title: 'Bridging the Gap',
    subtitle: 'Redesigning Access to Higher Education',
    description: 'Supporting college access for underrepresented students through systemic intervention and community partnership.',
    tags: [
      { label: 'Education', color: 'plum' },
      { label: 'Systems Design', color: 'olive' },
      { label: 'Access', color: 'terracotta' },
    ],
    heroImage: '/images/projects/bridging-cover.gif',
    heroAlt: 'Bridging the Gap project showing educational access design work',
    slug: '/projects/bridging-the-gap',
    status: null,
  },
]

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

      <Squiggle />

      {/* Featured Work Section */}
      <section id="work" className={styles.work}>
        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <AnimatedElement key={project.slug} delay={i * 150}>
              <CaseStudyCard {...project} priority={i === 0} />
            </AnimatedElement>
          ))}
        </div>
      </section>

      <Squiggle />

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
