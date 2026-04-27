'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox/Lightbox'
import styles from './Artifact.module.css'

/**
 * Artifact — image or video evidence inside a Phase.
 * Image artifacts open a Lightbox on click for closer inspection.
 * Video artifacts play inline (no Lightbox).
 *
 * Marked `data-evidence` so Phase's batch ScrollTrigger reveals it on enter.
 *
 * Usage:
 *   <Artifact src={cloudImg(...)} alt="..." caption="..." />
 *   <Artifact src={cloudVideo(...)} type="video" caption="..." />
 */
export default function Artifact({
  src,
  alt = '',
  caption,
  type = 'image',
  width = 1200,
  height = 800,
}) {
  const [open, setOpen] = useState(false)
  const videoRef = useRef(null)
  const isVideo = type === 'video'

  /* Pause video when off-screen to save battery and CPU. */
  useEffect(() => {
    if (!isVideo || !videoRef.current) return
    const el = videoRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isVideo])

  return (
    <>
      <figure data-evidence className={styles.artifact}>
        <div
          className={`${styles.media} ${!isVideo ? styles.clickable : ''}`}
          onClick={!isVideo ? () => setOpen(true) : undefined}
          onKeyDown={
            !isVideo
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpen(true)
                  }
                }
              : undefined
          }
          role={!isVideo ? 'button' : undefined}
          tabIndex={!isVideo ? 0 : undefined}
          aria-label={!isVideo ? `View ${alt || 'artifact'} full size` : undefined}
        >
          {isVideo ? (
            <video ref={videoRef} src={src} autoPlay loop muted playsInline aria-label={alt} className={styles.video} />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={styles.image}
              sizes="(max-width: 900px) 100vw, 900px"
            />
          )}
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
      {open && !isVideo && (
        <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
