'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/project.module.css'
import CardCarousel from '@/components/CardCarousel'
import ScrollVideo from '@/components/ScrollVideo'
import AnimatedElement from '@/components/AnimatedElement'
import ProgressNav from '@/components/ProgressNav'
import Lightbox from '@/components/Lightbox'
import Squiggle from '@/components/Squiggle'


// ============================================
// DATA
// ============================================

/**
 * Maps every page section ID to its nav label.
 * Multiple section IDs can share a label (e.g. all component sections → "The Work").
 */
const sectionLabels = {
  'hero': 'Intro',
  'vision': 'Vision',
  'ecosystem': 'The Ecosystem',
  'ctb': 'The Ecosystem',
  'pod': 'The Ecosystem',
  'cards': 'The Ecosystem',
  'artwall': 'The Ecosystem',
  'outcomes': 'Outcomes',
  'context': 'Context',
  'research': 'What We Heard',
  'workshops': 'Workshops',
  'synthesis': 'Synthesis',
  'the-void': 'Synthesis',
  'making': 'Making',
  'playtesting': 'Play Testing',
  'reflection': 'Reflection',
  'acknowledgements': 'Credits',
}

/** Sections that use dark backgrounds — progress nav switches to light text */
const darkSections = ['hero', 'vision', 'ctb', 'artwall', 'outcomes', 'research', 'synthesis', 'making', 'playtest-feedback', 'acknowledgements']
/** Interview quotes from fieldwork — displayed in Research scroll column */
const researchQuotes = [
  {
     quote: "A special person can do this work forever, a good person can do it for a little while, most people couldn\u2019t do it for a day.",
      context: "The system is held together by invisible labor of its staff, a finite resource that is systematically undervalued."
  },
  {
    quote: "I feel trapped.",
    context: "There is no way out. If I leave my patients I will feel guilty. If I leave my workers in this mess I will feel guilty. When someone leaves, people are jealous of them for getting out."
  },
  {
    quote: "What mental health?",
    context: "There are zero benefits for staff mental health. Hardly anyone uses the EAP. I would use a meditation app if it was provided."
  },
  {
    quote: "There is no time to grieve.",
    context: "Once someone passes there is no time to grieve the loss before another person comes in. We are trying to find ways to share but nothing is really working."
  },
  {
    quote: "I was not prepared for this.",
    context: "No one officially trained me on the emotional trauma that this job causes. I'm doing the work of a therapist and social worker, losing people daily."
  },
  {
    quote: "I can't turn it off.",
    context: "Even on my days off, I keep checking Teams to stay updated. I worry about my patients when I am at home. I am so exhausted."
  },
]

/** Play testing quotes — displayed in Play Testing section */
const playtestingQuotes = [
  "It's remarkable what 10 minutes can do...",
  "As soon as I stepped inside, I almost teared up. You're not always aware of how frazzled you are until you stop.",
  "Being able to stop in the middle of the day and have the physical and mental space to get quiet and meditate is really helpful—much better than a bathroom stall.",
  "You don't have to wait until the end of the day to refresh, but you can have micro-resets in-between.",
  "I've worked in the trauma field, and I work with physicians—everyone needs one of these.",
]


/** Dashboard screen recordings — displayed in Outcomes scroll column */
const dashboardClips = [
  { src: '/video/groundswell/entrypage.mp4', label: 'Entry Screen' },
  { src: '/video/groundswell/moduleview.mp4', label: 'Data Module', blur: true },
  { src: '/video/groundswell/popup.mp4', label: 'Click-through Overlay', blur: true },
  { src: '/video/groundswell/chartview.mp4', label: 'Chart View', blur: true },
  { src: '/video/groundswell/displayview.mp4', label: 'Display View', blur: true },
  { src: '/video/groundswell/admin.mp4', label: 'Admin Page', blur: true },
]

/** Pod audio resources */
const audioTracks = [
  {
    type: 'Poem',
    title: '\u201CRemember Your Heart\u201D',
    artist: 'Read by Catherine Liggett',
    src: '/audio/groundswell/gs-poem-remember.mp3',
  },
  {
    type: 'Guided Meditation',
    title: '\u201CComing Home to Yourself\u201D',
    artist: 'By Catherine Liggett',
    src: '/audio/groundswell/gs-meditation-home.mp3',
  },
]


// ============================================
// COMPONENTS
// ============================================

/**
 * AudioPlayer — Compact player for pod audio resources.
 */
function AudioPlayer({ track }) {
  return (
    <div className={styles.audioPlayerCompact}>
      <div className={styles.audioHeaderCompact}>
        <span className={styles.audioType}>{track.type}</span>
        <span className={styles.audioTitle}>{track.title}</span>
      </div>
      <audio controls className={styles.audioElementCompact}>
        <source src={track.src} type="audio/mpeg" />
      </audio>
    </div>
  )
}


// ============================================
// MAIN COMPONENT
// ============================================

/* ── DiagramTabs ── */
function DiagramTabs() {
  const [activeTab, setActiveTab] = useState('ecosystem')

  const tabs = [
    { id: 'ecosystem', label: 'System Map' },
    { id: 'values', label: 'Core Values' },
  ]

  return (
    <div className={styles.diagramTabs}>
      <div className={styles.diagramTabContent}>
        <div
          className={styles.diagramTabPanel}
          style={{ opacity: activeTab === 'ecosystem' ? 1 : 0, position: activeTab === 'ecosystem' ? 'relative' : 'absolute' }}
        >
          <img
            src="/images/groundswell/gs-ecosystem-diagram-purple.svg"
            alt="Ecosystem flow diagram showing how CTB Email, Pod, Garden Art Wall, and Reflection Cards connect to moments like arriving at work, taking a break, patient loss, hard moments, and one-on-one meetings"
            className={styles.diagramImageLarge}
          />
        </div>
        <div
          className={styles.diagramTabPanel}
          style={{ opacity: activeTab === 'values' ? 1 : 0, position: activeTab === 'values' ? 'relative' : 'absolute' }}
        >
          <img
            src="/images/groundswell/gs-values-diagram.svg"
            alt="Groundswell core values: Humanity, Together, Normalcy, and Compassion forming a continuous cycle"
            className={styles.diagramImageLarge}
          />
        </div>
      </div>
      <div className={styles.diagramTabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.diagramTabButton} ${activeTab === tab.id ? styles.diagramTabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function WorkshopCarousel() {
  const [current, setCurrent] = useState(1)
  const [lightboxImg, setLightboxImg] = useState(null)

  const workshops = [
    {
      label: 'Coloring Culture',
      title: 'Nourishing the Flower',
      body: (
        <>
          Using the anatomy of a flower as a metaphor for workplace health, participants mapped their experiences onto two worksheets&mdash;one flourishing, one wilting. The exercise surfaced what sustains people alongside what quietly erodes them. The session ended with the group voting on what resonated most.
        </>
      ),
      quotes: [
        "Positive atmosphere, positive energy. Team player. Support one another.",
      ],
      images: [
        { src: '/images/groundswell/gs-workshop-flower-01.jpg', alt: 'Nourishing the Flower activity worksheets' },
        { src: '/images/groundswell/gs-workshop-flower-02.jpg', alt: 'Staff completing flower activity' },
      ],
    },
    {
      label: 'Participatory Poster',
      title: 'Women in White Coats',
      body: (
        <>
          We partnered with{' '}
          <a href="https://cancerbridges.org/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
            CancerBridges
          </a>
          {' '}to honor women in cancer care. Each participant received a hand-made orchid pin with a removable &ldquo;leaf&rdquo; they could add to a shared poster answering: <em>How has your approach to patient care evolved to help you balance compassion with self-care?</em>
        </>
      ),
      quotes: [
        "Self-care to me is gifting time. 'Me' time, 'she' time, and 'we' time.",
      ],
      images: [
        { src: '/images/groundswell/gs-workshop-coats-01.jpg', alt: 'Women in White Coats event honoring women in cancer care' },
        { src: '/images/groundswell/gs-workshop-coats-03.jpg', alt: 'Research poster with participant responses' },
      ],
    },
    {
      label: 'Grief Scenarios',
      title: 'Grief Workshop',
      body: (
        <>
          We created a container for vulnerability&mdash;using a soft stuffed animal as a &ldquo;puppet&rdquo; to abstract the topic of grief. Staff were given scenarios and asked what they could do or say to support their colleague. The session ended with the group voting on what resonated most.
        </>
      ),
      quotes: [
        "A manager or team member asking, what can I do to help? I\u2019ve got you covered.",
      ],
      images: [
        { src: '/images/groundswell/gs-workshop-grief-01.jpg', alt: 'Grief workshop with trauma-informed facilitation' },
        { src: '/images/groundswell/gs-workshop-grief-02.jpg', alt: 'Staff engaging with scenario-based discussion' },
      ],
    },
  ]

  const goNext = () => setCurrent((p) => Math.min(p + 1, workshops.length - 1))
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0))

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  const getPosition = (index) => {
    const diff = index - current
    if (diff === 0)  return { left: '50%', scale: 1,    opacity: 1,    z: 3 }
    if (diff === -1) return { left: '16%', scale: 0.88, opacity: 0.65, z: 2 }
    if (diff === 1)  return { left: '84%', scale: 0.88, opacity: 0.65, z: 2 }
    if (diff === -2) return { left: '4%',  scale: 0.76, opacity: 0.3,  z: 1 }
    if (diff === 2)  return { left: '96%', scale: 0.76, opacity: 0.3,  z: 1 }
    return { left: '50%', scale: 0.7, opacity: 0, z: 0 }
  }

  return (
    <div
      className={styles.workshopCarouselContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Workshop activities carousel"
    >
      <div className={styles.workshopCarouselTrack}>
        {workshops.map((ws, i) => {
          const pos = getPosition(i)
          return (
            <div
              key={i}
              className={styles.workshopCarouselSlot}
              style={{
                left: pos.left,
                transform: `translateX(-50%) scale(${pos.scale})`,
                opacity: pos.opacity,
                zIndex: pos.z,
                cursor: i === current ? 'default' : 'pointer',
              }}
              onClick={() => i !== current && setCurrent(i)}
            >
              <div className={styles.workshopCarouselCard}>
                <span className={styles.workshopLabel}>{ws.label}</span>
                <h3 className={styles.workshopTitle}>{ws.title}</h3>
                <p className={styles.workshopBody}>{ws.body}</p>
                <div className={styles.workshopQuotes}>
                  {ws.quotes.map((q, qi) => (
                    <blockquote key={qi} className={styles.workshopQuote}>
                      &ldquo;{q}&rdquo;
                    </blockquote>
                  ))}
                </div>
                <div className={styles.workshopImageGrid}>
                  {ws.images.map((img, ii) => (
                    <div key={ii} className={styles.workshopImage} onClick={(e) => { e.stopPropagation(); setLightboxImg(img) }} style={{ cursor: 'zoom-in' }}>
                    <img src={img.src} alt={img.alt} />
                  </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.workshopCarouselControls}>
        <button
          onClick={goPrev}
          className={styles.workshopCarouselArrow}
          disabled={current === 0}
          aria-label="Previous workshop"
        >
          &#8592;
        </button>
        <div className={styles.workshopCarouselInfo}>
          <span className={styles.workshopCarouselInstruction}>
            Click side cards to navigate
          </span>
          <span className={styles.workshopCarouselCounter}>
            {current + 1} of {workshops.length}
          </span>
        </div>
        <button
          onClick={goNext}
          className={styles.workshopCarouselArrow}
          disabled={current === workshops.length - 1}
          aria-label="Next workshop"
        >
          &#8594;
        </button>
      </div>

      <div className={styles.workshopCarouselDots}>
        {workshops.map((_, i) => (
          <button
            key={i}
            className={`${styles.workshopCarouselDot} ${i === current ? styles.workshopCarouselDotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to workshop ${i + 1}`}
          />
        ))}
      </div>

      {lightboxImg && (
        <Lightbox
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          onClose={() => setLightboxImg(null)}
        />
      )}
  </div>
  )
}

function PlaytestCarousel() {
  const [current, setCurrent] = useState(1)

  const iterations = [
    {
      label: 'Accessibility',
      problem: 'Participants with larger bodies reported discomfort with table positioning, limiting their ability to rest comfortably.',
      quote: "Uncomfortable for larger people. I wished to rest my head on the table but couldn't get comfortable. The biggest thing was getting comfortable.",
      solution: 'We sawed 2 inches from the table depth to accommodate a wider range of body sizes and postures.',
    },
    {
      label: 'Wayfinding',
      problem: 'Multiple participants expressed confusion about where to start, creating anxiety that undermined the calming intent.',
      quote: "Not sure what to do first. I was worried about doing something wrong—eventually I let go of that, but it took time.",
      solution: 'We added clear step-by-step instructions, making the digital library the explicit first step to set intention.',
    },
    {
      label: 'Entry Ritual',
      problem: 'Participants who started with music reported significantly deeper engagement with other pod activities.',
      quote: "The music was wonderful—it really set the tone and helped me settle in. I was able to engage with everything else more deeply after that.",
      solution: 'We repositioned the table centerpiece to center and ensured music exploration was the first instruction step.',
    },
  ]

  const goNext = () => setCurrent((p) => Math.min(p + 1, iterations.length - 1))
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0))

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  const getPosition = (index) => {
    const diff = index - current
    if (diff === 0)  return { left: '50%', scale: 1,    opacity: 1,    z: 3 }
    if (diff === -1) return { left: '16%', scale: 0.88, opacity: 0.65, z: 2 }
    if (diff === 1)  return { left: '84%', scale: 0.88, opacity: 0.65, z: 2 }
    if (diff === -2) return { left: '4%',  scale: 0.76, opacity: 0.3,  z: 1 }
    if (diff === 2)  return { left: '96%', scale: 0.76, opacity: 0.3,  z: 1 }
    return { left: '50%', scale: 0.7, opacity: 0, z: 0 }
  }

  return (
    <div
      className={styles.playtestCarouselContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Play testing iterations carousel"
    >
      <div className={styles.playtestCarouselTrack}>
        {iterations.map((item, i) => {
          const pos = getPosition(i)
          return (
            <div
              key={i}
              className={styles.playtestCarouselSlot}
              style={{
                left: pos.left,
                transform: `translateX(-50%) scale(${pos.scale})`,
                opacity: pos.opacity,
                zIndex: pos.z,
                cursor: i === current ? 'default' : 'pointer',
              }}
              onClick={() => i !== current && setCurrent(i)}
            >
              <div className={styles.playtestCarouselCard}>
                <span className={styles.playtestLabel}>{item.label}</span>
                <p className={styles.playtestProblem}>{item.problem}</p>
                <blockquote className={styles.playtestQuote}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className={styles.playtestSolution}>
                  <span className={styles.playtestArrow}>&rarr;</span>
                  <p>{item.solution}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.playtestCarouselControls}>
        <button
          onClick={goPrev}
          className={styles.playtestCarouselArrow}
          disabled={current === 0}
          aria-label="Previous iteration"
        >
          &#8592;
        </button>
        <div className={styles.playtestCarouselInfo}>
          <span className={styles.playtestCarouselCounter}>
            {current + 1} of {iterations.length}
          </span>
        </div>
        <button
          onClick={goNext}
          className={styles.playtestCarouselArrow}
          disabled={current === iterations.length - 1}
          aria-label="Next iteration"
        >
          &#8594;
        </button>
      </div>

      <div className={styles.playtestCarouselDots}>
        {iterations.map((_, i) => (
          <button
            key={i}
            className={`${styles.playtestCarouselDot} ${i === current ? styles.playtestCarouselDotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to iteration ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function GroundswellContent() {
  const [currentSectionId, setCurrentSectionId] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Derived nav state
  const isDarkSection = darkSections.includes(currentSectionId)
  const showNav = scrollProgress > 3

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Scroll progress tracking
  useEffect(() => {
    if (!isMounted) return
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  // Section tracking via IntersectionObserver
  useEffect(() => {
    if (!isMounted) return
    const ids = Object.keys(sectionLabels)
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

      {/* ==================== 1. HERO ==================== */}
      <section id="hero" className={styles.chapterHero}>
        <div className={styles.heroImageContainer}>
          <img
            src="/images/groundswell/gs-hero.jpg"
            alt="Groundswell installation at UPMC Magee-Womens Hospital"
            className={styles.heroImageFull}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroDescriptor}>A Design Ecology for Staff Well-Being</p>
          <h1 className={styles.heroTitleCream}>Groundswell</h1>
          <p className={styles.heroSubtitle}>Making Space to Restore, Together</p>
          <div className={styles.heroTags}>
            <span className={styles.heroTag}>Co-Production</span>
            <span className={styles.heroTag}>Healthcare</span>
            <span className={styles.heroTag}>Co-Design</span>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ==================== PROJECT INFO STRIP ==================== */}
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
            <span className={styles.projectInfoLabel}>Role</span>
            <span className={styles.projectInfoValue}>Research, Co-Design, Copywriting, Project Coordination, Donor Outreach</span>
          </div>
          <div className={styles.projectInfoItem}>
            <span className={styles.projectInfoLabel}>Team</span>
            <span className={styles.projectInfoValue}>Kristin Hughes, Elijah Benzon, Kelly McDowell, Robertus Sucahyo, Greg Baltus</span>
          </div>
        </div>
      </section>

      {/* ==================== 2. THE VISION ==================== */}
      <section id="vision" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>The Vision</h2>
            <p className={styles.stickyBodyLightBold}>
              Groundswell is a grant-funded ecosystem of emotional support for healthcare workers, developed with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital.
            </p>
            <p className={styles.stickyBodyLight}>
              Through communication, creativity, and connection, Groundswell fosters a culture where the emotional complexities of oncology care are acknowledged, isolation transforms into belonging, and self-care is honored as essential to delivering excellent patient care.
            </p>
            <blockquote className={styles.outcomesQuote}>
              &ldquo;Groundswell reminds us that caring for patients begins with caring for the people who serve them. By creating intentional spaces and practices that acknowledge the emotional realities of oncology care, we're laying the foundation for a culture where staff well-being is recognized as essential.&rdquo;
            </blockquote>
            <cite className={styles.outcomesQuoteCite}>&mdash; Samantha Williams, Director of Women's Cancer Services, UPMC</cite>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <ScrollVideo src="/video/groundswell/gs-walkthrough-video.mp4" label="Installation Walkthrough" />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== 3. THE ECOSYSTEM ==================== */}
      <section id="ecosystem" className={styles.breakSection}>
        <div className={styles.breakContent}>
          <AnimatedElement>
            <h2 className={styles.breakTitle}>The Ecosystem</h2>
            <p className={styles.breakBody}>
              <em>Named for water that rises naturally from deep within the earth, Groundswell emerges directly from the efforts and voices of healthcare workers themselves.</em>
            </p>
            <p className={styles.breakBody}>
              The ecosystem comprises four interconnected components&mdash;each addressing a different dimension of workplace well-being, designed to meet staff wherever they are in their day. Together, they create the conditions for culture change to emerge from within the care community.
            </p>
          </AnimatedElement>
          <AnimatedElement>
            <DiagramTabs />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== 4a. CTB EMAIL ==================== */}
      <section id="ctb" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
        <div className={styles.stickyContentLight}>
    <p className={styles.componentLabelLight}>Component 01</p>
    <h3 className={styles.stickyTitleLight}>Ceased to Breathe Email</h3>
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
    <img src="/images/groundswell/gs-ctb-detail-01.jpg" alt="CTB email context and development" className={styles.scrollImage} />
  </AnimatedElement>
  <AnimatedElement>
    <img src="/images/groundswell/gs-ctb-email.jpg" alt="Redesigned Ceased to Breathe email template" className={styles.scrollImage} />
  </AnimatedElement>
  <AnimatedElement>
    <img src="/images/groundswell/gs-ctb-detail-02.jpg" alt="CTB email detail showing compassionate language" className={styles.scrollImage} />
  </AnimatedElement>
</div>
      </section>

      {/* ==================== 4b. RESTORATIVE POD ==================== */}
      <section id="pod" className={`${styles.parallaxSection} ${styles.parallaxReverse}`}>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src="/images/groundswell/gs-pod.jpg" alt="Groundswell Restorative Pod" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-pod-detail-01.jpg" alt="Pod interior with soft LED lighting" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-pod-detail-02.jpg" alt="Pod poem and invitation to set down what you carry" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-pod-detail-03.jpg" alt="Pod meditation resources and finger labyrinth" className={styles.scrollImage} />
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
                  <source src="/video/groundswell/gs-qr-library.mp4" type="video/mp4" />
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

      {/* ==================== 4c. COMMUNITY ART WALL ==================== */}
      <section id="artwall" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
 <div className={styles.stickyContentLight}>
    <p className={styles.componentLabelLight}>Component 03</p>
    <h3 className={styles.stickyTitleLight}>Community Art Wall</h3>
    <p className={styles.stickyBodyLightBold}>
              A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences.
            </p>
            <p className={styles.stickyBodyLight}>
              We intentionally included family caregivers and patients because we saw how important it was for staff to hear from them—especially gratitude, as almost every desk was decorated with cards from patients and families. Staff reported discomfort expressing feelings due to fear of retaliation. We built this as an anonymous place to safely share and understand what others are feeling—giving public, collective voice to the cancer care community.
            </p>
            <blockquote className={styles.outcomesQuote}>
              &ldquo;Groundswell is not just a campaign—it's a commitment. By centering staff-identified well-being priorities, we're ensuring that every voice is heard and concerns are addressed.&rdquo;
            </blockquote>
            <cite className={styles.outcomesQuoteCite}>&mdash; Kendyl Grant, Director of Operations for the Gynecologic Oncology Division, UPMC</cite>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src="/images/groundswell/gs-artwall.jpg" alt="Groundswell Community Art Wall" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-artwall-detail-01.jpg" alt="Art wall contributions from staff" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-artwall-detail-02.jpg" alt="Art wall community expressions" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-artwall-detail-03.jpg" alt="Art wall collective voice" className={styles.scrollImage} />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== 4d. REFLECTION CARDS ==================== */}
      <section id="cards" className={styles.breakSection}>
        <div className={styles.breakContent}>
          <AnimatedElement>
             <p className={styles.componentLabelCenter}>Component 04</p>
      <h3 className={styles.breakTitle}>Reflection Cards</h3>
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
          <CardCarousel imagePath="/images/groundswell/gs-card-" />
        </div>
      </section>

      {/* ==================== 6. THE OUTCOMES ==================== */}
      <section id="outcomes" className={`${styles.parallaxSection} ${styles.parallaxReverse} ${styles.parallaxDark}`}>
        <div className={styles.parallaxScroll}>
          {dashboardClips.map((clip, i) => (
            <AnimatedElement key={i}>
              <ScrollVideo src={clip.src} label={clip.label} autoplay blur={clip.blur} />
            </AnimatedElement>
          ))}
        </div>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>The Outcomes</h2>

            <p className={styles.stickyBodyLightBold}>
              Groundswell is now officially installed at UPMC Magee-Womens Hospital, launching a 12-month quality improvement study for Cancer Services staff.
            </p>

            <p className={styles.stickyBodyLight}>
              The study combines quantitative data with qualitative interviews, measuring compassion fatigue, burnout, culture of employee well-being, and intent to leave—before, during, and after the installation. I taught myself how to vibecode with Claude AI to create a data visualization website of our findings. It is created in Visual Studio Code, published to Vercel, using NEON database, and integrating YouTube API. Data is blurred to protect unpublished study findings.
            </p>

            {/* Quote - Dr. Taylor */}
            <blockquote className={styles.outcomesQuote}>
              &ldquo;Caring for people means seeing them as whole, complex, and beautiful human beings—not just as patients in need of medicine or surgery. Healing begins with caring for the caregivers.&rdquo;
            </blockquote>
            <cite className={styles.outcomesQuoteCite}>&mdash; Dr. Sarah Taylor, Gynecologic Oncology, UPMC</cite>
          </div>
        </div>
      </section>

      {/* ==================== 7. THE CONTEXT ==================== */}
       <section id="context" className={styles.parallaxSection}>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContent}>
            <h2 className={styles.stickyTitle}>The Context</h2>
            <p className={styles.stickyBodyBold}>
              How might we create supportive environments where staff can feel nurtured, recognized, and celebrated?
            </p>
            <p className={styles.stickyBody}>
              Healthcare workers face a dual burden: the inherently compassionate nature of their work—constant exposure to grief, loss, and trauma—combined with excessive administrative tasks that disconnect them from their original purpose of patient care.
            </p>
            <p className={styles.stickyBody}>
              We learned about the phenomenon of{' '}
              <a href="https://pubmed.ncbi.nlm.nih.gov/7600555/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                &ldquo;chronic compounded grief&rdquo;
              </a>
              {' '}among oncology nurses, and how repeated exposure to loss accumulates over time when not properly processed. Over 1 in 5 healthcare workers in the U.S. have experienced{' '}
              <a href="https://ndpanalytics.com/wp-content/uploads/HCW-Shortage-Final-Mar-2023.pdf" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                PTSD
              </a>
              .{' '}
              <a href="https://www.emergencyphysicians.org/article/mental-health/poll-workplace-stigma-fear-of-professional-consequences-prevent-emergency-physicians-from-seeking-mental-health-care" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                73% of emergency physicians report stigma around mental health treatment
              </a>
              {' '}in their workplace, with 27% avoiding treatment entirely due to fear of professional consequences.
            </p>
            <blockquote className={styles.stickyStatement}>
              This is not an individual failure.<br />It is a systemic one.
            </blockquote>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src="/images/groundswell/gs-install-upmc.jpg" alt="Groundswell installation at UPMC" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-context-01.jpg" alt="Research at UPMC Magee-Womens Hospital" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-context-02.jpg" alt="Engaging with healthcare workers" className={styles.scrollImage} />
          </AnimatedElement>
           <AnimatedElement>
            <img src="/images/groundswell/gs-context-03.jpg" alt="Rehearsing Research Activities" className={styles.scrollImage} />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== 8. THE RESEARCH ==================== */}
      <section id="research" className={`${styles.parallaxSection} ${styles.parallaxReverse} ${styles.parallaxDark}`}>
        <div className={styles.parallaxScroll}>
          {/* Interview voice cards */}
          {researchQuotes.map((voice, i) => (
            <AnimatedElement key={`voice-${i}`}>
              <div className={styles.voiceCard}>
                <blockquote className={styles.voiceQuote}>&ldquo;{voice.quote}&rdquo;</blockquote>
                <p className={styles.voiceContext}>{voice.context}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>What We Heard</h2>
        <p className={styles.stickyBodyLightBold}>
            Over 15 weeks embedded with oncology staff, we listened&mdash;in hallways, at nursing stations, and in quiet moments between shifts.
        </p>
        <p className={styles.stickyBodyLight}>
  We conducted contextual interviews while shadowing nurses across multiple occasions, observing the windowless environment, the cramped desks, the constant interruptions. We also held an in-depth interview with a former employee who could speak freely about the culture without fear of professional consequences.
        </p>
        <p className={styles.stickyBodyLight}>
          We sat with people and heard stories of skipping meals, saving tears for the car ride home, and feeling unprepared for the emotional load. We also heard about moments of support, bonding, and staff-funded morale events that inspired us to amplify what was already working.
        </p>
          </div>
        </div>
      </section>

{/* ==================== THE WORKSHOPS ==================== */}
     <section id="workshops" className={styles.workshopsSection}>
        <div className={styles.workshopsHeader}>
          <AnimatedElement>
            <p className={styles.componentLabelCenter}>Participatory Research</p>
            <h2 className={styles.breakTitle}>The Workshops</h2>
            <p className={styles.breakBody}>
              Three participatory activities designed to meet staff where they are&mdash;each one building trust, creating space for vulnerability, and honoring the expertise of those doing the work.
            </p>
          </AnimatedElement>
        </div>
        <WorkshopCarousel />
      </section>


      {/* ==================== 9. THE SYNTHESIS ==================== */}
      <section id="synthesis" className={`${styles.parallaxSection} ${styles.parallaxDark}`}>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>The Synthesis</h2>
            <p className={styles.stickyBodyLightBold}>
              We organized our observations and quotes through affinity mapping and a tetrahedron analysis across four dimensions: recognition, environment, culture, and systemic.
            </p>
            <p className={styles.stickyBodyLight}>
              The synthesis revealed a deeper structural tension: healthcare workers face a <strong>dual burden</strong>&mdash;emotional exhaustion from the inherently compassionate nature of their work (constant exposure to grief, loss, and trauma) alongside excessive administrative tasks that disconnect them from their original purpose of patient care.
            </p>
            <div className={styles.synthesisDimensionsGrid}>
              <div className={styles.synthesisDimensionRow}>
                <div className={styles.synthesisDimensionTitle}>Recognition</div>
                <div className={styles.synthesisDimensionContext}>feeling appreciated</div>
              </div>
              <div className={styles.synthesisDimensionRow}>
                <div className={styles.synthesisDimensionTitle}>Environment</div>
                <div className={styles.synthesisDimensionContext}>workspace quality and wellbeing resources</div>
              </div>
              <div className={styles.synthesisDimensionRow}>
                <div className={styles.synthesisDimensionTitle}>Culture</div>
                <div className={styles.synthesisDimensionContext}>positive team dynamics and workplace norms</div>
              </div>
              <div className={styles.synthesisDimensionRow}>
                <div className={styles.synthesisDimensionTitle}>Systemic</div>
                <div className={styles.synthesisDimensionContext}>institutional constraints beyond individual control</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src="/images/groundswell/gs-sense-affinity-01.jpg" alt="Affinity mapping session" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-sense-affinity-02.jpg" alt="Research synthesis and pattern identification" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-sense-affinity-03.jpg" alt="Identifying interconnected forces" className={styles.scrollImage} />
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== 9b. THE VOID ==================== */}
      <section id="the-void" className={styles.breakSection}>
        <div className={styles.breakContent}>
          <AnimatedElement>
            <h2 className={styles.breakTitle}>The Void</h2>
            <p className={styles.breakBody}>
              While patient-centered care aims to improve health outcomes, <strong>it often neglects the well-being of healthcare workers</strong>. In a profit-driven, hierarchical system that treats staff as disposable, the intense focus on patients comes at the cost of worker support, leading to burnout, poor recognition, and a toxic workplace culture. This imbalance ultimately undermines the quality of care for both patients and providers, highlighting the <strong>urgent need for a model that values healthcare workers as essential to sustainable, high-quality care</strong>.
            </p>
          </AnimatedElement>
          <AnimatedElement>
            <a
              href="https://www.figma.com/design/qmXOejgmdOtExNJVkXRvT8/Groundswell-Synthesis?node-id=0-1&t=OHmK0R38j59hR2VI-1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.voidDiagramLink}
              aria-label="View interactive synthesis diagram in Figma (opens in new tab)"
            >
              <img
                src="/images/groundswell/Synthesis-diagram.jpg"
                alt="Synthesis diagram mapping Recognition, Environment, Culture, and Systemic Issues with The Void at center"
                className={styles.voidDiagramImage}
              />
            </a>
            <p className={styles.voidDiagramCaptionDark}>View interactive diagram in Figma</p>
          </AnimatedElement>
        </div>
      </section>

      {/* ==================== 10. THE MAKING ==================== */}
      <section id="making" className={`${styles.parallaxSection} ${styles.parallaxReverse} ${styles.parallaxDark}`}>
        <div className={styles.parallaxScroll}>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-prototype-01.jpeg" alt="Early lo-fi pod prototype exploring spatial concepts" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-mockup-01.jpg" alt="Design mockup and concept visualization" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-figma-01.jpg" alt="Figma design boards with sketches and planning" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-build-01.jpg" alt="Greg Baltus beginning pod fabrication" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-build-02.jpg" alt="Construction process and assembly" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-build-04.jpg" alt="Pod customization in progress" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-build-05.jpg" alt="Final fabrication details" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-facade.jpg" alt="Acrylic facade with LED signaling system installed" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-install-01.jpg" alt="Installation day at UPMC Magee-Womens Hospital" className={styles.scrollImage} />
          </AnimatedElement>
          <AnimatedElement>
            <img src="/images/groundswell/gs-making-install-02.jpg" alt="Final installed pod in hospital setting" className={styles.scrollImage} />
          </AnimatedElement>
        </div>

        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>The Making</h2>
            <p className={styles.stickyBodyLightBold}>
              This was my first design production experience&mdash;a 10-week sprint to turn concept into installation. Working hybrid between remote coordination and on-site collaboration, I managed donor outreach, copywriting, and strategic partnerships that secured approximately $30,000 worth of donated materials and services.
            </p>
            <p className={styles.stickyBodyLight}>
              The project required constant adaptation. Early staff feedback shifted our language from &ldquo;grief&rdquo; to &ldquo;restoration,&rdquo; reframing the messaging. Halfway through production, hospital administration required lockable doors on the pod. Our solution provided engagement, privacy, and emotional safety without surveillance&mdash;turning a constraint into an asset.
            </p>
            <div className={styles.makingTimelineGrid}>
              <div className={styles.makingTimelineRow}>
                <div className={styles.makingTimelineLeft}>
                  <div className={styles.makingTimelineTitle}>Pre-Production</div>
                  <div className={styles.makingTimelineTime}>2 weeks</div>
                </div>
                <div className={styles.makingTimelineContext}>concept revision, project timeline, early sketches</div>
              </div>
              <div className={styles.makingTimelineRow}>
                <div className={styles.makingTimelineLeft}>
                  <div className={styles.makingTimelineTitle}>concept Revisions</div>
                  <div className={styles.makingTimelineTime}>2 weeks</div>
                </div>
                <div className={styles.makingTimelineContext}>Content feedback, donation outreach, presentation</div>
              </div>
              <div className={styles.makingTimelineRow}>
                <div className={styles.makingTimelineLeft}>
                  <div className={styles.makingTimelineTitle}>Design</div>
                  <div className={styles.makingTimelineTime}>4 weeks</div>
                </div>
                <div className={styles.makingTimelineContext}>graphic design, vendor coordination, prototypes</div>
              </div>
              <div className={styles.makingTimelineRow}>
                <div className={styles.makingTimelineLeft}>
                  <div className={styles.makingTimelineTitle}>Fabrication</div>
                  <div className={styles.makingTimelineTime}>4 weeks</div>
                </div>
                <div className={styles.makingTimelineContext}>Pod design and assembly, play testing, install</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 10b. PLAY TESTING ==================== */}
      <section id="playtesting" className={styles.breakSection}>
        <div className={styles.breakContent}>

          {/* Intro */}
          <AnimatedElement>
            <h2 className={styles.breakTitle}>Play Testing</h2>
            <p className={styles.breakBody}>
              We invited 30 participants to test the pod experience before hospital installation. Through structured feedback sessions, we identified three critical areas for improvement and iterated rapidly to ensure the design met real user needs.
            </p>
          </AnimatedElement>

          {/* Play Testing Photo */}
          <AnimatedElement>
            <img
              src="/images/groundswell/gs-playtest-01.jpg"
              alt="Play testing setup with participant feedback session"
              className={styles.playtestHeroImage}
            />
          </AnimatedElement>

          {/* Iteration Carousel */}
          <PlaytestCarousel />

        </div>
      </section>

      {/* ==================== 10c. WHAT PARTICIPANTS SAID ==================== */}
      <section id="playtest-feedback" className={`${styles.parallaxSection} ${styles.parallaxReverse} ${styles.parallaxDark}`}>
        <div className={styles.parallaxScroll}>
          {playtestingQuotes.map((quote, i) => (
            <AnimatedElement key={`playtest-quote-${i}`}>
              <div className={styles.voiceCard}>
                <blockquote className={styles.voiceQuote}>&ldquo;{quote}&rdquo;</blockquote>
              </div>
            </AnimatedElement>
          ))}
        </div>
        <div className={styles.parallaxSticky}>
          <div className={styles.stickyContentLight}>
            <h2 className={styles.stickyTitleLight}>What We Heard</h2>
            <p className={styles.stickyBodyLight}>
              After implementing these changes, participants reported overwhelmingly positive experiences. The space offered emotional transformation, support, and privacy. Play testers ranged from retired nurses, UPMC administrators, design professors, mental health professionals, and designers.
            </p>
            <img
              src="/images/groundswell/gs-playtest-03.jpg"
              alt="Observing user interactions and gathering feedback"
              className={styles.stickyPhotoFull}
            />
          </div>
        </div>
      </section>

      {/* ==================== THE REFLECTION ==================== */}
      <section id="reflection" className={styles.breakSection}>
        <div className={styles.breakContent}>

          {/* Opening */}
          <AnimatedElement>
            <h2 className={styles.breakTitle}>The Reflection</h2>
            <p className={styles.reflectionThesisDark}>
              When design meets systems change and is rooted in relationships, outcomes become more than products&mdash;they become symbols of collaboration and seeds planted for better futures.
            </p>
          </AnimatedElement>

          {/* Personal Reflection */}
          <AnimatedElement>
            <p className={styles.breakBody}>
              Through Groundswell, I discovered a passion for healthcare design and participatory research. I learned how to navigate transdisciplinary collaboration&mdash;coordinating physicians, nurses, fabricators, donors, meditation teachers, and hospital administrators toward a shared vision. More importantly, I learned to attune my design process to amplify rather than impose, to honor existing community innovations, and to build trust through sustained presence. This project fundamentally shaped how I approach design: not as an outsider with solutions, but as a collaborator creating conditions for what&rsquo;s already trying to emerge.
            </p>
          </AnimatedElement>

          {/* Finale Image */}
          <AnimatedElement>
            <img
              src="/images/groundswell/gs-finale.jpg"
              alt="Groundswell team collaboration and installation"
              className={styles.reflectionImageBodyWidth}
            />
          </AnimatedElement>

          {/* Ongoing Work */}
          <AnimatedElement>
            <div className={styles.reflectionSubheadingWithDivider}>
              <h3>Ongoing Work</h3>
            </div>
          </AnimatedElement>

          <AnimatedElement>
            <div className={styles.ongoingWorkGridDark}>

              <div className={styles.ongoingWorkCardDark}>
                <h4 className={styles.ongoingWorkLabelDark}>Research Study</h4>
                <p className={styles.ongoingWorkTextDark}>
                  Ongoing qualitative surveys and data collection throughout the 12-month pilot at UPMC Magee-Womens Hospital.
                </p>
              </div>

              <div className={styles.ongoingWorkCardDark}>
                <h4 className={styles.ongoingWorkLabelDark}>Academic Publication</h4>
                <p className={styles.ongoingWorkTextDark}>
                  Research paper under peer review: <em>&ldquo;Re-aligning Design Values: Co-Creating Resonance Through Presence, Attunement, and Harmonization With Cancer Services Staff&rdquo;</em>
                </p>
              </div>

              <div className={styles.ongoingWorkCardDark}>
                <h4 className={styles.ongoingWorkLabelDark}>Data Visualization</h4>
                <p className={styles.ongoingWorkTextDark}>
                  Developing a public-facing interactive data visualization platform using web-based 3D technologies to communicate study findings.
                </p>
              </div>

              <div className={styles.ongoingWorkCardDark}>
                <h4 className={styles.ongoingWorkLabelDark}>Expansion Proposals</h4>
                <p className={styles.ongoingWorkTextDark}>
                  Submitted letters of intent to extend improved Groundswell programming to additional hospital and community settings, expanding support to family caregivers.
                </p>
              </div>

            </div>
          </AnimatedElement>

          {/* Press Section */}
          <AnimatedElement>
            <div className={styles.reflectionSubheadingWithDivider}>
              <h3>In the Press</h3>
            </div>
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

      {/* ==================== ACKNOWLEDGEMENTS ==================== */}
      <section id="acknowledgements" className={styles.sectionDark}>
        <div className={styles.sectionContent}>

          {/* Intro */}
          <AnimatedElement>
            <h2 className={styles.sectionHeadingLightCentered}>Acknowledgements</h2>
            <p className={styles.bodyTextLightCenteredBold}>
              This project is a tribute to the quiet strength, deep compassion, and collective spirit of those who provide oncology care. It was shaped by the voices of staff who shared their experiences—those who live this work every day.
            </p>
            <p className={styles.bodyTextLightCentered} style={{ marginBottom: 'var(--space-xl)' }}>
              Groundswell is a collaboration between Carnegie Mellon University&rsquo;s School of Design, the University of Pittsburgh Schools of Medicine and Nursing, and the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. We are especially grateful to the Department of Obstetrics, Gynecology, and Reproductive Services and the incredible staff at Magee who made this project possible. Funding was provided by College of Fine Arts at CMU; the UPMC Magee-Womens Hospital Medical Staff Fund; and the Paul D. Schurgot Foundation.
            </p>
          </AnimatedElement>

          {/* Leadership & Design Row */}
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

          {/* Donors & Partners */}
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

          {/* Squiggle Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--space-lg) 0' }}>
            <Squiggle color="var(--project-accent-light)" />
          </div>

          {/* Closing */}
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

      {/* ==================== FOOTER NAV ==================== */}
      <nav className={styles.projectFooterNav}>
        <Link href="/projects" className={styles.footerNavLink}>
          &larr; All Projects
        </Link>
        <Link href="/projects/birthstory" className={styles.footerNavLink}>
          Next Project &rarr;
        </Link>
      </nav>
    </div>
  )
}