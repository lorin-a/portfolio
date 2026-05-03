/**
 * Whelm copy — keyed by beat copyId.
 *
 * Copy verbatim from Figma slides (file uR0ROcu5koEA9VXoWNfVW8). Edit
 * here without touching layout or animation code. Italics and bolds
 * preserved as <em>/<strong>. Each block has a position preset (see
 * .pos_* in whelm.module.css) and a kind (see .kind_*). Within a beat,
 * blocks reveal in document order — orchestrator staggers them via Phase C.
 *
 * Phase 0 placeholder set: hero + a few beats so the engine is exercisable.
 * Phase 2 fills out the full 16-beat story.
 */

export const COPY = {
  /* 01 — Hero */
  hero: [
    { position: 'tl', kind: 'h1', html: 'whelm.' },
    { position: 'br_sub', kind: 'sub', html: '<em>Find Your Way to Feeling</em>' },
  ],

  /* 02 — Chapter divider: The Gap */
  'divider-gap': [
    { position: 'tl', kind: 'tag', html: 'Agenda' },
    { position: 'mr', kind: 'agenda', html: 'agenda', dataActive: 'gap' },
  ],

  /* 03 — Overlooked */
  overlooked: [
    { position: 'c_lead', kind: 'h2_inline', html: 'Overwhelm <em>is overlooked.</em>' },
  ],

  /* 04 — Not a problem to solve */
  'not-a-problem': [
    { position: 'tl', kind: 'lead', html: 'What if overwhelm is <em>not a problem</em> to be solved?' },
    { position: 'br', kind: 'body', html: 'Overwhelm is treated as a productivity issue that can be solved through self-management. This neglects the <strong>emotional experience</strong> beneath the surface.' },
  ],

  /* 05 — The Messenger */
  messenger: [
    { position: 'tl', kind: 'h2_inline', html: 'What if overwhelm offers us <em>valuable information?</em>' },
    { position: 'br', kind: 'body', html: 'Overwhelm represents the tension between unmet needs and expectations, unfelt feelings and internalized beliefs. It is not a problem. It is a <strong>messenger</strong>.' },
  ],
}
