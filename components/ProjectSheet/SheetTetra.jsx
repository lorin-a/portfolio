'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import s from './SheetTetra.module.css'

/* FS245: the synthesis as a true tetrahedron. Four coequal themes at the
   vertices; all six relationships on the edges, each carrying the staff
   scenarios the board placed on it; the void at the centre, enclosed by
   all four. Drag to turn it; a key on top isolates one layer and dims the
   rest; a panel reads out what the layer holds. Every quote and scenario
   is verbatim from Lorin's Figma board (Groundswell-Synthesis), assigned
   to edges by their position on that board. Theme → component pairings
   are a DRAFT for her to confirm. */

const img = (k, w = 160) => (GS_IMAGES[k] ? cloudImg(GS_IMAGES[k], w) : null)

const THEMES = [
  { id: 'rec', label: 'Recognition', sub: 'Feeling valued', v: [1, 1, 1] },
  { id: 'env', label: 'Environment', sub: 'Lack of benefits + funding', v: [1, -1, -1] },
  { id: 'cul', label: 'Culture', sub: 'Grief, work-life balance', v: [-1, -1, 1] },
  { id: 'sys', label: 'Systemic Issues', sub: 'Daily tasks + structures', v: [-1, 1, -1] },
]

const EDGES = [
  { a: 'rec', b: 'sys', name: 'Recognition × Systemic Issues', items: [
    'When my work is interrupted, it makes me feel unrecognized and as if my work is unimportant.',
    'I am so busy with administrative tasks that I hardly get to do the work I am trained for.',
    'I don’t feel like my voice is heard or valued in a system where decision making is top-down.' ] },
  { a: 'rec', b: 'env', name: 'Recognition × Environment', items: [
    'Having to pay for parking and take a shuttle to work makes me feel undervalued and like I don’t matter.',
    'Even though breaks are encouraged from management, no real effort is made to ensure we aren’t overworking ourselves.' ] },
  { a: 'rec', b: 'cul', name: 'Recognition × Culture', items: [
    'I feel like I have to prove myself at work to be valued by higher status coworkers and feel guilty about taking breaks.',
    '“Patient Centered Care” neglects the needs of care workers.' ] },
  { a: 'sys', b: 'env', name: 'Systemic Issues × Environment', items: [
    'Healthcare is a commodity. A focus on profit creates systemic disregard for employee wellbeing.',
    'Execs do not see care worker’s needs as worth investing in. We are replaceable.' ] },
  { a: 'sys', b: 'cul', name: 'Systemic Issues × Culture', items: [
    'There is no system in place to support breaks and no functional formal feedback system.',
    'I can never get all of my work done. Lack of clarity on roles creates dysfunction, exhaustion, and frustration.',
    '“Do the work” and “don’t complain” mentality is the norm, causing many to suffer in silence.' ] },
  { a: 'env', b: 'cul', name: 'Environment × Culture', items: [
    'The lack of physical space, windows, and poor lighting takes a toll on my overall happiness at work.',
    'I feel burnt out when there is no space for me to take a real break or gather with my colleagues.',
    'When you’re having a bad day, there is nowhere to go to express your grief.' ] },
]

const VOICES = [
  'A special person can do this work forever, a good person can do it a little while, most people couldn’t do it for a day.',
  'I feel trapped.', 'I was not prepared for this.', 'What I do at work is indescribable.',
  'I’ve given up on trying to change things.', 'There is no time to grieve.',
  'I can’t turn it off.', 'No budget for self care.', 'What mental health?',
]

/* DRAFT pairings, hers to confirm */
const BUILT = {
  rec: [{ name: 'Art Wall', k: 'gs-artwall' }, { name: 'CTB Email', k: 'gs-ctb-email' }],
  env: [{ name: 'Restorative Pod', k: 'gs-pod' }],
  cul: [{ name: 'Reflection Cards', k: 'gs-cards' }, { name: 'Workshops', k: 'gs-workshop-flower-01' }],
  sys: [{ name: 'Data Dashboard', src: '/video/gs-dashboard/view-glance.jpg' }],
}

const LAYERS = [
  { id: 'voices', label: 'Voices', note: 'What staff told us, in interviews, shadowing, and workshops.' },
  { id: 'themes', label: 'Themes', note: 'Four themes from affinity mapping. Each touches the other three.' },
  { id: 'tensions', label: 'Tensions', note: 'Where two themes meet: the scenarios staff described. Select an edge.' },
  { id: 'void', label: 'The void', note: 'Enclosed by all four themes, the gap at the centre of the system.' },
  { id: 'built', label: 'Groundswell', note: 'What we designed into each theme, filling the void.' },
]

const W = 640, H = 560, CX = W / 2, CY = H / 2 + 6, SCALE = 150, DIST = 6

function project([x, y, z], ry, rx) {
  const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx)
  const x1 = x * cy + z * sy, z1 = -x * sy + z * cy
  const y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx
  const f = DIST / (DIST - z2)
  return { x: CX + x1 * SCALE * f, y: CY - y1 * SCALE * f, z: z2, f }
}

export default function SheetTetra() {
  const [rot, setRot] = useState({ y: 0.6, x: -0.35 })
  const [layer, setLayer] = useState(null)
  const [edge, setEdge] = useState(0)
  const [theme, setTheme] = useState(null)
  const [reduced, setReduced] = useState(false)
  const [inView, setInView] = useState(false)
  const drag = useRef(null)
  const wrap = useRef(null)
  const touched = useRef(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  /* an idle, slow turn until the reader takes hold of it */
  useEffect(() => {
    if (reduced || !inView || touched.current) return
    let raf, last = performance.now()
    const tick = (t) => {
      const dt = (t - last) / 1000; last = t
      if (!drag.current) setRot((r) => ({ ...r, y: r.y + dt * 0.18 }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, inView])

  const down = (e) => { touched.current = true; drag.current = { x: e.clientX, y: e.clientY, r: rot }; e.currentTarget.setPointerCapture?.(e.pointerId) }
  const move = (e) => {
    const d = drag.current; if (!d) return
    setRot({ y: d.r.y + (e.clientX - d.x) * 0.008, x: Math.max(-1.1, Math.min(1.1, d.r.x + (e.clientY - d.y) * 0.008)) })
  }
  const up = () => { drag.current = null }
  const key = (e) => {
    const step = 0.15
    if (e.key === 'ArrowLeft') setRot((r) => ({ ...r, y: r.y - step }))
    else if (e.key === 'ArrowRight') setRot((r) => ({ ...r, y: r.y + step }))
    else if (e.key === 'ArrowUp') setRot((r) => ({ ...r, x: Math.max(-1.1, r.x - step) }))
    else if (e.key === 'ArrowDown') setRot((r) => ({ ...r, x: Math.min(1.1, r.x + step) }))
    else return
    e.preventDefault(); touched.current = true
  }

  const P = useMemo(() => Object.fromEntries(THEMES.map((t) => [t.id, project(t.v, rot.y, rot.x)])), [rot])
  const O = project([0, 0, 0], rot.y, rot.x)
  const faces = useMemo(() => {
    const ids = THEMES.map((t) => t.id)
    return [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
      .map((f) => ({ pts: f.map((i) => P[ids[i]]), z: f.reduce((a, i) => a + P[ids[i]].z, 0) / 3 }))
      .sort((a, b) => a.z - b.z)
  }, [P])

  const on = (id) => !layer || layer === id
  const dim = (id) => (on(id) ? 1 : 0.14)
  const pick = (id) => { setLayer((l) => (l === id ? null : id)); setTheme(null) }
  const L = LAYERS.find((l) => l.id === layer)
  const nodes = [...THEMES].sort((a, b) => P[a.id].z - P[b.id].z)

  /* nine voices on a slow outer ring, in screen space */
  const ring = VOICES.map((_, i) => {
    const a = (i / VOICES.length) * Math.PI * 2 + rot.y * 0.5
    return { x: CX + Math.cos(a) * 285, y: CY + Math.sin(a) * 250 }
  })

  return (
    <figure ref={wrap} className={s.tetra}>
      <div className={s.key} role="toolbar" aria-label="Layers of the synthesis">
        <span className={s.keyLabel}>Key</span>
        {LAYERS.map((l) => (
          <button key={l.id} type="button" className={s.keyItem} data-layer={l.id}
            aria-pressed={layer === l.id} onClick={() => pick(l.id)}>
            <span className={s.swatch} aria-hidden="true" />{l.label}
          </button>
        ))}
        <span className={s.hint} aria-hidden="true">Drag to turn</span>
      </div>

      <div className={s.body}>
        <svg className={s.canvas} viewBox={`0 0 ${W} ${H}`} tabIndex={0} onKeyDown={key}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
          role="img" aria-label="A tetrahedron of four research themes, recognition, environment, culture, and systemic issues, each connected to the other three; the void sits at its centre. Use arrow keys to turn it.">
          <defs>
            <radialGradient id="tv-core">
              <stop offset="0%" stopColor="var(--color-sage)" stopOpacity="0.95" />
              <stop offset="70%" stopColor="var(--color-sage)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0" />
            </radialGradient>
            {THEMES.flatMap((t) => (BUILT[t.id] || []).map((_, i) => (
              <clipPath key={t.id + i} id={`tv-clip-${t.id}-${i}`}><circle r="22" /></clipPath>
            )))}
          </defs>

          {/* voices: an outer ring of quote marks */}
          <g style={{ opacity: layer ? dim('voices') : 0.35 }} className={s.voices}>
            {ring.map((p, i) => <text key={i} x={p.x} y={p.y}>“</text>)}
          </g>

          {/* faces, back to front: the volume */}
          <g style={{ opacity: layer && !on('void') && !on('themes') ? 0.25 : 1 }}>
            {faces.map((f, i) => (
              <polygon key={i} className={s.face} points={f.pts.map((p) => `${p.x},${p.y}`).join(' ')} />
            ))}
          </g>

          {/* the void, at the centre */}
          <g style={{ opacity: on('void') || on('built') ? 1 : 0.14 }}>
            <circle cx={O.x} cy={O.y} r={layer === 'built' ? 54 : 30} className={s.core}
              data-built={layer === 'built' || undefined} />
            <text className={s.coreLabel} x={O.x} y={O.y + 5} data-built={layer === 'built' || undefined}>
              {layer === 'built' ? 'Groundswell' : 'The void'}
            </text>
          </g>

          {/* tensions: six edges, each selectable */}
          <g style={{ opacity: dim('tensions') === 1 || on('themes') ? 1 : 0.25 }}>
            {EDGES.map((e, i) => {
              const a = P[e.a], b = P[e.b], back = (a.z + b.z) / 2 < 0
              const sel = layer === 'tensions' && edge === i
              return (
                <g key={i}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={s.edge}
                    data-back={back || undefined} data-sel={sel || undefined} />
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={s.hit}
                    onClick={() => { setLayer('tensions'); setEdge(i) }} />
                  {layer === 'tensions' && (
                    <g className={s.count} transform={`translate(${(a.x + b.x) / 2} ${(a.y + b.y) / 2})`}
                      data-sel={sel || undefined} onClick={() => setEdge(i)}>
                      <circle r="13" /><text y="4.5">{e.items.length}</text>
                    </g>
                  )}
                </g>
              )
            })}
          </g>

          {/* themes, nearest last; with the components that answer them */}
          {nodes.map((t) => {
            const p = P[t.id], r = 34 * p.f
            const built = layer === 'built'
            return (
              <g key={t.id} style={{ opacity: on('themes') || built || layer === 'tensions' ? 1 : 0.25 }}
                className={s.node} data-sel={theme === t.id || undefined}
                onClick={() => { setTheme(t.id); if (layer !== 'built') setLayer('themes') }}>
                <circle cx={p.x} cy={p.y} r={r} />
                <text x={p.x} y={p.y + r + 20}>{t.label}</text>
                {built && BUILT[t.id].map((c, i) => {
                  const n = BUILT[t.id].length, ang = -Math.PI / 2 + (i - (n - 1) / 2) * 0.9
                  const dx = Math.cos(ang) * (r + 34), dy = Math.sin(ang) * (r + 34)
                  const src = c.src || img(c.k)
                  return (
                    <g key={c.name} transform={`translate(${p.x + dx} ${p.y + dy})`} className={s.badge}>
                      <line x1={-dx * 0.42} y1={-dy * 0.42} x2={0} y2={0} />
                      <circle r="24" />
                      {src && <image href={src} x="-22" y="-22" width="44" height="44"
                        preserveAspectRatio="xMidYMid slice" clipPath={`url(#tv-clip-${t.id}-${i})`} />}
                    </g>
                  )
                })}
              </g>
            )
          })}
        </svg>

        <aside className={s.panel} aria-live="polite">
          {!layer && (
            <>
              <p className={s.pLabel}>Tetrahedron analysis</p>
              <p className={s.pLead}>Four themes, each touching the other three. What they enclose is the void: patient-centered care neglects the care worker.</p>
              <p className={s.pNote}>Choose a layer in the key, or drag the form to turn it.</p>
            </>
          )}
          {layer === 'voices' && (
            <>
              <p className={s.pLabel}>Voices · {VOICES.length} of many</p>
              <ul className={s.voiceList}>{VOICES.map((v) => <li key={v}>“{v}”</li>)}</ul>
            </>
          )}
          {layer === 'themes' && (
            <>
              <p className={s.pLabel}>Themes · from affinity mapping</p>
              <ul className={s.themeList}>
                {THEMES.map((t) => (
                  <li key={t.id} data-sel={theme === t.id || undefined}>
                    <button type="button" onClick={() => setTheme(t.id)}><strong>{t.label}</strong><span>{t.sub}</span></button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {layer === 'tensions' && (
            <>
              <p className={s.pLabel}>Tension · {edge + 1} of 6</p>
              <p className={s.pTitle}>{EDGES[edge].name}</p>
              <ul className={s.voiceList}>{EDGES[edge].items.map((v) => <li key={v}>{v}</li>)}</ul>
              <div className={s.pager}>
                <button type="button" onClick={() => setEdge((edge + 5) % 6)} aria-label="Previous tension">←</button>
                <button type="button" onClick={() => setEdge((edge + 1) % 6)} aria-label="Next tension">→</button>
              </div>
            </>
          )}
          {layer === 'void' && (
            <>
              <p className={s.pLabel}>The void · the thesis</p>
              <p className={s.pLead}>Patient-centered care neglects the well-being of the people who give it.</p>
              <p className={s.pNote}>In a profit-driven, hierarchical system, the focus on patients comes at the cost of worker support: burnout, poor recognition, and a toxic culture that undermines care for patients and providers alike.</p>
            </>
          )}
          {layer === 'built' && (
            <>
              <p className={s.pLabel}>Groundswell · into each theme</p>
              <ul className={s.builtList}>
                {THEMES.map((t) => (
                  <li key={t.id}><span>{t.label}</span><strong>{BUILT[t.id].map((c) => c.name).join(' · ')}</strong></li>
                ))}
              </ul>
            </>
          )}
          {L && <p className={s.pFoot}>{L.note}</p>}
        </aside>
      </div>
    </figure>
  )
}
