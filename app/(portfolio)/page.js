import Hero from '@/components/Hero/Hero'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import AboutSection from '@/components/AboutSection/AboutSection'
import styles from './page.module.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Groundswell',
    context: 'A participatory care ecosystem supporting oncology staff wellbeing. Grant-funded, co-designed with healthcare workers, now in institutional pilot.',
    gradient: 'linear-gradient(170deg, var(--color-sage-muted), var(--color-plum-muted) 40%, var(--color-terracotta-muted))',
    placeholder: 'Scanner collage or\nvideo loop of\necosystem artifacts',
    href: '/groundswell',
    variant: 'flagship',
  },
  {
    num: '02',
    title: 'BirthStory',
    context: 'Helping parents document and reflect on their birth experience. Real client, real constraints, shipped concept.',
    gradient: 'linear-gradient(135deg, var(--color-chalcedony-muted), var(--color-cream-dark))',
    placeholder: 'App mockup\non device',
    href: null,
    variant: 'standard',
    flip: true,
  },
  {
    num: '03',
    title: 'SomeBuddy',
    context: 'Brand identity, UX, and animation for a therapy companion app. Full creative range.',
    gradient: 'linear-gradient(155deg, var(--color-terracotta-muted), var(--color-cream-dark))',
    placeholder: 'Animated logo\nor brand moment',
    href: null,
    variant: 'standard',
    flip: false,
  },
  {
    num: '04',
    title: 'Transition Design',
    context: 'A systems-level design response to food insecurity in Pittsburgh. The lens widens.',
    gradient: 'linear-gradient(140deg, var(--color-plum-muted), var(--color-chalcedony-muted))',
    placeholder: 'Systems map\ndetail',
    href: null,
    variant: 'standard',
    flip: true,
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Bridge — accordion to projects */}
      <div className={styles.bridge}>
        <span className={styles.bridgeText}>Selected work</span>
        <span className={styles.bridgeLine} />
      </div>

      {/* Projects */}
      <section className={styles.projects} id="work">
        {PROJECTS.map(project => (
          <ProjectCard
            key={project.num}
            project={project}
            variant={project.variant}
            flip={project.flip}
          />
        ))}
      </section>

      <AboutSection />
    </>
  )
}
