import Link from 'next/link'
import Squiggle from '@/components/Squiggle'
import HeroProject from '@/components/HeroProject'
import styles from './page.module.css'

const heroProjects = [
  {
    slug: 'groundswell',
    title: 'Groundswell',
    subtitle: 'Making space to restore, together',
    description: 'A grant-funded ecosystem supporting healthcare worker well-being, co-designed with oncology staff at UPMC Magee-Womens Hospital.',
    tags: ['Co-Design', 'Healthcare', 'Systems'],
  },
  {
    slug: 'birthstory',
    title: 'Birth Story',
    subtitle: 'A micro-app for birthing parents',
    description: 'Supporting parents during critical moments of the birthing process through documentation, reflection, and connection.',
    tags: ['UX Research', 'UX Design', 'Healthcare'],
  },
  {
    slug: 'transition-design',
    title: 'Transition Design',
    subtitle: 'Roots to resilience',
    description: 'A systems-based design response to food insecurity in Pittsburgh, recognized as "best outcome yet" by CMU\'s Transition Design Institute.',
    tags: ['Systems Thinking', 'Design Research'],
  }
]

const moreProjects = [
  { slug: 'somebuddy', title: 'SomeBuddy', subtitle: 'Social connection for grad students' },
  { slug: 'bridging-the-gap', title: 'Bridging the G.A.P.', subtitle: 'Trail rebrand campaign' },
  { slug: 'mindfulnest', title: 'MindfulNest', subtitle: 'SEL technology for Pre-K' }
]

const galleryProjects = [
  { slug: 'homi', title: 'Homi' },
  { slug: 'heirloom', title: 'Heirloom' },
  { slug: 'cuba-creatives', title: 'Cuba Creatives' },
  { slug: 'seeds-of-transformation', title: 'Seeds of Transformation' }
]

export default function Home() {
  return (
    <>
      {/* Compact Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.photo}>
            [photo]
          </div>
          
          <p className={styles.tagline}>
            I uncover <span className={styles.gold}>human stories</span> and 
            insights that transform how people navigate healthcare, education, and complex systems.
          </p>
        </div>
      </section>
      
      <Squiggle />
      
      {/* Featured Work */}
      <section id="work" className={styles.featuredWork}>
        {heroProjects.map((project) => (
          <HeroProject key={project.slug} project={project} />
        ))}
      </section>
      
      <Squiggle />
      
      {/* More Work */}
      <section className={styles.moreWork}>
        <h2 className={styles.sectionLabel}>More Work</h2>
        
        <div className={styles.moreGrid}>
          {moreProjects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/projects/${project.slug}`}
              className={styles.moreCard}
            >
              <div className={styles.moreImage}>
                [image]
              </div>
              <h3 className={styles.moreTitle}>{project.title}</h3>
              <p className={styles.moreSubtitle}>{project.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Gallery */}
      <section className={styles.gallery}>
        <h2 className={styles.sectionLabel}>Selected Projects</h2>
        
        <div className={styles.galleryGrid}>
          {galleryProjects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/projects/${project.slug}`}
              className={styles.galleryCard}
            >
              <div className={styles.galleryImage}>
                [image]
              </div>
              <h3 className={styles.galleryTitle}>{project.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Building Now */}
      <section className={styles.buildingNow}>
        <div className={styles.buildingHeader}>
          <div className={styles.pulse} />
          <h2 className={styles.sectionLabel}>Building Now</h2>
        </div>
        
        <div className={styles.buildingGrid}>
          {['Whelm', 'TRO Documentation Tool', 'Groundswell Data Viz'].map((name) => (
            <div key={name} className={styles.buildingCard}>
              <h3>{name}</h3>
              <span className={styles.status}>In progress</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
