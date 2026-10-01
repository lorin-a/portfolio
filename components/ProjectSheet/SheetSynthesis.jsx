'use client'

import { useEffect, useRef, useState } from 'react'
import m from './SheetMotionLibrary.module.css'
import s from './SheetSynthesis.module.css'

/* FS243–FS244: one map, findings to product, built in four stages on the
   same chevron track as the dashboard player. Each stage adds a layer and
   quiets the one before: what we heard → four themes → where they meet
   (the void, the thesis) → what we built (Groundswell fills the void).
   Content: Lorin's synthesis board (Figma, Groundswell-Synthesis);
   scenario lines condensed from its bubbles; theme → component mapping
   DRAFT, hers to confirm. Reduced motion: no autoplay, no drawing. */

const STEPS = [
  { view: 'What we heard', dur: 6 },
  { view: 'Four themes', dur: 5 },
  { view: 'Where they meet', dur: 7 },
  { view: 'What we built', dur: 7 },
]

const GLYPH = [
  <><path d="M5 17c1.5-1.2 2.5-3 2.5-5.5V7.5h-4V12h3.5" /><path d="M13.5 17c1.5-1.2 2.5-3 2.5-5.5V7.5h-4V12h3.5" /></>,
  <><circle cx="12" cy="5" r="2.2" /><circle cx="19" cy="12" r="2.2" /><circle cx="12" cy="19" r="2.2" /><circle cx="5" cy="12" r="2.2" /></>,
  <><path d="M12 4l8 8-8 8-8-8z" /><path d="M12 4v16M4 12h16" opacity=".5" /></>,
  <><circle cx="12" cy="12" r="3" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /></>,
]

/* geometry, in a 1200 × 700 field */
const C = { x: 600, y: 350 }, V = 150, R = 62
const THEMES = [
  { id: 'rec', label: 'Recognition', x: 600, y: 84 },
  { id: 'env', label: 'Environment', x: 975, y: 350 },
  { id: 'cul', label: 'Culture', x: 600, y: 616 },
  { id: 'sys', label: ['Systemic', 'Issues'], x: 225, y: 350 },
]
const QUOTES = [
  { t: ['“I feel trapped.”'], x: 40, y: 78, a: 'start' },
  { t: ['“I was not prepared', 'for this.”'], x: 1160, y: 78, a: 'end' },
  { t: ['“What mental health?”'], x: 40, y: 640, a: 'start' },
  { t: ['“There is no time', 'to grieve.”'], x: 1160, y: 618, a: 'end' },
]
const SCENES = [
  { t: ['Admin tasks crowd out', 'the work I trained for'], x: 405, y: 210 },
  { t: ['Breaks encouraged,', 'never protected'], x: 795, y: 210 },
  { t: ['No relief nurse,', 'no real breaks'], x: 405, y: 490 },
  { t: ['Nowhere to go', 'on a bad day'], x: 795, y: 490 },
]
const BUILT = [
  { t: 'Art Wall · CTB Email', from: 'rec', x: 690, y: 84, a: 'start' },
  { t: 'Restorative Pod', from: 'env', x: 975, y: 448, a: 'middle' },
  { t: 'Reflection Cards · Workshops', from: 'cul', x: 690, y: 616, a: 'start' },
  { t: 'Data Dashboard', from: 'sys', x: 225, y: 448, a: 'middle' },
]
const edge = (a, b) => {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d
  return `M${a.x + ux * (R + 8)} ${a.y + uy * (R + 8)}L${b.x - ux * (R + 8)} ${b.y - uy * (R + 8)}`
}
const T = Object.fromEntries(THEMES.map((t) => [t.id, t]))
const OUTER = [['rec', 'sys'], ['rec', 'env'], ['sys', 'cul'], ['env', 'cul']]
const CROSS = [
  `M600 ${84 + R + 8}V${C.y - V - 8}`, `M600 ${C.y + V + 8}V${616 - R - 8}`,
  `M${225 + R + 8} 350H${C.x - V - 8}`, `M${C.x + V + 8} 350H${975 - R - 8}`,
]

const lines = (arr, x, lh, anchor) => arr.map((l, i) => (
  <tspan key={i} x={x} dy={i === 0 ? 0 : lh} textAnchor={anchor}>{l}</tspan>
))

export default function SheetSynthesis() {
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState(false)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const wrap = useRef(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  const auto = inView && !reduced && !chosen
  useEffect(() => {
    if (!auto) return
    const id = setTimeout(() => setStep((x) => (x + 1) % STEPS.length), STEPS[step].dur * 1000)
    return () => clearTimeout(id)
  }, [auto, step])

  /* each layer: hidden before its stage, full at it, quiet after */
  const layer = (n, after = 0.28) => ({ opacity: step < n ? 0 : step === n ? 1 : after })
  const drawn = (n) => ({ strokeDashoffset: step >= n ? 0 : 1 })

  return (
    <figure ref={wrap} className={`${m.glass} ${s.synth}`} data-reduced={reduced || undefined}>
      <svg className={s.canvas} viewBox="0 0 1200 700" role="img"
        aria-label="Synthesis map. Staff quotes from field research; four themes from affinity mapping: recognition, environment, culture, and systemic issues; scenarios where they meet; and at the center, the void: patient-centered care neglects the care worker. Groundswell's components answer each theme.">
        {/* 1 · what we heard */}
        <g style={{ opacity: step === 0 ? 1 : step === 3 ? 0 : 0.18 }} className={s.quotes}>
          {QUOTES.map((q, i) => <text key={i} x={q.x} y={q.y}>{lines(q.t, q.x, 34, q.a)}</text>)}
        </g>
        <text className={s.source} style={{ opacity: step === 0 ? 1 : 0 }} x={C.x} y={C.y + 6}>
          Interviews, shadowing, and workshops with oncology staff
        </text>

        {/* 2 · four themes (+ the lines between them) */}
        <g style={{ opacity: step < 1 ? 0 : 1 }}>
          {OUTER.map(([a, b]) => (
            <path key={a + b} d={edge(T[a], T[b])} pathLength="1" className={s.edge} style={drawn(1)} />
          ))}
          {THEMES.map((t) => (
            <g key={t.id} className={s.theme} data-dim={step === 3 || undefined}>
              <circle cx={t.x} cy={t.y} r={R} />
              <text x={t.x} y={t.y + (Array.isArray(t.label) ? -6 : 6)}>
                {Array.isArray(t.label) ? lines(t.label, t.x, 22, 'middle') : t.label}
              </text>
            </g>
          ))}
        </g>

        {/* 3 · where they meet: scenarios, the cross lines, the void */}
        <g style={layer(2, 0.22)} className={s.scenes}>
          {SCENES.map((c, i) => (
            <g key={i}>
              <rect x={c.x - 112} y={c.y - 30} width="224" height="60" rx="30" />
              <text x={c.x} y={c.y - 4}>{lines(c.t, c.x, 22, 'middle')}</text>
            </g>
          ))}
        </g>
        <g style={{ opacity: step < 2 ? 0 : 1 }}>
          {CROSS.map((d) => <path key={d} d={d} pathLength="1" className={s.edge} style={drawn(2)} />)}
          <path className={s.void} data-filled={step === 3 || undefined}
            d={`M${C.x} ${C.y - V}L${C.x + V} ${C.y}L${C.x} ${C.y + V}L${C.x - V} ${C.y}Z`} />
          <text className={s.thesis} style={{ opacity: step === 2 ? 1 : 0 }} x={C.x} y={C.y - 22}>
            {lines(['The void:', 'patient-centered care', 'neglects the care worker'], C.x, 24, 'middle')}
          </text>
          <text className={s.answer} style={{ opacity: step === 3 ? 1 : 0 }} x={C.x} y={C.y + 9}>Groundswell</text>
        </g>

        {/* 4 · what we built */}
        <g style={{ opacity: step === 3 ? 1 : 0 }} className={s.built}>
          {BUILT.map((b) => {
            const t = T[b.from]
            const d = b.a === 'start' ? `M${t.x + R + 6} ${t.y}H${b.x - 10}` : `M${t.x} ${t.y + R + 6}V${b.y - 22}`
            return (
              <g key={b.t}>
                <path d={d} pathLength="1" className={s.edge} style={drawn(3)} />
                <text x={b.x} y={b.y + 6} textAnchor={b.a}>{b.t}</text>
              </g>
            )
          })}
        </g>
      </svg>

      <div className={m.flowWrap}>
        <p className={m.flowHint} aria-hidden="true">
          From findings to product
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
        </p>
        <ol className={m.chev} role="tablist" aria-label="Synthesis, in four stages">
          {STEPS.map((x, i) => (
            <li key={x.view} style={{ '--depth': i }}>
              <button type="button" role="tab" aria-selected={i === step} className={m.seg}
                onClick={() => { setChosen(true); setStep(i) }}>
                {i === step && <span className={m.segFill} data-run={auto || undefined}
                  style={{ '--dur': `${x.dur}s` }} aria-hidden="true" />}
                <svg className={m.segIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GLYPH[i]}</svg>
                <span className={m.segView}>{x.view}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}
