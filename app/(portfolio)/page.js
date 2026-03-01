import Hero from '@/components/Hero/Hero'
import Squiggle from '@/components/Squiggle/Squiggle'
import ProjectSection from '@/components/ProjectSection/ProjectSection'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudImg, cloudVideo, HOME_IMAGES, HOME_VIDEOS, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './page.module.css'

/* ─── Project data ─── */
const GROUNDSWELL = {
  num: '01',
  title: 'Groundswell',
  tagline: 'Making Space to Restore, Together',
  description:
    'A multi-suite design intervention built to support the complex emotional reality of oncology care. Co-designed with healthcare workers.',
  href: '/projects/groundswell',
  contributions: [
    { label: 'Participatory Research' },
    { label: 'Content Strategy' },
    { label: 'Facilitation Design' },
  ],
}

const GROUNDSWELL_TILES = [
  { src: cloudImg('gs-context-01_hnvnm2', 400), alt: 'Groundswell context photo', span: 1 },
  { src: cloudImg('gs-artwall_kfw1u7', 400), alt: 'Art wall installation', span: 1 },
  { src: cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 680), alt: 'Groundswell walkthrough', type: 'video', span: 1 },
  { src: cloudImg('gs-context-02_wqdbg7', 400), alt: 'Oncology care context', span: 1 },
  { src: cloudImg('gs-artwall-detail-01_p3xfco', 400), alt: 'Art wall detail', span: 1 },
  { src: cloudImg('gs-making-facade_ahgln6', 400), alt: 'Installation facade', span: 1 },
]

const BIRTHSTORY = {
  num: '02',
  title: 'BirthStory',
  tagline: 'A micro-app for birthing parents',
  description:
    'Helping parents document and reflect on their birth experience for University of Pittsburgh Women\'s Health.',
  comingSoon: true,
  contributions: [
    { label: 'UX Research' },
    { label: 'UX Design' },
    { label: 'Client Iteration' },
  ],
}

const BIRTHSTORY_TILES = [
  { src: cloudVideo(HOME_VIDEOS['birthstory-default'], 680), alt: 'BirthStory app preview', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['birthstory-hover'], 400), alt: 'BirthStory interaction', type: 'video', span: 1 },
]

const SOMEBUDDY = {
  num: '03',
  title: 'SomeBuddy',
  tagline: 'A therapy companion app',
  description:
    'Brand identity, UX, and animation for a therapy companion app. Full creative range.',
  comingSoon: true,
  contributions: [
    { label: 'Brand Identity' },
    { label: 'UX' },
    { label: 'Animation' },
  ],
}

const SOMEBUDDY_TILES = [
  { src: cloudVideo(HOME_VIDEOS['somebuddy-default'], 680), alt: 'SomeBuddy app preview', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['somebuddy-hover'], 400), alt: 'SomeBuddy interaction', type: 'video', span: 1 },
]

const TRANSITION_DESIGN = {
  num: '04',
  title: 'Transition Design',
  tagline: 'Systems-level design for food insecurity',
  description:
    'A systems-level design response to food insecurity in Pittsburgh. The lens widens.',
  comingSoon: true,
  contributions: [
    { label: 'Systems Mapping' },
    { label: 'Research Synthesis' },
  ],
}

const TRANSITION_TILES = [
  { src: cloudVideo(HOME_VIDEOS['transition-design-default'], 680), alt: 'Transition design systems map', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['transition-design-hover'], 400), alt: 'Transition design detail', type: 'video', span: 1 },
]

const BRIDGING = {
  num: '05',
  title: 'Bridging the G.A.P.',
  tagline: 'Trail rebrand and campaign',
  description:
    'A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders, GPS app prototype, and environmental graphics.',
  comingSoon: true,
  contributions: [
    { label: 'UX Research' },
    { label: 'Brand Identity' },
    { label: 'Animation' },
  ],
}

const BRIDGING_TILES = [
  { src: cloudVideo(HOME_VIDEOS['bridging-default'], 680), alt: 'Bridging the G.A.P. campaign', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['bridging-hover'], 400), alt: 'Bridging the G.A.P. detail', type: 'video', span: 1 },
]

export default function Home() {
  return (
    <>
      <Hero />

      <Squiggle />
      <ProjectSection project={GROUNDSWELL} tiles={GROUNDSWELL_TILES} pillVariant="weave" />

      <Squiggle />
      <ProjectSection project={BIRTHSTORY} tiles={BIRTHSTORY_TILES} flip pillVariant="shape" />

      <Squiggle />
      <ProjectSection project={SOMEBUDDY} tiles={SOMEBUDDY_TILES} pillVariant="sense" />

      <Squiggle />
      <ProjectSection project={TRANSITION_DESIGN} tiles={TRANSITION_TILES} flip pillVariant="sense" />

      <Squiggle />
      <ProjectSection project={BRIDGING} tiles={BRIDGING_TILES} pillVariant="shape" />

      {/* About */}
      <section className={styles.aboutWrap}>
        <AboutSection />
      </section>
    </>
  )
}
