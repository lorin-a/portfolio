'use client'

import { useEffect, useId, useRef, useState } from 'react'
import s from './SheetSynthesisMap.module.css'

/* FS248: the synthesis as an evidence chain, read left to right the way
   the method ran: 01 Heard → 02 Coded → 03 Modeled → 04 Concluded →
   05 Designed. The coding matrix is the backbone: every scenario on
   Lorin's Figma board (Groundswell-Synthesis) as a row, a dot in each
   theme it touches (assigned by the edge it sits on there), column totals
   at the foot. The tetrahedron summarises the matrix; the void is what it
   encloses; the response answers each theme. Scenario wording condensed
   from the board; theme → component pairings are a DRAFT. Static; tap to
   view full screen. */

const T = [
  { id: 'rec', label: 'Recognition', c: '#CC8A8A' },
  { id: 'sys', label: 'Systemic Issues', c: '#6F8794' },
  { id: 'env', label: 'Environment', c: '#57A08F' },
  { id: 'cul', label: 'Culture', c: '#9B85B5' },
]
const C = Object.fromEntries(T.map((t) => [t.id, t.c]))
const L = Object.fromEntries(T.map((t) => [t.id, t.label]))

const GROUPS = [
  { n: 1, a: 'rec', b: 'sys', rows: ['Interruptions make my work feel unimportant.', 'Admin tasks crowd out the work I trained for.', 'Decisions are top-down; my voice isn’t heard.'] },
  { n: 2, a: 'rec', b: 'env', rows: ['Paying for parking makes me feel undervalued.', 'Breaks are encouraged, never protected.'] },
  { n: 3, a: 'rec', b: 'cul', rows: ['I have to prove myself, and I feel guilty taking breaks.', 'Patient-centered care neglects the people who give it.'] },
  { n: 4, a: 'sys', b: 'env', rows: ['A focus on profit disregards employee wellbeing.', 'Executives see us as replaceable.'] },
  { n: 5, a: 'sys', b: 'cul', rows: ['No system for breaks, and no feedback that works.', 'Unclear roles breed dysfunction and exhaustion.', '“Don’t complain”: many suffer in silence.'] },
  { n: 6, a: 'env', b: 'cul', rows: ['No windows, poor light, no space of our own.', 'No room for a real break or to gather with colleagues.', 'Nowhere to go on a bad day.'] },
]
const TOTAL = Object.fromEntries(T.map((t) => [t.id, GROUPS.reduce((n, g) => n + (g.a === t.id || g.b === t.id ? g.rows.length : 0), 0)]))
const SCEN = GROUPS.reduce((n, g) => n + g.rows.length, 0)

const VOICES = ['“I feel trapped.”', '“I was not prepared for this.”', '“There is no time to grieve.”', '“What mental health?”', '“I can’t turn it off.”']

/* DRAFT pairings, hers to confirm */
const BUILT = { rec: 'Art Wall · CTB Email', sys: 'Data Dashboard', env: 'Restorative Pod', cul: 'Reflection Cards · Workshops' }

/* 03 · the model: a tetrahedron in a fixed three-quarter view */
const P = { rec: { x: 1235, y: 262 }, sys: { x: 1055, y: 478 }, env: { x: 1300, y: 540 }, cul: { x: 1460, y: 372 } }
const NR = 26
const VOID = { x: 1235, y: 410 }
const BACK = 5 /* the sys–cul edge sits behind */

const COLX = { rec: 676, sys: 744, env: 812, cul: 880 }
const ROW = 27, GH = 32, TOP = 268

function Step({ n, title, sub, x, y }) {
  return (
    <g>
      <text className={s.stepN} x={x} y={y}>{n}</text>
      <text className={s.stepT} x={x + 34} y={y}>{title}</text>
      {sub && <text className={s.stepSub} x={x + 34} y={y + 22}>{sub}</text>}
    </g>
  )
}

function ChainSvg({ uid, title }) {
  let y = TOP
  const rows = []
  GROUPS.forEach((g) => {
    rows.push({ type: 'g', g, y }); y += GH
    g.rows.forEach((t, i) => { rows.push({ type: 'r', g, t, y, last: i === g.rows.length - 1 }); y += ROW })
  })
  const totalY = y + 30

  const edge = (a, b) => {
    const A = P[a], B = P[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy)
    return [A.x + (dx / d) * (NR + 4), A.y + (dy / d) * (NR + 4), B.x - (dx / d) * (NR + 4), B.y - (dy / d) * (NR + 4)]
  }

  return (
    <svg className={s.svg} viewBox="0 0 1600 990" role="img" aria-label={title}>
      <defs>
        {GROUPS.map((g) => (
          <linearGradient key={g.n} id={`${uid}-g${g.n}`} gradientUnits="userSpaceOnUse"
            x1={P[g.a].x} y1={P[g.a].y} x2={P[g.b].x} y2={P[g.b].y}>
            <stop offset="0" stopColor={C[g.a]} /><stop offset="1" stopColor={C[g.b]} />
          </linearGradient>
        ))}
      </defs>

      {/* 01 · heard */}
      <Step n="01" title="Heard" sub="Interviews, shadowing, and workshops with oncology staff" x={40} y={52} />
      {VOICES.map((v, i) => (
        <text key={v} className={s.voice} x={[520, 672, 919, 1171, 1373][i]} y="64">{v}</text>
      ))}
      <line className={s.rule} x1="40" y1="112" x2="1560" y2="112" />

      {/* 02 · coded: the matrix */}
      <Step n="02" title="Coded" sub={`${SCEN} scenarios, each marked against the themes it touches`} x={40} y={160} />
      {T.map((t) => (
        <g key={t.id} transform={`translate(${COLX[t.id]} 248) rotate(-38)`}>
          <text className={s.colHead}>{t.label}</text>
        </g>
      ))}
      {T.map((t) => (
        <rect key={t.id} className={s.colBand} x={COLX[t.id] - 22} y={TOP - 4} width="44" height={totalY - TOP - 12} rx="22"
          style={{ fill: t.c }} />
      ))}
      {rows.map((r, i) => r.type === 'g' ? (
        <g key={i}>
          <circle className={s.badge} cx={52} cy={r.y + 14} r="11" />
          <text className={s.badgeT} x={52} y={r.y + 18}>{r.g.n}</text>
          <text className={s.pair} x={72} y={r.y + 19}>{L[r.g.a]} × {L[r.g.b]}</text>
        </g>
      ) : (
        <g key={i}>
          <text className={s.scene} x={72} y={r.y + 17}>{r.t}</text>
          {[r.g.a, r.g.b].map((id) => (
            <circle key={id} className={s.dot} cx={COLX[id]} cy={r.y + 12} r="7" style={{ fill: C[id] }} />
          ))}
          {r.last && <line className={s.rowRule} x1="40" y1={r.y + ROW + 1} x2="910" y2={r.y + ROW + 1} />}
        </g>
      ))}
      <text className={s.totalL} x={72} y={totalY}>Scenarios per theme</text>
      {T.map((t) => <text key={t.id} className={s.total} x={COLX[t.id]} y={totalY} style={{ fill: t.c }}>{TOTAL[t.id]}</text>)}
      <text className={s.finding} x={72} y={totalY + 34}>No theme dominates: the strain is spread across the whole system, so no single fix would hold.</text>

      <line className={s.vrule} x1="960" y1="136" x2="960" y2="950" />

      {/* 03 · modeled: the tetrahedron */}
      <Step n="03" title="Modeled" sub="Four coequal themes; each touches the other three" x={1000} y={160} />
      <polygon className={s.face} points={`${P.rec.x},${P.rec.y} ${P.sys.x},${P.sys.y} ${P.env.x},${P.env.y}`} />
      <polygon className={s.face2} points={`${P.rec.x},${P.rec.y} ${P.env.x},${P.env.y} ${P.cul.x},${P.cul.y}`} />
      {GROUPS.map((g) => {
        const [x1, y1, x2, y2] = edge(g.a, g.b)
        return (
          <g key={g.n}>
            <line className={s.edge} data-back={g.n === BACK || undefined} x1={x1} y1={y1} x2={x2} y2={y2}
              style={{ stroke: `url(#${uid}-g${g.n})`, strokeWidth: 1 + g.rows.length * 1.15 }} />
          </g>
        )
      })}
      {GROUPS.map((g) => {
        const t = g.n === BACK ? 0.72 : g.n === 1 ? 0.62 : g.n === 2 ? 0.78 : 0.5
        const x = P[g.a].x + (P[g.b].x - P[g.a].x) * t, y = P[g.a].y + (P[g.b].y - P[g.a].y) * t
        return (
          <g key={g.n}>
            <circle className={s.badge} cx={x} cy={y} r="11" />
            <text className={s.badgeT} x={x} y={y + 4}>{g.n}</text>
          </g>
        )
      })}
      <circle className={s.void} cx={VOID.x} cy={VOID.y} r="38" />
      <text className={s.voidT} x={VOID.x} y={VOID.y + 5}>the void</text>
      {T.map((t) => {
        const p = P[t.id]
        const lab = { rec: [0, -40, 'middle'], sys: [0, 48, 'middle'], env: [0, 48, 'middle'], cul: [36, 6, 'start'] }[t.id]
        return (
          <g key={t.id}>
            <circle cx={p.x} cy={p.y} r={NR} style={{ fill: t.c }} />
            <text className={s.node} x={p.x + lab[0]} y={p.y + lab[1]} textAnchor={lab[2]}>{t.label}</text>
            <text className={s.nodeN} x={p.x} y={p.y + 6}>{TOTAL[t.id]}</text>
          </g>
        )
      })}
      <path className={s.leader} d={`M${VOID.x} ${VOID.y + 40}V640`} />

      {/* 04 · concluded */}
      <Step n="04" title="Concluded" x={1000} y={680} />
      <text className={s.thesis} x={1034} y={722}>
        <tspan x={1034}>Patient-centered care neglects</tspan>
        <tspan x={1034} dy="34">the people who give it.</tspan>
      </text>
      <text className={s.stepSub} x={1034} y={786}>The gap all four themes enclose: the void.</text>

      {/* 05 · designed */}
      <Step n="05" title="Designed" sub="A component for each theme" x={1000} y={846} />
      {T.map((t, i) => (
        <g key={t.id}>
          <circle cx={1042} cy={898 + i * 24} r="6" style={{ fill: t.c }} />
          <text className={s.built} x={1058} y={903 + i * 24}><tspan className={s.builtTheme}>{t.label}</tspan>{`  →  ${BUILT[t.id]}`}</text>
        </g>
      ))}
    </svg>
  )
}

export default function SheetSynthesisMap() {
  const uid = useId().replace(/:/g, '')
  const [open, setOpen] = useState(false)
  const dlg = useRef(null)
  const title = `Synthesis map, as an evidence chain. Heard: staff interviews, shadowing, and workshops. Coded: ${SCEN} scenarios marked against four themes, recognition, systemic issues, environment, and culture, with ${TOTAL.rec}, ${TOTAL.sys}, ${TOTAL.env}, and ${TOTAL.cul} scenarios each: no theme dominates. Modeled: a tetrahedron, each theme touching the other three. Concluded: patient-centered care neglects the people who give it. Designed: a component for each theme.`

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <figure className={s.map}>
      <figcaption className={s.head}>
        <span className={s.kicker}>Synthesis · from what we heard to what we built</span>
        <button type="button" className={s.enlarge} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></svg>
          Enlarge
        </button>
      </figcaption>
      <button type="button" className={s.open} onClick={() => setOpen(true)} aria-label="View the synthesis map full screen">
        <ChainSvg uid={`${uid}a`} title={title} />
      </button>
      <dialog ref={dlg} className={s.dialog} onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === dlg.current) setOpen(false) }} aria-label="Synthesis map, full screen">
        <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label="Close">
          <svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>
        {open && <ChainSvg uid={`${uid}b`} title={title} />}
      </dialog>
    </figure>
  )
}
