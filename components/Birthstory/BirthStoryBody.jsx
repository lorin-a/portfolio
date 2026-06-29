'use client'

import { FieldSection, Ask, Prose, Split, Figure, Finding, sys } from './kit'
import { birthPhoto } from '@/lib/cloudinary'
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
  const birth = birthPhoto('circle', 1100) // Grey Art Weddings — two parents’ hands cradle a newborn foot, b&w
  return (
    <FieldSection id="brief" num="01" crumb="brief" when="week 1 · the ask" wide>
      <Credits />
      <Split
        text={
          <>
            <p className={`${b.briefLede} ${sys.up}`}>
              Parents who use Myana, a pregnancy and postpartum app, noted a gap in their
              experience—giving birth. Birth experiences vary widely and hardly go according to plan.
              It is a complex physical and emotional time that often gets forgotten when the newborn arrives.
            </p>
            <Ask kicker={null}>How might we help parents document, reflect, and make sense of their birth experience?</Ask>
            <p className={`${b.briefTask} ${sys.up}`}>
              We were tasked with creating and pitching a concept for Myana’s companion app: <b>Birth Story</b>.
            </p>
          </>
        }
      >
        <Figure
          tag="the birth itself"
          photo
          portrait
          src={birth.src}
          byline={birth.byline}
          alt="Two parents’ hands, one darker and one lighter, cradle a newborn’s tiny foot."
          cap="the hours a pregnancy app never sees"
        />
      </Split>

      <div className={`${b.ff} ${sys.up}`}>
        <p className={b.ffHead}>Every function had a feeling to land</p>
        <ul className={b.ffList}>
          {[['collect usable data', 'intuitive & calming'], ['tell a compelling story', 'easy to navigate'], ['record the medical detail', 'empathetic & trauma-informed'], ['prompt reflection', 'therapeutic']].map(([fn, feel]) => (
            <li key={fn}><span className={b.fn}>{fn}</span><span className={b.arrow} aria-hidden="true">→</span><span className={b.feel}>{feel}</span></li>
          ))}
        </ul>
      </div>
    </FieldSection>
  )
}

function Research() {
  const fog = birthPhoto('fog', 1400)
  return (
    <FieldSection id="research" num="02" crumb="research" when="week 2 · interviews" alt wide>
      <Split
        text={
          <>
            <Ask>What does a parent actually need in the <em>fog</em> right after?</Ask>
            <Finding kicker="what set the whole direction">
              Not a feature. A <b>constraint</b>: many of these births were hard, with no place to
              process them, and no room afterward for another busy app. The work became <b>less, not more</b>.
            </Finding>
          </>
        }
      >
        <Figure
          tag="the moment"
          photo
          src={fog.src}
          byline={fog.byline}
          alt="An exhausted parent rests cheek to cheek with a swaddled newborn in the hours just after birth."
          cap="the hours the app is built for: newborn here, the birth already receding"
        />
        <Figure
          tag="the evidence"
          src="https://res.cloudinary.com/dc17mvdyv/image/upload/f_auto,q_auto,w_1300/v1782679668/UX_Interview.jpg"
          alt="A parent interview over video call; the interviewee’s tile is blurred for privacy."
          cap="interviews · 7 parents · interviewee blurred for privacy"
        />
      </Split>
    </FieldSection>
  )
}

function Voice() {
  return (
    <FieldSection id="voice" num="06" crumb="voice" when="copywriting">
      <Ask>Whose story were we <em>assuming</em>?</Ask>
      <Prose>
        Our first copy quietly assumed a hard birth. A tester stopped on the word “reclaim” — it
        presumes there was something taken. The trauma is in the data, but the words shouldn’t decide
        the experience for you. So I rewrote the voice toward connection, and let the parent bring their own tone.
      </Prose>
      <div className={`${b.ba} ${sys.up}`}>
        <div className={b.baCol}><span className={sys.askKicker}>before</span><p className={b.before}>“Reclaim your narrative.”</p></div>
        <span className={b.baArrow} aria-hidden="true">→</span>
        <div className={b.baCol}><span className={sys.askKicker}>after</span><p className={b.after}>“A space to make sense of it, in your own words.”</p></div>
      </div>
    </FieldSection>
  )
}

function Outcome() {
  return (
    <FieldSection id="outcome" num="08" crumb="outcome" when="the result">
      <Prose>
        The work didn’t stay a class project. It became the preliminary research and ideation for a
        Birth Story app the professors and client intend to build.
      </Prose>
      <blockquote className={`${b.quote} ${sys.up}`}>
        “I wish this could be real right now!”
        <span className={b.quoteAttr}>— Sarah Burns, MSW, LSW · client</span>
      </blockquote>
    </FieldSection>
  )
}

function Close() {
  return (
    <FieldSection id="close" num="09" crumb="what I’d do differently">
      <Ask kicker="next time">What would I ask <em>differently</em>?</Ask>
      <Prose>
        I’d start from the constraint, not the possibilities. Naming the core need in week one — less,
        not more — would have saved me a build full of tools nobody asked for. And I learned not to put
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
