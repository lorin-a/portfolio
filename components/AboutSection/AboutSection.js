'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'
import styles from './AboutSection.module.css'

gsap.registerPlugin(useGSAP)

export default function AboutSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(sectionRef.current, {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section className={styles.aboutSection} ref={sectionRef}>
      <div className={styles.aboutPhoto}>
        <div className={styles.aboutPhotoBorder} aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 8 C 145 6, 188 38, 193 85 C 198 132, 168 180, 118 192 C 68 204, 15 175, 7 125 C -1 75, 30 18, 78 9 C 82 8.3, 90 7.5, 100 8 Z"
              fill="none"
              stroke="var(--color-plum)"
              strokeWidth="4.5"
              opacity="0.5"
            />
          </svg>
        </div>
        <div className={styles.aboutPhotoInner}>
          <Image
            src={cloudImg(HOME_IMAGES['lorin-photo'], 400)}
            alt="Lorin Anderberg"
            fill
            sizes="(max-width: 900px) 120px, 172px"
            className={styles.aboutPhotoImage}
          />
        </div>
      </div>
      <div className={styles.aboutTextBlock}>
        <p className={styles.aboutText}>
          I am a deep feeler who came to design through journalism, caregiving,
          and a decade of caring about how people experience the systems they hold
          together.
        </p>
        <span className={`${styles.aboutLink} ${styles.aboutLinkDisabled}`}>
          More about my path &rarr;
          <span className={styles.comingSoon}>Coming soon</span>
        </span>
      </div>
    </section>
  )
}
