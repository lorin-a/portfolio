'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './FeaturedWorkExperimental.module.css'

const themes = {
  groundswell: {
    // Brand purple #554E65
    cardBg: '#554E65',
    title: '#EDE8F2',
    subtitle: 'rgba(237, 232, 242, 0.8)',
    description: 'rgba(237, 232, 242, 0.88)',
    cta: '#C8BED8',
    badgeBg: '#E4E0EB',
    badgeText: '#3A3347',
    darkTheme: true,
  },
  birthstory: {
    // Soft periwinkle #B7CAFA
    cardBg: '#B7CAFA',
    title: '#1E2E50',
    subtitle: '#34486E',
    description: '#1E2E50',
    cta: '#2A4068',
    darkTheme: false,
  },
  transitionDesign: {
    // Soft chartreuse #C7D57C
    cardBg: '#C7D57C',
    title: '#2A3410',
    subtitle: '#3E4E1E',
    description: '#2A3410',
    cta: '#3E4E1E',
    darkTheme: false,
  },
  somebuddy: {
    cardBg: 'linear-gradient(135deg, #3830AA 0%, #2E28A0 100%)',
    contentBg: 'linear-gradient(to bottom, #2E28A0 0%, #252080 100%)',
    title: '#E8E4FF',
    subtitle: 'rgba(232, 228, 255, 0.75)',
    description: 'rgba(232, 228, 255, 0.85)',
    cta: '#C8FF78',
    darkTheme: true,
  },
  bridgingTheGap: {
    cardBg: 'linear-gradient(135deg, #1A2840 0%, #162238 100%)',
    contentBg: 'linear-gradient(to bottom, #162238 0%, #0E1828 100%)',
    title: '#E0E8F0',
    subtitle: 'rgba(224, 232, 240, 0.75)',
    description: 'rgba(224, 232, 240, 0.85)',
    cta: '#78C8FF',
    darkTheme: true,
  },
  mindfulnest: {
    // Soft blue #ADCAF5
    cardBg: '#ADCAF5',
    title: '#1A2E50',
    subtitle: '#34486E',
    description: '#1A2E50',
    cta: '#2A4068',
    darkTheme: false,
  },
}

const featuredProjects = [
  {
    title: 'Groundswell',
    subtitle: 'Making Space to Restore, Together',
    description:
      'Grant-funded restorative care ecosystem co-designed with oncology staff at UPMC Magee-Womens Hospital — from participatory research to real-world installation.',
    tags: [
      { label: 'Co-Design' },
      { label: 'Participatory Research' },
      { label: 'Healthcare' },
    ],
    heroImage: '/images/projects/groundswell-hero.jpg',
    heroAlt:
      'A healthcare worker walks down a hospital hallway toward a colorful mural installation',
    slug: '/projects/groundswell',
    status: 'Live Study',
    layout: 'stacked',
    theme: 'groundswell',
  },
  {
    title: 'BirthStory',
    subtitle: 'A Micro-App for the Moments That Matter',
    description:
      'Mobile app concept for the University of Pittsburgh Center for Research on Healthcare, helping birthing parents document and reflect on their experiences.',
    tags: [
      { label: 'UX Research' },
      { label: 'App Design' },
      { label: 'Interaction Design' },
    ],
    heroImage: '/images/projects/birthstory-cover.jpg',
    heroAlt:
      'Multiple mobile app screens showing the BirthStory journaling and documentation interface',
    slug: '/projects/birthstory',
    status: null,
    layout: 'side',
    imageLeft: true,
    theme: 'birthstory',
  },
  {
    title: 'Transition Design',
    subtitle: 'Roots to Resilience',
    description:
      'A systems design response to food insecurity in Pittsburgh, mapping interventions across individual, community, and policy scales.',
    tags: [
      { label: 'Systems Thinking' },
      { label: 'Futures' },
      { label: 'Data Visualization' },
    ],
    heroImage: '/images/projects/transition-design-hero.jpg',
    heroAlt:
      'Systems map and data visualization showing interconnected food insecurity factors in Pittsburgh',
    slug: '/projects/transition-design',
    status: null,
    layout: 'side',
    theme: 'transitionDesign',
  },
]

const moreProjects = [
  {
    title: 'SomeBuddy',
    subtitle: 'Lightweight Campus Socialization',
    description:
      'A social app concept addressing campus loneliness at CMU through GPS-based peer connection and low-effort plans.',
    tags: [
      { label: 'UX Design' },
      { label: 'Brand Identity' },
      { label: 'Animation' },
    ],
    heroImage: '/images/projects/somebuddy-cover.gif',
    heroAlt: 'SomeBuddy brand identity and app screens on a blue background',
    slug: '/projects/somebuddy',
    theme: 'somebuddy',
  },
  {
    title: 'Bridging the G.A.P.',
    subtitle: 'Bike Touring for Beginners',
    description:
      'Rebrand campaign for the Great Allegheny Passage trail with educational resources, mobile app concept, and environmental graphics.',
    tags: [
      { label: 'Brand Identity' },
      { label: 'UX Research' },
      { label: 'Animation' },
    ],
    heroImage: '/images/projects/bridging-cover.gif',
    heroAlt:
      'Bridging the GAP trail brand mockups showing logo, apparel, and environmental signage',
    slug: '/projects/bridging-the-gap',
    theme: 'bridgingTheGap',
  },
  {
    title: 'MindfulNest',
    subtitle: 'SEL Technology for Pre-K Classrooms',
    description:
      'UX redesign of the teacher dashboard for CMU\'s CREATE Lab, informed by workshops with teachers.',
    tags: [
      { label: 'UX Research' },
      { label: 'UX Design' },
      { label: 'Education' },
    ],
    heroImage: '/images/projects/mindfulnest-hero.jpg',
    heroAlt:
      'MindfulNest dashboard interface showing classroom emotional check-in data',
    slug: '/projects/mindfulnest',
    theme: 'mindfulnest',
  },
]

function TagPill({ label, darkTheme, small }) {
  return (
    <span
      className={`${styles.tag} ${darkTheme ? styles.tagOnDark : styles.tagOnLight} ${small ? styles.tagSmall : ''}`}
    >
      {label}
    </span>
  )
}

function FeaturedCard({ project }) {
  const isStacked = project.layout === 'stacked'
  const sideClass = project.imageLeft ? styles.cardSideFlipped : styles.cardSide
  const t = themes[project.theme]

  const cardStyle = {
    '--card-bg': t.cardBg,
    '--card-title': t.title,
    '--card-subtitle': t.subtitle,
    '--card-description': t.description,
    '--card-cta': t.cta,
  }

  if (t.badgeBg) {
    cardStyle['--card-badge-bg'] = t.badgeBg
    cardStyle['--card-badge-text'] = t.badgeText
  }

  return (
    <article className={styles.featuredCard}>
      <Link
        href={project.slug}
        className={`${styles.cardLink} ${isStacked ? styles.cardStacked : sideClass}`}
        style={cardStyle}
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
                <TagPill key={tag.label} label={tag.label} darkTheme={t.darkTheme} />
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
  const t = themes[project.theme]

  const cardStyle = {
    '--card-bg': t.cardBg,
    '--card-title': t.title,
    '--card-subtitle': t.subtitle,
    '--card-description': t.description,
    '--card-cta': t.cta,
  }

  if (t.contentBg) {
    cardStyle['--card-content-bg'] = t.contentBg
  }

  return (
    <article className={styles.smallCard}>
      <Link href={project.slug} className={styles.smallCardLink} style={cardStyle}>
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
                  darkTheme={t.darkTheme}
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

export default function FeaturedWorkExperimental() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const section = sectionRef.current
    if (!section) return

    const elements = []

    section.querySelectorAll(`.${styles.featuredCard}`).forEach((el, i) => {
      elements.push({ el, visibleClass: styles.featuredCardVisible, groupDelay: i * 150 })
    })

    const label = section.querySelector(`.${styles.moreLabel}`)
    if (label) {
      elements.push({ el: label, visibleClass: styles.moreLabelVisible, groupDelay: 0 })
    }

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
