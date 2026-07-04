'use client'

import { useMemo, useRef, useState } from 'react'
import DeckStage from './DeckStage'
import { buildCut } from './renderBeat'
import { editableFields, setByPath } from './editable'
import e from './DeckEditor.module.css'

/* The cockpit, v1. Edit mode gives direct manipulation over the deck without
   touching code: reorder pages, include/exclude beats (toggle, not delete —
   Pitch's "skip a slide"), edit any copy in live fields, and swap images. The
   deck previews every change. Reorder is keyboard-accessible via up/down
   controls (the lift/move model); drag + the coverage map are the next pass.
   Edits are session-local — a working sketch to react to, not persistence. */

const DIAL = [
  { label: '5 min', value: '5' },
  { label: '20 min', value: '20' },
  { label: '45 min', value: '45' },
]

// Documentary photos available to swap into an image beat.
const IMAGE_CHOICES = [
  '/images/groundswell/Groundswell_Install-05.jpg',
  '/images/groundswell/Groundswell_Install-02.jpg',
  '/images/groundswell/Groundswell_Install-09.jpg',
  '/images/groundswell/Groundswell_Install-12.jpg',
  '/images/groundswell/Groundswell_Install-16.jpg',
  '/images/groundswell/091925-Groundswell-056.jpg',
]

export default function DeckEditor({ pool, caseLabel, badge }) {
  const [beats, setBeats] = useState(() => pool.map((b) => ({ ...b, included: true })))
  const [tier, setTier] = useState('20')
  const [editing, setEditing] = useState(false)
  const [sel, setSel] = useState(0)
  const [jump, setJump] = useState(null)
  const liveRef = useRef(null)

  const cut = useMemo(() => buildCut(beats.filter((b) => b.included), tier), [beats, tier])

  const announce = (msg) => { if (liveRef.current) liveRef.current.textContent = msg }

  const move = (i, dir) => {
    setBeats((bs) => {
      const j = i + dir
      if (j < 0 || j >= bs.length) return bs
      const n = [...bs]
      ;[n[i], n[j]] = [n[j], n[i]]
      announce(`${n[j].beat} moved to position ${j + 1} of ${n.length}`)
      return n
    })
    setSel(i + dir)
  }
  const toggle = (i) => setBeats((bs) => bs.map((b, k) => {
    if (k !== i) return b
    announce(`${b.beat} ${b.included ? 'removed from' : 'added to'} the deck`)
    return { ...b, included: !b.included }
  }))
  const edit = (i, path, value) =>
    setBeats((bs) => bs.map((b, k) => (k === i ? { ...b, content: setByPath(b.content, path, value) } : b)))
  const swap = (i, src) =>
    setBeats((bs) => bs.map((b, k) => (k === i ? { ...b, content: { ...b.content, media: { ...b.content.media, src } } } : b)))

  const select = (i) => { setSel(i); setJump({ id: beats[i].id }) }

  const selBeat = beats[sel]
  const fields = selBeat ? editableFields(selBeat.content) : []
  const inCut = selBeat && selBeat.included && selBeat.tiers.includes(tier)

  return (
    <div className={e.wrap}>
      <button
        className={`${e.editToggle} ${editing ? e.editToggleOn : ''}`}
        onClick={() => setEditing((v) => !v)}
        aria-pressed={editing}
      >
        {editing ? 'Done' : 'Edit deck'}
      </button>

      <DeckStage
        slides={cut}
        caseLabel={caseLabel}
        badge={editing ? 'Editing' : badge}
        showHint={!editing}
        jumpTo={jump}
        stageStyle={editing ? { right: 'var(--drawer-w)' } : undefined}
        timeDial={{ value: tier, options: DIAL, onChange: setTier }}
      />

      {editing && (
        <aside className={e.drawer} aria-label="Deck editor">
          <header className={e.drawerHead}>
            <h2 className={e.drawerTitle}>Edit deck</h2>
            <p className={e.drawerNote}>Reorder, toggle, edit copy, swap images. Changes preview live and stay this session.</p>
          </header>

          <ol className={e.list}>
            {beats.map((b, i) => (
              <li key={b.id} className={`${e.row} ${i === sel ? e.rowSel : ''} ${b.included ? '' : e.rowOff}`}>
                <div className={e.rowMove}>
                  <button className={e.iconBtn} onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${b.beat} up`}>↑</button>
                  <button className={e.iconBtn} onClick={() => move(i, 1)} disabled={i === beats.length - 1} aria-label={`Move ${b.beat} down`}>↓</button>
                </div>
                <label className={e.rowInc}>
                  <input type="checkbox" checked={b.included} onChange={() => toggle(i)} aria-label={`Include ${b.beat}`} />
                </label>
                <button className={e.rowLabel} onClick={() => select(i)}>
                  <span className={e.rowBeat}>{b.beat}</span>
                  <span className={e.rowMeta}>{b.register} · {b.tiers.join('/')}</span>
                </button>
              </li>
            ))}
          </ol>

          {selBeat && (
            <div className={e.fields}>
              <div className={e.fieldsHead}>
                <span className={e.fieldsTitle}>{selBeat.beat}</span>
                {!inCut && <span className={e.hiddenTag}>hidden from this cut</span>}
              </div>

              {selBeat.content.media && (
                <label className={e.field}>
                  <span className={e.fieldLabel}>image</span>
                  <select className={e.input} value={selBeat.content.media.src} onChange={(ev) => swap(sel, ev.target.value)}>
                    {IMAGE_CHOICES.map((src) => (
                      <option key={src} value={src}>{src.split('/').pop()}</option>
                    ))}
                    {!IMAGE_CHOICES.includes(selBeat.content.media.src) && (
                      <option value={selBeat.content.media.src}>{selBeat.content.media.src.split('/').pop()}</option>
                    )}
                  </select>
                </label>
              )}

              {fields.map((fld) => (
                <label key={fld.path} className={e.field}>
                  <span className={e.fieldLabel}>{fld.label}</span>
                  {fld.multiline ? (
                    <textarea className={e.input} rows={3} value={fld.value} onChange={(ev) => edit(sel, fld.path, ev.target.value)} />
                  ) : (
                    <input className={e.input} value={fld.value} onChange={(ev) => edit(sel, fld.path, ev.target.value)} />
                  )}
                </label>
              ))}
              <p className={e.tip}>Wrap words in *asterisks* for the accent italic.</p>
            </div>
          )}
        </aside>
      )}

      <p ref={liveRef} className={e.srOnly} aria-live="polite" role="status" />
    </div>
  )
}
