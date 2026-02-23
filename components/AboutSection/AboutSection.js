'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    })
  }, [])

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
          I&apos;m a deep feeler who came to design through journalism, caregiving,
          and a decade of caring about how people experience the systems they hold
          together.
        </p>
        <Link href="/about" className={styles.aboutLink}>
          More about my path &rarr;
        </Link>
      </div>
    </section>
  )
}
