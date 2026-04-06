/**
 * GSAP Setup — Single source of truth for plugin registration and reusable effects.
 * Import this file once at the app level. Components import gsap directly.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'

/* ─── Register all plugins once ─── */
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip)

/* ─── Reusable effects ─── */

/**
 * fadeUp — Standard scroll reveal.
 * Elements rise from below with opacity fade.
 * Usage: gsap.effects.fadeUp('.cards')
 *        tl.fadeUp('.cards', { y: 50, delay: 0.2 })
 */
gsap.registerEffect({
  name: 'fadeUp',
  effect: (targets, config) => {
    return gsap.from(targets, {
      y: config.y,
      autoAlpha: 0,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      delay: config.delay,
    })
  },
  defaults: {
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power1.inOut',
    delay: 0,
  },
  extendTimeline: true,
})

/**
 * wipeIn — Clip-path text reveal from left.
 * Usage: gsap.effects.wipeIn('.title')
 */
gsap.registerEffect({
  name: 'wipeIn',
  effect: (targets, config) => {
    gsap.set(targets, { visibility: 'visible' })
    return gsap.fromTo(targets, {
      clipPath: 'inset(-0.2em 100% -0.2em 0)',
    }, {
      clipPath: 'inset(-0.2em 0% -0.2em 0)',
      duration: config.duration,
      ease: config.ease,
      delay: config.delay,
    })
  },
  defaults: {
    duration: 1.0,
    ease: 'power1.inOut',
    delay: 0,
  },
  extendTimeline: true,
})

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip }
