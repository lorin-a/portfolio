import Hero from '@/components/Hero/HeroScatter'
import ProjectPreview from '@/components/ProjectPreview/ProjectPreview'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudImg, cloudVideo, HOME_IMAGES, HOME_VIDEOS, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Hero />

      <div id="work">
        <ProjectPreview
          num="01"
          title="Groundswell"
          tagline="Making Space to Restore, Together."
          description="A multi-scale design ecology built to support the complex emotional reality of oncology care. Co-designed with healthcare workers."
          contributions={[
            { label: 'Participatory Research' },
            { label: 'Copywriting' },
            { label: 'Experience Design' },
          ]}
          pillVariant="sense"
          mediaSrc={cloudVideo(GS_VIDEOS['gs-opener'], 1600)}
          mediaType="video"
          mediaAlt="Groundswell opener"
          mediaSequence={[
            { src: cloudImg(GS_IMAGES['gs-hero'], 1200), type: 'image', alt: 'Groundswell installation in hospital corridor' },
            { src: cloudVideo(GS_VIDEOS['gs-pod-data'], 1200), type: 'video', alt: 'Groundswell pod data view' },
            { src: cloudImg(GS_IMAGES['gs-cards'], 1200), type: 'image', alt: 'Groundswell reflection cards', zoom: 1.1 },
            { src: cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 1200), type: 'video', alt: 'Groundswell walkthrough' },
            { src: cloudImg(GS_IMAGES['gs-ctb-email'], 1200), type: 'image', alt: 'Groundswell care-through-books email in use' },
          ]}
          href="/projects/groundswell"
        />

        <ProjectPreview
          num="02"
          title="BirthStory"
          tagline="A micro-app for birthing parents."
          description="Helping parents document and reflect on their birth experience for University of Pittsburgh Women's Health."
          contributions={[
            { label: 'UX Research' },
            { label: 'UX Design' },
            { label: 'Client Iteration' },
          ]}
          pillVariant="weave"
          mediaSrc={cloudVideo(HOME_VIDEOS['birthstory-default'], 1600)}
          mediaType="video"
          mediaAlt="BirthStory default preview"
          mediaSequence={[
            { src: cloudVideo(HOME_VIDEOS['birthstory-hover'], 1200), type: 'video', alt: 'BirthStory hover preview' },
            { src: cloudImg(HOME_IMAGES['bs'], 1200), type: 'image', alt: 'BirthStory cover' },
          ]}
          comingSoon
          flip
        />

        <ProjectPreview
          num="03"
          title="SomeBuddy"
          tagline="A therapy companion app."
          description="Brand identity, UX, and animation for a therapy companion app. Full creative range."
          contributions={[
            { label: 'Brand Identity' },
            { label: 'UX' },
            { label: 'Animation' },
          ]}
          pillVariant="sense"
          mediaSrc={cloudVideo(HOME_VIDEOS['somebuddy-logo'], 1600)}
          mediaType="video"
          mediaAlt="SomeBuddy animated logo"
          mediaSequence={[
            { src: cloudVideo(HOME_VIDEOS['somebuddy-reel'], 1200), type: 'video', alt: 'SomeBuddy reel' },
            { src: cloudImg(HOME_IMAGES['somebuddy-31'], 1200), type: 'image', alt: 'SomeBuddy interface detail' },
            { src: cloudImg(HOME_IMAGES['somebuddy-28'], 1200), type: 'image', alt: 'SomeBuddy interface detail' },
            { src: cloudVideo(HOME_VIDEOS['somebuddy-reel-2'], 1200), type: 'video', alt: 'SomeBuddy reel continued' },
          ]}
          comingSoon
        />

        <ProjectPreview
          num="04"
          title="Transition Design"
          tagline="Systems-level design for food insecurity."
          description="A systems-level design response to food insecurity in Pittsburgh. The lens widens."
          contributions={[
            { label: 'Systems Mapping' },
            { label: 'Research Synthesis' },
          ]}
          pillVariant="sense"
          mediaSrc={cloudVideo(HOME_VIDEOS['transition-design-default'], 1600)}
          mediaType="video"
          mediaAlt="Transition design default preview"
          mediaSequence={[
            { src: cloudImg(HOME_IMAGES['td-scales'], 1200), type: 'image', alt: 'Scales of transition design intervention' },
            { src: cloudVideo(HOME_VIDEOS['transition-design-hover'], 1200), type: 'video', alt: 'Transition design detail' },
            { src: cloudImg(HOME_IMAGES['td-timeline'], 1200), type: 'image', alt: 'Food insecurity timeline' },
            { src: cloudImg(HOME_IMAGES['td-stakeholders'], 1200), type: 'image', alt: 'Stakeholder relations map' },
          ]}
          comingSoon
          flip
        />

        <ProjectPreview
          num="05"
          title="Bridging the G.A.P."
          tagline="Trail rebrand and campaign."
          description="A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders."
          contributions={[
            { label: 'UX Research' },
            { label: 'Brand Identity' },
            { label: 'Animation' },
          ]}
          pillVariant="shape"
          mediaSrc={cloudVideo(HOME_VIDEOS['bridging-default'], 1600)}
          mediaType="video"
          mediaAlt="Bridging the G.A.P. logo animation"
          mediaSequence={[
            { src: cloudImg(HOME_IMAGES['btg-29'], 1200), type: 'image', alt: 'Bridging the G.A.P. campaign detail' },
            { src: cloudVideo(HOME_VIDEOS['bridging-app-iphone'], 1200), type: 'video', alt: 'Bridging the G.A.P. iPhone app prototype' },
            { src: cloudVideo(HOME_VIDEOS['bridging-clip-2'], 1200), type: 'video', alt: 'Bridging the G.A.P. motion clip' },
            { src: cloudVideo(HOME_VIDEOS['bridging-logos-2'], 1200), type: 'video', alt: 'Bridging the G.A.P. secondary logo animation' },
            { src: cloudImg(HOME_IMAGES['btg-36'], 1200), type: 'image', alt: 'Bridging the G.A.P. campaign detail' },
            { src: cloudImg(HOME_IMAGES['btg-33'], 1200), type: 'image', alt: 'Bridging the G.A.P. campaign detail' },
          ]}
          comingSoon
        />
      </div>

      <section className={styles.aboutWrap}>
        <AboutSection />
      </section>
    </>
  )
}
