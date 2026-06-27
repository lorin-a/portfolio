import Hero from '@/components/Hero/HeroScatter'
import ProjectPreview from '@/components/ProjectPreview/ProjectPreview'
import AboutSection from '@/components/AboutSection/AboutSection'
import { cloudImg, cloudVideo, HOME_IMAGES, HOME_VIDEOS, GS_IMAGES, GS_VIDEOS, WHELM_IMAGES, WHELM_VIDEOS } from '@/lib/cloudinary'
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
            {
              label: 'Experience Design',
              gallery: [
                { src: cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 1200), type: 'video', alt: 'Walkthrough of the Groundswell installation' },
                { src: cloudImg(GS_IMAGES['gs-hero'], 1200), type: 'image', alt: 'Groundswell installation in hospital corridor' },
                { src: cloudImg(GS_IMAGES['gs-artwall'], 1200), type: 'image', alt: 'Groundswell art wall' },
                { src: cloudImg(GS_IMAGES['gs-pod-detail-02'], 1200), type: 'image', alt: 'Groundswell pod detail' },
                { src: cloudImg(GS_IMAGES['gs-pod-detail-03'], 1200), type: 'image', alt: 'Groundswell pod detail' },
              ],
            },
            {
              /* Gated: these screen recordings show real care data + licensed
                 artwork that can't be public. Rendered blurred behind a lock
                 (FileStack / MobileCardStack) — the work is visibly there,
                 the content is protected. gatedLabel/gatedNote tune the copy. */
              label: 'Data Visualization',
              gated: true,
              gatedLabel: 'Confidential',
              gatedNote: 'Available on request',
              gallery: [
                { src: cloudVideo(GS_VIDEOS['gs-opener'], 1200), type: 'video', alt: 'Groundswell data platform (protected preview)' },
                { src: cloudVideo(GS_VIDEOS['gs-pod-data'], 1200), type: 'video', alt: 'Groundswell pod data view (protected preview)' },
              ],
            },
            {
              label: 'Copywriting',
              gallery: [
                { src: cloudImg(GS_IMAGES['gs-mockups-50'], 1200), type: 'image', alt: 'Groundswell copywriting mockup' },
                { src: cloudImg(GS_IMAGES['gs-mockups-43'], 1200), type: 'image', alt: 'Groundswell copywriting mockup' },
                { src: cloudImg(GS_IMAGES['gs-ctb-detail-03'], 1200), type: 'image', alt: 'Groundswell care-through-books detail' },
              ],
            },
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
          cardVariant="file"
          // Privacy hold (2026-06-24): the /projects/groundswell case study is
          // sealed (reproduces licensed "Blue Garden" artwork). CTA points to
          // CMU's editorial feature instead of the gated case study. NOTE: the
          // thumbnails above (gs-cards, gs-artwall, gs-opener) still reproduce
          // the artwork — swap pending in the compliant pass.
          href="https://cfa.cmu.edu/magazine/groundswell-designing-systems-care-those-who-care"
          external
          ctaLabel="Read the feature"
        />

        <ProjectPreview
          num="02"
          title="BirthStory"
          tagline="A Micro-App for Birthing Parents"
          description="Helping parents document and reflect on their birth experience for University of Pittsburgh Women’s Health."
          contributions={[
            {
              label: 'UX Design',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['birthstory-default'], 1200), type: 'video', alt: 'BirthStory default preview' },
                { src: cloudVideo(HOME_VIDEOS['birthstory-hover'], 1200), type: 'video', alt: 'BirthStory hover preview' },
                { src: cloudImg(HOME_IMAGES['bs-5'], 1200), type: 'image', alt: 'BirthStory interface detail' },
                { src: cloudImg(HOME_IMAGES['bs-4'], 1200), type: 'image', alt: 'BirthStory interface detail' },
              ],
            },
            {
              label: 'UX Research',
              gallery: [
                { src: cloudImg(HOME_IMAGES['bs-49'], 1200), type: 'image', alt: 'BirthStory research process' },
                { src: cloudImg(HOME_IMAGES['bs-73'], 1200), type: 'image', alt: 'BirthStory site architecture' },
                { src: cloudImg(HOME_IMAGES['bs-55'], 1200), type: 'image', alt: 'BirthStory research approach' },
                { src: cloudImg(HOME_IMAGES['bs-27'], 1200), type: 'image', alt: 'BirthStory site navigation map' },
              ],
            },
            {
              label: 'Client Iteration',
              gallery: [
                { src: cloudImg(HOME_IMAGES['bs-23'], 1200), type: 'image', alt: 'BirthStory client iteration — class working with client' },
                { src: cloudImg(HOME_IMAGES['bs-64'], 1200), type: 'image', alt: 'BirthStory wireframe iteration' },
                { src: cloudImg(HOME_IMAGES['bs-67'], 1200), type: 'image', alt: 'BirthStory wireframe iteration' },
                { src: cloudImg(HOME_IMAGES['bs-74'], 1200), type: 'image', alt: 'BirthStory wireframe iteration' },
                { src: cloudImg(HOME_IMAGES['bs-83'], 1200), type: 'image', alt: 'BirthStory wireframe iteration' },
              ],
            },
          ]}
          pillVariant="weave"
          mediaSrc={cloudVideo(HOME_VIDEOS['birthstory-default'], 1600)}
          mediaType="video"
          mediaAlt="BirthStory default preview"
          mediaSequence={[
            { src: cloudVideo(HOME_VIDEOS['birthstory-hover'], 1200), type: 'video', alt: 'BirthStory hover preview' },
            { src: cloudImg(HOME_IMAGES['bs'], 1200), type: 'image', alt: 'BirthStory cover' },
          ]}
          cardVariant="file"
          href="https://medium.com/ma-in-design-carnegie-mellon/client-project-birthstory-a-micro-app-for-birthing-parents-to-record-reflect-on-their-138849c42a38"
          external
          flip
        />

        <ProjectPreview
          num="03"
          title="Whelm"
          tagline="A Companion for Navigating Overwhelm"
          description="A self-inquiry ritual with a sequenced framework that slows thought spirals, gently navigates internal conflict, and surfaces core needs that are buried beneath ruminating narratives."
          contributions={[
            {
              label: 'Original Concept',
              gallery: [
                { src: cloudVideo(WHELM_VIDEOS['whelm-preview'], 1200), type: 'video', alt: 'Whelm preview' },
                { src: cloudImg(WHELM_IMAGES['whelm-slide-9'], 1200), type: 'image', alt: 'Whelm concept slide' },
                { src: cloudImg(WHELM_IMAGES['whelm-slide-11'], 1200), type: 'image', alt: 'Whelm concept slide' },
                { src: cloudImg(WHELM_IMAGES['whelm-slide-13'], 1200), type: 'image', alt: 'Whelm concept slide' },
              ],
            },
            {
              label: 'Framework Development',
              gallery: [
                { src: cloudImg(WHELM_IMAGES['whelm-slide-27'], 1200), type: 'image', alt: 'Whelm framework slide' },
                { src: cloudImg(WHELM_IMAGES['whelm-slide-17'], 1200), type: 'image', alt: 'Whelm framework slide' },
                { src: cloudImg(WHELM_IMAGES['whelm-slide-8'], 1200), type: 'image', alt: 'Whelm framework slide' },
                { src: cloudImg(WHELM_IMAGES['whelm-slide-22'], 1200), type: 'image', alt: 'Whelm framework slide' },
              ],
            },
            {
              label: 'Interaction Design',
              gallery: [
                { src: cloudVideo(WHELM_VIDEOS['whelm-meter'], 1200), type: 'video', alt: 'Whelm meter interaction' },
                { src: cloudVideo(WHELM_VIDEOS['whelm-body'], 1200), type: 'video', alt: 'Whelm body scan interaction' },
                { src: cloudVideo(WHELM_VIDEOS['whelm-breathe'], 1200), type: 'video', alt: 'Whelm breathe interaction' },
              ],
            },
          ]}
          pillVariant="weave"
          mediaSrc={cloudImg(WHELM_IMAGES['whelm-2'], 1600)}
          mediaType="image"
          mediaAlt="Whelm interface — meter introduction"
          mediaSequence={[
            { src: cloudVideo(WHELM_VIDEOS['whelm-meter'], 1200), type: 'video', alt: 'Whelm meter in motion' },
            { src: cloudImg(WHELM_IMAGES['whelm-3'], 1200), type: 'image', alt: 'Whelm interface — body scan introduction' },
            { src: cloudVideo(WHELM_VIDEOS['whelm-body'], 1200), type: 'video', alt: 'Whelm body scan in motion' },
            { src: cloudImg(WHELM_IMAGES['whelm-4'], 1200), type: 'image', alt: 'Whelm interface — breathe introduction' },
            { src: cloudVideo(WHELM_VIDEOS['whelm-breathe'], 1200), type: 'video', alt: 'Whelm breathe practice' },
            { src: cloudVideo(WHELM_VIDEOS['whelm-opener'], 1200), type: 'video', alt: 'Whelm opener' },
          ]}
          cardVariant="file"
          comingSoon
        />

        <ProjectPreview
          num="04"
          title="SomeBuddy"
          tagline="Approachable Socialization for Busy Buddies"
          description="A product and brand system for university campuses, helping busy students connect over shared values through low-effort socializing."
          contributions={[
            {
              label: 'Brand Identity',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['somebuddy-logo'], 1600), type: 'video', alt: 'SomeBuddy animated logo' },
                { src: cloudImg(HOME_IMAGES['somebuddy-22'], 1200), type: 'image', alt: 'SomeBuddy brand detail' },
                { src: cloudImg(HOME_IMAGES['somebuddy-23'], 1200), type: 'image', alt: 'SomeBuddy brand detail' },
                { src: cloudVideo(HOME_VIDEOS['somebuddy-reel-2'], 1200), type: 'video', alt: 'SomeBuddy brand reel' },
              ],
            },
            {
              label: 'Animation',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['somebuddy-animation'], 1200), type: 'video', alt: 'SomeBuddy animation detail' },
                { src: cloudVideo(HOME_VIDEOS['somebuddy-animation-2'], 1200), type: 'video', alt: 'SomeBuddy animation detail' },
                { src: cloudVideo(HOME_VIDEOS['somebuddy-animation-3'], 1200), type: 'video', alt: 'SomeBuddy animation detail' },
              ],
            },
            {
              label: 'UX',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['somebuddy-ux'], 1200), type: 'video', alt: 'SomeBuddy UX flow' },
                { src: cloudVideo(HOME_VIDEOS['somebuddy-ux-2'], 1200), type: 'video', alt: 'SomeBuddy UX flow detail' },
                { src: cloudImg(HOME_IMAGES['somebuddy-28'], 1200), type: 'image', alt: 'SomeBuddy UX detail' },
                { src: cloudImg(HOME_IMAGES['somebuddy-30'], 1200), type: 'image', alt: 'SomeBuddy UX detail' },
                { src: cloudImg(HOME_IMAGES['somebuddy-31'], 1200), type: 'image', alt: 'SomeBuddy UX detail' },
              ],
            },
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
          cardVariant="file"
          href="https://medium.com/ma-in-design-carnegie-mellon/somebuddy-a-social-app-for-busy-grad-students-60c22c579d78"
          external
          flip
        />

        <ProjectPreview
          num="05"
          title="Transition Design"
          tagline="Roots to Resilience: A Food Justice Future"
          description="A systems-level design response to food insecurity in Pittsburgh using Transition Design methods."
          contributions={[
            {
              label: 'Systems Mapping',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['transition-design-default'], 1200), type: 'video', alt: 'Transition design preview' },
                { src: cloudImg(HOME_IMAGES['td-stakeholders-full'], 1200), type: 'image', alt: 'Stakeholder relations map' },
                { src: cloudImg(HOME_IMAGES['td-timeline-full'], 1200), type: 'image', alt: 'Food insecurity timeline' },
              ],
            },
            {
              label: 'Design Futures',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['transition-design-hover'], 1200), type: 'video', alt: 'Transition design preview' },
                { src: cloudImg(HOME_IMAGES['td-scales'], 1200), type: 'image', alt: 'Scales of transition design intervention' },
                { src: cloudImg(HOME_IMAGES['td-roots'], 1200), type: 'image', alt: 'Roots to Resilience design future' },
                { src: cloudImg(HOME_IMAGES['td-4b'], 1200), type: 'image', alt: 'Transition design speculative artifact' },
              ],
            },
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
          cardVariant="file"
          href="https://medium.com/transition-design-seminar-spring-25-carnegie"
          external
        />

        <ProjectPreview
          num="06"
          title="Bridging the G.A.P."
          tagline="Inclusive and Playful Nature Trail Rebrand"
          description="A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders."
          contributions={[
            {
              label: 'Brand Identity',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['bridging-default'], 1200), type: 'video', alt: 'Bridging the G.A.P. logo animation' },
                { src: cloudImg(HOME_IMAGES['btg-29'], 1200), type: 'image', alt: 'Bridging the G.A.P. brand detail' },
                { src: cloudImg(HOME_IMAGES['btg-30'], 1200), type: 'image', alt: 'Bridging the G.A.P. brand detail' },
                { src: cloudImg(HOME_IMAGES['btg-33'], 1200), type: 'image', alt: 'Bridging the G.A.P. brand detail' },
              ],
            },
            {
              label: 'UX Design',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['bridging-clip-1'], 1200), type: 'video', alt: 'Bridging the G.A.P. motion clip' },
                { src: cloudVideo(HOME_VIDEOS['bridging-clip-2'], 1200), type: 'video', alt: 'Bridging the G.A.P. motion clip' },
                { src: cloudImg(HOME_IMAGES['btg-14'], 1200), type: 'image', alt: 'Bridging the G.A.P. research artifact' },
                { src: cloudImg(HOME_IMAGES['btg-45'], 1200), type: 'image', alt: 'Bridging the G.A.P. research artifact' },
                { src: cloudImg(HOME_IMAGES['btg-15'], 1200), type: 'image', alt: 'Bridging the G.A.P. research artifact' },
              ],
            },
            {
              label: 'Animation',
              gallery: [
                { src: cloudVideo(HOME_VIDEOS['bridging-gap-logo'], 1200), type: 'video', alt: 'Bridging the G.A.P. logo animation' },
                { src: cloudVideo(HOME_VIDEOS['bridging-logos-3'], 1200), type: 'video', alt: 'Bridging the G.A.P. secondary logo animation' },
                { src: cloudVideo(HOME_VIDEOS['bridging-logos-2'], 1200), type: 'video', alt: 'Bridging the G.A.P. secondary logo animation' },
              ],
            },
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
          cardVariant="file"
          href="https://medium.com/ma-in-design-carnegie-mellon/cmu-design-ma-visual-comms-studio-project-4-communications-rebrand-4ddc692dec05"
          external
          flip
        />
      </div>

      <section id="about" className={styles.aboutWrap}>
        <AboutSection />
      </section>
    </>
  )
}
