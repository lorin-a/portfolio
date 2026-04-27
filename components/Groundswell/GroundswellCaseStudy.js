import Image from 'next/image'
import {
  Hero,
  Context,
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

const PHASES = [
  { kind: 'research',   label: 'Research' },
  { kind: 'production', label: 'Production' },
  { kind: 'study',      label: 'Study' },
]
import { cloudImg, cloudVideo, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'

/**
 * Groundswell — Lorin-focused case study.
 *
 * Three-phase chronological structure (Research / Production / Study) matches
 * the project's 15-month arc and the source timeline doc's own framework.
 * Synthesis lives inside Research as a visually distinct sub-beat.
 *
 * Content seeded from docs/groundswell.md + the project timeline doc.
 * Quotes, takeaways, and frameworks use Lorin's verbatim words. First-person
 * paragraphs are flagged TODO for Lorin to write in voice.
 *
 * Credit precision: brand identity = Kristin Hughes; language pivot from
 * grief → restoration came from staff feedback in the language workshop;
 * fabrication = Greg Baltus. Don't claim these for Lorin.
 */
export default function GroundswellCaseStudy() {
  return (
    <article>
      <PhaseNav phases={PHASES} />

      <Hero
        eyebrow="Co-Design · Healthcare · Mental Health"
        title="Groundswell"
        tagline="Making Space to Restore, Together"
        role="Participatory Research · Co-Design · Copywriting · Project Coordination"
        year="2024–2025"
        collaborators="UPMC Magee-Womens Hospital · CMU School of Design"
      >
        <Image
          src={cloudImg(GS_IMAGES['gs-hero'], 1920)}
          alt="Groundswell installation in the Gynecologic Oncology corridor at UPMC Magee-Womens Hospital"
          fill
          sizes="100vw"
          priority
        />
      </Hero>

      {/* TODO Lorin: Context paragraph in your voice. 1–2 sentences. The
          human stakes — why this work mattered to you, not what the project is.
          The Phase 0 prelude line below is verbatim factual framing for now. */}
      <Context>
        Groundswell is a grant-funded ecosystem of emotional support for healthcare workers,
        developed in collaboration with the Gynecologic Oncology staff at UPMC Magee-Womens
        Hospital. It sits on top of two years of trust-building between Professor Kristin Hughes
        and the UPMC team that came before.
      </Context>

      {/* ─── COLD OPEN ───
          Full-viewport pinned quote scene. The first emotional moment of
          the case study. Staff voice carries the weight before any
          framework, evidence, or analysis arrives. */}
      <QuoteScene
        source="Oncology staff member"
        lines={[
          'A special person can do this work forever,',
          'a good person can do it for a little while,',
          "most people couldn’t do it for a day.",
        ]}
      />

      {/* ─── RESEARCH (15 weeks · Spring 2025) ─── */}
      <Phase
        kind="research"
        number="01"
        label="Research"
        question="What were oncology staff already carrying that no one was naming?"
        takeaway="We didn't arrive as outsiders with solutions. We showed up, listened, and stayed."
        contribution="Co-led and lead-designed the Grief Workshop — built the trauma-responsive container, scenarios, and facilitation that made staff comfortable enough to speak."
      >
        <DataNote
          stat="15"
          unit="weeks embedded"
          note="Shadowing shifts, holding workshops, listening before designing — with the Gynecologic Oncology team at UPMC Magee."
        />

        <DataNote
          stat="8"
          unit="staff interviewed"
          note="Across roles. A separate one-hour interview with a former Magee employee — through Lorin&rsquo;s personal connection — surfaced institutional dynamics current staff couldn&rsquo;t safely share."
        />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-workshop-grief-01'], 1200)}
          alt="Grief workshop with oncology staff — a soft stuffed animal placed at the center of the table"
          caption="Grief workshop. We opened with a trauma-responsive grounding exercise and provided a soft stuffed animal to hold. One participant said, &lsquo;We need more time with you guys.&rsquo;"
        />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-workshop-flower-01'], 1200)}
          alt="Nourishing the Flower workshop"
          caption="Nourishing the Flower. Staff used nature-based metaphors to identify what makes a workplace sustainable. Three themes surfaced: recognition, environment, and culture."
        />

        {/* ── Synthesis sub-beat: where listening turned into design intent ── */}
        <PhaseBeat label="Synthesis" />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-sense-affinity-01'], 1200)}
          alt="Affinity mapping session"
          caption="Affinity mapping. Hundreds of observations and quotes from interviews, shadowing, and workshops, organized through a tetrahedron analysis."
        />

        <Artifact
          src={cloudImg(GS_IMAGES['Synthesis-diagram'], 1200)}
          alt="Synthesis tetrahedron with The Void at the center"
          caption="The synthesis diagram. Four dimensions of staff well-being mapped against each other, with The Void at the center: the structural tension all four converge on."
        />

        <Framework
          label="Four dimensions of well-being"
          items={[
            { name: 'Recognition', description: 'feeling appreciated' },
            { name: 'Environment', description: 'workspace quality and wellbeing resources' },
            { name: 'Culture', description: 'positive team dynamics and workplace norms' },
            { name: 'Systemic', description: 'institutional constraints beyond individual control' },
          ]}
        />

        <Insight label="The Void">
          While patient-centered care aims to improve health outcomes, it often neglects the
          well-being of healthcare workers. In a profit-driven, hierarchical system that treats
          staff as disposable, the intense focus on patients comes at the cost of worker support,
          leading to burnout, poor recognition, and a toxic workplace culture.
        </Insight>

        <Quote context="A physician, after we proposed &lsquo;Making Space for Grief, Together&rsquo;">
          Oncology work involves more than grief. It encompasses hope, joy, exhaustion, and resilience.
        </Quote>

        <LiveLink
          href="https://www.figma.com/design/qmXOejgmdOtExNJVkXRvT8/Groundswell-Synthesis?node-id=0-1"
          label="Explore the synthesis"
          title="Interactive synthesis diagram in Figma"
          external
        />

        {/* TODO Lorin: 1–2 short paragraphs in voice — the listening + synthesis arc.
            Why staying long enough to identify The Void mattered, and how it changed
            the design intent toward "creating space for what was already there." */}
      </Phase>

      {/* ─── PRODUCTION (10 weeks · Summer 2025) ─── */}
      <Phase
        kind="production"
        number="02"
        label="Production"
        question="How do we honor what was already there?"
        takeaway="You have already built a culture of care. We are here to amplify it."
        contribution="Led $30K donor outreach campaign — secured the NookPod ($26K), Density sensor, Schlage locks, walnut wood, finger labyrinths, and printing through cold email and LinkedIn between June and August. Did first draft of all copy and collaborated with meditation teachers Catherine Liggett and Mark Staley on custom guided meditations."
      >
        {/* TODO Lorin: 1 short paragraph in voice — the 10-week sprint as your
            first experience with design production and launch in the real world. */}

        <Insight label="The CTB email">
          During production, a nurse manager tearfully disclosed that the existing
          Ceased to Breathe email was not a cold institutional protocol. It was her own
          quiet act of compassion, built years earlier to ensure colleagues learned of
          patient deaths with dignity. This revelation reshaped how we worked from then on.
        </Insight>

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

        <Artifact
          src={cloudImg(GS_IMAGES['gs-ctb-email'], 1200)}
          alt="Ceased to Breathe email template, redesigned with compassionate visuals and language"
          caption="The Ceased to Breathe email, redesigned. Compassionate visuals and language acknowledge the impact of patient loss on staff."
        />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-artwall'], 1200)}
          alt="Groundswell Garden community art wall"
          caption="The Garden — anonymous shared expression across the full spectrum of oncology experiences. Family caregivers and patients are intentionally included."
        />

        <DataNote
          stat="$30,000+"
          unit="in donated materials"
          note="NookPod ($26K). Walnut tabletop from donated wood. Custom meditations from Catherine Liggett and Mark Staley. Hardware from Schlage, Density, and others."
        />

        <DataNote
          stat="30+"
          unit="playtest participants"
          note="Retired nurses, UPMC administrators, design professors, mental health professionals, and designers. Testing surfaced three issues that drove rapid iteration: table depth, wayfinding, and the role of music as the opening cue."
        />
      </Phase>

      {/* ─── STUDY (Oct 2025 · ongoing) ─── */}
      <Phase
        kind="study"
        number="03"
        label="Study"
        question="What happens when we step back?"
        takeaway="When design resonates, people across roles choose to nurture it. At launch, a member of the maintenance team volunteered to clean the pod, and we began stepping back. This phase belongs to the community."
        contribution="Built the Groundswell data visualization platform. Taught myself to vibe-code with Claude AI and developed a custom database-backed web app (Vercel, NEON, Density and YouTube APIs) to communicate study findings, coordinating data integration with Density and feedback with UPMC. Team contributed art direction throughout."
      >
        <Artifact
          src={cloudImg(GS_IMAGES['gs-install-upmc'], 1600)}
          alt="Groundswell installed and active in the Gynecologic Oncology unit at UPMC Magee"
          caption="Groundswell in place. Pod, garden, and reflection cards installed in the Gynecologic Oncology unit at UPMC Magee-Womens Hospital, October 2025."
        />

        <DataNote
          stat="12"
          unit="month QI study"
          note="Now installed at UPMC Magee. We&rsquo;re measuring compassion fatigue, burnout, culture of well-being, and intent to leave — before, during, and after."
        />

        <DataNote
          stat="570"
          unit="engagements (first 4 months)"
          note="Minimum baselines. Methods designed to undercount rather than overcount."
        />

        {/* TODO Lorin: capture a screenshot or short screen recording of the
            data viz platform and add it as an Artifact above this LiveLink. */}
        <LiveLink
          href="https://groundswell-admin-test.vercel.app/"
          label="Explore the data"
          title="Groundswell data visualization platform"
          external
        />

        <DataNote
          stat="In review"
          note="Research paper currently under peer review: &ldquo;Re-aligning Design Values: Co-Creating Resonance Through Presence, Attunement, and Harmonization With Cancer Services Staff.&rdquo; A second paper on relationship clusters in the collaboration is in progress."
        />

        <DataNote
          stat="15"
          unit="minute sensor intervals"
          note="The Density sensor measures at 15-minute intervals — a real constraint on data granularity. We adjusted the data framework to match the system&rsquo;s actual capabilities rather than our original tracking ambitions."
        />

        <LiveLink
          href="/groundswell"
          label="See it in the field"
          title="Groundswell stakeholder site"
        />
      </Phase>

      {/* ─── REFLECTION ───
          TODO Lorin: rewrite all three in your voice. Drafts below are
          starting points seeded from themes in the doc. */}
      <Reflection
        differently="(Draft) When staff first told us &lsquo;grief&rsquo; was the wrong word, I treated it as a small note. It was a much bigger signal. Next time I&rsquo;d push for the language shift in week one, not week ten. I&rsquo;d also fight harder to keep the Steward Guide in scope; its absence created the communication gaps that surfaced months later."
        surprised="(Draft) The Ceased to Breathe email. I expected to redesign a cold clinical protocol. What I found was a nurse manager&rsquo;s quiet act of compassion that had already changed the culture from inside. That single discovery reshaped how we worked from then on."
        forward="(Draft) A practice I now call resonance: Presence (sustained relational engagement over time), Attunement (responsive listening across diverse perspectives), Harmonization (amplifying existing community innovations rather than replacing them). It has reshaped how I approach design."
      />

      <Credits
        collaborators={[
          { name: 'Kristin Hughes, MFA', role: 'Professor, CMU School of Design · art direction, brand identity' },
          { name: 'Elijah Benzon', role: 'MA in Design, CMU' },
          { name: 'Sarah E. Taylor, MD, PhD', role: 'Co-Principal Investigator, UPMC' },
          { name: 'Greg Baltus', role: 'Fabrication & Hardware Assembly · pod build, doors, lighting' },
          { name: 'Carolyn Gavin', role: 'Visual Artist · floral artwork across components' },
          { name: 'Catherine Liggett & Mark Staley', role: 'Meditation Voices' },
          { name: 'Kelly McDowell', role: 'Research Assistant, CMU' },
          { name: 'Robertus Sucahyo', role: 'Project Development, CMU' },
        ]}
        nextProject={{ title: 'BirthStory', href: '/projects/birthstory' }}
      />
    </article>
  )
}
