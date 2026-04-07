import Hero from '@/components/Hero/HeroScatter'
import Squiggle from '@/components/Squiggle/Squiggle'
import ProjectSection from '@/components/ProjectSection/ProjectSection'
import BirthStorySection from '@/components/BirthStorySection/BirthStorySection'
import GroundswellSection from '@/components/GroundswellSection/GroundswellSection'
import AboutSection from '@/components/AboutSection/AboutSection'
import {
  SOMEBUDDY, SOMEBUDDY_TILES,
  TRANSITION_DESIGN, TRANSITION_TILES,
  BRIDGING, BRIDGING_TILES,
} from '@/lib/homeProjects'
import styles from './page.module.css'

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
