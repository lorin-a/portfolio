// For survey pages: also frost staff quotes and the plotted results.
(() => {
  const soft = (el, r) => { if (!el || el.dataset.frost) return; el.style.filter = `blur(${r})`; el.dataset.frost = '1' }
  document.querySelectorAll('main svg, [role=dialog] svg').forEach(s => { const r = s.getBoundingClientRect(); if (r.width > 80 && r.height > 40) soft(s, '6px') })
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (w.nextNode()) { const t = w.currentNode, p = t.parentElement; if (!p || p.closest('[data-frost],[data-label],header,nav,button,h1,h2,h3,h4')) continue; const blk = p.closest('p,li,blockquote,q,span'); if (/[“"]/.test(t.data) || (t.data.trim().split(/\s+/).length > 9 && p.closest('[role=dialog],[class*=heme],[class*=uote],[class*=esponse]'))) soft(blk, '0.32em') }
})()
