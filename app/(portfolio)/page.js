import Hero from '@/components/Hero/Hero'
import Squiggle from '@/components/Squiggle/Squiggle'
import ProjectSection from '@/components/ProjectSection/ProjectSection'
import BirthStorySection from '@/components/BirthStorySection/BirthStorySection'
import GroundswellSection from '@/components/GroundswellSection/GroundswellSection'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudVideo, HOME_VIDEOS } from '@/lib/cloudinary'
import styles from './page.module.css'

/* ─── Project data ─── */
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
      <GroundswellSection />

      <Squiggle />
      <BirthStorySection />

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
