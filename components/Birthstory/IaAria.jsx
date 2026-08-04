'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IaV1, IaFinal } from './IaDiagrams'
import a from './IaAria.module.css'

/* ============================================================================
   THE 4 → 0 COLLAPSE — the process half's one earned aria (N42/N43).

   The page's aria is reserved for the single moment whose beats are genuinely
   different KINDS of content (N31). This is it: a first answer, the verdict
   testing returned on it, and what shipped instead. Three beats, three
   different things, and the page's two best-drawn objects as the evidence.

   THE FRAME IS A BAND, NOT A COLUMN. The product aria puts 28rem of words
   beside a phone, because a phone is narrow. A measured IA diagram is wide, so
   the words run as a band across the top — the same title-spread composition
   the product act's own opener uses — and the drawing takes the whole width
   beneath it.

   WHAT MOVES IS THE DRAWING. The first version fades to a ghost as the count
   lands on top of it, and the shipped tree arrives in its place. The band's
   three labels are all present and at full strength from the first frame, so
   the shape of the argument is legible before a word of it is read (N33); the
   live beat's sentence cross-fades in place beneath them, because a sentence
   describing the drawing has to change when the drawing does. Nothing is
   removed from the DOM and nothing is aria-hidden.

   Under reduced motion, and below 1000px, the pin drops entirely: both
   diagrams and all three beats render as plain stacked figures with every
   annotation visible.
   ============================================================================ */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* the three beats — her words, verbatim, split at their own sentence
   boundaries. Nothing here was written for the layout. */
const BEATS = [
  {
    key: 'first',
    label: 'The first answer',
    body: 'Our first attempt met the user in the moment. The opening menu asked what phase they were in, before, during, or after the birth, at home or in the hospital, to determine the need, and with it the best feature for that moment.',
  },
  {
    key: 'verdict',
    label: 'What it actually did',
    body: 'Looking back, it did the opposite of what we intended. Meant to lower cognitive load, it gate-kept features instead of offering freedom and autonomy, and it made the app layered and disorienting: a form at the front desk while you’re still catching your breath.',
  },
  {
    key: 'shipped',
    label: 'What shipped',
    body: 'Think-aloud testing over Zoom confirmed it, and drove the most significant shift in our approach: from a sequenced entry to an immediate one, opening directly into the main feature for the most common use case, notes on a timeline.',
  },
]

/* THE FINDINGS, HUNG ON THE DRAWINGS THAT PROVE THEM (N42).

   These were a twelve-cell heard → learned → did grid sitting in Research,
   which said nothing with the words covered. The same findings register here
   against the thing each one produced: what testing said, and the column of the
   shipped architecture it argued into existence. The middle "learned" tier is
   gone — the diagram is what was learned. */
const V1_FINDINGS = [
  {
    /* no attribution label and no move line: the quote points at the drawing
       it is about, and a tester's voice does not need to be introduced as one */
    heard: 'Onboarding is nice, but too many buttons and options. Too many menus.',
  },
]

/* col = the 1-indexed tab of the shipped five-tab tree the note points at, so
   each stem rises into the column its finding produced */
const FINAL_FINDINGS = [
  {
    col: 1,
    heard: 'Timeline is a must; journaling is unique to everyone.',
    did: 'The timeline is the home; journaling is there when you want it.',
  },
]

/* the beat boundaries as a share of the pinned travel — the last beat holds
   longest, because it is the one the reader is meant to leave with */
const BOUNDS = [0.3, 0.62]

function Findings({ notes, innerRef }) {
  return (
    <div className={a.notes} ref={innerRef}>
      {notes.map((n) => (
        /* the column travels as a custom property rather than an inline
           grid-column, so the narrow-screen rule can still override it */
        <div
          key={n.heard}
          className={`${a.note} ${n.col ? '' : a.noteWide}`}
          style={n.col ? { '--col': n.col } : undefined}
        >
          <span className={a.stem} aria-hidden="true" />
          <p className={a.heard}>{`“${n.heard}”`}</p>
          {n.did && <p className={a.did}>{n.did}</p>}
        </div>
      ))}
    </div>
  )
}

export default function IaAria() {
  const [pinned, setPinned] = useState(false)
  const [beat, setBeat] = useState(0)
  const trackRef = useRef(null)
  const stickyRef = useRef(null)
  const stageRef = useRef(null)
  const artRefs = useRef([])
  const noteRefs = useRef([])
  const plateRefs = useRef([])
  const [fit, setFit] = useState([{ s: 1, h: 0 }, { s: 1, h: 0 }])

  /* the pin is an enhancement: it only ever switches ON, so the static
     composition is what renders first and what reduced motion keeps */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mq = window.matchMedia('(max-width: 1000px)')
    const apply = () => setPinned(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /* FIT, DON'T SPILL. The frame is one viewport tall and a diagram is as tall
     as its own content, so each plate is scaled to the height it actually has —
     measured, not assumed. offsetHeight reports the LAYOUT box, which a
     transform does not touch, so it cannot feed back on itself. The scaled
     height is written back onto the box so the notes sit against the drawing
     rather than against the space it used to occupy. */
  useIso(() => {
    if (!pinned) { setFit([{ s: 1, h: 0 }, { s: 1, h: 0 }]); return }
    const measure = () => {
      const st = stageRef.current
      if (!st) return
      const stH = st.clientHeight
      if (!stH) return
      const next = [0, 1].map((i) => {
        const art = artRefs.current[i]
        const nh = art ? art.offsetHeight : 0
        const plate = plateRefs.current[i]
        /* everything in the plate that is NOT the drawing comes out of the
           budget first — now just the findings row and the one gap above it,
           since the tag is gone. Leaving these out is what clipped the first
           version's findings off the foot of the frame. */
        const gap = plate ? parseFloat(getComputedStyle(plate).rowGap) || 0 : 0
        const notesH = noteRefs.current[i] ? noteRefs.current[i].offsetHeight : 0
        const avail = stH - notesH - gap - 4
        if (!nh || avail <= 0) return { s: 1, h: 0 }
        const s = Math.round(Math.min(1, avail / nh) * 1000) / 1000
        return { s, h: Math.round(nh * s) }
      })
      /* the findings row can grow with its own text, and its width is a
         function of the scale, so bail out when nothing meaningful moved —
         otherwise the two chase each other around the observer */
      setFit((prev) => (prev.every((p, i) => p.s === next[i].s && p.h === next[i].h) ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    artRefs.current.forEach((el) => el && ro.observe(el))
    noteRefs.current.forEach((el) => el && ro.observe(el))
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 350) // re-measure once webfonts settle
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t) }
  }, [pinned])

  /* which beat the reader is standing in, read off the track's own travel */
  useEffect(() => {
    if (!pinned) { setBeat(0); return }
    let frame = 0
    const read = () => {
      frame = 0
      const track = trackRef.current
      const sticky = stickyRef.current
      if (!track || !sticky) return
      const r = track.getBoundingClientRect()
      const top = parseFloat(getComputedStyle(sticky).top) || 0
      const travel = r.height - sticky.offsetHeight
      if (travel <= 0) return
      const p = Math.min(1, Math.max(0, (top - r.top) / travel))
      setBeat(p < BOUNDS[0] ? 0 : p < BOUNDS[1] ? 1 : 2)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pinned])

  /* v1 holds, then ghosts under the count, then goes; the shipped tree arrives
     in its place. Off the pin, both are simply present. */
  const v1State = !pinned ? '' : beat === 0 ? a.on : beat === 1 ? a.ghost : a.off
  const finalState = !pinned ? '' : beat === 2 ? a.on : a.off

  /* THE SUBTRACTION PASS: the plate tags are gone. "ia-v1 · the branching
     questionnaire" sat directly under the label THE FIRST ANSWER and said the
     same thing twice, which is the crowding in miniature — a caption for an
     object the sentence above already named. */
  const plate = (i, diagram, notes, state) => (
    <div className={`${a.plate} ${state}`} style={{ '--s': fit[i].s }} ref={(el) => { plateRefs.current[i] = el }}>
      <div className={a.artBox} style={pinned && fit[i].h ? { height: `${fit[i].h}px` } : undefined}>
        <div className={a.art} ref={(el) => { artRefs.current[i] = el }}>{diagram}</div>
      </div>
      <Findings notes={notes} innerRef={(el) => { noteRefs.current[i] = el }} />
    </div>
  )

  return (
    <section className={`${a.aria} ${pinned ? a.pinned : ''}`} aria-label="The information architecture, before and after">
      {/* 85vh a beat rather than a full screen each: the merge is supposed to
          make the chapter shorter, and a beat here is a diagram swap, not a
          demo that needs time to play. Travel works out at ~65vh of scroll per
          beat, which is a comfortable dwell without being a corridor. */}
      <div className={a.track} ref={trackRef} style={pinned ? { height: `${BEATS.length * 85 + 30}vh` } : undefined}>
        <div className={a.sticky} ref={stickyRef}>
          <div className={a.frame}>

            {/* THE BAND — the outline first. All three labels are present and
                at full strength from the first frame; the live one takes the
                teal rule and full ink. The upcoming labels ARE the clue that
                more is coming (N33). */}
            {/* label and sentence travel together in the DOM, so that off the
                pin each beat reads as a labelled paragraph in order. Pinned,
                the labels lay out as a row across the top and the three
                sentences share one slot beneath them — one on screen at a
                time, cross-fading in place, so no two elements ever cross in
                opposite directions (what made the earlier beat swap read as a
                glitch, N32). All three stay in the document either way. */}
            <ol className={a.steps}>
              {BEATS.map((b, i) => (
                <li key={b.key} className={`${a.step} ${i === beat ? a.live : ''} ${i < beat ? a.past : ''}`}>
                  <span className={a.stepHead}>
                    <span className={a.stepRule} aria-hidden="true" />
                    <span className={a.stepLabel}>{b.label}</span>
                  </span>
                  <p className={`${a.sayingLine} ${i === beat ? a.sayingOn : ''}`}>{b.body}</p>
                </li>
              ))}
            </ol>

            <div className={a.stage} ref={stageRef}>
              {plate(0, <IaV1 compact />, V1_FINDINGS, v1State)}

              {/* the turn — the count lands on the version it killed, which is
                  still faintly there behind it. The 4 is countable in the panel
                  it is replacing. */}
              <div className={`${a.plate} ${a.turnPlate} ${pinned ? (beat === 1 ? a.on : a.off) : ''}`}>
                <p className={a.turnFig}>4<span className={a.turnArrow}>→</span>0</p>
                <p className={a.turnLabel}>questions before the first entry</p>
              </div>

              {plate(1, <IaFinal compact />, FINAL_FINDINGS, finalState)}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
