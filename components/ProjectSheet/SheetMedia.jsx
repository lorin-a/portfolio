'use client'

import { useRef, useState } from 'react'
import { cloudImg, cloudVideo, cloudAudio, GS_IMAGES, GS_VIDEOS, GS_AUDIO, GS_CARDS } from '@/lib/cloudinary'
import { useSharedAudio } from '@/lib/useSharedAudio'
import styles from './SheetMedia.module.css'

/* Cloudinary keys resolve through the project's existing maps. A missing
   key returns null and the piece of media is skipped rather than rendering
   a broken box. */
const img = (k, w) => (GS_IMAGES[k] ? cloudImg(GS_IMAGES[k], w) : null)
const vid = (k, w) => (GS_VIDEOS[k] ? cloudVideo(GS_VIDEOS[k], w) : null)
const aud = (k) => (GS_AUDIO[k] ? cloudAudio(GS_AUDIO[k]) : null)

/**
 * The poem, as a player rather than a picture.
 *
 * Wired into the page-wide single-play system via useSharedAudio, so
 * starting this pauses any other audio on the page and vice versa. Styled
 * for the sheet rather than reusing the /groundswell player, which carries
 * that page's stylesheet.
 */
export function SheetAudio({ item }) {
  const audioRef = useRef(null)
  useSharedAudio(audioRef, item.title)
  const src = aud(item.key)
  if (!src) return null

  return (
    <figure className={styles.audio}>
      <figcaption className={styles.audioHead}>
        <span className={styles.audioKind}>Listen</span>
        <span className={styles.audioTitle}>{item.title}</span>
      </figcaption>
      {/* Native controls: keyboard-operable and screen-reader labelled for
          free, and a bespoke transport would be craft for its own sake. */}
      <audio ref={audioRef} controls preload="none" className={styles.audioEl}>
        <source src={src} type="audio/mpeg" />
      </audio>
    </figure>
  )
}

/**
 * The reflection cards, as a set.
 *
 * Nine emotions exist; four are shown. Each card carries a front and a
 * back, and the back is where the somatic exercise and the conversation
 * starter live, so the flip is the content and not an effect. Click or
 * Enter flips. Reduced motion swaps faces without the rotation.
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
      front: GS_CARDS[`${name}-front`] && cloudImg(GS_CARDS[`${name}-front`], 600),
      back: GS_CARDS[`${name}-back`] && cloudImg(GS_CARDS[`${name}-back`], 600),
    }))
    .filter((c) => c.front)

  if (!cards.length) return null

  return (
    <div className={styles.gallery}>
      <p className={styles.galleryNote}>
        Four of nine cards. Turn one over for the somatic exercise.
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

/** One lead artifact: video, image, or the audio player. */
export function SheetLead({ item, gated }) {
  if (item.type === 'audio') return <SheetAudio item={item} />

  const src = item.type === 'video' ? vid(item.key, 1400) : img(item.key, 1400)
  if (!src) return null

  return (
    <figure className={styles.lead}>
      <div className={gated ? `${styles.box} ${styles.boxGated}` : styles.box}>
        {item.type === 'video' ? (
          <video src={src} muted loop playsInline preload="metadata"
            autoPlay aria-label={item.alt} className={styles.media} />
        ) : (
          <img src={src} alt={item.alt || ''} className={styles.media} loading="lazy" />
        )}
      </div>
      {item.alt && <figcaption>{item.alt}</figcaption>}
    </figure>
  )
}

/** Supporting stills beneath the lead. */
export function SheetStills({ keys = [], gated }) {
  const items = keys.map((k) => ({ k, src: img(k, 800) })).filter((i) => i.src)
  if (!items.length) return null
  return (
    <div className={styles.stills}>
      {items.map(({ k, src }) => (
        <figure key={k}>
          <div className={gated ? `${styles.box} ${styles.boxGated}` : styles.box}>
            <img src={src} alt="" className={styles.media} loading="lazy" />
          </div>
        </figure>
      ))}
    </div>
  )
}
