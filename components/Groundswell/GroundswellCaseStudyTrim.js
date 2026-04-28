import Link from 'next/link'
import {
  HeroOverview,
  CaseStudyProgress,
  Phase,
  PhaseBeat,
  PhaseNav,
  QuoteScene,
  Reflection,
  Credits,
  Artifact,
  Quote,
  DataNote,
  Insight,
  Framework,
  LiveLink,
} from '@/components/CaseStudy'
import { cloudImg, cloudVideo, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './GroundswellCaseStudyTrim.module.css'

const PHASES = [
  { kind: 'sense', label: 'Sense' },
  { kind: 'weave', label: 'Weave' },
  { kind: 'shape', label: 'Shape' },
]

/**
 * Groundswell — case study (interview-audience cut).
 *
 * Pulls copy and imagery from the existing /projects/groundswell page
 * (which stays frozen as-is) and replicates a trimmed, first-person
 * version here for hiring managers. Reads in ~3–5 minutes.
 *
 * Architecture:
 *   QuoteScene (dark)      cold open — staff voice
 *   HeroOverview (dark)    thesis + identity + outcomes ribbon
 *   Phase Sense (dark)     listening + workshops
 *   Phase Weave (plum)     synthesis, The Void, language pivot
 *   Phase Shape (cream)    production, install, measurement
 *   Reflection (cream)     three named principles
 *   Credits (cream)        team + deep-dive link to /projects/groundswell
 *
 * The dark → plum → cream progression IS the methodological spine.
 * Each phase paints its own surround via [data-theme] on Phase, so
 * CaseStudyProgress flips its bar color cleanly across sections.
 */
export default function GroundswellCaseStudyTrim() {
  return (
    <article className={styles.article}>
      <CaseStudyProgress />
      <PhaseNav phases={PHASES} />

      {/* ─── COLD OPEN ───
          Quote first. Staff voice owns the reader's attention before
          any framing arrives. */}
      <QuoteScene
        theme="dark"
        source="Oncology staff member"
        lines={[
          'A special person can do this work forever,',
          'a good person can do it for a little while,',
          "most people couldn’t do it for a day.",
        ]}
      />

      {/* ─── HERO OVERVIEW ───
          Thesis + project identity + outcomes ribbon. Dark surround
          continues from the cold open so the two-stage cold open reads
          as one breath. */}
      <HeroOverview
        theme="dark"
        eyebrow="Co-Design · Healthcare · Mental Health"
        thesis="The healthcare system is held together by the invisible labor of its staff — a finite resource that is systematically undervalued."
        title="Groundswell"
        tagline="Making space to restore, together."
        meta={{
          role: 'Participatory Research · Co-Design · Copywriting · Project Coordination',
          client: 'UPMC Magee-Womens Hospital',
          year: '2024–2025',
          category: 'Healthcare · Mental Health',
          team: 'CMU School of Design',
          duration: '15 months',
        }}
        outcomes={[
          { value: '12-month QI study', label: 'underway at UPMC Magee' },
          { value: '570 engagements', label: 'in the first 4 months' },
          { value: '$30K+', label: 'donor-secured fabrication' },
        ]}
      />

      {/* ─── 01 · SENSE (Spring 2025 · 15 weeks embedded) ─── */}
      <Phase
        kind="sense"
        number="01"
        label="Sense"
        question="What were oncology staff already carrying that no one was naming?"
        takeaway="I didn’t arrive as an outsider with solutions. I showed up, listened, and stayed."
        contribution="Co-led and lead-designed the Grief Workshop — built the trauma-responsive container, scenarios, and facilitation that made staff comfortable enough to speak."
      >
        <PhaseBeat label="Spring 2025 · 15 weeks embedded" />

        <DataNote
          stat="15"
          unit="weeks shadowing + workshops"
          note="Listening before designing — across roles, in a Gynecologic Oncology unit caring for women with cancer."
        />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-workshop-grief-01'], 1200)}
          alt="Grief workshop with oncology staff — a soft stuffed animal placed at the center of the table"
          caption="Grief workshop. I opened with a trauma-responsive grounding exercise. The stuffed animal at the center invited holding."
        />

        <Quote context="Workshop participant, after the grounding exercise">
          We need more time with you guys.
        </Quote>
      </Phase>

      {/* ─── 02 · WEAVE (late Spring 2025 · synthesis) ─── */}
      <Phase
        kind="weave"
        number="02"
        label="Weave"
        question="What was the structural tension everything else circled around?"
        takeaway="Naming The Void let me design with the staff, not for them."
        contribution="Authored the synthesis: the four-dimension framework and the tetrahedron analysis that named The Void as the structural tension underneath every other finding."
      >
        <PhaseBeat label="The pivot" />

        <Artifact
          src={cloudImg(GS_IMAGES['Synthesis-diagram'], 1200)}
          alt="Synthesis tetrahedron with The Void at the center"
          caption="The synthesis diagram. Four dimensions of staff well-being mapped against each other, with The Void at the center."
        />

        <Framework
          label="Four dimensions of well-being"
          items={[
            { name: 'Recognition', description: 'feeling appreciated' },
            { name: 'Environment', description: 'workspace quality and resources' },
            { name: 'Culture', description: 'team dynamics and workplace norms' },
            { name: 'Systemic', description: 'institutional constraints beyond individual control' },
          ]}
        />

        <Insight label="The Void">
          Patient-centered care neglects the well-being of healthcare workers. In a profit-driven,
          hierarchical system that treats staff as disposable, the focus on patients comes at the
          cost of worker support — leading to burnout, poor recognition, and a toxic culture.
        </Insight>

        <Quote context="A physician, after I proposed &lsquo;Making Space for Grief, Together&rsquo;">
          Oncology work involves more than grief. It encompasses hope, joy, exhaustion, and resilience.
        </Quote>
      </Phase>

      {/* ─── 03 · SHAPE (Summer 2025 → ongoing) ─── */}
      <Phase
        kind="shape"
        number="03"
        label="Shape"
        question="How do I honor what was already there?"
        takeaway="When design resonates, people across roles choose to nurture it. At launch, a member of the maintenance team volunteered to clean the pod, and I began stepping back."
        contribution="Led $30K donor outreach (NookPod, Density sensor, Schlage hardware, walnut wood). Authored first draft of all copy. Taught myself to vibe-code with Claude AI and shipped the Groundswell data visualization platform — a custom database-backed web app on Vercel + NEON, integrating Density and YouTube APIs."
      >
        <PhaseBeat label="Summer 2025 · Production" />

        <Artifact
          src={cloudVideo(GS_VIDEOS['gs-walkthrough-video'], 1600)}
          type="video"
          alt="Walkthrough of the Groundswell Restorative Pod"
          caption="The Restorative Pod — a dedicated space for emotional decompression, nestled in a space that once housed telephone booths."
        />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-cards'], 1200)}
          alt="Groundswell reflection cards"
          caption="Reflection cards. Emotional identification, validation, and somatic exercises. Every staff member received their own deck; one set lives in the pod."
        />

        <PhaseBeat label="October 2025 → ongoing · Study" />

        <DataNote
          stat="12"
          unit="month QI study underway"
          note="Measuring compassion fatigue, burnout, culture of well-being, and intent to leave — before, during, and after."
        />

        <LiveLink
          href="https://groundswell-admin-test.vercel.app/"
          label="See the data platform"
          title="Groundswell data visualization platform"
          external
        />
      </Phase>

      {/* ─── REFLECTION ───
          Three named principles. Each title IS the lesson; body is
          2–3 sentences in Lorin's voice. */}
      <Reflection
        principles={[
          {
            title: 'Listen for the language before you write any.',
            body: 'When staff first told me ‘grief’ was the wrong word, I treated it as a small note. It was a much bigger signal. The language a community already uses is the design brief; my job is to surface it, not invent a new one.',
          },
          {
            title: 'What looks like protocol is often someone’s quiet care.',
            body: 'I expected to redesign a cold institutional Ceased to Breathe email. What I found was a nurse manager’s compassion built into the system years before I arrived. From that point on I designed with the assumption that care was already there.',
          },
          {
            title: 'Resonance is a practice — Presence, Attunement, Harmonization.',
            body: 'Sustained relational engagement over time. Responsive listening across diverse perspectives. Amplifying existing community innovations rather than replacing them. This trio has reshaped how I approach every project.',
          },
        ]}
      />

      {/* ─── DEEP DIVE LINK ───
          The full project page lives at /projects/groundswell. Hiring
          managers who want depth click through. */}
      <section className={styles.deepDiveSection} aria-label="Continue reading">
        <div className={styles.deepDiveInner}>
          <p className={styles.deepDiveLabel}>Want the full story?</p>
          <Link href="/projects/groundswell" className={styles.deepDiveLink}>
            Visit the Groundswell project page
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </section>

      <Credits
        collaborators={[
          { name: 'Kristin Hughes, MFA', role: 'Professor, CMU School of Design · art direction, brand identity' },
          { name: 'Elijah Benzon', role: 'MA in Design, CMU' },
          { name: 'Sarah E. Taylor, MD, PhD', role: 'Co-Principal Investigator, UPMC' },
          { name: 'Greg Baltus', role: 'Fabrication & Hardware Assembly' },
          { name: 'Carolyn Gavin', role: 'Visual Artist · floral artwork' },
          { name: 'Catherine Liggett & Mark Staley', role: 'Meditation Voices' },
        ]}
        nextProject={{ title: 'BirthStory', href: '/projects/birthstory' }}
      />
    </article>
  )
}
