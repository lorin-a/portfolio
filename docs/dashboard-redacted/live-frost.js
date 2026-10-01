// FS213: continuous frosting for recordings. Blurs (never replaces) any
// element whose own text holds a number, as it appears or changes, so
// count-up animations stay frosted. Definitions stay sharp. On the survey
// page the plotted lines are frosted too. A quiet pill names why.
(() => {
  if (window.__frostOn) return; window.__frostOn = true
  const KEEP = /(AM|PM)\b|Floor|Sensor offline|\b(19|20)\d\d\b|\(\s*<?\s*\d+\s*([–-]\s*\d+)?\+?\s*Min\s*\)|^\s*(<\s*)?\d+\s*([–-]\s*\d+)?\+?\s*Min\s*$/
  const FINDING = /no change|unchanged|significan|better than|worse than|improv|declin|lower is better|higher is better|ANOVA|below baseline/i
  const css = document.createElement('style')
  css.textContent = '[data-fz]{filter:blur(0.3em)!important} svg [data-fz]{filter:blur(4px)!important} [data-fzplot]{filter:blur(5px)!important}'
  const label = () => { if (document.querySelector('[data-fzlabel]') || !document.body) return; const l = document.createElement('div'); l.dataset.fzlabel = '1'; l.textContent = 'Figures blurred for study confidentiality'; l.style.cssText = 'position:fixed;right:24px;bottom:24px;z-index:2147483646;padding:8px 14px;border-radius:999px;background:rgba(84,74,104,0.92);color:#f7ebe6;font:500 12px/1.2 system-ui,sans-serif;letter-spacing:0.04em;box-shadow:0 4px 16px rgba(0,0,0,0.15);pointer-events:none'; document.body.append(l) }
  const scan = () => {
    if (!document.body) return
    if (!css.isConnected) document.head?.append(css)
    label()
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (w.nextNode()) {
      const t = w.currentNode, el = t.parentElement
      if (!el || el.closest('[data-fzlabel],script,style')) continue
      const txt = t.data
      if ((/\d/.test(txt) && !KEEP.test(txt) && !KEEP.test(el.textContent)) || FINDING.test(txt)) el.setAttribute('data-fz', '')
    }
    if (location.pathname.startsWith('/survey')) document.querySelectorAll('main svg path, main svg polyline, main svg circle, main svg line').forEach(e => { const r = e.closest('svg').getBoundingClientRect(); if (r.width > 60 && r.height > 30) e.setAttribute('data-fzplot', '') })
  }
  const run = () => { scan(); new MutationObserver(() => { cancelAnimationFrame(window.__fzr); window.__fzr = requestAnimationFrame(scan) }).observe(document.documentElement, { subtree: true, childList: true, characterData: true }) }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run()
})()
