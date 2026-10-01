// FS208: elegant, safe redaction. Each number is replaced with placeholder
// digits (same length), then frosted with a blur that bakes into the PNG.
// Survey findings stated in words are frosted the same way. A quiet label
// names why. Returns any real digits still visible.
(() => {
  document.querySelectorAll('nextjs-portal, [data-nextjs-toast]').forEach(e => e.remove())
  const KEEP = /(AM|PM)\b|Floor|Sensor offline|\(\s*<?\s*\d+\s*([–-]\s*\d+)?\+?\s*Min\s*\)|\b(19|20)\d\d\b|^\s*(<\s*)?\d+\s*([–-]\s*\d+)?\+?\s*Min\s*$/
  const frost = (text) => { const s = document.createElement('span'); s.textContent = text.replace(/\d/g, '8'); s.dataset.frost = '1'; s.style.cssText = 'filter:blur(0.28em);display:inline-block;opacity:0.85;'; return s }
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes = []
  while (w.nextNode()) if (/\d/.test(w.currentNode.data)) nodes.push(w.currentNode)
  for (const n of nodes) {
    const el = n.parentElement; if (!el || el.closest('script,style,[data-frost],[data-label]')) continue
    if (KEEP.test(n.data) || KEEP.test(el.textContent)) continue
    const f = document.createDocumentFragment()
    n.data.split(/(\d[\d,.%+:]*)/).forEach((part, i) => { if (part) f.append(i % 2 ? frost(part) : document.createTextNode(part)) })
    n.replaceWith(f)
  }
  const FINDING = /no change|significan|better than|worse than|improv|declin|increas|decreas|ANOVA|below baseline|above it/i
  const w3 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const fn = []
  while (w3.nextNode()) if (FINDING.test(w3.currentNode.data)) fn.push(w3.currentNode)
  for (const n of fn) { const blk = n.parentElement?.closest('li,p,div'); if (blk && !blk.dataset.frost) { blk.style.filter = 'blur(0.3em)'; blk.dataset.frost = '1' } }
  if (!document.querySelector('[data-label]')) {
    const l = document.createElement('div'); l.dataset.label = '1'
    l.textContent = 'Figures blurred for study confidentiality'
    l.style.cssText = 'position:fixed;right:24px;bottom:24px;z-index:99999;padding:8px 14px;border-radius:999px;background:rgba(84,74,104,0.92);color:#f7ebe6;font:500 12px/1.2 system-ui,sans-serif;letter-spacing:0.04em;box-shadow:0 4px 16px rgba(0,0,0,0.15)'
    document.body.append(l)
  }
  const left = []; const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (w2.nextNode()) { const t = w2.currentNode, p = t.parentElement; if (/\d/.test(t.data) && p && !p.closest('[data-frost],script,style') && !KEEP.test(t.data) && !KEEP.test(p.textContent) && p.offsetParent !== null) left.push(t.data.trim().slice(0, 30)) }
  return left
})()
