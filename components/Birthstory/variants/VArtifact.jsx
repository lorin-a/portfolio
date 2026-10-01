'use client'

import { useEffect, useRef, useState } from 'react'
import { sys } from '../kit'
import VSwitch from './VSwitch'
import s from './VArtifact.module.css'

/* ============================================================================
   DIRECTION B — ONE ARTIFACT
   A single phone is the narrator. It is pinned for the entire case study, and
   every chapter changes what is on its screen: the reader watches the app get
   designed inside one continuous object — handed over as a name, filled with
   parents' words, opened wrong, reframed, simplified round by round, split
   into its five features, rewritten, painted, and finally handed back.
   No scattered figures, no decoration: every visual is the same object at a
   different moment of the work.
   Body prose + quotes verbatim from the blessed page; chapter kickers are
   provisional furniture for Lorin's copy pass.
   ============================================================================ */

const CHAPTERS = [
  {
    id: 'handoff', kicker: 'The handoff', screen: 'spec',
    lead: 'Pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.',
    prose: ['Myana already supports parents through pregnancy and postpartum. Its researchers saw that the birth itself still went undocumented and unprocessed, and brought that gap to our graduate studio to conceptualize.', 'We were handed the name, the core concept, three required areas, and five optional features. The phone on this page starts exactly where we did: with a name and a list.'],
  },
  {
    id: 'voices', kicker: 'What parents said', screen: 'voices',
    lead: 'Before we built anything, I listened.',
    prose: ['I researched blogs and existing products and ran information interviews with family to get familiar with the subject: my three sisters, my mom, and my friend with a toddler.'],
    quote: { text: '“None of our births went according to plan and they were traumatizing and it does not get discussed enough.”', who: 'Group call with my three sisters' },
  },
  {
    id: 'wrongdoor', kicker: 'The wrong door', screen: 'form',
    lead: 'My first structure opened with questions.',
    prose: ['My first version opened by asking the parent where they were: before, during, or after the birth, at home or in the hospital.', 'I thought that was thorough, but in testing it read like a form at the front desk while you’re still catching your breath. It was too many questions before anything that mattered.'],
  },
  {
    id: 'reframe', kicker: 'The reframe', screen: 'home',
    lead: 'The app opens straight into documentation, with no home screen and nothing to answer first.',
    prose: ['So I cut the questions entirely. The app opens straight into note-taking, the thing parents most wanted, and onboarding introduces the rest, which stay in the nav bar the whole time.', 'I also stopped splitting the data up. The brief asked for four kinds of capture, medical, contextual, narrative, and feelings, and instead of giving each its own corner I put them on one timeline you tag and filter.'],
  },
  {
    id: 'v1', kicker: 'Version 1 · Week 3', screen: 'v1',
    lead: 'The first version tried to do everything.',
    prose: ['A tool for every situation, with sub-menus inside menus. It was disorienting. The feedback, summarized: too many menus, too many buttons.'],
  },
  {
    id: 'v2', kicker: 'Version 2 · Week 4', screen: 'v2',
    lead: 'Clearer, but still too many options.',
    prose: ['For the second version I consolidated everything into one filterable notes section and narrowed the flow to two actions, document and reflect, one at a time. The copy drew a flag too: the word “reclaim” made the app feel braced for trauma.'],
  },
  {
    id: 'v3', kicker: 'Version 3 · Week 5', screen: 'v3',
    lead: 'Only the features parents came back to.',
    prose: ['By the third version I kept only the features parents consistently valued, and left room to go deeper. Watching the versions in order, you can see the app calm down.'],
  },
  {
    id: 'doc', kicker: 'The product · Documentation', screen: 'doc',
    lead: 'The core feature: all information-gathering, unified.',
    prose: ['Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add, and a note from the delivery room, a prescription, and a voice memo when your hands are full all land on it together, the moment they happen.'],
  },
  {
    id: 'carepod', kicker: 'The product · Care Pod', screen: 'carepod',
    lead: 'The heart of the concept.',
    prose: ['The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh.', 'One support person sends out updates, photos, and voice memos, loved ones reply with messages and voice notes, and all of it saves into the Birth Story, so the whole story of who was there and how loved that child was stays in one place.'],
  },
  {
    id: 'reflect', kicker: 'The product · Reflection', screen: 'reflect',
    lead: 'No blank page.',
    prose: ['Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.'],
  },
  {
    id: 'search', kicker: 'The product · Search', screen: 'search',
    lead: 'The one feature nobody asked for.',
    prose: ['As the entries pile up, I didn’t want anyone digging through the whole app to find one memory, so search is a swipe away from anywhere and filters by emotion, category, or keyword. I added it because every parent described the same brain fog.'],
  },
  {
    id: 'book', kicker: 'The product · The Book', screen: 'book',
    lead: 'It can leave the app.',
    prose: ['We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear. So the whole record can leave the app, as a printed book or a free PDF, curated from what’s already there and open to the people who were part of it.'],
    quote: { text: '“It would be tragic to lose these moments if the app went away.”', who: 'Parent tester' },
  },
  {
    id: 'words', kicker: 'The words', screen: 'rewrite',
    lead: 'The copy is trauma-informed without assuming trauma.',
    prose: ['Because I knew births could be traumatic, I wrote the first copy in a careful, trauma-informed tone, and a parent I interviewed showed me I had gone too far. She didn’t connect with the word “reclaim,” and it made me realize I was leaning on the hard parts, missing how much a birth can also be about connection.', 'So I rewrote toward connection and left room for people to bring their own tone. Same for “Find strength & support” as a feature name: it became the Care Pod.'],
    quote: { text: '“Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative.”', who: 'Parent interview' },
  },
  {
    id: 'surface', kicker: 'The surface', screen: 'brand',
    lead: 'Calm, emotionally intelligent, and deliberately non-clinical.',
    prose: ['Myana already used a gradient, so I built one here to tie the two together. I chose a lighter pink into a darker teal because it let me hold two things at once: a gender spectrum, and the emotional range of the day itself.', 'Parents told me they’d mostly reach for this in the small hours between feedings, so everything had to read gently to someone exhausted in the middle of the night.'],
  },
  {
    id: 'outcome', kicker: 'The handback', screen: 'quote',
    lead: 'The client loved it, and it still isn’t getting built.',
    prose: ['When we presented, the client had almost nothing to change. There’s no real signal the app will get built: Myana sponsored the project because it might inform future versions of their product, and the pitch was probably as much for us as for them, but it gave the concept a real starting point.', 'None of the screens above are flat mockups: I rebuilt the wireframes as working prototypes, so what you saw in this phone is the real interaction.'],
  },
]

const IMG_SCREENS = {
  home: ['/images/birthstory/bs-home.png', 'The final home screen: the app opens directly into the documentation timeline.'],
  v1: ['/images/birthstory/evolution/screens/v1-3.png', 'Version 1: reflect, document, and connect, the build that did too much.'],
  v2: ['/images/birthstory/evolution/screens/v2-3.png', 'Version 2: one consolidated, filterable menu.'],
  v3: ['/images/birthstory/evolution/screens/v3-2.png', 'Version 3: the final home, one place to start.'],
  doc: ['/images/birthstory/bs-doc-medical.png', 'A medical entry open on the documentation timeline.'],
  carepod: ['/images/birthstory/bs-carepod-update.png', 'The Care Pod: one update goes out to loved ones.'],
  reflect: ['/images/birthstory/bs-reflect-card.png', 'The reflection deck deals a gentle prompt.'],
  search: ['/images/birthstory/bs-search-panel.png', 'The search drawer, filtering by emotion, category, or keyword.'],
  book: ['/images/birthstory/bs-book-order.png', 'The Birth Story Book screen: order a printed keepsake or download a PDF.'],
}

function ScreenLayer({ kind }) {
  if (kind === 'spec') return (
    <div className={s.specScreen}>
      <p className={s.specName}>Birth Story</p>
      <p className={s.specGiven}>the name, as given</p>
      <ul className={s.specReq}>
        <li>Information gathering</li>
        <li>Meaning making</li>
        <li>Onboarding + nudges</li>
      </ul>
      <div className={s.specChips}>
        {['Baby Book', 'Trackers', 'Birth Plan', 'Sharing', 'Partner Participation'].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      <p className={s.specFoot}>3 required areas · 5 optional features</p>
    </div>
  )
  if (kind === 'voices') return (
    <div className={s.voicesScreen}>
      <p className={s.voicesLabel}>what they told me · summarized</p>
      {[
        'Less medical documentation, more photos and a general outline to refer back to.',
        'Recognition for doing something amazing and hard.',
        'First couple of weeks you are up and on your phone every 2 hours while breastfeeding.',
        'Select-one answers now. The longer version later, once the fog lifts.',
      ].map((t, i) => <p key={i} className={i % 2 ? s.bubbleR : s.bubbleL}>{t}</p>)}
    </div>
  )
  if (kind === 'form') return (
    <div className={s.formScreen}>
      <p className={s.formHead}>Before we begin</p>
      {['Are you before, during, or after the birth?', 'Are you at home or in the hospital?', 'Who is filling this out?', 'What would you like to track?'].map((q, i) => (
        <div key={q} className={s.formQ}><span>{i + 1}</span><p>{q}</p></div>
      ))}
      <p className={s.formVerdict}>4 questions before the first entry</p>
    </div>
  )
  if (kind === 'rewrite') return (
    <div className={s.rewriteScreen}>
      <p className={s.rwLabel}>rewrites</p>
      <div className={s.rwPair}>
        <s>“Reclaim your narrative.”</s>
        <p>“A space to make sense of it, in your own words.”</p>
      </div>
      <div className={s.rwPair}>
        <s>“Find strength & support”</s>
        <p>“Care Pod”</p>
      </div>
    </div>
  )
  if (kind === 'brand') return (
    <div className={s.brandScreen}>
      <img src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story wordmark, set in Terfens, over the blush-to-teal gradient" width="267" height="54" draggable="false" />
    </div>
  )
  if (kind === 'quote') return (
    <div className={s.quoteScreen}>
      <p>“I wish this could be real right now!”</p>
      <span>Sarah Burns, MSW, LSW · client</span>
    </div>
  )
  const img = IMG_SCREENS[kind]
  return img ? <img src={img[0]} alt={img[1]} loading="lazy" draggable="false" /> : null
}

export default function VArtifact() {
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)

  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll('[data-chapter]')
    if (!sections?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(Number(en.target.dataset.chapter))
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className={`${sys.case} ${s.page}`} ref={rootRef}>
      <header className={s.masthead}>
        <p className={s.kicker}>One artifact, fifteen moments</p>
        <h1 className={s.title}>The whole case study happens to one object.</h1>
        <p className={s.mastNote}>
          The phone below is pinned for the entire story. Every chapter changes what is on its screen:
          you are watching the app get designed.
        </p>
      </header>

      <div className={s.duet}>
        <div className={s.copyCol}>
          {CHAPTERS.map((c, i) => (
            <section key={c.id} id={`ch-${c.id}`} data-chapter={i} className={s.chapter}>
              <p className={s.chKicker}>{c.kicker}</p>
              <h2 className={s.chLead}>{c.lead}</h2>
              {c.prose.map((p, j) => <p key={j} className={s.chProse}>{p}</p>)}
              {c.quote && (
                <blockquote className={s.chQuote}>
                  {c.quote.text}
                  <cite>{c.quote.who}</cite>
                </blockquote>
              )}
            </section>
          ))}
        </div>

        <div className={s.stageCol}>
          <div className={s.stage}>
            <p className={s.counter} aria-hidden="true">
              <span>{String(active + 1).padStart(2, '0')}</span> / {String(CHAPTERS.length).padStart(2, '0')} · {CHAPTERS[active].kicker.toLowerCase()}
            </p>
            <span className={`${sys.phone} ${s.device}`}>
              <span className={sys.phoneNotch} aria-hidden="true" />
              <span className={`${sys.phoneScreen} ${s.deviceScreen}`}>
                {CHAPTERS.map((c, i) => (
                  <span key={c.id} className={`${s.layer} ${i === active ? s.layerOn : ''}`} aria-hidden={i !== active}>
                    <ScreenLayer kind={c.screen} />
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </div>

      <footer className={s.coda}>
        <p className={s.codaLine}>
          I’m a big dreamer. I try to do everything first, then narrow and narrow until I get to the
          heart of it.
        </p>
        <p className={s.codaSub}>
          Designing something and then being able to build it myself is the direction I’m headed. The
          working prototypes on this page are that proof.
        </p>
        <div className={s.codaActions}>
          <a className={s.cta} href="mailto:lorinanderberg1@gmail.com">Get in touch</a>
          <a className={s.alt} href="/">See more work</a>
        </div>
      </footer>

      <VSwitch active="artifact" />
    </div>
  )
}
