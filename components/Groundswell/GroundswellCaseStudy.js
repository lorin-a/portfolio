import Image from 'next/image'
import {
  HeroCinematic,
  StickyScene,
  CaseStudyProgress,
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
import { cloudImg, cloudVideo, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'

const PHASES = [
  { kind: 'sense', label: 'Sense' },
  { kind: 'weave', label: 'Weave' },
  { kind: 'shape', label: 'Shape' },
]

/**
 * Groundswell — Lorin-focused case study.
 *
 * Three-phase methodological structure (Sense → Weave → Shape) maps onto
 * the project's 15-month chronological arc:
 *   Sense  — Spring 2025, 15 weeks embedded with the Gynecologic Oncology
 *            team. Listening, shadowing, workshops.
 *   Weave  — late Spring 2025, synthesis. Affinity mapping, the
 *            tetrahedron, The Void, the language pivot.
 *   Shape  — Summer 2025 → ongoing. Production of the ecosystem,
 *            installation, and a 12-month QI study.
 *
 * Storytelling philosophy gates the writing here:
 *   1. Phase H2s are claim sentences (Lorin's voice), not category labels.
 *      Framework word lives in the small-caps eyebrow above each H2.
 *   2. First-person `I` throughout. `we` only when explicitly attributing
 *      a collaborator's contribution.
 *   3. PhaseBeat is used as a chronological sub-anchor inside each phase
 *      so the 15-month arc surfaces inside the methodology.
 *   4. One mid-phase pull-quote per phase, placed at the decision moment.
 *   5. The closing Reflection renders three named principles — the
 *      titles ARE the lessons; bodies are 2–3 sentences in Lorin's voice.
 *   6. The Sense → Weave handoff is staged as a StickyScene split-screen
 *      featuring the language pivot — the moment listening became
 *      synthesis.
 *
 * Credit precision: brand identity = Kristin Hughes; language pivot from
 * grief → restoration came from staff feedback in the language workshop;
 * fabrication = Greg Baltus. Don't claim these for Lorin.
 */
export default function GroundswellCaseStudy() {
  return (
    <article>
      <CaseStudyProgress />
      <PhaseNav phases={PHASES} />

      <HeroCinematic
        eyebrow="Co-Design · Healthcare · Mental Health"
        title="Groundswell"
        tagline="Making Space to Restore, Together"
        meta={{
          role: 'Participatory Research · Co-Design · Copywriting · Project Coordination',
          client: 'UPMC Magee-Womens Hospital',
          year: '2024–2025',
          category: 'Healthcare · Mental Health',
          team: 'CMU School of Design',
          duration: '15 months',
        }}
      >
        {/* Three-frame carousel: place → unit → intimate detail. Pulls
            the reader into the world before the title resolves. */}
        <Image
          src={cloudImg(GS_IMAGES['gs-hero'], 1920)}
          alt="Groundswell installation in the Gynecologic Oncology corridor at UPMC Magee-Womens Hospital"
          fill
          sizes="100vw"
          priority
        />
        <Image
          src={cloudImg(GS_IMAGES['gs-install-upmc'], 1920)}
          alt="Groundswell installed in the unit — pod, garden, and reflection cards in place"
          fill
          sizes="100vw"
        />
        <Image
          src={cloudImg(GS_IMAGES['gs-artwall'], 1920)}
          alt="The Garden — community art wall close-up"
          fill
          sizes="100vw"
        />
      </HeroCinematic>

      {/* TODO Lorin: rewrite Context in your voice. 1–2 sentences naming
          the human stake — why this work mattered to YOU, not what the
          project is. The factual line below is scaffolding only and
          should not ship as the opener. */}
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

      {/* ─── 01 · SENSE (Spring 2025 · 15 weeks embedded) ───
          Listening. Shadowing. Workshops. The phase H2 is a Lorin-voiced
          claim/question — not a category label. */}
      <Phase
        kind="sense"
        number="01"
        label="Sense"
        question="What were oncology staff already carrying that no one was naming?"
        takeaway="I didn't arrive as an outsider with solutions. I showed up, listened, and stayed."
        contribution="Co-led and lead-designed the Grief Workshop — built the trauma-responsive container, scenarios, and facilitation that made staff comfortable enough to speak."
      >
        <PhaseBeat label="Week 1–4 · Embedding" />

        <DataNote
          stat="15"
          unit="weeks embedded"
          note="Shadowing shifts, holding workshops, listening before designing — with the Gynecologic Oncology team at UPMC Magee."
        />

        <DataNote
          stat="8"
          unit="staff interviewed"
          note="Across roles. A separate one-hour interview with a former Magee employee — through my personal connection — surfaced institutional dynamics current staff couldn&rsquo;t safely share."
        />

        <PhaseBeat label="Week 5–9 · Workshops" />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-workshop-grief-01'], 1200)}
          alt="Grief workshop with oncology staff — a soft stuffed animal placed at the center of the table"
          caption="Grief workshop. I opened with a trauma-responsive grounding exercise and provided a soft stuffed animal to hold. One participant said, &lsquo;We need more time with you guys.&rsquo;"
        />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-workshop-flower-01'], 1200)}
          alt="Nourishing the Flower workshop"
          caption="Nourishing the Flower. Staff used nature-based metaphors to identify what makes a workplace sustainable. Three themes surfaced: recognition, environment, and culture."
        />

        {/* TODO Lorin: 1 short paragraph in voice — the listening arc.
            Why staying long enough to be told 'grief' was the wrong word
            was the design brief, not a footnote. */}
      </Phase>

      {/* ─── FEATURED BEAT · The language pivot ───
          Split-screen sticky scene. The moment Sense became Weave: when
          staff named 'grief' as the wrong word, the synthesis began.
          Decision-moment pull-quote in the sticky column carries the
          peak; scrolling media on the right walks the reader through
          the workshop, the synthesis, and the language I landed on. */}
      <StickyScene
        theme="cream"
        label="Week 10 · The pivot"
        title="Staff said grief wasn’t the right word. The brief changed."
        lead="I had pitched the project as ‘Making Space for Grief, Together.’ A physician pulled me aside afterward, and the language reframed the whole design intent."
        pullQuote="Oncology work involves more than grief. It encompasses hope, joy, exhaustion, and resilience."
        pullQuoteCite="— A physician, after the proposal"
      >
        <Artifact
          src={cloudImg(GS_IMAGES['gs-sense-affinity-01'], 1200)}
          alt="Affinity mapping session"
          caption="Affinity mapping after the workshops. Hundreds of observations and quotes from interviews, shadowing, and workshops, organized through tetrahedron analysis."
        />
        <Artifact
          src={cloudImg(GS_IMAGES['Synthesis-diagram'], 1200)}
          alt="Synthesis tetrahedron with The Void at the center"
          caption="The synthesis diagram. Four dimensions of staff well-being mapped against each other, with The Void at the center."
        />
      </StickyScene>

      {/* ─── 02 · WEAVE (late Spring 2025 · synthesis) ───
          Synthesis. The tetrahedron. The Void. The framework that
          changed how the project's design intent was scoped. */}
      <Phase
        kind="weave"
        number="02"
        label="Weave"
        question="What was the structural tension everything else circled around?"
        takeaway="Naming The Void let me design with the staff, not for them."
        contribution="Authored the synthesis: the four-dimension framework and the tetrahedron analysis that named The Void as the structural tension underneath all four dimensions of well-being."
      >
        <PhaseBeat label="Synthesis" />

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

        <Quote context="A physician, after I proposed &lsquo;Making Space for Grief, Together&rsquo;">
          Oncology work involves more than grief. It encompasses hope, joy, exhaustion, and resilience.
        </Quote>

        <LiveLink
          href="https://www.figma.com/design/qmXOejgmdOtExNJVkXRvT8/Groundswell-Synthesis?node-id=0-1"
          label="Explore the synthesis"
          title="Interactive synthesis diagram in Figma"
          external
        />

        {/* TODO Lorin: 1–2 short paragraphs in voice — why naming The
            Void changed the design intent toward 'creating space for
            what was already there.' */}
      </Phase>

      {/* ─── 03 · SHAPE (Summer 2025 → ongoing) ───
          Production + Study. Making the ecosystem, installing it,
          measuring it, and stepping back. */}
      <Phase
        kind="shape"
        number="03"
        label="Shape"
        question="How do I honor what was already there?"
        takeaway="When design resonates, people across roles choose to nurture it. At launch, a member of the maintenance team volunteered to clean the pod, and I began stepping back. This phase belongs to the community."
        contribution="Led $30K donor outreach campaign — secured the NookPod ($26K), Density sensor, Schlage locks, walnut wood, finger labyrinths, and printing through cold email and LinkedIn. Authored first draft of all copy and collaborated with meditation teachers Catherine Liggett and Mark Staley on custom guided meditations. Built the Groundswell data visualization platform: taught myself to vibe-code with Claude AI and developed a custom database-backed web app (Vercel, NEON, Density and YouTube APIs) to communicate study findings."
      >
        <PhaseBeat label="Summer 2025 · Production" />

        {/* TODO Lorin: 1 short paragraph in voice — the 10-week sprint
            as my first experience with design production and launch in
            the real world. */}

        <Insight label="The CTB email">
          During production, a nurse manager tearfully disclosed that the existing
          Ceased to Breathe email was not a cold institutional protocol. It was her own
          quiet act of compassion, built years earlier to ensure colleagues learned of
          patient deaths with dignity. This revelation reshaped how I worked from then on.
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

        <PhaseBeat label="October 2025 → ongoing · Study" />

        <Artifact
          src={cloudImg(GS_IMAGES['gs-install-upmc'], 1600)}
          alt="Groundswell installed and active in the Gynecologic Oncology unit at UPMC Magee"
          caption="Groundswell in place. Pod, garden, and reflection cards installed in the Gynecologic Oncology unit at UPMC Magee-Womens Hospital, October 2025."
        />

        <DataNote
          stat="12"
          unit="month QI study"
          note="Now installed at UPMC Magee. The team is measuring compassion fatigue, burnout, culture of well-being, and intent to leave — before, during, and after."
        />

        <DataNote
          stat="570"
          unit="engagements (first 4 months)"
          note="Minimum baselines. Methods designed to undercount rather than overcount."
        />

        {/* TODO Lorin: capture a screenshot or short screen recording of
            the data viz platform and add it as an Artifact above this
            LiveLink. */}
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
          note="The Density sensor measures at 15-minute intervals — a real constraint on data granularity. I adjusted the data framework to match the system&rsquo;s actual capabilities rather than my original tracking ambitions."
        />

        <LiveLink
          href="/groundswell"
          label="See it in the field"
          title="Groundswell stakeholder site"
        />
      </Phase>

      {/* ─── REFLECTION ───
          Three named principles. Each title IS the lesson. Body is
          2–3 sentences in Lorin's voice. Drafts below are starting
          points seeded from themes in the doc — TODO Lorin to revise
          in voice before shipping. */}
      <Reflection
        principles={[
          {
            title: 'Listen for the language before you write any.',
            body: '(Draft) When staff first told me ‘grief’ was the wrong word, I treated it as a small note. It was a much bigger signal. The language a community already uses is the design brief; mine is to surface it, not invent a new one.',
          },
          {
            title: 'What looks like protocol is often someone’s quiet care.',
            body: '(Draft) I expected to redesign a cold institutional Ceased to Breathe email. What I found was a nurse manager’s compassion built into the system years before I arrived. From that point on I designed with the assumption that care was already there.',
          },
          {
            title: 'Resonance is a practice — Presence, Attunement, Harmonization.',
            body: '(Draft) Sustained relational engagement over time. Responsive listening across diverse perspectives. Amplifying existing community innovations rather than replacing them. This trio has reshaped how I approach every project.',
          },
        ]}
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
