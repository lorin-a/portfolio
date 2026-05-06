'use client'

import { useState, useEffect } from 'react'
import styles from '@/styles/project.module.css'
import { cloudImg, cloudVideo, cloudAudio, GS_IMAGES, GS_VIDEOS, GS_AUDIO } from '@/lib/cloudinary'
import CardCarousel from '@/components/CardCarousel/CardCarousel'
import ScrollVideo from '@/components/ScrollVideo/ScrollVideo'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import ProgressNav from '@/components/ProgressNav/ProgressNav'
import CinematicIntro from '@/components/CinematicIntro/CinematicIntro'
import AudioPlayer from './parts/AudioPlayer'
import DiagramTabs from './parts/DiagramTabs'

const gsImg = (key, w) => cloudImg(GS_IMAGES[key], w)
const gsVid = (key) => cloudVideo(GS_VIDEOS[key])
const gsAud = (key) => cloudAudio(GS_AUDIO[key])

// Public-site nav: Intro · Vision · Ecosystem · Outcomes · Press · Context · What's Next
const sectionLabels = {
  'hero': 'Intro',
  'vision': 'Vision',
  'ecosystem': 'The Ecosystem',
  'artwall': 'The Ecosystem',
  'pod': 'The Ecosystem',
  'ctb': 'The Ecosystem',
  'cards': 'The Ecosystem',
  'outcomes': 'Outcomes',
  'press': 'Press',
  'timeline': 'Timeline',
  'case-study': 'Case Study',
  'acknowledgements': 'Credits',
  'whats-next': 'Get in Touch',
}

const darkSections = ['hero', 'vision', 'ctb', 'artwall', 'outcomes', 'acknowledgements', 'whats-next']

// Dashboard clips: 5 public-safe alternates, all blurred to obscure
// unpublished study findings. Labels name what each view is so the
// reader can orient without seeing the underlying data.
const dashboardClips = [
  { src: gsVid('gs-intro-artwall'), label: 'Entry Screen' },
  { src: gsVid('gs-pod-data'), label: 'Pod Usage' },
  { src: gsVid('gs-display-view'), label: 'Display View' },
  { src: gsVid('gs-overlay'), label: 'About Page' },
  { src: gsVid('gs-new-meditations'), label: 'Meditations Data' },
]

const audioTracks = [
  {
    type: 'Poem',
    title: '“Remember Your Heart”',
    artist: 'Read by Catherine Liggett',
    src: gsAud('gs-poem-remember'),
  },
  {
    type: 'Guided Meditation',
    title: '“Coming Home to Yourself”',
    artist: 'By Catherine Liggett',
    src: gsAud('gs-meditation-home'),
  },
]

export default function GroundswellPublicContent() {
  const [currentSectionId, setCurrentSectionId] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  // Driven by CinematicIntro's pin ScrollTrigger -- true while the
  // cinematic is pinned/active, false otherwise. More reliable than
  // an IntersectionObserver over a section whose bbox is dominated
  // by the pin spacer.
  const [inCinematic, setInCinematic] = useState(false)

  const isDarkSection = darkSections.includes(currentSectionId)
  const showNav = scrollProgress > 3 && !inCinematic && currentSectionId !== 'hero'

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return
    // Observe both the labeled sections (drives nav state) and the
    // cinematic intro (used to hide the progress line during it).
    const ids = [...Object.keys(sectionLabels), 'cinematic-intro']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSectionId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isMounted])

  return (
    <div className={styles.immersivePage}>
      <ProgressNav
        scrollProgress={scrollProgress}
        isDark={isDarkSection}
        isVisible={showNav}
      />

      {/* ==================== HERO + CINEMATIC INTRO ====================
          Merged: hero photograph dissolves into the watercolor inside one
          sticky backdrop. The fade IS the entry into the cinematic. */}
      <CinematicIntro onActiveChange={setInCinematic} />

      {/* ==================== PROJECT METADATA STRIP ====================
          Quiet ground after the watercolor cinematic, before the case study
          proper begins. Visitor catches their breath in fact before
          entering Vision. */}
      <section className={styles.projectInfoStrip}>
        <div className={styles.projectInfoGrid}>
          <div className={styles.projectInfoItem}>
            <span className={styles.projectInfoLabel}>Client</span>
            <span className={styles.projectInfoValue}>UPMC Magee-Womens Hospital</span>
          </div>
          <div className={styles.projectInfoItem}>
            <span className={styles.projectInfoLabel}>Duration</span>
            <span className={styles.projectInfoValue}>15 wks research + 10 wks production + ongoing pilot</span>
          </div>
          <div className={styles.projectInfoItem}>
            <span className={styles.projectInfoLabel}>Status</span>
            <span className={styles.projectInfoValue}>12-month Quality Improvement Study</span>
          </div>
          <div className={styles.projectInfoItem}>
            <span className={styles.projectInfoLabel}>Partners</span>
            <span className={styles.projectInfoValue}>CMU School of Design · Pitt School of Nursing · UPMC Hillman Cancer Center</span>
          </div>
          <div className={styles.projectInfoItem}>
            <span className={styles.projectInfoLabel}>Funding</span>
            <span className={styles.projectInfoValue}>CMU College of Fine Arts · UPMC Magee Medical Staff Fund · Paul D. Schurgot Foundation</span>
          </div>
        </div>
      </section>

      {/* ==================== VISION ==================== */}
      <section id="vision" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>The Vision</h2>
            {/* PUBLIC-TONE TBD: "developed with the Gynecologic Oncology staff"
                reads procedural / institutional. For public/donor audience,
                consider warmer framing — "made with the oncology staff at
                UPMC Magee" or naming the relationship instead of the unit. */}
            <p className={styles.stickyBodyLightBold}>
              Groundswell is a grant-funded ecosystem of emotional support for healthcare workers, developed with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital.
            </p>
            <p className={styles.stickyBodyLight}>
              Through communication, creativity, and connection, Groundswell fosters a culture where the emotional complexities of oncology care are acknowledged, isolation transforms into belonging, and self-care is honored as essential to delivering excellent patient care.
            </p>
            <blockquote className={styles.outcomesQuote}>
              &ldquo;Groundswell reminds us that caring for patients begins with caring for the people who serve them. By creating intentional spaces and practices that acknowledge the emotional realities of oncology care, we&rsquo;re laying the foundation for a culture where staff well-being is recognized as essential.&rdquo;
            </blockquote>
            <cite className={styles.outcomesQuoteCite}>&mdash; Samantha Williams, Director of Women&rsquo;s Cancer Services, UPMC</cite>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <ScrollVideo src={gsVid('gs-walkthrough-video')} label="Installation Walkthrough" />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== ECOSYSTEM ==================== */}
      <section id="ecosystem" className={styles.breakSection}>
        <div className={styles.breakContent}>
          <AnimatedElement>
            <h2 className={styles.breakTitle}>The Ecosystem</h2>
            <p className={styles.breakBody}>
              <em>Named for water that rises naturally from deep within the earth, Groundswell emerges directly from the efforts and voices of healthcare workers themselves.</em>
            </p>
            {/* PUBLIC-TONE TBD: "comprises four interconnected components" +
                "designed to meet staff wherever they are in their day" reads
                as design-deck language. For public, consider naming what each
                does in human terms (a wall, a pod, an email, cards) instead
                of describing them as components. */}
            <p className={styles.breakBody}>
              The ecosystem comprises four interconnected components&mdash;each addressing a different dimension of workplace well-being, designed to meet staff wherever they are in their day. Together, they create the conditions for culture change to emerge from within the care community.
            </p>
          </AnimatedElement>
          <AnimatedElement>
            <DiagramTabs />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== COMMUNITY ART WALL ==================== */}
      <section id="artwall" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <p className={styles.componentLabelLight}>Component 01</p>
            <h3 className={styles.stickyTitleLight}>Community Art Wall</h3>
            {/* PUBLIC-TONE TBD: "anonymous shared emotional expression across
                the full spectrum of oncology experiences" is design-spec.
                Consider plainer: what staff and families do at the wall,
                what they leave there, what it feels like to walk past one. */}
            <p className={styles.stickyBodyLightBold}>
              A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences.
            </p>
            <p className={styles.stickyBodyLight}>
              We intentionally included family caregivers and patients because we saw how important it was for staff to hear from them—especially gratitude, as almost every desk was decorated with cards from patients and families. Staff reported discomfort expressing feelings due to fear of retaliation. We built this as an anonymous place to safely share and understand what others are feeling—giving public, collective voice to the cancer care community.
            </p>
            <blockquote className={styles.outcomesQuote}>
              &ldquo;Groundswell is not just a campaign—it&rsquo;s a commitment. By centering staff-identified well-being priorities, we&rsquo;re ensuring that every voice is heard and concerns are addressed.&rdquo;
            </blockquote>
            <cite className={styles.outcomesQuoteCite}>&mdash; Kendyl Grant, Director of Operations for the Gynecologic Oncology Division, UPMC</cite>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src={gsImg('gs-artwall', 1200)} alt="Groundswell Community Art Wall" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-artwall-detail-01', 1200)} alt="Art wall contributions from staff" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-artwall-detail-02', 1200)} alt="Art wall community expressions" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-artwall-detail-03', 1200)} alt="Art wall collective voice" className={styles.scrollImage} />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== RESTORATIVE POD ==================== */}
      <section id="pod" className={`${styles.parallaxSection} ${styles.parallaxReverse}`}>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src={gsImg('gs-pod', 1200)} alt="Groundswell Restorative Pod" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-pod-detail-01', 1200)} alt="Pod interior with soft LED lighting" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-pod-detail-02', 1200)} alt="Pod poem and invitation to set down what you carry" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-pod-detail-03', 1200)} alt="Pod meditation resources and finger labyrinth" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <div className={styles.iphoneMockupContainer}>
              <div className={styles.iphoneFrame}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.iphoneVideo}
                >
                  <source src={gsVid('gs-qr-library')} type="video/mp4" />
                </video>
              </div>
              <p className={styles.iphoneCaption}>
                Staff access guided meditations and poetry on-demand
              </p>
            </div>
          </AnimatedElement>
        </div>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContent}>
            <p className={styles.componentLabel}>Component 02</p>
            <h3 className={styles.stickyTitle}>Restorative Pod</h3>
            {/* PUBLIC-TONE TBD: "emotional decompression through mindfulness
                activities" reads clinical. Consider: what the pod actually
                is (a small private room with a soft chair, audio, a
                labyrinth) and what it gives staff (10 minutes alone). */}
            <p className={styles.stickyBodyBold}>
              A dedicated space for emotional decompression through mindfulness activities like guided meditation.
            </p>
            <p className={styles.stickyBody}>
              We heard that staff save their tears for the car ride home or the bathroom stall—a process that takes away from their quality time with loved ones. Almost everyone we spoke to commented on the physical environment as an opportunity for improvement. Nestled in a space that once housed telephone booths, the pod invites staff to take a moment to restore, reinforcing the message that emotional labor is real work deserving of real space.
            </p>
            <div className={styles.audioInStickySection}>
              <p className={styles.audioStickyLabel}>Pod Audio Resources</p>
              {audioTracks.map((track, i) => (
                <AudioPlayer key={i} track={track} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTB EMAIL ==================== */}
      <section id="ctb" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <p className={styles.componentLabelLight}>Component 03</p>
            <h3 className={styles.stickyTitleLight}>Ceased to Breathe Email</h3>
            {/* PUBLIC-TONE TBD: "Updated patient death notification email
                template with compassionate visuals and language" is dense
                + clinical. Public lead could be: what the email is, what
                it says now that it didn't before, why that matters. */}
            <p className={styles.stickyBodyLightBold}>
              Updated patient death notification email template with compassionate visuals and language that acknowledges the impact of patient loss.
            </p>
            <p className={styles.stickyBodyLight}>
              What we initially saw as a cold clinical protocol was actually a staff-created innovation—a radical act of compassion one nurse manager had built to ensure colleagues learned about patient deaths with dignity. This revelation shifted our entire approach: from &ldquo;the system has let you down&rdquo; to &ldquo;you have already created a beautiful culture of care.&rdquo; Groundswell honors and amplifies what was already there by integrating a low-effort change to an Outlook email template. This component infuses the language of care into the workflow without over-burdening staff with administrative overhead.
            </p>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src={gsImg('gs-ctb-detail-01', 1600)} alt="CTB email context and development" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-ctb-email', 1600)} alt="Redesigned Ceased to Breathe email template" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src={gsImg('gs-ctb-detail-02', 1600)} alt="CTB email detail showing compassionate language" className={styles.scrollImage} />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== REFLECTION CARDS ==================== */}
      <section id="cards" className={styles.breakSection}>
        <div className={styles.breakContent}>
          <AnimatedElement>
            <p className={styles.componentLabelCenter}>Component 04</p>
            <h3 className={styles.breakTitle}>Reflection Cards</h3>
            {/* PUBLIC-TONE TBD: "build a self-care practice through emotional
                validation and introductory exercises for emotional regulation"
                is therapy-spec. Consider what the cards do in a staff member's
                hand — what they ask, what they offer, when someone might
                pick one up. */}
            <p className={styles.breakBodyBold}>
              Guided reflection cards that help staff build a self-care practice through emotional validation and introductory exercises for emotional regulation.
            </p>
            <p className={styles.breakBody}>
              By showing healthcare workers that the full spectrum of grief includes complex and contradictory emotions, the cards help create a more holistic culture of care. The combination of emotional identification, validation, and somatic exercises makes this a powerful tool for connection with self and others. Every staff member received their own deck; one set permanently lives in the pod.
            </p>
            <p className={styles.breakBodySecondary}>
              Click any card to flip and explore the exercises on the back.
            </p>
          </AnimatedElement>
          <CardCarousel />
        </div>
      </section>

      {/* ==================== OUTCOMES ==================== */}
      <section id="outcomes" className={`${styles.parallaxSection} ${styles.parallaxReverse} ${styles.parallaxDark}`}>
        <div className={styles.parallaxScroll}>
          {dashboardClips.map((clip, i) => (
            <AnimatedElement key={i}>
              <ScrollVideo src={clip.src} label={clip.label} autoplay blur />
            </AnimatedElement>
          ))}
        </div>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>The Outcomes</h2>
            <p className={styles.stickyBodyLightBold}>
              Groundswell is now officially installed at UPMC Magee-Womens Hospital, launching a 12-month quality improvement study for Cancer Services staff.
            </p>
            {/* PUBLIC-TONE TBD: "data visualization website to track and
                communicate our findings, integrating survey data with video
                documentation" is dense. For public, consider naming what the
                study measures (compassion fatigue, burnout, intent to leave)
                and what the data site is for (so leaders can see what changes
                when staff are cared for). */}
            <p className={styles.stickyBodyLight}>
              The study combines quantitative data with qualitative interviews, measuring compassion fatigue, burnout, culture of employee well-being, and intent to leave—before, during, and after the installation. We built a data visualization website to track and communicate our findings, integrating survey data with video documentation. Data is blurred to protect unpublished study findings.
            </p>
            <blockquote className={styles.outcomesQuote}>
              &ldquo;Caring for people means seeing them as whole, complex, and beautiful human beings—not just as patients in need of medicine or surgery. Healing begins with caring for the caregivers.&rdquo;
            </blockquote>
            <cite className={styles.outcomesQuoteCite}>&mdash; Dr. Sarah Taylor, Gynecologic Oncology, UPMC</cite>
          </div>
        </div>
      </section>

      {/* ==================== IN THE PRESS ==================== */}
      <section id="press" className={styles.breakSection}>
        <div className={styles.breakContent}>
          <AnimatedElement>
            <p className={styles.componentLabelCenter}>Coverage</p>
            <h2 className={styles.breakTitle}>In the Press</h2>
          </AnimatedElement>

          <div className={styles.reflectionPressGrid}>
            <AnimatedElement>
              <div className={styles.reflectionPressCardWrapper}>
                <a
                  href="https://www.design.cmu.edu/news/groundswell-creates-space-soul-co-designing-oncology-staff-upmc-magee-womens-hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reflectionPressCard}
                >
                  <span className={styles.reflectionPressSource}>Carnegie Mellon School of Design</span>
                  <h4 className={styles.reflectionPressTitle}>
                    Groundswell Creates Space for the Soul: Co-designing with Oncology Staff
                  </h4>
                  <span className={styles.reflectionPressLink}>Read Article &rarr;</span>
                </a>
                <span className={styles.reflectionPressFold} aria-hidden="true" />
              </div>
            </AnimatedElement>

            <AnimatedElement>
              <div className={styles.reflectionPressCardWrapper}>
                <a
                  href="https://www.design.cmu.edu/news/concept-care-designing-groundswell-oncology-caregivers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reflectionPressCard}
                >
                  <span className={styles.reflectionPressSource}>Carnegie Mellon School of Design</span>
                  <h4 className={styles.reflectionPressTitle}>
                    Concept to Care: Designing Groundswell for Oncology Caregivers
                  </h4>
                  <span className={styles.reflectionPressLink}>Read Article &rarr;</span>
                </a>
                <span className={styles.reflectionPressFold} aria-hidden="true" />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE ====================
          Horizontal project timeline. Filled dots = past or in progress;
          outlined dots = future. Sits between Press and the case-study
          CTA so the reader gets a quick "where this is" before the
          invitation to read more. */}
      <section id="timeline" className={styles.timelineSection}>
        <div className={styles.timelineSectionInner}>
          <AnimatedElement>
            <p className={styles.componentLabelLight}>Project arc</p>
            <h2 className={styles.timelineSectionTitle}>Timeline</h2>
          </AnimatedElement>

          <AnimatedElement>
            <ol className={styles.timeline} aria-label="Project timeline">
              <li className={`${styles.timelinePhase} ${styles.timelinePhasePast}`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelinePhaseTime}>Jan–May 2025</span>
                <h3 className={styles.timelinePhaseTitle}>Development &amp; research</h3>
              </li>

              <li className={`${styles.timelinePhase} ${styles.timelinePhasePast}`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelinePhaseTime}>Jun–Aug 2025</span>
                <h3 className={styles.timelinePhaseTitle}>Build &amp; installation</h3>
              </li>

              <li className={`${styles.timelinePhase} ${styles.timelinePhasePast}`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelinePhaseTime}>Oct 2025–Jul 2026</span>
                <h3 className={styles.timelinePhaseTitle}>Pilot study with pre/mid/post surveys</h3>
              </li>

              <li className={`${styles.timelinePhase} ${styles.timelinePhaseFuture}`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelinePhaseTime}>Jul–Oct 2026</span>
                <h3 className={styles.timelinePhaseTitle}>Analysis, publication &amp; case study site</h3>
              </li>

              <li className={`${styles.timelinePhase} ${styles.timelinePhaseFuture}`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelinePhaseTime}>2027</span>
                <h3 className={styles.timelinePhaseTitle}>A model for expansion &amp; iteration</h3>
                <p className={styles.timelinePhaseBody}>
                  Improved pod design, stewardship training, and a mobile model for rural clinics and family caregivers.
                </p>
              </li>
            </ol>
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== READ THE CASE STUDY ====================
          Big editorial CTA inviting visitors to read the full design
          process and case study. Replaces the prior #context block.
          Lorin owns voice — placeholders below are structural. */}
      <section id="case-study" className={styles.caseStudyCta}>
        <div className={styles.caseStudyCtaInner}>
          <AnimatedElement>
            <p className={styles.componentLabelCenter}>The full story</p>
            {/* PUBLIC-TONE TBD: title for this CTA section. */}
            <h2 className={styles.caseStudyCtaTitle}>
              Read the case study
            </h2>
            <p className={styles.caseStudyCtaBody}>
              The case study covers the co-design and research with oncology staff, the insights that shaped Groundswell, and the behind-the-scenes of building and installing it.
            </p>
          </AnimatedElement>

          <AnimatedElement>
            <a
              href="/projects/groundswell"
              className={styles.caseStudyCtaButton}
            >
              <span className={styles.caseStudyCtaButtonLabel}>View the full case study</span>
              <span className={styles.caseStudyCtaButtonArrow} aria-hidden="true">&rarr;</span>
            </a>
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== ACKNOWLEDGEMENTS ==================== */}
      <section
        id="acknowledgements"
        className={styles.sectionDark}
        style={{
          paddingTop: 'clamp(112px, 16vh, 192px)',
          paddingBottom: 'clamp(48px, 7vh, 72px)',
        }}
      >
        <div className={styles.sectionContent}>
          <AnimatedElement>
            <p className={styles.componentLabelLight} style={{ textAlign: 'center' }}>In gratitude</p>
            <h2 className={styles.sectionHeadingLightCentered}>Acknowledgements</h2>
            <p className={styles.bodyTextLightCenteredBold}>
              This project is a tribute to the quiet strength, deep compassion, and collective spirit of those who provide oncology care. It was shaped by the voices of staff who shared their experiences—those who live this work every day.
            </p>
            <p className={styles.bodyTextLightCenteredSpaced}>
              Groundswell is a collaboration between Carnegie Mellon University&rsquo;s School of Design, the University of Pittsburgh Schools of Medicine and Nursing, and the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. We are especially grateful to the Department of Obstetrics, Gynecology, and Reproductive Services and the incredible staff at Magee who made this project possible. Funding was provided by College of Fine Arts at CMU; the UPMC Magee-Womens Hospital Medical Staff Fund; and the Paul D. Schurgot Foundation.
            </p>
          </AnimatedElement>

          <AnimatedElement>
            <div className={styles.acknowledgementCardsRow}>
              <div className={styles.acknowledgementCardDark}>
                <h3 className={styles.acknowledgementCardTitleLight}>Leadership</h3>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Kristin Hughes, MFA</strong><br/>
                  Design &middot; Production &middot; Project Lead &middot; Professor &middot; Principal Investigator &middot; CMU
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Sarah E. Taylor, MD, PhD</strong><br/>
                  Principal Investigator &middot; UPMC Hillman Cancer Center
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Grace Campbell, PhD, MSW, RN</strong><br/>
                  Supervising Faculty &middot; Duquesne University
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Heidi Donovan, PhD, RN</strong><br/>
                  Supervising Faculty &middot; University of Pittsburgh School of Nursing
                </p>
              </div>

              <div className={styles.acknowledgementCardDark}>
                <h3 className={styles.acknowledgementCardTitleLight}>Design &amp; Production</h3>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Lorin Anderberg, MA</strong><br/>
                  Design &middot; Development &middot; Research &middot; Production &middot; Project Coordination &middot; Donor Outreach
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Elijah Benzon, MA</strong><br/>
                  Design &middot; Development &middot; Research &middot; Production
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Greg Baltus</strong><br/>
                  Fabrication &middot; Hardware Assembly
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Kelly McDowell</strong><br/>
                  Design &middot; Development &middot; Research
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Robertus Sucahyo, MBA</strong><br/>
                  Development &middot; Research
                </p>
                <p className={styles.acknowledgementCardTextLight}>
                  <strong>Su Hong &amp; Mia Jeong</strong><br/>
                  Research Assistants
                </p>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement>
            <div className={styles.acknowledgementCardDark}>
              <h3 className={styles.acknowledgementCardTitleLight}>Donors &amp; Partners</h3>
              <p className={styles.acknowledgementCardTextLight}>
                <strong>NookPod</strong> donated the restorative pod structure ($13,000 value). <strong>Greg Baltus and Hardware Assembly</strong> provided remarkable design, engineering, and fabrication. <strong>Catherine Liggett and Mark Staley</strong> created custom guided meditations and poetry. <strong>Carolyn Gavin</strong> contributed artwork that became the visual thread unifying all program components. <strong>Ryan Thompson</strong> crafted the walnut tabletop from wood donated by <strong>Eleanor Mackie Pigma</strong>. <strong>Fox Woodworks</strong> provided wood elements.
              </p>
              <p className={styles.acknowledgementCardTextLight}>
                <em>Additional partners and donors: Schlage, Density, Dixie&amp;Grace, Z9 Machinings, EHC Industries, Deborah Linhart, Pamela Meadowcroft, Marge Petruska, Kevin Lorenzi (photography), and Mark Baskinger (creative support and encouragement).</em>
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement>
            <p className={styles.bodyTextLightCenteredItalic}>
              We acknowledge that Groundswell could not have emerged without the deep trust-building between previous cohorts, Professor Kristin Hughes, and the UPMC staff. This version is intended as a first iteration. We hope to have the privilege to continue, improve, and expand based on the study&rsquo;s findings.
            </p>
            <p className={styles.bodyTextLightCenteredItalic}>
              Our poem was inspired by Joy Harjo&rsquo;s work &ldquo;Remember.&rdquo;
            </p>
            <p className={styles.bodyTextLightCenteredItalic}>
              To everyone who played a role in bringing this project to life—thank you.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Page break symbol — quiet visual punctuation between the
          credits and the final invitation. */}
      <div className={styles.pageBreakSymbol} aria-hidden="true">
        <img
          src="https://res.cloudinary.com/dc17mvdyv/image/upload/v1778077875/CTB-Page_Break_Symbol_SVG.svg"
          alt=""
        />
      </div>

      {/* ==================== GET IN TOUCH ====================
          Final invitation — sits at the very bottom of the page so the
          last thing the visitor sees is the door open to them. */}
      <section
        id="whats-next"
        className={styles.sectionDark}
        style={{ paddingTop: 'clamp(48px, 7vh, 72px)' }}
      >
        <div className={styles.sectionContent}>
          <AnimatedElement>
            <h2 className={styles.sectionHeadingLightCentered}>Get in touch</h2>
            <p className={styles.bodyTextLightCenteredBold}>
              Want to learn more or support the work?
              <br />
              We&rsquo;d love to hear from you.
            </p>
          </AnimatedElement>

          {/* Button rendered without AnimatedElement wrapper — sits at the
              very bottom of the page where the IntersectionObserver's
              -100px bottom rootMargin can fail to trigger and leave it
              stuck at opacity 0. The button must always be visible. */}
          <div className={styles.reachOut}>
            <a
              href="mailto:lorinanderberg1@gmail.com"
              className={styles.reachOutButton}
            >
              <span className={styles.reachOutButtonLabel}>Reach out</span>
              <span className={styles.reachOutButtonArrow} aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
