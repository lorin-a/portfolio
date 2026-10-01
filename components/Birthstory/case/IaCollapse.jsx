'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from './iaCollapse.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* THE FIRST ARIA — the IA collapse (N13).
   Her central design decision, made visible: the v1 architecture tried to do
   everything (two modes, fifteen destinations, menus inside menus). Testing
   said "too many menus, too many buttons." The final app opens straight into
   one timeline. This pinned beat lets the reader WATCH that subtraction happen
   — the sprawl retracts into a single line as they scroll, and the shipped
   home rises in its place. Immersion that explains (her standing rule): the
   motion IS the argument.

   Built as inline SVG so the tree can actually collapse. Pinned + scrubbed
   (the earned exception to the project's play-once default). Reduced motion
   sees the resolved state with a static "before" inset. */

// the v1 sprawl — Home → two modes → their many destinations
const DOCUMENT_CHILDREN = ['Where', 'When', 'Procedures', 'Medications', 'Care Plan', 'Emotions', 'Text']
const REFLECT_CHILDREN = ['Note', 'Voice Note', 'Images', 'Timeline', 'Journal', 'Photo Album', 'Data Viz']

export default function IaCollapse() {
  const root = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return // CSS resolves to the shipped state

      const q = gsap.utils.selector(root)
      const leaves = q('[data-leaf]')
      const branches = q('[data-branch]')
      const modes = q('[data-mode]')
      const counter = q('[data-count]')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      // 1 · the sprawl reads in full, the count names it
      tl.to(counter[0], { autoAlpha: 1, duration: 0.4 }, 0)
      // 2 · the fifteen destinations retract toward the spine and fade
      tl.to(leaves, {
        opacity: 0,
        x: (i, el) => -Number(el.dataset.dx || 0),
        y: (i, el) => -Number(el.dataset.dy || 0),
        duration: 1,
        stagger: { each: 0.03, from: 'edges' },
        ease: 'power2.in',
      }, 0.3)
      // 3 · the two modes fold into the center
      tl.to(branches, { opacity: 0, duration: 0.7, ease: 'power2.in' }, 0.7)
      tl.to(modes, { opacity: 0, y: 0, scale: 0.6, duration: 0.7, ease: 'power2.in' }, 0.7)
      tl.to(counter[0], { autoAlpha: 0, duration: 0.3 }, 0.7)
      // 4 · the spine straightens; the shipped home rises in its place
      tl.to(q('[data-spine]'), { scaleY: 1, transformOrigin: 'top', duration: 0.8, ease: 'power2.out' }, 1.1)
      tl.fromTo(q('[data-home]'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.3)
      tl.fromTo(q('[data-resolve]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1.6)
    },
    { scope: root }
  )

  return (
    <section ref={root} className={s.stage} aria-label="The information architecture, collapsed">
      <div className={s.inner}>
        <header className={s.head}>
          <p className={s.kicker}>The decision · architecture</p>
          <h2 className={s.claim}>
            The first version tried to do everything. Testing said: too many menus, too many
            buttons.
          </h2>
        </header>

        {/* the diagram: sprawl → one line */}
        <div className={s.diagram}>
          {/* the count that names the sprawl */}
          <p className={s.count} data-count>
            <span className={s.countNum}>15</span> destinations · 2 modes · menus inside menus
          </p>

          <svg className={s.tree} viewBox="0 0 900 520" role="img" aria-label="Version one architecture: Home branches into Document and Reflect, each fanning into seven destinations; it collapses into a single timeline.">
            {/* the spine that survives */}
            <line data-spine className={s.spine} x1="90" y1="60" x2="90" y2="460" />

            {/* Home */}
            <g className={s.node}>
              <rect x="30" y="238" width="120" height="44" rx="12" className={s.nodeHome} />
              <text x="90" y="265" className={s.nodeLabel}>Home</text>
            </g>

            {/* Document mode + its 7 leaves (top) */}
            <g data-mode>
              <path data-branch className={s.branch} d="M150 250 C 210 250, 210 120, 280 120" />
              <rect x="280" y="98" width="120" height="44" rx="12" className={s.nodeMode} />
              <text x="340" y="125" className={s.nodeLabel}>Document</text>
            </g>
            {DOCUMENT_CHILDREN.map((label, i) => {
              const x = 470
              const y = 34 + i * 26
              return (
                <g key={label} data-leaf data-dx={x - 90} data-dy={y - 120} className={s.leaf}>
                  <path data-branch className={s.twig} d={`M400 120 C 435 120, 435 ${y + 11}, ${x} ${y + 11}`} />
                  <rect x={x} y={y} width="120" height="22" rx="7" className={s.nodeLeaf} />
                  <text x={x + 60} y={y + 15} className={s.leafLabel}>{label}</text>
                </g>
              )
            })}

            {/* Reflect mode + its 7 leaves (bottom) */}
            <g data-mode>
              <path data-branch className={s.branch} d="M150 270 C 210 270, 210 400, 280 400" />
              <rect x="280" y="378" width="120" height="44" rx="12" className={s.nodeMode} />
              <text x="340" y="405" className={s.nodeLabel}>Reflect</text>
            </g>
            {REFLECT_CHILDREN.map((label, i) => {
              const x = 470
              const y = 300 + i * 26
              return (
                <g key={label} data-leaf data-dx={x - 90} data-dy={y - 400} className={s.leaf}>
                  <path data-branch className={s.twig} d={`M400 400 C 435 400, 435 ${y + 11}, ${x} ${y + 11}`} />
                  <rect x={x} y={y} width="120" height="22" rx="7" className={s.nodeLeaf} />
                  <text x={x + 60} y={y + 15} className={s.leafLabel}>{label}</text>
                </g>
              )
            })}
          </svg>

          {/* the shipped home rises in the spine's place */}
          <figure className={s.home} data-home>
            <img
              src="/images/birthstory/evolution/v3-home.png"
              alt="The shipped home: one timeline you open straight into, everything else a tap away in the bottom bar."
              width="430"
              height="932"
            />
          </figure>
        </div>

        <p className={s.resolve} data-resolve>
          Fifteen destinations became one. You open straight into a timeline; everything else is a
          tap away.
        </p>
      </div>

      {/* reduced-motion / no-JS static telling of the same decision */}
      <div className={s.staticFallback} aria-hidden="true">
        <p className={s.count}><span className={s.countNum}>15</span> destinations became one.</p>
      </div>
    </section>
  )
}
