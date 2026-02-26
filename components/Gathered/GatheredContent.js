'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { gatheredItems } from '@/content/gathered'
import styles from './Gathered.module.css'

/* ============================================
   STORAGE KEY
   ============================================ */
const THEME_KEY = 'gathered-theme'

/* ============================================
   PLACEHOLDER SHAPE RENDERER
   Used until real Cloudinary images are added.
   Once an item has an `image` value, this is
   bypassed and <img> is rendered instead.
   ============================================ */
function PlaceholderShape({ item, isDark }) {
  const { shape, colors, size } = item
  const shadow = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.12)'

  const wrap = {
    width: size.w,
    height: size.h,
    filter: `drop-shadow(2px 3px 6px ${shadow})`,
  }

  if (shape === 'stone') {
    return (
      <div style={wrap}>
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`g-${item.id}`} cx="40%" cy="35%">
              <stop offset="0%" stopColor={colors[2] || colors[0]} stopOpacity="0.9" />
              <stop offset="50%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </radialGradient>
          </defs>
          <ellipse
            cx={size.w / 2}
            cy={size.h / 2}
            rx={size.w / 2 - 4}
            ry={size.h / 2 - 4}
            fill={`url(#g-${item.id})`}
          />
          <ellipse
            cx={size.w * 0.38}
            cy={size.h * 0.32}
            rx={size.w * 0.18}
            ry={size.h * 0.12}
            fill="rgba(255,255,255,0.15)"
            transform={`rotate(-20 ${size.w * 0.38} ${size.h * 0.32})`}
          />
        </svg>
      </div>
    )
  }

  if (shape === 'crystal') {
    const w = size.w
    const h = size.h
    return (
      <div style={wrap}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <defs>
            <linearGradient id={`g-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="50%" stopColor={colors[1]} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors[2]} />
            </linearGradient>
          </defs>
          <polygon
            points={`${w * 0.3},0 ${w * 0.7},${h * 0.05} ${w},${h * 0.4} ${w * 0.85},${h} ${w * 0.15},${h * 0.9} 0,${h * 0.35}`}
            fill={`url(#g-${item.id})`}
          />
          <polygon
            points={`${w * 0.35},${h * 0.05} ${w * 0.55},${h * 0.1} ${w * 0.5},${h * 0.5} ${w * 0.2},${h * 0.4}`}
            fill="rgba(255,255,255,0.12)"
          />
        </svg>
      </div>
    )
  }

  if (shape === 'book') {
    return (
      <div style={{ ...wrap, display: 'flex' }}>
        <div
          style={{
            width: 8,
            height: size.h,
            background: colors[0],
            borderRadius: '2px 0 0 2px',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            flex: 1,
            height: size.h,
            background: `linear-gradient(135deg, ${colors[1]} 0%, ${colors[2]} 100%)`,
            borderRadius: '0 3px 3px 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 30%)',
            }}
          />
        </div>
      </div>
    )
  }

  if (shape === 'card') {
    return (
      <div
        style={{
          ...wrap,
          background: `linear-gradient(170deg, ${colors[0]} 0%, ${colors[1]} 40%, ${colors[2]} 100%)`,
          borderRadius: 5,
          border: `3px solid ${colors[3] || '#FBF9F6'}`,
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 50 70" aria-hidden="true">
          <circle cx="25" cy="20" r="10" fill="rgba(255,255,255,0.15)" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="25"
              y1="20"
              x2={25 + Math.cos((i * Math.PI) / 4) * 16}
              y2={20 + Math.sin((i * Math.PI) / 4) * 16}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />
          ))}
          <circle cx="25" cy="55" r="3" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
    )
  }

  if (shape === 'textile') {
    const w = size.w
    const h = size.h
    return (
      <div style={{ ...wrap, borderRadius: 4, overflow: 'hidden', background: colors[0] }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <rect width={w} height={h} fill={colors[0]} />
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={18 + (i % 3) * 38}
              cy={20 + Math.floor(i / 3) * 42}
              r={12 + (i % 2) * 5}
              fill={colors[(i + 1) % colors.length]}
              opacity="0.8"
            />
          ))}
        </svg>
      </div>
    )
  }

  if (shape === 'paper') {
    return (
      <div
        style={{
          ...wrap,
          background: colors[0],
          borderRadius: 2,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: 2,
              background: colors[2] || '#956058',
              opacity: 0.2 + i * 0.05,
              borderRadius: 1,
              width: `${70 + i * 8}%`,
            }}
          />
        ))}
      </div>
    )
  }

  if (shape === 'painting') {
    const w = size.w
    const h = size.h
    return (
      <div style={{ ...wrap, borderRadius: 3, overflow: 'hidden' }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <rect width={w} height={h} fill="#F5EDDA" />
          {colors.map((c, i) => (
            <ellipse
              key={i}
              cx={20 + i * 25}
              cy={15 + i * 18}
              rx={25 + i * 5}
              ry={12 + i * 4}
              fill={c}
              opacity={0.7}
              transform={`rotate(${-15 + i * 20} ${20 + i * 25} ${15 + i * 18})`}
            />
          ))}
        </svg>
      </div>
    )
  }

  if (shape === 'circle') {
    return (
      <div
        style={{
          ...wrap,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]})`,
          border: `2px solid ${colors[1]}`,
        }}
      />
    )
  }

  if (shape === 'organic') {
    const w = size.w
    const h = size.h
    return (
      <div style={wrap}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
          <defs>
            <linearGradient id={`g-${item.id}`} x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="60%" stopColor={colors[1]} />
              <stop offset="100%" stopColor={colors[2]} />
            </linearGradient>
          </defs>
          <path
            d={`M${w * 0.5},${h * 0.02} C${w * 0.7},${h * 0.05} ${w * 0.9},${h * 0.2} ${w * 0.85},${h * 0.4} C${w * 0.8},${h * 0.6} ${w * 0.95},${h * 0.75} ${w * 0.7},${h * 0.95} C${w * 0.5},${h} ${w * 0.3},${h * 0.9} ${w * 0.2},${h * 0.7} C${w * 0.1},${h * 0.5} ${w * 0.05},${h * 0.3} ${w * 0.2},${h * 0.12} C${w * 0.35},0 ${w * 0.45},0 ${w * 0.5},${h * 0.02}Z`}
            fill={`url(#g-${item.id})`}
          />
        </svg>
      </div>
    )
  }

  /* Fallback */
  return <div style={{ ...wrap, background: colors[0], borderRadius: 4 }} />
}

/* ============================================
   TOOLTIP
   ============================================ */
function Tooltip({ item, isDark, anchorPosition }) {
  const nearLeft = anchorPosition.x < 20
  const nearRight = anchorPosition.x > 80
  const nearTop = anchorPosition.y < 20
  const nearBottom = anchorPosition.y > 75

  let positionStyle

  if (nearLeft || nearRight) {
    /* Near horizontal edge — place above or below to avoid clipping */
    positionStyle = {
      left: '50%',
      transform: 'translateX(-50%)',
      ...(nearBottom ? { bottom: 'calc(100% + 12px)' } : { top: 'calc(100% + 12px)' }),
    }
  } else {
    /* Default — place to the side with more space */
    const tooltipSide = anchorPosition.x > 50 ? 'left' : 'right'
    positionStyle = {
      [tooltipSide]: 'calc(100% + 16px)',
      ...(nearTop ? { top: -8 } : nearBottom ? { bottom: -8 } : { top: -8 }),
    }
  }

  return (
    <div
      className={`${styles.tooltip} ${isDark ? styles.tooltipDark : styles.tooltipLight}`}
      style={positionStyle}
      role="tooltip"
    >
      <span className={styles.tooltipName}>{item.name}</span>
      <span className={styles.tooltipNote}>{item.note}</span>
      {item.link && (
        <span className={styles.tooltipLink}>
          <span aria-hidden="true">&rarr;</span> View
        </span>
      )}
    </div>
  )
}

/* ============================================
   GATHERED ITEM
   ============================================ */
function GatheredItem({ item, isDark, isActive, onHover, onLeave, onTap }) {
  const itemRef = useRef(null)

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
      style={{
        '--item-x': `${item.position.x}%`,
        '--item-y': `${item.position.y}%`,
        '--item-rotation': `${item.rotation}deg`,
        '--item-z': item.zIndex,
        '--mobile-order': item.mobileOrder,
      }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={onLeave}
      onClick={() => onTap(item.id)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name}: ${item.note}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onTap(item.id)
        }
        if (e.key === 'Escape') {
          onLeave()
        }
      }}
    >
      {item.image ? (
        /* Real image from Cloudinary — uncomment and configure when ready */
        /* <img
          src={cloudImg(item.image, item.size.w * 2)}
          alt={item.name}
          width={item.size.w}
          height={item.size.h}
          className={styles.itemImage}
          loading="lazy"
        /> */
        <PlaceholderShape item={item} isDark={isDark} />
      ) : (
        <PlaceholderShape item={item} isDark={isDark} />
      )}

      {isActive && (
        <Tooltip item={item} isDark={isDark} anchorPosition={item.position} />
      )}
    </div>
  )
}

/* ============================================
   MAIN COMPONENT
   ============================================ */
export default function GatheredContent() {
  const [isDark, setIsDark] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  const [tappedId, setTappedId] = useState(null)
  const [mounted, setMounted] = useState(false)

  const activeId = hoveredId || tappedId

  /* ---- Load saved preference ---- */
  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved === 'light') setIsDark(false)
      if (saved === 'dark') setIsDark(true)
    } catch {
      /* localStorage unavailable — use default */
    }
  }, [])

  /* ---- Persist preference ---- */
  useEffect(() => {
    if (!mounted) return

    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    } catch {
      /* silent fail */
    }
  }, [isDark, mounted])

  /* ---- Handlers ---- */
  const handleHover = useCallback((id) => setHoveredId(id), [])
  const handleLeave = useCallback(() => setHoveredId(null), [])
  const handleTap = useCallback(
    (id) => setTappedId((prev) => (prev === id ? null : id)),
    []
  )

  /* ---- Close tooltip on outside click ---- */
  useEffect(() => {
    const handleClick = (e) => {
      if (tappedId && !e.target.closest(`.${styles.item}`)) {
        setTappedId(null)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [tappedId])

  /* ---- Prevent flash of wrong theme ---- */
  if (!mounted) {
    return <div className={styles.page} style={{ background: 'var(--color-cream)' }} />
  }

  return (
    <div className={`${styles.page} ${isDark ? styles.pageDark : styles.pageLight}`}>
      {/* Grain texture overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Gathered</h1>
        <p className={styles.subtitle}>What&rsquo;s on my desk right now.</p>
      </div>

      {/* Theme toggle */}
      <div className={styles.toggleWrap}>
        <span className={styles.toggleLabel}>
          {isDark ? 'Dark' : 'Light'}
        </span>
        <button
          onClick={() => setIsDark(!isDark)}
          className={styles.toggle}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} background`}
          aria-pressed={isDark}
        >
          <span
            className={`${styles.toggleThumb} ${isDark ? styles.toggleThumbDark : styles.toggleThumbLight}`}
          />
        </button>
      </div>

      {/* Object field */}
      <div className={styles.field}>
        {gatheredItems.map((item) => (
          <GatheredItem
            key={item.id}
            item={item}
            isDark={isDark}
            isActive={activeId === item.id}
            onHover={handleHover}
            onLeave={handleLeave}
            onTap={handleTap}
          />
        ))}
      </div>
    </div>
  )
}
