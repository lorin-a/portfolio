'use client'

import { ELEMENT_IDS } from '../data'
import { ELEMENT_REGISTRY } from './registry'
import styles from '../whelm.module.css'

/**
 * The persistent element canvas. One wrapper per element id, mounted
 * once. The orchestrator manipulates each wrapper's CSS custom
 * properties (--ex, --ey, --es, --eo) via GSAP — wrappers never
 * unmount, so element identity persists for the entire pinned scroll.
 */
export default function Stage() {
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <div className={styles.canvas}>
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
      </div>
    </div>
  )
}
