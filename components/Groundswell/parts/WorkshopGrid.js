'use client'

import { useState } from 'react'
import styles from '@/styles/project.module.css'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import Lightbox from '@/components/Lightbox/Lightbox'

const gsImg = (key, w) => cloudImg(GS_IMAGES[key], w)

const workshops = [
  {
    label: 'Coloring Culture',
    title: 'Nourishing the Flower',
    body: (
      <>
        Using the anatomy of a flower as a metaphor for workplace health, participants mapped their experiences onto two worksheets&mdash;one flourishing, one wilting. The exercise surfaced what sustains people alongside what quietly erodes them. The session ended with the group voting on what resonated most.
      </>
    ),
    quote: 'Positive atmosphere, positive energy. Team player. Support one another.',
    images: [
      { src: gsImg('gs-workshop-flower-01', 1200), alt: 'Nourishing the Flower activity worksheets' },
      { src: gsImg('gs-workshop-flower-02', 1200), alt: 'Staff completing flower activity', objectPosition: 'top' },
    ],
  },
  {
    label: 'Participatory Poster',
    title: 'Women in White Coats',
    body: (
      <>
        We partnered with{' '}
        <a href="https://cancerbridges.org/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          CancerBridges
        </a>
        {' '}to honor women in cancer care. Each participant received a hand-made orchid pin with a removable &ldquo;leaf&rdquo; they could add to a shared poster answering: <em>How has your approach to patient care evolved to help you balance compassion with self-care?</em>
      </>
    ),
    quote: 'Self-care to me is gifting time. ‘Me’ time, ‘she’ time, and ‘we’ time.',
    images: [
      { src: gsImg('gs-workshop-coats-03', 1600), alt: 'Research poster with participant responses' },
      { src: gsImg('gs-workshop-coats-01', 1200), alt: 'Women in White Coats event honoring women in cancer care', objectPosition: 'top' },
    ],
  },
  {
    label: 'Grief Scenarios',
    title: 'Grief Workshop',
    body: (
      <>
        We created a container for vulnerability&mdash;using a soft stuffed animal as a &ldquo;puppet&rdquo; to abstract the topic of grief. Staff were given scenarios and asked what they could do or say to support their colleague. The session ended with the group voting on what resonated most.
      </>
    ),
    quote: 'A manager or team member asking, what can I do to help? I’ve got you covered.',
    images: [
      { src: gsImg('gs-workshop-grief-01', 1200), alt: 'Grief workshop with trauma-informed facilitation' },
      { src: gsImg('gs-workshop-grief-02', 1200), alt: 'Staff engaging with scenario-based discussion' },
    ],
  },
]

export default function WorkshopGrid() {
  // Per-card active image index. Each card has its own gallery cursor.
  const [activeIndex, setActiveIndex] = useState(workshops.map(() => 0))
  // Lightbox state holds which workshop is open + which image within it.
  const [lightbox, setLightbox] = useState(null) // { wsIndex, imgIndex }

  const setCardIndex = (cardIdx, imgIdx) => {
    setActiveIndex((prev) => prev.map((v, i) => (i === cardIdx ? imgIdx : v)))
  }

  const openLightbox = (wsIndex) => {
    setLightbox({ wsIndex, imgIndex: activeIndex[wsIndex] })
  }

  const closeLightbox = () => setLightbox(null)

  const lightboxPrev = () => {
    if (!lightbox) return
    const imgs = workshops[lightbox.wsIndex].images
    setLightbox({ ...lightbox, imgIndex: (lightbox.imgIndex - 1 + imgs.length) % imgs.length })
  }
  const lightboxNext = () => {
    if (!lightbox) return
    const imgs = workshops[lightbox.wsIndex].images
    setLightbox({ ...lightbox, imgIndex: (lightbox.imgIndex + 1) % imgs.length })
  }

  return (
    <>
      <div className={styles.workshopGrid} role="list" aria-label="Participatory workshop activities">
        {workshops.map((ws, i) => {
          const idx = activeIndex[i]
          const img = ws.images[idx]
          return (
            <AnimatedElement key={ws.title} delay={i * 120} className={styles.workshopGridItem}>
              <article className={styles.workshopGridCard}>
                <button
                  type="button"
                  className={styles.workshopGridImageButton}
                  onClick={() => openLightbox(i)}
                  aria-label={`View ${img.alt} in lightbox`}
                >
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={styles.workshopGridImage}
                    style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                  />
                </button>
                {ws.images.length > 1 && (
                  <div className={styles.workshopGridDots} role="tablist" aria-label={`${ws.title} gallery`}>
                    {ws.images.map((g, gi) => (
                      <button
                        key={gi}
                        type="button"
                        className={`${styles.workshopGridDot} ${gi === idx ? styles.workshopGridDotActive : ''}`}
                        onClick={() => setCardIndex(i, gi)}
                        aria-label={`Show image ${gi + 1} of ${ws.images.length}`}
                        aria-selected={gi === idx}
                        role="tab"
                      />
                    ))}
                  </div>
                )}
                <div className={styles.workshopGridBody}>
                  <span className={styles.workshopLabel}>{ws.label}</span>
                  <h3 className={styles.workshopTitle}>{ws.title}</h3>
                  <p className={styles.workshopBody}>{ws.body}</p>
                  <blockquote className={styles.workshopQuote}>
                    &ldquo;{ws.quote}&rdquo;
                  </blockquote>
                </div>
              </article>
            </AnimatedElement>
          )
        })}
      </div>

      {lightbox && (() => {
        const ws = workshops[lightbox.wsIndex]
        const img = ws.images[lightbox.imgIndex]
        const multiple = ws.images.length > 1
        return (
          <Lightbox
            src={img.src}
            alt={img.alt}
            onClose={closeLightbox}
            onPrev={multiple ? lightboxPrev : undefined}
            onNext={multiple ? lightboxNext : undefined}
            counter={multiple ? `${lightbox.imgIndex + 1} of ${ws.images.length}` : undefined}
          />
        )
      })()}
    </>
  )
}
