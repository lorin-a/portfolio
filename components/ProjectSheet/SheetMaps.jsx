'use client'

import { useEffect, useRef, useState } from 'react'
import m from './SheetMotionLibrary.module.css'
import s from './SheetMaps.module.css'

/* FS249–FS260: mapping the system. Three views of one system, all drawn
   natively in the site's glass and palette (FS258), each with the same
   point-to-read interaction (FS260). The same four circles persist and
   travel between the views (FS250–FS251):
     Recognition → Humanity → Garden Art Wall
     Environment → Normalcy → Restorative Pod
     Culture → Together → Reflection Cards
     Systemic Issues → Compassion → CTB Email
   Found: Lorin's Figma synthesis board (six tensions, 15 scenarios,
   assigned by board position, FS256), phrased as summaries (FS259).
   Value: her values map (names and statements verbatim, layout measured
   from the SVG). Built: her ecosystem map (every connection traced from
   the SVG). Pill wordings and captions are drafts. */

const R0 = 104
const IDS = ['rec', 'env', 'cul', 'sys']

/* centre x, y, radius of each circle in each view */
const POS = {
  rec: [[868, 110, R0], [917, 205, 150], [1087, 508, 147]],
  env: [[1270, 955, R0], [917, 874, 150], [650, 508, 147]],
  cul: [[1490, 515, 86], [1275, 554, 150], [1524, 508, 147]],
  sys: [[250, 850, R0], [562, 554, 150], [213, 508, 147]],
}
const NAMES = {
  rec: [['Recognition'], ['Humanity'], ['Garden', 'Art Wall']],
  env: [['Environment'], ['Normalcy'], ['Restorative', 'Pod']],
  cul: [['Culture'], ['Together'], ['Reflection', 'Cards']],
  sys: [['Systemic', 'Issues'], ['Compassion'], ['CTB Email']],
}
/* the board's own one-line definitions of each theme */
const THEME_SUB = { rec: 'Feeling valued and seen', sys: 'Daily tasks and structures', env: 'Benefits, funding, and space', cul: 'Grief and work‑life balance' }
const THEME = { rec: 'Recognition', env: 'Environment', cul: 'Culture', sys: 'Systemic Issues' }
const VALUE = { rec: 'Humanity', env: 'Normalcy', cul: 'Together', sys: 'Compassion' }
const COMP = { rec: 'Garden Art Wall', env: 'Restorative Pod', cul: 'Reflection Cards', sys: 'CTB Email' }

/* ── view 1 · what we found ─────────────────────────────────────────── */
/* FS266: the void is the hollow inside the solid, drawn as a smaller
   tetrahedron nested within it, the same form at a third of the size */
const VOID = { x: 850, y: 628, k: 0.3 }
const vpt = (id) => [VOID.x + (POS[id][0][0] - 868 + 0) * VOID.k, VOID.y + (POS[id][0][1] - 607) * VOID.k]
const TENSIONS = [
  { a: 'rec', b: 'sys', pill: ['Admin displaces care work;', 'staff voices go unheard'], x: 612, y: 392, items: [
    'Interruptions make staff feel unrecognized, as if their work is unimportant.',
    'Administrative tasks crowd out the work they trained for, the reason they came into the field.',
    'Top-down decisions and poor communication leave staff feeling unheard and unmotivated to advocate for change.' ] },
  { a: 'rec', b: 'cul', pill: ['Staff must prove their worth', 'and feel guilt for resting'], x: 1196, y: 300, items: [
    'Staff feel they must prove themselves to higher-status coworkers, and feel guilty about taking breaks.',
    'Patient-centered care neglects the needs of the people who give it.' ] },
  { a: 'sys', b: 'env', pill: ['Profit is prioritized', 'over staff well-being'], x: 760, y: 905, items: [
    'Healthcare is run as a commodity; a focus on profit disregards employee well-being.',
    'Executives do not see care workers’ needs as worth investing in, so staff feel replaceable.' ] },
  { a: 'env', b: 'cul', pill: ['No space to rest,', 'gather, or grieve'], x: 1425, y: 735, items: [
    'No windows, poor lighting, and too little space take a toll on happiness at work.',
    'There is no space to take a real break, find quiet, or gather with colleagues.',
    'On a bad day there is nowhere to go to express grief, so staff just want to get home.' ] },
  { a: 'rec', b: 'env', pill: ['Breaks are encouraged', 'but not protected'], x: 1080, y: 455, items: [
    'Paying for parking and a shuttle to work leaves staff feeling undervalued.',
    'Breaks are encouraged by management, but nothing protects staff from overwork.' ] },
  { a: 'sys', b: 'cul', back: true, pill: ['No systems for breaks,', 'roles, or feedback'], x: 545, y: 775, items: [
    'There is no system to support breaks and no working feedback loop, so faith in management is low.',
    'Unclear and overlapping roles create dysfunction, exhaustion, and frustration.',
    'A “do the work, don’t complain” culture leaves many suffering in silence.' ] },
]

/* ── view 2 · what we value (her statements, verbatim) ──────────────── */
const VSAY = {
  rec: { t: ['We’re not just providers—', 'we’re people too.'], x: 570, y: 118 },
  cul: { t: ['We check in, even', 'with just a nod.'], x: 1590, y: 545 },
  env: { t: ['Grief is a natural part of', 'caring, and it has a place here'], x: 1275, y: 960 },
  sys: { t: ['We care deeply—that’s not', 'a flaw, it’s our strength'], x: 205, y: 545 },
}
const CYCLE = ['rec', 'cul', 'env', 'sys'] /* clockwise, as her arrows run */

/* ── view 3 · what we built (connections traced from her map) ───────── */
const MOMENTS = [
  { id: 'arrive', t: 'Arrive at Work', x: 212, y: 65, to: ['env', 'cul'] },
  { id: 'break', t: 'Take a Break', x: 867, y: 65, to: ['env', 'rec', 'cul'] },
  { id: 'leave', t: 'Leave Work', x: 1523, y: 65, to: ['env', 'rec'] },
  { id: 'loss', t: 'Patient Loss', x: 212, y: 1015, to: ['sys', 'env', 'rec', 'cul'] },
  { id: 'hard', t: 'Hard Moment', x: 867, y: 1015, to: ['env', 'cul'] },
  { id: 'meet', t: '1:1 Meeting', x: 1523, y: 1015, to: ['cul', 'env'] },
]
const LINKS = [['sys', 'env', false], ['env', 'rec', true], ['rec', 'cul', true]] /* [from, to, both ways] */

const VIEWS = [
  { view: 'What we found', short: 'Found', caption: '' },
  { view: 'What we value', short: 'Values', caption: 'Each theme became a value to guide the work. Point to a value to see the theme it answers.' },
  { view: 'What we built', short: 'Built', caption: 'Each value became a component, met across a shift. Point to a moment or a component to trace its connections.' },
]

const STAGE = ['#F79C7E', '#C7AAD1', '#C5CFA6']
const DEMO = [{ kind: 'void', id: 0 }, { kind: 'v', id: 'rec' }, { kind: 'm', id: 'loss' }]
const HINT = ['the void or a tension', 'a value', 'a moment or a component']

const lines = (arr, x, lh) => arr.map((l, i) => <tspan key={l} x={x} dy={i ? lh : 0}>{l}</tspan>)
const list = (arr) => arr.join(', ').replace(/, ([^,]*)$/, arr.length > 2 ? ', and $1' : ' and $1')

function Stage({ view, focus, setFocus, interactive, uid, ready = true, hint = null }) {
  const act = (f) => (interactive ? {
    tabIndex: 0, role: 'button', onMouseEnter: () => setFocus(f), onFocus: () => setFocus(f), onClick: () => setFocus(f),
  } : {})
  const isF = (kind, id) => !!focus && focus.kind === kind && focus.id === id
  /* FS283: the resting state (the guided default, or the default the map
     returns to) shows everything in full color; only a reader's own hover
     or focus dims the rest */
  const soft = !!focus && (focus.auto || focus.rest)
  const anyF = (...kinds) => !!focus && !soft && kinds.includes(focus.kind)
  const momentOn = (cid) => focus?.kind === 'm' && MOMENTS.find((mo) => mo.id === focus.id)?.to.includes(cid)

  /* found: one edge, weighted by its scenarios */
  const edge = (t, i) => {
    const [ax, ay, ar] = POS[t.a][0], [bx, by, br] = POS[t.b][0]
    const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy)
    const on = isF('t', i), dim = anyF('t') && !on
    const w = 1.5 + t.items.length * 1.25
    return (
      <g key={'e' + i} className={s.fade} data-dim={dim || undefined}>
        <line x1={ax + (dx / d) * ar} y1={ay + (dy / d) * ar} x2={bx - (dx / d) * br} y2={by - (dy / d) * br}
          className={on ? s.lineOn : s.line} strokeWidth={on ? w + 1.5 : w}
          strokeDasharray={t.back ? '12 14' : undefined} data-back={t.back || undefined} />
        {interactive && view === 0 && (
          <line x1={ax} y1={ay} x2={bx} y2={by} className={s.hit}
            onMouseEnter={() => setFocus({ kind: 't', id: i })} onClick={() => setFocus({ kind: 't', id: i })} />
        )}
      </g>
    )
  }

  /* built: a moment's connector into a component */
  const conn = (mo, cid) => {
    const [cx, cy, cr] = POS[cid][2]
    const top = mo.y < 540
    const y1 = top ? mo.y + 62 : mo.y - 62, y2 = top ? cy - cr - 8 : cy + cr + 8
    const on = isF('m', mo.id) || isF('c', cid), dim = anyF('m', 'c') && !on
    const mid = top ? 250 : 790
    return (
      <path key={mo.id + cid} className={`${s.fade} ${on ? s.lineOn : s.line}`} data-dim={dim || undefined}
        d={`M${mo.x} ${y1}C${mo.x} ${mid} ${cx} ${mid} ${cx} ${y2}`} strokeWidth={on ? 4 : 2.5}
        markerEnd={`url(#${uid}-${on ? 'arrOn' : 'arr'})`} />
    )
  }

  return (
    <svg viewBox="0 0 1736 1080" className={s.svg} role="img"
      aria-label={['Research synthesis: four themes, recognition, systemic issues, environment, and culture, each touching the other three in a tetrahedron, enclosing the void: patient-centered care neglects the people who give it.',
        'Values: humanity, together, normalcy, and compassion, in a cycle.',
        'Product ecosystem: the CTB email, the restorative pod, the Garden art wall, and the reflection cards, each reached from moments across a shift.'][view]}>
      <defs>
        <linearGradient id={`${uid}-front`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#F4F1EC" stopOpacity="0.03" /><stop offset="1" stopColor="#F4F1EC" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id={`${uid}-side`} gradientUnits="userSpaceOnUse" x1="1100" y1="500" x2="1490" y2="560">
          <stop offset="0" stopColor="#F4F1EC" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#E9E4F0" stopOpacity="0.2" />
          <stop offset="1" stopColor="#F4F1EC" stopOpacity="0.32" />
        </linearGradient>
        <filter id={`${uid}-fog`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <clipPath id={`${uid}-sideClip`}>
          <polygon points={['rec', 'env', 'cul'].map((k) => POS[k][0].slice(0, 2).join(',')).join(' ')} />
        </clipPath>
        {['arr', 'arrOn'].map((k) => (
          <marker key={k} id={`${uid}-${k}`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="24" markerHeight="24"
            markerUnits="userSpaceOnUse" orient="auto-start-reverse">
            <path d="M1 1l9 5-9 5" fill="none" className={k === 'arrOn' ? s.markOn : s.mark} strokeWidth="1.6" />
          </marker>
        ))}
      </defs>

      {/* ── found ── */}
      <g className={s.layer} data-on={(ready && view === 0) || undefined}>
        {/* the side face, turned away from the light: a fog that thickens toward its far edge */}
        <g clipPath={`url(#${uid}-sideClip)`}>
          <polygon points={['rec', 'env', 'cul'].map((k) => POS[k][0].slice(0, 2).join(',')).join(' ')} fill={`url(#${uid}-side)`} />
          <ellipse cx="1560" cy="560" rx="360" ry="460" fill="#F4F1EC" opacity="0.13" filter={`url(#${uid}-fog)`} />
        </g>
        <polygon points={['rec', 'sys', 'env'].map((k) => POS[k][0].slice(0, 2).join(',')).join(' ')} fill={`url(#${uid}-front)`} />
        {TENSIONS.map(edge)}
        <g className={`${s.fade} ${s.voidG}`} data-on={(isF('void', 0) && !soft) || undefined} data-dim={(anyF('t') && !isF('void', 0)) || undefined}
          aria-label="The void: patient-centered care neglects the people who give it" {...(view === 0 ? act({ kind: 'void', id: 0 }) : {})}>
          <polygon className={s.voidSide} points={['rec', 'env', 'cul'].map((k) => vpt(k).join(',')).join(' ')} />
          <polygon className={s.voidFront} points={['rec', 'sys', 'env'].map((k) => vpt(k).join(',')).join(' ')} />
          <line className={s.voidBack} x1={vpt('sys')[0]} y1={vpt('sys')[1]} x2={vpt('cul')[0]} y2={vpt('cul')[1]} />
          <text className={s.voidName} x={(vpt('rec')[0] + vpt('sys')[0] + vpt('env')[0]) / 3} y={(vpt('rec')[1] + vpt('sys')[1] + vpt('env')[1]) / 3 + 12}>The void</text>
        </g>
        {TENSIONS.map((t, i) => {
          const w = Math.max(...t.pill.map((l) => l.length)) * 14.8 + 70, on = isF('t', i), dim = anyF('t', 'void') && !on
          return (
            <g key={t.pill} className={`${s.fade} ${s.pillG}`} data-dim={dim || undefined} data-on={on || undefined}
              data-back={t.back || undefined} aria-label={`${THEME[t.a]} and ${THEME[t.b]}: ${t.pill.join(' ')}`}
              {...(view === 0 ? act({ kind: 't', id: i }) : {})}>
              <rect x={t.x - w / 2} y={t.y - 54} width={w} height="108" rx="54" />
              <text className={s.pill2} x={t.x} y={t.y - 7}>{lines(t.pill, t.x, 36)}</text>
            </g>
          )
        })}
      </g>

      {/* ── value ── */}
      <g className={s.layer} data-on={(ready && view === 1) || undefined}>
        {CYCLE.map((id, i) => {
          const next = CYCLE[(i + 1) % 4]
          const a0 = Math.atan2(POS[id][1][1] - 554, POS[id][1][0] - 917)
          let a1 = Math.atan2(POS[next][1][1] - 554, POS[next][1][0] - 917)
          if (a1 < a0) a1 += Math.PI * 2
          const R = 352, p = (a) => `${917 + R * Math.cos(a)} ${554 + R * Math.sin(a)}`
          const on = isF('v', id) || isF('v', next), dim = anyF('v') && !on
          return <path key={id} className={`${s.fade} ${on ? s.lineOn : s.line}`} data-dim={dim || undefined}
            d={`M${p(a0 + 0.44)}A${R} ${R} 0 0 1 ${p(a1 - 0.44)}`} strokeWidth="3" strokeDasharray="11.78 11.78"
            markerEnd={`url(#${uid}-${on ? 'arrOn' : 'arr'})`} />
        })}
        {IDS.map((id) => {
          const v = VSAY[id], on = isF('v', id), dim = anyF('v') && !on
          return (
            <text key={id} className={`${s.fade} ${s.say}`} data-dim={dim || undefined} data-on={on || undefined} x={v.x} y={v.y}>
              {lines(v.t, v.x, 38)}
            </text>
          )
        })}
      </g>

      {/* ── built ── */}
      <g className={s.layer} data-on={(ready && view === 2) || undefined}>
        {MOMENTS.flatMap((mo) => mo.to.filter((cid) => !(mo.id === 'loss' && cid === 'sys')).map((cid) => conn(mo, cid)))}
        {(() => {
          const on = isF('m', 'loss') || isF('c', 'sys'), dim = anyF('m', 'c') && !on
          return <line className={`${s.fade} ${on ? s.lineOn : s.line}`} data-dim={dim || undefined} x1="213" y1="944" x2="213" y2="669"
            strokeWidth={on ? 4 : 2.5} markerStart={`url(#${uid}-${on ? 'arrOn' : 'arr'})`} markerEnd={`url(#${uid}-${on ? 'arrOn' : 'arr'})`} />
        })()}
        {LINKS.map(([a, b, two]) => {
          const [ax, , ar] = POS[a][2], [bx, , br] = POS[b][2]
          const on = isF('c', a) || isF('c', b), dim = anyF('m', 'c') && !on
          return <line key={a + b} className={`${s.fade} ${on ? s.lineOn : s.line}`} data-dim={dim || undefined}
            x1={ax + ar + 14} y1="508" x2={bx - br - 14} y2="508" strokeWidth={on ? 4 : 2.5}
            markerStart={two ? `url(#${uid}-${on ? 'arrOn' : 'arr'})` : undefined} markerEnd={`url(#${uid}-${on ? 'arrOn' : 'arr'})`} />
        })}
        {MOMENTS.map((mo) => {
          const on = isF('m', mo.id) || (focus?.kind === 'c' && mo.to.includes(focus.id)), dim = anyF('m', 'c') && !on
          return (
            <g key={mo.id} className={`${s.fade} ${s.pillG}`} data-dim={dim || undefined} data-on={on || undefined}
              aria-label={mo.t} {...(view === 2 ? act({ kind: 'm', id: mo.id }) : {})}>
              <rect x={mo.x - 209} y={mo.y - 62} width="418" height="124" rx="62" />
              <text x={mo.x} y={mo.y + 11}>{mo.t}</text>
            </g>
          )
        })}
      </g>

      {/* ── the four circles: they persist and travel between the views ── */}
      {IDS.map((id) => {
        const [x, y, r] = POS[id][view]
        const on = (view === 1 && isF('v', id)) || (view === 2 && (isF('c', id) || momentOn(id)))
          || (view === 0 && focus?.kind === 't' && (TENSIONS[focus.id].a === id || TENSIONS[focus.id].b === id))
        const dim = !!focus && !soft && !on && focus.kind !== 'void'
        const back = false
        return (
          <g key={id} className={s.node} data-wait={!ready || undefined} data-dim={dim || undefined} data-on={on || undefined} data-back={back || undefined}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            {...(view === 1 ? act({ kind: 'v', id }) : view === 2 ? act({ kind: 'c', id }) : {})}
            aria-label={view === 1 ? `${VALUE[id]}, from ${THEME[id]}` : view === 2 ? COMP[id] : THEME[id]}>
            <circle r={r} className={s.disc} />
            <text key={view} className={s.name} y={NAMES[id][view].length > 1 ? -10 : 12} data-size={view ? 'l' : 's'}>
              {lines(NAMES[id][view], 0, view ? 44 : 38)}
            </text>
          </g>
        )
      })}

      {/* FS270: the instruction lives on the diagram, at the highlighted part */}
      {hint && (() => {
        const c = view === 0
          ? [(vpt('rec')[0] + vpt('sys')[0] + vpt('env')[0]) / 3 + 40, (vpt('rec')[1] + vpt('sys')[1] + vpt('env')[1]) / 3 + 52]
          : view === 1 ? [1045, 325] : [330, 1040]
        const label = `${hint} to explore`, w = label.length * 17.5 + 56
        return (
          <g key={view} className={s.hintG} transform={`translate(${c[0]} ${c[1]})`} aria-hidden="true">
            <circle className={s.ripple} r="16" />
            <g className={s.cursor}>
              <path d="M0 0l0 34 9-8 7 15 6-3-7-15 12-1z" />
            </g>
            <g transform="translate(44 14)">
              <rect x="0" y="0" width={w} height="60" rx="30" />
              <text x={w / 2} y="40">{label}</text>
            </g>
          </g>
        )
      })()}
    </svg>
  )
}

export default function SheetMaps() {
  const [view, setView] = useState(0)
  const [focus, setFocus] = useState(null)
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [canHover, setCanHover] = useState(true)
  const dlg = useRef(null)
  const root = useRef(null)
  const pan = useRef(null)
  const timer = useRef(null)
  const touched = useRef(false)

  /* FS263: each map draws in whole, then settles on one highlighted
     section with an instruction, until the reader takes over */
  const guide = (v, delay) => {
    clearTimeout(timer.current)
    if (touched.current) return
    timer.current = setTimeout(() => setFocus({ ...DEMO[v], auto: true }), delay)
  }

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); setReady(true); guide(0, reduce ? 0 : 2000)
    }, { threshold: 0.4 })
    if (root.current) io.observe(root.current)
    return () => { io.disconnect(); clearTimeout(timer.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* FS287: on a phone the map is wider than the screen and pans; each
     view opens centered on the part it highlights */
  useEffect(() => {
    const el = pan.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    const fx = [0.56, 0.58, 0.2][view]
    el.scrollTo({ left: el.scrollWidth * fx - el.clientWidth / 2, behavior: ready ? 'smooth' : 'auto' })
  }, [view, ready])

  const take = (f) => { touched.current = true; clearTimeout(timer.current); setFocus(f) }

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const pick = (i) => {
    if (i === view) return
    setFocus(null); setView(i)
    touched.current = false
    guide(i, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2000)
  }


  const answers = (id) => (
    <div className={s.fSide}>
      <p className={s.fKick}>Answers what we heard</p>
      <ul className={s.fList} data-stage="found">
        {TENSIONS.filter((t) => t.a === id || t.b === id).map((t) => <li key={t.pill[0]}>{t.pill.join(' ')}</li>)}
      </ul>
    </div>
  )

  let foot
  if (focus?.kind === 't') {
    const T = TENSIONS[focus.id]
    foot = (
      <>
        <p className={s.fHead}><span className={s.fKick}>What we heard</span>{THEME[T.a]} × {THEME[T.b]}</p>
        <ol className={s.heard} data-n={T.items.length}>
          {T.items.map((q, k) => <li key={q}><span className={s.heardN}>{String(k + 1).padStart(2, '0')}</span><span>{q}</span></li>)}
        </ol>
      </>
    )
  } else if (focus?.kind === 'v') {
    const id = focus.id
    foot = (
      <div className={s.fSplit}>
        <div className={s.fPair}>
          <p className={s.fKick}>{THEME[id]} became</p>
          <p className={s.fBig}>{VALUE[id]}</p>
          <p className={s.fNote}>“{VSAY[id].t.join(' ').replace(/— /g, '—')}”</p>
          <p className={s.fChain}><span className={s.cFound}>{THEME[id]}</span><span className={s.arrow}>→</span><span className={s.cValue}>{VALUE[id]}</span><span className={s.arrow}>→</span><span className={s.cBuilt}>{COMP[id]}</span></p>
        </div>
        {answers(id)}
      </div>
    )
  } else if (focus?.kind === 'm') {
    const mo = MOMENTS.find((x) => x.id === focus.id)
    foot = (
      <div className={s.fSplit}>
        <div className={s.fPair}>
          <p className={s.fKick}>A moment in the shift</p>
          <p className={s.fBig}>{mo.t}</p>
          <p className={s.fNote}>{mo.to.length === 4 ? 'Met by all four components.' : `Met by ${['', 'one', 'two', 'three'][mo.to.length]} of the four components.`}</p>
        </div>
        <div className={s.fSide}>
          <p className={s.fKick}>Met by</p>
          <ul className={s.fList} data-stage="built">{mo.to.map((c) => <li key={c}><b>{COMP[c]}</b>, built on {VALUE[c].toLowerCase()}</li>)}</ul>
        </div>
      </div>
    )
  } else if (focus?.kind === 'c') {
    const id = focus.id
    const from = MOMENTS.filter((mo) => mo.to.includes(id)).map((mo) => mo.t.toLowerCase())
    foot = (
      <div className={s.fSplit}>
        <div className={s.fPair}>
          <p className={s.fKick}>Built on {VALUE[id].toLowerCase()}</p>
          <p className={s.fBig}>{COMP[id]}</p>
          <p className={s.fNote}>Reached at {list(from)}.</p>
          <p className={s.fChain}><span className={s.cFound}>{THEME[id]}</span><span className={s.arrow}>→</span><span className={s.cValue}>{VALUE[id]}</span><span className={s.arrow}>→</span><span className={s.cBuilt}>{COMP[id]}</span></p>
        </div>
        {answers(id)}
      </div>
    )
  } else if (view === 0 || focus?.kind === 'void') {
    foot = (
      <div className={s.fSplit}>
        <div className={s.fPair}>
          <p className={s.fKick}>The Void: The Core Thesis</p>
          <p className={s.fBig}>Patient-centered care neglects the people who give it.</p>
        </div>
        <div className={s.fSide}>
          <p className={s.fKick}>Four themes</p>
          <dl className={s.fDefs}>
            {['rec', 'sys', 'env', 'cul'].map((k) => <div key={k}><dt>{THEME[k]}</dt><dd>{THEME_SUB[k]}</dd></div>)}
          </dl>
        </div>
      </div>
    )
  } else foot = <p className={s.fNote}>{VIEWS[view].caption}</p>

  return (
    <figure className={`${m.glass} ${s.maps}`} data-view={view}>
      <div id="gs-maps" role="tabpanel" className={s.stage} ref={root} onMouseLeave={() => { if (touched.current) setFocus({ ...DEMO[view], rest: true }) }}>
        <div className={s.canvas} ref={pan}>
          <Stage view={view} focus={focus} setFocus={take} interactive uid="gsm-a" ready={ready}
            hint={focus?.auto ? (canHover ? 'Hover' : 'Tap') : null} />
        </div>
        <div className={s.swipe}>
          <p aria-hidden="true"><span>←</span> Swipe the map <span>→</span></p>
          <button type="button" className={s.enlargeInline} onClick={() => setOpen(true)} aria-label="View this map full screen">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></svg>
          </button>
        </div>
        <div className={s.foot} aria-live="polite">
          <div key={`${view}-${focus?.kind}-${focus?.id}`} className={s.footIn}>
            {foot}
          </div>
        </div>
        <button type="button" className={s.enlarge} onClick={() => setOpen(true)} aria-label="View this map full screen">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></svg>
        </button>
      </div>

      <div className={s.bottom}>
        <ol className={`${m.chev} ${s.navWide}`} role="tablist" aria-label="Three maps of one system">
          {VIEWS.map((x, i) => (
            <li key={x.view} style={{ '--depth': i }}>
              <button type="button" role="tab" aria-selected={i === view} aria-controls="gs-maps" className={m.seg} onClick={() => pick(i)}>
                <span className={s.stageDot} style={{ '--dot': STAGE[i] }} aria-hidden="true" />
                <span className={`${m.segView} ${s.long}`}>{x.view}</span>
                <span className={`${m.segView} ${s.short}`} aria-hidden="true">{x.short}</span>
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
        {open && <Stage view={view} focus={null} setFocus={() => {}} interactive={false} uid="gsm-b" />}
      </dialog>
    </figure>
  )
}
