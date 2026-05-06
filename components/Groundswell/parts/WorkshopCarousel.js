'use client'

import { useState } from 'react'
import styles from '@/styles/project.module.css'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import Lightbox from '@/components/Lightbox/Lightbox'

const gsImg = (key, w) => cloudImg(GS_IMAGES[key], w)

export default function WorkshopCarousel() {
  const isMobileInit = typeof window !== 'undefined' && window.innerWidth <= 600
  const [current, setCurrent] = useState(isMobileInit ? 0 : 1)
  const [lightboxImg, setLightboxImg] = useState(null)

  const workshops = [
    {
      label: 'Coloring Culture',
      title: 'Nourishing the Flower',
      body: (
        <>
          Using the anatomy of a flower as a metaphor for workplace health, participants mapped their experiences onto two worksheets&mdash;one flourishing, one wilting. The exercise surfaced what sustains people alongside what quietly erodes them. The session ended with the group voting on what resonated most.
        </>
      ),
      quotes: [
        "Positive atmosphere, positive energy. Team player. Support one another.",
      ],
      images: [
        { src: gsImg('gs-workshop-flower-01', 1200), alt: 'Nourishing the Flower activity worksheets' },
        { src: gsImg('gs-workshop-flower-02', 1200), alt: 'Staff completing flower activity' },
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
      quotes: [
        "Self-care to me is gifting time. ‘Me’ time, ‘she’ time, and ‘we’ time.",
      ],
      images: [
        { src: gsImg('gs-workshop-coats-01', 1200), alt: 'Women in White Coats event honoring women in cancer care' },
        { src: gsImg('gs-workshop-coats-03', 1600), alt: 'Research poster with participant responses' },
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
      quotes: [
        "A manager or team member asking, what can I do to help? I’ve got you covered.",
      ],
      images: [
        { src: gsImg('gs-workshop-grief-01', 1200), alt: 'Grief workshop with trauma-informed facilitation' },
        { src: gsImg('gs-workshop-grief-02', 1200), alt: 'Staff engaging with scenario-based discussion' },
      ],
    },
  ]

  const goNext = () => setCurrent((p) => Math.min(p + 1, workshops.length - 1))
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0))

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  const isMobile = w <= 600
  const isTablet = w > 600 && w <= 900

  const getPosition = (index) => {
    const diff = index - current
    if (isMobile) {
      if (diff === 0)  return { transform: 'translateX(0) scale(1)',       opacity: 1, z: 3 }
      if (diff === -1) return { transform: 'translateX(-110%) scale(0.9)', opacity: 0, z: 1 }
      if (diff === 1)  return { transform: 'translateX(110%) scale(0.9)',  opacity: 0, z: 1 }
      return { transform: 'translateX(0) scale(0.8)', opacity: 0, z: 0 }
    }
    if (isTablet) {
      if (diff === 0)  return { transform: 'translateX(0) scale(1)',       opacity: 1,    z: 3 }
      if (diff === -1) return { transform: 'translateX(-70%) scale(0.88)', opacity: 0.65, z: 2 }
      if (diff === 1)  return { transform: 'translateX(70%) scale(0.88)',  opacity: 0.65, z: 2 }
      return { transform: 'translateX(0) scale(0.7)', opacity: 0, z: 0 }
    }
    if (diff === 0)  return { transform: 'translateX(0) scale(1)',        opacity: 1,    z: 3 }
    if (diff === -1) return { transform: 'translateX(-85%) scale(0.88)',  opacity: 0.65, z: 2 }
    if (diff === 1)  return { transform: 'translateX(85%) scale(0.88)',   opacity: 0.65, z: 2 }
    if (diff === -2) return { transform: 'translateX(-115%) scale(0.76)', opacity: 0.3,  z: 1 }
    if (diff === 2)  return { transform: 'translateX(115%) scale(0.76)',  opacity: 0.3,  z: 1 }
    return { transform: 'translateX(0) scale(0.7)', opacity: 0, z: 0 }
  }

  return (
    <div
      className={styles.workshopCarouselContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Workshop activities carousel"
    >
      <div className={styles.workshopCarouselTrack}>
        {workshops.map((ws, i) => {
          const pos = getPosition(i)
          return (
            <div
              key={i}
              className={styles.workshopCarouselSlot}
              style={{
                transform: pos.transform,
                opacity: pos.opacity,
                zIndex: pos.z,
                cursor: i === current ? 'default' : 'pointer',
              }}
              onClick={() => i !== current && setCurrent(i)}
            >
              <div className={styles.workshopCarouselCard}>
                <span className={styles.workshopLabel}>{ws.label}</span>
                <h3 className={styles.workshopTitle}>{ws.title}</h3>
                <p className={styles.workshopBody}>{ws.body}</p>
                <div className={styles.workshopQuotes}>
                  {ws.quotes.map((q, qi) => (
                    <blockquote key={qi} className={styles.workshopQuote}>
                      &ldquo;{q}&rdquo;
                    </blockquote>
                  ))}
                </div>
                <div className={styles.workshopImageGrid}>
                  {ws.images.map((img, ii) => (
                    <button
                      key={ii}
                      type="button"
                      className={styles.workshopImageButton}
                      onClick={(e) => { e.stopPropagation(); setLightboxImg(img) }}
                      aria-label={`View ${img.alt} in lightbox`}
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.workshopCarouselControls}>
        <button
          onClick={goPrev}
          className={styles.workshopCarouselArrow}
          disabled={current === 0}
          aria-label="Previous workshop"
        >
          &#8592;
        </button>
        <div className={styles.workshopCarouselInfo}>
          <span className={styles.workshopCarouselInstruction}>
            Click side cards to navigate
          </span>
          <span className={styles.workshopCarouselCounter}>
            {current + 1} of {workshops.length}
          </span>
        </div>
        <button
          onClick={goNext}
          className={styles.workshopCarouselArrow}
          disabled={current === workshops.length - 1}
          aria-label="Next workshop"
        >
          &#8594;
        </button>
      </div>

      <div className={styles.workshopCarouselDots}>
        {workshops.map((_, i) => (
          <button
            key={i}
            className={`${styles.workshopCarouselDot} ${i === current ? styles.workshopCarouselDotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to workshop ${i + 1}`}
          />
        ))}
      </div>

      {lightboxImg && (
        <Lightbox
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          onClose={() => setLightboxImg(null)}
        />
      )}
    </div>
  )
}
