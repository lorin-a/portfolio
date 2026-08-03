'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './story.module.css'

/* ============================================================================
   THE STORY SPINE — Birth Story told in the product's own time.

   The grammar (N7 + N10, the replicable template):
   · The SHOW carries the page: one birth moves through the app, beat by beat,
     in the arc of her thesis — before (shared) → during (together) → after
     (alone) → the book (carried forward).
   · The TELL is a margin voice: one small research note per beat, her words.
   · The page borrows the product's own design language as connective tissue:
     the app's timeline (line + nodes, from the home and book screens) is the
     page spine; the app's own palette arc (cream before/after, deep teal
     during) sets each beat's register.

   Every story line is Lorin's thesis verbatim (deletion-only trims). Every
   margin quote is her research record verbatim. Structural copy = kickers and
   tags only. Motion: one calm play-once settle per beat, ~0.9s, the same for
   every beat. Reduced motion sees the composed page.
   ============================================================================ */

function Beat({ dark = false, wide = false, children, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = root.querySelectorAll('[data-r]')
    if (!targets.length) return
    gsap.set(targets, { autoAlpha: 0, y: 18 })

    const tl = gsap.timeline({ paused: true })
    tl.to(targets, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out' })

    let played = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true
          tl.play()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(root)
    return () => {
      io.disconnect()
      tl.kill()
    }
  }, [])

  return (
    <section ref={ref} className={`${s.beat} ${dark ? s.dark : ''} ${wide ? s.wide : ''}`} aria-label={label}>
      <div className={s.beatInner}>{children}</div>
    </section>
  )
}

function Kicker({ children }) {
  return (
    <p className={s.kicker} data-r>
      <span className={s.nodeDot} aria-hidden="true" />
      {children}
    </p>
  )
}

function Margin({ items }) {
  return (
    <aside className={s.margin} data-r>
      {items.map(({ tag, text }) => (
        <div key={tag + text.slice(0, 12)} className={s.marginItem}>
          <p className={s.marginTag}>{tag}</p>
          <p className={s.marginText}>{text}</p>
        </div>
      ))}
    </aside>
  )
}

export default function BirthStoryStory() {
  return (
    <article className={s.page}>
      {/* ── the opening: the thesis is the first line of the story ── */}
      <header className={s.hero}>
        <p className={s.heroKicker}>Case study · Birth Story</p>
        <h1 className={s.thesis}>
          Birth is both an individual and shared experience, and the two are intertwined when it
          comes to processing, documenting, and reflecting on the experience.
        </h1>
        <p className={s.heroSub}>
          An app concept for documenting, reflecting on, and making sense of the birth experience.
        </p>
      </header>

      <div className={s.thread}>
        {/* ── 01 · the need ── */}
        <Beat label="The need">
          <Kicker>01 · The need</Kicker>
          <h2 className={`${s.line} ${s.lineQuiet}`} data-r>
            None of them ever had support with the experience afterward, and no one really prepared
            them for it.
          </h2>
          <Margin
            items={[
              {
                tag: 'from the research',
                text: 'Interviews with the mothers in her own family and with friends who had recently given birth.',
              },
            ]}
          />
        </Beat>

        {/* ── 02 · before, shared ── */}
        <Beat label="Before the birth">
          <Kicker>02 · Before · shared</Kicker>
          <h2 className={s.line} data-r>
            The documentation is a tool for a partner or loved one to keep track of events and
            details leading up to, during, and just after the birth.
          </h2>
          <div className={s.shotPair} data-r>
            <figure className={s.shot}>
              <img
                src="/images/birthstory/bs-home.png"
                alt="The home screen: notes on a timeline, New Entry at the top, the whole app one tap away in the bottom bar."
                width="860"
                height="1860"
              />
            </figure>
            <figure className={`${s.shot} ${s.shotOffset}`}>
              <img
                src="/images/birthstory/bs-doc-note.png"
                alt="A note written from the delivery room: “Jules here, writing from the delivery room to note that baby should be arriving any minute. Mom is a trooper.” Photos attached below."
                width="860"
                height="1860"
              />
            </figure>
          </div>
          <Margin
            items={[
              { tag: 'heard', text: '“Onboarding is nice, but too many buttons and options. Too many menus.”' },
              { tag: 'built', text: 'Open straight into notes on a timeline; everything else a tap away.' },
            ]}
          />
        </Beat>

        {/* ── 03 · during, together — the app’s own night register ── */}
        <Beat dark wide label="During the birth">
          <Kicker>03 · During · together</Kicker>
          <h2 className={s.line} data-r>
            The Care Pod is a central feature during birth, and for sending easy updates in the
            newborn phase.
          </h2>
          <figure className={`${s.shot} ${s.shotCenter}`} data-r>
            <img
              src="/images/birthstory/bs-carepod.png"
              alt="The Care Pod: You at the center, circles of loved ones in orbit around you, one Send Update button."
              width="860"
              height="1860"
            />
          </figure>
          <Margin
            items={[
              {
                tag: 'heard',
                text: '“Some parents said they wished that they could see a collection of everyone’s experience and all the little details… who was there, what they brought, what they witnessed, how they felt, even those anxiously waiting to receive the call.”',
              },
            ]}
          />
        </Beat>

        {/* ── 04 · after, alone ── */}
        <Beat label="After the birth">
          <Kicker>04 · After · alone</Kicker>
          <h2 className={s.line} data-r>
            The reflection questions are useful after the birth, and center on the birth
            parent’s experience in a private safe space.
          </h2>
          <figure className={`${s.shot} ${s.shotCenter}`} data-r>
            <img
              src="/images/birthstory/bs-reflect-entry.png"
              alt="A reflection card, Letter to Past Self, above a journal entry tagged Empowered and Hopeful."
              width="860"
              height="1860"
            />
          </figure>
          <Margin
            items={[
              { tag: 'heard', text: '“There is significant grief when your birth plan does not go how you thought.”' },
            ]}
          />
        </Beat>

        {/* ── 05 · the book — the story’s ending is the product’s outcome ── */}
        <Beat label="The book">
          <Kicker>05 · The book · carried forward</Kicker>
          <h2 className={s.line} data-r>
            The ultimate outcome is a book they can curate to mark this moment and what they choose
            to carry forward.
          </h2>
          <figure className={`${s.shot} ${s.shotLarge}`} data-r>
            <img
              src="/images/birthstory/bs-book-curate.png"
              alt="The Book: drag content to curate your story; the night of the birth gathered on a timeline with notes, a doula’s entry, and photos."
              width="860"
              height="1860"
            />
          </figure>
          <Margin
            items={[
              {
                tag: 'heard',
                text: '“Other parents could laugh and joke about which baby was easier… and even they still wished there was a way to document it.”',
              },
            ]}
          />
        </Beat>

        {/* ── 06 · the record ── */}
        <Beat label="The record">
          <Kicker>06 · The record</Kicker>
          <dl className={s.ledger} data-r>
            <div>
              <dt>Role</dt>
              <dd>I led UX/UI, visual identity, user flows/architecture, mockup designs.</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>Lorin Anderberg · Michael Juan, research shared</dd>
            </div>
            <div>
              <dt>Client</dt>
              <dd>University of Pittsburgh Center for Research on Healthcare</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>Six-week sprint</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>Figma</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>These are still just example features and flows for the concept — no app is built.</dd>
            </div>
          </dl>
          <p className={s.deepLink} data-r>
            <a href="/projects/birthstory-care-pod/v2#core">
              Behind the work: the iterations, the evidence, one decision taken to the bottom ↓
            </a>
          </p>
        </Beat>
      </div>
    </article>
  )
}
