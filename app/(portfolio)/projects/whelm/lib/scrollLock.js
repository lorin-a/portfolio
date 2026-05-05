/* Hold scroll until the returned function is called.
 *
 * Used to anchor the viewport while a one-shot entrance timeline
 * plays out — the user can't scroll past content that's still wiping
 * in. Symmetric across the Whelm hero and the Need section's first
 * beat.
 *
 * Two pieces, both required:
 *
 * 1. Event-listener fallback (forward wheel / touch / keys). Catches
 *    scroll attempts on first paint, before Lenis has finished
 *    initializing. Without this, the user can scroll between
 *    WhelmStory mounting and PortfolioShell's Lenis init landing on
 *    the next tick (React effects run children-before-parents on
 *    mount, so WhelmStory's useGSAP fires BEFORE the parent's
 *    `window.__lenis = lenis` assignment).
 *
 * 2. Lenis stop. Lenis intercepts wheel + touch + keys itself and
 *    drives scroll via RAF. preventDefault on a wheel listener does
 *    NOT stop Lenis — it still translates the wheel delta into a
 *    tween. The only reliable lock inside a Lenis page is
 *    `lenis.stop()` / `lenis.start()`. We poll for Lenis on rAF and
 *    call stop the moment it's available.
 */
export function lockForwardScroll() {
  if (typeof window === 'undefined') return () => {}

  let released = false
  let lenisReleaseFn = null
  let pollHandle = null

  const tryStopLenis = () => {
    const lenis = window.__lenis
    if (!lenis) return false
    lenis.stop()
    lenisReleaseFn = () => lenis.start()
    return true
  }

  const poll = () => {
    if (released) return
    if (tryStopLenis()) return
    pollHandle = requestAnimationFrame(poll)
  }

  /* Try Lenis up front; if it's not ready yet, poll until it is. */
  if (!tryStopLenis()) {
    pollHandle = requestAnimationFrame(poll)
  }

  /* Fallback DOM listeners — block forward scroll during the gap
     before Lenis arrives (and on routes/states where Lenis is not
     active at all, e.g. reduced motion). */
  let touchStartY = 0
  const onWheel = (e) => { if (e.deltaY > 0) e.preventDefault() }
  const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
  const onTouchMove = (e) => {
    const dy = touchStartY - e.touches[0].clientY
    if (dy > 0) e.preventDefault()
  }
  const FORWARD_KEYS = new Set([' ', 'PageDown', 'ArrowDown', 'ArrowRight', 'End'])
  const onKey = (e) => { if (FORWARD_KEYS.has(e.key)) e.preventDefault() }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('keydown', onKey)

  return () => {
    released = true
    if (pollHandle != null) cancelAnimationFrame(pollHandle)
    if (lenisReleaseFn) lenisReleaseFn()
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('keydown', onKey)
  }
}
