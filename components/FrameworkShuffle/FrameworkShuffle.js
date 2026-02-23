'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './FrameworkShuffle.module.css'

const FRAMEWORK_ITEMS = [
  {
    id: 'sense',
    root: 'sense',
    subs: ['details', 'patterns', 'tensions'],
    Mark: SenseMark,
    colorClass: 'sense',
  },
  {
    id: 'weave',
    root: 'weave',
    subs: ['stories & systems', 'empathy & evidence', 'details & dreams'],
    Mark: WeaveMark,
    colorClass: 'weave',
  },
  {
    id: 'shape',
    root: 'shape',
    subs: ['experiences', 'environments', 'culture'],
    Mark: ShapeMark,
    colorClass: 'shape',
  },
]

function ShuffleWord({ item, delay = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [exitClass, setExitClass] = useState('')
  const [enterClass, setEnterClass] = useState('')
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const allWords = [item.root, ...item.subs]

  const startShuffle = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      const cycle = () => {
        setCurrentIndex(prev => {
          const next = (prev + 1) % allWords.length
          return next
        })
      }
      cycle()
      intervalRef.current = setInterval(cycle, 1200)
    }, 300)
  }, [allWords.length])

  const stopShuffle = useCallback(() => {
    clearTimeout(timeoutRef.current)
    clearInterval(intervalRef.current)
    setCurrentIndex(0)
  }, [])

  const itemRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (delay <= 0) {
      setVisible(true)
      return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    import('gsap').then(({ gsap }) => {
      gsap.fromTo(itemRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay }
      )
      setVisible(true)
    })
  }, [delay])

  return (
    <div
      ref={itemRef}
      className={`${styles.fwItem} ${styles[item.colorClass]}`}
      style={delay > 0 ? { opacity: 0 } : undefined}
      onMouseEnter={startShuffle}
      onMouseLeave={stopShuffle}
    >
      <item.Mark animate={visible} delay={delay} />
      <div className={styles.wordContainer} aria-live="polite">
        {allWords.map((word, i) => {
          const isActive = i === currentIndex
          const isRoot = i === 0
          let className = styles.word
          if (isActive) className += ` ${styles.wordActive}`
          else className += ` ${styles.wordBelow}`
          if (isRoot) className += ` ${styles.wordRoot}`
          else className += ` ${styles.wordSub}`

          return (
            <span key={i} className={className}>
              {item.id === 'weave' && !isRoot ? (
                <>
                  {word.split(' & ').map((part, j) => (
                    <span key={j}>
                      {j > 0 && <span className={styles.amp}>&</span>}
                      {part}
                    </span>
                  ))}
                </>
              ) : (
                word
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function FrameworkShuffle({ startDelay = 0, itemStagger = 0.6 }) {
  return (
    <div className={styles.fwRow}>
      {FRAMEWORK_ITEMS.map((item, i) => (
        <ShuffleWord
          key={item.id}
          item={item}
          delay={startDelay + i * itemStagger}
        />
      ))}
    </div>
  )
}
