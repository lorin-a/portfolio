'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { sys } from '../kit'
import VSwitch from './VSwitch'
import s from './VAtlas.module.css'

/* ============================================================================
   DIRECTION C — THE ATLAS
   The whole project as one composed synthesis map, shown complete in the first
   viewport: every interview, decision, screen, and quote has a coordinate, and
   the threads between them are drawn. That full view IS the 90-second read.
   Scrolling is a guided walk: a camera pans and magnifies the same map region
   by region while the copy panel narrates, and a minimap keeps you oriented.
   Overview first, detail on demand — the reader always knows where they are
   and how each part connects to the rest.
   The board is aria-hidden; the narrative panels carry every fact, so the
   screen-reader read is clean and linear. Copy verbatim from the blessed page.
   ============================================================================ */

const BW = 1600
const BH = 1100

const REGIONS = {
  brief: { x: 60, y: 60, w: 430, h: 350 },
  research: { x: 60, y: 470, w: 470, h: 400 },
  voice: { x: 60, y: 930, w: 470, h: 130 },
  values: { x: 610, y: 470, w: 370, h: 280 },
  architecture: { x: 620, y: 60, w: 440, h: 350 },
  iteration: { x: 610, y: 810, w: 490, h: 250 },
  product: { x: 1130, y: 300, w: 410, h: 460 },
  brand: { x: 1130, y: 60, w: 410, h: 190 },
  outcome: { x: 1130, y: 830, w: 410, h: 230 },
}

/* evidence → decision threads, in board coordinates (center to center-ish) */
const THREADS = [
  [295, 410, 295, 470], // brief → research
  [530, 660, 610, 610], // research → values
  [530, 790, 610, 990], // research → voice (the words)
  [820, 470, 830, 410], // values → architecture
  [800, 750, 850, 810], // values → iteration
  [980, 610, 1130, 530], // values → product
  [1100, 930, 1180, 830], // iteration → outcome-ish… no: iteration → product
  [1060, 240, 1130, 155], // architecture → brand? keep light
  [1335, 760, 1335, 830], // product → outcome
]

const STEPS = [
  {
    id: 'overview', region: null, kicker: 'The atlas',
    lead: 'This is the whole project in one view.',
    prose: 'Every interview, decision, and screen on this map has a place, and the threads between them are real: each one connects a thing a parent said to a call I made. Scroll, and I’ll walk you through it.',
  },
  {
    id: 'brief', region: 'brief', kicker: 'The brief',
    lead: 'Pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.',
    prose: 'We were handed the name, the core concept, three required areas, and five optional features. In the US, 80% of maternal deaths are preventable and 65% happen after delivery: a dangerous, under-supported window.',
  },
  {
    id: 'research', region: 'research', kicker: 'Research',
    lead: 'Before we built anything, I listened.',
    prose: 'I researched blogs and existing products and ran information interviews with family: my three sisters, my mom, and my friend with a toddler. “None of our births went according to plan and they were traumatizing and it does not get discussed enough.” Parents wanted less medical documentation, more photos, and recognition for doing something amazing and hard.',
  },
  {
    id: 'values', region: 'values', kicker: 'The hub',
    lead: 'Four design values decided everything after.',
    prose: 'Calm, emotionally intelligent, non-clinical. The medical record and the emotional story in one place. Intuitive to navigate. Empathetic and trauma-informed. Every thread on this map passes through here.',
  },
  {
    id: 'architecture', region: 'architecture', kicker: 'Architecture',
    lead: 'The app opens straight into documentation, with no home screen and nothing to answer first.',
    prose: 'My first version opened by asking the parent where they were. In testing it read like a form at the front desk while you’re still catching your breath. So I cut the questions entirely: 4 → 0 before the first entry, and four kinds of capture unified onto one timeline you tag and filter.',
  },
  {
    id: 'iteration', region: 'iteration', kicker: 'Iteration',
    lead: 'Each round made the app simpler.',
    prose: 'Three versions through critique, a client check-in, and think-aloud testing with parents. The first tried to do everything; the second consolidated but still offered too much; the third kept only the features parents came back to. Watching the versions in order, you can see the app calm down.',
  },
  {
    id: 'product', region: 'product', kicker: 'The product',
    lead: 'One home, four ways in.',
    prose: 'Documentation is the core; Care Pod is the heart, born from a single interview; Reflection hands you a prompt instead of a blank page; Search is the one feature nobody asked for, added because every parent described the same brain fog; and the Book can leave the app, as a printed keepsake or a free PDF. Trackers and a birth plan were cut: the kind of extra the research kept telling me to leave out.',
  },
  {
    id: 'voice', region: 'voice', kicker: 'The words',
    lead: 'The copy is trauma-informed without assuming trauma.',
    prose: '“Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative.” So “Reclaim your narrative” became “A space to make sense of it, in your own words,” and “Find strength & support” became the Care Pod.',
  },
  {
    id: 'brand', region: 'brand', kicker: 'The surface',
    lead: 'Calm, emotionally intelligent, and deliberately non-clinical.',
    prose: 'Myana already used a gradient, so I built one here to tie the two together: a lighter pink into a darker teal, a gender spectrum and the emotional range of the day itself. Everything had to read gently to someone exhausted in the middle of the night.',
  },
  {
    id: 'outcome', region: 'outcome', kicker: 'Outcome',
    lead: 'The client loved it, and it still isn’t getting built.',
    prose: '“I wish this could be real right now!” — Sarah Burns, MSW, LSW, client. There’s no real signal the app will get built; Myana sponsored the project because it might inform future versions of their product. What I most wish I could have tested: whether parents come back once the fog lifts. That return is the whole promise.',
  },
]

function Thumb({ id }) {
  return (
    <span className={`${sys.phone} ${s.thumb}`}>
      <span className={sys.phoneScreen}>
        <img src={`/images/birthstory/evolution/screens/${id}.png`} alt="" loading="lazy" draggable="false" />
      </span>
    </span>
  )
}

/* the map itself — presentational (aria-hidden); the step panels carry the narrative */
function Board() {
  return (
    <div className={s.board} data-board aria-hidden="true">
      <svg className={s.threads} viewBox={`0 0 ${BW} ${BH}`}>
        {THREADS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </svg>

      {/* brief */}
      <div className={s.region} style={{ left: 60, top: 60, width: 430, height: 350 }}>
        <p className={s.regionTag}>01 · the brief</p>
        <p className={s.givenName}>Birth Story</p>
        <p className={s.givenNote}>the name, as given · 3 required areas · 5 optional features</p>
        <div className={s.stakes}>
          <span><b>80%</b> preventable</span>
          <span><b>65%</b> after delivery</span>
          <span><b>3×</b> for Black mothers</span>
        </div>
      </div>

      {/* research */}
      <div className={s.region} style={{ left: 60, top: 470, width: 470, height: 400 }}>
        <p className={s.regionTag}>02 · research</p>
        <div className={s.people}>
          {['sister', 'sister', 'sister', 'mom', 'friend', 'TAP ×3'].map((p, i) => (
            <span key={i} className={s.person}>{p}</span>
          ))}
        </div>
        <p className={s.scrap}>“None of our births went according to plan and they were traumatizing and it does not get discussed enough.”</p>
        <p className={s.scrapAlt}>less medical logging · more photos · recognition for doing something amazing and hard</p>
      </div>

      {/* the words */}
      <div className={s.region} style={{ left: 60, top: 930, width: 470, height: 130 }}>
        <p className={s.regionTag}>07 · the words</p>
        <p className={s.rw}><s>“Reclaim your narrative.”</s> → “A space to make sense of it, in your own words.”</p>
        <p className={s.rw}><s>“Find strength & support”</s> → “Care Pod”</p>
      </div>

      {/* values hub */}
      <div className={`${s.region} ${s.hub}`} style={{ left: 610, top: 470, width: 370, height: 280 }}>
        <p className={s.regionTag}>03 · four values</p>
        <div className={s.valueChips}>
          {['calm, non-clinical', 'record + story, one place', 'intuitive to navigate', 'trauma-informed'].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      </div>

      {/* architecture */}
      <div className={s.region} style={{ left: 620, top: 60, width: 440, height: 350 }}>
        <p className={s.regionTag}>04 · architecture</p>
        <div className={s.iaSketch}>
          <div className={s.iaBranch}>
            <span>before / during / after?</span>
            <span>home / hospital?</span>
            <span>who is filling this out?</span>
          </div>
          <span className={s.iaMove}>4 → 0</span>
          <div className={s.iaTabs}>
            {['story', 'pod', '+', 'reflect', 'book'].map((t) => <i key={t}>{t}</i>)}
          </div>
        </div>
        <p className={s.regionNote}>nothing to answer before the first entry · one tagged timeline</p>
      </div>

      {/* iteration */}
      <div className={s.region} style={{ left: 610, top: 810, width: 490, height: 250 }}>
        <p className={s.regionTag}>05 · three rounds</p>
        <div className={s.roundRow}>
          <Thumb id="v1-3" /><Thumb id="v2-3" /><Thumb id="v3-2" />
        </div>
        <p className={s.regionNote}>v1 did everything → v2 consolidated → v3 kept what parents came back to</p>
      </div>

      {/* product */}
      <div className={s.region} style={{ left: 1130, top: 300, width: 410, height: 460 }}>
        <p className={s.regionTag}>06 · the product</p>
        <ul className={s.featList}>
          <li><b>Documentation</b><span>the core · one timeline</span></li>
          <li><b>Care Pod</b><span>the heart · from one interview</span></li>
          <li><b>Reflection</b><span>no blank page</span></li>
          <li><b>Search</b><span>my addition · brain fog</span></li>
          <li><b>The Book</b><span>it can leave the app</span></li>
          <li className={s.cut}><s>Trackers</s><span>cut</span></li>
          <li className={s.cut}><s>Birth plan</s><span>cut</span></li>
        </ul>
      </div>

      {/* brand */}
      <div className={`${s.region} ${s.brandRegion}`} style={{ left: 1130, top: 60, width: 410, height: 190 }}>
        <p className={s.regionTag}>08 · the surface</p>
        <img className={s.mark} src="/images/birthstory/wordmark-birthstory.svg" alt="" width="267" height="54" draggable="false" />
        <p className={s.regionNote}>blush → periwinkle → teal · gentle at 3am</p>
      </div>

      {/* outcome */}
      <div className={s.region} style={{ left: 1130, top: 830, width: 410, height: 230 }}>
        <p className={s.regionTag}>09 · outcome</p>
        <p className={s.finalScrap}>“I wish this could be real right now!”</p>
        <p className={s.regionNote}>Sarah Burns, MSW, LSW · client</p>
        <p className={s.openFlag}>open: the return once the fog lifts went untested · no commitment to build</p>
      </div>
    </div>
  )
}

export default function VAtlas() {
  const [active, setActive] = useState(0)
  const stageRef = useRef(null)
  const boardRef = useRef(null)
  const activeRef = useRef(0)

  const applyCamera = useCallback((idx) => {
    const stage = stageRef.current
    const board = boardRef.current
    if (!stage || !board) return
    const sw = stage.clientWidth
    const sh = stage.clientHeight
    const regionKey = STEPS[idx].region
    let scale, cx, cy, xShift = 0, yShift = 0
    if (!regionKey) {
      scale = Math.min(sw / BW, sh / BH) * 0.92
      cx = BW / 2
      cy = BH / 2
    } else {
      const r = REGIONS[regionKey]
      const pad = 70
      scale = Math.min(sw / (r.w + pad * 2), sh / (r.h + pad * 2))
      scale = Math.min(scale, 1.5)
      cx = r.x + r.w / 2
      cy = r.y + r.h / 2
      /* clear the narration panel: desktop panel sits left, mobile panel sits low */
      if (sw > 700) xShift = Math.min(200, sw * 0.14)
      else yShift = -sh * 0.14
    }
    board.style.transform = `translate(${sw / 2 - cx * scale + xShift}px, ${sh / 2 - cy * scale + yShift}px) scale(${scale})`
  }, [])

  useEffect(() => {
    activeRef.current = active
    applyCamera(active)
  }, [active, applyCamera])

  useEffect(() => {
    const onResize = () => applyCamera(activeRef.current)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [applyCamera])

  useEffect(() => {
    const steps = document.querySelectorAll('[data-atlas-step]')
    if (!steps.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) setActive(Number(en.target.dataset.atlasStep))
      }),
      { threshold: 0.5 }
    )
    steps.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const region = STEPS[active].region ? REGIONS[STEPS[active].region] : { x: 0, y: 0, w: BW, h: BH }

  return (
    <div className={`${sys.case} ${s.page}`}>
      <header className={s.masthead}>
        <p className={s.kicker}>Birth Story · the atlas</p>
        <h1 className={s.title}>The whole project, one map.</h1>
        <p className={s.mastNote}>
          Ninety seconds on the full view tells you what I did. The walk below tells you why: the camera
          visits each region of the same map, in the order the work happened.
        </p>
      </header>

      <div className={s.track}>
        <div className={s.stage} ref={stageRef}>
          <div ref={boardRef} className={s.boardCamera}><Board /></div>

          {/* minimap — always oriented */}
          <div className={s.minimap} aria-hidden="true">
            {Object.values(REGIONS).map((r, i) => (
              <span
                key={i}
                className={s.miniRegion}
                style={{ left: `${(r.x / BW) * 100}%`, top: `${(r.y / BH) * 100}%`, width: `${(r.w / BW) * 100}%`, height: `${(r.h / BH) * 100}%` }}
              />
            ))}
            <span
              className={s.miniView}
              style={{ left: `${(region.x / BW) * 100}%`, top: `${(region.y / BH) * 100}%`, width: `${(region.w / BW) * 100}%`, height: `${(region.h / BH) * 100}%` }}
            />
          </div>
        </div>

        {STEPS.map((st, i) => (
          <section key={st.id} data-atlas-step={i} className={s.step}>
            <div className={`${s.panel} ${i === active ? s.panelOn : ''}`}>
              <p className={s.panelKicker}>{st.kicker}</p>
              <h2 className={s.panelLead}>{st.lead}</h2>
              <p className={s.panelProse}>{st.prose}</p>
            </div>
          </section>
        ))}
      </div>

      <footer className={s.coda}>
        <p className={s.codaLine}>
          I’m a big dreamer. I try to do everything first, then narrow and narrow until I get to the
          heart of it.
        </p>
        <p className={s.codaSub}>
          Designing something and then being able to build it myself is the direction I’m headed. This
          map, and the prototypes it points to, are that proof.
        </p>
        <div className={s.codaActions}>
          <a className={s.cta} href="mailto:lorinanderberg1@gmail.com">Get in touch</a>
          <a className={s.alt} href="/">See more work</a>
        </div>
      </footer>

      <VSwitch active="atlas" />
    </div>
  )
}
