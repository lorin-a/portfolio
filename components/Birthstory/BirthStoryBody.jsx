'use client'

import { FieldSection, Lead, Prose, SubBlock, Split, Figure, TesterNote, Insight, sys } from './kit'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import SecArchitecture from './SecArchitecture'
import SecIteration from './SecIteration'
import SecFeatures from './SecFeatures'
import SecBrand from './SecBrand'
import BirthStorySpine from './BirthStorySpine'
import b from './BirthStoryBody.module.css'

const SPINE = [
  { id: 'brief', label: 'Brief' },
  { id: 'research', label: 'Research' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'iteration', label: 'Iteration' },
  { id: 'features', label: 'Features' },
  { id: 'voice', label: 'Voice' },
  { id: 'brand', label: 'Brand' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'close', label: 'Reflection' },
]

/* Overview — the at-a-glance masthead a hiring manager reads first. An editorial
   summary, not a corporate fact grid: the statement, the metadata, the synopsis.
   Sits between the hero and the spine; the spine still tracks the 9 process beats. */
function Overview() {
  const meta = [
    ['Role', 'UX/UI lead: research (co-led with Michael Juan), information architecture, visual identity, UX writing'],
    ['Context', '6-week graduate studio, Carnegie Mellon'],
    ['Client', 'Myana. Researchers Sarah Burns (MSW) and Tamar Krishnamurti (PhD), from CONVERGE at the University of Pittsburgh'],
    ['Methods', '7 parent interviews, 3 rounds of wireframe testing'],
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
              the birth itself still went undocumented and unprocessed, and brought that gap to our studio
              to conceptualize.
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
          <div className={b.askCol}>
            <p className={b.specLabel}>Required</p>
            <ul className={b.specList}>
              <li><b>Info-gathering.</b> The medical record: who, what, interventions, medications.</li>
              <li><b>Meaning-making.</b> Processing a birth that rarely goes to plan.</li>
              <li><b>Onboarding.</b> A calm way in for an exhausted first-timer.</li>
            </ul>
          </div>
          <div className={b.askCol}>
            <p className={b.specLabel}>Provided</p>
            <ul className={b.specList}>
              <li>The name, Birth Story, and the core concept.</li>
              <li>Five optional features to choose from.</li>
              <li>Client sponsorship, to possibly inform future Myana versions.</li>
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
              whose mother was in breast cancer treatment, I experienced sleep deprivation firsthand.
              Creating this concept was deeply rewarding.
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
  return (
    <FieldSection id="research" num="02" crumb="research" when="Week 2" alt wide>
      <Split
        text={
          <>
            <Lead>Seven interviews turned the project toward doing less.</Lead>
            <Prose>
              We talked with seven parents. Two were think-aloud walkthroughs of our wireframes over
              Zoom, with parents our client set us up with, and I did the other five on my own: three
              family members and two friends, plus forums and blogs to hear from people we couldn’t reach
              in six weeks.
            </Prose>
          </>
        }
      >
        <Figure
          tag="interviews"
          src="https://res.cloudinary.com/dc17mvdyv/image/upload/f_auto,q_auto,w_1300/v1782679668/UX_Interview.jpg"
          alt="A parent interview over video call; the interviewee’s tile is blurred for privacy."
          cap="7 parent interviews · interviewee blurred for privacy"
        />
      </Split>

      <div className={`${b.askBand} ${sys.up}`}>
        <div className={b.askCols}>
          <div className={b.askCol}>
            <p className={b.specLabel}>What they wanted</p>
            <ul className={b.specList}>
              <li>A few photos.</li>
              <li>A loose outline they could come back to.</li>
              <li>Somewhere to be validated.</li>
            </ul>
          </div>
          <div className={b.askCol}>
            <p className={b.specLabel}>How they’d use it</p>
            <ul className={b.specList}>
              <li>In pieces, sleep-deprived between feedings.</li>
              <li>Simple select-one questions in the moment.</li>
              <li>The freedom to come back and write the longer version once the fog lifted.</li>
            </ul>
          </div>
          <div className={`${b.askCol} ${b.voicesCol}`}>
            <p className={b.specLabel}>In their words</p>
            <blockquote className={b.parentQuote}>
              “You often have one person in your corner who has seen what you went through, who
              validates your experience and what you’ve done. This amazing thing you’ve done. Not
              everyone has that.”
            </blockquote>
            <p className={b.parentWho}>Parent interview</p>
          </div>
        </div>
      </div>

      <Split
        text={
          <Insight>
            What surprised me was how little they wanted. I had assumed they’d want to log every
            medical record, but mostly they wanted to feel recognized for doing something hard. We
            had been trying to do too much, and most of what I did from there was take things away.
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

      <section className={`${b.values} ${sys.up}`}>
        <p className={b.valuesHead}>Our design values</p>
        <ol className={b.valuesList}>
          {[
            ['Look & Feel', 'Calm, emotionally intelligent, non-clinical.'],
            ['Function', 'Hold the medical record and the emotional story in one place.'],
            ['Flow', 'Intuitive and easy to navigate.'],
            ['Voice', 'Empathetic and trauma-informed.'],
          ].map(([cat, val]) => (
            <li key={cat}>
              <span className={b.valueCat}>{cat}</span>
              <span className={b.valueName}>{val}</span>
            </li>
          ))}
        </ol>
      </section>
    </FieldSection>
  )
}

function Voice() {
  return (
    <FieldSection id="voice" num="06" crumb="ux writing" when="Week 5" alt wide>
      <Split
        text={
          <>
            <Lead>The copy is trauma-informed without assuming trauma.</Lead>
            <Prose>
              Because I knew births could be traumatic, I wrote the first copy in a careful,
              trauma-informed tone, and a tester showed me I had gone too far. She didn’t connect with
              the word “reclaim,” and it made me realize I was leaning on the hard parts, missing how
              much a birth can also be about connection. I didn’t want the words to decide the experience
              for anyone.
            </Prose>
            <Prose>
              So I rewrote toward connection and left room for people to bring their own tone. The next
              thing I’d do is balance the reflection prompts so they reach for joy as readily as they
              make room for distress.
            </Prose>
          </>
        }
      >
        <TesterNote
          quote="Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative."
          who="Parent tester"
        />
        <div className={`${b.rewriteBlock} ${sys.up}`}>
          <div className={b.rewritePair}>
            <div className={b.copyStep}>
              <span className={b.copyLabel}>draft</span>
              <p className={b.draftLine}>“Reclaim your narrative.”</p>
            </div>
            <span className={b.copyArrow} aria-hidden="true">↓</span>
            <div className={b.copyStep}>
              <span className={b.copyLabel}>rewrite</span>
              <p className={b.rewriteLine}>“A space to make sense of it, in your own words.”</p>
            </div>
          </div>
          <div className={b.rewritePair}>
            <div className={b.copyStep}>
              <span className={b.copyLabel}>draft</span>
              <p className={b.draftLine}>“Find strength &amp; support.”</p>
            </div>
            <span className={b.copyArrow} aria-hidden="true">↓</span>
            <div className={b.copyStep}>
              <span className={b.copyLabel}>rewrite</span>
              <p className={b.rewritePlaceholder}>[ Lorin to write: a name that assumes she is already strong, not in need of rescue. ]</p>
            </div>
          </div>
        </div>
      </Split>
    </FieldSection>
  )
}

function Outcome() {
  return (
    <FieldSection id="outcome" num="08" crumb="outcome" when="Week 6" alt wide>
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
    <FieldSection id="close" num="09" crumb="reflection" when="In hindsight">
      <div className={sys.headCluster}>
        <Lead>What I’d do differently, and what it taught me about how I work.</Lead>
        <Prose>
          If I did it again I’d start from the constraint instead of the possibilities: naming the core
          need in the first week, less rather than more, would have saved me a whole build of tools nobody
          asked for. The other thing I took from it is to only put something in a wireframe when it’s a
          question I want feedback on.
        </Prose>
        <Prose>
          The project follows a pattern I notice in myself: I’m a big dreamer, so I start by trying to do
          everything, and almost always end up narrowing and narrowing until I get to the heart of it.
          This was one of the first projects I led on the visual side, and it’s shaped how I wireframe ever
          since.
        </Prose>
        <Prose>
          Birth Story is still a concept. I designed it, and since then I’ve taught myself to prototype,
          then to prompt engineer, and now I build with AI, including this site, so the screens here are
          example flows rather than a finished product. Designing something and being able to build it
          myself is the direction I’m headed.
        </Prose>
      </div>
      <p className={b.tools}>figma · svg repo · unsplash</p>
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
