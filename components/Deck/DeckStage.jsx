'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import s from './DeckStage.module.css'
import { prefersReducedMotion } from './useDeckBuild'

/* The deck engine. Given a slide manifest, it owns navigation: → advances the
   current slide's build one step, and once the last step is composed, moves to
   the next slide. ← walks back the same path. Reduced motion collapses every
   slide to a single composed step. The frames themselves are dumb: each gets
   { active, step } and plays its own paused timeline to that step.

   slides: Array<{
     id, register, beat, question,
     steps: number,            // build steps within the slide (>=1)
     render: ({ active, step }) => JSX,
   }>
*/
export default function DeckStage({ slides, caseLabel = 'Birth Story', timeDial = null, badge = 'Draft · frame demo' }) {
  const [slide, setSlide] = useState(0)
  const [step, setStep] = useState(0)
  const [reduce, setReduce] = useState(false)
  const liveRef = useRef(null)

  useEffect(() => { setReduce(prefersReducedMotion()) }, [])

  // When the cut changes (e.g. the time dial re-times the deck), restart it.
  const slidesKey = slides.map((s) => s.id).join('|')
  useEffect(() => { setSlide(0); setStep(0) }, [slidesKey])

  const stepsFor = useCallback(
    (i) => (reduce ? 1 : Math.max(1, slides[i]?.steps ?? 1)),
    [reduce, slides]
  )
  const lastSlide = slides.length - 1

  const next = useCallback(() => {
    setStep((st) => {
      if (st < stepsFor(slide) - 1) return st + 1
      if (slide < lastSlide) { setSlide(slide + 1); return 0 }
      return st
    })
  }, [slide, lastSlide, stepsFor])

  const prev = useCallback(() => {
    setStep((st) => {
      if (st > 0) return st - 1
      if (slide > 0) {
        const target = slide - 1
        setSlide(target)
        // land on the previous slide fully composed
        return stepsFor(target) - 1
      }
      return st
    })
  }, [slide, stepsFor])

  const goStart = useCallback(() => { setSlide(0); setStep(0) }, [])
  const goEnd = useCallback(() => {
    setSlide(lastSlide)
    setStep(stepsFor(lastSlide) - 1)
  }, [lastSlide, stepsFor])

  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault(); next(); break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault(); prev(); break
        case 'Home': e.preventDefault(); goStart(); break
        case 'End': e.preventDefault(); goEnd(); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goStart, goEnd])

  // guard the single render between a cut change and the reset effect
  const idx = Math.min(slide, slides.length - 1)
  const current = slides[idx]
  const atStart = slide === 0 && step === 0
  const atEnd = slide === lastSlide && step === stepsFor(lastSlide) - 1

  // announce slide changes for screen readers
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent =
        `Slide ${slide + 1} of ${slides.length}. ${current.register}. ${current.beat}.`
    }
  }, [slide, current, slides.length])

  const dots = useMemo(() => {
    const n = stepsFor(slide)
    return Array.from({ length: n }, (_, i) => i)
  }, [slide, stepsFor])

  return (
    <div className={s.deck} role="application" aria-label={`${caseLabel} deck`}>
      <span className={s.badge}>
        <span className={s.badgeDot} aria-hidden="true" />
        {badge}
      </span>
      <p className={s.hint} aria-hidden="true">
        <kbd>←</kbd> <kbd>→</kbd> to move
      </p>

      <div className={s.stageWrap}>
        <div className={s.stage}>
          {slides.map((sl, i) => (
            <div
              key={sl.id}
              className={`${s.slide} ${i === slide ? s.slideOn : ''}`}
              aria-hidden={i === slide ? undefined : true}
            >
              {sl.render({ active: i === slide, step: i === slide ? step : 0 })}
            </div>
          ))}
        </div>
      </div>

      <div className={s.rail}>
        <div className={`${s.railGroup} ${s.railLeft}`}>
          <span className={s.register}>{current.register}</span>
          <span className={s.beat}><b>{current.beat}</b></span>
        </div>

        <span className={s.qtag}>{current.question}</span>

        <div className={`${s.railGroup} ${s.railRight}`}>
          {timeDial && (
            <div className={s.dial} role="group" aria-label="Presentation length">
              {timeDial.options.map((o) => (
                <button
                  key={o.value}
                  className={`${s.dialBtn} ${o.value === timeDial.value ? s.dialOn : ''}`}
                  aria-pressed={o.value === timeDial.value}
                  onClick={() => timeDial.onChange(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
          <div className={s.dots} aria-hidden="true">
            {dots.map((i) => (
              <span
                key={i}
                className={`${s.dot} ${i === step ? s.dotOn : ''} ${i < step ? s.dotDone : ''}`}
              />
            ))}
          </div>
          <span className={s.counter}>{slide + 1} / {slides.length}</span>
          <div className={s.navBtns}>
            <button className={s.navBtn} onClick={prev} disabled={atStart} aria-label="Previous">‹</button>
            <button className={s.navBtn} onClick={next} disabled={atEnd} aria-label="Next">›</button>
          </div>
        </div>
      </div>

      <p ref={liveRef} className={s.srOnly} aria-live="polite" role="status" />
    </div>
  )
}
