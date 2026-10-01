'use client'

import { FieldSection, Prose, SubBlock, Split, Figure, TesterNote, sys } from './kit'
import { cloudImg } from '@/lib/cloudinary'
import ProductAct from './ProductAct'
import IaAria from './IaAria'
import SecIteration from './SecIteration'
import SecBrand from './SecBrand'
import BirthStorySpine from './BirthStorySpine'
import b from './BirthStoryBody.module.css'

/* Two acts (N23). The product happens once, up top, unnumbered — a different
   register. The process follows as five numbered chapters.

   THE SPINE AFTER THE EDITORIAL CUT (N45). Brief is gone — it was the
   assignment she was handed, not her work, and nothing in her hiring-manager
   research asks for it. Research and Architecture are two chapters again: the
   N43 merge existed because Research had no artifact of its own, and the cut
   dissolved that premise — the artifact turned out to be the voice. Each
   chapter is now one statement and one thing. */
const SPINE = [
  { id: 'product', label: 'The product', ids: ['product', 'product-1', 'product-2', 'product-3', 'product-4', 'product-5'] },
  { id: 'research', label: 'Research', num: '01', ids: ['research'] },
  { id: 'architecture', label: 'Architecture', num: '02', ids: ['architecture'] },
  { id: 'iteration', label: 'Iteration', num: '03', ids: ['iteration'] },
  { id: 'voice', label: 'Identity', num: '04', ids: ['voice', 'brand'] },
  { id: 'outcome', label: 'Outcome', num: '05', ids: ['outcome', 'close'] },
]

/* Overview — the at-a-glance masthead a hiring manager reads first. An editorial
   summary, not a corporate fact grid: the statement, the metadata, the synopsis.
   Sits between the hero and the spine; the spine still tracks the 9 process beats. */
function Overview() {
  const meta = [
    ['Role', 'My partner Michael and I co-led research and information architecture. I led UX/UI, visual identity, and UX writing.'],
    ['Brief', 'Pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.'],
    ['Context', <>6-week graduate studio at Carnegie Mellon, taught by the founders of <a href="https://dezudio.com/" target="_blank" rel="noopener noreferrer">Dezudio</a>, Myana’s design partner</>],
    ['Client', <><a href="https://apps.apple.com/us/app/myana-pa/id6752866138" target="_blank" rel="noopener noreferrer">Myana</a>, a maternal-health platform co-developed by researchers at the University of Pittsburgh</>],
    ['Method', '5 parent interviews, 3 think-aloud protocols (TAP), 3 wireframe rounds'],
    ['Outcome', 'Strong client validation; sponsored to possibly inform future Myana versions'],
    ['Build', 'Concept. Wireframes in Figma, prototypes here built with Claude Code'],
  ]
  return (
    <section className={b.overview}>
      <div className={b.overviewInner}>
        <dl className={b.overviewMeta}>
          {meta.map(([k, v]) => (
            <div key={k} className={b.metaItem}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* the four-screen overture wall is retired (N25). It was the product told thin,
   ahead of the product told deep — the same story twice. The product now happens
   ONCE, in ProductAct, directly under the metadata; its orienting line ("It opens
   into documenting…") moved there verbatim. */

/* ════════════════════════════════════════════════════════════════════════════
   THE PROCESS HALF, REBUILT ON HER OWN HIRING-MANAGER RESEARCH (N45).

   Three passes at this stretch were rejected. The fourth stopped designing and
   went and read `docs/deck-system/research/hm-rubrics-formats.md` and the
   Question Map in `docs/DECK_SYSTEM.md` — her own research, collected in July.

   What it says, in weight order: decision rationale (the WHY) · role clarity
   (ambiguity is a stated disqualifier) · impact with evidence (the strongest
   seniority discriminator). PROCESS RANKS FOURTH, and only "as evidence of
   thinking, not documentation volume." The #2 failure mode across every source
   is "process dump / over-contextualizing / slow wind-up." Screening is two to
   three minutes per portfolio, some under one.

   And her own approved deck spec says the cold open is the punchline — Q7
   first. So the process half now opens on the answer instead of arriving at it
   eleven thousand pixels down.

   CUT ENTIRELY, because nothing in her research asks for any of it: the Brief
   chapter (the assignment she was handed, not her work — its one useful line is
   now a metadata row), THE STAKES (80/65/3× — figures from the brief, and a
   stat panel is how every student case study opens), THE SPEC (required vs
   provided), the SCOPING tally, and the four DESIGN PRINCIPLES (claims, not
   evidence). All recoverable from git; all logged in STATUS.
   ════════════════════════════════════════════════════════════════════════════ */

/* ── 01 · THE FINDING — the punchline, first ─────────────────────────────────
   Q7 is the highest-weighted item on the rubric and had been the case study's
   weakest beat since July, sitting in the docs as [LORIN TO WRITE]. This is her
   answer, verbatim (2026-08-04), with only the "maybe it's the thesis that"
   hedge trimmed at her instruction and a comma added to a long conditional.

   It earns the opening because it is a claim about what the research FOUND,
   not about how the work was received — and the evidence for it is measurable:
   the brief listed Sharing and Partner Participation as two of five OPTIONAL
   features, and the shipped architecture made Care Pod one of five primary
   tabs. The ia-final diagram in the next chapter proves it at a glance, which
   is why the proof is annotated there rather than restated here. */
function Finding() {
  return (
    <FieldSection
      id="research" num="01" crumb="research" when="Weeks 1–2" wide
      arc="#DBADAD"
      statement={<>If we did not learn about the importance of the <b>collective experience</b> of the birth as well as the individual, we may have missed a crucial aspect of the ecosystem.</>}
      statementLong
    >
      {/* THE EVIDENCE, DIRECTLY UNDER THE CLAIM. Her Q7 answer is not
          rhetorical and it does not need a graphic — the promotion IS the
          impact, and it can be stated in one line and then proved by the
          shipped architecture in the next chapter. Both halves are facts
          already on the page: the brief's optional list, and ia-final's tabs. */}
      <p className={`${b.proof} ${sys.up}`}>
        The brief listed <b>sharing</b> and <b>partner participation</b> as two of five optional
        features. Care Pod shipped as one of five tabs.
      </p>

      <div className={`${sys.measure} ${b.researchRow}`}>
        <div className={`${sys.colsReading} ${b.researchRead} ${sys.up}`}>
          <Prose>
            Before we built anything, I researched blogs and existing products and ran information
            interviews with family to get familiar with the subject: my three sisters, my mom, and my
            friend with a toddler.
          </Prose>
          <Prose>
            My thinking was rooted in my close family members’ traumatic experiences, which led me to a
            trauma-informed approach. I wanted the right balance between the individual feat of giving
            birth and the collective experience around it, with an interaction matched to a new parent’s
            capacity. So I left medical documentation optional and, by the final iteration, built the
            design around events on a timeline.
          </Prose>
          {/* her stake in it — the only thing kept from the retired Brief. It is
              rank 9 on the rubric ("the flavor of you") and it is why she is
              credible on this subject at all. */}
          <Prose>
            Supporting mothers is personal for me. I come from a matriarchal family that has a history
            of complicated births. While interviewing my family members, I understood for the first
            time how traumatic their experiences were.
          </Prose>
        </div>

        {/* THE VOICE IS THE ARTIFACT. What stood here was a group text simulated
            in JSX — a drawn interface standing in for research that happened on
            a real call. A prop, not an artifact. What research actually leaves
            behind is a person's words, at the size they deserve. */}
        <div className={`${sys.colsArtifact} ${b.voicePlane} ${sys.up}`}>
          <blockquote className={b.bigQuote}>
            <p>
              None of our births went according to plan and they were traumatizing, and it doesn’t get
              discussed enough.
            </p>
            <cite>One of my sisters · the quote verbatim</cite>
          </blockquote>
          <ul className={b.asks}>
            <li>Less medical documentation. More photos, and an outline of what actually happened.</li>
            <li>Recognition for doing something this amazing and this hard.</li>
            <li>A space that doesn’t assume a “normal” birth: other people’s stories, resources.</li>
          </ul>
          <p className={b.asksNote}>
            What my three sisters, my mom, and a friend with a toddler asked for, summarized.
          </p>
        </div>
      </div>
    </FieldSection>
  )
}

/* ── 02 · ARCHITECTURE — the proof she acts on research ──────────────────────
   One statement, one artifact. Q4 (why this approach, what did you reject) and
   Q5 (how evidence became decisions) are ranks 1 and 4 on the rubric, and this
   single object answers both: a rejected first version, the count, and what
   shipped, with the tester findings hung on the columns they produced. */
function Architecture() {
  return (
    <FieldSection
      id="architecture" num="02" crumb="information architecture" when="Week 3" alt wide
      arc="#B1C1F4"
      statement={<>New parents recovering from birth have limited capacity, which made the introduction, onboarding, and user flow <b>make-or-break</b>: they decide how a parent spends their few precious free moments.</>}
      statementLong
    >
      <IaAria />
    </FieldSection>
  )
}

function Voice() {
  return (
    <FieldSection
      id="voice" num="04" crumb="ux writing" when="Week 5" alt wide
      arc="#6D8F99"
      statement={<>The copy is trauma-informed without <b>assuming</b> trauma.</>}
    >
      <Split
        text={
          <>
            <Prose>
              Because I knew births could be traumatic, I wrote the first copy in a careful,
              trauma-informed tone, and a parent I interviewed showed me I had gone too far. She didn’t connect with
              the word “reclaim,” and it made me realize I was leaning on the hard parts, missing how
              much a birth can also be about connection. I didn’t want the words to decide the experience
              for anyone.
            </Prose>
            <Prose>
              So I rewrote toward connection and left room for people to bring their own tone. Same for
              “Find strength &amp; support” as a feature name: it positioned the new mother in a negative
              light, when in fact most are empowered by doing an amazing and hard thing. It became
              the Care Pod.
            </Prose>
            <Prose>
              The next thing I’d do is balance the reflection prompts so they reach for joy as readily
              as they make room for distress.
            </Prose>
          </>
        }
      >
        {/* the copy work grounded on the identity gradient veil — the same
            designed surface as the feature stages, so the tester note and the
            revision panel sit ON something instead of floating in white */}
        <div className={b.voicePanel}>
        <TesterNote
          quote="Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative."
          who="Parent interview"
          kicker="a parent said"
        />
        <div className={`${b.revisions} ${sys.up}`}>
          <span className={b.revTag}>revisions</span>
          <div className={b.revRow}>
            <div className={b.revCell}>
              <span className={b.copyLabel}>draft</span>
              <p className={b.draftLine}>“Reclaim your narrative.”</p>
            </div>
            <span className={b.revArrow} aria-hidden="true">→</span>
            <div className={b.revCell}>
              <span className={b.copyLabel}>rewrite</span>
              <p className={b.rewriteLine}>“A space to make sense of it, in your own words.”</p>
            </div>
          </div>
          <div className={b.revRow}>
            <div className={b.revCell}>
              <span className={b.copyLabel}>draft</span>
              <p className={b.draftLine}>“Find strength &amp; support”</p>
            </div>
            <span className={b.revArrow} aria-hidden="true">→</span>
            <div className={b.revCell}>
              <span className={b.copyLabel}>rewrite</span>
              <p className={b.rewriteLine}>“Care Pod”</p>
            </div>
          </div>
        </div>
        </div>
      </Split>
    </FieldSection>
  )
}

function Outcome() {
  return (
    <FieldSection
      id="outcome" num="05" crumb="outcome" when="Week 6" alt wide
      arc="#3E5E6A" arcInk="30%"
      statement={<>The client loved it, and it still isn’t getting built.</>}
    >
      <Split
        text={
          <>
            <Prose>
              When we presented, the client had almost nothing to change. There’s no real signal the app
              will get built: Myana sponsored the project because it might inform future versions of
              their product, and the pitch was probably as much for us as for them, but it gave the
              concept a real starting point.
            </Prose>
            <blockquote className={`${b.quote} ${sys.up}`}>
              “I wish this could be real right now!”
              <span className={b.quoteAttr}>Sarah Burns, MSW, LSW · client</span>
            </blockquote>
          </>
        }
      >
        <Figure
          photo
          tag="final review"
          src={cloudImg('IMG_3012', 1600)}
          alt="The studio team standing together in front of the projector screen, with our client Sarah Burns smiling on the video call behind them."
          cap="The team and our client, Sarah Burns, at the final review."
        />
      </Split>
    </FieldSection>
  )
}

function Close() {
  return (
    <FieldSection id="close" crumb="reflection" when="In hindsight" sub arc="#3E5E6A">
      {/* Reflection = the bookend (Lorin's call, option B). The three retrospective
          paragraphs were cut — they read stale, and the "still a concept / built
          with AI" honesty already lives in Overview → Build and the hero. The teal
          block reprises the brand and carries the closing thought + the proof line
          (both composed from her interview words, hers to bless) plus the way to reach her. */}
      <div className={b.coda}>
        <div className={`${b.codaInner} ${sys.up}`}>
          <div className={b.codaText}>
            <p className={b.codaLine}>
              I’m a big dreamer. I try to do everything first, then narrow and narrow until I get to
              the heart of it.
            </p>
            <p className={b.codaSub}>
              Designing something and then being able to build it myself is the direction I’m headed.
              The working prototypes on this page are that proof.
            </p>
          </div>
          <div className={b.codaActions}>
            <a className={b.codaCta} href="mailto:lorinanderberg1@gmail.com">Get in touch</a>
            <a className={b.codaAlt} href="/">See more work</a>
          </div>
        </div>
      </div>

      <dl className={`${b.colophon} ${sys.up}`}>
        <div className={b.colRow}>
          <dt>Consent</dt>
          <dd>Participant quotes appear with their consent; names are withheld.</dd>
        </div>
        <div className={b.colRow}>
          <dt>Tools</dt>
          <dd>Figma (wireframes and visual design) · Claude Code (the working prototypes on this page)</dd>
        </div>
        <div className={b.colRow}>
          <dt>Icons</dt>
          <dd>SVG Repo</dd>
        </div>
        <div className={b.colRow}>
          <dt>Photography</dt>
          <dd>Saul Siguenza, Craig Adderley, Narmin Aslanli, and Jonathan Borba, via Pexels · moodboard imagery via Unsplash · studio and review photos, CMU IXD Studio</dd>
        </div>
      </dl>
    </FieldSection>
  )
}

export default function BirthStoryBody() {
  return (
    <div className={sys.case}>
      {/* act one — the metadata masthead, then the product, immersive (N24/N25) */}
      <Overview />
      {/* the spine sticks from here down, so it tracks BOTH acts */}
      <BirthStorySpine sections={SPINE} />
      <ProductAct />
      {/* act two — the process, punchline first (N45) */}
      <Finding />
      <Architecture />
      <SecIteration />
      <Voice />
      <SecBrand />
      <Outcome />
      <Close />
    </div>
  )
}
