'use client'

import { useState } from 'react'
import styles from '@/styles/project.module.css'

export default function DiagramTabs() {
  const [activeTab, setActiveTab] = useState('ecosystem')

  const diagrams = {
    ecosystem: {
      src: '/images/groundswell/gs-ecosystem-diagram-purple.svg',
      alt: 'Ecosystem flow diagram showing how CTB Email, Pod, Garden Art Wall, and Reflection Cards connect to moments like arriving at work, taking a break, patient loss, hard moments, and one-on-one meetings',
    },
    values: {
      src: '/images/groundswell/gs-values-diagram.svg',
      alt: 'Groundswell core values: Humanity, Together, Normalcy, and Compassion forming a continuous cycle',
    },
  }

  const tabs = [
    { id: 'ecosystem', label: 'System Map' },
    { id: 'values', label: 'Core Values' },
  ]

  return (
    <div className={styles.diagramTabs}>
      <div className={styles.segmentedControl} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={`${styles.segmentedButton} ${activeTab === tab.id ? styles.segmentedButtonActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.diagramTabContent}>
        <div
          className={styles.diagramTabPanel}
          role="tabpanel"
          style={{ opacity: activeTab === 'ecosystem' ? 1 : 0, position: activeTab === 'ecosystem' ? 'relative' : 'absolute' }}
        >
          <img
            src={diagrams.ecosystem.src}
            alt={diagrams.ecosystem.alt}
            className={styles.diagramImageLarge}
            loading="lazy"
          />
        </div>
        <div
          className={styles.diagramTabPanel}
          role="tabpanel"
          style={{ opacity: activeTab === 'values' ? 1 : 0, position: activeTab === 'values' ? 'relative' : 'absolute' }}
        >
          <img
            src={diagrams.values.src}
            alt={diagrams.values.alt}
            className={styles.diagramImageLarge}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
