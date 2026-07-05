'use client'

import { useEffect, useRef, useState } from 'react'
import { sys } from '../kit'
import { IaV1, IaFinal } from '../IaDiagrams'
import VSwitch from './VSwitch'
import s from './VLedger.module.css'

/* ============================================================================
   DIRECTION A — THE LEDGER
   The case study restructured as an ARGUMENT, not a chronology. Every
   consequential call is entered as a numbered decision: the claim, what forced
   it, what it bought. The other side of the ledger holds the liabilities —
   what couldn't be tested, what isn't getting built — as first-class entries,
   because an honest ledger has two columns.
   The 90-second read is designed in: read only the claims, top to bottom, and
   you have the whole argument. Everything else is evidence.
   Body prose + quotes are verbatim from the blessed page. Framing furniture
   (rail labels, entry handles, the masthead line) is provisional — Lorin's
   copy pass finalizes.
   ============================================================================ */

const ENTRIES = [
  {
    id: 'e01',
    handle: 'Less, not more',
    claim: 'The real work was less, not more.',
    forced: {
      quote: '“None of our births went according to plan and they were traumatizing and it does not get discussed enough.”',
      who: 'Group call with my three sisters',
      note: 'Less medical documentation, more photos and a general outline of events to refer back to. Recognition for doing something amazing and hard.',
    },
    bought: 'Four design values that decided everything after: calm and non-clinical · one place for the record and the story · intuitive to navigate · empathetic and trauma-informed.',
    artifact: 'values',
  },
  {
    id: 'e02',
    handle: 'Nothing to answer first',
    claim: 'The app opens straight into documentation, with no home screen and nothing to answer first.',
    forced: {
      note: 'My first version opened by asking the parent where they were: before, during, or after the birth, at home or in the hospital. In testing it read like a form at the front desk while you’re still catching your breath. It was too many questions before anything that mattered.',
    },
    bought: '4 → 0 questions before the first entry.',
    artifact: 'ia',
  },
  {
    id: 'e03',
    handle: 'One timeline',
    claim: 'Four kinds of capture, one timeline you tag and filter.',
    forced: {
      note: 'The brief asked for four kinds of capture, medical, contextual, narrative, and feelings. Earlier versions that separated them tested as fragmented and confusing.',
    },
    bought: 'A note from the delivery room, a prescription, and a voice memo land on the same timeline, the moment they happen.',
    artifact: null,
  },
  {
    id: 'e04',
    handle: 'Simpler every round',
    claim: 'Each round made the app simpler.',
    forced: {
      note: 'The round-one feedback, summarized: too many menus, too many buttons; the first build tried to do everything.',
    },
    bought: 'Three versions through critique, a client check-in, and think-aloud testing. Watching the versions in order, you can see the app calm down.',
    artifact: 'rounds',
  },
  {
    id: 'e05',
    handle: 'Kept 2 · added 1 · cut 2',
    claim: 'Of five optional features, I kept two, added one that wasn’t on the list, and cut two.',
    forced: {
      note: 'Every parent described the same brain fog, so search went in. Trackers and a birth plan were the kind of extra the research kept telling me to leave out.',
      quote: '“It would be tragic to lose these moments if the app went away.”',
      who: 'Parent tester · why the Book stayed',
    },
    bought: 'One home, four ways in: Documentation, Care Pod, Reflection, Search, and the Book that can leave the app.',
    artifact: 'prio',
  },
  {
    id: 'e06',
    handle: 'Words that don’t decide',
    claim: 'The copy is trauma-informed without assuming trauma.',
    forced: {
      quote: '“Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative.”',
      who: 'Parent interview',
    },
    bought: 'I rewrote toward connection and left room for people to bring their own tone.',
    artifact: 'rewrite',
  },
  {
    id: 'e07',
    handle: 'Gentle at 3am',
    claim: 'Calm, emotionally intelligent, and deliberately non-clinical.',
    forced: {
      note: 'Parents told me they’d mostly reach for this in the small hours between feedings, so everything had to read gently to someone exhausted in the middle of the night.',
    },
    bought: 'A lighter pink into a darker teal: a gender spectrum, and the emotional range of the day itself. The gradient ties Birth Story to Myana.',
    artifact: 'brand',
  },
]

const LIABILITIES = [
  {
    label: 'Untested',
    text: 'A six-week studio can’t show whether parents come back weeks later, once the fog has lifted. That return is the whole promise of the product, so it’s the part I most wish I had been able to test.',
  },
  {
    label: 'Unbuilt',
    text: 'There’s no real signal the app will get built: Myana sponsored the project because it might inform future versions of their product, and the pitch was probably as much for us as for them.',
  },
  {
    label: 'Unbalanced',
    text: 'The next thing I’d do is balance the reflection prompts so they reach for joy as readily as they make room for distress.',
  },
]

function Values() {
  return (
    <ol className={s.values}>
      {[
        ['Look & Feel', 'Calm, emotionally intelligent, non-clinical.'],
        ['Function', 'Hold the medical record and the emotional story in one place.'],
        ['Flow', 'Intuitive and easy to navigate.'],
        ['Voice', 'Empathetic and trauma-informed.'],
      ].map(([cat, val]) => (
        <li key={cat}><b>{cat}</b><span>{val}</span></li>
      ))}
    </ol>
  )
}

function Rounds() {
  const shots = [
    ['v1-3', 'Version 1 · a tool for every situation'],
    ['v2-3', 'Version 2 · one filterable notes section'],
    ['v3-2', 'Version 3 · one home, four ways in'],
  ]
  return (
    <div className={s.rounds}>
      {shots.map(([id, cap], i) => (
        <figure key={id} className={s.roundShot}>
          <span className={sys.phone} style={{ width: '100%' }}>
            <span className={sys.phoneNotch} aria-hidden="true" />
            <span className={sys.phoneScreen}>
              <img src={`/images/birthstory/evolution/screens/${id}.png`} alt={cap} loading="lazy" draggable="false" />
            </span>
          </span>
          <figcaption>{cap}</figcaption>
          {i < 2 && <span className={s.roundArrow} aria-hidden="true">→</span>}
        </figure>
      ))}
    </div>
  )
}

function Prio() {
  return (
    <div className={s.prio}>
      {[
        ['2', 'kept', 'sharing · keepsake book'],
        ['1', 'added', 'search'],
        ['2', 'cut', 'trackers · birth plan'],
      ].map(([fig, label, names]) => (
        <div key={label} className={s.prioCell}>
          <span className={s.prioFig}>{fig}</span>
          <span className={s.prioLabel}>{label}</span>
          <span className={s.prioNames}>{names}</span>
        </div>
      ))}
    </div>
  )
}

function Rewrite() {
  return (
    <div className={s.rewrites}>
      {[
        ['“Reclaim your narrative.”', '“A space to make sense of it, in your own words.”'],
        ['“Find strength & support”', '“Care Pod”'],
      ].map(([a, b]) => (
        <div key={a} className={s.rewriteRow}>
          <s className={s.was}>{a}</s>
          <span className={s.became}>{b}</span>
        </div>
      ))}
    </div>
  )
}

function Brand() {
  const swatches = ['#1A434D', '#3E5E6A', '#6D8F99', '#B1C1F4', '#DBADAD', '#9DA3BF', '#BFC0D4', '#E6E5FD', '#DBE6FA', '#FFFCFA']
  return (
    <div className={s.brand}>
      <img className={s.wordmark} src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story wordmark, set in Terfens" width="267" height="54" draggable="false" />
      <div className={s.swatches} aria-hidden="true">
        {swatches.map((hex) => <span key={hex} style={{ background: hex }} />)}
      </div>
    </div>
  )
}

function Artifact({ kind }) {
  if (kind === 'values') return <Values />
  if (kind === 'ia') return (
    <div className={s.iaPair}>
      <figure><IaV1 /><figcaption>ia-v1 · a branching questionnaire</figcaption></figure>
      <figure><IaFinal /><figcaption>ia-final · five tabs, nothing to answer</figcaption></figure>
    </div>
  )
  if (kind === 'rounds') return <Rounds />
  if (kind === 'prio') return <Prio />
  if (kind === 'rewrite') return <Rewrite />
  if (kind === 'brand') return <Brand />
  return null
}

export default function VLedger() {
  const [active, setActive] = useState('open')
  const [progress, setProgress] = useState(0)
  const rootRef = useRef(null)

  /* rail progress + active entry — one scroll listener, rAF-throttled */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        const ids = ['open', ...ENTRIES.map((e) => e.id), 'liabilities', 'balance']
        let current = ids[0]
        for (const id of ids) {
          const el = document.getElementById(`led-${id}`)
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
        }
        setActive(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  /* entry reveals — play once, leave composed */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rows = rootRef.current?.querySelectorAll(`[data-reveal]`)
    if (!rows?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add(s.in); io.unobserve(en.target) }
      }),
      { threshold: 0.15 }
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  const railItems = [
    ['open', 'Opening balance'],
    ...ENTRIES.map((e, i) => [e.id, `${String(i + 1).padStart(2, '0')} ${e.handle}`]),
    ['liabilities', 'Liabilities'],
    ['balance', 'Closing balance'],
  ]

  return (
    <div className={`${sys.case} ${s.page}`} ref={rootRef}>
      <div className={s.spineBar} aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>

      <nav className={s.rail} aria-label="Ledger entries">
        <p className={s.railHead}>Birth Story<br /><span>the ledger</span></p>
        <ol>
          {railItems.map(([id, label]) => (
            <li key={id}>
              <a href={`#led-${id}`} className={active === id ? s.railOn : undefined}>{label}</a>
            </li>
          ))}
        </ol>
      </nav>

      <main className={s.body}>
        {/* Opening balance — what we were handed. All from the course ask documents. */}
        <header id="led-open" className={s.open}>
          <p className={s.kicker}>A case study, entered as a ledger</p>
          <h1 className={s.masthead}>
            Every call I made on Birth Story, what forced it, and what it bought.
          </h1>
          <p className={s.mastNote}>
            Read the numbered claims alone and you have the whole argument. Everything else is evidence.
            The liabilities are entered too, because an honest ledger has two columns.
          </p>

          <div className={s.openGrid} data-reveal>
            <div>
              <p className={s.cellLabel}>The brief</p>
              <p className={s.openLead}>
                Pitch a concept for Myana’s companion micro-app that helps parents document and reflect
                on their birth experience.
              </p>
            </div>
            <div>
              <p className={s.cellLabel}>Required</p>
              <ul className={s.openList}>
                <li>Information gathering: medical, contextual, the narrative, and feelings</li>
                <li>Meaning making, without re-traumatizing</li>
                <li>Onboarding, profile, and nudges</li>
              </ul>
            </div>
            <div>
              <p className={s.cellLabel}>The stakes</p>
              <div className={s.stake}><b>80%</b><span>of U.S. maternal deaths are preventable</span></div>
              <div className={s.stake}><b>65%</b><span>happen after delivery</span></div>
              <div className={s.stake}><b>3×</b><span>the risk for Black mothers</span></div>
            </div>
          </div>
        </header>

        {ENTRIES.map((e, i) => (
          <article key={e.id} id={`led-${e.id}`} className={s.entry} data-reveal>
            <div className={s.entryNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
            <div className={s.entryMain}>
              <h2 className={s.claim}>{e.claim}</h2>
              <div className={s.evidence}>
                <div className={s.forcedBy}>
                  <p className={s.cellLabel}>Forced by</p>
                  {e.forced.quote && (
                    <blockquote className={s.forcedQuote}>
                      {e.forced.quote}
                      {e.forced.who && <cite>{e.forced.who}</cite>}
                    </blockquote>
                  )}
                  {e.forced.note && <p className={s.forcedNote}>{e.forced.note}</p>}
                </div>
                <div className={s.boughtCell}>
                  <p className={s.cellLabel}>What it bought</p>
                  <p className={s.bought}>{e.bought}</p>
                </div>
              </div>
              {e.artifact && <div className={s.artifact}><Artifact kind={e.artifact} /></div>}
            </div>
          </article>
        ))}

        {/* The other column. Entered plainly, once each. */}
        <section id="led-liabilities" className={s.liabilities} data-reveal>
          <h2 className={s.liabHead}>Liabilities</h2>
          <p className={s.liabNote}>Open entries, carried honestly.</p>
          <div className={s.liabGrid}>
            {LIABILITIES.map((l) => (
              <div key={l.label} className={s.liabCell}>
                <p className={s.liabLabel}>{l.label}</p>
                <p className={s.liabText}>{l.text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer id="led-balance" className={s.balance} data-reveal>
          <p className={s.cellLabel}>Closing balance</p>
          <blockquote className={s.finalQuote}>
            “I wish this could be real right now!”
            <cite>Sarah Burns, MSW, LSW · client</cite>
          </blockquote>
          <p className={s.codaLine}>
            I’m a big dreamer. I try to do everything first, then narrow and narrow until I get to the
            heart of it.
          </p>
          <p className={s.codaSub}>
            Designing something and then being able to build it myself is the direction I’m headed.
          </p>
          <div className={s.codaActions}>
            <a className={s.cta} href="mailto:lorinanderberg1@gmail.com">Get in touch</a>
            <a className={s.alt} href="/">See more work</a>
          </div>
        </footer>
      </main>

      <VSwitch active="ledger" />
    </div>
  )
}
