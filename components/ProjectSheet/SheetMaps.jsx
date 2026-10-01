'use client'

import { useEffect, useRef, useState } from 'react'
import m from './SheetMotionLibrary.module.css'
import s from './SheetMaps.module.css'

/* FS249: three maps, one container. Found → believe → built: the research
   synthesis, the values, the product ecosystem. The synthesis is redrawn
   in Lorin's own diagram language, taken from her values and ecosystem
   SVGs (plum #554D65 circles with cream serif names, dashed pills at a
   5.9 stroke, plain plum lines, generous air), so the three read as one
   hand. Content from her Figma synthesis board: the four themes, one
   scenario per front tension, one staff voice per theme. The thesis
   wording and the pill condensations are DRAFTS. Static; tabs on top;
   Enlarge for full screen. */

const PLUM = '#554D65', CREAM = '#F8EBE5'

const TH = {
  rec: { x: 868, y: 155, label: ['Recognition'], voice: ['“What I do at work', 'is indescribable.”'], vx: 1005, vy: 130, va: 'start' },
  sys: { x: 300, y: 560, label: ['Systemic', 'Issues'], voice: ['“I’ve given up on trying', 'to change things.”'], vx: 60, vy: 730, va: 'start' },
  env: { x: 868, y: 950, label: ['Environment'], voice: ['“There is no time', 'to grieve.”'], vx: 998, vy: 950, va: 'start' },
  cul: { x: 1436, y: 560, label: ['Culture'], voice: ['“I can’t turn it off.”'], vx: 1676, vy: 730, va: 'end' },
}
const R = 104
const PILLS = [
  { x: 584, y: 355, t: 'Admin crowds out care' },
  { x: 1152, y: 355, t: 'Guilt for taking a break' },
  { x: 584, y: 755, t: 'Profit over people' },
  { x: 1152, y: 755, t: 'Nowhere to go on a bad day' },
]
const VOID = { x: 868, y: 556, r: 165 }

function Synthesis() {
  const line = (a, b, dashed) => {
    const A = TH[a], B = TH[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy)
    return <line x1={A.x + (dx / d) * R} y1={A.y + (dy / d) * R} x2={B.x - (dx / d) * R} y2={B.y - (dy / d) * R}
      stroke={PLUM} strokeWidth="3.5" strokeDasharray={dashed ? '11.78 11.78' : undefined} opacity={dashed ? 0.6 : 1} />
  }
  return (
    <svg viewBox="0 0 1736 1080" className={s.svg} role="img"
      aria-label="Research synthesis. Four themes from affinity mapping, recognition, systemic issues, environment, and culture, each touching the other three. Where they meet, staff described admin crowding out care, guilt for taking a break, profit over people, and nowhere to go on a bad day. Together they enclose the void: patient-centered care neglects the people who give it.">
      {line('sys', 'cul', true)}
      {line('rec', 'sys')}{line('rec', 'env')}{line('rec', 'cul')}{line('sys', 'env')}{line('env', 'cul')}

      {/* the void: cream, so the edges behind it disappear */}
      <circle cx={VOID.x} cy={VOID.y} r={VOID.r} fill={CREAM} stroke={PLUM} strokeWidth="5.89" strokeDasharray="11.78 11.78" />
      <text className={s.voidKicker} x={VOID.x} y={VOID.y - 78} fill={PLUM}>The void</text>
      <text className={s.thesis} x={VOID.x} y={VOID.y - 26} fill={PLUM}>
        <tspan x={VOID.x}>Patient-centered</tspan>
        <tspan x={VOID.x} dy="40">care neglects</tspan>
        <tspan x={VOID.x} dy="40">the people</tspan>
        <tspan x={VOID.x} dy="40">who give it</tspan>
      </text>

      {PILLS.map((p) => {
        const w = p.t.length * 15 + 70
        return (
          <g key={p.t}>
            <rect x={p.x - w / 2} y={p.y - 40} width={w} height="80" rx="40" fill={CREAM}
              stroke={PLUM} strokeWidth="5.89" strokeDasharray="11.78 11.78" />
            <text className={s.pill} x={p.x} y={p.y + 10} fill={PLUM}>{p.t}</text>
          </g>
        )
      })}

      {Object.entries(TH).map(([id, t]) => (
        <g key={id}>
          <circle cx={t.x} cy={t.y} r={R} fill={PLUM} />
          <text className={s.theme} x={t.x} y={t.y + (t.label.length > 1 ? -8 : 12)} fill={CREAM}>
            {t.label.map((l, i) => <tspan key={l} x={t.x} dy={i ? 42 : 0}>{l}</tspan>)}
          </text>
          <text className={s.voice} x={t.vx} y={t.vy} textAnchor={t.va} fill={PLUM}>
            {t.voice.map((l, i) => <tspan key={l} x={t.vx} dy={i ? 32 : 0}>{l}</tspan>)}
          </text>
        </g>
      ))}
    </svg>
  )
}

const VIEWS = [
  { id: 'found', view: 'What we found', caption: 'Four themes from affinity mapping, each touching the other three. Together they enclose the void.',
    glyph: <><path d="M12 4l7 12H5z" /><path d="M12 4l2 12" opacity=".5" /></> },
  { id: 'believe', view: 'What we value', caption: 'The values that guided every component: humanity, togetherness, normalcy, and compassion.',
    glyph: <><circle cx="12" cy="5.5" r="2.2" /><circle cx="18.5" cy="12" r="2.2" /><circle cx="12" cy="18.5" r="2.2" /><circle cx="5.5" cy="12" r="2.2" /></> },
  { id: 'built', view: 'What we built', caption: 'How the four components meet staff across a shift, from arriving at work to a patient loss.',
    glyph: <><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="12" r="2.4" /><path d="M8.5 12h7" /><path d="M6 4v5.5M18 14.5V20" /></> },
]

export default function SheetMaps() {
  const [view, setView] = useState(0)
  const [open, setOpen] = useState(false)
  const dlg = useRef(null)

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const body = (v) => v === 0 ? <Synthesis />
    : <img className={s.img} src={v === 1 ? '/images/groundswell/gs-values-diagram.svg' : '/images/groundswell/gs-ecosystem-diagram-purple.svg'}
      alt={v === 1
        ? 'Values map: humanity, together, normalcy, and compassion in a cycle. “We’re not just providers, we’re people too.” “Grief is a natural part of caring, and it has a place here.” “We care deeply; that’s not a flaw, it’s our strength.”'
        : 'Product ecosystem: the CTB email, pod, Garden art wall, and reflection cards, each reached from the moments of a shift: arriving at work, taking a break, leaving work, a patient loss, a hard moment, a one-to-one meeting.'} />

  return (
    <figure className={`${m.glass} ${s.maps}`}>
      <div className={s.top}>
        <ol className={m.chev} role="tablist" aria-label="Three maps">
          {VIEWS.map((x, i) => (
            <li key={x.id} style={{ '--depth': i }}>
              <button type="button" role="tab" aria-selected={i === view} aria-controls="gs-maps" className={m.seg}
                onClick={() => setView(i)}>
                <svg className={m.segIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{x.glyph}</svg>
                <span className={m.segView}>{x.view}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div id="gs-maps" role="tabpanel" className={s.stage}>
        <button type="button" className={s.open} onClick={() => setOpen(true)} aria-label="View this map full screen">
          {body(view)}
        </button>
        <span className={s.enlarge} aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></svg>
        </span>
      </div>

      <p className={s.caption} aria-live="polite">{VIEWS[view].caption}</p>

      <dialog ref={dlg} className={s.dialog} onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === dlg.current) setOpen(false) }} aria-label={`${VIEWS[view].view}, full screen`}>
        <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label="Close">
          <svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>
        {open && body(view)}
      </dialog>
    </figure>
  )
}
