'use client'

import { Fragment } from 'react'

import { ELEMENT_IDS } from '../data'
import { ELEMENT_REGISTRY } from './registry'
import styles from '../whelm.module.css'

/* The persistent element layer. Renders one wrapper per element id
   as a direct grid child of .stage so each wrapper participates in
   the 14-column grid (sidebar | content). Wrappers never unmount —
   the orchestrator drives beat-driven opacity via the .element class
   and CSS variables, so element identity persists for the entire
   pinned scroll. */
export default function Stage() {
  return (
    <Fragment>
      {ELEMENT_IDS.map(id => {
        const def = ELEMENT_REGISTRY[id]
        if (!def) return null
        const Renderer = def.render
        return (
          <div key={id} data-element-id={id} className={styles.element}>
            <Renderer />
          </div>
        )
      })}
    </Fragment>
  )
}
