'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Lightbox from '@/components/Lightbox/Lightbox'
import { SheetStage, SheetLibraryKit, slidesFor, sheetImg } from './SheetMedia'
import SheetCover from './SheetCover'
import SheetReflection from './SheetReflection'
import SheetMotionLibrary from './SheetMotionLibrary'
import SheetMaps from './SheetMaps'
import SheetAnnotated from './SheetAnnotated'
import SheetScreens from './SheetScreens'
import SheetCompare from './SheetCompare'
import dynamic from 'next/dynamic'

/* Built exhibits for a sheet's system section (FS311), loaded on demand. */
const EXHIBITS = {
  'bs-voices': dynamic(() => import('./exhibits/BirthStoryProcess').then((m) => m.Voices)),
  'bs-4to0': dynamic(() => import('./exhibits/BirthStoryProcess').then((m) => m.FourToZero)),
  'bs-revisions': dynamic(() => import('./exhibits/BirthStoryProcess').then((m) => m.Revisions)),
  'bs-identity': dynamic(() => import('./exhibits/BirthStoryProcess').then((m) => m.Identity)),
}

/* A section's work column, by what it carries (FS314): an annotated
   prototype, a row of key screens, a built exhibit, or the gallery. */
function Work({ media, label, gated, onImage }) {
  if (media?.annotated) return <SheetAnnotated {...media.annotated} />
  /* FS319: one image, whole and uncropped, with its caption */
  if (media?.photo) {
    const src = sheetImg(media.photo.key, 2000)
    return src ? (
      <figure className={styles.photo}>
        <button type="button" className={styles.photoButton} onClick={(e) => onImage?.(media.photo.key, e.currentTarget)}
          aria-label={`View full screen: ${media.photo.alt}`}>
          <img src={src} alt="" />
        </button>
        <figcaption className={styles.photoCap}>{media.photo.alt}</figcaption>
      </figure>
    ) : null
  }
  if (media?.compare) return <SheetCompare slides={media.compare} label={label} />
  if (media?.screens) return <SheetScreens items={media.screens} />
  const Ex = EXHIBITS[media?.exhibit]
  if (Ex) return <Ex data={media.data} />
  if (media?.motion) return <SheetMotionLibrary items={media.motion} />
  return <SheetStage slides={slidesFor(media)} gated={gated} onImage={gated ? null : onImage} label={label} />
}

/* Copy may set a phrase in italics with *asterisks* (FS308), so a quote
   can read as a quote without the content files carrying markup. */
export function rich(text) {
  if (typeof text !== 'string' || !text.includes('*')) return text
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part)
}
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
    slidesFor(sheet.system?.exhibit ? {} : sheet.system?.media).forEach((sl) => { if (sl.type === 'image') push(sl.key, sl.alt) })
    components.forEach((c) => {
      if (c.gated) return
      slidesFor(c.media).forEach((sl) => { if (sl.type === 'image') push(sl.key, sl.alt) })
      if (c.media?.photo) push(c.media.photo.key, c.media.photo.alt)
    })
    process.forEach((ph) => ph.images.forEach((i) => push(i.key, i.alt)))
    return list
  }, [components, process, sheet.system])

  const Exhibit = EXHIBITS[sheet.system?.exhibit]

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
              <p>{rich(frame.short?.why || frame.why)}</p>
            </section>
          )}
          {frame.research && (
            <section className={styles.frameBlock}>
              <h3>What the research told us</h3>
              <p>{rich(frame.short?.research || frame.research)}</p>
            </section>
          )}
          {outcome && (
            <section className={styles.frameBlock}>
              <h3>The outcome</h3>
              <p>{rich(outcome)}</p>
            </section>
          )}
        </div>
      )}

      {/* MAPPING THE SYSTEM (FS249–FS280): found → value → built, the same
          four circles carried through three maps, before the components. */}
      {sheet.system && (
        <section id="sheet-system" className={`${styles.component} ${sheet.system.wide ? styles.componentWide : ''}`} data-reveal="0" aria-labelledby="sheet-system-name">
          <div className={styles.rail}>
            <div className={styles.railInner}>
              <span className={styles.componentNum}>{sheet.system.kicker}</span>
              <h3 id="sheet-system-name" className={styles.componentName}>{sheet.system.label}</h3>
              <p className={styles.componentBody}>{rich(sheet.system.intro)}</p>
            </div>
          </div>
          <div className={styles.work}>
            {/* FS296: the three-map exhibit is Groundswell's; any other sheet
                shows its own system media here in the standard gallery. */}
            {sheet.system.exhibit === 'maps' ? <SheetMaps /> : sheet.system.screens ? <SheetScreens items={sheet.system.screens} /> : Exhibit ? <Exhibit data={sheet.system.data} /> : (
              <SheetStage slides={slidesFor(sheet.system.media)} onImage={openImage} label={`${sheet.system.label}, gallery`} />
            )}
          </div>
        </section>
      )}

      {components.map((c, i) => {
        const slides = slidesFor(c.media)
        const phone = c.media?.phone
        return (
          <Fragment key={c.key}>
          {/* FS311: a chapter heading opens a group of sections */}
          {c.chapter && (
            <header className={styles.chapter} data-reveal="0">
              <span className={styles.chapterKicker}>{c.chapter.kicker}</span>
              <h3 className={styles.chapterTitle}>{c.chapter.title}</h3>
              {c.chapter.line && <p className={styles.chapterLine}>{rich(c.chapter.line)}</p>}
              {/* FS317: the chapter's map: every step, when, and its outcome,
                  each a link down to its section */}
              {c.chapter.steps?.length > 0 && (
                <ol className={styles.chapterSteps}>
                  {c.chapter.steps.map((st) => (
                    <li key={st.key}>
                      <a href={`#sheet-${st.key}`} className={styles.chapterStep}>
                        <span className={styles.stepWhen}>{st.when}</span>
                        <span className={styles.stepName}>{st.name}</span>
                        <span className={styles.stepOut}>{rich(st.outcome)}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </header>
          )}
          <section id={`sheet-${c.key}`} className={`${styles.component} ${c.layout === 'half' ? styles.componentHalf : ''}`} data-reveal="0">
            {/* The rail: name, what it is, what I did. Narrow and sticky,
                so the words stay beside the work while the work leads. */}
            <div className={styles.rail}>
              <div className={styles.railInner}>
                {/* FS317: a process step says which step and when, instead of
                    a number running on from the features */}
                <span className={styles.componentNum}>{c.step || String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.componentName}>{c.name}</h3>
                {c.gated && <span className={styles.gated}>Confidential</span>}
                {/* FS317: the finding or decision, said first and large */}
                {c.takeaway && <p className={styles.takeaway}>{rich(c.takeaway)}</p>}
                <p className={styles.componentBody}>{rich(c.body)}</p>
                {/* FS319: a voice and a short list, set in the copy column */}
                {c.pull && (
                  <blockquote className={styles.pull}>
                    <p>{c.pull.quote}</p>
                    <cite>{c.pull.cite}</cite>
                  </blockquote>
                )}
                {c.list && (
                  <div className={styles.list}>
                    <p className={styles.listLabel}>{c.list.label}</p>
                    <ul>{c.list.items.map((it) => <li key={it}>{rich(it)}</li>)}</ul>
                  </div>
                )}
                {/* FS301: the case study's paired annotations, one short
                    label and a line each */}
                {c.notes?.length > 0 && (
                  <dl className={styles.notes}>
                    {c.notes.map((n) => (
                      <div key={n.label}><dt>{n.label}</dt><dd>{rich(n.text)}</dd></div>
                    ))}
                  </dl>
                )}
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
              <Work media={c.media} label={`${c.name}, gallery`} gated={c.gated} onImage={openImage} />
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
                  emotions={c.media?.gallery?.deck || c.media?.gallery?.emotions || []}
                  deckLabel={c.media?.gallery?.label} />
              </div>
            )}
          </section>
          </Fragment>
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
      {process.some((ph) => slidesFor({ stills: ph.images }).length) && (
        <section className={styles.process} data-reveal="0">
          <h3 className={styles.processTitle}>{processTitle || 'Behind the scenes'}</h3>
          <div className={styles.processRow}>
            {/* a phase whose media has not resolved is left out (FS300) */}
            {process.filter((ph) => slidesFor({ stills: ph.images }).length).map((ph) => (
              <div key={ph.title} className={styles.phase}>
                <span className={styles.phaseLabel}>{ph.title}</span>
                {/* `fit: 'contain'` on a phase keeps slides whole (FS299) */}
                <SheetStage slides={slidesFor({ stills: ph.images })} fit={ph.fit === 'contain' ? undefined : 'cover'}
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
        const photo = credit && ['Photography', credit.replace(/^Photography by\s*/i, '').replace(/\.$/, '')]
        /* Groundswell's three named columns; any other sheet (FS299) sets
           its credits as rows of [label, text] and gets one column per
           row, the photography credit joining the first. */
        const columns = (find('Clinical Team') || find('Funding') ? [
          [find('Design Team'), photo],
          [find('Clinical Team'), frame.partners && ['Partners', frame.partners]],
          [find('Funding')],
        ] : credits.map((row, i) => (i === 0 ? [row, photo] : [row])))
          .map((col) => col.filter(Boolean)).filter((col) => col.length)
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
