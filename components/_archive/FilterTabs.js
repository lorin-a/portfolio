'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import styles from './FilterTabs.module.css'

export default function FilterTabs({ categories, projects }) {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(activeCategory))
  
  const heroProjects = filteredProjects.filter(p => p.tier === 'hero')
  const supportingProjects = filteredProjects.filter(p => p.tier === 'supporting')
  const galleryProjects = filteredProjects.filter(p => p.tier === 'gallery')
  
  return (
    <div className={styles.container}>
      {/* Filter Tabs */}
      <nav className={styles.tabs} aria-label="Filter projects by category">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </nav>
      
      {/* Hero Projects */}
      {heroProjects.length > 0 && (
        <div className={styles.heroProjects}>
          {heroProjects.map(project => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              tags={project.tags}
              href={`/projects/${project.slug}`}
              size="large"
            />
          ))}
        </div>
      )}
      
      {/* Supporting Projects */}
      {supportingProjects.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>More Work</h2>
          <div className={styles.supportingProjects}>
            {supportingProjects.map(project => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                tags={project.tags}
                href={`/projects/${project.slug}`}
                size="medium"
              />
            ))}
          </div>
        </>
      )}
      
      {/* Gallery Projects */}
      {galleryProjects.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Selected Projects</h2>
          <div className={styles.galleryProjects}>
            {galleryProjects.map(project => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                subtitle={project.subtitle}
                tags={project.tags}
                href={`/projects/${project.slug}`}
                size="small"
              />
            ))}
          </div>
        </>
      )}
      
      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <p className={styles.empty}>No projects in this category yet.</p>
      )}
    </div>
  )
}
