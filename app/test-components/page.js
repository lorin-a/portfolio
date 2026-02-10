'use client'

import ToolList from '@/components/ToolBadge'
import ProjectGallery from '@/components/ProjectGallery'

// Placeholder images for testing (using picsum.photos for real images)
const sampleImages = [
  { src: 'https://picsum.photos/seed/a/800/600', alt: 'Sample landscape image 1' },
  { src: 'https://picsum.photos/seed/b/400/600', alt: 'Sample portrait image 1' },
  { src: 'https://picsum.photos/seed/c/800/600', alt: 'Sample landscape image 2' },
  { src: 'https://picsum.photos/seed/d/800/600', alt: 'Sample landscape image 3' },
  { src: 'https://picsum.photos/seed/e/400/600', alt: 'Sample portrait image 2' },
  { src: 'https://picsum.photos/seed/f/800/600', alt: 'Sample landscape image 4' },
  { src: 'https://picsum.photos/seed/g/800/600', alt: 'Sample landscape image 5' },
]

export default function TestComponents() {
  return (
    <div style={{ padding: 'var(--space-lg) var(--space-md)', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-md)' }}>Component Test Page</h1>
      <p className="body-large" style={{ marginBottom: 'var(--space-xl)', maxWidth: '600px' }}>
        This page previews the new site-wide components before integration. 
        Delete this page before launch.
      </p>
      
      {/* ToolList Section */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ marginBottom: 'var(--space-sm)' }}>ToolList Component</h2>
        <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-light)' }}>
          Minimal badges for displaying tools used on a project.
        </p>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: 'var(--text-body)' }}>With label:</h3>
          <ToolList 
            tools={['Claude', 'VS Code', 'GitHub', 'Vercel', 'Neon']} 
            label="Built with"
          />
        </div>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: 'var(--text-body)' }}>Without label:</h3>
          <ToolList tools={['Figma', 'Miro', 'Notion', 'Google Sheets']} />
        </div>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <h3 style={{ marginBottom: 'var(--space-sm)', fontSize: 'var(--text-body)' }}>Many tools (wrapping test):</h3>
          <ToolList 
            tools={['Claude', 'VS Code', 'GitHub', 'Vercel', 'Figma', 'Miro', 'Notion', 'Google Sheets', 'Zoom', 'Slack']} 
          />
        </div>
      </section>
      
      {/* ProjectGallery Section */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ marginBottom: 'var(--space-sm)' }}>ProjectGallery Component</h2>
        <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-light)' }}>
          Horizontal scroll gallery with lightbox. Mix of landscape and portrait images. 
          Hover to see arrows (desktop) or arrows always visible (mobile). Click any image to open lightbox.
        </p>
        
        <ProjectGallery images={sampleImages} />
        
        <p style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--text-caption)', color: 'var(--color-text-light)' }}>
          Keyboard shortcuts in lightbox: Arrow keys to navigate, Escape to close.
        </p>
      </section>
      
      {/* Typography Reference */}
      <section style={{ marginBottom: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ marginBottom: 'var(--space-md)' }}>Typography Reference</h2>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <h1>Heading 1 (Ovo)</h1>
          <h2>Heading 2 (Ovo)</h2>
          <h3>Heading 3 (Ovo)</h3>
          <h4>Heading 4 (Ovo)</h4>
        </div>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <p className="body-large">Body Large: I uncover human stories and insights that transform how people navigate healthcare, education, and complex systems.</p>
          <p>Body Default: This is the default paragraph style used throughout the site for general content.</p>
          <p className="body-small">Body Small: Secondary information, metadata, and supporting text.</p>
        </div>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <p className="pull-quote">"I feel trapped." — Participant quote in pull-quote style</p>
        </div>
        
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <p className="caption">Caption: Image caption or timestamp style</p>
        </div>
        
        <div>
          <span className="label">Label Style</span>
        </div>
      </section>
    </div>
  )
}
