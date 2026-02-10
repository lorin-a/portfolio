'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  ProjectHero,
  ImageGallery,
  CardDeck,
  AudioCard,
  AudioCardGrid,
  QuoteBlock,
} from '@/components'
import styles from '@/styles/project.module.css'

// ============================================
// DATA
// ============================================

const cards = [
  { id: 1, name: 'welcome' },
  { id: 2, name: 'embrace' },
  { id: 3, name: 'numb' },
  { id: 4, name: 'present' },
  { id: 5, name: 'angry' },
  { id: 6, name: 'grateful' },
  { id: 7, name: 'exhausted' },
  { id: 8, name: 'joyful' },
  { id: 9, name: 'invisible' },
  { id: 10, name: 'valued' },
  { id: 11, name: 'heartbroken' },
  { id: 12, name: 'connected' },
  { id: 13, name: 'vulnerable' },
  { id: 14, name: 'hopeful' },
  { id: 15, name: 'thankyou' },
]

// Component images for the 4-up grid
const componentData = [
  {
    id: 'pod',
    title: 'Restorative Pod',
    description: 'A dedicated space for emotional decompression through mindfulness and guided meditation.',
    image: '/images/groundswell/gs-component-pod.jpg',
  },
  {
    id: 'cards',
    title: 'Reflection Cards',
    description: 'Guided prompts that help staff build self-care practices through emotional validation.',
    image: '/images/groundswell/gs-component-cards.jpg',
  },
  {
    id: 'artwall',
    title: 'Community Art Wall',
    description: 'Anonymous shared expression across the full spectrum of oncology experiences.',
    image: '/images/groundswell/gs-component-artwall.jpg',
  },
  {
    id: 'ctb',
    title: 'Ceased to Breathe Email',
    description: 'Compassionate redesign of patient death notifications that honors shared grief.',
    image: '/images/groundswell/gs-component-ctb.jpg',
  },
]

// Participant quotes - the human truth
const participantQuotes = [
  {
    quote: "I feel trapped.",
    context: "If I leave my patients I'll feel guilty. If I leave my workers I'll feel guilty. When someone leaves, people are jealous of them for getting out."
  },
  {
    quote: "There is no time to grieve.",
    context: "Once someone passes there is no time to grieve the loss before another person comes in."
  },
  {
    quote: "I was not prepared for this.",
    context: "No one officially trained me on the emotional trauma that this job causes."
  },
]

// Validation quotes from playtesting
const validationQuotes = [
  "It's remarkable what 10 minutes can do...",
  "As soon as I stepped inside, I almost teared up. You're not always aware of how frazzled you are until you stop.",
  "I've worked in the trauma field, and I work with physicians... everyone needs one of these.",
]

// ============================================
// COLLAPSIBLE SECTION COMPONENT
// ============================================

function CollapsibleSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className={styles.collapsibleSection}>
      <button 
        className={styles.collapsibleToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.collapsibleTitle}>{title}</span>
        <span className={styles.collapsibleIcon}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className={styles.collapsibleContent}>
          {children}
        </div>
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function GroundswellContentV2() {
  const [activeComponent, setActiveComponent] = useState(null)
  const heroRef = useRef(null)

  return (
    <div className={styles.projectPage}>
      
      {/* ==================== HERO ==================== */}
      <ProjectHero
        ref={heroRef}
        id="hero"
        title="Groundswell"
        subtitle="What if the people experiencing burnout designed their own solution?"
        descriptor="A 12-Month Pilot Study at UPMC Magee-Womens Hospital"
        tags={['Co-Design', 'Healthcare', 'Systems Change']}
        backgroundImage="/images/groundswell/gs-hero.jpg"
      />

      {/* ==================== IMPACT STATS ==================== */}
      <section className={styles.sectionDark}>
        <div className={styles.sectionContentWide}>
          <div className={styles.detailsBar}>
            <div>
              <p className={styles.detailLabel}>Engagement</p>
              <p className={styles.detailValue}>570+ interactions</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Donations</p>
              <p className={styles.detailValue}>$30k+ in-kind</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Study Duration</p>
              <p className={styles.detailValue}>12-month pilot</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Status</p>
              <p className={styles.detailValue}>Research papers in review</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LIVE DASHBOARD ==================== */}
      <section className={styles.sectionLight}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <h2 className={styles.sectionHeading}>Living Impact</h2>
          <p className={styles.bodyText}>
            I taught myself to vibe code and co-designed a data storytelling tool with AI to communicate real-time impact to stakeholders. Explore engagement across emotion responses, pod visits, and meditation usage.
          </p>
        </div>
        <div className={styles.sectionContent}>
          {/* Dashboard video/slideshow placeholder */}
          <div className={styles.dashboardContainer}>
            <video
              src="/video/groundswell/gs-dashboard-overview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={styles.dashboardVideo}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Optional: Add thumbnail navigation for multiple dashboard views */}
        </div>
      </section>

      {/* ==================== THE WORK (Visual Showcase) ==================== */}
      <section className={styles.sectionLight}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <h2 className={styles.sectionHeading}>The Ecosystem</h2>
          <p className={styles.bodyText}>
            Four interconnected interventions that create space for acknowledgment, processing, and community.
          </p>
        </div>
        <div className={styles.sectionContentWide}>
          <div className={styles.cardGrid2}>
            {componentData.map((component) => (
              <button
                key={component.id}
                className={`${styles.componentCard} ${activeComponent === component.id ? styles.componentCardActive : ''}`}
                onClick={() => setActiveComponent(activeComponent === component.id ? null : component.id)}
              >
                <img
                  src={component.image}
                  alt={component.title}
                  className={styles.componentCardImage}
                />
                <div className={styles.componentCardOverlay}>
                  <h3 className={styles.componentCardTitle}>{component.title}</h3>
                  <p className={styles.componentCardDescription}>{component.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== THE RADICAL APPROACH ==================== */}
      <section className={styles.sectionDark}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <p className={styles.pullQuoteLarge}>
            "This was not design research conducted <em>on</em> healthcare workers, but <em>with</em> them."
          </p>
        </div>
        <div className={styles.sectionContent}>
          <p className={styles.bodyTextLight}>
            Named for water that rises naturally from deep within the earth, Groundswell emerged directly from the voices of healthcare workers themselves. It challenges the colonial nature of traditional participatory design by shifting power from designers to the community.
          </p>
          <p className={styles.bodyTextLight}>
            This approach—what scholars call Radical Participatory Design—redefines roles so that community members lead the design process, choice of methods, and engagement in synthesis. Our team's role was to listen, facilitate, and translate—not to prescribe solutions.
          </p>
          <p className={styles.bodyTextLight} style={{ opacity: 0.8, fontStyle: 'italic' }}>
            Two research papers documenting this transdisciplinary approach are currently in review for the Design Research Society.
          </p>
        </div>
        <div className={styles.sectionContent}>
          <img
            src="/images/groundswell/gs-collaboration.jpg"
            alt="Design team collaborating with oncology staff during a participatory workshop"
            className={styles.fullWidthImage}
            style={{ marginTop: 'var(--space-md)' }}
          />
        </div>
      </section>

      {/* ==================== THE HUMAN TRUTH ==================== */}
      <section className={styles.sectionLight}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <h2 className={styles.sectionHeading}>What We Heard</h2>
          <p className={styles.leadText}>
            Healthcare workers face chronic compounded grief—repeated exposure to loss that accumulates when not properly processed.
          </p>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.quoteGrid}>
            {participantQuotes.map((item, i) => (
              <div key={i} className={styles.participantQuoteCard}>
                <p className={styles.participantQuote}>"{item.quote}"</p>
                <p className={styles.participantContext}>{item.context}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <blockquote className={styles.heroQuote}>
            <p className={styles.heroQuoteText}>
              "A special person can do this work forever, a good person can do it for a little while, most people couldn't do it for a day."
            </p>
            <cite className={styles.heroQuoteAttribution}>— Oncology Staff Member</cite>
          </blockquote>
        </div>
      </section>

      {/* ==================== VALIDATION ==================== */}
      <section className={styles.sectionLight}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <h2 className={styles.sectionHeading}>Early Response</h2>
          <p className={styles.bodyText}>
            We tested the pod experience with 30 participants before hospital installation. The response was overwhelming.
          </p>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.validationGrid}>
            {validationQuotes.map((quote, i) => (
              <QuoteBlock
                key={i}
                quote={quote}
                variant="bordered"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GO DEEPER (Collapsible) ==================== */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Go Deeper</h2>
          <p className={styles.bodyText}>
            Explore the full research process, workshop methodologies, and component details.
          </p>

          <CollapsibleSection title="Research Process">
            <p className={styles.bodyText}>
              Over 15 weeks, we immersed ourselves in the oncology environment—studying literature on healthcare worker well-being, shadowing staff at Magee, conducting interviews, and facilitating participatory workshops. Our methods were designed to surface emotional truths that traditional research approaches often miss.
            </p>
            <p className={styles.bodyText}>
              The research revealed that healthcare workers are eager for dedicated spaces to process grief. Key patterns emerged: recognition matters, supportive environments are essential, and strong team culture makes the difference between sustainable care and burnout.
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Participatory Workshops">
            <p className={styles.bodyText}>
              We designed participatory workshops to understand needs while setting intentions as a team to create solutions rooted in research that would achieve lasting change without extra burden on staff.
            </p>
            <h4 className={styles.subheading}>Grief Workshop at Magee</h4>
            <p className={styles.bodyText}>
              We facilitated a conversation on the emotional weight of grief in the oncology workplace, creating space for staff to reflect, share, and collaboratively explore ways to support one another. Participants were engaged and open, with one stating, "We need more time with you guys!"
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Restorative Pod Details">
            <p className={styles.bodyText}>
              Research revealed the critical need for private spaces within clinical environments characterized by harsh fluorescent lighting and crowded desks. The pod provides a dedicated space for emotional processing—essential in open workplace designs that leave workers perpetually accessible.
            </p>
            <CardDeck
              cards={cards}
              imagePath="/images/groundswell/gs-card-"
            />
          </CollapsibleSection>

          <CollapsibleSection title="Mindfulness Resources">
            <p className={styles.bodyText}>
              Custom meditations and a poem were created for this project in collaboration with Catherine Liggett and Mark Staley. These resources are available to staff via QR code both inside and outside of the pod.
            </p>
            <AudioCardGrid columns={2}>
              <AudioCard
                type="Poem"
                title='"Remember Your Heart"'
                artist="Read by Catherine Liggett"
                src="/audio/groundswell/gs-poem-remember.mp3"
                variant="dark"
              />
              <AudioCard
                type="Guided Meditation"
                title='"Coming Home to Yourself"'
                artist="By Catherine Liggett"
                src="/audio/groundswell/gs-meditation-home.mp3"
                variant="dark"
              />
            </AudioCardGrid>
          </CollapsibleSection>

          <CollapsibleSection title="Team & Acknowledgments">
            <p className={styles.bodyText}>
              This project was possible because of the trust building that took place in the year prior. Without Kristin Hughes' passion and relationships at UPMC, the dedication of Dr. Sarah Taylor, Dr. Grace Campbell, and Dr. Heidi Donovan, and the generous time and vulnerable information shared by the staff members.
            </p>
            <div className={styles.teamGrid}>
              <div className={styles.teamSection}>
                <h4>Project Team</h4>
                <ul className={styles.teamList}>
                  <li>Professor Kristin Hughes</li>
                  <li>Lorin Anderberg</li>
                  <li>Elijah Benzon</li>
                  <li>Kelly McDowell</li>
                  <li>Robertus Shuyo</li>
                  <li>Greg Baltus (Fabrication)</li>
                </ul>
              </div>
              <div className={styles.teamSection}>
                <h4>Partners</h4>
                <ul className={styles.teamList}>
                  <li>UPMC Magee-Womens Hospital</li>
                  <li>Carnegie Mellon School of Design</li>
                  <li>University of Pittsburgh Schools of Medicine and Nursing</li>
                  <li>Carolyn Gavin Art</li>
                  <li>NookPod</li>
                </ul>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </section>

      {/* ==================== REFLECTION ==================== */}
      <section className={`${styles.sectionDark} ${styles.sectionCentered}`}>
        <div className={styles.sectionContent}>
          <blockquote className={styles.poemBlock}>
            <p className={styles.pullQuoteLight}>
              Remember your heart.<br />
              Remember how it has expanded beyond its borders,<br />
              how it has learned to hold both joy and sorrow without breaking.
            </p>
            <p className={styles.pullQuoteLight}>
              We come together like water through soil,<br />
              a groundswell of quiet strength gathering force.<br />
              For what you carry, we carry.
            </p>
            <cite className={styles.quoteAttributionLight}>
              — From "Remember Your Heart," inspired by Joy Harjo's "Remember"
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ==================== NAVIGATION ==================== */}
      <nav className={styles.projectNav}>
        <Link href="/projects" className={styles.projectNavLink}>
          ← All Projects
        </Link>
        <Link href="/projects/birthstory" className={styles.projectNavLink}>
          Next Project →
        </Link>
      </nav>
    </div>
  )
}