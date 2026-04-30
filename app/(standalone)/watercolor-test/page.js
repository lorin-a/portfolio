'use client'

import { useState } from 'react'
import WatercolorReveal from '@/components/WatercolorReveal/WatercolorReveal'

// Phase 1 sandbox: verifies three.js + @react-three/fiber compile and run
// under Next 14 + React 18. Delete before Phase 4 commit.
export default function WatercolorTestPage() {
  const [completed, setCompleted] = useState(false)

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '100dvh',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      <WatercolorReveal duration={24000} onComplete={() => setCompleted(true)} />

      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: 12,
          borderRadius: 4,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        sandbox · {completed ? 'onComplete fired ✓' : 'revealing…'}
      </div>
    </main>
  )
}
