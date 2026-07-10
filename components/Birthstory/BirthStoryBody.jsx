'use client'

import { FieldSection, Prose, SubBlock, Split, Figure, Bleed, TesterNote, Insight, sys } from './kit'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import FeatureWall from './FeatureWall'
import SecArchitecture from './SecArchitecture'
import SecIteration from './SecIteration'
import SecFeatures from './SecFeatures'
import SecBrand from './SecBrand'
import BirthStorySpine from './BirthStorySpine'
import b from './BirthStoryBody.module.css'

/* six chapters; three of them fold a second beat under a subhead (see the `ids`
   they cover), so the spine stays calm without dropping any part of the story */
const SPINE = [
  { id: 'brief', label: 'Brief', ids: ['brief', 'overture'] },
  { id: 'research', label: 'Research', ids: ['research'] },
  { id: 'architecture', label: 'Architecture', ids: ['architecture', 'iteration'] },
  { id: 'features', label: 'Interface', ids: ['features'] },
  { id: 'voice', label: 'Identity', ids: ['voice', 'brand'] },
  { id: 'outcome', label: 'Outcome', ids: ['outcome', 'close'] },
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

/* the product overture — her Round 4 pick: one viewport after the Brief showing
   WHAT we made (the four-ways-in wall on the app's own surface), so a skimmer
   holds the product while walking the process. The orienting line is her
   sentence, relocated verbatim from the Interface chapter (not duplicated). */
function Overture() {
  return (
    <section id="overture" className={b.overture} aria-label="The product at a glance">
      <div className={b.overtureInner}>
        <header className={b.overtureHead}>
          <p className={b.overtureKicker}>The product · in 30 seconds</p>
          <p className={b.overtureLine}>It opens into documenting and reaches everything else in a tap or two.</p>
        </header>
        <FeatureWall tone="dark" />
      </div>
    </section>
  )
}

function Brief() {
  const birth = birthPhoto('fog', 2400, { grayscale: true }) // Saul Siguenza — exhausted parent + newborn, full-bleed duotone
  return (
    <FieldSection
      id="brief" num="01" crumb="brief" when="Week 1" wide
      arc="#DBADAD"
      statement={<>Pitch a concept for Myana’s companion micro-app that helps parents <b>document and reflect</b> on their birth experience.</>}
      statementLong
    >
      {/* the chapter opens cinematic — the context photo runs edge to edge in
          the identity's teal-ink duotone (the squint layer) */}
      <Bleed
        src={birth.src}
        byline={birth.byline}
        alt="A parent rests cheek to cheek with a swaddled newborn in the hours just after birth, in teal-ink duotone."
        cap="A parent and newborn in the hours after birth."
        focus="center 42%"
      />

      <Split
        text={
          <Prose>
            Myana already supports parents through pregnancy and postpartum. Its researchers saw that
            the birth itself still went undocumented and unprocessed, and brought that gap to our
            graduate studio to conceptualize.
          </Prose>
        }
      >
        <a
          className={`${b.myanaRef} ${sys.up}`}
          href="https://apps.apple.com/us/app/myana-pa/id6752866138"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={b.myanaTag}>The app it companions</span>
          <span className={b.myanaMain}>
            <img className={b.myanaIcon} src="/images/birthstory/myana-icon.jpg" alt="Myana app icon" loading="lazy" draggable="false" />
            <span className={b.myanaText}>
              <span className={b.myanaName}>Myana</span>
              <span className={b.myanaDesc}>Postpartum and parenting support from the University of Pittsburgh.</span>
            </span>
          </span>
          <span className={b.myanaLink}>View on the App Store ↗</span>
        </a>
      </Split>

      <div className={`${b.askBand} ${sys.up}`}>
        <div className={b.askCols}>
          {/* Required + Provided pulled from the course ask documents (the
              requirements spreadsheet + project brief), in their terms */}
          <div className={b.askCol}>
            <p className={b.specLabel}>Required</p>
            <ul className={b.specList}>
              <li><b>Information gathering.</b> Medical info, contextual info, the birth narrative, and feelings.</li>
              <li><b>Meaning making.</b> Processing through positive retelling, without re-traumatizing.</li>
              <li><b>App administration.</b> Profile and onboarding, plus nudges that prompt capture.</li>
            </ul>
          </div>
          <div className={b.askCol}>
            <p className={b.specLabel}>Provided</p>
            <ul className={b.specList}>
              <li>The name, Birth Story, and the core concept.</li>
              <li>
                Five optional features to choose from:
                <ul className={b.specSubList}>
                  <li>Baby Book</li>
                  <li>Trackers</li>
                  <li>Birth Plan</li>
                  <li>Sharing</li>
                  <li>Partner Participation</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className={`${b.askCol} ${b.stakesCol}`}>
            <p className={b.specLabel}>The stakes</p>
            <div className={b.stakeRow}><span className={b.stakeFig}>80%</span><span className={b.stakeText}>of U.S. maternal deaths are preventable</span></div>
            <div className={b.stakeRow}><span className={b.stakeFig}>65%</span><span className={b.stakeText}>happen after delivery</span></div>
            <div className={b.stakeRow}><span className={b.stakeFig}>3×</span><span className={b.stakeText}>the risk for Black mothers</span></div>
            <p className={b.stakeSource}>A dangerous, under-supported window. <b>Figures from the project brief.</b></p>
          </div>
        </div>
      </div>

      {/* Round 4 trail cuts: the night-nanny elaboration and closing line
          demoted out (her standing cut-not-paraphrase permission); the review
          photo cut — the Outcome chapter carries the stronger final-review
          shot with the client quote */}
      <SubBlock label="My connection">
        <Prose>
          Supporting mothers is personal for me. I come from a matriarchal family that has a history
          of complicated births. While interviewing my family members, I understood for the first
          time how traumatic their experiences were.
        </Prose>
      </SubBlock>
    </FieldSection>
  )
}

function Research() {
  const feeding = birthPhoto('feeding', 1400) // Craig Adderley — mother + newborn skin to skin, hospital (natively B&W)
  return (
    /* the statement is the chapter's CLAIM, not its setup — her strongest
       research finding (formerly buried at the foot of the aside) leads;
       the design-sprint context demotes to the opening prose */
    <FieldSection
      id="research" num="02" crumb="research" when="Week 2" alt wide
      arc="#B1C1F4"
      statement={<>Capacity rises over time, so the app had to meet <b>three different moments</b>, not one.</>}
      statementLong
    >
      {/* Round 4 trail cuts: the second context photo and the inline quote cut —
          the group-chat artifact below is this chapter's hero evidence and
          carries the family voices itself */}
      <div className={sys.headCluster}>
        <Prose>
          This was a design sprint on a concept already built on extensive research, so our work
          focused on concept iteration.
        </Prose>
        <Prose>
          Before we built anything, I researched blogs and existing products and ran information
          interviews with family to get familiar with the subject: my three sisters, my mom, and my
          friend with a toddler.
        </Prose>
      </div>

      {/* the group call, as the group text it basically was — the casual,
          personal research made legible. Incoming = their asks (summarized);
          the marked bubble = one sister's words, verbatim. The rigor note keeps
          the claim honest: nothing here is dressed up as data it isn't. */}
      <div className={`${b.researchTalk} ${sys.up}`}>
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

        <aside className={b.talkAside}>
          <p className={b.specLabel}>How they’d use it</p>
          <ol className={b.usePhases}>
            <li><span className={b.usePhaseWhen}>Early, in the fog</span><span className={b.usePhaseWhat}>Select-one answers, a few taps at a time.</span></li>
            <li><span className={b.usePhaseWhen}>Later, once it lifts</span><span className={b.usePhaseWhat}>Free-form journaling, at their own pace.</span></li>
            <li><span className={b.usePhaseWhen}>In the end</span><span className={b.usePhaseWhat}>A keepsake book of the whole story.</span></li>
          </ol>
        </aside>
      </div>

      {/* the chapter's deliberate column break — media left, her thinking right */}
      <Split
        flip
        text={
          <Insight>
            My thinking was rooted in my close family members’ traumatic experiences, which led me to a
            trauma-informed approach. I wanted the right balance between the individual feat of giving
            birth and the collective experience around it, with an interaction matched to a new parent’s
            capacity. So I left medical documentation optional and, by the final iteration, built the
            design around events on a timeline.
          </Insight>
        }
      >
        <Figure
          tag="context"
          photo
          duo
          src={feeding.src}
          byline={feeding.byline}
          alt="A mother holds her newborn skin to skin in a hospital bed, her eyes closed, in teal-ink duotone."
          cap="A parent and newborn in the first hours after birth."
        />
      </Split>

      {/* synthesis — information design, not a table: each tester voice is
          SPEECH (the chat grammar), it travels a dotted thread carrying what it
          taught, and lands as the move we made, rendered on the app's own dark
          surface. At a squint: voices in, product out. Copy hers to bless. */}
      <section className={`${b.synth} ${sys.up}`}>
        <p className={b.synthHead}>What we heard, what we did</p>
        <div className={b.synthFlows}>
          {[
            {
              heard: 'Onboarding is nice, but too many buttons and options. Too many menus.',
              learned: 'Cognitive load was the enemy, not missing features.',
              did: 'Open straight into notes on a timeline; everything else a tap away.',
            },
            {
              heard: 'Why “reclaim”? Compassionate copy may be signaling a negative experience.',
              learned: 'The words shouldn’t decide the experience for anyone.',
              did: 'Care-centered copy; “Find strength & support” became the Care Pod.',
            },
            {
              heard: 'Timeline is a must; journaling is unique to everyone.',
              learned: 'Some needs are core, others are personal.',
              did: 'The timeline is the home; journaling is there when you want it.',
            },
            {
              heard: 'Big yes to voice recording; medical reflection is valuable but may not need its own category.',
              learned: 'Capture has to fit full hands, and one place beats many.',
              did: 'Voice memos and medical notes land on the one tagged timeline.',
            },
          ].map((r) => (
            <div key={r.heard} className={b.synthFlow}>
              <p className={b.synthHeard}>{`“${r.heard}”`}</p>
              <div className={b.synthThread}>
                <p className={b.synthLearned}>{r.learned}</p>
                <span className={b.synthLeader} aria-hidden="true" />
              </div>
              <p className={b.synthDid}>{r.did}</p>
            </div>
          ))}
        </div>
      </section>

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
            <li key={p.name} className={b.principle}>
              <h3 className={b.principleName}>{p.name}</h3>
              <p className={b.principleWhy}>{p.why}</p>
              {p.taught && <p className={b.principleEvolved}>{p.taught}</p>}
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
      id="voice" num="05" crumb="ux writing" when="Week 5" alt wide
      arc="#9DA3BF"
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
      id="outcome" num="06" crumb="outcome" when="Week 6" alt wide
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
      <Overview />
      <BirthStorySpine sections={SPINE} />
      <Brief />
      <Overture />
      <Research />
      <SecArchitecture />
      <SecIteration />
      <SecFeatures />
      <Voice />
      <SecBrand />
      <Outcome />
      <Close />
    </div>
  )
}
