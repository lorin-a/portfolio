'use client'

import { useEffect, useRef, useState } from 'react'
import DeviceMockup from '@/components/CaseStudy/DeviceMockup'
import SystemEvolution from './SystemEvolution'
import EvolutionViewer from './EvolutionViewer'
import styles from './BirthStoryBody.module.css'

/* ============================================================================
   Birth Story — case-study BODY. Shared bones (the beat recipe), bespoke flesh
   (asset menu). Composition has RHYTHM: a ruled meta masthead leads, claims sit
   centred, device beats go split (alternating sides), tone alternates cream ↔
   shade for chapters — so it reads distinct from the airy hero, not one endless
   centred column. Copy drafted close to Lorin's words; headings hers to bless.
   ============================================================================ */

function useSeen(threshold = 0.25) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } },
      { threshold }
    )
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, seen]
}

/* the recipe — layout: 'center' | 'split'; flip puts the asset first; tone shades */
function Beat({ kicker, statement, children, depth, attr, layout = 'center', flip = false, tone }) {
  const [ref, seen] = useSeen()
  const cls = [styles.beat, tone === 'shade' && styles.shade, seen && styles.in].filter(Boolean).join(' ')

  if (layout === 'split') {
    return (
      <section ref={ref} className={cls}>
        <div className={`${styles.split} ${flip ? styles.flip : ''}`}>
          <div className={styles.textCol}>
            {kicker && <p className={styles.kicker}>{kicker}</p>}
            {statement && <h2 className={styles.statement}>{statement}</h2>}
            {depth && <p className={styles.depth}>{depth}{attr && <span className={styles.attr}>{attr}</span>}</p>}
          </div>
          <div className={styles.assetCol}>{children}</div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className={cls}>
      <div className={styles.col}>
        {kicker && <p className={styles.kicker}>{kicker}</p>}
        {statement && <h2 className={styles.statement}>{statement}</h2>}
        {children && <div className={styles.assetWrap}>{children}</div>}
        {depth && <p className={styles.depth}>{depth}{attr && <span className={styles.attr}>{attr}</span>}</p>}
      </div>
    </section>
  )
}

function Meta() {
  const rows = [
    ['Role', 'UX/UI Design, UX Research, Copywriting, Brand Identity'],
    ['Timeline', '6-week graduate studio sprint'],
    ['Team', 'Lorin Anderberg, Michael Juan'],
    ['Client', 'Sarah Burns (MSW, LSW) · Tamar Krishnamurti (PhD)'],
    ['Context', 'CMU MA in Design · Studio II: Intro to IXD'],
    ['Outcome', 'Preliminary R&D for a Birth Story app, to be built'],
  ]
  const [ref, seen] = useSeen(0.2)
  return (
    <section ref={ref} className={`${styles.metaSection} ${seen ? styles.in : ''}`}>
      <dl className={styles.meta}>
        {rows.map(([k, v]) => (
          <div key={k} className={styles.metaItem}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </section>
  )
}

function ActDivider({ act, name }) {
  const [ref, seen] = useSeen(0.4)
  return (
    <section ref={ref} className={`${styles.act} ${styles.shade} ${seen ? styles.in : ''}`}>
      <p className={styles.actNum}>Act {act}</p>
      <p className={styles.actName}>{name}</p>
    </section>
  )
}

/* ── assets ──────────────────────────────────────────────── */
function StatRow({ items }) {
  return (
    <div className={styles.statRow}>
      {items.map(([n, c]) => (
        <div key={c} className={styles.stat}><span className={styles.statNum}>{n}</span><span className={styles.statCap}>{c}</span></div>
      ))}
    </div>
  )
}
function StatBig({ n, cap }) {
  return <div className={styles.statBig}><span className={styles.statBigNum}>{n}</span><span className={styles.statBigCap}>{cap}</span></div>
}
function Timeline({ phases }) {
  return (
    <ol className={styles.timeline}>
      {phases.map((p, i) => (
        <li key={p} className={styles.phase}><span className={styles.phaseDot}>{i + 1}</span><span className={styles.phaseName}>{p}</span><span className={styles.phaseDur}>1 wk</span></li>
      ))}
    </ol>
  )
}
function BeforeAfter({ before, after, note }) {
  return (
    <div className={styles.ba}>
      <div className={styles.baPane}><span className={styles.baLabel}>Before</span><p className={styles.baText}>{before}</p></div>
      <span className={styles.baArrow} aria-hidden="true">→</span>
      <div className={`${styles.baPane} ${styles.baAfter}`}><span className={styles.baLabel}>After</span><p className={styles.baText}>{after}</p></div>
      {note && <p className={styles.baNote}>{note}</p>}
    </div>
  )
}
function PullQuote({ children, attr }) {
  return <blockquote className={styles.quote}>{children}<span className={styles.quoteAttr}>{attr}</span></blockquote>
}

/* ── the body ── */
export default function BirthStoryBody() {
  return (
    <div className={styles.body}>
      <Meta />

      {/* OVERVIEW — centred thesis anchor */}
      <Beat
        kicker="Overview"
        statement={<>A micro-app to <em>document and reflect</em> on giving birth.</>}
        depth="A sister app to Myana (Mothers You Are Not Alone), made in a graduate studio with CMU, the founders of Dezudio, and the University of Pittsburgh Center for Research on Healthcare. The concept was refined through interviews with real parents and rounds of group critique and client feedback."
      >
        <DeviceMockup width="210px" media="image" src="/images/birthstory/bs-home.png" alt="The Birth Story home screen: New Entry, with prompts to add memorable events, notes about the experience, and medical events, on a chronological timeline." caption="The record: notes and journal, in one place." />
        <StatRow items={[['7', 'parents interviewed'], ['6 wks', 'studio sprint'], ['4', 'core flows']]} />
      </Beat>

      <ActDivider act="I" name="Sense" />

      <Beat
        kicker="01 · The tension"
        statement={<>Birth gets <em>overshadowed</em> by the newborn’s needs.</>}
        depth="Birthing parents lack systems of support before, during, and after giving birth, an experience that is so often overshadowed by the needs of a newborn."
      />

      {/* split — big stat to the side */}
      <Beat
        layout="split"
        tone="shade"
        kicker="02 · What we heard"
        statement={<>Postpartum brain fog needs <em>less</em>, not more.</>}
        depth="We interviewed seven parents. Many described their births as traumatic, and said they lacked the tools to process them. Our first wireframes tried to offer every tool we could imagine; feedback taught us that simple is better for postpartum brain fog."
      >
        <StatBig n="7" cap="parents interviewed about their birth experience" />
      </Beat>

      <Beat
        kicker="03 · How we worked"
        statement={<>Six weeks, brief to <em>client presentation</em>.</>}
        depth="Six one-week phases, from client research and design research through ideation, parent interviews, and iteration, to the final client presentation."
      >
        <Timeline phases={['Research I', 'Research II', 'Ideation', 'Interviews', 'Iteration', 'Presentation']} />
      </Beat>

      <ActDivider act="II" name="Weave" />

      {/* The system (zoomed out) → the iteration (flows + one interaction) */}
      <SystemEvolution />
      <EvolutionViewer />

      <Beat
        tone="shade"
        kicker="04 · The concept"
        statement={<>One home for both <em>documenting and reflecting</em>.</>}
        depth="We first split the app into two functions, Document and Reflect. Parent feedback led us to integrate both on the home page, lowering the barrier to entry so users could engage with whatever they needed in the moment."
      >
        <BeforeAfter before="Two screens: Document, then Reflect." after="One home, both at once." note="The home-page redesign, after parent feedback." />
      </Beat>

      {/* split — device right */}
      <Beat
        layout="split"
        kicker="05 · Care Pod"
        statement={<>Birth is held by <em>a circle</em>, so the app invited one in.</>}
        depth="Research revealed that parents wanted to bring loved ones in. That insight became the Care Pod: a curated inner circle that shares supportive messages and receives birth updates."
      >
        <DeviceMockup width="216px" media="image" src="/images/birthstory/bs-carepod.png" alt="The Care Pod screen: loved ones' photos orbiting a central heart marked 'You', in concentric rings, with a Send Update button." caption="The Care Pod: loved ones orbiting a central “You.”" />
      </Beat>

      <Beat
        tone="shade"
        kicker="06 · Birth Story Book"
        statement={<>A keepsake, because memories <em>shouldn’t depend on an app</em>.</>}
        depth="Because people don’t fully trust that digital memories will last, the Birth Story Book turns entries into a physical keepsake: a free PDF, or an affordable printed booklet."
      >
        <PullQuote attr="— a parent we interviewed">“It would be tragic to lose those moments if the app disappeared someday.”</PullQuote>
      </Beat>

      <Beat
        kicker="07 · The copy"
        statement={<>I rewrote the voice from <em>trauma-first to community-first</em>.</>}
        depth="Our first copy was highly trauma-informed, but feedback showed the language assumed a negative experience. Those experiences are in the data, so we shifted to a holistic, user-driven voice centered on connecting with community."
      >
        <BeforeAfter before="Language that assumed a hard birth." after="Language centered on connection." note="A copywriting decision, made from feedback." />
      </Beat>

      {/* split flipped — device left */}
      <Beat
        layout="split"
        flip
        tone="shade"
        kicker="08 · Brand"
        statement={<>Calm enough for the wee hours and the <em>hospital light</em>.</>}
        depth="We wanted the interface to feel calming, organic, and emotionally supportive: a safe space for difficult emotions and uplifting moments alike. We built a new gradient to echo Myana, the parent app."
      >
        <DeviceMockup width="216px" media="image" src="/images/birthstory/bs-brand.png" alt="The Birth Story brand: the wordmark over a soft blush-to-sage gradient, echoing the parent app Myana." caption="The brand gradient, echoing Myana." />
      </Beat>

      <ActDivider act="III" name="Shape" />

      <Beat
        kicker="09 · The outcome"
        statement={<>A concept the client <em>wished was real</em>.</>}
        depth="The work became real, preliminary research and ideation for a Birth Story app that the professors and client intend to build."
      >
        <StatBig n="“I wish this could be real right now!”" cap="— Sarah Burns, MSW, LSW · client" />
      </Beat>

      {/* CLOSE */}
      <section className={styles.close}>
        <div className={styles.col}>
          <p className={styles.kicker}>What I’d do differently</p>
          <p className={styles.reflect}>
            If I could do this project again, I’d begin by simplifying. Identifying the core need early
            would have helped me stay focused, rather than trying to do too much at once. I also learned
            how important it is not to add anything to a wireframe that distracts from the main purpose
            or opens unnecessary avenues for feedback.
          </p>
          <p className={styles.tools}>Figma · SVG Repo icons · Unsplash</p>
        </div>
      </section>
    </div>
  )
}
