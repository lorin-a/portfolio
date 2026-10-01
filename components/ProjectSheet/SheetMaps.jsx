'use client'

import { useEffect, useRef, useState } from 'react'
import m from './SheetMotionLibrary.module.css'
import s from './SheetMaps.module.css'

/* FS249–FS251: three maps, one system. The same four circles stay on
   screen and move as the view changes: each research theme carries
   through to a value and to the component that answers it (chain
   confirmed by Lorin, FS251):
     Recognition → Humanity → Garden Art Wall
     Environment → Normalcy → Restorative Pod
     Culture → Together → Reflection Cards
     Systemic Issues → Compassion → CTB Email
   (the dashboard is admin-facing, so it is not on the staff map).
   The found view is drawn in her diagram language; the value and
   ecosystem views are her own SVGs, and the circles land exactly on
   theirs (positions measured from the files). Tap a tension pill to read
   what staff said there, verbatim from her Figma synthesis board. */

const PLUM = '#554D65', CREAM = '#F8EBE5', ACCENT = '#C97D64'
const R0 = 104

/* where each circle sits in each view (centre x, y, radius) */
const POS = {
  rec: [[868, 110, R0], [917, 205, 150], [1087, 508, 147]],
  env: [[1270, 955, R0], [917, 874, 150], [650, 508, 147]],
  cul: [[1490, 515, 86], [1275, 554, 150], [1524, 508, 147]],
  sys: [[250, 850, R0], [562, 554, 150], [213, 508, 147]],
}
const LABEL = { rec: ['Recognition'], env: ['Environment'], cul: ['Culture'], sys: ['Systemic', 'Issues'] }

const VOID = { x: 796, y: 632, r: 125 }

/* all six tensions, verbatim from the board, by the edge each sits on */
const TENSIONS = [
  { a: 'rec', b: 'sys', pill: 'Admin crowds out care', x: 652, y: 369, items: [
    'When my work is interrupted, it makes me feel unrecognized and as if my work is unimportant.',
    'I am so busy with administrative tasks that I hardly get to do the work I am trained for, the reason I got into this field. This leaves me feeling undervalued and disconnected from my sense of worth.',
    'I don’t feel like my voice is heard or valued in a system where decision making is top-down and communication is lacking.' ] },
  { a: 'rec', b: 'cul', pill: 'Guilt over breaks', x: 1210, y: 333, items: [
    'I feel like I have to prove myself at work to be valued by higher status coworkers and feel guilty about taking breaks.',
    'Patient Centered Care neglects the needs of care workers.' ] },
  { a: 'sys', b: 'env', pill: 'Profit over people', x: 760, y: 902, items: [
    'Healthcare is a commodity. A focus on profit creates systemic disregard for employee wellbeing.',
    'Execs do not see care worker’s needs as worth investing in. We are replaceable even though we work the hardest and are the most passionate.' ] },
  { a: 'env', b: 'cul', pill: 'No place to grieve', x: 1406, y: 682, items: [
    'The lack of physical space, windows, and poor lighting takes a toll on my overall happiness at work.',
    'I feel burnt out when there is no space for me to take a real break, get some peace & quiet or gather with my colleagues.',
    'When you’re having a bad day, there is no where to go to express your grief; this makes me want to get home ASAP.' ] },
  { a: 'rec', b: 'env', pill: 'Breaks in name only', x: 1037, y: 465, items: [
    'Having to pay for parking and take a shuttle to work makes me feel undervalued and like I don’t matter.',
    'Even though breaks are encouraged from management, no real effort is made to ensure we aren’t overworking ourselves.' ] },
  { a: 'sys', b: 'cul', back: true, pill: 'Overwork as norm', x: 506, y: 790, items: [
    'There is no system in place to support breaks and no functional formal feedback system. I have no faith in management to make changes.',
    'I can never get all of my work done. Too much cross over and lack of clarity on roles/duties creates a system of dysfunction, exhaustion, and frustration.',
    'Overworking, “do the work” and “don’t complain” mentality is the norm, causing many to suffer in silence or develop resentment.' ] },
]
const NAME = { rec: 'Recognition', env: 'Environment', cul: 'Culture', sys: 'Systemic Issues' }

const VIEWS = [
  { view: 'What we found', caption: 'Four themes from affinity mapping, each touching the other three, enclosing the void. Line weight shows how many scenarios staff described; point to a tension to read them.',
    glyph: <><path d="M12 4l7 12H5z" /><path d="M12 4l2 12" opacity=".5" /></> },
  { view: 'What we value', caption: 'Each theme became a value the work would hold: recognition as humanity, environment as normalcy, culture as togetherness, the system as compassion.',
    glyph: <><circle cx="12" cy="5.5" r="2.2" /><circle cx="18.5" cy="12" r="2.2" /><circle cx="12" cy="18.5" r="2.2" /><circle cx="5.5" cy="12" r="2.2" /></> },
  { view: 'What we built', caption: 'Each value became a component, and together they meet staff across a shift, from arriving at work to a patient loss.',
    glyph: <><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="12" r="2.4" /><path d="M8.5 12h7" /><path d="M6 4v5.5M18 14.5V20" /></> },
]

function Stage({ view, onTension, interactive, moving, active, uid = 'gsm' }) {
  const edge = (a, b, dashed) => {
    const [ax, ay, ar] = POS[a][0], [bx, by, br] = POS[b][0]
    const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy)
    const i = TENSIONS.findIndex((t) => (t.a === a && t.b === b) || (t.a === b && t.b === a))
    const on = active === i, dim = active != null && !on
    const x1 = ax + (dx / d) * ar, y1 = ay + (dy / d) * ar, x2 = bx - (dx / d) * br, y2 = by - (dy / d) * br
    const n = TENSIONS[i].items.length
    /* one dot per scenario on this edge: the evidence, counted */
    /* line weight is the evidence: how many scenarios staff described here */
    const w = 1.5 + n * 1.25
    return (
      <g key={a + b} className={s.edgeG} data-dim={dim || undefined}>
        <line x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={on ? ACCENT : PLUM} strokeWidth={on ? w + 1.5 : w} strokeLinecap="round"
          strokeDasharray={dashed ? '12 14' : undefined} opacity={dashed && !on ? 0.45 : 1} />
        {interactive && (
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth="40" className={s.hit}
            onMouseEnter={() => onTension(i)} onClick={() => onTension(i)} />
        )}
      </g>
    )
  }
  return (
    <svg viewBox="0 0 1736 1080" className={s.svg} data-view={view} role="img"
      aria-label={['Research synthesis: four themes, recognition, systemic issues, environment, and culture, each touching the other three, enclosing the void: patient-centered care neglects the people who give it.',
        'Values: humanity, together, normalcy, and compassion, in a cycle.',
        'Product ecosystem: the CTB email, the restorative pod, the Garden art wall, and the reflection cards, reached from the moments of a shift.'][view]}>

      {/* views 2 and 3: her own maps, revealed under the circles once they land */}
      <image className={s.layer} data-on={view === 1 || undefined} href="/images/groundswell/gs-values-diagram.svg" x="0" y="55" width="1735" height="970" />
      <image className={s.layer} data-on={view === 2 || undefined} href="/images/groundswell/gs-ecosystem-diagram-purple.svg" x="0" y="0" width="1736" height="1080" />

      {/* view 1: the synthesis */}
      <g className={s.layer} data-on={view === 0 || undefined}>
        {/* the form: a front face and a side face, lightly tinted; the edge
            from the front-left vertex to the set-back one runs behind */}
        <defs>
          <linearGradient id={`${uid}-front`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor={PLUM} stopOpacity="0.04" /><stop offset="1" stopColor={PLUM} stopOpacity="0.13" />
          </linearGradient>
          <linearGradient id={`${uid}-side`} x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0" stopColor={PLUM} stopOpacity="0.16" /><stop offset="1" stopColor={PLUM} stopOpacity="0.24" />
          </linearGradient>
          <radialGradient id={`${uid}-void`}>
            <stop offset="0.55" stopColor="#FFFBF8" /><stop offset="1" stopColor={CREAM} />
          </radialGradient>
        </defs>
        {/* the form, lit from the upper left: front face pale, side face in shade */}
        <polygon points={['rec', 'env', 'cul'].map((k) => POS[k][0].slice(0, 2).join(',')).join(' ')} fill={`url(#${uid}-side)`} />
        <polygon points={['rec', 'sys', 'env'].map((k) => POS[k][0].slice(0, 2).join(',')).join(' ')} fill={`url(#${uid}-front)`} />
        {edge('sys', 'cul', true)}
        {edge('rec', 'sys')}{edge('rec', 'env')}{edge('rec', 'cul')}{edge('sys', 'env')}{edge('env', 'cul')}
        <circle cx={VOID.x} cy={VOID.y} r={VOID.r} fill={`url(#${uid}-void)`} stroke={PLUM} strokeWidth="4" strokeDasharray="11.78 11.78" />
        <text className={s.voidName} x={VOID.x} y={VOID.y + 10} fill={PLUM}>The void</text>
        {TENSIONS.map((t, i) => {
          if (!t.pill) return null
          const w = t.pill.length * 15 + 70
          const act = interactive && view === 0
          const on = active === i, dim = active != null && !on
          return (
            <g key={t.pill} className={act ? s.pillBtn : undefined} data-dim={dim || undefined}
              {...(act ? {
                role: 'button', tabIndex: 0, 'aria-pressed': on, 'aria-label': `${NAME[t.a]} and ${NAME[t.b]}: ${t.pill}. Show what staff said.`,
                onMouseEnter: () => onTension(i), onFocus: () => onTension(i), onClick: () => onTension(i),
              } : {})}>
              <rect x={t.x - w / 2} y={t.y - 40} width={w} height="80" rx="40" fill={on ? ACCENT : CREAM}
                opacity={t.back && !on ? 0.85 : 1}
                stroke={on ? ACCENT : PLUM} strokeWidth="5.89" strokeDasharray={on ? undefined : '11.78 11.78'} />
              <text className={s.pill} x={t.x} y={t.y + 10} fill={on ? '#fff' : PLUM} opacity={t.back && !on ? 0.7 : 1}>{t.pill}</text>
            </g>
          )
        })}
      </g>

      {/* the four circles: they persist and move between the maps */}
      {Object.keys(POS).map((id) => {
        const [x, y, r] = POS[id][view]
        return (
          <g key={id} className={s.dot} data-landed={(view !== 0 && !moving) || undefined}
            style={{ transform: `translate(${x}px, ${y}px) scale(${r / R0})` }}>
            <circle r={R0} fill={view === 0 && id === 'cul' ? '#7A7189' : PLUM} />
            <text className={s.theme} y={LABEL[id].length > 1 ? -8 : 11} fill={CREAM}>
              {LABEL[id].map((l, i) => <tspan key={l} x="0" dy={i ? 40 : 0}>{l}</tspan>)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function SheetMaps() {
  const [view, setView] = useState(0)
  const [tension, setTension] = useState(null)
  const [open, setOpen] = useState(false)
  const [moving, setMoving] = useState(false)
  const dlg = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  /* the circles show for the whole move, then hand over to the map */
  const pick = (i) => {
    if (i === view) return
    setTension(null); setMoving(true); setView(i)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMoving(false), 950)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  const T = tension != null && view === 0 ? TENSIONS[tension] : null

  return (
    <figure className={`${m.glass} ${s.maps}`}>
      <div id="gs-maps" role="tabpanel" className={s.stage}>
        <div className={s.canvas}>
          <Stage view={view} interactive onTension={setTension} moving={moving} active={T ? tension : null} uid="gsm-a" />
        </div>
        <div className={s.foot} aria-live="polite" data-mode={T ? 'voices' : view === 0 ? 'void' : 'caption'}>
          {T ? (
            <>
              <p className={s.capTitle}><span className={s.capKicker}>What staff said</span>{NAME[T.a]} × {NAME[T.b]}</p>
              <ul className={s.capList} data-n={T.items.length}>{T.items.map((q) => <li key={q}>{q}</li>)}</ul>
            </>
          ) : view === 0 ? (
            <div className={s.voidFoot}>
              <p className={s.capKicker}>The void, at the centre</p>
              <p className={s.thesisFoot}>Patient-centered care neglects the people who give it.</p>
              <p className={s.capText}>Four themes from affinity mapping enclose it. Line weight shows how many scenarios staff described; point to a tension to hear them.</p>
            </div>
          ) : <p className={s.capText}>{VIEWS[view].caption}</p>}
        </div>
        <button type="button" className={s.enlarge} onClick={() => setOpen(true)} aria-label="View this map full screen">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></svg>
        </button>

      </div>

      <div className={s.bottom}>
        <ol className={`${m.chev} ${s.navWide}`} role="tablist" aria-label="Three maps of one system">
          {VIEWS.map((x, i) => (
            <li key={x.view} style={{ '--depth': i }}>
              <button type="button" role="tab" aria-selected={i === view} aria-controls="gs-maps" className={m.seg}
                onClick={() => pick(i)}>
                <span className={m.segView}>{x.view}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>


      <dialog ref={dlg} className={s.dialog} onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === dlg.current) setOpen(false) }} aria-label={`${VIEWS[view].view}, full screen`}>
        <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label="Close">
          <svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>
        {open && <Stage view={view} interactive={false} uid="gsm-b" />}
      </dialog>
    </figure>
  )
}
