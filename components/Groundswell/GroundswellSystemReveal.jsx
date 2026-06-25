'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellSystemReveal.module.css'

/* ============================================================================
   Groundswell — SYSTEM REVEAL transition.
   "The image becomes the system." The art-wall image (the hero's image) goes
   full-bleed, then collapses into a circle and is joined by three more — the
   four interventions settling into one connected ecosystem. The dark→light flip
   rides the morph, carrying the hero's dark claim into the light reading body.
   Scroll-scrubbed; reduced-motion shows the composed constellation, no morph.
   ============================================================================ */

gsap.registerPlugin(ScrollTrigger)

const img = (key, w = 1200) => cloudImg(GS_IMAGES[key], w)

// node 0 is the art-wall — the image that morphs in from full-bleed.
const NODES = [
  { key: 'gs-artwall', slot: 'tl', label: 'Recognition', sub: 'Community Art Wall' },
  { key: 'gs-pod', slot: 'tr', label: 'Environment', sub: 'Restorative Pod' },
  { key: 'gs-cards', slot: 'bl', label: 'Culture', sub: 'Reflection Cards' },
  { key: 'gs-ctb-email', slot: 'br', label: 'Systemic', sub: 'Ceased to Breathe' },
]

export default function GroundswellSystemReveal() {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const heroRef = useRef(null)
  const otherRefs = useRef([])
  const labelRefs = useRef([])
  const headingRef = useRef(null)
  const overlayRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const stage = stageRef.current
      const hero = heroRef.current
      const others = otherRefs.current.filter(Boolean)

      const sw = () => stage.getBoundingClientRect().width
      const sh = () => stage.getBoundingClientRect().height
      const d = () => Math.max(120, Math.min(sh() * 0.18, 200))
      // final art-wall slot (tl) centre = 33% / 40%
      const tlLeft = () => sw() * 0.33 - d() / 2
      const tlTop = () => sh() * 0.40 - d() / 2

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      })

      // 1 · art-wall: full-bleed → circle in its slot
      tl.fromTo(
        hero,
        { top: 0, left: 0, width: sw, height: sh, borderRadius: 0 },
        { top: tlTop, left: tlLeft, width: d, height: d, borderRadius: () => d() / 2, duration: 1, ease: 'power2.inOut' },
        0
      )
      // 2 · ground flips dark → light as the image contracts
      tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55 }, 0.25)
      // 3 · the other three circles join
      tl.fromTo(
        others,
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
        0.6
      )
      // 4 · connectors draw the system together
      tl.fromTo(linksRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.95)
      // 5 · heading + labels settle
      tl.fromTo(
        [headingRef.current, ...labelRefs.current.filter(Boolean)],
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, stagger: 0.06 },
        1.05
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.wrap} ref={wrapRef} aria-label="The interventions form one connected ecosystem">
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.overlay} ref={overlayRef} aria-hidden="true" />

        <p className={styles.heading} ref={headingRef}>
          <span className={styles.kicker}>The ecosystem</span>
          <span className={styles.title}>Four interventions, <em>one connected system</em>.</span>
        </p>

        {/* connectors */}
        <svg className={styles.links} ref={linksRef} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="33" y1="40" x2="67" y2="40" />
          <line x1="67" y1="40" x2="67" y2="68" />
          <line x1="67" y1="68" x2="33" y2="68" />
          <line x1="33" y1="68" x2="33" y2="40" />
        </svg>

        {/* nodes */}
        {NODES.map((n, i) => (
          <div
            key={n.key}
            ref={(el) => {
              if (i === 0) heroRef.current = el
              else otherRefs.current[i - 1] = el
            }}
            className={`${styles.node} ${styles[n.slot]}`}
          >
            <img src={img(n.key)} alt={`${n.label} — ${n.sub}`} />
          </div>
        ))}

        {/* labels */}
        {NODES.map((n, i) => (
          <p
            key={n.key}
            ref={(el) => (labelRefs.current[i] = el)}
            className={`${styles.label} ${styles[n.slot]}`}
          >
            <span className={styles.labelName}>{n.label}</span>
            <span className={styles.labelSub}>{n.sub}</span>
          </p>
        ))}
      </div>
    </section>
  )
}
