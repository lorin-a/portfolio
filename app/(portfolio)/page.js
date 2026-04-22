import Hero from '@/components/Hero/HeroScatter'
import ProjectPreview from '@/components/ProjectPreview/ProjectPreview'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudImg, cloudVideo, HOME_IMAGES, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Hero />

      <div id="work">
        <ProjectPreview
          num="01"
          title="Groundswell"
          tagline="Making Space to Restore, Together"
          description="A multi-scale design ecology built to support the complex emotional reality of oncology care. Co-designed with healthcare workers."
          contributions={[
            { label: 'Participatory Research' },
            { label: 'Copywriting' },
            { label: 'Experience Design' },
          ]}
          pillVariant="sense"
          mediaSrc={cloudImg(GS_IMAGES['gs-hero'], 1600)}
          mediaType="image"
          mediaAlt="Groundswell installation"
          mediaSequence={[
            { src: cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 1200), type: 'video', alt: 'Groundswell walkthrough' },
            { src: cloudImg(GS_IMAGES['gs-cards'], 1200), type: 'image', alt: 'Groundswell reflection cards', zoom: 1.1 },
            { src: cloudImg(GS_IMAGES['gs-artwall'], 1200), type: 'image', alt: 'Groundswell community art wall' },
            { src: cloudImg(GS_IMAGES['groundswell-ctb-docs'], 1200), type: 'image', alt: 'Groundswell care-through-books documentation' },
          ]}
          href="/projects/groundswell"
        />

        <ProjectPreview
          num="02"
          title="BirthStory"
          tagline="A micro-app for birthing parents"
          description="Helping parents document and reflect on their birth experience for University of Pittsburgh Women's Health."
          contributions={[
            { label: 'UX Research' },
            { label: 'UX Design' },
            { label: 'Client Iteration' },
          ]}
          pillVariant="weave"
          mediaSrc={cloudImg(HOME_IMAGES['bs'], 1200)}
          mediaType="image"
          mediaAlt="BirthStory app screens"
          comingSoon
          flip
        />

        <ProjectPreview
          num="03"
          title="SomeBuddy"
          tagline="A therapy companion app"
          description="Brand identity, UX, and animation for a therapy companion app. Full creative range."
          contributions={[
            { label: 'Brand Identity' },
            { label: 'UX' },
            { label: 'Animation' },
          ]}
          pillVariant="sense"
          mediaSrc={cloudImg(HOME_IMAGES['somebuddy-cover'], 1200)}
          mediaType="image"
          mediaAlt="SomeBuddy app preview"
          comingSoon
        />

        <ProjectPreview
          num="04"
          title="Transition Design"
          tagline="Systems-level design for food insecurity"
          description="A systems-level design response to food insecurity in Pittsburgh. The lens widens."
          contributions={[
            { label: 'Systems Mapping' },
            { label: 'Research Synthesis' },
          ]}
          pillVariant="sense"
          mediaSrc={cloudImg(HOME_IMAGES['transition-design-hero'], 1200)}
          mediaType="image"
          mediaAlt="Transition design systems map"
          comingSoon
          flip
        />

        <ProjectPreview
          num="05"
          title="Bridging the G.A.P."
          tagline="Trail rebrand and campaign"
          description="A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders."
          contributions={[
            { label: 'UX Research' },
            { label: 'Brand Identity' },
            { label: 'Animation' },
          ]}
          pillVariant="shape"
          mediaSrc={cloudImg(HOME_IMAGES['bridging-cover'], 1200)}
          mediaType="image"
          mediaAlt="Bridging the G.A.P. campaign"
          comingSoon
        />
      </div>

      <section className={styles.aboutWrap}>
        <AboutSection />
      </section>
    </>
  )
}
