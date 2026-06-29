'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import d from './IaDiagrams.module.css'

/* Native IA diagrams — the Birth Story information architecture redrawn as page
   elements (paper ground, teal palette) instead of raster Figma canvas exports.
   Structure and labels are faithful to the Figma flows; only the material is
   the page's. ia-final = the shipped five-tab tree. ia-v1 = the first answer,
   a branching questionnaire kept deliberately busy. */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* ── icons (stroke = currentColor) ── */
function Icon({ name }) {
  const p = {
    home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v9h14v-9" /></>,
    pod: <path d="M12 20s-6.5-4.2-9-7.6A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9 6.4C18.5 15.8 12 20 12 20z" />,
    plus: <><path d="M12 6v12" /><path d="M6 12h12" /></>,
    book: <><path d="M12 6c-2-1.3-4.7-1.5-7-1v12c2.3-.5 5-.3 7 1 2-1.3 4.7-1.5 7-1V5c-2.3-.5-5-.3-7 1z" /><path d="M12 6v13" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-3.8-3.8" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p[name]}
    </svg>
  )
}

/* ════ ia-final — the shipped five-tab tree ════ */

const TABS = [
  { icon: 'home', label: 'Home', screens: ['Notes', 'Notes', 'Journal'] },
  { icon: 'pod', label: 'Care Pod', screens: ['Care Pod', 'Updates', 'Stories'] },
  { icon: 'plus', label: 'New Note', screens: ['New Note'], center: true },
  { icon: 'book', label: 'Book', screens: ['Book', 'About', 'Story'] },
  { icon: 'search', label: 'Search', screens: ['Search'] },
]

export function IaFinal() {
  return (
    <div className={`${d.panel} ${d.final}`}>
      <ol className={d.cols}>
        {TABS.map((t) => (
          <li key={t.label} className={`${d.col} ${t.center ? d.colCenter : ''}`}>
            <span className={`${d.tile} ${t.center ? d.tilePlus : ''}`} aria-hidden="true"><Icon name={t.icon} /></span>
            <span className={d.tileName}>{t.label}</span>
            <ul className={d.stack}>
              {t.screens.map((sc, i) => (
                <li key={`${sc}-${i}`} className={`${d.node} ${i === 0 ? d.nodePrimary : d.nodeSub}`}>{sc}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ════ ia-v1 — the first answer: a branching questionnaire ════ */

const ANSWERS = [
  'I am new to the app and exploring the features',
  'I am actively going in to labor and want to record the experience',
  'I am a support person helping document the birth experience',
  'I already gave birth and want to reflect on the experience',
]
const DESTS = ['Onboarding Sequence', 'Birth Experience Home Page', 'Reflect Home Page']
const EDGES = [[0, 0], [1, 1], [2, 1], [3, 2]]

const GROUPS = [
  { q: 'Let’s start with the basics:', items: ['Where are you?', 'Home / Hospital / Other', 'What time and date?', 'Who is with you?'] },
  { q: 'Where you are in the process:', items: ['Just started having contractions', 'Water just broke', 'I am over 3′ dilated', 'I am under 3′ dilated'] },
  { q: 'What other details do you want to remember about this moment?', items: ['Notes', 'Images', 'Voice Recording'] },
]

export function IaV1() {
  const wrapRef = useRef(null)
  const answerRefs = useRef([])
  const destRefs = useRef([])
  const [lines, setLines] = useState([])

  useIso(() => {
    const measure = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      const wb = wrap.getBoundingClientRect()
      if (wb.width < 560) { setLines([]); return } // stacked layout: no fan
      const next = EDGES.map(([a, t]) => {
        const ae = answerRefs.current[a]
        const te = destRefs.current[t]
        if (!ae || !te) return null
        const ab = ae.getBoundingClientRect()
        const tb = te.getBoundingClientRect()
        const x1 = ab.right - wb.left
        const y1 = ab.top + ab.height / 2 - wb.top
        const x2 = tb.left - wb.left
        const y2 = tb.top + tb.height / 2 - wb.top
        const dx = Math.max(28, (x2 - x1) * 0.45)
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
      }).filter(Boolean)
      setLines(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 350) // re-measure after webfonts settle
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t) }
  }, [])

  return (
    <div className={`${d.panel} ${d.v1}`}>
      <div className={d.branch} ref={wrapRef}>
        <svg className={d.fan} aria-hidden="true" preserveAspectRatio="none">
          {lines.map((p, i) => <path key={i} d={p} />)}
        </svg>
        <div className={d.branchCol}>
          <p className={d.ask}>What phase in your birth story are you currently in?</p>
          <ul className={d.answers}>
            {ANSWERS.map((a, i) => (
              <li key={a} ref={(el) => { answerRefs.current[i] = el }} className={`${d.node} ${d.nodeOutline}`}>{a}</li>
            ))}
          </ul>
        </div>
        <ul className={d.dests}>
          {DESTS.map((dst, i) => (
            <li key={dst} ref={(el) => { destRefs.current[i] = el }} className={`${d.node} ${d.nodePrimary}`}>{dst}</li>
          ))}
        </ul>
      </div>

      <div className={d.questionnaire}>
        {GROUPS.map((g) => (
          <div key={g.q} className={d.group}>
            <p className={d.groupQ}>{g.q}</p>
            <ul className={d.groupItems}>
              {g.items.map((it) => <li key={it} className={`${d.node} ${d.nodeOutline}`}>{it}</li>)}
            </ul>
          </div>
        ))}
        <div className={d.terminal}>
          <span className={d.terminalArrow} aria-hidden="true">→</span>
          <span className={`${d.node} ${d.nodePrimary}`}>First Note Entry</span>
        </div>
      </div>
    </div>
  )
}
