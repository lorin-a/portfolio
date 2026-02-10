import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import ProjectNav from '@/components/ProjectNav'
import styles from './page.module.css'

// Get all project slugs for static generation
export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(projectsDirectory)
  
  return filenames
    .filter(name => name.endsWith('.md'))
    .map(name => ({
      slug: name.replace('.md', '')
    }))
}

// Get project data
async function getProject(slug) {
  const filePath = path.join(process.cwd(), 'content/projects', `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    frontmatter: data,
    content
  }
}

// Get all projects for navigation
async function getAllProjects() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(projectsDirectory)
  
  const projects = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(projectsDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug: name.replace('.md', ''),
        title: data.title,
        subtitle: data.subtitle,
        order: data.order || 99
      }
    })
    .sort((a, b) => a.order - b.order)
  
  return projects
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project not found</h1>
        <p>This project page is coming soon.</p>
        <Link href="/">← Back to home</Link>
      </div>
    )
  }
  
  const { frontmatter, content } = project
  const allProjects = await getAllProjects()
  
  // Find prev/next projects
  const currentIndex = allProjects.findIndex(p => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1]
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0]
  
  return (
    <article className={styles.project}>
      {/* Side Navigation Peeks */}
      <ProjectNav 
        prev={prevProject} 
        next={nextProject} 
        currentSlug={slug}
      />
      
      {/* Hero Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          
          {frontmatter.subtitle && (
            <p className={styles.subtitle}>{frontmatter.subtitle}</p>
          )}
          
          {frontmatter.tags && (
            <div className={styles.tags}>
              {frontmatter.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {/* Full-Bleed Hero Image */}
      <div className={styles.heroImage}>
        {frontmatter.hero ? (
          <img 
            src={`/images/${frontmatter.hero}`} 
            alt={`${frontmatter.title} hero image`}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            [{slug}-hero.jpg]
          </div>
        )}
      </div>
      
      {/* Project Details */}
      <div className={styles.details}>
        <div className={styles.detailsGrid}>
          {frontmatter.client && (
            <div className={styles.detail}>
              <h4>Client</h4>
              <p>{frontmatter.client}</p>
            </div>
          )}
          
          {frontmatter.team && (
            <div className={styles.detail}>
              <h4>Team</h4>
              <p>{frontmatter.team}</p>
            </div>
          )}
          
          {frontmatter.role && (
            <div className={styles.detail}>
              <h4>Role</h4>
              <p>{frontmatter.role}</p>
            </div>
          )}
          
          {frontmatter.duration && (
            <div className={styles.detail}>
              <h4>Duration</h4>
              <p>{frontmatter.duration}</p>
            </div>
          )}
          
          {frontmatter.tools && (
            <div className={styles.detail}>
              <h4>Tools</h4>
              <p>{frontmatter.tools}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Live Embed (for vibe-coded projects) */}
      {frontmatter.liveUrl && (
        <div className={styles.liveEmbed}>
          <div className={styles.embedHeader}>
            <span className={styles.embedLabel}>Live Project</span>
            <a 
              href={frontmatter.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.embedLink}
            >
              Open in new tab ↗
            </a>
          </div>
          <div className={styles.embedContainer}>
            <iframe 
              src={frontmatter.liveUrl}
              title={`${frontmatter.title} live demo`}
              className={styles.iframe}
              loading="lazy"
            />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={styles.content}>
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className={styles.sectionHeading}>{children}</h2>
            ),
            img: ({ src, alt }) => (
              <figure className={styles.figure}>
                {src && !src.startsWith('[') ? (
                  <img src={`/images/${src}`} alt={alt || ''} loading="lazy" />
                ) : (
                  <div className={styles.imagePlaceholder}>{src || `[${alt || 'image'}]`}</div>
                )}
                {alt && !alt.includes('.jpg') && !alt.includes('.png') && (
                  <figcaption>{alt}</figcaption>
                )}
              </figure>
            ),
            blockquote: ({ children }) => (
              <blockquote className={styles.quote}>{children}</blockquote>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      {/* Bottom Navigation */}
      <nav className={styles.bottomNav} aria-label="Project navigation">
        <Link href={`/projects/${prevProject.slug}`} className={styles.bottomNavLink}>
          <span className={styles.bottomNavLabel}>Previous</span>
          <span className={styles.bottomNavTitle}>{prevProject.title}</span>
        </Link>
        
        <Link href="/#work" className={styles.backToWork}>
          All Work
        </Link>
        
        <Link href={`/projects/${nextProject.slug}`} className={styles.bottomNavLink}>
          <span className={styles.bottomNavLabel}>Next</span>
          <span className={styles.bottomNavTitle}>{nextProject.title}</span>
        </Link>
      </nav>
    </article>
  )
}
