'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import { useInlineSvg } from '../lib/useInlineSvg'
import styles from '../whelm.module.css'

/* Section 7 — The Typologies. (Figma 255:649)

   Cream "page" floating inside the dark case study (matches the
   Framework treatment). Title top-left: "Three Typologies". Below,
   three columns side-by-side — Fog, Flood, Frenzy — each with its
   hand-drawn shape, name, and description.

   Motion: title wipes in, then each column reveals left-to-right
   (shape settles first beat, name + body lift after — text-first
   per project convention, with the shape acting as a slow anchor). */

const EYEBROW = 'The Typologies'
const HEADING = 'Three Typologies'

/* Body copy verbatim from Whelm_Copy_Site_Flow.md. */
const TYPOLOGIES = [
  {
    id: 'fog',
    name: 'The Fog',
    src: '/brand/Typology-fog.svg',
    body:
      'Experiences overwhelm as numbness or brain fog with signals like forgetfulness and trouble forming thoughts. Has awareness that something is off but feels blocked from understanding what is causing it or why. Overwhelm comes on slowly, feels like distance from self, truth, and others. Retreats into the fog. Disconnected.',
  },
  {
    id: 'flood',
    name: 'The Flood',
    src: '/brand/Typology-flood.svg',
    body:
      'As overwhelm piles up, so does a rise of activation energy over time that eventually reaches a tipping point. Inner tension, unease, and eventual collapse. Struggles to think through because the feelings are so strong. Onset by an event or experience that leads to the flood such as rejection, conflict, or feeling rushed.',
  },
  {
    id: 'frenzy',
    name: 'The Frenzy',
    src: '/brand/Typology-frenzy.svg',
    body:
      'Becomes scattered and frantic, struggles with prioritization. Executive functioning goes into overdrive and cannot reach full rest or restoration. Related to over-extending oneself paired with high expectations, perfectionism, and inability to say no.',
  },
]

export default function WhelmTypologies() {
  const fog = useInlineSvg('/brand/Typology-fog.svg', { autoCrop: true, padding: 12 })
  const flood = useInlineSvg('/brand/Typology-flood.svg', { autoCrop: true, padding: 12 })
  const frenzy = useInlineSvg('/brand/Typology-frenzy.svg', { autoCrop: true, padding: 12 })
  const hosts = { fog, flood, frenzy }

  const { sectionRef } = useStickyReveal({
    threshold: 0.3,
    deps: [fog.markup, flood.markup, frenzy.markup],
    build(tl, root) {
      const eyebrow = root.querySelector('[data-typ-eyebrow]')
      const heading = root.querySelector('[data-typ-heading]')
      const cols = root.querySelectorAll('[data-typ-col]')
      const shapes = root.querySelectorAll('[data-typ-shape]')
      const names = root.querySelectorAll('[data-typ-name]')
      const bodies = root.querySelectorAll('[data-typ-body]')

      // Reveal SVG hosts (they mount via dangerouslySetInnerHTML and
      // are fully composed before useGSAP runs).
      shapes.forEach(s => { s.style.visibility = 'visible' })

      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      gsap.set(shapes, { autoAlpha: 0, scale: 0.94, transformOrigin: '50% 60%' })
      gsap.set(names, { autoAlpha: 0, y: 12 })
      gsap.set(bodies, { autoAlpha: 0, y: 14 })

      if (prefersReducedMotion()) {
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set([eyebrow, ...shapes, ...names, ...bodies], {
          autoAlpha: 1, y: 0, scale: 1,
        })
        return
      }

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(heading, { '--reveal': '0%', duration: 1.0, ease: 'power2.inOut' }, 0.2)

      // Per-column reveal, left-to-right. Text first (name + body
      // start), shape resolves shortly after.
      cols.forEach((_, i) => {
        const t = 0.95 + i * 0.32
        tl.to(names[i], { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, t)
        tl.to(bodies[i], { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power2.out' }, t + 0.08)
        tl.to(shapes[i], { autoAlpha: 1, scale: 1, duration: 0.95, ease: 'power2.out' }, t + 0.18)
      })
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="typologies"
      track="long"
      stage="grid"
      stickyClassName={styles.typSticky}
    >
      <div className={styles.typInner}>
        <div className={styles.typHeader}>
          <p className={styles.typEyebrow} data-typ-eyebrow>
            {EYEBROW}
          </p>
          <h2 className={styles.typHeading}>
            <span className={styles.typHeadingClip} data-typ-heading>
              {HEADING}
            </span>
          </h2>
        </div>

        <div className={styles.typGrid}>
          {TYPOLOGIES.map(t => {
            const host = hosts[t.id]
            return (
              <article key={t.id} data-typ-col className={styles.typCol}>
                <div
                  ref={host.hostRef}
                  data-typ-shape
                  className={styles.typShape}
                  dangerouslySetInnerHTML={{ __html: host.markup }}
                  aria-hidden="true"
                />
                <h3 className={styles.typName} data-typ-name>{t.name}</h3>
                <p className={styles.typBody} data-typ-body>{t.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </StickySection>
  )
}
