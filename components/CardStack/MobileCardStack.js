'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './MobileCardStack.module.css'
import GatedOverlay from './GatedOverlay'

gsap.registerPlugin(useGSAP)

/**
 * MobileCardStack — single-card gallery for narrow viewports.
 *
 * Pools every image from the desktop card galleries into one ordered
 * list. Renders the active image alone in a clean rounded frame. Tap
 * or swipe up advances: the active card slides off the top, content
 * is swapped synchronously while offscreen (flushSync), and the new
 * image rises from the bottom. Swipe down reverses.
 */
export default function MobileCardStack({ slides = [], contributions = [], href }) {
  const images = useMemo(() => {
    const pooled = contributions.flatMap(c =>
      (c.gallery && c.gallery.length > 0 ? c.gallery : []).map(img => ({
        ...img,
        gated: !!c.gated,
        gatedLabel: c.gatedLabel,
        gatedNote: c.gatedNote,
      }))
    )
    return pooled.length > 0 ? pooled : slides
  }, [contributions, slides])

  const count = images.length
  const [activeIdx, setActiveIdx] = useState(0)
  const cardRef = useRef(null)
  const animatingRef = useRef(false)
  const touchStartY = useRef(null)

  const advance = useCallback(
    (dir = 1) => {
      if (count <= 1 || animatingRef.current) return
      animatingRef.current = true

      const el = cardRef.current
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!el || prefersReduced) {
        setActiveIdx(prev => (prev + dir + count) % count)
        animatingRef.current = false
        return
      }

      /* Slide active card off the top (forward) or bottom (reverse),
         swap content, slide back in from the opposite edge — so the
         new image always rises from the bottom on a forward tap. */
      const tl = gsap.timeline({
        onComplete: () => { animatingRef.current = false },
      })
      tl.to(el, {
        yPercent: dir > 0 ? -110 : 110,
        duration: 0.32,
        ease: 'power2.in',
      })
        .add(() => {
          /* flushSync forces React to commit the new image to the DOM
             before GSAP's next .set() runs. Without it, the state
             update batches asynchronously and the card slides back in
             still showing the old image — popping mid-flight when
             React finally re-renders. */
          flushSync(() => {
            setActiveIdx(prev => (prev + dir + count) % count)
          })
        })
        .set(el, { yPercent: dir > 0 ? 110 : -110 })
        .to(el, {
          yPercent: 0,
          duration: 0.42,
          ease: 'power3.out',
        })
    },
    [count]
  )

  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
  const onTouchEnd = (e) => {
    if (touchStartY.current == null) return
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartY.current = null
    if (Math.abs(dy) < 40) {
      advance(1)
      return
    }
    /* Swipe up = forward (next card rises from below);
       swipe down = back. */
    advance(dy < 0 ? 1 : -1)
  }

  if (count === 0) return null
  const current = images[activeIdx]

  return (
    <div
      className={styles.wrap}
      role="region"
      aria-label="Project gallery"
    >
      <div
        className={styles.stack}
        onClick={() => advance(1)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div ref={cardRef} className={styles.card}>
          {current.type === 'video' ? (
            <video
              key={`v-${activeIdx}`}
              src={current.src}
              autoPlay
              muted
              loop
              playsInline
              className={`${styles.media} ${current.gated ? styles.mediaGated : ''}`}
              aria-label={current.alt}
            />
          ) : (
            <img
              key={`i-${activeIdx}`}
              src={current.src}
              alt={current.alt || ''}
              className={`${styles.media} ${current.gated ? styles.mediaGated : ''}`}
            />
          )}
          {/* Gated: blurred media + lock — protected data/art stays hidden. */}
          {current.gated && (
            <GatedOverlay label={current.gatedLabel} note={current.gatedNote} />
          )}
        </div>
      </div>

      {count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Gallery position">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={`Image ${i + 1} of ${count}`}
              className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
              onClick={() => {
                if (i === activeIdx || animatingRef.current) return
                advance(i > activeIdx ? 1 : -1)
              }}
            />
          ))}
        </div>
      )}

      {href && (
        <a className={styles.cta} href={href}>
          View full case study <span aria-hidden="true">&rarr;</span>
        </a>
      )}
    </div>
  )
}
