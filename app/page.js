import Link from 'next/link'
import Squiggle from '@/components/Squiggle/Squiggle'
import Hero from '@/components/Hero/Hero'
import styles from './page.module.css'

const projects = [
  {
    slug: 'groundswell',
    title: 'Groundswell',
    tags: 'Healthcare • Co-Design • Systems Change',
    description: 'Transforming healthcare worker wellbeing through participatory design and narrative research.',
    image: '/images/projects/groundswell-hero.jpg',
    status: 'Live',
    isClickable: true,
  },
  {
    slug: 'birthstory',
    title: 'BirthStory',
    tags: 'UX Research • App Design • Healthcare',
    description: 'Empowering pregnant individuals to document and share their birth experiences.',
    image: '/images/projects/birthstory-cover.jpg',
    status: 'Coming Soon',
    isClickable: false,
  },
  {
    slug: 'somebuddy',
    title: 'SomeBuddy',
    tags: 'UX Design • Social Connection • Wellbeing',
    description: 'Reducing loneliness through authentic peer-to-peer connections.',
    image: '/images/projects/somebuddy-cover.jpg',
    status: 'Coming Soon',
    isClickable: false,
  },
  {
    slug: 'bridging-the-gap',
    title: 'Bridging the Gap',
    tags: 'Education • Systems Design • Access',
    description: 'Supporting college access for underrepresented students through systemic intervention.',
    image: '/images/projects/bridging-cover.jpg',
    status: 'Coming Soon',
    isClickable: false,
  },
]

const buildingProjects = [
  {
    title: 'Whelm',
    stage: 'Active Development',
    description: 'Mental health app exploring emotional granularity and nuanced self-awareness beyond binary good/bad feelings.',
  },
  {
    title: 'TRO Tool',
    stage: 'Concept Phase',
    description: 'Documentation system for survivors of abuse navigating temporary restraining orders. Early exploration.',
  },
  {
    title: 'Groundswell Data Viz',
    stage: 'In Development',
    description: 'Interactive visualization of relationship patterns from healthcare worker interviews. Applying for grant funding to continue iteration.',
  },
]

const valueCards = [
  {
    heading: 'Systems',
    text: 'I map complexity to reveal root causes using rigorous participatory research and systems thinking.',
  },
  {
    heading: 'Stories',
    text: 'I translate lived experience into narratives that make complexity accessible and catalyze meaningful change.',
  },
  {
    heading: 'Solutions',
    text: 'I create interventions that transform both individual experiences and systemic barriers simultaneously.',
  },
]

// SVG clip path definitions for scalloped card bottoms
// 8 semi-circular arcs meeting at points (stamp/shell edge style)
function ClipPathDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <clipPath id="wavyCardClip" clipPathUnits="objectBoundingBox">
          <path d="M 0,0 L 1,0 L 1,0.95 A 0.0625 0.05 0 0 1 0.875,0.95 A 0.0625 0.05 0 0 1 0.75,0.95 A 0.0625 0.05 0 0 1 0.625,0.95 A 0.0625 0.05 0 0 1 0.5,0.95 A 0.0625 0.05 0 0 1 0.375,0.95 A 0.0625 0.05 0 0 1 0.25,0.95 A 0.0625 0.05 0 0 1 0.125,0.95 A 0.0625 0.05 0 0 1 0,0.95 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ProjectCard({ project }) {
  const cardContent = (
    <>
      <div className={styles.projectImageWrapper}>
        <img
          src={project.image}
          alt={project.title}
          className={styles.projectImage}
        />
        <span className={`${styles.statusBadge} ${project.status === 'Live' ? styles.statusLive : styles.statusComingSoon}`}>
          {project.status}
        </span>
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectTags}>{project.tags}</p>
        <p className={styles.projectDescription}>{project.description}</p>
        <span className={`${styles.projectLink} ${!project.isClickable ? styles.projectLinkDisabled : ''}`}>
          {project.isClickable ? 'View case study →' : 'Coming soon'}
        </span>
      </div>
    </>
  )

  if (project.isClickable) {
    return (
      <Link href={`/projects/${project.slug}`} className={styles.projectCard}>
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={`${styles.projectCard} ${styles.projectCardDisabled}`}>
      {cardContent}
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <ClipPathDefs />

      {/* Hero - Cinematic Title Sequence */}
      <Hero />

      <Squiggle />

      {/* Value Cards Section */}
      <section className={styles.values}>
        <div className={styles.valuesInner}>
          <div className={styles.valuesHeader}>
            <h2 className={styles.valuesTitle}>How I Work</h2>
            <p className={styles.valuesDescription}>
              My approach combines rigorous research, authentic storytelling, and collaborative design.
            </p>
          </div>
          <div className={styles.valueGrid}>
            {valueCards.map((card) => (
              <article key={card.heading} className={styles.valueCard}>
                <h3 className={styles.valueHeading}>{card.heading}</h3>
                <p className={styles.valueText}>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Squiggle />

      {/* Featured Work Section */}
      <section id="work" className={styles.work}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Work</h2>
          <p className={styles.sectionDescription}>
            Case studies exploring healthcare, education, and community wellbeing through participatory design.
          </p>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <Squiggle />

      {/* Building Now Section */}
      <section className={styles.building}>
        <div className={styles.buildingInner}>
          <div className={styles.buildingHeader}>
            <h2 className={styles.buildingTitle}>Building Now</h2>
            <p className={styles.buildingDescription}>
              Active explorations and projects in development. These aren&apos;t full case studies (yet), but they show where my curiosity is taking me.
            </p>
          </div>
          <div className={styles.buildingGrid}>
            {buildingProjects.map((project) => (
              <article key={project.title} className={styles.buildingCard}>
                <h4 className={styles.buildingCardTitle}>{project.title}</h4>
                <span className={styles.stageBadge}>{project.stage}</span>
                <p className={styles.buildingCardDescription}>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
