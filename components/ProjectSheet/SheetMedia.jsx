'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cloudImg, cloudVideo, cloudVideoPoster, cloudAudio,
  GS_IMAGES, GS_VIDEOS, GS_AUDIO, GS_CARDS,
} from '@/lib/cloudinary'
import { useSharedAudio } from '@/lib/useSharedAudio'
import { POEM_OPENER, POEM_STANZAS, POEM_CREDIT } from '@/content/poems/groundswell'
import styles from './SheetMedia.module.css'

/* Cloudinary keys resolve through the project's existing maps. A missing
   key returns null and the piece of media is skipped rather than rendering
   a broken box. */
const img = (k, w) => (GS_IMAGES[k] ? cloudImg(GS_IMAGES[k], w) : null)
const vid = (k, w) => (GS_VIDEOS[k] ? cloudVideo(GS_VIDEOS[k], w) : null)
const poster = (k, w) => (GS_VIDEOS[k] ? cloudVideoPoster(GS_VIDEOS[k], w) : null)
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
    const thumb = type === 'video' ? poster(item.key, 240) : img(item.key, 240)
    out.push({ key: item.key, type, alt: item.alt || '', src, thumb })
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
 * Arrows, a numbered counter, and a thumbnail rail page through it; the
 * arrow keys work while focus is anywhere in the gallery. A public image
 * also opens into the sheet-wide overlay.
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
          {s.alt && <span className={styles.captionText}>{s.alt}</span>}
        </p>
        {n > 1 && (
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)}
              aria-label="Previous">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
            </button>
            <button type="button" className={styles.arrow} onClick={() => go(1)}
              aria-label="Next">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
            </button>
          </div>
        )}
      </div>

      {n > 1 && (
        <ul className={styles.thumbs}>
          {slides.map((t, i) => (
            <li key={t.key}>
              <button type="button" className={styles.thumb}
                aria-current={i === at ? 'true' : undefined}
                aria-label={`Show ${i + 1} of ${n}${t.type === 'video' ? ', video' : ''}`}
                onClick={() => setAt(i)}>
                {t.thumb && <img src={t.thumb} alt="" loading="lazy" />}
                {t.type === 'video' && (
                  <svg className={styles.thumbPlay} viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M5 3.5v9l7.5-4.5z" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const fmt = (t) => {
  if (!Number.isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  return `${m}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}

/**
 * THE POEM — a listening room, not a line.
 *
 * The recording is one of the project's central pieces, so it takes a full
 * band of the sheet: the opening line set large as the invitation, a real
 * play control you cannot miss, and the poem's own text beside it, which
 * scrolls with the recording while it plays (the same linear follow the
 * homepage intro uses, since there are no per-stanza timestamps yet).
 *
 * Custom transport over a hidden <audio>: the play button is a real button
 * with a pressed state, and seeking is a native range input, so keyboard
 * and screen-reader users get both for free. Wired into the page-wide
 * single-play system, so starting it pauses any other audio.
 */
export function SheetPoem({ item }) {
  const audioRef = useRef(null)
  const textRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  useSharedAudio(audioRef, item.title)
  const src = aud(item.key)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => {
      setTime(a.currentTime)
      const box = textRef.current
      if (box && a.duration) {
        const max = box.scrollHeight - box.clientHeight
        box.scrollTop = max * (a.currentTime / a.duration)
      }
    }
    const onMeta = () => setDur(a.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
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

  if (!src) return null

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    a.paused ? a.play() : a.pause()
  }
  const pct = dur ? (time / dur) * 100 : 0

  return (
    <figure className={styles.poem} data-playing={playing || undefined}>
      <div className={styles.poemLead}>
        <figcaption className={styles.poemKicker}>Listen · {item.title}</figcaption>
        <p className={styles.poemOpener}>{POEM_OPENER}</p>

        <div className={styles.transport}>
          <button type="button" className={styles.play} onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? `Pause ${item.title}` : `Play ${item.title}`}>
            {playing ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6.5" y="5" width="3.5" height="14" rx="0.5" />
                <rect x="14" y="5" width="3.5" height="14" rx="0.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6L19 12z" /></svg>
            )}
          </button>
          <div className={styles.track}>
            <input
              type="range"
              className={styles.seek}
              min={0}
              max={dur || 0}
              step={0.1}
              value={time}
              onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = +e.target.value }}
              aria-label={`Seek ${item.title}`}
              aria-valuetext={`${fmt(time)} of ${fmt(dur)}`}
              style={{ '--pct': `${pct}%` }}
            />
            <span className={styles.time}>
              {fmt(time)} <span aria-hidden="true">/</span> {dur ? fmt(dur) : '–:––'}
            </span>
          </div>
        </div>

        <p className={styles.poemCredit}>{POEM_CREDIT}</p>
      </div>

      <div ref={textRef} className={styles.poemText} tabIndex={0}
        aria-label={`${item.title}, full text`}>
        {/* The opener is the large line at left; the text continues from it. */}
        {POEM_STANZAS.map((st, i) => (
          <p key={i} className={styles.stanza}>
            {st.map((line, j) => (
              <span key={j}>{line}{j < st.length - 1 && <br />}</span>
            ))}
          </p>
        ))}
      </div>

      <audio ref={audioRef} preload="metadata" src={src} />
    </figure>
  )
}

/**
 * The reflection cards, as a contrasting row.
 *
 * Nine emotions exist; three are shown, spanning the deck's range, at the
 * cards' true proportions. Each card carries a front and a back, and the
 * back is where the somatic exercise and the conversation starter live, so
 * the flip is the content and not an effect. Click or Enter flips. Reduced
 * motion swaps faces without the rotation. The rounded corners stay: they
 * are the printed cards' real corners.
 */
export function SheetCardGallery({ gallery }) {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (name) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  const cards = gallery.emotions
    .map((name) => ({
      name,
      front: GS_CARDS[`${name}-front`] && cloudImg(GS_CARDS[`${name}-front`], 800),
      back: GS_CARDS[`${name}-back`] && cloudImg(GS_CARDS[`${name}-back`], 800),
    }))
    .filter((c) => c.front)

  if (!cards.length) return null

  return (
    <div className={styles.gallery}>
      <p className={styles.galleryNote}>
        Three of nine cards. Turn one over for the somatic exercise.
      </p>
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
                <span className={styles.cardLabel}>{card.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
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
  const [edge, setEdge] = useState({ start: true, end: false })

  const items = (bts.images || [])
    .map((i) => ({ ...i, src: img(i.key, 1200) }))
    .filter((i) => i.src)

  const sync = useCallback(() => {
    const r = rowRef.current
    if (!r) return
    setEdge({ start: r.scrollLeft < 4, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 4 })
  }, [])

  useEffect(() => { sync() }, [sync])

  if (!items.length) return null

  const page = (d) => {
    const r = rowRef.current
    if (!r) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    r.scrollBy({ left: d * r.clientWidth * 0.8, behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <section className={styles.strip} data-reveal="0" aria-label={bts.title}>
      <div className={styles.stripHead}>
        <h3 className={styles.stripTitle}>{bts.title}</h3>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => page(-1)}
            disabled={edge.start} aria-label="Scroll back">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
          </button>
          <button type="button" className={styles.arrow} onClick={() => page(1)}
            disabled={edge.end} aria-label="Scroll forward">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        </div>
      </div>
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
    </section>
  )
}
