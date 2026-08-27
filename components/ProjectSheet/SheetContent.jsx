'use client'

import { SheetLead, SheetStills, SheetAudio, SheetCardGallery } from './SheetMedia'
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
 * Depth lives beside the artifact it belongs to. Each component carries its
 * own short explanation and a "my part" line, which answers the role
 * question more credibly than one general claim up top could, and puts it
 * next to the proof.
 *
 * Media form follows what each component IS: video where motion is the
 * content, photography where the object is, audio where the medium is
 * sound, a gallery where there is a set.
 */
export default function SheetContent({ sheet, num, title, tagline, titleId }) {
  const { outcome, meta = [], frame = {}, components = [], close = {} } = sheet

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

          <p className={styles.componentBody}>{c.body}</p>
          {c.mine && <p className={styles.mine}>{c.mine}</p>}

          {c.media?.lead && <SheetLead item={c.media.lead} gated={c.gated} />}
          {c.media?.also?.map((item) =>
            item.type === 'audio'
              ? <SheetAudio key={item.key} item={item} />
              : <SheetLead key={item.key} item={item} gated={c.gated} />
          )}
          {c.media?.stills && <SheetStills keys={c.media.stills} gated={c.gated} />}
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
      </section>
    </>
  )
}
