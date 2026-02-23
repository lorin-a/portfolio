import Hero from '@/components/Hero/Hero'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'
import styles from './page.module.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Groundswell',
    context: 'A participatory care ecosystem supporting oncology staff wellbeing. Grant-funded, co-designed with healthcare workers, now in institutional pilot.',
    gradient: 'linear-gradient(170deg, var(--color-sage-muted), var(--color-plum-muted) 40%, var(--color-terracotta-muted))',
    image: cloudImg(HOME_IMAGES['groundswell-hero'], 1200),
    imageAlt: 'Groundswell ecosystem artifacts and healthcare care tools',
    href: '/groundswell',
    variant: 'flagship',
    contributions: [
      { label: 'Participatory Research', domain: 'sage' },
      { label: 'Content Strategy', domain: 'plum' },
      { label: 'Donor Outreach', domain: 'terracotta' },
      { label: 'Facilitation Design', domain: 'sage' },
    ],
  },
  {
    num: '02',
    title: 'BirthStory',
    context: 'Helping parents document and reflect on their birth experience. Real client, real constraints, shipped concept.',
    gradient: 'linear-gradient(135deg, var(--color-chalcedony-muted), var(--color-cream-dark))',
    image: cloudImg(HOME_IMAGES['birthstory-cover'], 800),
    imageAlt: 'BirthStory app mockup on device',
    href: null,
    variant: 'standard',
    flip: true,
    contributions: [
      { label: 'UX Design', domain: 'sage' },
      { label: 'Client Iteration', domain: 'plum' },
      { label: 'Wireframing', domain: 'terracotta' },
    ],
  },
  {
    num: '03',
    title: 'SomeBuddy',
    context: 'Brand identity, UX, and animation for a therapy companion app. Full creative range.',
    gradient: 'linear-gradient(155deg, var(--color-terracotta-muted), var(--color-cream-dark))',
    image: cloudImg(HOME_IMAGES['somebuddy-cover'], 800),
    imageAlt: 'SomeBuddy brand identity and app screens',
    href: null,
    variant: 'standard',
    flip: false,
    contributions: [
      { label: 'Brand Identity', domain: 'terracotta' },
      { label: 'UX', domain: 'plum' },
      { label: 'Animation', domain: 'terracotta' },
    ],
  },
  {
    num: '04',
    title: 'Transition Design',
    context: 'A systems-level design response to food insecurity in Pittsburgh. The lens widens.',
    gradient: 'linear-gradient(140deg, var(--color-plum-muted), var(--color-chalcedony-muted))',
    image: cloudImg(HOME_IMAGES['transition-design-hero'], 800),
    imageAlt: 'Systems map showing interconnected food insecurity factors in Pittsburgh',
    href: null,
    variant: 'standard',
    flip: true,
    contributions: [
      { label: 'Systems Mapping', domain: 'plum' },
      { label: 'Research Synthesis', domain: 'plum' },
    ],
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Cell Grid — Projects + About */}
      <section className={styles.cellGrid} id="work">
        {/* Top border with "Selected Work" label */}
        <div className={styles.gridLabel} aria-hidden="true">
          <span className={styles.gridLabelLine} />
          <span className={styles.gridLabelText}>Selected work</span>
          <span className={styles.gridLabelLine} />
        </div>

        {/* Cell 1: Flagship */}
        <div className={`${styles.cell} ${styles.cellFlagship}`}>
          <ProjectCard project={PROJECTS[0]} variant="flagship" />
        </div>

        {/* Cells 2–4: Standard */}
        {PROJECTS.slice(1).map((project) => (
          <div key={project.num} className={`${styles.cell} ${styles.cellStandard}`}>
            <ProjectCard project={project} variant="standard" flip={project.flip} />
          </div>
        ))}

        {/* Cell 5: About */}
        <div className={`${styles.cell} ${styles.cellAbout}`}>
          <AboutSection />
        </div>
      </section>
    </>
  )
}
