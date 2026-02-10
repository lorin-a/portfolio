'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  TimelineNav,
  ProjectHero,
  PhaseDivider,
  ImageGallery,
  CardDeck,
  AudioCard,
  AudioCardGrid,
  QuoteBlock,
  QuoteGrid,
} from '@/components'
import styles from '@/styles/project.module.css'

// ============================================
// DATA
// ============================================

const timelineSections = [
  { id: 'context', label: 'Context' },
  { id: 'process', label: 'Process' },
  { id: 'synthesis', label: 'Synthesis' },
  { id: 'impact', label: 'Impact' },
]

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

const participantQuotes = [
  {
    quote: "I feel trapped.",
    interpretation: "There is no way out. If I leave my patients I will feel guilty. If I leave my workers in this mess I will feel guilty. When someone leaves, people are jealous of them for getting out."
  },
  {
    quote: "What mental health?",
    interpretation: "There are zero benefits for staff mental health. Hardly anyone uses the EAP. I would use a meditation app if it was provided."
  },
  {
    quote: "I've given up on trying to change things.",
    interpretation: "Managers are essentially powerless over real change which needs funding and policy change. Why can't we find the budget for a relief nurse?"
  },
  {
    quote: "There is no time to grieve.",
    interpretation: "Once someone passes there is no time to grieve the loss before another person comes in. We are trying to find ways to share but nothing is really working."
  },
  {
    quote: "I was not prepared for this.",
    interpretation: "No one officially trained me on the emotional trauma that this job causes. I'm doing the work of a therapist and social worker, losing people daily."
  },
  {
    quote: "I can't turn it off.",
    interpretation: "Even on my days off, I keep checking Teams to stay updated. I worry about my patients when I am at home. I am so exhausted."
  }
]

const validationQuotes = [
  "It's remarkable what 10 minutes can do...",
  "As soon as I stepped inside, I almost teared up. You're not always aware of how frazzled you are until you stop.",
  "You get to experience time differently in there. Be in a flow. Be with yourself. Just be here now. And that was a huge gift.",
  "I've worked in the trauma field, and I work with physicians...everyone needs one of these.",
  "You don't have to wait until the end of the day to refresh, but you can have micro-resets in-between."
]

// Workshop gallery images - all use ImageGallery now
const griefWorkshopImages = [1, 2, 3, 4, 5].map(n => ({
  src: `/images/groundswell/gs-workshop-grief-0${n}.jpg`,
  alt: `Grief workshop activity ${n}`
}))

const flowerWorkshopImages = [1, 2, 3, 4, 5].map(n => ({
  src: `/images/groundswell/gs-workshop-flower-0${n}.jpg`,
  alt: `Nourishing the Flower workshop activity ${n}`
}))

const coatsWorkshopImages = [1, 2, 3, 4, 5].map(n => ({
  src: `/images/groundswell/gs-workshop-coats-0${n}.jpg`,
  alt: `Women in White Coats event ${n}`
}))

// Component detail galleries
const ctbImages = [
  { src: '/images/groundswell/gs-ctb-detail-01.jpg', alt: 'Ceased to Breathe email redesign - full view' },
  { src: '/images/groundswell/gs-ctb-detail-02.jpg', alt: 'Ceased to Breathe email redesign - detail' },
  { src: '/images/groundswell/gs-ctb-detail-03.jpg', alt: 'Ceased to Breathe email redesign - mockup' },
]

const podImages = [
  { src: '/images/groundswell/gs-pod-detail-01.jpg', alt: 'Groundswell restorative pod - exterior view' },
  { src: '/images/groundswell/gs-pod-detail-02.jpg', alt: 'Groundswell restorative pod - interior view' },
  { src: '/images/groundswell/gs-pod-detail-03.jpg', alt: 'Groundswell restorative pod - detail' },
]

const artWallImages = [
  { src: '/images/groundswell/gs-artwall-detail-01.jpg', alt: 'Groundswell Garden art wall - full view' },
  { src: '/images/groundswell/gs-artwall-detail-02.jpg', alt: 'Groundswell Garden art wall - detail' },
  { src: '/images/groundswell/gs-artwall-detail-03.jpg', alt: 'Groundswell Garden art wall - close-up' },
]

const outcomeImages = [1, 2, 3, 4, 5].map(n => ({
  src: `/images/groundswell/gs-install-0${n}.jpg`,
  alt: `Groundswell installation at UPMC - view ${n}`
}))

const playtestingImages = [1, 2, 3, 4, 5].map(n => ({
  src: `/images/groundswell/gs-playtesting-0${n}.jpg`,
  alt: `Playtesting session at CMU - photo ${n}`
}))

// ============================================
// COMPONENT
// ============================================

export default function GroundswellContent() {
  const heroRef = useRef(null)

  return (
    <div className={styles.projectPage}>
      {/* Timeline Navigation */}
      <TimelineNav sections={timelineSections} heroId="hero" />

      {/* Hero */}
      <ProjectHero
        ref={heroRef}
        id="hero"
        title="Groundswell"
        subtitle="Making Space to Restore, Together"
        descriptor="A Design Ecology for Staff Well-Being"
        tags={['Co-Production', 'Healthcare', 'Co-Design']}
        backgroundImage="/images/groundswell/gs-hero.jpg"
      />

      {/* Project Details Bar */}
      <div className={styles.sectionDark}>
        <div className={styles.sectionContentWide}>
          <div className={styles.detailsBar}>
            <div>
              <p className={styles.detailLabel}>Client</p>
              <p className={styles.detailValue}>UPMC Magee-Womens Hospital</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Duration</p>
              <p className={styles.detailValue}>15 weeks + ongoing</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Status</p>
              <p className={styles.detailValue}>Pilot Study (12 months)</p>
            </div>
            <div>
              <p className={styles.detailLabel}>Funding</p>
              <p className={styles.detailValue}>UPMC Grant + $30k donations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionCentered}>
          <video
            src="/video/groundswell/gs-walkthrough.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/groundswell/gs-video-poster.jpg"
            className={styles.videoPlayer}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ==================== PHASE 1: CONTEXT ==================== */}
      <PhaseDivider
        id="context"
        title="Context"
        intro="Gynecologic oncology staff face chronic compounded grief from repeated patient loss, yet have no structured support for processing these experiences. We partnered with UPMC Magee-Womens Hospital to understand this gap — the people navigating it, the systems perpetuating it, and the tensions that make sustainable care so difficult."
      />

      {/* The Work */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>The Work</h2>
          <p className={styles.bodyText}>
            Groundswell is a grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital.
          </p>
        </div>
        <div className={styles.sectionContentWide}>
          <img
            src="/images/groundswell/gs-values-diagram.svg"
            alt="Groundswell core values: Humanity, Compassion, Together, and Normalcy shown as four interconnected circles"
            className={styles.fullWidthImage}
          />
          <div className={styles.cardGrid2}>
            {[
              { title: 'Ceased to Breathe Email Redesign', desc: 'Updated patient death notification with compassionate visuals and language that acknowledges the impact of patient loss.', img: 'gs-ctb-email.jpg' },
              { title: 'Groundswell Restorative Pod', desc: 'Restorative space for emotional decompression through mindfulness activities like guided meditation.', img: 'gs-pod.jpg' },
              { title: 'Groundswell Reflection Cards', desc: 'Guided reflection cards that help staff build a self-care practice through emotional validation and introductory exercises.', img: 'gs-cards.jpg' },
              { title: 'Groundswell Garden Community Art Wall', desc: 'Community art wall that invites participation through anonymous shared emotional expression.', img: 'gs-artwall.jpg' }
            ].map((card, i) => (
              <div key={i} className={styles.cardDark}>
                <img
                  src={`/images/groundswell/${card.img}`}
                  alt={card.title}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitleLight}>{card.title}</h3>
                  <p className={styles.cardDescriptionLight}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* The Ecosystem */}
<section className={styles.sectionDark}>
  <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
    <h2 className={styles.sectionHeadingLight}>The Ecosystem</h2>
    <p className={styles.bodyTextLight}>
      Designing sustainable interventions within complex systems demands rigorous research, meaningful relationships, and genuine reciprocity. Through communication, creativity, and connection, Groundswell reframes burnout from an individual failure to an institutional flaw.
    </p>
  </div>
  <div className={styles.sectionContent}> {/* ← Changed from sectionContentWide */}
    <img
      src="/images/groundswell/gs-ecosystem-diagram.svg"
      alt="Groundswell ecosystem diagram..."
      className={styles.fullWidthImage}
      style={{ marginTop: 'var(--space-lg)' }}
    />
  </div>
</section>

      {/* The Problem - IMPROVED TYPOGRAPHY */}
      <section className={styles.sectionLight}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <h2 className={styles.sectionHeading}>The Problem</h2>
          <p className={styles.leadText}>
            How might we create supportive environments for healthcare staff to openly process burnout, compassion fatigue, and the emotional toll of patient deaths?
          </p>
        </div>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <blockquote className={styles.heroQuote}>
            <p className={styles.heroQuoteText}>
              "A special person can do this work forever, a good person can do it for a little while, most people couldn't do it for a day."
            </p>
            <cite className={styles.heroQuoteAttribution}>— Oncology Staff</cite>
          </blockquote>
        </div>
        <div className={styles.sectionContent}>
          <p className={styles.bodyText}>
            The system preys on compassion. In a profit-driven hierarchy that treats staff as disposable, the intense focus on patients comes at the cost of worker support — leading to burnout, poor recognition, and a culture where grief is just part of the job.
          </p>
        </div>
      </section>

      {/* ==================== PHASE 2: PROCESS ==================== */}
      <PhaseDivider
        id="process"
        title="Process"
        intro="Over 15 weeks, we immersed ourselves in the oncology environment — studying literature on healthcare worker well-being, shadowing staff at Magee, conducting interviews, and facilitating participatory workshops. Our methods were designed to surface emotional truths that traditional research approaches often miss."
      />

      {/* Participatory Workshops */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Participatory Workshops</h2>
          <p className={styles.bodyText}>
            We designed participatory workshops to understand the needs of healthcare workers while setting intentions as a team to create solutions rooted in research that would achieve lasting change without extra burden on staff.
          </p>

          {/* Grief Workshop */}
          <div className={styles.workshopSection}>
            <h3 className={styles.subheading}>Grief Workshop at Magee</h3>
            <p className={styles.bodyText}>
              We facilitated a conversation on the emotional weight of grief in the oncology workplace, creating space for staff to reflect, share, and collaboratively explore ways to support one another. Through grounding exercises and scenario-based discussions, participants identified what they would need to hear and experience when coping with patient loss.
            </p>
            <p className={styles.bodyText}>
              Participants were engaged and open, with one stating, "We need more time with you guys!" — highlighting the need for dedicated space to process grief. What helped most was simple: acknowledgment of their pain and permission to feel.
            </p>
            <ImageGallery
              images={griefWorkshopImages}
              ariaLabel="Grief workshop photo gallery"
            />
          </div>

          {/* Nourishing the Flower - RESTORED */}
          <div className={styles.workshopSection}>
            <h3 className={styles.subheading}>Nourishing the Flower Workshop</h3>
            <p className={styles.bodyText}>
              Using a flower metaphor, participants identified key aspects of their experience — recognition, environment, and workplace culture — by mapping what helps them thrive and what causes strain. After creating individual flowers, we built a collective "garden" of insights, allowing participants to reflect on common themes and highlight what resonated most.
            </p>
            <p className={styles.bodyText}>
              We created both "healthy" and "wilting" versions to surface both supports and harms. A simple activity like coloring offers healthcare staff a brief escape and mini relaxation amid their stressful routines. Through this small act of self-care, hidden feelings can surface, providing quiet relief and reflection.
            </p>
            <ImageGallery
              images={flowerWorkshopImages}
              ariaLabel="Nourishing the Flower workshop photo gallery"
            />
          </div>

          {/* Women in White Coats */}
          <div className={styles.workshopSection}>
            <h3 className={styles.subheading}>Women in White Coats Event</h3>
            <p className={styles.bodyText}>
              Leaders in Oncology added their thoughts to the leaves on the stem of our orchid poster, a symbolic flower in cancer care. Thank you postcards with QR codes to a follow-up survey were distributed. Guests took extras to pass to colleagues — evidence that the activity resonated beyond the room.
            </p>
            <ImageGallery
              images={coatsWorkshopImages}
              ariaLabel="Women in White Coats event photo gallery"
            />
          </div>
        </div>
      </section>

      {/* What We Heard - MOVED TO LIGHT SECTION */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>What We Heard</h2>
          <p className={styles.bodyText}>
            We learned about "chronic compounded grief" among oncology nurses — how repeated exposure to loss accumulates over time when not properly processed. We witnessed the impact of cramped, windowless environments, administrative overload, and a fractured culture of empathetic staff left unsupported by systems that leave them feeling helpless.
          </p>
        </div>
        <div className={styles.sectionContent}>
          <QuoteGrid quotes={participantQuotes} variant="light" />
        </div>
      </section>

      {/* ==================== PHASE 3: SYNTHESIS ==================== */}
      <PhaseDivider
        id="synthesis"
        title="Synthesis"
        intro="Our research revealed a critical insight: simple, actionable interventions could significantly impact staff morale without requiring major budget increases. Through tetrahedron analysis, we mapped the relationships between stakeholders, systems, and emotional patterns — revealing a structural void at the center of oncology care."
      />

      {/* Tetrahedron Analysis */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Tetrahedron Analysis</h2>
          <p className={styles.bodyText}>
            We synthesized hundreds of data points using tetrahedron analysis — mapping relationships between stakeholders, systems, and emotional patterns to understand the full complexity of the oncology care environment.
          </p>
          <div className={styles.embedContainer}>
            <iframe
              className={styles.figmaEmbed}
              src="https://embed.figma.com/design/qmXOejgmdOtExNJVkXRvT8/Groundswell-Synthesis?node-id=0-1&embed-host=share"
              allowFullScreen
              title="Groundswell Synthesis Board"
            />
          </div>
          <p className={`${styles.bodyTextSmall} ${styles.sectionCentered} ${styles.italic}`}>
            Interactive synthesis board — scroll and zoom to explore
          </p>
        </div>
      </section>

      {/* The Void */}
      <section className={styles.sectionDark}>
        <div className={`${styles.sectionContent} ${styles.sectionCentered}`}>
          <h2 className={styles.sectionHeadingLight}>The Void</h2>
          <p className={styles.bodyTextLight}>
            At the center of our analysis emerged a structural absence — a system designed around patients that inadvertently abandons the people caring for them. While patient-centered care aims to improve health outcomes, it neglects the well-being of healthcare workers. In a profit-driven hierarchy that treats staff as disposable, grief becomes just part of the job. This void is where Groundswell intervenes.
          </p>
        </div>
      </section>

      {/* Key Findings + Conclusions */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Key Findings</h2>
          <div className={styles.frameworkGrid}>
            {[
              {
                title: 'Recognition',
                intro: 'Staff feel unappreciated through small overlooked actions like:',
                items: ['Long commute to expensive parking lot', "Daily interruption of tasks by colleagues who don't understand the importance of their work", 'Inadequate benefits/funding', 'Feedback not resulting in real change']
              },
              {
                title: 'Environment',
                intro: 'Office space contributes to unhappiness due to:',
                items: ['No windows', 'Harsh lighting', 'No plants', 'No excess space (small desks)', 'Nowhere to eat or gather', 'Distance from cafeteria', 'Physical disconnect between front office and managers']
              },
              {
                title: 'Culture',
                intro: 'Culture exacerbates workplace issues such as:',
                items: ['Expectation that everyone overworks', 'No one takes breaks', 'Being patient-centered means neglecting yourself', 'Feeling selfish if you take a break', 'Grief is just part of the job']
              },
              {
                title: 'Systemic',
                intro: 'Broader issues within the system make change feel impossible:',
                items: ['Underpaid', 'Lack of understanding/respect for what jobs entail', 'Caste system between staff hierarchy', 'Scheduling is hectic', 'Lack of budget for easy solutions', 'Difficulty convincing profit-minded execs to make change', 'Corporate culture']
              }
            ].map((col) => (
              <div key={col.title} className={styles.frameworkColumn}>
                <h4 className={styles.frameworkTitle}>{col.title}</h4>
                <p className={styles.frameworkIntro}>{col.intro}</p>
                <ul className={styles.frameworkList}>
                  {col.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Transition */}
          <p className={styles.transitionText}>
            These patterns crystallized into three core insights:
          </p>

          {/* 3 Conclusions */}
          <div className={styles.cardGrid3}>
            {[
              { num: '01', title: 'The Dual Burden of Care', desc: 'Healthcare workers face emotional exhaustion from both the inherently compassionate nature of their work (constant exposure to grief, loss, and trauma) and excessive administrative tasks that disconnect them from their original purpose of patient care.' },
              { num: '02', title: 'Stigma Prevents Help-Seeking', desc: '73% of emergency physicians report stigma around mental health treatment in their workplace, with 27% avoiding treatment entirely due to fear of professional consequences—highlighting the urgent need to normalize emotional support in healthcare settings.' },
              { num: '03', title: 'Support Requires Both Top-Down and Peer-to-Peer', desc: 'Effective mental health support combines organizational leadership initiatives with peer recognition programs, creating a comprehensive culture that prioritizes staff well-being alongside patient care.' }
            ].map((item) => (
              <div key={item.num} className={styles.numberedItemDark}>
                <span className={styles.numberLabelLight}>{item.num}</span>
                <h4 className={styles.numberedTitleLight}>{item.title}</h4>
                <p className={styles.cardDescriptionLight}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Design Principles</h2>
          <p className={styles.bodyText}>Four principles guided our design decisions:</p>
          <div className={styles.cardGrid2}>
            {[
              { num: '01', title: 'Center Mental Well-Being', desc: 'Prioritize emotional and psychological support for healthcare workers, addressing both systemic issues and peer-to-peer connections.' },
              { num: '02', title: 'Reduce Administrative Burden', desc: 'Focus on solutions that alleviate unnecessary clerical tasks, allowing staff to reconnect with patient care and their original motivations.' },
              { num: '03', title: 'De-Stigmatize Help-Seeking', desc: 'Mental health resources must be easily accessible and de-stigmatized, ensuring staff feel safe seeking help without fear of professional repercussions.' },
              { num: '04', title: 'Root in Research', desc: 'Incorporate firsthand insights from shadowing and interviews with established best practices to create meaningful, evidence-based interventions.' }
            ].map((item) => (
              <div key={item.num} className={styles.numberedItemDark}>
                <span className={styles.numberLabelLight}>{item.num}</span>
                <h4 className={styles.numberedTitleLight}>{item.title}</h4>
                <p className={styles.cardDescriptionLight}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PHASE 4: IMPACT ==================== */}
      <PhaseDivider
        id="impact"
        title="Impact"
        intro="Groundswell was awarded a UPMC grant for a 12-month quality improvement study measuring employee well-being, team cohesion, and intent to leave. The installation launched at Magee-Womens in October 2025, supported by over $30k in donations."
      />

      {/* The Components */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>The Components</h2>

          {/* CTB Email */}
          <div className={styles.componentSection}>
            <h3 className={styles.subheading}>Ceased to Breathe Email Redesign</h3>
            <p className={styles.bodyText}>
              Updated patient death notification email template with compassionate visuals and language that acknowledges the impact of patient loss. This small yet significant intervention creates opportunities for connection and mutual support while establishing the compassionate tone that unifies all program components.
            </p>
            <ImageGallery
              images={ctbImages}
              ariaLabel="Ceased to Breathe email redesign gallery"
            />
          </div>

          {/* Pod */}
          <div className={styles.componentSection}>
            <h3 className={styles.subheading}>Groundswell Restorative Pod</h3>
            <p className={styles.bodyText}>
              Restorative pod space for emotional decompression through mindfulness activities like guided meditation. Research revealed the critical need for private spaces within clinical environments characterized by harsh fluorescent lighting and crowded desks — making dedicated space for emotional processing essential.
            </p>
            <ImageGallery
              images={podImages}
              ariaLabel="Groundswell restorative pod gallery"
            />
          </div>

          {/* Reflection Cards */}
          <div className={styles.componentSection}>
            <h3 className={styles.subheading}>Groundswell Reflection Cards</h3>
            <p className={styles.bodyText}>
              Guided reflection cards that help staff build a self-care practice through emotional validation and introductory exercises for emotional regulation. These cards integrate mind-body approaches to processing the complex, contradictory emotions inherent in oncology work.
            </p>
            <CardDeck
              cards={cards}
              imagePath="/images/groundswell/gs-card-"
            />
          </div>

          {/* Art Wall */}
          <div className={styles.componentSection}>
            <h3 className={styles.subheading}>Groundswell Garden Community Art Wall</h3>
            <p className={styles.bodyText}>
              Community art wall that invites participation through anonymous shared emotional expression. By recognizing patient care as an interconnected ecosystem, the wall acknowledges shared emotional labor among all team members — from clinical staff to administrative personnel to family caregivers.
            </p>
            <ImageGallery
              images={artWallImages}
              ariaLabel="Groundswell Garden art wall gallery"
            />
          </div>

          {/* Mindfulness Resources */}
          <div className={styles.componentSection}>
            <h3 className={styles.subheading}>Mindfulness Resources</h3>
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
              <AudioCard
                type="5-Minute Meditation"
                title='"Emotional Reset"'
                artist="By Catherine Liggett"
                src="/audio/groundswell/gs-meditation-5min.mp3"
                variant="dark"
              />
              <AudioCard
                type="10-Minute Meditation"
                title='"Guided Physical & Emotional Reset"'
                artist="By Catherine Liggett"
                src="/audio/groundswell/gs-meditation-10min.mp3"
                variant="dark"
              />
            </AudioCardGrid>
          </div>
        </div>
      </section>

      {/* Playtesting */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Playtesting</h2>
          <p className={styles.bodyText}>
            We invited 30 participants to test our pod experience at CMU before installing at the hospital. The overwhelming response was that people wanted a pod of their own.
          </p>
          <ImageGallery
            images={playtestingImages}
            ariaLabel="Playtesting session photos"
          />
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

      {/* Results */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Results</h2>
          <p className={styles.bodyText}>
            Groundswell was awarded a UPMC grant for a 12-month quality improvement research study measuring employee well-being, team cohesion, and intent to leave. The installation launched at Magee-Womens in October 2025, supported by over $30k in donated materials and production skills.
          </p>
          <p className={styles.bodyText}>
            At the midpoint of the pilot, Groundswell has documented 570 points of engagement — 207 emotion responses, 256 pod visits, and 107 meditation views. These represent minimum baselines; our sensors and methods are designed to undercount rather than overcount.
          </p>
          <p className={styles.bodyText}>
            I taught myself to vibe code and co-designed a "living" data storytelling tool with Claude to communicate impact to stakeholders. For the backend, I designed an admin page to streamline data collection across three sources: physical emotion cards, pod sensor data, and meditation analytics.
          </p>
          <img
            src="/images/groundswell/gs-dataviz.jpg"
            alt="Groundswell data visualization dashboard"
            className={styles.fullWidthImage}
          />
        </div>
      </section>

      {/* Outcome Gallery */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <ImageGallery
            images={outcomeImages}
            ariaLabel="Groundswell installation gallery"
          />
        </div>
      </section>

      {/* Reflection */}
      <section className={`${styles.sectionDark} ${styles.sectionCentered}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeadingLight}>Reflection</h2>
          <p className={styles.bodyTextLight}>
            Rather than relying on exceptional individuals to shoulder impossible burdens, Groundswell creates systemic solutions that make compassionate care sustainable for all healthcare workers.
          </p>
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

      {/* Recognition */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Recognition</h2>
          <p className={styles.bodyText}>
            This project was possible because of the trust building that took place in the year prior. Without Kristin Hughes' passion and relationships at UPMC, the dedication of Dr. Sarah Taylor, Dr. Grace Campbell, and Dr. Heidi Donovan, and the generous time and vulnerable information shared by the staff members.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamSection}>
              <h3>Project Team</h3>
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
              <h3>Partners</h3>
              <ul className={styles.teamList}>
                <li>UPMC Magee-Womens Hospital</li>
                <li>Carnegie Mellon School of Design</li>
                <li>University of Pittsburgh Schools of Medicine and Nursing</li>
                <li>Carolyn Gavin Art</li>
                <li>NookPod</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.projectNav}>
        <Link href="/projects/birthstory" className={styles.projectNavLink}>
          ← Previous Project
        </Link>
        <Link href="/projects/transition-design" className={styles.projectNavLink}>
          Next Project →
        </Link>
      </nav>
    </div>
  )
}