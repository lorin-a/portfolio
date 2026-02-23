import Hero from '@/components/Hero/Hero'
import SectionDivider from '@/components/SectionDivider/SectionDivider'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudImg, cloudVideo, HOME_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './page.module.css'

const PROJECTS = [
  {
    num: '01',
    slug: 'groundswell',
    title: 'Groundswell',
    context: 'A participatory care ecosystem supporting oncology staff wellbeing. Grant-funded, co-designed with healthcare workers, now in institutional pilot.',
    video: cloudVideo(GS_VIDEOS['gs-walkthrough-video']),
    hoverVideo: cloudVideo(GS_VIDEOS['gs-card-flip']),
    imageAlt: 'Groundswell digital ecosystem walkthrough',
    href: '/groundswell',
    variant: 'flagship',
    contributions: [
      { label: 'Participatory Research' },
      { label: 'Content Strategy' },
      { label: 'Donor Outreach' },
      { label: 'Facilitation Design' },
    ],
  },
  {
    num: '02',
    slug: 'birthstory',
    title: 'BirthStory',
    context: 'Helping parents document and reflect on their birth experience. Real client, real constraints, shipped concept.',
    image: cloudImg(HOME_IMAGES['birthstory-cover'], 800),
    imageAlt: 'BirthStory app mockup on device',
    href: '/projects/birthstory',
    variant: 'standard',
    contributions: [
      { label: 'UX Design' },
      { label: 'Client Iteration' },
      { label: 'Wireframing' },
    ],
  },
  {
    num: '03',
    slug: 'somebuddy',
    title: 'SomeBuddy',
    context: 'Brand identity, UX, and animation for a therapy companion app. Full creative range.',
    image: cloudImg(HOME_IMAGES['somebuddy-cover'], 800),
    imageAlt: 'SomeBuddy brand identity and app screens',
    href: '/projects/somebuddy',
    variant: 'standard',
    contributions: [
      { label: 'Brand Identity' },
      { label: 'UX' },
      { label: 'Animation' },
    ],
  },
  {
    num: '04',
    slug: 'transition-design',
    title: 'Transition Design',
    context: 'A systems-level design response to food insecurity in Pittsburgh. The lens widens.',
    image: cloudImg(HOME_IMAGES['transition-design-hero'], 800),
    imageAlt: 'Systems map showing interconnected food insecurity factors in Pittsburgh',
    href: '/projects/transition-design',
    variant: 'standard',
    contributions: [
      { label: 'Systems Mapping' },
      { label: 'Research Synthesis' },
    ],
  },
]

/* Alternating pattern: SomeBuddy (index 2) is flipped */
const FLIPPED = new Set(['somebuddy'])

export default function Home() {
  return (
    <>
      <Hero />

      {/* Selected Work */}
      <section className={styles.selectedWork} id="work">
        <SectionDivider label="Selected Work" />

        <div className={styles.projectsWrap}>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.num}
              project={project}
              flip={FLIPPED.has(project.slug)}
              preload={i === 0}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section className={styles.aboutWrap}>
        <SectionDivider label="About" />
        <AboutSection />
      </section>
    </>
  )
}
