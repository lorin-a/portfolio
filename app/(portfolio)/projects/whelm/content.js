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
     Visual is the layered Overwhelm × 3 stack rendered by the
     `overcome-stack` element on the right. The "is overlooked"
     punchline lands bottom-left; "is" upright, "overlooked" italic. */
  overlooked: [
    { position: 'br', kind: 'lead', html: 'is <em>overlooked.</em>' },
  ],

  /* Section 2 — NEED. Three What-If beats, one phrase per dwell. */
  'not-a-problem': [
    { position: 'tl', kind: 'h2_inline', html: 'What if overwhelm is <em>not a problem to be solved?</em>' },
    { position: 'br', kind: 'body', html: 'Overwhelm is treated as a productivity issue that can be solved through self-management. This neglects the emotional experience beneath the surface.' },
  ],

  messenger: [
    { position: 'tl', kind: 'h2_inline', html: 'What if overwhelm offers us <em>valuable information?</em>' },
    { position: 'bl', kind: 'body', html: 'Overwhelm represents the tension between unmet needs and expectations, unfelt feelings and internalized beliefs. It is not a problem.' },
    { position: 'br', kind: 'lead', html: 'It is a <em>messenger.</em>' },
  ],

  invitation: [
    { position: 'tl', kind: 'h2_inline', html: 'What if overwhelm is <em>an invitation?</em>' },
    { position: 'br', kind: 'body', html: 'Overwhelm is an entry point for building a relationship with yourself, a companion for returning to what is real when your mind is on overdrive.' },
  ],

  /* Section 3 — NEED. Overwhelm-Is statements. Headline + body
     anchor the left half; diagram fills the right via the element layer. */
  signal: [
    { position: 'ml', kind: 'h2_inline', html: 'Overwhelm is <em>a Signal.</em>' },
    { position: 'bl', kind: 'body', html: 'Learning to interpret it is a skill. The experience varies per person but the signals are your system’s way of reaching out for support.' },
  ],

  tangle: [
    { position: 'ml', kind: 'h2_inline', html: 'Overwhelm is <em>a Tangle.</em>' },
    { position: 'bl', kind: 'body', html: 'A mix of emotions, needs, narratives, and sensations influenced by society, environments, and upbringing that can feel daunting to face alone.' },
  ],

  portal: [
    { position: 'ml', kind: 'h2_inline', html: 'Overwhelm is <em>a Portal.</em>' },
    { position: 'bl', kind: 'body', html: 'Heightened sensations can indicate that important information has surfaced and is available for care, observation, reflection, and release.' },
  ],
}
