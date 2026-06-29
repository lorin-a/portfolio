'use client'

import { useEffect, useRef, useState } from 'react'
import s from './system.module.css'

/* Shared kit for the Birth Story case study — the predictable system.
   Every section composes Section + SectionHead and the small primitives below. */

export function useSeen(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, seen]
}

/* tone: 'cream' | 'shade' | 'tint' */
export function Section({ id, tone = 'cream', threshold = 0.15, className = '', children }) {
  const [ref, seen] = useSeen(threshold)
  const toneCls = tone === 'shade' ? s.shade : tone === 'tint' ? s.tint : ''
  return (
    <section ref={ref} id={id} className={`${s.section} ${toneCls} ${seen ? s.in : ''} ${className}`}>
      <div className={s.inner}>{children}</div>
    </section>
  )
}

export function SectionHead({ num, label, headline, takeaway, wide = false }) {
  return (
    <header className={`${s.head} ${wide ? s.headWide : ''}`}>
      <p className={`${s.label} ${s.up}`}><span className={s.labelNum}>{num}</span>{label}</p>
      {headline && <h2 className={`${s.headline} ${s.up}`} style={{ '--d': '90ms' }}>{headline}</h2>}
      {takeaway && <p className={`${s.takeaway} ${s.up}`} style={{ '--d': '180ms' }}>{takeaway}</p>}
    </header>
  )
}

export function Phone({ src, alt, width = '220px', caption, className = '' }) {
  return (
    <figure className={className} style={{ margin: 0, display: 'grid', justifyItems: 'center' }}>
      <span className={s.phone} style={{ width }}>
        <span className={s.phoneNotch} aria-hidden="true" />
        <span className={s.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
      </span>
      {caption && <figcaption className={s.cap}>{caption}</figcaption>}
    </figure>
  )
}

export function Note({ children, who }) {
  return <p className={s.note}>{children}{who && <span className={s.noteWho}>{who}</span>}</p>
}

export function BeforeAfter({ before, after, why }) {
  return (
    <div className={s.ba}>
      <div className={`${s.baPane} ${s.baBefore}`}><span className={s.baTag}>Before</span><p className={s.baText}>{before}</p></div>
      <span className={s.baArrow} aria-hidden="true">→</span>
      <div className={`${s.baPane} ${s.baAfter}`}><span className={s.baTag}>After</span><p className={s.baText}>{after}</p></div>
      {why && <p className={s.baWhy}>{why}</p>}
    </div>
  )
}

/* ── field-notes register (the process voice) ── */

export function FieldSection({ id, num, crumb, when, alt = false, wide = false, threshold = 0.15, children }) {
  const [ref, seen] = useSeen(threshold)
  return (
    <section ref={ref} id={id} className={`${s.field} ${alt ? s.fieldAlt : ''} ${seen ? s.in : ''}`}>
      <div className={`${s.sheet} ${wide ? s.sheetWide : ''}`}>
        <header className={s.fieldHead}>
          <span className={s.fNum}>{num}</span>
          <span className={s.fCrumb}>{crumb}</span>
          {when && <span className={s.fWhen}>{when}</span>}
        </header>
        <div className={s.flow}>{children}</div>
      </div>
    </section>
  )
}

export function Ask({ kicker = 'the question', children }) {
  return (
    <div className={`${s.askBlock} ${s.up}`}>
      {kicker && <span className={s.askKicker}>{kicker}</span>}
      <p className={s.ask}>{children}</p>
    </div>
  )
}

export function Prose({ children }) {
  return <p className={`${s.prose} ${s.up}`}>{children}</p>
}

export function Plate({ tab, src, alt = '', cap, margin, rot = '0deg', narrow = false, wide = false, light = false }) {
  return (
    <figure className={`${s.plate} ${narrow ? s.plateNarrow : ''} ${wide ? s.plateWide : ''} ${s.up}`} style={{ '--rot': rot }}>
      {tab && <span className={s.plateTab}>{tab}</span>}
      <div className={`${s.plateArt} ${light ? s.plateArtLight : ''}`}><img src={src} alt={alt} loading="lazy" draggable="false" /></div>
      {cap && <figcaption className={s.plateCap}>{cap}</figcaption>}
      {margin && <p className={s.plateMargin}>{margin}</p>}
    </figure>
  )
}

export function Shot({ src, alt = '', cap, width = '150px' }) {
  return (
    <figure className={`${s.shot} ${s.up}`}>
      <span className={s.phone} style={{ width }}>
        <span className={s.phoneNotch} aria-hidden="true" />
        <span className={s.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
      </span>
      {cap && <figcaption className={s.shotCap}>{cap}</figcaption>}
    </figure>
  )
}

export function Friction({ tag = 'still open', children }) {
  return <p className={`${s.friction} ${s.up}`}><span className={s.frictionTag}>{tag}</span>{children}</p>
}

/* ── split: documentation layout — a narrow text column (the thinking) and a
   large media column that commands the right side of the page. The visuals do
   the talking; the copy annotates. `text` stays put while tall media scrolls. */
export function Split({ text, children }) {
  return (
    <div className={s.split}>
      <div className={s.splitText}>{text}</div>
      <div className={`${s.splitMedia} ${s.up}`}>{children}</div>
    </div>
  )
}

/* ── figure: one large artifact — a context photograph or a screen mockup —
   shown big, with a documentary caption and (for photos) a Pexels byline.
   `tag` is the corner chip ("the moment", "the flow", "the evidence"). ── */
export function Figure({ src, alt = '', tag, cap, byline, photo = false, small = false, portrait = false, ratio, focus, className = '' }) {
  return (
    <figure className={`${s.fig} ${small ? s.figSmall : ''} ${portrait ? s.figPortrait : ''} ${className}`}>
      {tag && <span className={`${s.figTag} ${small ? s.figTagAlt : ''}`}>{tag}</span>}
      <div
        className={`${s.figArt} ${ratio ? s.figArtCrop : ''} ${photo ? '' : s.figArtScreen}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <img src={src} alt={alt} loading="lazy" draggable="false" style={focus ? { objectPosition: focus } : undefined} />
      </div>
      {(cap || byline) && (
        <figcaption className={s.figCap}>
          {cap}
          {byline && <span className={s.figByline}>Photo · {byline} / Pexels</span>}
        </figcaption>
      )}
    </figure>
  )
}

/* ── finding: the compressed takeaway that replaces a paragraph. One emphatic
   line; bold carries the accent. This is the 20% copy doing the work. ── */
export function Finding({ kicker = 'the finding', children }) {
  return (
    <div className={`${s.finding} ${s.up}`}>
      <span className={s.askKicker}>{kicker}</span>
      <p className={s.findingText}>{children}</p>
    </div>
  )
}

export { s as sys }
