'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cloudImg, cloudVideo, cloudAudio,
  GS_IMAGES, GS_VIDEOS, GS_AUDIO, GS_CARDS,
} from '@/lib/cloudinary'
import { useSharedAudio } from '@/lib/useSharedAudio'
import { POEM_OPENER, POEM_STANZAS, POEM_CREDIT } from '@/content/poems/groundswell'
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
    out.push({ key: item.key, type, alt: item.alt || '', src })
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
export function SheetStage({ slides, gated, onImage, label }) {
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
      aria-label={s.alt} className={styles.stageMedia} />
  ) : (
    <img key={s.key} src={s.src} alt={onImage && !gated ? '' : s.alt}
      className={styles.stageMedia} />
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
      <div className={styles.mat}>
        {s.type === 'image' && onImage && !gated ? (
          <button type="button" className={styles.matButton}
            onClick={(e) => onImage(s.key, e.currentTarget)}
            aria-label={s.alt ? `View full screen: ${s.alt}` : 'View full screen'}>
            {mediaEl}
          </button>
        ) : mediaEl}
      </div>

      <GalleryNav
        className={styles.stageNav}
        count={n}
        index={at}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onSelect={setAt}
        label={label}
      />

      {s.alt && <p className={styles.caption} aria-live="polite">{s.alt}</p>}
    </div>
  )
}

const fmt = (t) => {
  if (!Number.isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  return `${m}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

/**
 * THE PHONE — the digital library, with the poem playing inside it.
 *
 * Her note FS47. The poem is an item in the digital library (the recording
 * shows it on the library's meditations page), so rather than a card of
 * its own it plays inside the phone. At rest the screen auto-plays the real
 * iPhone recording of the library. A now-playing bar sits at the foot of
 * the screen, the way a phone's own mini-player does; press play and the
 * screen turns to the poem's words, which scroll with the recording. Pause
 * and it returns to the library.
 *
 * The recording plays only while on screen, and not at all under reduced
 * motion (tap the screen to play it). Transport is a real button with a
 * pressed state plus a native range input, wired into the page-wide
 * single-play audio system.
 */
function SheetPhone({ phone, poem }) {
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const textRef = useRef(null)
  const inViewRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  useSharedAudio(audioRef, poem?.title || 'Poem')

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const poemPlaying = () => audioRef.current ? !audioRef.current.paused : false
  const videoSrc = phone && vid(phone.key, 720)
  const audioSrc = poem && aud(poem.key)

  /* The library recording plays while the phone is on screen. */
  useEffect(() => {
    const v = videoRef.current
    if (!v || reduced()) return
    const io = new IntersectionObserver(([en]) => {
      inViewRef.current = en.isIntersecting
      if (en.isIntersecting && !poemPlaying()) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      setTime(a.currentTime)
      const box = textRef.current
      if (box && a.duration) {
        box.scrollTop = (box.scrollHeight - box.clientHeight) * (a.currentTime / a.duration)
      }
    }
    const onMeta = () => setDur(a.duration)
    const onPlay = () => { setPlaying(true); videoRef.current?.pause() }
    const onPause = () => {
      setPlaying(false)
      if (inViewRef.current && !reduced()) videoRef.current?.play().catch(() => {})
    }
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onPause)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onPause)
    }
  }, [])

  if (!videoSrc && !audioSrc) return null

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    a.paused ? a.play() : a.pause()
  }
  const toggleVideo = () => {
    const v = videoRef.current
    if (!v || playing) return
    v.paused ? v.play().catch(() => {}) : v.pause()
  }
  const pct = dur ? (time / dur) * 100 : 0

  return (
    <figure className={styles.phone} data-playing={playing || undefined}>
      <div className={styles.device}>
        <div className={styles.screen}>
          {videoSrc && (
            <video ref={videoRef} src={`${videoSrc}#t=0.1`} muted loop playsInline
              preload="metadata" className={styles.screenVideo}
              aria-label={phone.alt} onClick={toggleVideo} />
          )}

          {audioSrc && (
            <div ref={textRef} className={styles.lyrics} tabIndex={playing ? 0 : -1}
              aria-hidden={!playing} aria-label={`${poem.title}, words`}>
              <p className={styles.lyricsOpener}>{POEM_OPENER}</p>
              {POEM_STANZAS.map((st, i) => (
                <p key={i} className={styles.lyricsStanza}>
                  {st.map((line, j) => (
                    <span key={j}>{line}{j < st.length - 1 && <br />}</span>
                  ))}
                </p>
              ))}
            </div>
          )}

          {audioSrc && (
            <div className={styles.mini}>
              <button type="button" className={styles.miniPlay} onClick={toggle}
                aria-pressed={playing}
                aria-label={playing ? `Pause ${poem.title}` : `Play ${poem.title}`}>
                <span className={styles.miniDisc}>
                  {playing ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="6.5" y="5" width="3.5" height="14" rx="0.5" />
                      <rect x="14" y="5" width="3.5" height="14" rx="0.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6L19 12z" /></svg>
                  )}
                </span>
              </button>
              <div className={styles.miniMeta}>
                <span className={styles.miniTitle} aria-hidden="true">
                  {playing || time > 0 ? `${fmt(time)} / ${fmt(dur)}` : 'The poem'}
                </span>
                <input
                  type="range"
                  className={styles.miniSeek}
                  min={0}
                  max={dur || 0}
                  step={0.1}
                  value={time}
                  onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = +e.target.value }}
                  aria-label={`Seek ${poem.title}`}
                  aria-valuetext={`${fmt(time)} of ${fmt(dur)}`}
                  style={{ '--pct': `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <figcaption className={styles.cardCaption}>
        <span className={styles.cardLabel}>The digital library</span>
        {audioSrc && <span className={styles.poemCredit}>{POEM_CREDIT}</span>}
      </figcaption>

      {audioSrc && <audio ref={audioRef} preload="metadata" src={audioSrc} />}
    </figure>
  )
}

/**
 * THE DECK — the phone, then the reflection cards, in one row.
 *
 * Nine emotions exist; three are shown, spanning the deck's range, at the
 * cards' true proportions. Each card carries a front and a back, and the
 * back is where the somatic exercise and the conversation starter live, so
 * the flip is the content and not an effect. Click or Enter flips. Reduced
 * motion swaps faces without the rotation. The rounded corners stay: they
 * are the printed cards' real corners, and the poem card borrows them.
 */
export function SheetCardGallery({ gallery, poem, phone }) {
  const [flipped, setFlipped] = useState(() => new Set())

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

  if (!cards.length && !poem && !phone) return null

  return (
    <div className={styles.gallery}>
      <div className={styles.deck} data-poem={poem || phone ? '' : undefined}
        style={{ '--deck': cards.length + (poem || phone ? 1 : 0) }}>
        {(poem || phone) && <SheetPhone phone={phone} poem={poem} />}
        {cards.length > 0 && (
          <p className={styles.galleryNote}>
            Three of nine cards. Turn one over for the somatic exercise.
          </p>
        )}
        <ul className={styles.cards}>
        {cards.map((card) => {
          const isBack = flipped.has(card.name)
          return (
            <li key={card.name}>
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
                </span>
              </button>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

/** The cover image beside the title. Opens into the overlay. */
export function SheetHero({ item, onImage }) {
  const src = item && img(item.key, 2000)
  if (!src) return null
  return (
    <button type="button" className={styles.hero}
      onClick={(e) => onImage?.(item.key, e.currentTarget)}
      aria-label={`View full screen: ${item.alt}`}>
      <img src={src} alt="" className={styles.heroImg} />
    </button>
  )
}

/**
 * THE FILMSTRIP — the team, at the bottom.
 *
 * One height, every photo at its own width, nothing cropped: a contact
 * strip rather than a grid of identical squares. It runs the folder's full
 * width and scrolls sideways (trackpad, drag, arrows, or keyboard), with
 * the edges of the next photo always showing so the row says "more."
 */
export function SheetFilmstrip({ bts, onImage }) {
  const rowRef = useRef(null)
  const [at, setAt] = useState(0)

  const items = (bts.images || [])
    .map((i) => ({ ...i, src: img(i.key, 1200) }))
    .filter((i) => i.src)

  /* The dot follows whichever photo sits at the strip's left edge. At the
     very end the last photo may never reach the edge, so the end of the
     scroll counts as the last photo. */
  const sync = useCallback(() => {
    const r = rowRef.current
    if (!r) return
    if (r.scrollLeft + r.clientWidth >= r.scrollWidth - 4) { setAt(r.children.length - 1); return }
    const pad = parseFloat(getComputedStyle(r).paddingLeft) || 0
    let best = 0, dist = Infinity
    ;[...r.children].forEach((li, i) => {
      const d = Math.abs(li.offsetLeft - pad - r.scrollLeft)
      if (d < dist) { dist = d; best = i }
    })
    setAt(best)
  }, [])

  const goTo = useCallback((i) => {
    const r = rowRef.current
    if (!r) return
    const n = r.children.length
    const li = r.children[(i + n) % n]
    const pad = parseFloat(getComputedStyle(r).paddingLeft) || 0
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    r.scrollTo({ left: li.offsetLeft - pad, behavior: smooth ? 'smooth' : 'auto' })
    setAt((i + n) % n)
  }, [])

  if (!items.length) return null

  return (
    <section className={styles.strip} data-reveal="0" aria-label={bts.title}>
      <h3 className={styles.stripTitle}>{bts.title}</h3>
      <ul ref={rowRef} className={styles.stripRow} onScroll={sync}>
        {items.map((i) => (
          <li key={i.key} className={styles.stripItem}>
            <button type="button" className={styles.stripButton}
              onClick={(e) => onImage?.(i.key, e.currentTarget)}
              aria-label={`View full screen: ${i.alt}`}>
              <img src={i.src} alt="" className={styles.stripImg} loading="lazy" />
            </button>
            <p className={styles.stripCaption}>{i.alt}</p>
          </li>
        ))}
      </ul>
      <GalleryNav
        className={styles.stageNav}
        count={items.length}
        index={at}
        onPrev={() => goTo(at - 1)}
        onNext={() => goTo(at + 1)}
        onSelect={goTo}
        label={bts.title}
      />
    </section>
  )
}
