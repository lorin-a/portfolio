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
          tagline="A micro-app for birthing parents."
          description="Helping parents document and reflect on their birth experience for University of Pittsburgh Women's Health."
          contributions={[
            { label: 'UX Research' },
            { label: 'UX Design' },
            { label: 'Client Iteration' },
          ]}
          pillVariant="weave"
          mediaSrc={cloudImg(HOME_IMAGES['bs'], 1600)}
          mediaType="image"
          mediaAlt="BirthStory cover"
          mediaSequence={[
            { src: cloudImg(HOME_IMAGES['bs-2'], 1200), type: 'image', alt: 'BirthStory app screen' },
            { src: cloudImg(HOME_IMAGES['bs-3'], 1200), type: 'image', alt: 'BirthStory app screen' },
            { src: cloudImg(HOME_IMAGES['bs-4'], 1200), type: 'image', alt: 'BirthStory app screen' },
            { src: cloudImg(HOME_IMAGES['bs-5'], 1200), type: 'image', alt: 'BirthStory app screen' },
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
          mediaSrc={cloudImg(HOME_IMAGES['somebuddy-cover'], 1600)}
          mediaType="image"
          mediaAlt="SomeBuddy cover"
          mediaSequence={[
            { src: cloudVideo(HOME_VIDEOS['somebuddy-default'], 1200), type: 'video', alt: 'SomeBuddy app preview' },
            { src: cloudVideo(HOME_VIDEOS['somebuddy-hover'], 1200), type: 'video', alt: 'SomeBuddy interaction' },
            { src: cloudImg(HOME_IMAGES['somebuddy-cover'], 1200), type: 'image', alt: 'SomeBuddy placeholder' },
            { src: cloudImg(HOME_IMAGES['somebuddy-cover'], 1200), type: 'image', alt: 'SomeBuddy placeholder' },
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
          mediaSrc={cloudImg(HOME_IMAGES['transition-design-hero'], 1600)}
          mediaType="image"
          mediaAlt="Transition design cover"
          mediaSequence={[
            { src: cloudVideo(HOME_VIDEOS['transition-design-default'], 1200), type: 'video', alt: 'Transition design systems map' },
            { src: cloudVideo(HOME_VIDEOS['transition-design-hover'], 1200), type: 'video', alt: 'Transition design detail' },
            { src: cloudImg(HOME_IMAGES['transition-design-hero'], 1200), type: 'image', alt: 'Transition design placeholder' },
            { src: cloudImg(HOME_IMAGES['transition-design-hero'], 1200), type: 'image', alt: 'Transition design placeholder' },
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
          mediaSrc={cloudImg(HOME_IMAGES['bridging-cover'], 1600)}
          mediaType="image"
          mediaAlt="Bridging the G.A.P. cover"
          mediaSequence={[
            { src: cloudVideo(HOME_VIDEOS['bridging-default'], 1200), type: 'video', alt: 'Bridging the G.A.P. campaign' },
            { src: cloudVideo(HOME_VIDEOS['bridging-hover'], 1200), type: 'video', alt: 'Bridging the G.A.P. detail' },
            { src: cloudImg(HOME_IMAGES['bridging-cover'], 1200), type: 'image', alt: 'Bridging placeholder' },
            { src: cloudImg(HOME_IMAGES['bridging-cover'], 1200), type: 'image', alt: 'Bridging placeholder' },
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
