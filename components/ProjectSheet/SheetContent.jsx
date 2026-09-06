'use client'

import { useMemo, useRef, useState } from 'react'
import Lightbox from '@/components/Lightbox/Lightbox'
import { SheetLead, SheetStills, SheetAudio, SheetCardGallery, SheetBts, sheetImg } from './SheetMedia'
import styles from './SheetContent.module.css'

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
      const src = sheetImg(key, 1800)
      if (src) list.push({ key, alt: alt || '', src })
    }
    components.forEach((c) => {
      if (c.gated) return
      if (c.media?.lead?.type === 'image') push(c.media.lead.key, c.media.lead.alt)
      c.media?.also?.forEach((i) => { if (i.type === 'image') push(i.key, i.alt) })
      c.media?.stills?.forEach((k) => push(k))
    })
    bts?.images?.forEach((i) => push(i.key, i.alt))
    return list
  }, [components, bts])

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

  return (
    <>
      <header className={styles.masthead}>
        <div className={styles.identity}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>
        {/* The punchline, early. */}
        {outcome && <p className={styles.outcome}>{outcome}</p>}
      </header>

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

      <div className={styles.frame}>
        {frame.why && <p className={styles.why}>{frame.why}</p>}
        <div className={styles.frameCol}>
          {frame.research && (
            <section className={styles.frameBlock}>
              <h3>What the research told us</h3>
              <p>{frame.research}</p>
            </section>
          )}
        </div>
      </div>

      {components.map((c, i) => (
        <section key={c.key} className={styles.component}>
          <div className={styles.componentHead}>
            <span className={styles.componentNum}>{String(i + 1).padStart(2, '0')}</span>
            <h3>{c.name}</h3>
            {c.gated && <span className={styles.gated}>Confidential</span>}
          </div>

          {/* The artifact leads; the words follow it. */}
          {c.media?.lead && (
            <SheetLead item={c.media.lead} gated={c.gated} onImage={openImage} />
          )}

          <p className={styles.componentBody}>{c.body}</p>
          {c.mine && (
            <p className={styles.mine}>
              <span className={styles.mineLabel}>What I did</span>
              <span className={styles.mineBody}>{c.mine}</span>
            </p>
          )}

          {c.media?.also?.map((item) =>
            item.type === 'audio'
              ? <SheetAudio key={item.key} item={item} />
              : <SheetLead key={item.key} item={item} gated={c.gated} onImage={openImage} />
          )}
          {c.media?.stills && (
            <SheetStills keys={c.media.stills} gated={c.gated} onImage={openImage} />
          )}
          {c.media?.gallery && <SheetCardGallery gallery={c.media.gallery} />}
        </section>
      ))}

      <section className={styles.close}>
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
        {close.takeaway && (
          <div className={styles.closeBlock}>
            <h3>The biggest lesson</h3>
            <p>{close.takeaway}</p>
          </div>
        )}
        {frame.partners && <p className={styles.partners}>{frame.partners}</p>}
        {credit && <p className={styles.credit}>{credit}</p>}
      </section>

      {bts && <SheetBts bts={bts} onImage={openImage} />}

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
    </>
  )
}
