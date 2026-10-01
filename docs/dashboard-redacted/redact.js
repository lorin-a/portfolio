// Runs in the dashboard page before each capture. Every digit run becomes a
// solid bar in its own text colour (the number is removed from the DOM, so it
// cannot survive into the image). Long free-text responses are barred too.
(() => {
  document.querySelectorAll('nextjs-portal, [data-nextjs-toast], [data-next-badge-root]').forEach(e => e.remove())
  const bar = (len, color) => {
    const s = document.createElement('span')
    s.textContent = '0'.repeat(Math.max(1, len))
    s.style.cssText = `color:transparent;background:color-mix(in srgb, ${color} 42%, transparent);border-radius:0.18em;-webkit-box-decoration-break:clone;`
    s.dataset.redacted = '1'
    return s
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) if (/\d/.test(walker.currentNode.data)) nodes.push(walker.currentNode)
  // definitions, not data: times of day, duration bins on an axis, the floor
  const KEEP = /(AM|PM)\b|^\s*(<\s*)?\d+\s*([–-]\s*\d+)?\+?\s*Min\s*$|Floor|\b(19|20)\d\d\b/
  for (const n of nodes) {
    const el = n.parentElement; if (!el || el.closest('script,style,[data-redacted]')) continue
    if (KEEP.test(n.data) || KEEP.test(el.textContent)) continue
    const color = getComputedStyle(el).color
    const frag = document.createDocumentFragment()
    n.data.split(/([\d][\d,.%+:]*)/).forEach((part, i) => {
      if (!part) return
      frag.append(i % 2 ? bar(part.length, color) : document.createTextNode(part))
    })
    n.replaceWith(frag)
  }
  // findings stated in words (survey results are study data, FS116)
  const FINDING = /no change|significan|better than|worse than|improv|declin|increas|decreas|ANOVA/i
  const w3 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const fnodes = []
  while (w3.nextNode()) if (FINDING.test(w3.currentNode.data)) fnodes.push(w3.currentNode)
  for (const n of fnodes) { const el = n.parentElement; if (!el || el.closest('[data-redacted]')) continue; const blk = el.closest('li,p,div') || el; blk.querySelectorAll('*').forEach(c => { c.style.color = 'transparent'; c.style.background = 'none' }); blk.style.color = 'transparent'; blk.style.background = 'repeating-linear-gradient(transparent 0 0.3em, color-mix(in srgb, #7a6f6c 40%, transparent) 0.3em 1.05em, transparent 1.05em 1.55em)'; blk.style.borderRadius = '0.2em'; blk.dataset.redacted = '1' }
  // staff free text: quotes and response cards
  document.querySelectorAll('blockquote, q, [class*=uote], [class*=esponse], [class*=essage]').forEach(el => {
    if (el.closest('[data-redacted]') || el.innerText.trim().split(/\s+/).length < 6) return
    el.querySelectorAll('*').forEach(c => { c.style.color = 'transparent' })
    el.style.color = 'transparent'
    el.style.background = 'repeating-linear-gradient(transparent 0 0.35em, rgba(90,80,110,0.55) 0.35em 1.05em, transparent 1.05em 1.6em)'
    el.dataset.redacted = '1'
  })
  // nothing numeric may remain visible
  const left = []
  const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (w2.nextNode()) { const t = w2.currentNode; const p = t.parentElement; if (/\d/.test(t.data) && !KEEP.test(t.data) && !KEEP.test(p?.textContent || '') && p && !p.closest('[data-redacted],script,style') && p.offsetParent !== null && getComputedStyle(p).color !== 'rgba(0, 0, 0, 0)') left.push(t.data.trim().slice(0, 30)) }
  return left
})()
