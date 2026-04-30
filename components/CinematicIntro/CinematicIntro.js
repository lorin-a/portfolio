'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import WatercolorReveal from '@/components/WatercolorReveal/WatercolorReveal'
import { cloudAudio, GS_AUDIO } from '@/lib/cloudinary'
import styles from './CinematicIntro.module.css'

gsap.registerPlugin(useGSAP)

const REVEAL_DURATION = 24000
const WASH_START_MS = 1000
const QUOTE_DELAY_MS = 2000

const PULL_ATTR = 'Previous UPMC Magee employee'
const THESIS = 'The healthcare system is held together by the invisible labor of its staff.'
const FRAMING = 'This project was co-created with and for those who give everything they have to others.'

// Poem text. Sourced from Lorin's Figma (Whelm 271-6873). Stanzas are
// rendered with internal line breaks; the first stanza is a single bold
// invocation that doubles as the poem's opening.
//
// POEM_TIMESTAMPS pairs by flat line index with POEM_LINES_FLAT below --
// when Lorin authors per-line start times, the active line highlights as
// audio plays through. Until then, the array stays null and lines render
// at full opacity (no dim, no highlight choreography).
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
  const framingRef = useRef(null)
  const poemBeatRef = useRef(null)
  const poemTitleRef = useRef(null)
  const poemBodyRef = useRef(null)
  const poemControlsRef = useRef(null)
  const poemTranscriptRef = useRef(null)
  const audioRef = useRef(null)

  const [audioPlaying, setAudioPlaying] = useState(false)

  // Hero beat: thesis is the opening declaration on the watercolor.
  // Wash fades in first, thesis wipes in line by line via SplitText line-mask,
  // scroll cue lands as the invitation to continue.
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set([washRef.current, thesisRef.current, scrollCueRef.current], {
        autoAlpha: 1,
      })
      return
    }

    const tl = gsap.timeline()

    tl.to(washRef.current, {
      autoAlpha: 1,
      duration: 6,
      ease: 'power1.inOut',
    }, WASH_START_MS / 1000)

    tl.set(thesisRef.current, { autoAlpha: 1 }, QUOTE_DELAY_MS / 1000)
    const thesisHeroSplit = SplitText.create(thesisRef.current, {
      type: 'lines',
      mask: 'lines',
      linesClass: styles.splitLine,
    })
    tl.from(thesisHeroSplit.lines, {
      yPercent: 110,
      duration: 1.5,
      stagger: 0.5,
      ease: 'power1.inOut',
    }, QUOTE_DELAY_MS / 1000)

    tl.to(scrollCueRef.current, {
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power1.inOut',
    }, '>+0.8')
  }, { scope: rootRef })

  // Thesis beat: line-mask wipe on the thesis, soft fade on the framing line.
  // Poem beat: controls fade, transcript fades as a unit (the SplitText wipe
  // would fight the audio-driven translateY scroll).
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Beat 2: pull quote line-mask wipe, then attribution fades in.
    const buildQuote = (tl) => {
      tl.set(quoteRef.current, { autoAlpha: 1 })
      const qSplit = SplitText.create(quoteRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: styles.splitLine,
      })
      tl.from(qSplit.lines, {
        yPercent: 110,
        duration: 1.5,
        stagger: 0.4,
        ease: 'power1.inOut',
      })
      tl.to(attrRef.current, {
        autoAlpha: 1,
        duration: 1.1,
        ease: 'power1.inOut',
      }, '>-0.2')
    }

    // Beat 3: framing line primes the poem; controls and transcript fade in.
    const buildPoem = (tl) => {
      tl.to(framingRef.current, {
        autoAlpha: 1,
        duration: 1.1,
        ease: 'power1.inOut',
      })
      tl.to(poemControlsRef.current, {
        autoAlpha: 1,
        duration: 0.9,
        ease: 'power1.inOut',
      }, '>-0.3')
      tl.to(poemTranscriptRef.current, {
        autoAlpha: 1,
        duration: 1.2,
        ease: 'power1.inOut',
      }, '>-0.4')
    }

    const beats = [
      { beat: quoteBeatRef.current, build: buildQuote, fallback: [quoteRef.current, attrRef.current] },
      { beat: poemBeatRef.current, build: buildPoem, fallback: [framingRef.current, poemControlsRef.current, poemTranscriptRef.current] },
    ]

    beats.forEach(({ beat, build, fallback }) => {
      if (!beat) return

      if (reduced) {
        gsap.set(fallback.filter(Boolean), { autoAlpha: 1 })
        return
      }

      const tl = gsap.timeline({ paused: true })
      build(tl)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play()
            observer.disconnect()
          }
        },
        { threshold: 0.35 }
      )
      observer.observe(beat)
    })
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

        {/* Beat 2: pull quote + attribution + framing line. Framing primes
            the poem in the next beat. */}
        <div ref={quoteBeatRef} className={styles.beat}>
          <div className={styles.beatInner}>
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
            <p ref={framingRef} className={styles.framing}>{FRAMING}</p>
          </div>
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
