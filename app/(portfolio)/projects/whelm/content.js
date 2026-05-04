/**
 * Whelm copy — keyed by beat copyId.
 *
 * Copy verbatim from Figma slides (file uR0ROcu5koEA9VXoWNfVW8). Edit
 * here without touching layout or animation code. Italics and bolds
 * preserved as <em>/<strong>. Each block has a position preset (see
 * .pos_* in whelm.module.css) and a kind (see .kind_*). Within a beat,
 * blocks reveal in document order — orchestrator staggers them via Phase C.
 */

export const COPY = {
  /* 01 — Hero (slide 255:355).
     The "whelm." display type is rendered by the `wordmark` element
     (semantic <h1>); copy here is just the editorial tagline below. */
  hero: [
    { position: 'below_center', kind: 'sub', html: '<em>Find Your Way to Feeling</em>' },
  ],

  /* Section 1 — GAP. Overlooked (slide 255:357).
     OvercomeStack element fills the center; "is overlooked" punchline
     wipes in below the stack with attention-grabbing timing. */
  overlooked: [
    { position: 'bot_center', kind: 'lead', html: 'is <em>overlooked.</em>' },
  ],

  /* Section 2 — NEED. Three What-If beats, centered vertical stacks. */
  'not-a-problem': [
    { position: 'top_center', kind: 'h2_inline', html: 'What if overwhelm is <em>not a problem to be solved?</em>' },
    { position: 'bot_center', kind: 'body', html: 'Overwhelm is treated as a productivity issue that can be solved through self-management. This neglects the emotional experience beneath the surface.' },
  ],

  messenger: [
    { position: 'top_center', kind: 'h2_inline', html: 'What if overwhelm offers us <em>valuable information?</em>' },
    { position: 'mid_center', kind: 'body', html: 'Overwhelm represents the tension between unmet needs and expectations, unfelt feelings and internalized beliefs. It is not a problem.' },
    { position: 'bot_center', kind: 'lead', html: 'It is a <em>messenger.</em>' },
  ],

  invitation: [
    { position: 'top_center', kind: 'h2_inline', html: 'What if overwhelm is <em>an invitation?</em>' },
    { position: 'bot_center', kind: 'body', html: 'Overwhelm is an entry point for building a relationship with yourself, a companion for returning to what is real when your mind is on overdrive.' },
  ],

  /* Section 3 — NEED. Overwhelm-Is statements. Centered vertical stack:
     headline → body → diagram. Diagrams will move from full-bleed to
     centered presence in the next round. */
  signal: [
    { position: 'top_center', kind: 'h2_inline', html: 'Overwhelm is <em>a Signal.</em>' },
    { position: 'bot_center', kind: 'body', html: 'Learning to interpret it is a skill. The experience varies per person but the signals are your system’s way of reaching out for support.' },
  ],

  tangle: [
    { position: 'top_center', kind: 'h2_inline', html: 'Overwhelm is <em>a Tangle.</em>' },
    { position: 'bot_center', kind: 'body', html: 'A mix of emotions, needs, narratives, and sensations influenced by society, environments, and upbringing that can feel daunting to face alone.' },
  ],

  portal: [
    { position: 'top_center', kind: 'h2_inline', html: 'Overwhelm is <em>a Portal.</em>' },
    { position: 'bot_center', kind: 'body', html: 'Heightened sensations can indicate that important information has surfaced and is available for care, observation, reflection, and release.' },
  ],
}
