'use client'

import { useEffect, useRef } from 'react'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import { OVERVIEW, BRIEF, RESEARCH, ARCHITECTURE, ITERATION, FEATURES, VOICE, BRAND, OUTCOME, CLOSE } from './content'
import VSwitch from './VSwitch'
import s from './VWall.module.css'

/* ============================================================================
   DIRECTION F — THE STUDIO WALL
   Same skeleton, displayed as the materials of the process: photos as pinned
   prints, screens as taped-up printouts, tester quotes on index cards, her
   "my thinking" beats as sticky notes, red pen for what got cut or corrected.
   The real crit-wall photo is the centerpiece of Iteration — the artifact
   this whole language quotes. Restraint keeps it out of kitsch: rotations
   stay under 2 degrees, shadows soft, whitespace generous, type stays typed
   (tape labels, not fake handwriting).
   Tape-label microcopy is provisional furniture for Lorin's pass.
   ============================================================================ */

function Tape({ children }) {
  return <span className={s.tape}>{children}</span>
}

function Pin() {
  return <span className={s.pin} aria-hidden="true" />
}

function Photo({ src, alt, cap, byline, tilt }) {
  return (
    <figure className={s.photo} style={{ '--tilt': `${tilt}deg` }}>
      <Pin />
      <img src={src} alt={alt} loading="lazy" draggable="false" />
      <figcaption>{cap}{byline ? <em> · {byline}</em> : null}</figcaption>
    </figure>
  )
}

function Printout({ src, alt, cap, tilt = 0, small }) {
  return (
    <figure className={`${s.printout} ${small ? s.printSmall : ''}`} style={{ '--tilt': `${tilt}deg` }}>
      <span className={s.tapeCorner} aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" draggable="false" />
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  )
}

function IndexCard({ text, who, kicker, tilt = 0 }) {
  return (
    <blockquote className={s.indexCard} style={{ '--tilt': `${tilt}deg` }}>
      <Pin />
      {kicker && <span className={s.cardKicker}>{kicker}</span>}
      <p>{text}</p>
      {who && <cite>{who}</cite>}
    </blockquote>
  )
}

function Sticky({ label, text, tone = 'lilac', tilt = 0 }) {
  return (
    <aside className={`${s.sticky} ${tone === 'sky' ? s.stickySky : ''}`} style={{ '--tilt': `${tilt}deg` }}>
      <span className={s.stickyLabel}>{label}</span>
      <p>{text}</p>
    </aside>
  )
}

export default function VWall() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = rootRef.current?.querySelectorAll('[data-reveal]')
    if (!els?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add(s.in); io.unobserve(en.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const fog = birthPhoto('fog', 1200, { grayscale: true })
  const feeding = birthPhoto('feeding', 1200)
  const room = birthPhoto('room', 1200)

  return (
    <div className={s.page} ref={rootRef}>
      {/* masthead — a taped title sheet */}
      <header className={s.head}>
        <div className={s.titleSheet}>
          <span className={s.tapeCorner} aria-hidden="true" />
          <p className={s.headKicker}>the studio wall · six weeks, pinned up</p>
          <h1 className={s.masthead}>Birth Story</h1>
          <p className={s.headLead}>{OVERVIEW.lead}</p>
        </div>
        <dl className={s.metaCard}>
          <Pin />
          {OVERVIEW.meta.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </header>

      {/* 01 — Brief */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>01 · brief</Tape><h2>{BRIEF.lead}</h2></div>
        <div className={s.cluster}>
          <div className={s.copyBlock}>
            <p>{BRIEF.prose[0]}</p>
            <div className={s.briefSheet}>
              <span className={s.tapeCorner} aria-hidden="true" />
              <p className={s.sheetHead}>Required</p>
              <ul>{BRIEF.required.map(([k, v]) => <li key={k}><b>{k}.</b> {v}</li>)}</ul>
              <p className={s.sheetHead}>Provided · five optional</p>
              <ul className={s.optList}>
                {BRIEF.provided.map((p) => {
                  const cut = p === 'Trackers' || p === 'Birth Plan'
                  return <li key={p} className={cut ? s.redCut : undefined}>{p}{cut && <i> cut, wk 5</i>}</li>
                })}
              </ul>
              <div className={s.stakeScrawl}>
                {BRIEF.stakes.map(([fig, label]) => (
                  <p key={fig}><b>{fig}</b> {label}</p>
                ))}
                <span>{BRIEF.stakesSource}</span>
              </div>
            </div>
          </div>
          <div className={s.pinCol}>
            <Photo src={fog.src} alt="A parent rests cheek to cheek with a swaddled newborn in the hours just after birth, in black and white." cap="The hours after birth." byline={fog.byline} tilt={-1.4} />
            <Sticky label="my connection" tilt={1.2} text={BRIEF.connection} />
          </div>
        </div>
      </section>

      {/* 02 — Research */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>02 · research</Tape><h2>{RESEARCH.lead}</h2></div>
        <div className={s.cluster}>
          <div className={s.copyBlock}>
            <p>{RESEARCH.prose[0]}</p>
            <div className={s.cardFan}>
              <IndexCard kicker="what they wanted" text={RESEARCH.wanted[0]} tilt={-1} />
              <IndexCard text={RESEARCH.wanted[1]} tilt={0.8} />
              <IndexCard text={RESEARCH.wanted[2]} tilt={-0.6} />
              <IndexCard kicker="in their words" text={RESEARCH.quote.text} who={RESEARCH.quote.who} tilt={1.2} />
            </div>
          </div>
          <div className={s.pinCol}>
            <Photo src={feeding.src} alt="A mother holds her newborn skin to skin in a hospital bed, her eyes closed, in black and white." cap="The first hours after birth." byline={feeding.byline} tilt={1.6} />
            <Sticky label="my thinking" tone="sky" tilt={-1} text={RESEARCH.insight} />
          </div>
        </div>
        <div className={s.valueTapes} data-reveal>
          {RESEARCH.values.map(([cat, val]) => (
            <div key={cat} className={s.valueTape}>
              <Tape>{cat}</Tape>
              <p>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — Architecture */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>03 · information architecture</Tape><h2>{ARCHITECTURE.lead}</h2></div>
        <div className={s.cluster}>
          <div className={s.copyBlock}>
            <p>{ARCHITECTURE.prose1}</p>
            <p>{ARCHITECTURE.prose2}</p>
            <p>{ARCHITECTURE.prose3}</p>
            <p className={s.redNote}><b>{ARCHITECTURE.move[0]}</b> {ARCHITECTURE.move[1]}</p>
          </div>
          <div className={s.pinCol}>
            <Sticky label="my thinking" tilt={1} text={ARCHITECTURE.insight} />
            <Printout small tilt={-1.2} src="/images/birthstory/bs-home.png" alt="The final home screen: the app opens directly into the documentation timeline." cap={ARCHITECTURE.capFinal} />
          </div>
        </div>
      </section>

      {/* Iteration — the wall's centerpiece: the real crit wall */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>iteration</Tape><h2>{ITERATION.lead}</h2></div>
        <p className={s.zoneIntro}>{ITERATION.intro}</p>
        <div className={s.roundsWall}>
          {ITERATION.rounds.map((r, ri) => (
            <div key={r.label} className={s.roundCluster} data-reveal>
              <span className={s.redRound} aria-hidden="true">V{ri + 1}</span>
              <p className={s.roundLabel}>{r.label}</p>
              <div className={s.roundPrints}>
                {r.shots.map(([id, cap], si) => (
                  <Printout
                    key={id}
                    small
                    tilt={[-1.6, 1.1, -0.7][si % 3]}
                    src={`/images/birthstory/evolution/screens/${id}.png`}
                    alt={cap}
                  />
                ))}
              </div>
              <p className={s.roundChange}>{r.change}</p>
              {r.feedback && <IndexCard kicker="the feedback · summarized" text={r.feedback} tilt={ri % 2 ? 1 : -1} />}
              {r.friction && <Sticky label="what I couldn’t test" tone="sky" tilt={0.8} text={r.friction} />}
            </div>
          ))}
        </div>
        <figure className={s.critWall} data-reveal>
          <span className={s.tapeCorner} aria-hidden="true" />
          <img
            src={cloudImg('class_notes', 2000, { chain: ['e_brightness:48', 'e_contrast:level_16;type_sigmoidal', 'ar_16:9,c_auto'] })}
            alt="A whiteboard from the final review: printed app screens taped up in two columns labeled Gradient and Color Block, covered in red and orange handwritten feedback."
            loading="lazy"
            draggable="false"
          />
          <figcaption>
            The actual wall. Every screen printed and marked up at the final review, with the
            gradient-versus-color-block decision worked out in red. This page borrows its language.
          </figcaption>
        </figure>
      </section>

      {/* 04 — The product */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>04 · the product</Tape><h2>{FEATURES.lead}</h2></div>
        <p className={s.zoneIntro}>{FEATURES.intro}</p>
        <p className={s.zoneIntro}>{FEATURES.prioProse}</p>
        {FEATURES.deepdives.map((f, i) => (
          <div key={f.name} className={s.featZone} data-reveal>
            <div className={s.copyBlock}>
              <div className={s.featHead}>
                <Tape>{f.name}</Tape>
                <p className={s.featRole}>{f.role}</p>
              </div>
              <p>{f.prose}</p>
              {f.quote && <IndexCard kicker="a parent said" text={f.quote.text} who={f.quote.who} tilt={-0.8} />}
              <p className={s.redNote}><b>{f.note[0]}.</b> {f.note[1]}</p>
            </div>
            <div className={s.featPrints}>
              {f.flow.map(([src, alt], j) => (
                <Printout key={src} src={src} alt={alt} cap={alt} tilt={[(i % 2 ? 1 : -1) * 1.3, (i % 2 ? -1 : 1) * 0.9, 1.1][j % 3]} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 05 — UX writing */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>05 · ux writing</Tape><h2>{VOICE.lead}</h2></div>
        <div className={s.cluster}>
          <div className={s.copyBlock}>
            {VOICE.prose.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <div className={s.pinCol}>
            <IndexCard kicker="a parent said" text={VOICE.quote.text} who={VOICE.quote.who} tilt={1.4} />
            <div className={s.redlineSheet}>
              <span className={s.tapeCorner} aria-hidden="true" />
              <p className={s.sheetHead}>copy, marked up</p>
              {VOICE.rewrites.map(([a, b]) => (
                <p key={a} className={s.redline}>
                  <s>{a}</s>
                  <b>{b}</b>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual design */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>visual design</Tape><h2>{BRAND.lead}</h2></div>
        <div className={s.cluster}>
          <div className={s.copyBlock}>
            <p>{BRAND.prose}</p>
            <div className={s.chipStrip}>
              {BRAND.palette.map(([hex, name]) => (
                <span key={hex} className={s.paintChip} style={{ '--chip': hex }}>
                  <i aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
            <p className={s.microNote}>{BRAND.gradientNote}</p>
          </div>
          <div className={s.pinCol}>
            <Sticky label="my thinking" tilt={-1.2} text={BRAND.insight} />
            <Printout tilt={1} src="/images/birthstory/moodboard.png" alt="The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books." cap={BRAND.moodboardCap} />
          </div>
        </div>
      </section>

      {/* 06 — Outcome */}
      <section className={s.zone} data-reveal>
        <div className={s.zoneHead}><Tape>06 · outcome</Tape><h2>{OUTCOME.lead}</h2></div>
        <div className={s.cluster}>
          <div className={s.copyBlock}>
            <p>{OUTCOME.prose}</p>
            <IndexCard kicker="the client, at the final review" text={OUTCOME.quote.text} who={OUTCOME.quote.who} tilt={-1} />
          </div>
          <div className={s.pinCol}>
            <Photo src={room.src} alt="A partner cradles a newborn while an older sibling leans in close to see." cap="The people a birth story belongs to." byline={room.byline} tilt={1.3} />
          </div>
        </div>
        <footer className={s.closing} data-reveal>
          <div className={s.closingSheet}>
            <span className={s.tapeCorner} aria-hidden="true" />
            <p className={s.closeLine}>{CLOSE.line}</p>
            <p className={s.closeSub}>{CLOSE.sub}</p>
            <div className={s.closeActions}>
              <a href={CLOSE.email}>Get in touch</a>
              <a href="/">See more work</a>
            </div>
          </div>
        </footer>
      </section>

      <VSwitch active="wall" />
    </div>
  )
}
