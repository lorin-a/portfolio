'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { sheetImg } from '../SheetMedia'
import styles from './SheetPamphlet.module.css'

/**
 * THE GAP GUIDE, IN HAND (FS386, her idea: “would it be more impressive to
 * literally BUILD a digital pamphlet that can be explored and opened and
 * flipped”).
 *
 * The printed guide is an accordion of seven panels a side. Each panel here
 * is a two-faced card: its front is the gear side, its back the route side,
 * paired as on the paper (gear panel i backs route panel 8 − i), so turning
 * the whole strip over reverses the order exactly as the real thing does.
 *
 *   · Folded: the panels stack into the cover (gear panel 7, the stacked
 *     logo, as in her photo of the guides standing on a ledge).
 *   · Open: the panels stand in a shallow zigzag, like paper that has been
 *     folded, with alternate panels angled toward and away from you.
 *   · Flip: the strip turns over to the other side.
 *
 * It unfolds once on its own when it first comes into view. Every control
 * is a button; each panel opens full screen. Reduced motion: it starts
 * open and every change is instant.
 */

const N = 7
const ZIG = 14  /* degrees: how far each panel leans when open */

export default function SheetPamphlet({ data, onImage }) {
  const { gear = [], route = [], gearLabel = 'Gear side', routeLabel = 'Route side' } = data || {}
  const wrap = useRef(null)
  const [w, setW] = useState(0)            /* one panel's width, px */
  const [open, setOpen] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [reduced, setReduced] = useState(false)
  const played = useRef(false)

  /* measure: seven panels across the frame, never taller than 70vh */
  useLayoutEffect(() => {
    const el = wrap.current
    if (!el) return
    const fit = () => {
      const narrow = window.matchMedia('(max-width: 699px)').matches
      const byWidth = (el.clientWidth * 0.96) / N
      const byHeight = (window.innerHeight * 0.62) * (684 / 1528)
      setW(Math.round(narrow ? 150 : Math.min(byWidth, byHeight)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* reduced motion starts open; otherwise it unfolds when first seen */
  useEffect(() => {
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(r)
    if (r) { setOpen(true); played.current = true; return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !played.current) {
        played.current = true
        setTimeout(() => setOpen(true), 350)
        io.disconnect()
      }
    }, { threshold: 0.45 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  const h = Math.round(w * (1528 / 684))
  const th = (ZIG * Math.PI) / 180
  const step = w * Math.cos(th)            /* each panel's footprint when open */
  const total = open ? step * N : w

  /* panel i's transform: open = zigzag from the left edge; folded = all on
     one slot, stacked so gear panel 7 (the cover) is on top */
  const panelStyle = (i) => {
    if (!open) {
      /* folded: every panel on one slot, the cover (last gear panel) on top */
      return {
        transform: `translate3d(${0}px, 0, ${i * 0.6}px) rotateY(0deg)`,
        transitionDelay: reduced ? '0ms' : `${(N - 1 - i) * 40}ms`,
      }
    }
    const x = i * step
    const z = i % 2 ? -w * Math.sin(th) : 0
    const a = i % 2 ? -ZIG : ZIG
    return {
      transform: `translate3d(${x}px, 0, ${z}px) rotateY(${a}deg)`,
      transitionDelay: reduced ? '0ms' : `${i * 55}ms`,
    }
  }

  const side = flipped ? route : gear
  const sideLabel = flipped ? routeLabel : gearLabel
  /* the face of panel slot i the reader sees right now */
  const faceAt = (i) => (flipped ? route[i] : gear[i])

  return (
    <figure className={styles.wrap} ref={wrap} data-reduced={reduced || undefined}>
      <div className={styles.stage} style={{ height: h ? h + 40 : undefined }}>
        <div className={styles.strip}
          style={{ width: total, height: h, transform: `rotateY(${flipped ? 180 : 0}deg)` }}
          data-open={open || undefined}>
          {gear.map((g, i) => {
            const backPanel = route[N - 1 - i]
            const frontSrc = sheetImg(g.key, 900)
            const backSrc = backPanel && sheetImg(backPanel.key, 900)
            return (
              <div key={g.key} className={styles.panel} style={{ width: w, height: h, ...panelStyle(i) }}>
                <span className={styles.face}>{frontSrc && <img src={frontSrc} alt="" draggable="false" />}</span>
                <span className={`${styles.face} ${styles.back}`}>{backSrc && <img src={backSrc} alt="" draggable="false" />}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.bar}>
        <p className={styles.caption} aria-live="polite">
          <span className={styles.sideLabel}>{open ? sideLabel : 'Folded'}</span>
          {open ? ' · select a panel to read it' : ' · the cover'}
        </p>
        <div className={styles.controls}>
          <button type="button" className={styles.btn}
            onClick={() => { if (open) setFlipped(false); setOpen((o) => !o) }} aria-pressed={!open}>
            {open ? 'Fold' : 'Unfold'}
          </button>
          <button type="button" className={styles.btn} onClick={() => setFlipped((f) => !f)} disabled={!open}>
            {flipped ? `Flip to ${gearLabel.toLowerCase()}` : `Flip to ${routeLabel.toLowerCase()}`}
          </button>
        </div>
      </div>

      {/* the panels as a list of buttons, in reading order for the side you
          see: keyboard and screen readers get every panel, full screen */}
      {open && (
        <ol className={styles.panelList} aria-label={`${sideLabel}, panels`}>
          {side.map((p, i) => (
            <li key={p.key}>
              <button type="button" className={styles.panelBtn}
                onClick={(e) => onImage?.(faceAt(i).key, e.currentTarget)}
                aria-label={`View full screen: ${p.alt}`}>
                <span className={styles.panelNum}>{String(i + 1).padStart(2, '0')}</span> {p.name}
              </button>
            </li>
          ))}
        </ol>
      )}
    </figure>
  )
}
