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
  /* 01 — Hero (slide 255:355) */
  hero: [
    { position: 'tl', kind: 'h1', html: 'whelm.' },
    { position: 'br_sub', kind: 'sub', html: '<em>Find Your Way to Feeling</em>' },
  ],

  /* 02 — Chapter divider: The Gap (slide 255:356) */
  'divider-gap': [
    { position: 'tl', kind: 'tag', html: 'Agenda' },
    { position: 'mr', kind: 'agenda', html: 'agenda', dataActive: 'gap' },
  ],

  /* 03 — Overlooked (slide 255:357)
     Visual is a layered Overwhelm × 3 stack rendered by the
     `overcome-stack` element. Copy is the punchline beneath. */
  overlooked: [
    { position: 'c_lead', kind: 'h2_inline', html: '<em>is overlooked.</em>' },
  ],

  /* 04 — Not a problem (slide 255:358) */
  'not-a-problem': [
    { position: 'tl', kind: 'h2_inline', html: 'What if overwhelm is <em>not a problem to be solved?</em>' },
    { position: 'br', kind: 'body', html: 'Overwhelm is treated as a productivity issue that can be solved through self-management. This neglects the emotional experience beneath the surface.' },
  ],

  /* 05 — Messenger (slide 255:359) */
  messenger: [
    { position: 'tl', kind: 'h2_inline', html: 'What if overwhelm offers us <em>valuable information?</em>' },
    { position: 'br', kind: 'body', html: 'Overwhelm represents the tension between unmet needs and expectations, unfelt feelings and internalized beliefs. It is not a problem.' },
    { position: 'br_sub', kind: 'lead', html: 'It is a <em>messenger.</em>' },
  ],
}
