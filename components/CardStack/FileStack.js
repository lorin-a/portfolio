'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './FileStack.module.css'
import MobileCardStack from './MobileCardStack'
import GatedOverlay from './GatedOverlay'

gsap.registerPlugin(useGSAP)

/**
 * FileStack — portfolio teaser carousel.
 *
 * Wireframe folder cards with tabs on TOP at fixed x-slots.
 * Active card sits forward; its body is filled (with media at 16:9
 * inside, no internal title — the tab carries the label). Receded
 * cards translate UP and BACK so their tabs stair-step above the
 * active card's tab. Cyclic depth ordering keeps the visual stair
 * consistent regardless of which card is active.
 *
 * Click choreography ~450ms: target lifts forward (two-beat soft
 * settle), others animate to their new cyclic depths, media
 * crossfades.
 */

/* ====== silhouette geometry ============================== */

/* ViewBox: body 1600 wide × 1100 tall (1600 body + 132 tab area).
   Tab takes ~12% of total height. Stack box is body-only (16:9);
   the SVG extends above by tab-overflow via top:-12%. */
const VB_W = 1600
const VB_TAB_H = 64
/* Body is intentionally taller than 16:9 so a 16:9 matte fits
   inside with matte-insets + gallery-nav strip. */
const VB_BODY_H = 1036
const VB_H = VB_BODY_H + VB_TAB_H  // 1100 — matches CSS aspect-ratio 1600/1100

const BODY_RADIUS = 16
const TAB_PAD_PCT = 0.04

function tabBounds(slotIndex, slotCount) {
  const slotW = VB_W / slotCount
  const tabPad = slotW * TAB_PAD_PCT
  /* Radii scale to the tighter tab geometry — small enough that
     they don't dominate the silhouette, large enough that the
     tab→body junctions still feel like cardstock. */
  const tabRadRaw = Math.min(18, Math.max(8, slotW * 0.04))
  const junctionRad = Math.min(20, Math.max(10, VB_TAB_H * 0.32))
  const minLeft = BODY_RADIUS + junctionRad + 4
  const maxRight = VB_W - BODY_RADIUS - junctionRad - 4
  const tabL = Math.max(slotW * slotIndex + tabPad, minLeft)
  const tabR = Math.min(slotW * (slotIndex + 1) - tabPad, maxRight)
  const tabRad = Math.min(tabRadRaw, (tabR - tabL) / 2.5)
  return { tabL, tabR, tabRad, junctionRad }
}

/**
 * Unified silhouette: tab on top + body. Drawn clockwise from
 * tab's top-left. Tab→body junctions use Q-curves with generous
 * radii so the seam reads as cardstock, not a patched seam.
 */
function buildSilhouettePath(slotIndex, slotCount) {
  const { tabL, tabR, tabRad, junctionRad } = tabBounds(slotIndex, slotCount)
  const r = BODY_RADIUS

  return [
    `M ${tabL + tabRad} 0`,
    `L ${tabR - tabRad} 0`,
    `Q ${tabR} 0 ${tabR} ${tabRad}`,
    `L ${tabR} ${VB_TAB_H - junctionRad}`,
    /* outward sweep from tab-right into body-top */
    `Q ${tabR} ${VB_TAB_H} ${tabR + junctionRad} ${VB_TAB_H}`,
    `L ${VB_W - r} ${VB_TAB_H}`,
    `Q ${VB_W} ${VB_TAB_H} ${VB_W} ${VB_TAB_H + r}`,
    `L ${VB_W} ${VB_H - r}`,
    `Q ${VB_W} ${VB_H} ${VB_W - r} ${VB_H}`,
    `L ${r} ${VB_H}`,
    `Q 0 ${VB_H} 0 ${VB_H - r}`,
    `L 0 ${VB_TAB_H + r}`,
    `Q 0 ${VB_TAB_H} ${r} ${VB_TAB_H}`,
    `L ${tabL - junctionRad} ${VB_TAB_H}`,
    /* inward sweep from body-top up into tab-left */
    `Q ${tabL} ${VB_TAB_H} ${tabL} ${VB_TAB_H - junctionRad}`,
    `L ${tabL} ${tabRad}`,
    `Q ${tabL} 0 ${tabL + tabRad} 0`,
    'Z',
  ].join(' ')
}

/* ====== motion ========================================== */

/* Cyclic depths keep the visual stair-step consistent regardless
   of which card is active. Active card is always at depth 0
   (front, lifted). Others stair-step backward. */
const Z_STEP = 70
const Y_STEP = 26
const SCALE_STEP = 0.03

const ACTIVE_LIFT = 90
const LIFT_OVERSHOOT = 30

function restPoseFor(depth) {
  return {
    y: -depth * Y_STEP,
    z: depth === 0 ? ACTIVE_LIFT : -(depth) * Z_STEP,
    scale: 1 - depth * SCALE_STEP,
    autoAlpha: depth === 0 ? 1 : Math.max(0.78, 1 - depth * 0.08),
    rotationX: 0,
  }
}

/* ====== arrow icon ====================================== */

function ArrowOut() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 18 L18 6 M9 6 H18 V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Chevron({ dir = 'right' }) {
  const d = dir === 'left' ? 'M14 6 L8 12 L14 18' : 'M10 6 L16 12 L10 18'
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ====== component ======================================= */

export default function FileStack({
  slides = [],
  contributions = [],
  pillVariant = 'weave',
  href,
}) {
  const cardCount = Math.max(2, Math.min(slides.length, contributions.length, 15))
  const cards = slides.slice(0, cardCount).map((slide, i) => {
    const contrib = contributions[i] || {}
    /* Each card can carry a `gallery` (array of {src,type,alt}) on
       its contribution. If present, the card shows a click-through
       browser. Otherwise the card has a single image — the matching
       slide from `slides`. */
    const images = contrib.gallery && contrib.gallery.length > 0
      ? contrib.gallery
      : [slide]
    return {
      label: contrib.label || `File ${String(i + 1).padStart(2, '0')}`,
      href: contrib.href || href,
      images,
      gated: !!contrib.gated,
      gatedLabel: contrib.gatedLabel,
      gatedNote: contrib.gatedNote,
    }
  })

  const variantClass = styles[`variant${pillVariant.charAt(0).toUpperCase() + pillVariant.slice(1)}`] || styles.variantWeave

  const [activeIndex, setActiveIndex] = useState(0)
  /* One gallery position per card. Persists when switching tabs so
     returning to a card resumes where the user left off. */
  const [galleryIndices, setGalleryIndices] = useState(
    () => Array(cardCount).fill(0)
  )
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const matteRefs = useRef([])
  const videoRefs = useRef([])
  const hasRevealed = useRef(false)
  const prevActiveRef = useRef(0)

  const advanceGallery = useCallback((cardIndex, dir) => {
    setGalleryIndices(prev => {
      const next = [...prev]
      const len = cards[cardIndex].images.length
      next[cardIndex] = ((prev[cardIndex] || 0) + dir + len) % len
      return next
    })
  }, [cards])

  const setGalleryAt = useCallback((cardIndex, target) => {
    setGalleryIndices(prev => {
      const next = [...prev]
      next[cardIndex] = target
      return next
    })
  }, [])

  /* Cyclic depth: 0 = active (front, lifted), others stair-step. */
  const depthOf = useCallback(
    (i, active) => (i - active + cardCount) % cardCount,
    [cardCount]
  )

  /* On mount, pause every video except the initially active one so
     non-active tabs aren't silently looping in the background. */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v || i === activeIndex) return
      try {
        v.pause()
        v.currentTime = 0
      } catch {}
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Initial entrance — cascade in from below, back-most first. */
  useGSAP(() => {
    const container = containerRef.current
    if (!container || hasRevealed.current) return

    const allCards = cardRefs.current.filter(Boolean)
    const mattes = matteRefs.current.filter(Boolean)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      allCards.forEach((c, i) => gsap.set(c, restPoseFor(depthOf(i, activeIndex))))
      mattes.forEach((m, i) => gsap.set(m, { autoAlpha: i === activeIndex ? 1 : 0 }))
      hasRevealed.current = true
      return
    }

    allCards.forEach(c => {
      gsap.set(c, { y: 100, z: -300, scale: 0.92, rotationX: 5, autoAlpha: 0 })
    })
    mattes.forEach(m => gsap.set(m, { autoAlpha: 0 }))

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRevealed.current) return
      hasRevealed.current = true

      const tl = gsap.timeline({ delay: 0.18 })

      const ordered = allCards
        .map((c, i) => ({ c, i, d: depthOf(i, activeIndex) }))
        .sort((a, b) => b.d - a.d)

      ordered.forEach((item, k) => {
        tl.to(item.c, {
          ...restPoseFor(item.d),
          duration: 0.95,
          ease: 'power3.out',
        }, k * 0.13)
      })

      const activeMatte = mattes[activeIndex]
      if (activeMatte) {
        tl.to(activeMatte, {
          autoAlpha: 1,
          duration: 0.55,
          ease: 'power2.out',
        }, '-=0.4')
      }

      observer.disconnect()
    }, { threshold: 0.3 })

    observer.observe(container)
    return () => observer.disconnect()
  }, { scope: containerRef })

  /* Active change — soft-settle lift on incoming, calm recede on others. */
  useEffect(() => {
    if (!hasRevealed.current) return
    const oldActive = prevActiveRef.current
    if (oldActive === activeIndex) return
    prevActiveRef.current = activeIndex

    const allCards = cardRefs.current
    const mattes = matteRefs.current
    const tl = gsap.timeline()

    /* Non-active cards animate to their new cyclic depths */
    allCards.forEach((c, i) => {
      if (!c || i === activeIndex) return
      tl.to(c, {
        ...restPoseFor(depthOf(i, activeIndex)),
        duration: 0.55,
        ease: 'power2.inOut',
      }, 0)
    })

    /* New active: brief overshoot forward, then settle to active pose */
    const incoming = allCards[activeIndex]
    if (incoming) {
      tl.to(incoming, {
        y: -8,
        z: ACTIVE_LIFT + LIFT_OVERSHOOT,
        scale: 1.022,
        rotationX: -2,
        autoAlpha: 1,
        duration: 0.32,
        ease: 'power3.out',
      }, 0.04)
      .to(incoming, {
        ...restPoseFor(0),
        duration: 0.4,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      })
    }

    /* Restart videos on tab change — active plays from 0, others
       pause and rewind so re-entry feels fresh, not "where I left off". */
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      try {
        if (i === activeIndex) {
          v.currentTime = 0
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } else {
          v.pause()
          v.currentTime = 0
        }
      } catch {}
    })

    /* Media crossfade — matte fades out on old, in on new */
    mattes.forEach((m, i) => {
      if (!m) return
      if (i === oldActive) {
        tl.to(m, { autoAlpha: 0, duration: 0.28, ease: 'power1.in' }, 0)
      } else if (i === activeIndex) {
        tl.to(m, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, 0.32)
      } else {
        gsap.set(m, { autoAlpha: 0 })
      }
    })
  }, [activeIndex, depthOf])

  return (
    <>
      <div className={styles.mobileOnly}>
        <MobileCardStack
          slides={slides}
          contributions={contributions}
          href={href}
        />
      </div>
    <div
      ref={containerRef}
      className={`${styles.stack} ${variantClass} ${styles.desktopOnly}`}
      data-count={cardCount}
      style={{ '--slot-count': cardCount }}
      role="tablist"
      aria-label="Project files"
    >
      {cards.map((card, i) => {
        const isActive = i === activeIndex
        const depth = depthOf(i, activeIndex)
        const silhouettePath = buildSilhouettePath(i, cardCount)
        const indexLabel = String(i + 1).padStart(2, '0')

        return (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            className={styles.card}
            data-active={isActive}
            style={{
              '--slot-i': i,
              /* Depth strip = how far this card's body extends above
                 the active card's body top. Active = 0 (tab only).
                 Receded cards include the strip so the click area
                 covers tab + visible body strip. */
              '--depth-strip': `${depth * Y_STEP}px`,
              zIndex: isActive ? cardCount + 5 : cardCount - depth,
            }}
          >
            <svg
              className={styles.silhouette}
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Body fill — bg-colored, every card. Masks receded
                  bodies behind active without showing as a fill
                  (matches the page; only outlines remain visible). */}
              <path
                d={silhouettePath}
                className={styles.silhouetteFill}
              />
              {/* Perimeter outline — every card. Active gets thicker
                  stroke + full opacity via CSS. */}
              <path
                d={silhouettePath}
                className={styles.silhouetteStroke}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Tab button — clickable, holds the label */}
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`fs-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              className={styles.tabHit}
              onClick={() => setActiveIndex(i)}
              title={card.label}
            >
              <span className={styles.tabIndex}>{indexLabel}</span>
              <span className={styles.tabLabelText}>{card.label}</span>
            </button>

            {/* Matte — current gallery image fills body 16:9.
                Only the active matte is visible (autoAlpha by GSAP). */}
            <div
              ref={el => { matteRefs.current[i] = el }}
              id={`fs-panel-${i}`}
              role="tabpanel"
              aria-hidden={!isActive}
              className={styles.matte}
            >
              {(() => {
                const galleryIdx = galleryIndices[i] || 0
                const current = card.images[galleryIdx] || card.images[0]
                const mediaClass = `${styles.media} ${card.gated ? styles.mediaGated : ''}`
                /* `fit: 'cover'` crops a slide to fill the 16:9 frame
                   (default is contain/letterbox). */
                const fitStyle = current.fit ? { objectFit: current.fit } : undefined
                return current.type === 'video' ? (
                  <video
                    key={`v-${i}-${galleryIdx}`}
                    ref={el => { videoRefs.current[i] = el }}
                    src={current.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload={i === 0 ? 'auto' : 'metadata'}
                    className={mediaClass}
                    style={fitStyle}
                    aria-label={current.alt}
                  />
                ) : (
                  <img
                    key={`i-${i}-${galleryIdx}`}
                    src={current.src}
                    alt={i === 0 ? current.alt : ''}
                    className={mediaClass}
                    style={fitStyle}
                    loading={i === 0 && galleryIdx === 0 ? 'eager' : 'lazy'}
                  />
                )
              })()}
              {/* Gated: blurred media + lock so the work shows but the
                  content (real data / licensed art) stays protected. */}
              {card.gated && (
                <GatedOverlay label={card.gatedLabel} note={card.gatedNote} />
              )}
              {/* Image as next-button — only when gallery has more than
                  one image. Sits above the media but BELOW the link. */}
              {isActive && card.images.length > 1 && (
                <button
                  type="button"
                  className={styles.galleryAdvance}
                  onClick={() => advanceGallery(i, 1)}
                  aria-label="Next image"
                />
              )}
              {isActive && card.href && (
                <a
                  className={styles.cardLink}
                  href={card.href}
                  aria-label={`Open ${card.label} case study`}
                >
                  <ArrowOut />
                </a>
              )}
            </div>

            {/* Gallery navigator — only shown when this card is active
                AND has more than one image. Sits in the cardstock frame
                below the matte. */}
            {isActive && card.images.length > 1 && (
              <div className={styles.galleryNav} aria-label={`${card.label} gallery`}>
                <button
                  type="button"
                  className={styles.galleryArrow}
                  onClick={() => advanceGallery(i, -1)}
                  aria-label="Previous image"
                >
                  <Chevron dir="left" />
                </button>
                <div className={styles.galleryDots} role="tablist" aria-label="Gallery position">
                  {card.images.map((_, j) => (
                    <button
                      key={j}
                      type="button"
                      role="tab"
                      aria-selected={(galleryIndices[i] || 0) === j}
                      aria-label={`Image ${j + 1} of ${card.images.length}`}
                      className={`${styles.galleryDot} ${(galleryIndices[i] || 0) === j ? styles.galleryDotActive : ''}`}
                      onClick={() => setGalleryAt(i, j)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.galleryArrow}
                  onClick={() => advanceGallery(i, 1)}
                  aria-label="Next image"
                >
                  <Chevron dir="right" />
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
    </>
  )
}
