'use client'

import { useState } from 'react'
import styles from './ReflectionCards.module.css'

// Card gradient colors are decorative per-card values, not system colors.
// They create the watercolor tint on each emotion card face and don't
// appear elsewhere in the design system, so CSS variables aren't warranted.
const CARDS = [
  {
    id: 'heartbroken',
    emotion: 'heartbroken',
    front: 'When your heart feels heavy with loss...',
    back: 'Place one hand on your chest. Feel your breath rise and fall. You don\'t have to hold it all right now.',
    color: '#C4A053',
  },
  {
    id: 'valued',
    emotion: 'valued',
    front: 'When recognition finds you...',
    back: 'Let yourself receive it. Sit with it for one full breath before moving on.',
    color: '#D4917A',
  },
  {
    id: 'invisible',
    emotion: 'invisible',
    front: 'When you feel unseen in your work...',
    back: 'Close your eyes. Press your feet into the floor. You are here.',
    color: '#8BA0B8',
  },
  {
    id: 'connected',
    emotion: 'connected',
    front: 'When you feel yourself pulled toward others who understand...',
    back: 'Notice where you feel that pull in your body. Let it be a compass.',
    color: '#B07A8A',
  },
]

export default function ReflectionCards() {
  const [flipped, setFlipped] = useState({})

  const toggleCard = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <div className={styles.grid}>
        {CARDS.map((card) => {
          const isFlipped = flipped[card.id]
          return (
            <button
              key={card.id}
              className={styles.cardButton}
              onClick={() => toggleCard(card.id)}
              aria-label={`${card.emotion} reflection card — ${isFlipped ? 'showing exercise' : 'click to reveal exercise'}`}
            >
              <div
                className={`${styles.cardInner} ${isFlipped ? styles.cardInnerFlipped : ''}`}
              >
                <div
                  className={styles.cardFront}
                  style={{
                    background: `linear-gradient(145deg, ${card.color}50, ${card.color}25)`,
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  <p className={styles.cardEmotion}>{card.emotion}</p>
                  <p className={styles.cardPrompt}>{card.front}</p>
                </div>
                <div className={styles.cardBack} aria-hidden={!isFlipped}>
                  <p className={styles.cardBackLabel}>Exercise</p>
                  <p className={styles.cardBackText}>{card.back}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <p className={styles.hint}>
        Click any card to see the somatic exercise on the back
      </p>
    </div>
  )
}
