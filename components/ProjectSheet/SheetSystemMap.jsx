'use client'

import { useEffect, useId, useRef, useState } from 'react'
import s from './SheetSystemMap.module.css'

/* FS246: the synthesis as a static system map. A tetrahedron in a fixed
   three-quarter view (the one hidden edge dashed): four coequal themes,
   six numbered tensions annotated in the side columns, the void at the
   centre, what was built beside each theme, the voices along the foot.
   No motion. Tap to view it full screen. Scenarios are condensed from
   Lorin's Figma board (Groundswell-Synthesis), each assigned to its edge
   by position there; theme → component pairings are a DRAFT. */

const N = {
  rec: { x: 800, y: 205, label: 'Recognition', sub: 'Feeling valued', built: 'Art Wall · CTB Email', at: 'top' },
  sys: { x: 540, y: 655, label: 'Systemic Issues', sub: 'Daily tasks + structures', built: 'Data Dashboard', at: 'below' },
  env: { x: 945, y: 735, label: 'Environment', sub: 'Lack of benefits + funding', built: 'Restorative Pod', at: 'below' },
  cul: { x: 1060, y: 445, label: 'Culture', sub: 'Grief, work-life balance', built: ['Reflection Cards', '· Workshops'], at: 'right' },
}
const R = 44
/* FS247: each theme takes a colour from the dashboard's own data palette,
   and a tension is drawn as the blend of the two themes it joins */
const COLOR = { rec: '#CC8A8A', sys: '#6F8794', env: '#57A08F', cul: '#9B85B5' }
const VOID = { x: 748, y: 462, r: 86 }

const EDGES = [
  { n: 1, a: 'rec', b: 'sys', t: 0.66, items: [['Interruptions make my work', 'feel unimportant.'], ['Admin tasks crowd out the', 'work I trained for.'], ['Decisions are top-down; my', 'voice isn’t heard.']] },
  { n: 2, a: 'rec', b: 'env', t: 0.42, items: [['Paying for parking makes me', 'feel undervalued.'], ['Breaks are encouraged,', 'never protected.']] },
  { n: 3, a: 'rec', b: 'cul', t: 0.5, items: [['I have to prove myself, and I', 'feel guilty taking breaks.'], ['Patient-centered care neglects', 'the people who give it.']] },
  { n: 4, a: 'sys', b: 'env', t: 0.5, items: [['A focus on profit disregards', 'employee wellbeing.'], ['Executives see us as', 'replaceable.']] },
  { n: 5, a: 'sys', b: 'cul', t: 0.74, back: true, items: [['No system for breaks, and', 'no feedback that works.'], ['Unclear roles breed', 'dysfunction and exhaustion.'], ['“Don’t complain”: many', 'suffer in silence.']] },
  { n: 6, a: 'env', b: 'cul', t: 0.5, items: [['No windows, poor light,', 'no space of our own.'], ['No room for a real break or', 'to gather with colleagues.'], ['Nowhere to go on a bad day.']] },
]
const LEFT = [1, 2, 4], RIGHT = [3, 5, 6]

const VOICES = ['“I feel trapped.”', '“I was not prepared for this.”', '“There is no time to grieve.”', '“What mental health?”', '“I can’t turn it off.”']

const pt = (e) => ({ x: N[e.a].x + (N[e.b].x - N[e.a].x) * e.t, y: N[e.a].y + (N[e.b].y - N[e.a].y) * e.t })
const trim = (a, b) => {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d
  return [a.x + ux * (R + 6), a.y + uy * (R + 6), b.x - ux * (R + 6), b.y - uy * (R + 6)]
}

function Column({ ids, x, title }) {
  let y = 92
  return (
    <g className={s.col}>
      <text className={s.colTitle} x={x} y={56}>{title}</text>
      {ids.map((n) => {
        const e = EDGES[n - 1]
        const top = y
        const rows = e.items.reduce((a, l) => a + l.length, 0)
        y += 34 + rows * 21 + e.items.length * 8 + 26
        let ly = top + 34
        return (
          <g key={n}>
            <circle className={s.num} cx={x + 13} cy={top + 6} r="13" />
            <text className={s.numText} x={x + 13} y={top + 11}>{n}</text>
            <text className={s.pair} x={x + 36} y={top + 11}>{N[e.a].label} × {N[e.b].label}</text>
            {e.items.map((lines, i) => {
              const g = (
                <g key={i}>
                <circle className={s.dot} cx={x + 27} cy={ly - 5} r="3.2" style={{ fill: i % 2 ? COLOR[e.b] : COLOR[e.a] }} />
                <text className={s.scene} x={x + 36} y={ly}>
                  {lines.map((l, k) => <tspan key={k} x={x + 36} dy={k ? 21 : 0}>{l}</tspan>)}
                </text>
                </g>
              )
              ly += lines.length * 21 + 8
              return g
            })}
          </g>
        )
      })}
    </g>
  )
}

function MapSvg({ title, uid }) {
  return (
    <svg className={s.svg} viewBox="0 0 1600 1000" role="img" aria-label={title}>
      <defs>
        {EDGES.map((e) => (
          <linearGradient key={e.n} id={`${uid}-e${e.n}`} gradientUnits="userSpaceOnUse"
            x1={N[e.a].x} y1={N[e.a].y} x2={N[e.b].x} y2={N[e.b].y}>
            <stop offset="0" stopColor={COLOR[e.a]} /><stop offset="1" stopColor={COLOR[e.b]} />
          </linearGradient>
        ))}
        {Object.keys(N).map((id) => (
          <radialGradient key={id} id={`${uid}-n${id}`} cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor={COLOR[id]} stopOpacity="0.8" />
            <stop offset="1" stopColor={COLOR[id]} stopOpacity="0.92" />
          </radialGradient>
        ))}
        <radialGradient id={`${uid}-void`} r="60%">
          <stop offset="0" stopColor="#FFFBF8" /><stop offset="1" stopColor="#FFFBF8" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* faces: the front two, barely tinted, give the form its volume */}
      <polygon className={s.face} points={`${N.rec.x},${N.rec.y} ${N.sys.x},${N.sys.y} ${N.env.x},${N.env.y}`} />
      <polygon className={s.face2} points={`${N.rec.x},${N.rec.y} ${N.env.x},${N.env.y} ${N.cul.x},${N.cul.y}`} />

      {EDGES.map((e) => {
        const [x1, y1, x2, y2] = trim(N[e.a], N[e.b])
        return <line key={e.n} className={s.edge} data-back={e.back || undefined} x1={x1} y1={y1} x2={x2} y2={y2}
          style={{ stroke: `url(#${uid}-e${e.n})`, strokeWidth: 1 + e.items.length * 1.1 }} />
      })}

      {/* the void */}
      <circle className={s.void} cx={VOID.x} cy={VOID.y} r={VOID.r} style={{ fill: `url(#${uid}-void)` }} />
      <text className={s.voidLabel} x={VOID.x} y={VOID.y - 34}>The void</text>
      <text className={s.thesis} x={VOID.x} y={VOID.y - 4}>
        <tspan x={VOID.x}>Patient-centered</tspan>
        <tspan x={VOID.x} dy="24">care neglects</tspan>
        <tspan x={VOID.x} dy="24">the care worker</tspan>
      </text>

      {EDGES.map((e) => {
        const p = pt(e)
        return (
          <g key={e.n}>
            <circle className={s.num} cx={p.x} cy={p.y} r="13" />
            <text className={s.numText} x={p.x} y={p.y + 5}>{e.n}</text>
          </g>
        )
      })}

      {Object.entries(N).map(([id, n]) => {
        const built = Array.isArray(n.built) ? n.built : [n.built]
        const lines = [[n.label, s.nLabel], [n.sub, s.nSub], ...built.map((b, i) => [i ? `\u2002 ${b}` : `→ ${b}`, s.nBuilt])]
        const pos = n.at === 'top' ? { x: n.x, y: n.y - R - 70, a: 'middle' }
          : n.at === 'right' ? { x: n.x + R + 16, y: n.y - 18, a: 'start' }
            : { x: n.x, y: n.y + R + 26, a: 'middle' }
        return (
          <g key={id}>
            <circle className={s.node} cx={n.x} cy={n.y} r={R} style={{ fill: `url(#${uid}-n${id})` }} />
            {lines.map(([t, c], i) => (
              <text key={i} className={c} x={pos.x} y={pos.y + i * 23} textAnchor={pos.a}>{t}</text>
            ))}
          </g>
        )
      })}

      <Column ids={LEFT} x={40} title="Tensions" />
      <Column ids={RIGHT} x={1330} title="Tensions" />

      <line className={s.rule} x1="40" y1="880" x2="1560" y2="880" />
      <text className={s.colTitle} x="40" y="928">What we heard</text>
      {VOICES.map((v, i) => (
        <text key={v} className={s.voice} x={[390, 640, 930, 1185, 1430][i]} y="930" textAnchor="middle">{v}</text>
      ))}
    </svg>
  )
}

export default function SheetSystemMap({ tone = 'paper' }) {
  const uid = useId().replace(/:/g, '')
  const [open, setOpen] = useState(false)
  const dlg = useRef(null)
  const title = 'Synthesis system map. Four themes from affinity mapping, recognition, systemic issues, environment, and culture, each connected to the other three in a tetrahedron. Six numbered tensions carry the scenarios staff described. At the center, the void: patient-centered care neglects the care worker. Beside each theme, what Groundswell built in answer.'

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <figure className={`${s.map} ${tone === 'paper' ? s.paper : ''}`}>
      <figcaption className={s.head}>
        <span className={s.kicker}>Synthesis · tetrahedron analysis</span>
        <span className={s.legend} aria-hidden="true">
          <span><i className={s.lgNode} />Theme</span>
          <span><i className={s.lgNum}>1</i>Tension</span>
          <span><i className={s.lgWeight} />Weight = scenarios</span>
          <span><i className={s.lgBack} />Hidden edge</span>
          <span><i className={s.lgVoid} />The void</span>
          <span><i className={s.lgBuilt}>→</i>What we built</span>
        </span>
        <button type="button" className={s.enlarge} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" /></svg>
          Enlarge
        </button>
      </figcaption>

      <button type="button" className={s.open} onClick={() => setOpen(true)} aria-label="View the synthesis map full screen">
        <MapSvg title={title} uid={`${uid}a`} />
      </button>

      <dialog ref={dlg} className={s.dialog} onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === dlg.current) setOpen(false) }} aria-label="Synthesis map, full screen">
        <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label="Close">
          <svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>
        {open && <MapSvg title={title} uid={`${uid}b`} />}
      </dialog>
    </figure>
  )
}
