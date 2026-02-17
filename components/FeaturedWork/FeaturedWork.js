'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './FeaturedWork.module.css'

const colorMap = {
  olive: styles.tagOlive,
  terracotta: styles.tagTerracotta,
  plum: styles.tagPlum,
  sage: styles.tagSage,
}

const featuredProjects = [
  {
    title: 'Groundswell',
    subtitle: 'Making Space to Restore, Together',
    description:
      'Grant-funded restorative care ecosystem co-designed with oncology staff at UPMC Magee-Womens Hospital — from participatory research to real-world installation.',
    tags: [
      { label: 'Co-Design', color: 'terracotta' },
      { label: 'Participatory Research', color: 'plum' },
      { label: 'Healthcare', color: 'olive' },
    ],
    heroImage: '/images/projects/groundswell-hero.jpg',
    heroAlt:
      'A healthcare worker walks down a hospital hallway toward a colorful mural installation',
    slug: '/projects/groundswell',
    status: 'Live Study',
    layout: 'stacked',
  },
  {
    title: 'BirthStory',
    subtitle: 'A Micro-App for the Moments That Matter',
    description:
      'Mobile app concept for the University of Pittsburgh Center for Research on Healthcare, helping birthing parents document and reflect on their experiences.',
    tags: [
      { label: 'UX Research', color: 'olive' },
      { label: 'App Design', color: 'terracotta' },
      { label: 'Interaction Design', color: 'sage' },
    ],
    heroImage: '/images/projects/birthstory-cover.jpg',
    heroAlt:
      'Multiple mobile app screens showing the BirthStory journaling and documentation interface',
    slug: '/projects/birthstory',
    status: null,
    layout: 'side',
    imageLeft: true,
  },
  {
    title: 'Transition Design',
    subtitle: 'Roots to Resilience',
    description:
      'A systems design response to food insecurity in Pittsburgh, mapping interventions across individual, community, and policy scales.',
    tags: [
      { label: 'Systems Thinking', color: 'olive' },
      { label: 'Futures', color: 'terracotta' },
      { label: 'Data Visualization', color: 'sage' },
    ],
    heroImage: '/images/projects/transition-design-hero.jpg',
    heroAlt:
      'Systems map and data visualization showing interconnected food insecurity factors in Pittsburgh',
    slug: '/projects/transition-design',
    status: null,
    layout: 'side',
  },
]

const moreProjects = [
  {
    title: 'SomeBuddy',
    subtitle: 'Lightweight Campus Socialization',
    description:
      'A social app concept addressing campus loneliness at CMU through GPS-based peer connection and low-effort plans.',
    tags: [
      { label: 'UX Design', color: 'olive' },
      { label: 'Brand Identity', color: 'terracotta' },
      { label: 'Animation', color: 'sage' },
    ],
    heroImage: '/images/projects/somebuddy-cover.gif',
    heroAlt: 'SomeBuddy brand identity and app screens on a blue background',
    slug: '/projects/somebuddy',
  },
  {
    title: 'Bridging the G.A.P.',
    subtitle: 'Bike Touring for Beginners',
    description:
      'Rebrand campaign for the Great Allegheny Passage trail with educational resources, mobile app concept, and environmental graphics.',
    tags: [
      { label: 'Brand Identity', color: 'terracotta' },
      { label: 'UX Research', color: 'olive' },
      { label: 'Animation', color: 'sage' },
    ],
    heroImage: '/images/projects/bridging-cover.gif',
    heroAlt:
      'Bridging the GAP trail brand mockups showing logo, apparel, and environmental signage',
    slug: '/projects/bridging-the-gap',
  },
  {
    title: 'MindfulNest',
    subtitle: 'SEL Technology for Pre-K Classrooms',
    description:
      'UX redesign of the teacher dashboard for CMU\'s CREATE Lab, informed by workshops with teachers.',
    tags: [
      { label: 'UX Research', color: 'olive' },
      { label: 'UX Design', color: 'olive' },
      { label: 'Education', color: 'plum' },
    ],
    heroImage: '/images/projects/mindfulnest-hero.jpg',
    heroAlt:
      'MindfulNest dashboard interface showing classroom emotional check-in data',
    slug: '/projects/mindfulnest',
  },
]

function TagPill({ label, color, small }) {
  return (
    <span
      className={`${styles.tag} ${colorMap[color] || ''} ${small ? styles.tagSmall : ''}`}
    >
      {label}
    </span>
  )
}

function FeaturedCard({ project }) {
  const isStacked = project.layout === 'stacked'
  const sideClass = project.imageLeft ? styles.cardSideFlipped : styles.cardSide

  return (
    <article className={styles.featuredCard}>
      <Link
        href={project.slug}
        className={`${styles.cardLink} ${isStacked ? styles.cardStacked : sideClass}`}
      >
        <div
          className={isStacked ? styles.imageStacked : styles.imageSide}
        >
          <Image
            src={project.heroImage}
            alt={project.heroAlt}
            fill
            sizes={
              isStacked
                ? '(max-width: 700px) 100vw, 1000px'
                : '(max-width: 700px) 100vw, 420px'
            }
            className={styles.image}
          />
          {project.status && (
            <span
              className={styles.statusBadge}
              aria-label={`Project status: ${project.status}`}
            >
              {project.status}
            </span>
          )}
        </div>

        <div
          className={isStacked ? styles.contentStacked : styles.contentSide}
        >
          <div>
            <h3 className={`${styles.title} ${isStacked ? styles.titleStacked : styles.titleSide}`}>
              {project.title}
            </h3>
            {project.subtitle && (
              <p className={`${styles.subtitle} ${isStacked ? styles.subtitleStacked : styles.subtitleSide}`}>
                {project.subtitle}
              </p>
            )}
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <TagPill key={tag.label} label={tag.label} color={tag.color} />
              ))}
            </div>
            <p className={`${styles.description} ${isStacked ? styles.descriptionStacked : styles.descriptionSide}`}>
              {project.description}
            </p>
          </div>
          <span className={styles.cta}>
            <span>View case study</span>
            <span className={styles.ctaArrowText}>&rarr;</span>
          </span>
        </div>
      </Link>
    </article>
  )
}

function SmallCard({ project }) {
  const visibleTags = project.tags.slice(0, 2)

  return (
    <article className={styles.smallCard}>
      <Link href={project.slug} className={styles.smallCardLink}>
        <div className={styles.smallImageWrapper}>
          <Image
            src={project.heroImage}
            alt={project.heroAlt}
            fill
            sizes="(max-width: 700px) 100vw, 320px"
            className={styles.image}
          />
        </div>

        <div className={styles.smallContent}>
          <div>
            <h3 className={styles.smallTitle}>{project.title}</h3>
            {project.subtitle && (
              <p className={styles.smallSubtitle}>{project.subtitle}</p>
            )}
            <div className={styles.smallTags}>
              {visibleTags.map((tag) => (
                <TagPill
                  key={tag.label}
                  label={tag.label}
                  color={tag.color}
                  small
                />
              ))}
            </div>
            <p className={styles.smallDescription}>{project.description}</p>
          </div>
          <span className={styles.smallCta}>
            <span>View project</span>
            <span className={styles.ctaArrowText}>&rarr;</span>
          </span>
        </div>
      </Link>
    </article>
  )
}

export default function FeaturedWork() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const section = sectionRef.current
    if (!section) return

    // Collect all animatable elements with their visible class and group index
    const elements = []

    // Featured cards — stagger within their group
    section.querySelectorAll(`.${styles.featuredCard}`).forEach((el, i) => {
      elements.push({ el, visibleClass: styles.featuredCardVisible, groupDelay: i * 150 })
    })

    // "More Work" label
    const label = section.querySelector(`.${styles.moreLabel}`)
    if (label) {
      elements.push({ el: label, visibleClass: styles.moreLabelVisible, groupDelay: 0 })
    }

    // Small cards — stagger within their group
    section.querySelectorAll(`.${styles.smallCard}`).forEach((el, i) => {
      elements.push({ el, visibleClass: styles.smallCardVisible, groupDelay: i * 120 })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const item = elements.find((e) => e.el === entry.target)
          if (!item) return

          setTimeout(() => {
            item.el.classList.add(item.visibleClass)
          }, item.groupDelay)

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach(({ el }) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.slug} project={project} />
          ))}
        </div>

        <p className={styles.moreLabel}>More Work</p>

        <div className={styles.moreGrid}>
          {moreProjects.map((project) => (
            <SmallCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
