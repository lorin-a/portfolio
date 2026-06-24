'use client'

import { useEffect, useRef, useState } from 'react'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './GroundswellPreview.module.css'

// The flower's gradient, lifted from the homepage mark: sage → peach → plum.
const FLOWER_GRADIENT = ['#9FB07E', '#E4B6A4', '#B79BC4']
const CMU = 'https://cfa.cmu.edu/magazine/groundswell-designing-systems-care-those-who-care'
const MEDIUM =
  'https://medium.com/@lorinanderberg/design-with-care-for-oncology-exploring-supportive-environments-for-health-care-workers-cd0d6800ddd9'

// Research → intervention. The strategic spine, made literal.
const DIMENSIONS = [
  { name: 'Recognition', need: 'feeling seen and appreciated', answer: 'Community Art Wall' },
  { name: 'Environment', need: 'workspace quality and resources', answer: 'Restorative Pod' },
  { name: 'Culture', need: 'team norms and shared care', answer: 'Reflection Cards' },
  { name: 'Systemic', need: 'constraints beyond the individual', answer: 'Ceased to Breathe email' },
]

/** Fire a callback once, the first time the element scrolls into view. */
function useInViewOnce(threshold = 0.4) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function GroundswellPreview() {
  const [flowerRef, flowerIn] = useInViewOnce(0.45)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className={styles.page}>
      {/* ── Minimal wayfinding header, echoing the homepage nav ── */}
      <header className={styles.topbar}>
        <span className={styles.topbarName}>Lorin Anderberg</span>
        <span className={styles.topbarCenter}>
          <ShapeMark className={styles.topbarMark} gradientColors={FLOWER_GRADIENT} />
          <span className={styles.topbarProject}>Groundswell</span>
        </span>
        <a className={styles.topbarBack} href="/">All work</a>
      </header>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroFlowerStage}>
          {mounted && (
            <ShapeMark
              animate
              fillReveal
              gradientColors={FLOWER_GRADIENT}
              className={styles.heroFlower}
            />
          )}
        </div>
        <p className={styles.heroKicker}>A design ecology for staff well-being</p>
        <h1 className={styles.heroTitle}>Groundswell</h1>
        <p className={styles.heroTagline}>Making Space to Restore, Together</p>
        <div className={styles.scrollCue} aria-hidden="true">
          <span>Scroll</span>
          <span className={styles.scrollLine} />
        </div>
      </section>

      {/* ── AT A GLANCE — the 90-second answer ── */}
      <section className={styles.glance}>
        <div className={styles.glanceGrid}>
          <div className={styles.glanceItem}>
            <span className={styles.glanceLabel}>What</span>
            <span className={styles.glanceValue}>
              A grant-funded ecosystem of emotional support for oncology staff at UPMC Magee-Womens Hospital.
            </span>
          </div>
          <div className={styles.glanceItem}>
            <span className={styles.glanceLabel}>My role</span>
            <span className={styles.glanceValue}>Research · Co-Design · Copywriting · Coordination · Donor Outreach</span>
          </div>
          <div className={styles.glanceItem}>
            <span className={styles.glanceLabel}>Outcome</span>
            <span className={styles.glanceValueStrong}>Launched as a 12-month pilot study.</span>
          </div>
        </div>
        <div className={styles.pills}>
          <span className={styles.pill}>Design Research</span>
          <span className={styles.pill}>Co-Design</span>
          <span className={styles.pill}>Copywriting</span>
          <span className={styles.pill}>Healthcare</span>
        </div>
      </section>

      {/* ── THE WAY IN — long-form reading on a paper card (max contrast) ── */}
      <section className={styles.papered}>
        <article className={styles.paper}>
          <p className={styles.paperLede}>
            I come from a long line of healers, educators, and innovators: people who carry the weight of the
            world, an optimism for the future, and the passion to create change that benefits others.
          </p>
          <p className={styles.paperBody}>
            Stepping into the oncology department healed something in me. Within minutes of speaking to the staff,
            I knew we were cut from the same cloth: givers, healers, lovers, builders, dreamers. Supporting them
            turned out to be a lesson in supporting myself, and others who carry more than their capacity can hold.
          </p>
          <p className={styles.paperBody}>
            It started as a class project. But I felt strongly that my marketing skills could at least get this
            department a donated pod, a temporary solution to give them hope and respite. I did not anticipate that
            it would leave the classroom and become real.
          </p>
        </article>
      </section>

      {/* ── THE FLOWER ASSEMBLES — research resolves into four dimensions ── */}
      <section className={styles.synthesis} ref={flowerRef}>
        <div className={styles.synthesisInner}>
          <div className={styles.synthesisStage}>
            <div className={styles.bigFlowerStage}>
              {/* Mount fresh when it scrolls into view, so ShapeMark animates from
                  a clean mount (toggling the animate prop leaves it half-built). */}
              {flowerIn && (
                <ShapeMark
                  animate
                  fillReveal
                  gradientColors={FLOWER_GRADIENT}
                  className={styles.bigFlower}
                />
              )}
            </div>
          </div>
          <div className={styles.synthesisCopy}>
            <p className={styles.kicker}>From insight to intervention</p>
            <h2 className={styles.sectionTitle}>
              The research resolved into <em>four dimensions</em> of well-being.
            </h2>
            <p className={styles.sectionLede}>
              Each petal is a need staff named. We chose interventions so that, together, they would answer every
              one.
            </p>
            <ul className={styles.dimList}>
              {DIMENSIONS.map((d, i) => (
                <li
                  key={d.name}
                  className={`${styles.dimRow} ${flowerIn ? styles.dimIn : ''}`}
                  style={{ transitionDelay: `${0.5 + i * 0.18}s` }}
                >
                  <span className={styles.dimName}>{d.name}</span>
                  <span className={styles.dimNeed}>{d.need}</span>
                  <span className={styles.dimAnswer}>
                    <span className={styles.dimArrow} aria-hidden="true">→</span>
                    {d.answer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── GO DEEPER — depth links out, the page stays tight ── */}
      <section className={styles.deeper}>
        <p className={styles.deeperKicker}>Go deeper</p>
        <div className={styles.deeperLinks}>
          <a className={styles.deeperLink} href={MEDIUM} target="_blank" rel="noopener noreferrer">
            Read the full field documentation <span aria-hidden="true">→</span>
          </a>
          <a className={styles.deeperLink} href={CMU} target="_blank" rel="noopener noreferrer">
            Read the CMU feature <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className={styles.deeperNote}>
          This is a working prototype of the reimagined template: the dark canvas, the paper-card reading surface,
          and the assembling-flower interaction. Sections are representative, not the full case study.
        </p>
      </section>
    </div>
  )
}
