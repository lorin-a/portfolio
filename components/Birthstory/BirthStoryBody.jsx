'use client'

import { FieldSection, Ask, Prose, Pair, Finding, useSeen, sys } from './kit'
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

function Meta() {
  const [ref, seen] = useSeen(0.2)
  const rows = [
    ['role', 'UX/UI · research · copywriting · brand'],
    ['team', 'Lorin Anderberg · Michael Juan'],
    ['when', '6-week graduate studio · CMU'],
    ['client', 'Sarah Burns (MSW) · Tamar Krishnamurti (PhD)'],
  ]
  return (
    <section ref={ref} className={`${b.meta} ${seen ? sys.in : ''}`}>
      <dl className={b.metaList}>
        {rows.map(([k, v]) => <div key={k} className={b.metaItem}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  )
}

function Brief() {
  return (
    <FieldSection id="brief" num="01" crumb="brief" when="week 1 · the ask">
      <Ask>What does a <em>birth</em> need that a pregnancy app doesn’t?</Ask>
      <Prose>
        Myana already held pregnancy and postpartum. The gap was the birth itself — the hours that get
        eclipsed by the newborn the moment they arrive. So the brief was narrow on purpose: a companion
        just for capturing and making sense of the Birth Story.
      </Prose>

      <div className={`${b.brief} ${sys.up}`}>
        <div className={b.briefCol}>
          <span className={sys.askKicker}>what we were asked for</span>
          <ul className={b.list}>
            <li>Gather the story, the medical facts, the context</li>
            <li>Help a parent build the birth narrative</li>
            <li>Log feelings; make room for meaning</li>
            <li>Support processing, not just recording</li>
          </ul>
        </div>
        <div className={b.briefCol}>
          <span className={sys.askKicker}>what I held myself to</span>
          <ul className={b.list}>
            <li>Appropriate · supportive · inviting</li>
            <li>Trauma-informed</li>
            <li>Easy to understand</li>
            <li>Actually useful to the care team</li>
          </ul>
        </div>
      </div>

      <div className={`${b.ff} ${sys.up}`}>
        <span className={sys.askKicker}>every function had a feeling to land</span>
        <ul className={b.ffList}>
          {[['collect usable data', 'intuitive & calming'], ['tell a compelling story', 'easy to navigate'], ['record the medical detail', 'empathetic & trauma-informed'], ['prompt reflection', 'therapeutic']].map(([fn, feel]) => (
            <li key={fn}><span className={b.fn}>{fn}</span><span className={b.arrow}>→</span><span className={b.feel}>{feel}</span></li>
          ))}
        </ul>
      </div>
    </FieldSection>
  )
}

function Research() {
  return (
    <FieldSection id="research" num="02" crumb="research" when="week 2 · interviews" alt>
      <Ask>What does a parent actually need in the <em>fog</em> right after?</Ask>

      {/* PAIR — the lived moment (Saul Siguenza, Pexels) ⇄ the evidence we gathered. */}
      <Pair
        tag="the moment"
        answerTag="the evidence"
        photo={{
          ...birthPhoto('fog'),
          alt: 'An exhausted parent rests cheek to cheek with a swaddled newborn in the hours just after birth.',
          cap: 'the hours the app is built for: newborn here, the birth already receding',
        }}
      >
        <img src="https://res.cloudinary.com/dc17mvdyv/image/upload/v1782679668/UX_Interview.jpg" alt="A parent interview over video call; the interviewee’s tile is blurred for privacy." loading="lazy" />
        <figcaption className={sys.shotCap}>interviews · 7 parents · interviewee blurred for privacy</figcaption>
      </Pair>

      <Finding kicker="what set the whole direction">
        Not a feature. A <b>constraint</b>: many of these births were hard, with no place to process
        them, and no room afterward for another busy app. The work became <b>less, not more</b>.
      </Finding>
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
      <Meta />
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
