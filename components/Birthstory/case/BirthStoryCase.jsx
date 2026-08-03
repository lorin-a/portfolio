'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import IaCollapse from './IaCollapse'
import s from './case.module.css'

/* ============================================================================
   BIRTH STORY — the case study (N13: editorial spine + earned arias).

   The birth's own arc is the spine (her thesis). Restraint is the default;
   the IA collapse is the one pinned aria. Every product moment is followed by
   THE WORK BEHIND IT — the research quote, the iteration, the artifact — so
   the page runs ~50/50 concept-to-craft (the balance the target references
   set). Story lines = her thesis verbatim; margins + captions = her research
   record verbatim; kickers/tags are the only structural copy.
   ============================================================================ */

function useReveal(threshold = 0.28) {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = root.querySelectorAll('[data-r]')
    if (!targets.length) return
    gsap.set(targets, { autoAlpha: 0, y: 18 })
    const tl = gsap.timeline({ paused: true })
    tl.to(targets, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' })
    let played = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) {
          played = true
          tl.play()
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(root)
    return () => {
      io.disconnect()
      tl.kill()
    }
  }, [threshold])
  return ref
}

function Beat({ children, label, className = '' }) {
  const ref = useReveal()
  return (
    <section ref={ref} className={`${s.beat} ${className}`} aria-label={label}>
      <div className={s.beatInner}>{children}</div>
    </section>
  )
}

function Kicker({ children }) {
  return (
    <p className={s.kicker} data-r>
      <span className={s.node} aria-hidden="true" />
      {children}
    </p>
  )
}

function Margin({ items }) {
  return (
    <aside className={s.margin} data-r>
      {items.map(({ tag, text }) => (
        <div key={tag + text.slice(0, 10)} className={s.marginItem}>
          <p className={s.marginTag}>{tag}</p>
          <p className={s.marginText}>{text}</p>
        </div>
      ))}
    </aside>
  )
}

function Shot({ src, alt, className = '' }) {
  return (
    <figure className={`${s.shot} ${className}`} data-r>
      <img src={src} alt={alt} width="860" height="1860" loading="lazy" />
    </figure>
  )
}

export default function BirthStoryCase() {
  return (
    <article className={s.page}>
      {/* ── the authored open: her thesis is the first thing said ── */}
      <header className={s.hero}>
        <p className={s.heroKicker}>Case study · Birth Story</p>
        <h1 className={s.thesis}>
          Birth is both an individual and shared experience, and the two are intertwined when it
          comes to processing, documenting, and reflecting on the experience.
        </h1>
        <p className={s.heroSub}>
          An app concept for documenting, reflecting on, and making sense of the birth experience.
        </p>
        <p className={s.heroMeta}>
          <span>Design lead · UX/UI, identity, flows</span>
          <span>University of Pittsburgh CRH</span>
          <span>Six-week sprint</span>
        </p>
      </header>

      <div className={s.thread}>
        {/* ── 01 · the need (research) ── */}
        <Beat label="The need">
          <Kicker>01 · The need</Kicker>
          <h2 className={`${s.line} ${s.lineQuiet}`} data-r>
            None of them ever had support with the experience afterward, and no one really prepared
            them for it.
          </h2>
          <Margin
            items={[
              {
                tag: 'the research',
                text: 'Interviews across the mothers in her own family and friends who had recently given birth — several traumatic, several joyful, all undocumented.',
              },
            ]}
          />
        </Beat>

        {/* ── 02 · before · shared (product) → the work is the note itself ── */}
        <Beat label="Before the birth">
          <Kicker>02 · Before · shared</Kicker>
          <h2 className={s.line} data-r>
            The documentation is a tool for a partner or loved one to keep track of events and
            details leading up to, during, and just after the birth.
          </h2>
          <div className={s.shotPair} data-r>
            <figure className={s.shot}>
              <img src="/images/birthstory/bs-home.png" alt="The home screen: notes on a timeline, New Entry at the top." width="860" height="1860" loading="lazy" />
            </figure>
            <figure className={`${s.shot} ${s.shotOffset}`}>
              <img src="/images/birthstory/bs-doc-note.png" alt="A note written from the delivery room: “Jules here, writing from the delivery room to note that baby should be arriving any minute. Mom is a trooper.”" width="860" height="1860" loading="lazy" />
            </figure>
          </div>
          <Margin items={[{ tag: 'in use', text: 'A partner writes from the delivery room. Photos, a title, a timestamp — no form to fill out.' }]} />
        </Beat>
      </div>

      {/* ── THE ARIA · the architecture decision (full-bleed, pinned) ── */}
      <IaCollapse />

      <div className={s.thread}>
        {/* ── 03 · iterating the entry (the work: same-flow rows) ── */}
        <Beat label="Iterating the entry" className={s.wide}>
          <Kicker>03 · The work · three versions of the way in</Kicker>
          <h2 className={s.line} data-r>
            I simplified my image-heavy first prototype into a color-block wireframe, which directed
            the feedback to the flow itself.
          </h2>
          <div className={s.iterRow} data-r>
            {[
              { src: '/images/birthstory/evolution/flows/onboarding-v1.png', v: 'V1 · the menu maze' },
              { src: '/images/birthstory/evolution/flows/onboarding-v2.png', v: 'V2 · two actions' },
              { src: '/images/birthstory/evolution/flows/onboarding-v3.png', v: 'V3 · straight in' },
            ].map(({ src, v }) => (
              <figure key={src} className={s.iterCell}>
                <img src={src} alt={`Onboarding flow, ${v}`} width="1200" height="700" loading="lazy" />
                <figcaption>{v}</figcaption>
              </figure>
            ))}
          </div>
          <Margin items={[{ tag: 'the lesson', text: 'Only show features you want feedback on. The stripped wireframe got the flow critiqued instead of the pixels.' }]} />
        </Beat>

        {/* ── 04 · during · together (product) ── */}
        <Beat label="During the birth">
          <Kicker>04 · During · together</Kicker>
          <h2 className={s.line} data-r>
            The Care Pod is a central feature during birth, and for sending easy updates in the
            newborn phase.
          </h2>
          <Shot src="/images/birthstory/bs-carepod.png" alt="The Care Pod: You at the center, loved ones in orbit, one Send Update button." className={s.shotCenter} />
          <Margin items={[{ tag: 'heard', text: '“They wished they could see a collection of everyone’s experience — who was there, what they witnessed, how they felt, even those anxiously waiting to receive the call.”' }]} />
        </Beat>

        {/* ── 05 · after · alone (product) ── */}
        <Beat label="After the birth">
          <Kicker>05 · After · alone</Kicker>
          <h2 className={s.line} data-r>
            The reflection questions are useful after the birth, and center on the birth parent’s
            experience in a private safe space.
          </h2>
          <Shot src="/images/birthstory/bs-reflect-entry.png" alt="A reflection card, Letter to Past Self, above a journal entry tagged Empowered and Hopeful." className={s.shotCenter} />
          <Margin items={[{ tag: 'heard', text: '“There is significant grief when your birth plan does not go how you thought.”' }]} />
        </Beat>

        {/* ── 06 · the craft (the work: identity + the full evolution) ── */}
        <Beat label="The craft" className={s.wide}>
          <Kicker>06 · The work · identity and evolution</Kicker>
          <h2 className={s.line} data-r>
            An earthy, emotional visual language: rounded, human, matched to a new parent’s
            capacity.
          </h2>
          <figure className={s.moodboard} data-r>
            <img src="/images/birthstory/moodboard.png" alt="The moodboard: Georgia O’Keeffe paintings, an emotional gradient palette, and competitor teardown screens." width="1340" height="1040" loading="lazy" />
            <figcaption>Moodboard — palette, form language, and the field it had to stand apart from.</figcaption>
          </figure>
          <div className={s.contactSheet} data-r aria-label="Twenty-one wireframe screens across three versions">
            {['v1', 'v2', 'v3'].flatMap((v) =>
              [1, 2, 3, 4, 5, 6, 7].map((n) => (
                <img
                  key={`${v}-${n}`}
                  src={`/images/birthstory/evolution/screens/${v}-${n}.png`}
                  alt={`Wireframe ${v.toUpperCase()} screen ${n}`}
                  width="430"
                  height="932"
                  loading="lazy"
                />
              ))
            )}
          </div>
          <Margin items={[{ tag: 'the evidence', text: 'Twenty-one screens across three versions. The client saw all three iterations and was very happy with the final.' }]} />
        </Beat>

        {/* ── 07 · the book (product outcome) ── */}
        <Beat label="The book">
          <Kicker>07 · The book · carried forward</Kicker>
          <h2 className={s.line} data-r>
            The ultimate outcome is a book they can curate to mark this moment and what they choose
            to carry forward.
          </h2>
          <Shot src="/images/birthstory/bs-book-curate.png" alt="The Book: drag content to curate your story; the night of the birth gathered on a timeline with notes, a doula’s entry, and photos." className={s.shotLarge} />
          <Margin items={[{ tag: 'heard', text: '“Even the parents whose births went smoothly still wished there was a way to document it.”' }]} />
        </Beat>

        {/* ── 08 · the record ── */}
        <Beat label="The record">
          <Kicker>08 · The record</Kicker>
          <dl className={s.ledger} data-r>
            <div><dt>Role</dt><dd>I led UX/UI, visual identity, user flows and architecture, mockup designs.</dd></div>
            <div><dt>Team</dt><dd>Lorin Anderberg · Michael Juan, research shared</dd></div>
            <div><dt>Client</dt><dd>University of Pittsburgh Center for Research on Healthcare</dd></div>
            <div><dt>Timeline</dt><dd>Six-week sprint</dd></div>
            <div><dt>Tools</dt><dd>Figma</dd></div>
            <div><dt>Status</dt><dd>These are still just example features and flows for the concept — no app is built.</dd></div>
          </dl>
          <p className={s.deepLink} data-r>
            <a href="/projects/birthstory-care-pod/v2#core">
              Behind the work: the evidence, the first attempt owned, one decision to the bottom ↓
            </a>
          </p>
        </Beat>
      </div>
    </article>
  )
}
