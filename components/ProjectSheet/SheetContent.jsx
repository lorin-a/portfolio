'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Lightbox from '@/components/Lightbox/Lightbox'
import { SheetStage, SheetLibraryKit, slidesFor, sheetImg } from './SheetMedia'
import SheetCover from './SheetCover'
import SheetReflection from './SheetReflection'
import SheetMotionLibrary from './SheetMotionLibrary'
import SheetMaps from './SheetMaps'
import styles from './SheetContent.module.css'
import paper from './Paper.module.css'



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
  const { outcome, meta = [], frame = {}, components = [], close = {}, process = [], processTitle, credit, credits = [], reflection = [], acknowledgements } = sheet

  /* The folder's images, flat and in reading order, for the overlay. */
  const images = useMemo(() => {
    const list = []
    const push = (key, alt) => {
      const src = sheetImg(key, 2000)
      if (src && !list.some((i) => i.key === key)) list.push({ key, alt: alt || '', src })
    }
    components.forEach((c) => {
      if (c.gated) return
      slidesFor(c.media).forEach((sl) => { if (sl.type === 'image') push(sl.key, sl.alt) })
    })
    process.forEach((ph) => ph.images.forEach((i) => push(i.key, i.alt)))
    return list
  }, [components, process])

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
      {/* THE COVER — a pile of content inside the folder: the name and the
          facts on loose-leaf, the photographs as a pile of prints. */}
      <SheetCover sheet={sheet} num={num} title={title} tagline={tagline} titleId={titleId} />

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

      {/* MAPPING THE SYSTEM (FS249–FS280): found → value → built, the same
          four circles carried through three maps, before the components. */}
      {sheet.system && (
        <section id="sheet-system" className={styles.component} data-reveal="0" aria-labelledby="sheet-system-name">
          <div className={styles.rail}>
            <div className={styles.railInner}>
              <span className={styles.componentNum}>{sheet.system.kicker}</span>
              <h3 id="sheet-system-name" className={styles.componentName}>{sheet.system.label}</h3>
              <p className={styles.componentBody}>{sheet.system.intro}</p>
            </div>
          </div>
          <div className={styles.work}><SheetMaps /></div>
        </section>
      )}

      {components.map((c, i) => {
        const slides = slidesFor(c.media)
        const phone = c.media?.phone
        return (
          <section key={c.key} id={`sheet-${c.key}`} className={styles.component} data-reveal="0">
            {/* The rail: name, what it is, what I did. Narrow and sticky,
                so the words stay beside the work while the work leads. */}
            <div className={styles.rail}>
              <div className={styles.railInner}>
                <span className={styles.componentNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.componentName}>{c.name}</h3>
                {c.gated && <span className={styles.gated}>Confidential</span>}
                <p className={styles.componentBody}>{c.body}</p>
                {c.mine && (
                  <div className={`${paper.paper} ${styles.mine}`}>
                    <span className={paper.holes} aria-hidden="true"><i /><i /><i /></span>
                    <p className={styles.mineText}>
                      <span className={paper.label}>My Contribution</span>
                      <span className={`${styles.mineBody} ${paper.ink}`}>{c.mine}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.work}>
              {c.media?.motion ? (
                /* FS214: the dashboard as an interaction library */
                <SheetMotionLibrary items={c.media.motion} />
              ) : (
                <SheetStage slides={slides} gated={c.gated}
                  onImage={c.gated ? null : openImage} label={`${c.name}, gallery`} />
              )}
            </div>

            {/* The deck: the phone (the digital library, with the poem
                playing inside it) and the reflection cards, one row of
                objects across the whole component. */}
            {/* FS149: the library as a matched pair of framed objects under
                the gallery: the phone with its two recordings, and the
                reflection cards one at a time. */}
            {(c.media?.gallery || phone) && (
              <div className={styles.band}>
                <SheetLibraryKit phone={phone} listen={c.media?.listen}
                  emotions={c.media?.gallery?.deck || c.media?.gallery?.emotions || []} />
              </div>
            )}
          </section>
        )
      })}

      {/* THE REFLECTION (FS164–FS186): replaces the FS129 close cards.
          Falls back to the old close when a sheet has no reflection. */}
      {reflection.length > 0 ? (
        <SheetReflection cards={reflection} />
      ) : (
        /* THE CLOSE (FS129): three glass cards on the 4 · 4 · 4 grid, the
           same brand glass as the cover. */
        <section className={styles.close} data-reveal="0">
          {close.outcomes && (
            <div className={styles.closeCard}>
              <h3>What changed</h3>
              <p>{close.outcomes}</p>
              {close.qualitative && <p>{close.qualitative}</p>}
            </div>
          )}
          {frame.role && (
            <div className={styles.closeCard}>
              <h3>My role, in full</h3>
              <p>{frame.role}</p>
              {frame.roleMore && <p>{frame.roleMore}</p>}
            </div>
          )}
          {close.takeaway && (
            <div className={`${styles.closeCard} ${styles.lessonCard}`}>
              <h3>The biggest lesson</h3>
              <p>{close.takeaway}</p>
            </div>
          )}
        </section>
      )}

      {/* BEHIND THE SCENES (FS131): two framed galleries, research and
          production, side by side on 6 | 6. */}
      {process.length > 0 && (
        <section className={styles.process} data-reveal="0">
          <h3 className={styles.processTitle}>{processTitle || 'Behind the scenes'}</h3>
          <div className={styles.processRow}>
            {process.map((ph) => (
              <div key={ph.title} className={styles.phase}>
                <span className={styles.phaseLabel}>{ph.title}</span>
                <SheetStage slides={slidesFor({ stills: ph.images })} fit="cover"
                  onImage={openImage} label={`${ph.title} gallery`} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* THE TEAM (FS155): exactly three columns. The photography credit
          joins the design team's column and the partners line the clinical
          team's; funding stands alone. */}
      {/* ACKNOWLEDGEMENTS (FS187): everyone named, the artist included,
          revised from the old Groundswell page’s “In gratitude” section. */}
      {acknowledgements ? (
        <section className={styles.thanks} data-reveal="0" aria-labelledby="sheet-thanks">
          {/* FS195: 3 × 3 — people in the first row; Acknowledgements,
              Donors & Partners, and Funding in the second */}
          <h3 id="sheet-thanks" className={styles.srOnly}>Acknowledgements</h3>
          {acknowledgements.columns.map((col) => (
            <div key={col.title} className={styles.thanksCol}>
              <h4 className={styles.thanksColTitle}>{col.title}</h4>
              <ul className={styles.thanksList}>
                {col.people.map(([name, role]) => (
                  <li key={name}><span className={styles.thanksName}>{name}</span><span className={styles.thanksRole}>{role}</span></li>
                ))}
              </ul>
              {col.note && <p className={styles.thanksNote}>{col.note}</p>}
            </div>
          ))}
          {acknowledgements.footer?.map((row) => (
            <div key={row.title} className={styles.thanksRow}>
              <h4 className={styles.thanksColTitle}>{row.title}</h4>
              <p className={styles.thanksText}>{row.text}</p>
            </div>
          ))}
          {acknowledgements.closing && <p className={styles.thanksClosing}>{acknowledgements.closing}</p>}
        </section>
      ) : credits.length > 0 && (() => {
        const find = (label) => credits.find(([k]) => k === label)
        const columns = [
          [find('Design Team'), credit && ['Photography', credit.replace(/^Photography by\s*/i, '').replace(/\.$/, '')]],
          [find('Clinical Team'), frame.partners && ['Partners', frame.partners]],
          [find('Funding')],
        ].map((col) => col.filter(Boolean)).filter((col) => col.length)
        return (
          <div className={styles.colophon}>
            {columns.map((col) => (
              <dl key={col[0][0]} className={styles.creditCol}>
                {col.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            ))}
          </div>
        )
      })()}

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
