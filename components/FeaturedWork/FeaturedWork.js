'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './FeaturedWork.module.css'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'
import { themes } from '@/lib/projectThemes'

const featuredProjects = [
  {
    title: 'Groundswell',
    subtitle: 'Making Space to Restore, Together',
    description:
      'A grant-funded systemic design response to oncology staff well-being offering co-designed resources that acknowledge the emotional complexities of oncology care.',
    tags: [
      { label: 'Co-Design' },
      { label: 'Participatory Research' },
      { label: 'Healthcare' },
    ],
    heroImage: cloudImg(HOME_IMAGES['groundswell-hero'], 1200),
    heroAlt:
      'A healthcare worker walks down a hospital hallway toward a colorful mural installation',
    slug: '/projects/groundswell',
    status: null,
    layout: 'stacked',
    theme: 'groundswell',
    ready: true,
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
    ready: false,
    oldPortfolioUrl: 'https://snail-squid-djta.squarespace.com/case-studies/birthstory',
  },
  {
    title: 'Transition Design',
    subtitle: 'Roots to Resilience',
    description:
      'A systems design response to food insecurity in Pittsburgh. Through a multi-level design lens, this project proposes a hyper-local integrated intervention plan to tackle systemic barriers to food security.',
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
    ready: false,
    oldPortfolioUrl: 'https://snail-squid-djta.squarespace.com/case-studies/transitiondesign',
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
    ready: false,
    oldPortfolioUrl: 'https://snail-squid-djta.squarespace.com/case-studies/somebuddy',
  },
  {
    title: 'Bridging the G.A.P.',
    subtitle: 'Bike Touring for Beginners',
    description:
      'Rebrand campaign for the Great Allegheny Passage trail with print, digital, and environmental assets.',
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
    ready: false,
    oldPortfolioUrl: 'https://snail-squid-djta.squarespace.com/case-studies/gap',
  },
  {
    title: 'MindfulNest',
    subtitle: 'SEL Edtech for Pre-K Teachers',
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
    ready: false,
    oldPortfolioUrl: 'https://snail-squid-djta.squarespace.com/case-studies/mindfulnest',
    ready: false,
  },
]

function TagPill({ label, small }) {
  return (
    <span
      className={`${styles.tag} ${small ? styles.tagSmall : ''}`}
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
    '--card-tag-bg': t.tagBg,
    '--card-tag-text': t.tagText,
  }

  if (t.badgeBg) {
    cardStyle['--card-badge-bg'] = t.badgeBg
    cardStyle['--card-badge-text'] = t.badgeText
  }

  const Wrapper = project.ready ? Link : 'div'
  const wrapperProps = project.ready
    ? { href: project.slug, className: `${styles.cardLink} ${isStacked ? styles.cardStacked : sideClass}`, style: cardStyle }
    : { className: `${styles.cardDiv} ${isStacked ? styles.cardStacked : sideClass}`, style: cardStyle }

  return (
    <article className={styles.featuredCard}>
      <Wrapper {...wrapperProps}>
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
                <TagPill key={tag.label} label={tag.label} />
              ))}
            </div>
            <p className={`${styles.description} ${isStacked ? styles.descriptionStacked : styles.descriptionSide}`}>
              {project.description}
            </p>
          </div>
          <span className={styles.cta}>
            {!project.ready && <span className={styles.ctaArrowText}>&rarr;</span>}
            <span>{project.ready ? 'View case study' : 'Coming soon'}</span>
            {project.ready && <span className={styles.ctaArrowText}>&rarr;</span>}
          </span>
        </div>

        {!project.ready && (
          <div className={styles.hoverOverlay}>
            <span className={styles.hoverOverlayTitle}>Case study coming soon</span>
            <a href={project.oldPortfolioUrl} target="_blank" rel="noopener noreferrer" className={styles.hoverOverlayLink} onClick={(e) => e.stopPropagation()}>
              View previous portfolio version &rarr;
            </a>
          </div>
        )}
      </Wrapper>
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
    '--card-tag-bg': t.tagBg,
    '--card-tag-text': t.tagText,
  }

  if (t.contentBg) {
    cardStyle['--card-content-bg'] = t.contentBg
  }

  const Wrapper = project.ready ? Link : 'div'
  const wrapperProps = project.ready
    ? { href: project.slug, className: styles.smallCardLink, style: cardStyle }
    : { className: styles.smallCardDiv, style: cardStyle }

  return (
    <article className={styles.smallCard}>
      <Wrapper {...wrapperProps}>
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
                  small
                />
              ))}
            </div>
            <p className={styles.smallDescription}>{project.description}</p>
          </div>
          <span className={styles.smallCta}>
            {!project.ready && <span className={styles.ctaArrowText}>&rarr;</span>}
            <span>{project.ready ? 'View project' : 'Coming soon'}</span>
            {project.ready && <span className={styles.ctaArrowText}>&rarr;</span>}
          </span>
        </div>

        {!project.ready && (
          <div className={styles.hoverOverlay}>
            <span className={styles.hoverOverlayTitle}>Case study coming soon</span>
            <a href={project.oldPortfolioUrl} target="_blank" rel="noopener noreferrer" className={styles.hoverOverlayLink} onClick={(e) => e.stopPropagation()}>
              View previous portfolio version &rarr;
            </a>
          </div>
        )}
      </Wrapper>
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

    // Featured cards — trigger with standard rootMargin
    const featuredElements = []
    section.querySelectorAll(`.${styles.featuredCard}`).forEach((el, i) => {
      featuredElements.push({ el, visibleClass: styles.featuredCardVisible, groupDelay: i * 150 })
    })

    const makeCallback = (items) => (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const item = items.find((e) => e.el === entry.target)
        if (!item) return
        setTimeout(() => {
          item.el.classList.add(item.visibleClass)
        }, item.groupDelay)
        entry.target.__observer && entry.target.__observer.unobserve(entry.target)
      })
    }

    const featuredObserver = new IntersectionObserver(
      makeCallback(featuredElements),
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )
    featuredElements.forEach(({ el }) => { el.__observer = featuredObserver; featuredObserver.observe(el) })

    // "More Work" label + small cards — separate observer with larger rootMargin
    const lowerElements = []
    const label = section.querySelector(`.${styles.moreLabel}`)
    if (label) {
      lowerElements.push({ el: label, visibleClass: styles.moreLabelVisible, groupDelay: 0 })
    }
    section.querySelectorAll(`.${styles.smallCard}`).forEach((el, i) => {
      lowerElements.push({ el, visibleClass: styles.smallCardVisible, groupDelay: i * 120 })
    })

    const lowerObserver = new IntersectionObserver(
      makeCallback(lowerElements),
      { threshold: 0.15, rootMargin: '0px 0px -150px 0px' }
    )
    lowerElements.forEach(({ el }) => { el.__observer = lowerObserver; lowerObserver.observe(el) })

    return () => {
      featuredObserver.disconnect()
      lowerObserver.disconnect()
    }
  }, [])

  return (
    <section id="work" className={styles.section} ref={sectionRef}>
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
