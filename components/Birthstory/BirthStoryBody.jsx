'use client'

import { FieldSection, Lead, Prose, SubBlock, Split, Figure, TesterNote, Insight, sys } from './kit'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import SecArchitecture from './SecArchitecture'
import SecIteration from './SecIteration'
import SecFeatures from './SecFeatures'
import SecBrand from './SecBrand'
import BirthStorySpine from './BirthStorySpine'
import b from './BirthStoryBody.module.css'

/* six chapters; three of them fold a second beat under a subhead (see the `ids`
   they cover), so the spine stays calm without dropping any part of the story */
const SPINE = [
  { id: 'brief', label: 'Brief', ids: ['brief'] },
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

function Brief() {
  const birth = birthPhoto('fog', 1500, { grayscale: true }) // Saul Siguenza — exhausted parent + newborn, rendered B&W
  return (
    <FieldSection id="brief" num="01" crumb="brief" when="Week 1" wide>
      <Split
        text={
          <>
            <Lead>Pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.</Lead>
            <Prose>
              Myana already supports parents through pregnancy and postpartum. Its researchers saw that
              the birth itself still went undocumented and unprocessed, and brought that gap to our
              graduate studio to conceptualize.
            </Prose>
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
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={birth.src}
          byline={birth.byline}
          alt="A parent rests cheek to cheek with a swaddled newborn in the hours just after birth, in black and white."
          cap="A parent and newborn in the hours after birth."
        />
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

      <Split
        text={
          <SubBlock label="My connection">
            <Prose>
              Supporting mothers is personal for me. I come from a matriarchal family that has a history
              of complicated births. While interviewing my family members, I understood for the first
              time how traumatic their experiences were. When I worked as a night nanny for an infant
              whose mother was in breast cancer treatment, I experienced sleep deprivation and
              sleep-training struggles firsthand, which deepened my understanding. This opportunity to
              support parents was deeply meaningful.
            </Prose>
          </SubBlock>
        }
      >
        <Figure
          photo
          tag="the review"
          ratio="3 / 2"
          focus="center 54%"
          src={cloudImg('IMG_3010', 1600)}
          alt="A studio review on a projector screen: our client, Sarah Burns, joins by video on the left while the room of students faces the work on the right."
          cap="Reviewing the work with our client, Sarah Burns (MSW), over video."
        />
      </Split>
    </FieldSection>
  )
}

function Research() {
  const feeding = birthPhoto('feeding', 1400) // Craig Adderley — mother + newborn skin to skin, hospital (natively B&W)
  const tired = birthPhoto('gap', 1400, { grayscale: true }) // William Fortunato — exhausted parent beside her sleeping newborn, rendered B&W
  return (
    <FieldSection id="research" num="02" crumb="research" when="Week 2" alt wide>
      <Split
        text={
          <>
            <Lead>This was a design sprint on a concept already built on extensive research, so our work focused on concept iteration.</Lead>
            <Prose>
              Before we built anything, I researched blogs and existing products and ran information
              interviews with family to get familiar with the subject: my three sisters, my mom, and my
              friend with a toddler. An app would be nice because “First couple of weeks you are up and on
              your phone every 2 hours while breastfeeding.”
            </Prose>
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={tired.src}
          byline={tired.byline}
          alt="A tired parent rests her head on her hand, gazing at her sleeping newborn beside her, in black and white."
          cap="The exhausted early weeks the app had to fit into."
        />
      </Split>

      <div className={`${b.askBand} ${sys.up}`}>
        <div className={b.askCols}>
          <div className={b.askCol}>
            <p className={b.specLabel}>What they wanted</p>
            <ul className={b.specList}>
              <li>Less medical documentation, more photos and a general outline of events to refer back to.</li>
              <li>Recognition for doing something amazing and hard.</li>
              <li>A safe space to reject the idea of a “normal” birth, with a forum of others’ stories and resources.</li>
            </ul>
          </div>
          <div className={b.askCol}>
            <p className={b.specLabel}>How they’d use it</p>
            <ul className={b.specList}>
              <li>Select-one answers in the exhausted early weeks.</li>
              <li>Free-form journaling later, once the fog lifts.</li>
              <li>A keepsake book of the story in the end.</li>
            </ul>
          </div>
          <div className={`${b.askCol} ${b.voicesCol}`}>
            <p className={b.specLabel}>In their words</p>
            <blockquote className={b.parentQuote}>
              “None of our births went according to plan and they were traumatizing and it does not get
              discussed enough.”
            </blockquote>
            <p className={b.parentWho}>Group call with my three sisters</p>
          </div>
        </div>
      </div>

      <Split
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
          src={feeding.src}
          byline={feeding.byline}
          alt="A mother holds her newborn skin to skin in a hospital bed, her eyes closed, in black and white."
          cap="A parent and newborn in the first hours after birth."
        />
      </Split>

      {/* synthesis — the studio-taught Fact › Insight › Implication grid, rebuilt
          from the real midpoint feedback in her deck (the "Early Wireframes"
          annotations) → her insight → the decision it drove. Reconstruction of
          synthesis she actually did, in the taught grammar; copy hers to bless. */}
      <section className={`${b.synth} ${sys.up}`}>
        <p className={b.synthHead}>What we heard, what we did</p>
        <p className={b.synthSub}>
          The clearest signal from testing was to subtract. Feedback narrowed a broad first build into a
          focused one.
        </p>
        <div className={b.synthTable}>
          <div className={b.synthHeadRow} aria-hidden="true">
            <span>What we heard</span>
            <span>What we learned</span>
            <span>What we did</span>
          </div>
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
            <div key={r.heard} className={b.synthRow}>
              <div className={b.synthCell}>
                <span className={b.synthColLabel}>What we heard</span>
                <p className={b.synthFact}>{`“${r.heard}”`}</p>
              </div>
              <div className={b.synthCell}>
                <span className={b.synthColLabel}>What we learned</span>
                <p className={b.synthText}>{r.learned}</p>
              </div>
              <div className={b.synthCell}>
                <span className={b.synthColLabel}>What we did</span>
                <p className={b.synthText}>{r.did}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* design principles — the studio's Saffer model: pithy, specific,
          differentiating. Two were sharpened by testing; the notes show how.
          PROVISIONAL copy from Lorin's own words, hers to bless. */}
      <section className={`${b.values} ${sys.up}`}>
        <p className={b.valuesHead}>Design principles</p>
        <p className={b.valuesIntro}>Four principles came out of the research. Testing sharpened two of them.</p>
        <ol className={b.valuesList}>
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
              tag: 'what testing taught',
              taught: 'My first two builds meant to lower cognitive load and did the opposite. The principle didn’t change; testing taught me what disorienting really meant.',
            },
            {
              name: 'Trauma-informed, not trauma-assuming',
              why: 'Careful with pain, without deciding a parent’s experience for them.',
              tag: 'what feedback taught',
              taught: 'My first copy assumed trauma; a parent showed me the words shouldn’t choose the tone.',
            },
          ].map((p, i) => (
            <li key={p.name} className={b.principle}>
              <span className={b.principleNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className={b.principleBody}>
                <h3 className={b.principleName}>{p.name}</h3>
                <p className={b.principleWhy}>{p.why}</p>
                {p.taught && (
                  <p className={b.principleEvolved}>
                    <span className={b.principleEvolvedTag}>{p.tag}</span>
                    {p.taught}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </FieldSection>
  )
}

function Voice() {
  return (
    <FieldSection id="voice" num="05" crumb="ux writing" when="Week 5" alt wide>
      <Split
        text={
          <>
            <Lead>The copy is trauma-informed without assuming trauma.</Lead>
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
    <FieldSection id="outcome" num="06" crumb="outcome" when="Week 6" alt wide>
      <Split
        text={
          <>
            <Lead>The client loved it, and it still isn’t getting built.</Lead>
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
    <FieldSection id="close" crumb="reflection" when="In hindsight" sub>
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
