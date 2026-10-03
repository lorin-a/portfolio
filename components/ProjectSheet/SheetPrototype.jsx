'use client'

import dynamic from 'next/dynamic'
import { useLayoutEffect, useRef, useState } from 'react'
import { cloudVideo } from '@/lib/cloudinary'
import styles from './SheetPrototype.module.css'

/* A built piece of a case study, playing inside a sheet gallery (FS301).
   The BirthStory case study's working prototypes and native diagrams are
   React, not media; a gallery slide of type 'prototype' names one here and
   the stage mounts it on that project's ground. Loaded on demand, so a
   sheet without prototypes never downloads them.

   Each piece runs its own loop on scroll and holds still under reduced
   motion (see the components). */

const DocReveal = dynamic(() => import('@/components/Birthstory/DocReveal'))
const CarePodFlow = dynamic(() => import('@/components/Birthstory/CarePodFlow'))
const JournalFlow = dynamic(() => import('@/components/Birthstory/JournalFlow'))
const SearchReveal = dynamic(() => import('@/components/Birthstory/SearchReveal'))
const IaV1 = dynamic(() => import('@/components/Birthstory/IaDiagrams').then((m) => m.IaV1))
const IaFinal = dynamic(() => import('@/components/Birthstory/IaDiagrams').then((m) => m.IaFinal))
const HeroStage = dynamic(() => import('@/components/Birthstory/BirthStoryHeroFan').then((m) => m.HeroStage))

/* The Book has no loop on the case study either: two of her real screens. */
function BookPair() {
  const shots = [
    ['/images/birthstory/bs-book-order.png', 'The Birth Story Book screen: order a printed keepsake or download a PDF.'],
    ['/images/birthstory/bs-book-curate.png', 'A timeline of entries under “Drag Content to Curate Your Story,” open to collaborators.'],
  ]
  return (
    <span className={styles.pair}>
      {shots.map(([src, alt]) => (
        <span key={src} className={styles.pairPhone}>
          <span className={styles.notch} aria-hidden="true" />
          <span className={styles.screen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
        </span>
      ))}
    </span>
  )
}

/* A diagram is laid out at a fixed desktop width and scaled down whole to
   fit the mat, never cropped. Measured from its layout size (offset sizes
   ignore the transform), re-fitted when either box changes. */
function Fit({ children, innerClass }) {
  const box = useRef(null)
  const inner = useRef(null)
  const [s, setS] = useState(1)
  useLayoutEffect(() => {
    const b = box.current, i = inner.current
    if (!b || !i) return
    const fit = () => {
      const w = Math.max(i.offsetWidth, i.scrollWidth)
      const h = Math.max(i.offsetHeight, i.scrollHeight)
      if (!w || !h) return
      setS(Math.min(1, b.clientWidth / w, b.clientHeight / h))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(b)
    ro.observe(i)
    return () => ro.disconnect()
  }, [])
  return (
    <span ref={box} className={styles.fitBox}>
      <span ref={inner} className={`${styles.fitInner} ${innerClass || ''}`} style={{ transform: `translate(-50%, -50%) scale(${s})` }}>{children}</span>
    </span>
  )
}

/* Phones: a diagram's own layout stacks into one tall column there, which
   no scale can make legible, so the mat shows her deck slide of the same
   architecture instead. */
function useNarrow() {
  const [narrow, setNarrow] = useState(false)
  useLayoutEffect(() => {
    const mq = window.matchMedia('(max-width: 699px)')
    const apply = () => setNarrow(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return narrow
}

/* a looping film on a project's ground; still (poster frame) under reduced motion */
function Film({ piece }) {
  const [reduced, setReduced] = useState(false)
  useLayoutEffect(() => { setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  return (
    <div className={styles.filmGround} style={{ background: piece.ground }}>
      <video className={styles.film} src={cloudVideo(piece.film, 1600)} muted loop playsInline
        autoPlay={!reduced} preload="metadata" aria-label={piece.alt} />
    </div>
  )
}

const PIECES = {
  doc: { phone: true, el: <DocReveal /> },
  carepod: { phone: true, el: <CarePodFlow /> },
  journal: { phone: true, el: <JournalFlow /> },
  search: { phone: true, el: <SearchReveal /> },
  book: { el: <BookPair /> },
  'ia-v1': { diagram: true, el: <IaV1 compact /> },
  'ia-final': { diagram: true, el: <IaFinal compact /> },
  /* the case study's hero stage, for a sheet's cover (FS310) */
  'bs-hero': { hero: true, el: <HeroStage /> },
  /* SomeBuddy's cover (FS346): the concept video's kinetic opening on the
     brand blue, looping, muted */
  'sb-hero': { film: 'somebuddy-reel-2', ground: '#4747DC', alt: 'The SomeBuddy concept video: “Social” and “solo” in kinetic type, then “Spontaneous. Simple. Social.”' },
}

export const hasPrototype = (name) => !!PIECES[name]

export default function SheetPrototype({ name, fallback, fallbackAlt, bare }) {
  const piece = PIECES[name]
  const narrow = useNarrow()
  if (!piece) return null
  /* bare (FS314): just the device, sized by its parent's height, for a
     stage that draws its own ground (SheetAnnotated) */
  if (bare) {
    return piece.phone ? <div className={styles.phoneFit} data-bare>{piece.el}</div> : piece.el
  }
  if (piece.diagram && narrow && fallback) {
    return <img className={styles.fallback} src={fallback} alt={fallbackAlt || ''} />
  }
  if (piece.film) return <Film piece={piece} />
  if (piece.hero) {
    return (
      <div className={styles.heroGround}>
        <Fit innerClass={styles.heroInner}>{piece.el}</Fit>
      </div>
    )
  }
  return (
    <div className={styles.ground}>
      {piece.phone && <div className={styles.phoneFit}>{piece.el}</div>}
      {piece.diagram && <div className={styles.diagram}><Fit>{piece.el}</Fit></div>}
      {!piece.phone && !piece.diagram && piece.el}
    </div>
  )
}
