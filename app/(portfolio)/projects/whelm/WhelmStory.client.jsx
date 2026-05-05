'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ELEMENT_REGISTRY } from './elements/registry'
import WhelmAgendaNav from './WhelmAgendaNav'
import WhelmGap from './sections/WhelmGap'
import { COPY } from './content'
import { SECTIONS } from './data'
import styles from './whelm.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Hero composes three persistent elements (cursive flourish, wordmark,
   scroll cue) over the slide-source bg. The rest of the case study is
   six anchored sections — each fills in over its own iteration. */
const HERO_ELEMENT_IDS = ['hero-flourish', 'wordmark', 'scroll-cue']

export default function WhelmStory() {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)

  /* Whelm runs full-bleed cinematic; globals.css hides the global nav
     when [data-theme='whelm'] is present in the DOM. */
  useEffect(() => {
    document.body.dataset.page = 'whelm'
    return () => { delete document.body.dataset.page }
  }, [])

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Hero elements are always visible — they live inside the hero
       block, scroll out naturally. Scroll cue starts hidden so it can
       land last in the intro sequence. */
    gsap.set('[data-element-id="hero-flourish"], [data-element-id="wordmark"]', {
      '--eo': 1,
    })
    gsap.set('[data-element-id="scroll-cue"]', { '--eo': 0 })

    gsap.set(`.${styles.copyBlock}`, { autoAlpha: 0, y: 12 })
    gsap.set(`.${styles.kind_lead}, .${styles.kind_h2_inline}`, {
      clipPath: 'inset(-0.2em 100% -0.2em 0)',
    })

    if (prefersReduced) {
      gsap.set('[data-char]', { maxWidth: 'none', opacity: 1 })
      gsap.set('[data-cursor]', { autoAlpha: 0 })
      gsap.set(`.${styles.copyBlock}`, { autoAlpha: 1, y: 0 })
      gsap.set(`.${styles.kind_lead}, .${styles.kind_h2_inline}`, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)',
      })
      gsap.set('[data-element-id="scroll-cue"]', { '--eo': 1 })
      return
    }

    /* ─── Hero intro (one-shot on mount) ─────────────────────────
       Wordmark types in (per-char max-width grow), cursive draws on
       in parallel, tagline reveals after the type lands, scroll cue
       lands last. */
    const intro = gsap.timeline()

    const charEls = gsap.utils.toArray('[data-char]')
    charEls.forEach((el, i) => {
      intro.to(
        el,
        {
          maxWidth: el.scrollWidth,
          opacity: 1,
          duration: 0.22,
          ease: 'power2.out',
        },
        0.6 + i * 0.22,
      )
    })

    intro.to(
      '[data-cursive-path]',
      { strokeDashoffset: 0, duration: 4.6, ease: 'sine.inOut' },
      0.5,
    )

    intro.to(
      `[data-beat="hero"] .${styles.copyBlock}`,
      { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.18 },
      2.3,
    )

    intro.to(
      `[data-beat="hero"] .${styles.kind_lead}, [data-beat="hero"] .${styles.kind_h2_inline}`,
      { clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 1.4, ease: 'power2.inOut' },
      2.4,
    )

    intro.to(
      '[data-cursor]',
      { autoAlpha: 0, duration: 1.1, ease: 'power2.out' },
      3.1,
    )

    intro.to(
      '[data-element-id="scroll-cue"]',
      { '--eo': 1, duration: 0.9, ease: 'power2.out' },
      4.4,
    )

    return () => intro.kill()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className={styles.story}>
      {/* Hero — full-bleed, scrolls past naturally. */}
      <div ref={heroRef} className={styles.stage}>
        {HERO_ELEMENT_IDS.map(id => {
          const def = ELEMENT_REGISTRY[id]
          if (!def) return null
          const Renderer = def.render
          return (
            <div key={id} data-element-id={id} className={styles.element}>
              <Renderer />
            </div>
          )
        })}

        <div data-beat="hero" className={styles.copyLayer}>
          {(COPY.hero || []).map((block, i) => (
            <div
              key={i}
              data-block-idx={i}
              className={`${styles.copyBlock} ${styles[`pos_${block.position}`]} ${styles[`kind_${block.kind}`]}`}
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          ))}
        </div>
      </div>

      <WhelmAgendaNav sentinelRef={heroRef} />

      {/* Six agenda sections — each fills in iteratively. Built sections
          render their own composition; unbuilt sections fall back to
          the centered placeholder. */}
      {SECTIONS.map(s => {
        if (s.id === 'gap') return <WhelmGap key={s.id} />
        return (
          <section key={s.id} id={s.id} className={styles.editorialSection}>
            <div className={styles.editorialInner}>
              <p className={styles.editorialEyebrow}>{s.label}</p>
              <p className={styles.editorialPlaceholder}>Content coming soon.</p>
            </div>
          </section>
        )
      })}
    </section>
  )
}
