'use client'

import { FieldSection, Lead, Prose, SubBlock, Split, Figure, Note, TesterNote, sys } from './kit'
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
    ['Role', 'UX/UI lead · information architecture · visual identity · UX writing'],
    ['Research', 'Co-led with Michael Juan'],
    ['Context', '6-week graduate studio · Carnegie Mellon'],
    ['Client', 'Sarah Burns (MSW) · Tamar Krishnamurti (PhD) · Myana'],
    ['Methods', '7 parent interviews · 3 rounds of wireframe testing'],
    ['Outcome', 'Strong client validation; sponsored to possibly inform future Myana iterations; no commitment to build'],
  ]
  return (
    <section className={b.overview}>
      <div className={b.overviewInner}>
        <p className={b.overviewLede}>
          Birth Story is a concept for a companion app to Myana, a postpartum support platform.
          It helps parents document, reflect on, and make sense of giving birth: the part of the
          perinatal experience that goes unsupported once a newborn arrives.
        </p>
        <dl className={b.overviewMeta}>
          {meta.map(([k, v]) => (
            <div key={k} className={b.metaItem}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        <p className={b.overviewSummary}>
          Working from an explicit brief, my partner and I interviewed parents, reframed the project
          from a feature-heavy logging tool into a simple and emotionally intelligent space, and
          narrowed three rounds of design down to four core features. I led the UX/UI, information
          architecture, visual identity, and UX writing. The client validated the direction
          enthusiastically. The app remains a concept: I designed it and built the prototypes shown
          here with AI assistance.
        </p>
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
            <Lead>The brief came with a strong skeleton. Our job was to make it real for an actual parent.</Lead>
            <Prose>
              Myana is a pregnancy and postpartum app, and the parents who use it kept naming the same
              gap: giving birth itself. It is a huge physical and emotional event, and it tends to get
              lost the moment the newborn arrives, so the part we were designing for was the part that
              usually goes unsupported.
            </Prose>
            <Prose>
              We were given a very explicit prompt. The name was already there, Birth Story, and the
              core idea came with it: document, reflect, and make sense of the experience, with
              suggestions about balancing medical and emotional detail and offering a book at the end.
              There was a strong skeleton in theory, and it was up to us to turn it into something real.
            </Prose>
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={birth.src}
          byline={birth.byline}
          alt="An exhausted parent rests cheek to cheek with a swaddled newborn in the hours just after birth, in black and white."
          cap="An exhausted parent and newborn in the hours after birth."
        />
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

      <SubBlock label="My role">
        <Prose>
          Michael Juan and I shared the research, co-facilitating the interviews, synthesizing together,
          and co-presenting to the client. I led the UX and UI, the visual identity, the user flows, and
          the information architecture, and Michael worked on data-visualization concepts that did not
          end up in the final design.
        </Prose>
      </SubBlock>

      <SubBlock label="Why I was close to it">
        <Prose>
          I come from a matriarchal family of mostly mothers, and many of their births did not go to
          plan. One sister planned a natural home birth, labored 24 hours, and ended up in a hospital on
          medication, the opposite of everything she had pictured, and then she was a mother with no
          time to process any of it. Another nearly lost her life giving birth, and her son spent his
          first months in the NICU. When I started asking friends who had given birth, it surprised me
          that none of them had been offered any support with the experience afterward. I care a lot
          about mental health and trauma, so this was a need I already understood.
        </Prose>
      </SubBlock>
    </FieldSection>
  )
}

function Research() {
  const feeding = birthPhoto('feeding', 1400) // Craig Adderley — mother + newborn skin to skin, hospital (natively B&W)
  const gap = birthPhoto('gap', 1300) // William Fortunato — tired mother gazing at her sleeping newborn
  return (
    <FieldSection id="research" num="02" crumb="research" when="Week 2" alt wide>
      <Split
        text={
          <>
            <Lead>Seven interviews with parents turned the project toward doing less.</Lead>
            <Prose>
              We talked with seven parents in all. Two were think-aloud walkthroughs of our wireframes
              over Zoom, with parents our client set us up with, and I did the other five on my own:
              three family members and two friends, plus the forums and blogs I read to hear from people
              we could not reach in six weeks.
            </Prose>
            <Prose>
              What surprised me was how little they wanted from it. I had assumed they would want to log
              every medical record, but what they really wanted was to feel recognized for doing
              something hard: a few photos, a loose outline they could come back to, somewhere to be
              validated. We had been trying to do too much, and most of what I did from there was take
              things away.
            </Prose>
            <Prose>
              They also told me they would use it in pieces, sleep-deprived and on their phones between
              feedings, so they wanted simple select-one questions in the moment and the freedom to come
              back and write the longer version once the fog lifted.
            </Prose>
          </>
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
        <Figure
          tag="context"
          photo
          src={gap.src}
          byline={gap.byline}
          alt="A mother lies beside her sleeping newborn, head propped on her hand, gazing at the baby with a tired, pensive look."
          cap="After birth, attention shifts to the baby; the parent’s own experience often goes unprocessed."
        />
        <Figure
          tag="interviews"
          src="https://res.cloudinary.com/dc17mvdyv/image/upload/f_auto,q_auto,w_1300/v1782679668/UX_Interview.jpg"
          alt="A parent interview over video call; the interviewee’s tile is blurred for privacy."
          cap="7 parent interviews · interviewee blurred for privacy"
        />
      </Split>

      <div className={sys.up}>
        <Note who="Parent interview">
          “You often have one person in your corner who has seen what you went through, who validates your
          experience and what you’ve done. This amazing thing you’ve done. Not everyone has that.”
        </Note>
      </div>

      <section className={`${b.values} ${sys.up}`}>
        <p className={b.valuesHead}>Our design values</p>
        <ol className={b.valuesList}>
          {[['Intuitive & calming', 'collect usable data'], ['Easy to navigate', 'tell a compelling story'], ['Empathetic & trauma-informed', 'record the medical detail'], ['Therapeutic', 'prompt reflection']].map(([val, fn], i) => (
            <li key={val}>
              <span className={b.valueNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={b.valueName}>{val}</span>
              <span className={b.valueFor}>{fn}</span>
            </li>
          ))}
        </ol>
      </section>
    </FieldSection>
  )
}

function Voice() {
  return (
    <FieldSection id="voice" num="06" crumb="ux writing" when="Week 5" wide>
      <Split
        text={
          <>
            <Lead>The copy is trauma-informed without assuming trauma.</Lead>
            <Prose>
              Because I knew births could be traumatic, I wrote the first copy in a careful,
              trauma-informed tone, and a tester showed me I had gone too far with it. She did not
              connect with the word “reclaim,” and it made me realize I was leaning on the hard parts
              and missing how much a birth can also be about connection and how significant it is. I did
              not want the words to decide the experience for anyone.
            </Prose>
            <Prose>
              So I rewrote toward connection and left room for people to bring their own tone. If I kept
              working on it, the next thing I would do is balance the reflection prompts so they reach
              for joy as readily as they hold space for distress.
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
    <FieldSection id="outcome" num="08" crumb="outcome" when="Week 6" wide>
      <Split
        text={
          <>
            <Lead>The client loved it, and it still isn’t getting built.</Lead>
            <Prose>
              When we presented, the client had almost nothing to change and told us she wished it were
              real already. There is no real signal that the app will get built. Myana sponsored the
              project because it might inform future versions of their own product, and honestly the
              pitch was probably as much for us as for them, but it gave the concept a real starting
              point to keep developing from.
            </Prose>
          </>
        }
      >
        <blockquote className={`${b.quote} ${sys.up}`}>
          “I wish this could be real right now!”
          <span className={b.quoteAttr}>Sarah Burns, MSW, LSW · client</span>
        </blockquote>
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
      <Lead>What I would do differently, and what the project taught me about how I work.</Lead>
      <Prose>
        If I did it again I would start from the constraint instead of the possibilities, because naming
        the core need in the first week, less rather than more, would have saved me a whole build of
        tools nobody asked for. The other thing I took from it is to only put something in a wireframe
        when it is a question I actually want feedback on.
      </Prose>
      <Prose>
        The whole project follows a pattern I notice in myself: I am a big dreamer, so I start by trying
        to do everything, and I almost always end up narrowing and narrowing until I get to the heart of
        it. This was one of the first projects I led on the visual side, and it has shaped how I
        wireframe ever since.
      </Prose>
      <Prose>
        Birth Story is still a concept. I designed it, and since then I have taught myself to prototype,
        then to prompt engineer, and now I build with AI, including this site, so the screens here are
        example flows rather than a finished product. Designing something and then being able to build
        it myself is the direction I am headed.
      </Prose>
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
