'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cloudImg, cloudVideo, cloudAudio,
  GS_IMAGES, GS_VIDEOS, GS_AUDIO, GS_CARDS,
} from '@/lib/cloudinary'
import { useSharedAudio } from '@/lib/useSharedAudio'
import { POEM_CREDIT } from '@/content/poems/groundswell'
import GalleryNav from '@/components/GalleryNav/GalleryNav'
import styles from './SheetMedia.module.css'

/* Cloudinary keys resolve through the project's existing maps. A missing
   key returns null and the piece of media is skipped rather than rendering
   a broken box. */
const img = (k, w) => (GS_IMAGES[k] ? cloudImg(GS_IMAGES[k], w) : null)
const vid = (k, w) => (GS_VIDEOS[k] ? cloudVideo(GS_VIDEOS[k], w) : null)
const aud = (k) => (GS_AUDIO[k] ? cloudAudio(GS_AUDIO[k]) : null)

/** Exported for the sheet's lightbox registry. */
export const sheetImg = img


/**
 * A component's media, flattened into slides in reading order:
 * lead → also → stills. Audio never becomes a slide (the poem has its own
 * panel). Stills accept a bare key or { key, alt }.
 */
export function slidesFor(media = {}) {
  const out = []
  const add = (item) => {
    if (!item || item.type === 'audio') return
    const type = item.type || 'image'
    const src = type === 'video' ? vid(item.key, 1600) : img(item.key, 1800)
    if (!src) return
    out.push({ key: item.key, type, alt: item.alt || '', src, blur: item.blur || false, focus: item.focus })
  }
  add(media.lead)
  media.also?.forEach(add)
  media.stills?.forEach((s) => add(typeof s === 'string' ? { key: s } : s))
  return out
}

/**
 * THE STAGE — one artifact at a time, at its true proportions.
 *
 * Replaces the lead-plus-cropped-pair ("bento"). Every image and video
 * sits whole inside one fixed mat, letterboxed on a quiet ground rather
 * than cropped to fit a cell, so a portrait photo and a screen recording
 * can share the same frame without either being cut. Square corners: the
 * work is the object; the frame should not be decorated.
 *
 * Paged with the site's one gallery control (GalleryNav: circle arrows at
 * the ends, dots in the middle, her note FS44); the arrow keys work while
 * focus is anywhere in the gallery. A public image also opens into the
 * sheet-wide overlay.
 */
export function SheetStage({ slides, gated, onImage, label, fit }) {
  const [at, setAt] = useState(0)
  const n = slides.length
  const go = useCallback((d) => setAt((i) => (i + d + n) % n), [n])

  if (!n) return null
  const s = slides[at]

  const onKey = (e) => {
    if (n < 2) return
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  const mediaEl = s.type === 'video' ? (
    <video key={s.key} src={s.src} muted loop playsInline autoPlay preload="metadata"
      aria-label={s.alt} className={styles.stageMedia} data-blur={s.blur || undefined}
      style={typeof s.blur === 'number' ? { '--data-blur': `${s.blur}px` } : undefined} />
  ) : (
    <img key={s.key} src={s.src} alt={onImage && !gated ? '' : s.alt}
      className={styles.stageMedia} data-blur={s.blur || undefined}
      /* where a cover crop anchors (FS161): faces stay in frame */
      style={s.focus ? { objectPosition: s.focus } : undefined} />
  )

  return (
    <div
      className={styles.stage}
      data-gated={gated || undefined}
      role="group"
      aria-roledescription="gallery"
      aria-label={label}
      onKeyDown={onKey}
    >
      <div className={styles.mat} data-fit={fit || undefined}>
        {s.type === 'image' && onImage && !gated ? (
          <button type="button" className={styles.matButton}
            onClick={(e) => onImage(s.key, e.currentTarget)}
            aria-label={s.alt ? `View full screen: ${s.alt}` : 'View full screen'}>
            {mediaEl}
          </button>
        ) : mediaEl}
      </div>

      {/* The frame's footer (FS130): the caption and the controls are part
          of the gallery's structure, not text left under it. */}
      <div className={styles.stageBar}>
        <p className={styles.caption} aria-live="polite">
          {n > 1 && (
            <span className={styles.counter}>
              {String(at + 1).padStart(2, '0')}
              <span aria-hidden="true"> / </span>
              <span className={styles.srOnly}> of </span>
              {String(n).padStart(2, '0')}
            </span>
          )}
          <span className={styles.captionText}>{s.alt}</span>
        </p>
        <GalleryNav
          className={styles.stageNav}
          count={n}
          index={at}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onSelect={setAt}
          label={label}
        />
      </div>
    </div>
  )
}

const fmt = (t) => {
  if (!Number.isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  return `${m}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

/**
 * THE PHONE — the digital library as staff used it (FS144): the screen
 * recording, looping while on screen, nothing more. Playback of the
 * recordings lives in the text column's audio bars, so the phone never
 * shows more than the real experience offered.
 */
function SheetPhone({ phone, bare }) {
  const videoRef = useRef(null)
  const videoSrc = phone && vid(phone.key, 720)

  useEffect(() => {
    const v = videoRef.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  if (!videoSrc) return null
  return (
    <figure className={styles.phone}>
      <div className={styles.device}>
        <div className={styles.screen}>
          <video ref={videoRef} src={`${videoSrc}#t=0.1`} muted loop playsInline
            preload="metadata" className={styles.screenVideo} aria-label={phone.alt} />
        </div>
      </div>
      {!bare && (
        <figcaption className={styles.cardCaption}>
          <span className={styles.cardLabel}>The digital library</span>
        </figcaption>
      )}
    </figure>
  )
}

/**
 * AUDIO BARS — the two recordings as plain players (FS144): a real play
 * button with a pressed state, the title and what it is, a native range
 * for seeking, and the time. Wired into the page-wide single-play system,
 * so starting one pauses the other.
 */
function AudioBar({ item }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  useSharedAudio(audioRef, item.title)
  const src = aud(item.key)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const on = {
      timeupdate: () => setTime(a.currentTime),
      loadedmetadata: () => setDur(a.duration),
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      ended: () => setPlaying(false),
    }
    Object.entries(on).forEach(([k, f]) => a.addEventListener(k, f))
    return () => Object.entries(on).forEach(([k, f]) => a.removeEventListener(k, f))
  }, [])

  if (!src) return null
  const toggle = () => { const a = audioRef.current; if (a) a.paused ? a.play() : a.pause() }
  const pct = dur ? (time / dur) * 100 : 0

  return (
    <div className={styles.audioBar} data-playing={playing || undefined}>
      <button type="button" className={styles.barPlay} onClick={toggle}
        aria-pressed={playing} aria-label={playing ? `Pause ${item.title}` : `Play ${item.title}`}>
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6.5" y="5" width="3.5" height="14" rx="0.5" />
            <rect x="14" y="5" width="3.5" height="14" rx="0.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6L19 12z" /></svg>
        )}
      </button>
      <div className={styles.barMeta}>
        <span className={styles.barTitle}>{item.title}</span>
        <span className={styles.barKind}>{item.kind}</span>
        <div className={styles.barTrack}>
          <input type="range" className={styles.seek} min={0} max={dur || 0} step={0.1} value={time}
            onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = +e.target.value }}
            aria-label={`Seek ${item.title}`} aria-valuetext={`${fmt(time)} of ${fmt(dur)}`}
            style={{ '--pct': `${pct}%` }} />
          <span className={styles.barTime}>{fmt(time)} / {dur ? fmt(dur) : '–:––'}</span>
        </div>
      </div>
      <audio ref={audioRef} preload="metadata" src={src} />
    </div>
  )
}

export function SheetAudioBars({ items = [] }) {
  if (!items.length) return null
  return (
    <div className={styles.audioBars}>
      <span className={styles.barsLabel}>Listen</span>
      {items.map((it) => <AudioBar key={it.key} item={it} />)}
      {items.some((it) => it.key === 'gs-poem-remember') && (
        <p className={styles.barsCredit}>{POEM_CREDIT}</p>
      )}
    </div>
  )
}

/**
 * THE DECK — a triptych: a reflection card either side of the phone.
 *
 * Nine emotions exist; three are shown, spanning the deck's range, at the
 * cards' true proportions. Each card carries a front and a back, and the
 * back is where the somatic exercise and the conversation starter live, so
 * the flip is the content and not an effect. Click or Enter flips. Reduced
 * motion swaps faces without the rotation. The rounded corners stay: they
 * are the printed cards' real corners, and the poem card borrows them.
 */
export function SheetCardGallery({ gallery, phone }) {
  const [flipped, setFlipped] = useState(() => new Set())
  const deckRef = useRef(null)
  const [hint, setHint] = useState(false)

  /* One slow half-turn of each card the first time the row scrolls into
     view, so people see the cards move (FS144). Once, and never under
     reduced motion. */
  useEffect(() => {
    const el = deckRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      setHint(true)
      setTimeout(() => setHint(false), 1600)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toggle = (name) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  const cards = (gallery?.emotions || [])
    .map((name) => ({
      name,
      front: GS_CARDS[`${name}-front`] && cloudImg(GS_CARDS[`${name}-front`], 800),
      back: GS_CARDS[`${name}-back`] && cloudImg(GS_CARDS[`${name}-back`], 800),
    }))
    .filter((c) => c.front)

  if (!cards.length && !phone) return null

  /* The phone sits in the middle of the cards: with two cards, a triptych. */
  const items = cards.map((card) => ({ kind: 'card', card }))
  if (phone) items.splice(Math.floor(items.length / 2), 0, { kind: 'phone' })

  return (
    <div className={styles.gallery}>
      {cards.length > 0 && (
        <p className={styles.galleryNote}>
          {gallery.note || 'Turn a card over for the somatic exercise.'}
        </p>
      )}
      <div className={styles.deck} style={{ '--deck': items.length }}>
        {items.map((it) => {
          if (it.kind === 'phone') {
            return (
              <div key="phone" className={styles.deckItem} data-kind="phone">
                <SheetPhone phone={phone} />
              </div>
            )
          }
          const { card } = it
          const isBack = flipped.has(card.name)
          return (
            <div key={card.name} className={styles.deckItem} data-kind="card">
              <button
                type="button"
                className={styles.card}
                data-back={isBack}
                aria-pressed={isBack}
                onClick={() => toggle(card.name)}
              >
                <span className={styles.cardInner}>
                  <img className={styles.cardFace} src={card.front}
                    alt={`Reflection card: ${card.name}, front`} loading="lazy" />
                  {card.back && (
                    <img className={`${styles.cardFace} ${styles.cardBack}`} src={card.back}
                      alt={`Reflection card: ${card.name}, back`} loading="lazy" />
                  )}
                </span>
                <span className={styles.cardCaption}>
                  <span className={styles.cardLabel}>{card.name}</span>
                  <span className={styles.turnCue} aria-hidden="true">
                    <svg viewBox="0 0 16 16"><path d="M3 8a5 5 0 0 1 8.5-3.5M13 3v2.5h-2.5M13 8a5 5 0 0 1-8.5 3.5M3 13v-2.5h2.5" /></svg>
                    {isBack ? 'Turn back' : 'Turn over'}
                  </span>
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * THE LIBRARY, IN TWO FRAMES (FS149): the same framed object as every
 * gallery on the sheet, as a matched pair.
 *
 *   The phone: the screen recording of the library as staff used it, on
 *   the mat; in the footer, the two recordings as plain players.
 *   The cards: one reflection card at a time, large; in the footer, its
 *   name, a "Turn over" button, and the gallery controls through the deck.
 */
export function SheetLibraryKit({ phone, listen = [], emotions = [] }) {
  return (
    <div className={styles.kit}>
      {phone && (
        <figure className={`${styles.stage} ${styles.kitFrame}`}>
          <div className={`${styles.mat} ${styles.kitMat}`}>
            <SheetPhone phone={phone} bare />
          </div>
          <figcaption className={styles.kitBar}>
            <span className={styles.kitTitle}>The digital library, as staff used it</span>
            {listen.map((it) => <AudioBar key={it.key} item={it} />)}
            {listen.some((it) => it.key === 'gs-poem-remember') && (
              <span className={styles.barsCredit}>{POEM_CREDIT}</span>
            )}
          </figcaption>
        </figure>
      )}
      {emotions.length > 0 && <CardStage emotions={emotions} />}
    </div>
  )
}

function CardStage({ emotions }) {
  const cards = emotions
    .map((name) => ({
      name,
      front: GS_CARDS[`${name}-front`] && cloudImg(GS_CARDS[`${name}-front`], 900),
      back: GS_CARDS[`${name}-back`] && cloudImg(GS_CARDS[`${name}-back`], 900),
    }))
    .filter((c) => c.front && c.back)
  const [at, setAt] = useState(0)
  const [back, setBack] = useState(false)
  const n = cards.length
  const go = (i) => { setAt((i + n) % n); setBack(false) }
  if (!n) return null
  const c = cards[at]
  /* The fan (FS152): each card's place is its distance from the front
     card: 0 = front and centre, 1 = fanned right, n-1 = fanned left, the
     rest tucked behind. */
  const rel = (i) => {
    const r = (i - at + n) % n
    return r === 0 ? 'front' : r === 1 ? 'right' : r === n - 1 ? 'left' : 'behind'
  }
  return (
    <div className={`${styles.stage} ${styles.kitFrame}`} role="group"
      aria-roledescription="card deck" aria-label="Groundswell Reflection Cards"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1) }
      }}>
      <div className={`${styles.mat} ${styles.kitMat} ${styles.fanMat}`}>
        {cards.map((card, i) => {
          const place = rel(i)
          const isFront = place === 'front'
          return (
            <button key={card.name} type="button" className={styles.fanCard}
              data-place={place} data-back={isFront && back ? '' : undefined}
              tabIndex={isFront ? 0 : -1}
              onClick={() => (isFront ? setBack((b) => !b) : go(i))}
              aria-pressed={isFront ? back : undefined}
              aria-hidden={isFront ? undefined : true}
              aria-label={isFront ? `Reflection card: ${card.name}, ${back ? 'back' : 'front'}. Turn over.` : undefined}>
              <span className={styles.kitCardInner}>
                <img className={styles.kitFace} src={card.front} alt="" />
                <img className={`${styles.kitFace} ${styles.kitBack}`} src={card.back} alt="" />
              </span>
            </button>
          )
        })}
      </div>
      <div className={styles.fanBar}>
        <span className={styles.kitTitle}>The reflection cards</span>
        <p className={styles.fanCaption} aria-live="polite">
          <span className={styles.counter}>
            {String(at + 1).padStart(2, '0')}<span aria-hidden="true"> / </span>
            <span className={styles.srOnly}> of </span>{String(n).padStart(2, '0')}
          </span>
          <span className={styles.kitName}>{c.name}</span>
          <span>{back ? 'The somatic exercise and a conversation starter.' : 'The card’s front.'}</span>
        </p>
        <div className={styles.fanControls}>
          <button type="button" className={styles.fanArrow} onClick={() => go(at - 1)} aria-label="Previous card">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 6 L8 12 L14 18" /></svg>
          </button>
          <button type="button" className={styles.turnButton} onClick={() => setBack((b) => !b)} aria-pressed={back}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8a5 5 0 0 1 8.5-3.5M13 3v2.5h-2.5M13 8a5 5 0 0 1-8.5 3.5M3 13v-2.5h2.5" /></svg>
            {back ? 'Turn back' : 'Turn over'}
          </button>
          <button type="button" className={styles.fanArrow} onClick={() => go(at + 1)} aria-label="Next card">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6 L16 12 L10 18" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
