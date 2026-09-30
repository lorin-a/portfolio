'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Lightbox from '@/components/Lightbox/Lightbox'
import { SheetStage, SheetPoem, SheetCardGallery, SheetHero, SheetFilmstrip, slidesFor, sheetImg } from './SheetMedia'
import styles from './SheetContent.module.css'

/**
 * Entrance choreography: each section composes itself once as it enters the
 * viewport — a short rise, played via WAAPI so no element ever holds a
 * hidden state (kill JS or prefer reduced motion and everything simply sits
 * composed). `data-reveal` carries a stagger step for the sections already
 * on screen when the folder lands.
 */
function useSheetReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        io.unobserve(en.target)
        en.target.animate(
          [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
          {
            duration: 550,
            delay: (Number(en.target.dataset.reveal) || 0) * 80,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          }
        )
      })
    }, { threshold: 0.12 })
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}

/**
 * The folder sheet's body: FRAME, then the COMPONENTS, then the CLOSE.
 *
 * The shape answers a screener rather than a panel. Her own research draws
 * the line: "the live site is for screening, the deck is for the interview"
 * (Ali-Hasan). So the frame is short, the outcome line rides in the
 * masthead so the punchline lands on the first screen rather than after the
 * evidence, and the work starts immediately after.
 *
 * Each component reads title → artifact → description, so the work leads
 * and the words follow it. Depth lives beside the artifact it belongs to:
 * every component carries its own "what I did" line, which answers the role
 * question more credibly than one general claim up top could, and puts it
 * next to the proof.
 *
 * Every public image opens into one shared overlay gallery (the Lightbox),
 * paging through all of the folder's images in reading order. Closing it
 * returns focus — and the reader's place — to the image they left from.
 * Gated media never enters the gallery.
 */
export default function SheetContent({ sheet, num, title, tagline, titleId }) {
  const { outcome, meta = [], frame = {}, components = [], close = {}, bts, credit } = sheet

  /* The folder's images, flat and in reading order, for the overlay. */
  const images = useMemo(() => {
    const list = []
    const push = (key, alt) => {
      const src = sheetImg(key, 2000)
      if (src && !list.some((i) => i.key === key)) list.push({ key, alt: alt || '', src })
    }
    if (sheet.hero) push(sheet.hero.key, sheet.hero.alt)
    components.forEach((c) => {
      if (c.gated) return
      slidesFor(c.media).forEach((sl) => { if (sl.type === 'image') push(sl.key, sl.alt) })
    })
    bts?.images?.forEach((i) => push(i.key, i.alt))
    return list
  }, [sheet.hero, components, bts])

  const [lightboxAt, setLightboxAt] = useState(-1)
  const openerRef = useRef(null)

  const openImage = (key, el) => {
    openerRef.current = el
    setLightboxAt(images.findIndex((i) => i.key === key))
  }
  const closeImage = () => {
    setLightboxAt(-1)
    /* The reader's place is sacred: the sheet never scrolled, and focus
       goes back to the exact image they left from. */
    openerRef.current?.focus({ preventScroll: true })
  }

  const rootRef = useRef(null)
  useSheetReveal(rootRef)

  return (
    <div ref={rootRef}>
      {/* THE COVER — the name and its facts in the rail, the place itself
          beside them, top edge level with the folio and running the full
          height of the text. One rectangle, one name, one picture. */}
      <header className={`${styles.cover} ${sheet.hero ? '' : styles.coverSolo}`} data-reveal="0">
        <div className={styles.coverText}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}

          {meta.length > 0 && (
            <dl className={styles.meta}>
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className={v?.todo ? styles.todo : undefined}>
                    {v?.todo ? <b>Lorin to write</b> : null}
                    {v?.todo || v}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {sheet.hero && (
          <div className={styles.coverMedia}>
            <SheetHero item={sheet.hero} onImage={openImage} />
          </div>
        )}
      </header>

      {/* THE FRAME — one row of three: what it is, what the research
          found, what changed. Equal columns, matched lengths, identical
          treatment, so the row reads as one sentence in three parts. */}
      {(frame.why || frame.research || outcome) && (
        <div className={styles.frame} data-reveal="1">
          {frame.why && (
            <section className={styles.frameBlock}>
              <h3>The project</h3>
              <p>{frame.short?.why || frame.why}</p>
            </section>
          )}
          {frame.research && (
            <section className={styles.frameBlock}>
              <h3>What the research told us</h3>
              <p>{frame.short?.research || frame.research}</p>
            </section>
          )}
          {outcome && (
            <section className={styles.frameBlock}>
              <h3>The outcome</h3>
              <p>{outcome}</p>
            </section>
          )}
        </div>
      )}

      {components.map((c, i) => {
        const slides = slidesFor(c.media)
        const poem = [c.media?.lead, ...(c.media?.also || [])].find((m) => m?.type === 'audio')
        return (
          <section key={c.key} className={styles.component} data-reveal="0">
            {/* The rail: name, what it is, what I did. Narrow and sticky,
                so the words stay beside the work while the work leads. */}
            <div className={styles.rail}>
              <div className={styles.railInner}>
                <span className={styles.componentNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.componentName}>{c.name}</h3>
                {c.gated && <span className={styles.gated}>Confidential</span>}
                <p className={styles.componentBody}>{c.body}</p>
                {c.mine && (
                  <p className={styles.mine}>
                    <span className={styles.mineLabel}>What I did</span>
                    <span className={styles.mineBody}>{c.mine}</span>
                  </p>
                )}
              </div>
            </div>

            <div className={styles.work}>
              <SheetStage slides={slides} gated={c.gated}
                onImage={c.gated ? null : openImage} label={`${c.name}, gallery`} />
              {c.media?.gallery && <SheetCardGallery gallery={c.media.gallery} />}
            </div>

            {poem && (
              <div className={styles.band}>
                <SheetPoem item={poem} />
              </div>
            )}
          </section>
        )
      })}

      <section className={styles.close} data-reveal="0">
        {(close.outcomes || frame.role) && (
          <div className={styles.closePair}>
            {close.outcomes && (
              <div className={styles.closeBlock}>
                <h3>What changed</h3>
                <p>{close.outcomes}</p>
                {close.qualitative && <p>{close.qualitative}</p>}
              </div>
            )}
            {frame.role && (
              <div className={styles.closeBlock}>
                <h3>My role, in full</h3>
                <p>{frame.role}</p>
              </div>
            )}
          </div>
        )}
        {close.takeaway && (
          <div className={styles.lesson}>
            <h3>The biggest lesson</h3>
            <p>{close.takeaway}</p>
          </div>
        )}
      </section>

      {bts && <SheetFilmstrip bts={bts} onImage={openImage} />}

      {(frame.partners || credit) && (
        <div className={styles.colophon}>
          {frame.partners && <p className={styles.partners}>{frame.partners}</p>}
          {credit && <p className={styles.credit}>{credit}</p>}
        </div>
      )}

      {lightboxAt >= 0 && images[lightboxAt] && (
        <Lightbox
          src={images[lightboxAt].src}
          alt={images[lightboxAt].alt}
          counter={`${lightboxAt + 1} of ${images.length}`}
          onClose={closeImage}
          onPrev={() => setLightboxAt((lightboxAt - 1 + images.length) % images.length)}
          onNext={() => setLightboxAt((lightboxAt + 1) % images.length)}
        />
      )}
    </div>
  )
}
