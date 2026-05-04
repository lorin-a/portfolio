'use client'

import { forwardRef } from 'react'
import styles from './whelm.module.css'

/* Persistent left sidebar — visible from Section 1 onward, hidden in
   full-bleed beats (Hero, future Section 4 Whelm reveal). The orchestrator
   sets `data-state` and `data-active-section` on the <aside> via tl.call()
   at each beat label; CSS handles the visual highlight via attribute-
   selector rules. forwardRef so the orchestrator can address the
   <aside> directly without a wrapper. */

export const SECTIONS = [
  { id: 'gap',       label: 'The Gap' },
  { id: 'need',      label: 'The Need' },
  { id: 'audience',  label: 'The Audience' },
  { id: 'framework', label: 'The Framework' },
  { id: 'research',  label: 'The Research' },
  { id: 'design',    label: 'The Design' },
]

const SidebarAgenda = forwardRef(function SidebarAgenda(_props, ref) {
  return (
    <aside
      ref={ref}
      className={styles.sidebar}
      aria-label="Agenda"
      data-state="hidden"
    >
      <p className={styles.sidebarTitle} aria-hidden="true">Agenda</p>
      <ol className={styles.sidebarList}>
        {SECTIONS.map(s => (
          <li
            key={s.id}
            className={styles.sidebarItem}
            data-section={s.id}
          >
            <span className={styles.sidebarDot} aria-hidden="true" />
            <span className={styles.sidebarLabel}>{s.label}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
})

export default SidebarAgenda
