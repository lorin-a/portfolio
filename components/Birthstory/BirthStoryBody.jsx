'use client'

import { FieldSection, Prose, SubBlock, Split, Figure, TesterNote, Insight, sys } from './kit'
import { cloudImg } from '@/lib/cloudinary'
import ProductAct from './ProductAct'
import IaAria from './IaAria'
import SecIteration from './SecIteration'
import SecBrand from './SecBrand'
import BirthStorySpine from './BirthStorySpine'
import b from './BirthStoryBody.module.css'

/* Two acts (N23). The product happens once, up top, unnumbered — a different
   register. The process follows as five numbered chapters.

   THE SPINE AFTER THE MERGE (N43). Research and Architecture were one argument
   told twice — findings as a text grid, then the same findings as a drawing —
   so they are one chapter now, and the freed number goes to Iteration, which
   holds nine artifacts and had been running as an unnumbered subsection under
   Architecture. That also settles the live bug where Voice was authored 05 and
   Outcome 06 while this spine relabelled them 04 and 05: the numbers now agree
   in both places. */
const SPINE = [
  { id: 'product', label: 'The product', ids: ['product', 'product-1', 'product-2', 'product-3', 'product-4', 'product-5'] },
  { id: 'brief', label: 'Brief', num: '01', ids: ['brief'] },
  { id: 'research', label: 'Research & Architecture', num: '02', ids: ['research'] },
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

/* ── THE STAKES ─────────────────────────────────────────────────────────────
   Two of these figures are shares of the same whole, so they share one 0–100
   track and can be read against each other. The third is a ratio, not a share —
   plotting it on the same track would be a lie about the scale — so it sits
   below as the comparison it actually is, one bar against three. Her figures and
   her source line, verbatim. */
const SHARES = [
  { pct: 80, text: 'of U.S. maternal deaths are preventable' },
  { pct: 65, text: 'happen after delivery' },
]

function Stakes() {
  return (
    <section aria-labelledby="brief-stakes">
      <div>
        <p className={b.specLabel} id="brief-stakes">The stakes</p>
        <div className={b.stakeChart}>
          {SHARES.map((s) => (
            <div className={b.stakeShare} key={s.pct}>
              <span className={b.stakeFig}>{s.pct}%</span>
              <span className={b.stakeTrack} aria-hidden="true">
                <span className={b.stakeFill} style={{ '--pct': `${s.pct}%` }} />
              </span>
              <span className={b.stakeText}>{s.text}</span>
            </div>
          ))}
          <div className={b.stakeRatio}>
            <span className={b.stakeFig}>3×</span>
            <span className={b.stakeBars} aria-hidden="true">
              <span className={b.stakeUnit} />
              <span className={`${b.stakeUnit} ${b.stakeUnitThree}`} />
            </span>
            <span className={b.stakeText}>the risk for Black mothers</span>
          </div>
        </div>
        <p className={b.stakeSource}>A dangerous, under-supported window. <b>Figures from the project brief.</b></p>
      </div>
    </section>
  )
}

/* ── THE SPEC ───────────────────────────────────────────────────────────────
   Both tracks measure the same total width; only the subdivision differs. Three
   solid blocks against five hollow ones reads, before a single word of it is
   read, as three things to solve and five to choose among. Her wording
   throughout — the required areas keep their names and their one-line
   definitions, the optional features keep theirs. */
const REQUIRED = [
  ['Information gathering', 'Medical info, contextual info, the birth narrative, and feelings.'],
  ['Meaning making', 'Processing through positive retelling, without re-traumatizing.'],
  ['App administration', 'Profile and onboarding, plus nudges that prompt capture.'],
]
const OPTIONAL = ['Baby Book', 'Trackers', 'Birth Plan', 'Sharing', 'Partner Participation']

function Spec() {
  return (
    <section aria-label="What the brief required and provided">
      <div className={b.specTrack}>
        <p className={b.specLabel}>Required</p>
        <ul className={b.specSolid}>
          {REQUIRED.map(([name, def]) => (
            <li key={name}>
              <b>{name}</b>
              <span>{def}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={b.specTrack}>
        <p className={b.specLabel}>Provided</p>
        <ul className={b.specHollow}>
          {OPTIONAL.map((name) => <li key={name}>{name}</li>)}
        </ul>
        <p className={b.specGiven}>The name, Birth Story, and the core concept.</p>
      </div>
    </section>
  )
}

function Brief() {
  return (
    <FieldSection
      id="brief" num="01" crumb="brief" when="Week 1" wide
      arc="#DBADAD"
      statement={<>Pitch a concept for Myana’s companion micro-app that helps parents <b>document and reflect</b> on their birth experience.</>}
      statementLong
    >
      {/* ONE SHEET, not four stacked bands.

          The first build made this a sequence — block, gap, block, gap — and a
          sequence has to be fed. With this little content that meant inflating
          it to fill the bands, which is exactly what she caught: "stretching out
          sparse content and trying to make it interesting."

          But a brief is not a sequence. It is a DOCUMENT you take in at once.
          So the chapter is one composed sheet on the established row geometry:
          the words left, and the brief itself — the spec and the stakes — as the
          artifact on the right. Everything visible together, read in about ten
          seconds, and then out of the way so the actual work starts at Research.
          The artifact for the one chapter that contains none of her work is the
          ask she was handed. */}
      <div className={`${sys.measure} ${b.briefSheet}`}>
        <div className={`${sys.colsReading} ${b.briefRead} ${sys.up}`}>
          <Prose>
            Myana already supports parents through pregnancy and postpartum. Its researchers saw that
            the birth itself still went undocumented and unprocessed, and brought that gap to our
            graduate studio to conceptualize.
          </Prose>
          <a
            className={b.myanaRef}
            href="https://apps.apple.com/us/app/myana-pa/id6752866138"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={b.myanaIcon} src="/images/birthstory/myana-icon.jpg" alt="" loading="lazy" draggable="false" />
            <span className={b.myanaText}>
              <span className={b.myanaTag}>The app it companions</span>
              <span className={b.myanaName}>Myana <span className={b.myanaLink}>View on the App Store&nbsp;↗</span></span>
            </span>
          </a>

          {/* Round 4 trail cuts: the night-nanny elaboration and closing line
              demoted out (her standing cut-not-paraphrase permission); the
              review photo cut — the Outcome chapter carries the stronger
              final-review shot with the client quote */}
          <div className={b.briefConnection}>
          <SubBlock label="My connection">
            <Prose>
              Supporting mothers is personal for me. I come from a matriarchal family that has a history
              of complicated births. While interviewing my family members, I understood for the first
              time how traumatic their experiences were.
            </Prose>
          </SubBlock>
          </div>
        </div>

        {/* THE ARTIFACT PLANE — the brief itself. THE SPEC is what she was
            handed: three obligations against five choices, both tracks the same
            total width so the subdivision IS the information, which also sets up
            Architecture's kept / added / cut. THE STAKES is why any of it
            matters, drawn as the proportions the figures actually are. */}
        <div className={`${sys.colsArtifact} ${b.briefDoc} ${sys.up}`}>
          <Spec />
          <Stakes />
        </div>
      </div>
    </FieldSection>
  )
}

/* ── THE THREE MOMENTS ──────────────────────────────────────────────────────
   This was buried in a bordered aside beside the chat card, which is where the
   chapter's own CLAIM was hiding: the statement says capacity rises over time
   and the app had to meet three moments, and this is the evidence for exactly
   that. Claim and proof were separated by an artifact; they belong together.

   Drawn so the shape carries it — three beats on one time axis with a capacity
   bar that grows a third, two thirds, whole. Cover the words and it still says
   "it rises." Her phases and her wording, untouched. */
const MOMENTS = [
  ['Early, in the fog', 'Select-one answers, a few taps at a time.'],
  ['Later, once it lifts', 'Free-form journaling, at their own pace.'],
  ['In the end', 'A keepsake book of the whole story.'],
]

/* (b.momentsWrap had no rule behind it and was printing a literal "undefined"
   class into the DOM — dropped) */
function ThreeMoments() {
  return (
    <section className={`${sys.measure} ${sys.up}`} aria-labelledby="research-moments">
      <div className={sys.colsFull}>
        <p className={b.specLabel}>How they’d use it</p>
        {/* her Research chapter statement, demoted from an h2 to the lede of
            the one graphic that proves it. The merge left the chapter with a
            single thesis, and this sentence was never really the chapter's — it
            was this staircase's caption all along. Verbatim. */}
        <h3 className={b.momentsClaim} id="research-moments">
          Capacity rises over time, so the app had to meet <b>three different moments</b>, not one.
        </h3>
        <ol className={b.moments}>
          {MOMENTS.map(([when, what], i) => (
            <li key={when} className={b.moment}>
              <span className={b.momentBar} aria-hidden="true">
                <span className={b.momentFill} style={{ '--grow': `${((i + 1) / 3) * 100}%` }} />
              </span>
              <span className={b.momentWhen}>{when}</span>
              <span className={b.momentWhat}>{what}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── THE SCOPING DECISION ───────────────────────────────────────────────────
   Relocated here from Architecture, minus its lead paragraph, which restated
   Brief's SPEC almost word for word ("Three areas were required…"). Brief
   already draws that as three solid blocks against five hollow ones; this is
   the payoff, so it opens on her own sentence about what the core had to do
   and lets the tally be the evidence. */
function Scoping() {
  return (
    <section className={b.scope} aria-labelledby="research-scope">
      <div className={`${b.scopeCard} ${sys.up}`}>
        <div className={b.scopeLead}>
          <p className={b.specLabel} id="research-scope">Prioritization · five optional features on the table</p>
          <p className={b.scopeStory}>
            If a parent never leaves the home page, they still get the use case they wanted most, a
            timeline of their documentation. The rest can be explored another time.
          </p>
        </div>
        <div className={b.scopeCells}>
          <div className={b.scopeCell}>
            <span className={b.scopeFigRow}><span className={b.scopeFig}>2</span><span className={b.scopeLabel}>kept</span></span>
            <span className={b.scopeNames}>sharing · keepsake book</span>
          </div>
          <div className={b.scopeCell}>
            <span className={b.scopeFigRow}><span className={b.scopeFig}>1</span><span className={b.scopeLabel}>added</span></span>
            <span className={`${b.scopeNames} ${b.scopeAdded}`}>search · for the brain fog every parent named</span>
          </div>
          <div className={b.scopeCell}>
            <span className={b.scopeFigRow}><span className={b.scopeFig}>2</span><span className={b.scopeLabel}>cut</span></span>
            <span className={`${b.scopeNames} ${b.scopeCut}`}>trackers · birth plan</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   02 — RESEARCH & ARCHITECTURE. One chapter, because it was always one
   argument (N42/N43).

   Research had almost no artifacts of its own: its two "artifacts" were text in
   boxes, and the twelve-cell synthesis grid said nothing at all with the words
   covered. Architecture holds the page's two best-drawn objects. And the grid's
   "what we did" column and Architecture's "what shipped" were the same claim
   told twice — once as text, once as a diagram. Merged, the findings stop
   needing their own furniture and become annotations on the drawings that
   already prove them: the text dies and the drawing carries it.

   The merge is also a CUT, which is the point. Retired here: the synthesis
   grid, the "shift" panel (its sentence is now an aria beat), both "moves"
   cards (the shipped diagram shows what they describe), and the scoping lead
   paragraph (Brief already draws it).

   The chapter reads: her research → the claim it produced → the architecture
   that claim forced, as the aria → what got scoped out → the principles.
   ════════════════════════════════════════════════════════════════════════════ */
function ResearchArchitecture() {
  return (
    /* Architecture's thesis becomes the merged chapter's, because it is the one
       that spans both halves: a research finding with a structural consequence.
       Research's own statement moves down onto the graphic that proves it. */
    <FieldSection
      id="research" num="02" crumb="research & architecture" when="Weeks 2–3" alt wide
      arc="#B1C1F4"
      statement={<>New parents recovering from birth have limited capacity, which made the introduction, onboarding, and user flow <b>make-or-break</b>: they decide how a parent spends their few precious free moments.</>}
      statementLong
    >
      {/* Round 4 trail cuts: the second context photo and the inline quote cut —
          the group-chat artifact below is this chapter's hero evidence and
          carries the family voices itself */}
      {/* THE ROW. Her words and her reasoning hold the reading column; the
          group call — this chapter's hero evidence, and an artifact she
          authored — holds the artifact plane. The second stock photograph is
          cut: it was the page's second licensed Pexels image, it sat in a
          chapter that has real artifacts of her own, and a Split spent half its
          width on decoration. Cutting it is what lets her thinking sit with the
          research it came from. */}
      <div className={`${sys.measure} ${b.researchRow}`}>
        <div className={`${sys.colsReading} ${b.researchRead} ${sys.up}`}>
          <Prose>
            This was a design sprint on a concept already built on extensive research, so our work
            focused on concept iteration.
          </Prose>
          <Prose>
            Before we built anything, I researched blogs and existing products and ran information
            interviews with family to get familiar with the subject: my three sisters, my mom, and my
            friend with a toddler.
          </Prose>
          <Insight>
            My thinking was rooted in my close family members’ traumatic experiences, which led me to a
            trauma-informed approach. I wanted the right balance between the individual feat of giving
            birth and the collective experience around it, with an interaction matched to a new parent’s
            capacity. So I left medical documentation optional and, by the final iteration, built the
            design around events on a timeline.
          </Insight>
        </div>

        {/* the group call, as the group text it basically was — the casual,
            personal research made legible. Incoming = their asks (summarized);
            the marked bubble = one sister's words, verbatim. The rigor note
            keeps the claim honest: nothing here is dressed up as data it
            isn't. */}
        <div className={`${sys.colsArtifact} ${sys.up}`}>
        <figure className={b.chatCard}>
          <figcaption className={b.chatHead}>
            <span className={b.chatDot} aria-hidden="true" />
            the group call · my three sisters, my mom, a friend with a toddler
          </figcaption>
          <div className={b.chatBody}>
            <p className={b.chatIn}>Less medical documentation. More photos, and an outline of what actually happened.</p>
            <p className={b.chatIn}>Recognition for doing something this amazing and this hard.</p>
            <p className={b.chatIn}>A space that doesn’t assume a “normal” birth: other people’s stories, resources.</p>
            <p className={b.chatVerbatim}>
              “None of our births went according to plan and they were traumatizing, and it doesn’t get
              discussed enough.”
            </p>
          </div>
          <p className={b.chatNote}>their asks, summarized · the quote, verbatim</p>
        </figure>
        </div>
      </div>

      {/* the claim, sitting next to its evidence */}
      <ThreeMoments />

      {/* THE ARIA — the 4 → 0 collapse. This is where the research findings
          land: the twelve-cell "what we heard, what we did" grid is retired,
          and its rows now hang on the two diagrams as annotations, each
          registered to the part of the architecture it argued into existence.
          The "reclaim" row is not among them by design — that finding is about
          copy, and the Identity chapter already carries it verbatim, with the
          parent's own words and the draft → rewrite pair. */}
      <IaAria />

      {/* what the architecture left out */}
      <Scoping />

      {/* design principles — four CLAIMS, set as type (the studio's Saffer
          model: pithy, specific, differentiating). No numerals (they'd collide
          with the chapter wayfinding), no rules, no boxes: the names carry the
          weight, one quiet line each beneath. Copy hers to bless. */}
      <section className={`${b.values} ${sys.up}`}>
        <p className={b.valuesHead}>Design principles</p>
        <ul className={b.valuesList}>
          {[
            {
              name: 'Compassionate, not clinical',
              why: 'A birth lives inside cold clinical systems; the tool that holds it shouldn’t feel like one.',
            },
            {
              name: 'Integrate facts and feelings',
              why: 'The brief split capture four ways, but a birth isn’t lived in parts, so one timeline holds them together.',
            },
            {
              name: 'Does not disorient',
              why: 'A parent recovering on little sleep can’t afford a maze.',
              taught: 'My first two builds did the opposite of what they meant to; testing taught me what disorienting really meant.',
            },
            {
              name: 'Trauma-informed, not trauma-assuming',
              why: 'Careful with pain, without deciding a parent’s experience for them.',
              taught: 'My first copy assumed trauma; a parent showed me the words shouldn’t choose the tone.',
            },
          ].map((p) => (
            <li key={p.name} className={`${b.principle} ${p.taught ? b.principleSharpened : ''}`}>
              <h3 className={b.principleName}>{p.name}</h3>
              <p className={b.principleWhy}>{p.why}</p>
              {/* the two that testing rewrote carry a marked third tier, so the
                  block's SHAPE says "four claims, two of them revised" before a
                  word of it is read. Her standing note (L3): she can't claim she
                  applied these, only that they evolved through feedback — this
                  is that distinction, drawn. */}
              {p.taught && (
                <p className={b.principleEvolved}>
                  <span className={b.principleTag}>sharpened by testing</span>
                  {p.taught}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
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
      {/* act two — the process, numbered */}
      <Brief />
      <ResearchArchitecture />
      <SecIteration />
      <Voice />
      <SecBrand />
      <Outcome />
      <Close />
    </div>
  )
}
