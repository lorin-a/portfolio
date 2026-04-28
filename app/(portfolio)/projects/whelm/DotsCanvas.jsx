'use client'

import { forwardRef } from 'react'
import { ALL_DOTS } from './data'
import styles from './whelm.module.css'

/**
 * The persistent dot canvas. One <svg> for the whole story. Each dot
 * is a <g data-dot-id="..."> at translate(0,0) with a circle at (0,0).
 * The orchestrator sets x/y/scale via GSAP — this component never
 * unmounts dots, so identity persists across the entire scroll.
 */
const DotsCanvas = forwardRef(function DotsCanvas(_props, ref) {
  return (
    <svg
      ref={ref}
      className={styles.canvas}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g className={styles.cast}>
        {ALL_DOTS.map(dot => (
          <g
            key={dot.id}
            data-dot-id={dot.id}
            data-dot-role={dot.id === 'you' ? 'you' : 'cast'}
            className={styles.dot}
          >
            <circle cx="0" cy="0" r="24" fill={dot.color} />
          </g>
        ))}
      </g>
    </svg>
  )
})

export default DotsCanvas
