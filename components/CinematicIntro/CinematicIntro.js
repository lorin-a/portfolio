'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, SplitText, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import WatercolorReveal from '@/components/WatercolorReveal/WatercolorReveal'
import { cloudAudio, GS_AUDIO } from '@/lib/cloudinary'
import styles from './CinematicIntro.module.css'

gsap.registerPlugin(useGSAP)

const REVEAL_DURATION = 24000
const WASH_START_MS = 1000
const WASH_DURATION_S = 1.5
const QUOTE_DELAY_MS = 2000

const PULL_ATTR = 'Previous UPMC Magee employee'
const THESIS = 'The medical system is held together by the invisible labor of healthcare professionals and caregivers.'
const FRAMING = 'This project was co-created with and for those who give everything they have to others.'

// Poem text. Sourced from Lorin's Figma (Whelm 271-6873). Stanzas are
// rendered with internal line breaks; the first stanza is a single bold
// invocation that doubles as the poem's opening.
//
// POEM_TIMESTAMPS pairs by flat line index with the lines rendered below
// (opener + each stanza line, in document order). When Lorin authors
// per-line start times, the active line highlights as audio plays through.
// Until then, the array stays null and lines render at full opacity.
const POEM_TIMESTAMPS = null // [0.0, 2.4, 4.8, ...] -- flat by line index
const POEM_OPENER = 'Remember your heart.'
const POEM_STANZAS = [
  [
    'Remember how it has expanded',
    'beyond its borders,',
    'how it has learned to hold both joy',
    'and sorrow without breaking.',
  ],
  [
    'Remember the days you thought',
    'it could not bear another loss,',
    'and yet it did.',
    'It does.',
    'It will.',
  ],
  [
    'Remember the grief that lives in your body.',
    'Not as wisdom, but as a companion.',
    'Not as weakness, but as testament',
    'to your immense capacity',
    'to care beyond reason,',
    'to love beyond caution.',
  ],
  [
    'Remember the times you stood',
    'at the edge between someone’s',
    'darkest hour and their dawn,',
    'your presence a bridge they could cross.',
    'Your voice, the only anchor in a storm.',
  ],
  [
    'Remember that for every ending you have witnessed,',
    'your steady hands have created a thousand beginnings.',
  ],
  [
    'For every tear you have shed in break rooms,',
    'empty hallways, and behind steering wheels',
    'you have planted seeds of compassion',
    'that grow beyond hospital walls.',
  ],
  [
    'Remember that beneath the fluorescent lights',
    'and sanitized surfaces, a current flows',
    'between you and your colleagues —',
    'an understanding deeper than words,',
    'a silent recognition of shared purpose',
    'born in the gentle persistence of showing up.',
  ],
  ['Remember that you belong to each other.'],
  ['Remember that your work is sacred.'],
  [
    'Remember that through every shift and every challenge,',
    'your heart remains the truest instrument of healing.',
  ],
  [
    'Remember that you honor every life',
    'that has passed through your hands.',
    'In the space between one patient and the next,',
    'there is a moment that belongs only to you.',
  ],
  ['Claim it. Hold it. It is sacred ground.'],
  [
    'We come together like water through soil,',
    'a groundswell of quiet strength gathering force.',
  ],
  ['For what you carry, we all carry.'],
]

export default function CinematicIntro() {
  const rootRef = useRef(null)
  const heroContentRef = useRef(null)
  const washRef = useRef(null)
  const quoteRef = useRef(null)
  const attrRef = useRef(null)
  const scrollCueRef = useRef(null)
  const quoteBeatRef = useRef(null)
  const thesisRef = useRef(null)
  const framingBeatRef = useRef(null)
  const framingRef = useRef(null)
  const poemBeatRef = useRef(null)
  const poemTitleRef = useRef(null)
  const poemBodyRef = useRef(null)
  const poemControlsRef = useRef(null)
  const poemTranscriptRef = useRef(null)
  const audioRef = useRef(null)

  const [audioPlaying, setAudioPlaying] = useState(false)

  // Hero beat: thesis is the opening declaration on the watercolor.
  // Wash fades in first, thesis lines drift in with a soft blur (autoAlpha
  // + y + filter:blur), scroll cue trails. No line-mask -- atmospheric,
  // not choreographed.
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set([washRef.current, thesisRef.current, scrollCueRef.current], {
        autoAlpha: 1,
        y: 0,
        filter: 'none',
      })
      return
    }

    const tl = gsap.timeline()

    // Wash starts dimming the painting early so by the time thesis arrives
    // the text has its readable backdrop already in place.
    tl.to(washRef.current, {
      autoAlpha: 1,
      duration: WASH_DURATION_S,
      ease: 'power1.inOut',
    }, WASH_START_MS / 1000)

    tl.set(thesisRef.current, { autoAlpha: 1 }, QUOTE_DELAY_MS / 1000)
    const thesisHeroSplit = SplitText.create(thesisRef.current, { type: 'lines' })
    tl.fromTo(
      thesisHeroSplit.lines,
      { autoAlpha: 0, y: 22, filter: 'blur(5px)' },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        stagger: 0.22,
        ease: 'power2.out',
      },
      QUOTE_DELAY_MS / 1000
    )

    // Scroll cue: no blur (small UI element, blur adds GPU cost without
    // visible benefit at this size). Just a quiet fade + drift.
    tl.fromTo(
      scrollCueRef.current,
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '>+0.2'
    )
  }, { scope: rootRef })

  // Per-beat reveals fire when the beat top crosses viewport center
  // (`start: 'top center'`) -- text lands fluidly as the user scrolls into
  // the moment, never abruptly. ScrollTrigger plays each timeline forward
  // once; backward scroll leaves beats composed.
  // Reveal grammar: autoAlpha + y + filter:blur, power1.out -- atmospheric.
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Two reveal grammars to keep GPU cost low and cadence brisk:
    //   `softFluid` -- blur + y + autoAlpha for display-scale text
    //   (thesis lines, quote lines, framing, transcript). Atmospheric.
    //   `quickDrift` -- y + autoAlpha for supporting copy and UI
    //   (attribution, controls). No blur compositing layer.
    const softFluidFrom = (over = {}) => ({
      autoAlpha: 0,
      y: 22,
      filter: 'blur(5px)',
      ...over,
    })
    const softFluidTo = (over = {}) => ({
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.4,
      ease: 'power2.out',
      ...over,
    })
    const quickDriftFrom = (over = {}) => ({ autoAlpha: 0, y: 12, ...over })
    const quickDriftTo = (over = {}) => ({
      autoAlpha: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out',
      ...over,
    })

    const buildQuote = (tl) => {
      tl.set(quoteRef.current, { autoAlpha: 1 })
      const qSplit = SplitText.create(quoteRef.current, { type: 'lines' })
      tl.fromTo(qSplit.lines, softFluidFrom(), softFluidTo({ stagger: 0.18 }))
      tl.fromTo(attrRef.current, quickDriftFrom(), quickDriftTo(), '>-0.25')
    }

    const buildFraming = (tl) => {
      tl.fromTo(framingRef.current, softFluidFrom(), softFluidTo({ duration: 1.3 }))
    }

    const buildPoem = (tl) => {
      tl.fromTo(poemControlsRef.current, quickDriftFrom(), quickDriftTo({ duration: 0.9 }))
      tl.fromTo(
        poemTranscriptRef.current,
        softFluidFrom(),
        softFluidTo({ duration: 1.2 }),
        '>-0.35'
      )
    }

    const beats = [
      { beat: quoteBeatRef.current, build: buildQuote, fallback: [quoteRef.current, attrRef.current] },
      { beat: framingBeatRef.current, build: buildFraming, fallback: [framingRef.current] },
      { beat: poemBeatRef.current, build: buildPoem, fallback: [poemControlsRef.current, poemTranscriptRef.current] },
    ]

    // Each beat plays its reveal once when it enters viewport at 'top 80%'
    // -- fires as the beat is climbing into view, finishes mid-arrival.
    // toggleActions: 'play none none none' = forward-only, never reverses
    // on backscroll. Animation plays at its own paced cadence (1.4s+ for
    // the soft fluid reveals), so fast scrollers still see the motion.
    const triggers = []
    beats.forEach(({ beat, build, fallback }) => {
      if (!beat) return

      if (reduced) {
        gsap.set(fallback.filter(Boolean), { autoAlpha: 1, y: 0, filter: 'none' })
        return
      }

      const tl = gsap.timeline({ paused: true })
      build(tl)

      triggers.push(
        ScrollTrigger.create({
          trigger: beat,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => tl.play(),
        })
      )
    })

    return () => triggers.forEach((t) => t.kill())
  }, { scope: rootRef })

  // Audio-driven sync. Two layers:
  //   (1) Frame scrollTop tracks audio.currentTime so the visible window
  //       follows the reading. Linear pace until POEM_TIMESTAMPS lands;
  //       once it does, scroll to keep the active line vertically centered.
  //   (2) Active-line highlight: when timestamps exist, the current line
  //       brightens and siblings dim.
  // User can scroll manually inside the frame -- the next timeupdate event
  // re-asserts the audio position. To stay manual, pause the audio.
  useEffect(() => {
    const audio = audioRef.current
    const frame = poemTranscriptRef.current
    const inner = poemBodyRef.current
    if (!audio || !frame || !inner) return

    const lines = inner.querySelectorAll('[data-line-index]')

    const setScrollSmoothly = (target) => {
      frame.scrollTo({ top: target, behavior: 'smooth' })
    }

    const update = () => {
      const dur = audio.duration
      if (!dur || !isFinite(dur)) return
      const overflow = Math.max(frame.scrollHeight - frame.clientHeight, 0)
      if (!overflow) return

      if (POEM_TIMESTAMPS && lines.length) {
        const t = audio.currentTime
        let activeIdx = -1
        for (let i = 0; i < POEM_TIMESTAMPS.length; i += 1) {
          if (POEM_TIMESTAMPS[i] <= t) activeIdx = i
          else break
        }
        lines.forEach((el, i) => {
          el.classList.toggle(styles.lineActive, i === activeIdx)
          el.classList.toggle(styles.lineDim, activeIdx >= 0 && i !== activeIdx)
        })
        if (activeIdx >= 0) {
          const el = lines[activeIdx]
          // Center the active line vertically inside the frame.
          const target = el.offsetTop - frame.clientHeight / 2 + el.offsetHeight / 2
          setScrollSmoothly(Math.max(0, Math.min(target, overflow)))
        }
      } else {
        // Linear pace fallback.
        const target = (audio.currentTime / dur) * overflow
        setScrollSmoothly(target)
      }
    }
    const resetClasses = () => {
      lines.forEach((el) => {
        el.classList.remove(styles.lineActive, styles.lineDim)
      })
    }
    const onEnded = () => {
      resetClasses()
      setScrollSmoothly(0)
    }

    audio.addEventListener('timeupdate', update)
    audio.addEventListener('play', update)
    audio.addEventListener('loadedmetadata', update)
    audio.addEventListener('pause', resetClasses)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('play', update)
      audio.removeEventListener('loadedmetadata', update)
      audio.removeEventListener('pause', resetClasses)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnd = () => setAudioPlaying(false)
    audio.addEventListener('ended', onEnd)
    return () => audio.removeEventListener('ended', onEnd)
  }, [])

  const togglePoem = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play()
      setAudioPlaying(true)
    } else {
      audio.pause()
      setAudioPlaying(false)
    }
  }

  return (
    <section ref={rootRef} className={styles.cinematic} aria-label="Cinematic introduction">
      {/* Sticky background: watercolor + purple wash, pinned for the whole
          length of the intro while text beats scroll over it. */}
      <div className={styles.stickyBg}>
        <WatercolorReveal duration={REVEAL_DURATION} />
        <div ref={washRef} className={styles.purpleWash} aria-hidden="true" />
      </div>

      {/* Scroll column: text beats stack and scroll up over the sticky bg.
          Pulled up by one viewport so beat 1 sits on the bg at scroll 0. */}
      <div className={styles.scrollColumn}>
        {/* Beat 1: thesis is the opening declaration on the watercolor */}
        <div ref={heroContentRef} className={styles.beat}>
          <div className={styles.beatInner}>
            <p ref={thesisRef} className={styles.thesis}>{THESIS}</p>
          </div>

          <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollLabel}>continue</span>
            <svg width="14" height="18" viewBox="0 0 20 24" fill="none">
              <path
                d="M10 2v18M5 14l5 6 5-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Beat 2: pull quote + attribution. */}
        <div ref={quoteBeatRef} className={styles.beat}>
          <blockquote className={styles.pullQuote}>
            <p ref={quoteRef} className={styles.quoteText}>
              <span>&ldquo;A special person can do this work forever,</span>
              <span>a good person can do it for a little while,</span>
              <span>most people couldn&rsquo;t do it for a day.&rdquo;</span>
            </p>
            <cite ref={attrRef} className={styles.attribution}>
              {PULL_ATTR}
            </cite>
          </blockquote>
        </div>

        {/* Beat 3: framing line gets its own viewport -- a quiet dedication
            between the quote and the poem. */}
        <div ref={framingBeatRef} className={styles.beat}>
          <p ref={framingRef} className={styles.framing}>{FRAMING}</p>
        </div>

        {/* Beat 3: side-by-side player + transcript. Stacks on mobile. */}
        <div ref={poemBeatRef} className={`${styles.beat} ${styles.beatPoem}`}>
          <div className={styles.poemGrid}>
            <div ref={poemControlsRef} className={styles.poemControls}>
              <button
                type="button"
                onClick={togglePoem}
                className={styles.playDisc}
                aria-pressed={audioPlaying}
                aria-label={audioPlaying ? 'Pause poem audio' : 'Play poem audio'}
              >
                <span className={styles.playDiscIcon} aria-hidden="true">
                  {audioPlaying ? (
                    <svg width="22" height="26" viewBox="0 0 14 16" fill="currentColor">
                      <rect x="1" y="1" width="4" height="14" rx="1" />
                      <rect x="9" y="1" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="22" height="26" viewBox="0 0 14 16" fill="currentColor">
                      <path d="M2 1.5v13a.5.5 0 0 0 .76.43l11-6.5a.5.5 0 0 0 0-.86l-11-6.5A.5.5 0 0 0 2 1.5z" />
                    </svg>
                  )}
                </span>
              </button>

              <p className={styles.playerCaption}>
                <span className={styles.playerTitle}>
                  Co-written for the project, read aloud by Catherine Liggett
                </span>
                {audioPlaying && (
                  <span className={styles.playerStatus} aria-live="polite">
                    Now playing
                  </span>
                )}
              </p>

              <a href="#vision" className={styles.skipLink}>
                Continue to the project
              </a>

              <audio
                ref={audioRef}
                src={cloudAudio(GS_AUDIO['gs-poem-remember'])}
                preload="metadata"
              />
            </div>

            {/* Contained transcript: faded edges, fixed height, scrolls
                inside its frame as audio plays through. User can scroll
                manually too. data-line-index pairs each line with
                POEM_TIMESTAMPS once authored. */}
            <div ref={poemTranscriptRef} className={styles.poemFrame}>
              <div ref={poemBodyRef} className={styles.poemBody}>
                {(() => {
                  let lineIdx = 0
                  const opener = (
                    <p
                      key="opener"
                      ref={poemTitleRef}
                      data-line-index={lineIdx}
                      className={styles.poemOpener}
                    >
                      {POEM_OPENER}
                    </p>
                  )
                  lineIdx += 1
                  const stanzas = POEM_STANZAS.map((stanza, si) => (
                    <p key={si} className={styles.stanza}>
                      {stanza.map((line) => {
                        const idx = lineIdx
                        lineIdx += 1
                        return (
                          <span
                            key={idx}
                            data-line-index={idx}
                            className={styles.poemLine}
                          >
                            {line}
                          </span>
                        )
                      })}
                    </p>
                  ))
                  return (
                    <>
                      {opener}
                      {stanzas}
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
