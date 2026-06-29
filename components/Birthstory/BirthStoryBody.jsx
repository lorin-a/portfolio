'use client'

import { Section, SectionHead, BeforeAfter, useSeen, sys } from './kit'
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
    ['Role', 'UX/UI · Research · Copywriting · Brand'],
    ['Team', 'Lorin Anderberg · Michael Juan'],
    ['Timeline', '6-week graduate studio'],
    ['Client', 'Sarah Burns (MSW) · Tamar Krishnamurti (PhD)'],
    ['Context', 'CMU MA Design · Studio II: IXD'],
    ['Outcome', 'R&D for an app the client intends to build'],
  ]
  return (
    <section ref={ref} className={`${b.meta} ${seen ? sys.in : ''}`}>
      <dl className={b.metaList}>
        {rows.map(([k, v], i) => (
          <div key={k} className={`${b.metaItem} ${sys.up}`} style={{ '--d': `${i * 50}ms` }}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </section>
  )
}

function Brief() {
  const cols = [
    ['Requirements', ['Gather the story, the medical facts, the context', 'Help a parent build the birth narrative', 'Log feelings; make room for meaning', 'Support processing, not just recording']],
    ['Our approach', ['Appropriate', 'Supportive', 'Inviting', 'Trauma-informed', 'Easy to understand', 'Useful']],
    ['Deliverables', ['Four flows: onboard, reflect, document, collect', 'A brand that echoes Myana', 'The keepsake Birth Story Book', 'A client presentation']],
  ]
  const ff = [
    ['Collect usable data', 'Intuitive & calming'],
    ['Tell a compelling story', 'Easy to navigate'],
    ['Record the medical record', 'Empathetic & trauma-informed'],
    ['Prompt reflection', 'Therapeutic'],
  ]
  return (
    <Section id="brief" tone="cream">
      <SectionHead
        num="01"
        label="The brief"
        headline={<>A micro-app for the birth, <em>and only the birth</em>.</>}
        takeaway="The ask: design a companion to Myana’s pregnancy and postpartum apps, focused entirely on capturing and reflecting on the Birth Story. These were the bars we held it to."
        wide
      />
      <div className={`${b.cols} ${sys.up}`} style={{ '--d': '220ms' }}>
        {cols.map(([title, items]) => (
          <div key={title} className={b.card}>
            <p className={b.cardLabel}>{title}</p>
            <ul className={b.cardList}>{items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className={`${b.ff} ${sys.up}`} style={{ '--d': '320ms' }}>
        <p className={b.ffLabel}>Every function had a feeling to land</p>
        <ul className={b.ffList}>
          {ff.map(([fn, feel]) => (
            <li key={fn} className={b.ffRow}><span className={b.ffFn}>{fn}</span><span className={b.ffArrow} aria-hidden="true">→</span><span className={b.ffFeel}>{feel}</span></li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function Research() {
  return (
    <Section id="research" tone="tint">
      <SectionHead
        num="02"
        label="Research"
        headline={<>Postpartum needs <em>less</em>, not more.</>}
        takeaway="We interviewed seven parents. Many described their births as traumatic and said they lacked the tools to process them — and that in the fog afterward, another busy app was the last thing they needed. That finding set the whole direction."
        wide
      />
      <div className={`${b.research} ${sys.up}`} style={{ '--d': '220ms' }}>
        <figure className={b.frames}>
          <img src="https://res.cloudinary.com/dc17mvdyv/image/upload/v1782679668/UX_Interview.jpg" alt="A parent interview over video call; the participant’s tile is blurred for privacy." loading="lazy" />
          <img src="https://res.cloudinary.com/dc17mvdyv/image/upload/v1782679669/UX_Interview_2.jpg" alt="A second parent interview over video call; the participant’s tile is blurred for privacy." loading="lazy" />
          <figcaption>Parent interviews · interviewee blurred for privacy</figcaption>
        </figure>
        <aside className={b.bigStat}>
          <span className={b.bigNum}>7</span>
          <span className={b.bigCap}>parents interviewed about their birth experience</span>
        </aside>
      </div>
    </Section>
  )
}

function Voice() {
  return (
    <Section id="voice" tone="cream">
      <SectionHead
        num="06"
        label="The voice"
        headline={<>I rewrote it from <em>trauma-first to community-first</em>.</>}
        takeaway="Our first copy assumed a hard birth. Those experiences live in the data — but the words shouldn’t presume them. A tester flagged “reclaim” as a tell, so I shifted the whole voice toward connection."
        wide
      />
      <div className={sys.up} style={{ '--d': '220ms' }}>
        <BeforeAfter
          before="“Reclaim your narrative.”"
          after="“A space to make sense of it, together.”"
          why={<><strong>Why:</strong> language that presumes trauma can alienate the parent who didn’t experience it that way. Community-first holds both.</>}
        />
      </div>
    </Section>
  )
}

function Outcome() {
  return (
    <Section id="outcome" tone="shade">
      <SectionHead
        num="08"
        label="The outcome"
        headline={<>A concept the client <em>wished was real</em>.</>}
        takeaway="The work became preliminary research and ideation for a Birth Story app that the professors and client intend to build."
      />
      <blockquote className={`${b.quote} ${sys.up}`} style={{ '--d': '220ms' }}>
        “I wish this could be real right now!”
        <span className={b.quoteAttr}>— Sarah Burns, MSW, LSW · client</span>
      </blockquote>
    </Section>
  )
}

function Close() {
  return (
    <Section id="close" tone="cream">
      <SectionHead num="09" label="What I’d do differently" wide />
      <p className={`${b.reflect} ${sys.up}`} style={{ '--d': '120ms' }}>
        I’d begin by simplifying. Naming the core need early would have kept me focused, instead of trying
        to do too much at once — and I learned not to put anything in a wireframe that distracts from the
        main purpose, or opens an avenue for feedback I didn’t mean to invite.
      </p>
      <p className={`${b.tools} ${sys.up}`} style={{ '--d': '220ms' }}>Figma · SVG Repo · Unsplash</p>
    </Section>
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
