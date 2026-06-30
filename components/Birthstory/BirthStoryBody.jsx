'use client'

import { FieldSection, Ask, Prose, Split, Figure, Finding, Note, TesterNote, sys } from './kit'
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

/* Project credits — the metadata, now the masthead of the Brief (below the
   progress bar) rather than its own competing band. */
function Credits() {
  const rows = [
    ['role', 'UX/UI · research · copywriting · brand'],
    ['team', 'Lorin Anderberg · Michael Juan'],
    ['when', '6-week graduate studio · CMU'],
    ['client', 'Sarah Burns (MSW) · Tamar Krishnamurti (PhD)'],
  ]
  return (
    <dl className={`${b.credits} ${sys.up}`}>
      {rows.map(([k, v]) => (
        <div key={k} className={b.creditItem}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  )
}

function Brief() {
  const birth = birthPhoto('fog', 1500, { grayscale: true }) // Saul Siguenza — exhausted parent + newborn, rendered B&W
  return (
    <FieldSection id="brief" num="01" crumb="brief" when="week 1 · the ask" wide>
      <Credits />
      <Split
        text={
          <>
            <Ask>How might we help parents document, reflect, and make sense of their birth experience?</Ask>
            <p className={`${b.briefLede} ${sys.up}`}>
              Parents who use Myana, a pregnancy and postpartum app, noted a gap in their
              experience: giving birth. Birth experiences vary widely and hardly go according to plan.
              It is a complex physical and emotional time that often gets forgotten when the newborn arrives.
            </p>
            <p className={`${b.briefTask} ${sys.up}`}>
              We were tasked with creating and pitching a concept for Myana’s companion app: <b>Birth Story</b>.
            </p>
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={birth.src}
          byline={birth.byline}
          alt="An exhausted parent rests cheek to cheek with a swaddled newborn in the hours just after birth, in black and white."
          cap="The hours around birth that a pregnancy app doesn’t cover."
        />
        <Figure
          photo
          tag="the client"
          ratio="3 / 2"
          focus="center 54%"
          src={cloudImg('IMG_3010', 1600)}
          alt="A studio review on a projector screen: our client, Sarah Burns, joins by video on the left while the room of students faces the work on the right."
          cap="A real client, not a hypothetical: reviewing the work with Sarah Burns (MSW) over video."
        />
      </Split>
    </FieldSection>
  )
}

function Research() {
  const feeding = birthPhoto('feeding', 1400) // Craig Adderley — mother + newborn skin to skin, hospital (natively B&W)
  const gap = birthPhoto('gap', 1300) // William Fortunato — tired mother gazing at her sleeping newborn
  return (
    <FieldSection id="research" num="02" crumb="research" when="week 2 · interviews" alt wide>
      <Split
        text={
          <>
            <Ask>What does a parent actually need in the <em>fog</em> right after?</Ask>
            <Finding kicker="the reframe">
              Not the feature I expected. Parents weren’t sold on logging every medical record. What they
              wanted was <b>recognition</b> for doing something amazing and hard: a few photos, a loose
              outline to come back to, room to be validated. The work became <b>less, not more</b>.
            </Finding>
            <p className={`${b.briefTask} ${sys.up}`}>
              And they’d use it in pieces: sleep-deprived but on their phones between feedings, they wanted
              <b> “select one”</b> questions in the moment, and the freedom to come back and write the long
              version once the fog lifted.
            </p>
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
          tag="the gap"
          photo
          src={gap.src}
          byline={gap.byline}
          alt="A mother lies beside her sleeping newborn, head propped on her hand, gazing at the baby with a tired, pensive look."
          cap="After birth, attention shifts to the baby. The parent’s own experience is the part that goes unprocessed."
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
    <FieldSection id="voice" num="06" crumb="voice" when="week 5 · copy" wide>
      <Split
        text={
          <>
            <Ask>Whose story were we <em>assuming</em>?</Ask>
            <Prose>
              Our first copy quietly assumed a hard birth. The trauma is in the data, but the words
              shouldn’t decide the experience for you.
            </Prose>
          </>
        }
      >
        <TesterNote
          quote="Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative."
          who="Parent tester"
        />
        <div className={`${b.rewriteBlock} ${sys.up}`}>
          <div className={b.copyStep}>
            <span className={b.copyLabel}>the draft</span>
            <p className={b.draftLine}>“Reclaim your narrative.”</p>
          </div>
          <span className={b.copyArrow} aria-hidden="true">↓</span>
          <div className={b.copyStep}>
            <span className={b.copyLabel}>the rewrite</span>
            <p className={b.rewriteLine}>“A space to make sense of it, in your own words.”</p>
          </div>
        </div>
      </Split>

      <Prose>So I rewrote the voice toward connection, and let the parent bring their own tone.</Prose>
    </FieldSection>
  )
}

function Outcome() {
  return (
    <FieldSection id="outcome" num="08" crumb="outcome" when="week 6 · the pitch" wide>
      <Finding kicker="where it landed">
        The work didn’t stay a class project. It became the preliminary research and ideation for a
        Birth Story app the <b>professors and client intend to build</b>.
      </Finding>
      <Split
        text={
          <blockquote className={`${b.quote} ${sys.up}`}>
            “I wish this could be real right now!”
            <span className={b.quoteAttr}>Sarah Burns, MSW, LSW · client</span>
          </blockquote>
        }
      >
        <Figure
          photo
          tag="the room"
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
    <FieldSection id="close" num="09" crumb="reflection" when="week 6 · in hindsight">
      <Ask kicker="next time">What would I ask <em>differently</em>?</Ask>
      <Prose>
        I’d start from the constraint, not the possibilities. Naming the core need in week one (less,
        not more) would have saved me a build full of tools nobody asked for. And I learned not to put
        anything in a wireframe that opens a question I didn’t mean to ask.
      </Prose>
      <p className={b.tools}>figma · svg repo · unsplash</p>
    </FieldSection>
  )
}

export default function BirthStoryBody() {
  return (
    <div className={sys.case}>
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
