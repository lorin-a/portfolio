'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, SplitText, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import WatercolorReveal from '@/components/WatercolorReveal/WatercolorReveal'
import { cloudAudio, cloudImg, GS_AUDIO, GS_IMAGES } from '@/lib/cloudinary'
import { useSharedAudio } from '@/lib/useSharedAudio'
import projectStyles from '@/styles/project.module.css'
import styles from './CinematicIntro.module.css'

gsap.registerPlugin(useGSAP)

const REVEAL_DURATION = 24000
const WASH_START_MS = 1000
const WASH_DURATION_S = 1.5
const QUOTE_DELAY_MS = 2000

const PULL_ATTR = 'Previous UPMC Magee employee'
const THESIS = 'The medical system is held together by the invisible labor of healthcare professionals and caregivers.'
const FRAMING = 'This project was co-created with and for those who give everything they have to others.'

// Hero descriptor + logo. The logo image carries the wordmark and
// the subhead together; the descriptor below it grounds the visitor
// in what Groundswell is.
const GS_LOGO_URL = 'https://res.cloudinary.com/dc17mvdyv/image/upload/v1777927846/gs-logo-white.png'
const HERO_DESCRIPTOR = 'An ecosystem of restoration, connection, and collective meaning-making co-designed with oncology staff at UPMC Magee-Womens Cancer Services.'

// Poem text. Sourced from Lorin's Figma (Whelm 271-6873). Stanzas are
// rendered with internal line breaks; the first stanza is a single bold
// invocation that doubles as the poem's opening.
//
// POEM_TIMESTAMPS pairs by stanza index. Index 0 = opener ("Remember your
// heart."), indices 1..N = POEM_STANZAS in order. When Lorin authors
// per-stanza start times, the active stanza highlights and scrolls into
// the center band as audio plays through. Until then, the array stays
// null, the transcript scrolls linearly with the audio, and no highlight
// applies.
const POEM_TIMESTAMPS = null // [0.0, 8.4, 18.2, ...] -- one per stanza, length = POEM_STANZAS.length + 1
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

// Small bobbing arrow placed below each beat's content so the visitor
// sees a "keep scrolling" cue that floats just below whatever they're
// reading -- adapts to the content height of each beat naturally.
function BeatCue() {
  return (
    <div className={styles.beatCue} aria-hidden="true">
      <svg width="22" height="28" viewBox="0 0 20 24" fill="none">
        <path
          d="M10 2v18M5 14l5 6 5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function CinematicIntro({ onActiveChange }) {
  const rootRef = useRef(null)
  const heroLayerRef = useRef(null)
  const heroLogoRef = useRef(null)
  const heroDescriptorRef = useRef(null)
  const blueGardenRef = useRef(null)
  const heroPhotoRef = useRef(null)
  const heroContentRef = useRef(null)
  const sentinel1Ref = useRef(null)
  const sentinel2Ref = useRef(null)
  const sentinel3Ref = useRef(null)
  const sentinel4Ref = useRef(null)
  const washRef = useRef(null)
  const quoteRef = useRef(null)
  const attrRef = useRef(null)
  const scrollCueRef = useRef(null)
  const quoteBeatRef = useRef(null)
  const thesisRef = useRef(null)
  const framingBeatRef = useRef(null)
  const framingRef = useRef(null)
  const poemBeatRef = useRef(null)
  const poemHeaderRef = useRef(null)
  const poemBodyRef = useRef(null)
  const poemTranscriptRef = useRef(null)
  const poemChromeRef = useRef(null)
  const audioRef = useRef(null)

  const [audioPlaying, setAudioPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Project-standard motion: paused timeline + IntersectionObserver play-once
  // per beat. Each beat plays its own breath as it enters the viewport;
  // backward scroll leaves beats composed (no reverse). Sticky watercolor
  // backdrop anchors the visual frame; the scrolling beats provide the
  // scroll-as-advance language used throughout the site.
  useGSAP(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const beat1 = heroContentRef.current
    const beat2 = quoteBeatRef.current
    const beat3 = framingBeatRef.current
    const beat4 = poemBeatRef.current
    if (!beat1 || !beat2 || !beat3 || !beat4) return

    // Always set to a known initial state so React re-renders don't leave
    // stale inline styles fighting GSAP.
    const breathables = [
      thesisRef.current,
      quoteRef.current,
      attrRef.current,
      framingRef.current,
      poemHeaderRef.current,
      poemTranscriptRef.current,
      poemChromeRef.current,
      scrollCueRef.current,
    ].filter(Boolean)

    if (reduced) {
      gsap.set([beat1, beat2, beat3, beat4, washRef.current, ...breathables], {
        autoAlpha: 1,
        y: 0,
        filter: 'none',
      })
      return
    }

    // Initial state. Beats are absolute-positioned at viewport center,
    // all hidden by default. Sentinels below the sticky stage drive
    // which beat is visible -- crossfade only, no travel. Wash + scroll
    // cue start hidden and follow the hero scrub.
    const beats = [beat1, beat2, beat3, beat4]
    gsap.set(beats, { autoAlpha: 0 })
    gsap.set(washRef.current, { autoAlpha: 0 })
    gsap.set(scrollCueRef.current, { autoAlpha: 1, y: 0 })

    // Show beat at index `idx`, fade out all others. Uses paused inner
    // timelines (the breath-in for that beat) the first time it's shown;
    // subsequent shows just bring autoAlpha back to 1.
    const playedBreath = new Set()
    let activeIdx = -1

    const breathFrom = { autoAlpha: 0, y: 14, filter: 'blur(4px)' }
    const breathTo = (overrides = {}) => ({
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power1.inOut',
      ...overrides,
    })

    const playThesisBreath = () => {
      const split = SplitText.create(thesisRef.current, { type: 'lines' })
      gsap.set(thesisRef.current, { autoAlpha: 1 })
      gsap.fromTo(split.lines, breathFrom, breathTo({ stagger: 0.22 }))
    }
    const playPullQuoteBreath = () => {
      const qSplit = SplitText.create(quoteRef.current, { type: 'lines' })
      gsap.set(quoteRef.current, { autoAlpha: 1 })
      gsap.fromTo(qSplit.lines, breathFrom, breathTo({ stagger: 0.18 }))
      gsap.fromTo(
        attrRef.current,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.3 }
      )
    }
    const playFramingBreath = () => {
      gsap.fromTo(framingRef.current, breathFrom, breathTo({ duration: 1.3 }))
    }
    const playPoemBreath = () => {
      gsap.fromTo(poemHeaderRef.current, breathFrom, breathTo({ duration: 1.0 }))
      gsap.fromTo(poemChromeRef.current, breathFrom, breathTo({ duration: 1.0, delay: 0.4 }))
      gsap.fromTo(poemTranscriptRef.current, breathFrom, breathTo({ duration: 1.2, delay: 0.5 }))
    }
    const breathPlayers = [playThesisBreath, playPullQuoteBreath, playFramingBreath, playPoemBreath]

    const showBeat = (idx) => {
      if (idx === activeIdx) return
      activeIdx = idx

      // Set autoAlpha across all beats in one pass with overwrite:'auto'
      // so any in-flight tween on the same target gets killed cleanly.
      beats.forEach((b, i) => {
        gsap.to(b, {
          autoAlpha: i === idx ? 1 : 0,
          duration: i === idx ? 0.6 : 0.5,
          ease: 'power1.inOut',
          overwrite: 'auto',
        })
      })

      // First time showing this beat: also play the breath choreography
      // for its inner content (split lines, attribution, etc.).
      if (!playedBreath.has(idx)) {
        playedBreath.add(idx)
        breathPlayers[idx]()
      }
    }

    // Sentinels: each one corresponds to a beat. When a sentinel enters
    // the middle band of the viewport (rootMargin shrinks the active
    // band to the middle 30%), its beat becomes visible.
    const sentinels = [
      sentinel1Ref.current,
      sentinel2Ref.current,
      sentinel3Ref.current,
      sentinel4Ref.current,
    ]
    // Observer callbacks are gated until we've finished the initial
    // beat pick below. IntersectionObserver fires its initial state in
    // a microtask after observe(), and when several sentinels are
    // simultaneously intersecting on refresh, the "last wins" ordering
    // can leave the wrong beat active (e.g. stuck on poem). The manual
    // pick that runs in the rAF below is authoritative; we flip this
    // flag once it has run so subsequent scroll-driven changes work.
    let observersPrimed = false
    const observers = []
    sentinels.forEach((sentinel, idx) => {
      if (!sentinel) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!observersPrimed) return
          if (entry.isIntersecting) showBeat(idx)
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      )
      observer.observe(sentinel)
      observers.push(observer)
    })

    // Hero zone trigger: when the user scrolls back up into the hero
    // crossfade zone, hide all beats so the hero photo + title overlay
    // can re-emerge cleanly without the thesis (or whichever beat was
    // last active) lingering on screen.
    const heroZoneTrigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top top',
      end: '+=80%',
      onEnterBack: () => showBeat(-1),
    })

    // Initial states (always). Everything that's about to animate
    // starts hidden so we don't flash content during the brief window
    // before the deferred entry decision runs in the rAF below.
    //   - wash: hidden until either entry tween fades it in OR
    //     pastHero jumps it to visible
    //   - heroLayer parent: visible (its children carry the entry
    //     animations; the parent fades out via scroll scrub later)
    //   - hero children (logo / descriptor / cue): hidden until
    //     entry tweens fade them in OR pastHero jumps them
    //   - heroPhoto: hidden until scrub fades it in as Blue Garden
    //     fades out
    gsap.set(washRef.current, { autoAlpha: 0 })
    gsap.set(heroLayerRef.current, { autoAlpha: 1 })
    gsap.set(heroPhotoRef.current, { autoAlpha: 0 })
    gsap.set(heroLogoRef.current, { autoAlpha: 0, scale: 0.92, filter: 'blur(8px)' })
    gsap.set(scrollCueRef.current, { autoAlpha: 0, y: 6 })
    gsap.set(heroDescriptorRef.current, { autoAlpha: 0 })

    // Entry tween handles -- created inside the rAF below so we can
    // read window.scrollY *after* the browser has applied scroll
    // restoration. With scrollRestoration='auto' on this layout, the
    // restored scroll position isn't always settled at React mount.
    let washIn = null
    let logoIn = null
    let cueIn = null
    let descriptorSplit = null
    let descriptorIn = null
    const cinematicRoot = rootRef.current

    // Scroll scrub (0–80vh of section): hero overlay fades out, Blue
    // Garden fades out, gs-hero photograph fades in. Wash stays at
    // full opacity throughout. `immediateRender: false` keeps these
    // tweens from firing on creation -- so they don't override the
    // entry timeline's hidden initial state. They activate only when
    // the user actually scrolls.
    const scrubST = {
      trigger: rootRef.current,
      start: 'top top',
      // Twice the scroll distance + heavier scrub lag = a slower,
      // more cinematic transition. Hard scrolls don't rip through it.
      end: '+=160%',
      scrub: 1.2,
    }
    const heroFadeOut = gsap.to(heroLayerRef.current, {
      autoAlpha: 0, ease: 'none', immediateRender: false, scrollTrigger: scrubST,
    })
    const blueFadeOut = gsap.to(blueGardenRef.current, {
      autoAlpha: 0, ease: 'none', immediateRender: false, scrollTrigger: scrubST,
    })
    const photoFadeIn = gsap.to(heroPhotoRef.current, {
      autoAlpha: 1, ease: 'none', immediateRender: false, scrollTrigger: scrubST,
    })

    // Active state for the parent (drives ProgressNav hide). Fires the
    // moment the cinematic touches the viewport, releases when it's gone.
    const activeObserver = new IntersectionObserver(
      ([entry]) => {
        onActiveChange?.(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    activeObserver.observe(rootRef.current)

    // Robust mount runs in two passes -- the first in rAF so layout
    // has settled, the second on the first scroll event so we catch
    // browsers (notably Chrome on Android) whose scroll restoration
    // fires *after* our rAF. Both passes go through the same handler;
    // it's idempotent and will roll back the entry timeline to its
    // final state if the first pass guessed wrong.
    let entryRan = false
    let entryWasPastHero = false

    const startEntryTimeline = () => {
      washIn = gsap.fromTo(
        washRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 4.0, delay: 0.8, ease: 'power1.inOut', overwrite: false }
      )

      logoIn = gsap.fromTo(
        heroLogoRef.current,
        { autoAlpha: 0, scale: 0.92, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 2.2,
          delay: 3.0,
          ease: 'power2.out',
          overwrite: false,
        }
      )

      // Descriptor lines reveal in soft stagger — built on a second
      // rAF so SplitText measures actual line breaks once layout has
      // settled.
      requestAnimationFrame(() => {
        if (!heroDescriptorRef.current) return
        descriptorSplit = SplitText.create(heroDescriptorRef.current, { type: 'lines' })
        gsap.set(heroDescriptorRef.current, { autoAlpha: 1 })
        descriptorIn = gsap.fromTo(
          descriptorSplit.lines,
          { autoAlpha: 0, y: 14, filter: 'blur(4px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            delay: 4.4,
            stagger: 0.16,
            ease: 'power2.out',
            overwrite: false,
          }
        )
      })

      cueIn = gsap.fromTo(
        scrollCueRef.current,
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration: 0.9, delay: 5.6, ease: 'power2.out', overwrite: false }
      )
    }

    const jumpEntryToFinal = () => {
      // Kill any in-flight entry tweens from a previous pass (Chrome
      // mobile case: rAF saw scrollY=0 and started the timeline; the
      // late scroll-restoration event runs us again with pastHero=true,
      // so we cancel and snap to the composed end state).
      washIn?.kill(); washIn = null
      logoIn?.kill(); logoIn = null
      cueIn?.kill(); cueIn = null
      descriptorIn?.kill(); descriptorIn = null
      descriptorSplit?.revert(); descriptorSplit = null

      gsap.set(washRef.current, { autoAlpha: 1 })
      gsap.set(heroLogoRef.current, { autoAlpha: 1, scale: 1, filter: 'blur(0px)' })
      gsap.set(scrollCueRef.current, { autoAlpha: 1, y: 0 })
      gsap.set(heroDescriptorRef.current, { autoAlpha: 1 })
    }

    const decideAndApply = () => {
      ScrollTrigger.refresh()

      if (!cinematicRoot) {
        observersPrimed = true
        return
      }

      const rootTop = cinematicRoot.offsetTop
      const rootBottom = rootTop + cinematicRoot.offsetHeight
      const heroZoneEnd = rootTop + window.innerHeight * 0.5
      const scrollY = window.scrollY
      const viewportCenter = scrollY + window.innerHeight / 2
      const pastHero = scrollY > heroZoneEnd

      // Entry decision. Apply only when the pastHero state changes
      // from a previous pass (or is being set for the first time).
      if (!entryRan) {
        entryRan = true
        entryWasPastHero = pastHero
        if (pastHero) jumpEntryToFinal()
        else startEntryTimeline()
      } else if (!entryWasPastHero && pastHero) {
        // Second pass detected a late scroll restoration past the hero
        // zone; cancel the in-flight entry tweens and snap to final.
        entryWasPastHero = true
        jumpEntryToFinal()
      }

      // Beat pick.
      if (viewportCenter > rootBottom) {
        // Past the cinematic -- hide all beats so the user sees the
        // composed final state above them as they scroll up.
        showBeat(-1)
      } else if (pastHero) {
        // Mid-cinematic refresh -- pick the sentinel whose center is
        // closest to the viewport center. Resolves "last wins" when
        // several sentinels intersect simultaneously on refresh.
        let bestIdx = -1
        let bestDist = Infinity
        sentinels.forEach((s, idx) => {
          if (!s) return
          const rect = s.getBoundingClientRect()
          const center = rect.top + rect.height / 2
          const dist = Math.abs(center - window.innerHeight / 2)
          if (dist < bestDist) {
            bestDist = dist
            bestIdx = idx
          }
        })
        if (bestIdx >= 0) showBeat(bestIdx)
      }
      // (Fresh load near top: leave activeIdx at -1 so the hero state
      // shows; observers will fire as the user scrolls.)

      observersPrimed = true
    }

    const refreshAndPickRaf = requestAnimationFrame(decideAndApply)
    // Re-run on the first scroll event so we catch late scroll
    // restoration on Chrome mobile.
    const onFirstScroll = () => decideAndApply()
    window.addEventListener('scroll', onFirstScroll, { once: true, passive: true })

    return () => {
      cancelAnimationFrame(refreshAndPickRaf)
      window.removeEventListener('scroll', onFirstScroll)
      observers.forEach((o) => o.disconnect())
      activeObserver.disconnect()
      heroFadeOut.scrollTrigger?.kill()
      blueFadeOut.scrollTrigger?.kill()
      photoFadeIn.scrollTrigger?.kill()
      heroFadeOut.kill()
      blueFadeOut.kill()
      photoFadeIn.kill()
      washIn?.kill()
      logoIn?.kill()
      cueIn?.kill()
      descriptorIn?.kill()
      descriptorSplit?.revert()
      heroZoneTrigger.kill()
    }
  }, { scope: rootRef, dependencies: [onActiveChange] })

  // Audio-driven sync. Two layers:
  //   (1) Frame scrollTop tracks audio.currentTime so the visible window
  //       follows the reading. Linear pace until POEM_TIMESTAMPS lands;
  //       once it does, scroll to keep the active line vertically centered.
  //   (2) Active-line highlight: when timestamps exist, the current line
  //       brightens and siblings dim.
  // User can scroll manually inside the frame -- the next timeupdate event
  // re-asserts the audio position. To stay manual, pause the audio.
  // Audio sync: drives the scrubber/time display state, the active-stanza
  // highlight, and the auto-scroll-to-center behavior. Stanza-level
  // granularity -- timestamps array is one entry per stanza (opener + each
  // POEM_STANZAS entry).
  // Audio sync: drives the scrubber/time display state and the
  // active-stanza highlight (when POEM_TIMESTAMPS is authored).
  // Transcript scroll is fully manual -- the user controls it; audio
  // never moves the scroll position.
  useEffect(() => {
    const audio = audioRef.current
    const frame = poemTranscriptRef.current
    const inner = poemBodyRef.current
    if (!audio || !frame || !inner) return

    const stanzas = inner.querySelectorAll('[data-stanza-index]')

    const updateHighlight = () => {
      setCurrentTime(audio.currentTime)
      if (!POEM_TIMESTAMPS || !stanzas.length) return
      const t = audio.currentTime
      let activeIdx = -1
      for (let i = 0; i < POEM_TIMESTAMPS.length; i += 1) {
        if (POEM_TIMESTAMPS[i] <= t) activeIdx = i
        else break
      }
      stanzas.forEach((el, i) => {
        el.classList.toggle(styles.stanzaActive, i === activeIdx)
        el.classList.toggle(styles.stanzaDim, activeIdx >= 0 && i !== activeIdx)
      })
    }

    const onLoaded = () => {
      if (isFinite(audio.duration)) setDuration(audio.duration)
      updateHighlight()
    }
    const resetClasses = () => {
      stanzas.forEach((el) => {
        el.classList.remove(styles.stanzaActive, styles.stanzaDim)
      })
    }

    audio.addEventListener('timeupdate', updateHighlight)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('durationchange', onLoaded)
    audio.addEventListener('pause', resetClasses)
    audio.addEventListener('ended', resetClasses)
    return () => {
      audio.removeEventListener('timeupdate', updateHighlight)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('durationchange', onLoaded)
      audio.removeEventListener('pause', resetClasses)
      audio.removeEventListener('ended', resetClasses)
    }
  }, [])

  const seekTo = (value) => {
    const audio = audioRef.current
    if (!audio || !isFinite(audio.duration)) return
    audio.currentTime = Math.max(0, Math.min(audio.duration, value))
    setCurrentTime(audio.currentTime)
  }

  const formatTime = (seconds) => {
    if (!isFinite(seconds)) return '0:00'
    const total = Math.max(0, Math.floor(seconds))
    const m = Math.floor(total / 60)
    const s = total % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Wire this audio into the page-wide single-play system (shared with
  // the pod's poem + meditation players + the StandaloneNav button).
  // The hook handles claim, pause-others, state events, and remote
  // toggle. We just keep the local playing state in sync for our own
  // play-button UI.
  useSharedAudio(audioRef, 'Poem')
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setAudioPlaying(true)
    const onPause = () => setAudioPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
    }
  }, [])

  const togglePoem = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play()
    else audio.pause()
  }

  return (
    <section ref={rootRef} id="hero" className={styles.cinematic} aria-label="Groundswell — introduction">
      {/* Sticky backdrop holds EVERYTHING that should appear anchored at
          viewport center: hero photo, overlays, hero title overlay, AND
          all four beats (absolute-positioned, stacked at the same anchor
          point). User scrolls through sentinels below; sentinels trigger
          which beat is visible. No travel -- only opacity changes. */}
      <div className={styles.stickyBackdrop}>
        {/* Brand white base -- the cinematic opens on a clean canvas
            before the watercolor blooms over it. */}
        <div className={styles.whiteBase} aria-hidden="true" />

        {/* Blue Garden watercolor: WebGL bloom on page load. Stays at
            full opacity until the user starts scrolling, then crossfades
            out as the gs-hero photograph fades in beneath the wash. */}
        <div ref={blueGardenRef} className={styles.blueGardenLayer}>
          <WatercolorReveal duration={18000} />
        </div>

        {/* gs-hero photograph: hidden initially, fades in via scrub as
            Blue Garden fades out. The wash sits above it for legibility. */}
        <img
          ref={heroPhotoRef}
          src={cloudImg(GS_IMAGES['gs-hero'], 1600)}
          alt="Groundswell installation at UPMC Magee-Womens Hospital"
          className={styles.heroBackdropImage}
        />

        {/* Brand purple wash: fades in after watercolor reveal completes
            and stays at full opacity through the entire cinematic. The
            project's color register, carried throughout. */}
        <div ref={washRef} className={styles.purpleWash} aria-hidden="true" />

        {/* Hero overlay: logo (which carries the wordmark + subhead) +
            descriptor + scroll cue. Fades in after wash settles, then
            fades out via scrub as the user scrolls into the cinematic. */}
        <div ref={heroLayerRef} className={styles.heroLayer}>
          <div className={projectStyles.heroContent}>
            <img
              ref={heroLogoRef}
              src={GS_LOGO_URL}
              alt="Groundswell"
              className={styles.heroLogo}
            />
            <p ref={heroDescriptorRef} className={styles.heroDescriptor}>{HERO_DESCRIPTOR}</p>
            <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
              <span className={styles.scrollLabel}>scroll</span>
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
        </div>

        {/* Beats: each absolute-positioned at center, opacity 0 by default.
            Sentinels below trigger fade in/out. One beat visible at a time.
            Each beat owns a small `.beatCue` arrow placed below its content
            so the cue's vertical position adapts to whatever's above it. */}
        <div ref={heroContentRef} className={styles.beat}>
          <div className={styles.beatInner}>
            <p ref={thesisRef} className={styles.thesis}>{THESIS}</p>
          </div>
          <BeatCue />
        </div>

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
          <BeatCue />
        </div>

        <div ref={framingBeatRef} className={styles.beat}>
          <p ref={framingRef} className={styles.framing}>{FRAMING}</p>
          <BeatCue />
        </div>

        {/* Beat 4: Apple Podcasts-style single column. Header strip up top
            anchors title + reader; scrolling transcript in the middle with
            faded edges and stanza-level highlight when timestamps land;
            persistent player chrome at the bottom. */}
        <div ref={poemBeatRef} className={`${styles.beat} ${styles.beatPoem}`}>
          <div className={styles.poemColumn}>
            <div ref={poemHeaderRef} className={styles.poemHeader}>
              <p className={styles.poemHeaderEyebrow}>Co-written for the project</p>
              <p className={styles.poemHeaderTitle}>Remember Your Heart</p>
              <p className={styles.poemHeaderSubtitle}>Read by Catherine Liggett</p>
            </div>

            <div ref={poemChromeRef} className={styles.poemChrome}>
              <div className={styles.transport}>
                <button
                  type="button"
                  onClick={togglePoem}
                  className={styles.playButton}
                  aria-pressed={audioPlaying}
                  aria-label={audioPlaying ? 'Pause poem' : 'Play poem'}
                >
                  {audioPlaying ? (
                    <svg width="26" height="30" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                      <rect x="1" y="1" width="4" height="14" rx="1" />
                      <rect x="9" y="1" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="26" height="30" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                      <path d="M2 1.5v13a.5.5 0 0 0 .76.43l11-6.5a.5.5 0 0 0 0-.86l-11-6.5A.5.5 0 0 0 2 1.5z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className={styles.scrubberRow}>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  className={styles.scrubber}
                  aria-label="Seek through poem"
                  style={{
                    '--progress': duration ? `${(currentTime / duration) * 100}%` : '0%',
                  }}
                />
                <div className={styles.scrubberTimes}>
                  <span>{formatTime(currentTime)}</span>
                  <span>-{formatTime(Math.max(0, (duration || 0) - currentTime))}</span>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={cloudAudio(GS_AUDIO['gs-poem-remember'])}
                preload="metadata"
              />
            </div>

            {/* Contained transcript: faded edges, fixed height, scrolls as
                audio plays. data-stanza-index pairs each stanza with
                POEM_TIMESTAMPS once authored. */}
            <div ref={poemTranscriptRef} className={styles.poemFrame}>
              <div ref={poemBodyRef} className={styles.poemBody}>
                <p
                  data-stanza-index={0}
                  className={styles.poemOpener}
                >
                  {POEM_OPENER}
                </p>
                {POEM_STANZAS.map((stanza, si) => (
                  <p
                    key={si}
                    data-stanza-index={si + 1}
                    className={styles.stanza}
                  >
                    {stanza.map((line, li) => (
                      <span key={li} className={styles.poemLine}>
                        {line}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            <BeatCue />
          </div>
        </div>
      </div>

      {/* Sentinel track: scroll-progress markers below the sticky backdrop.
          Each sentinel triggers which beat is visible in the anchored
          stage above. Hero zone (top of track) gets extra padding so the
          first beat doesn't fade in until the user has scrolled past the
          hero crossfade. */}
      <div className={styles.sentinelTrack}>
        <div ref={sentinel1Ref} className={styles.sentinel} aria-hidden="true" />
        <div ref={sentinel2Ref} className={styles.sentinel} aria-hidden="true" />
        <div ref={sentinel3Ref} className={styles.sentinel} aria-hidden="true" />
        <div ref={sentinel4Ref} className={`${styles.sentinel} ${styles.sentinelLast}`} aria-hidden="true" />
      </div>
    </section>
  )
}
