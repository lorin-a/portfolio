import Hero from '@/components/Hero/Hero'
import FeaturedWork from '@/components/FeaturedWork/FeaturedWork'
import BuildingNow from '@/components/BuildingNow/BuildingNow'
import { cloudVideo, GS_VIDEOS, OTHER_VIDEOS } from '@/lib/cloudinary'
import styles from './page.module.css'

const buildingProjects = [
  {
    title: 'Groundswell Data Viz',
    tags: ['Data Visualization', 'Research'],
    stage: 'In Production',
    stageColor: '#6B8F5E',
    description: 'Interactive visualization of relationship patterns from healthcare worker QI study.',
    previewType: 'video',
    preview: cloudVideo(GS_VIDEOS['entrypage']),
  },
  {
    title: 'Whelm',
    tags: ['Mental Health', 'Web-App'],
    stage: 'Active Development',
    stageColor: '#7B6B8A',
    description: 'Mental health app for untangling overwhelm with somatic self-awareness.',
    previewType: 'video',
    preview: cloudVideo(OTHER_VIDEOS['whelm-preview']),
    videoZoom: true,
  },
  {
    title: 'TRO Tool',
    tags: ['Documentation', 'Legal Access'],
    stage: 'Concept Phase',
    stageColor: '#B07255',
    description: 'Documentation system for survivors of abuse navigating restraining orders.',
    previewType: 'none',
    preview: null,
  },
]

export default function Home() {
  return (
    <main>
      {/* Hero - Typographic Title Sequence */}
      <Hero />

      {/* Featured Work Label + Section */}
      <div className={styles.featuredLabel} id="work">
        <div className={styles.featuredDot} />
        <span>Featured Work</span>
      </div>
      <FeaturedWork />

      {/* Building Now Section */}
      <BuildingNow projects={buildingProjects} />
    </main>
  )
}
