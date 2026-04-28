/**
 * Whelm copy — keyed by beat copyId. Edit copy here without touching
 * layout or animation code. Italics and bolds preserved as <em>/<strong>.
 *
 * `position` controls absolute placement of the text block on the
 * pinned canvas: tl/tr/bl/br/c (top-left, top-right, bottom-left,
 * bottom-right, center). A beat with multiple blocks renders all of
 * them in the same beat span; they fade in together.
 */

export const COPY = {
  title: [
    { position: 'tl', kind: 'h1', html: 'The Over Thinking, People Pleasing,<br/>Intellectualizer&rsquo;s Guide for Untangling<br/>Anxiety to Uncover Your Truth' },
    { position: 'br_sub', kind: 'sub', html: 'Something to do when everything makes sense but you still don&rsquo;t know how you feel about it' },
  ],

  thought: [
    { position: 'tl', kind: 'lead', html: 'Do you ever have a thought…' },
    { position: 'c-bot', kind: 'note', html: 'Something like…' },
    { position: 'br', kind: 'quote', html: '<q>I didn’t really like how that made me <strong>feel…</strong></q>' },
  ],

  empathy: [
    { position: 'tl', kind: 'lead', html: 'But then, you start to imagine the <em><strong>how and why</strong></em> of other people’s behavior…' },
    { position: 'c-bot', kind: 'note', html: 'Something like…' },
    { position: 'br', kind: 'quote', html: '<q>Well they’re having <strong>a tough time</strong> lately and don’t know any better…</q>' },
  ],

  perspectives: [
    { position: 'tl', kind: 'lead', html: 'And then another thought comes in presenting more <strong>perspectives</strong> on the situation…' },
    { position: 'c-bot', kind: 'note', html: 'Something like…' },
    { position: 'br', kind: 'quote', html: '<q>This is just triggering me because I’m <em><strong>overly sensitive</strong></em> about that type of thing…</q>' },
  ],

  distance: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance…' },
  ],

  avoidance: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance…' },
    { position: 'ml', kind: 'body', html: 'To <strong>avoid</strong> having to admit that you’re <em>hurt</em>, or <em><strong>angry…</strong></em>' },
    { position: 'mr', kind: 'body', html: 'But not making space for yourself can lead to <em><strong>disassociation</strong></em> from your core, your voice…' },
  ],

  truth: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance…' },
    { position: 'ml', kind: 'body', html: 'To <strong>avoid</strong> having to admit that you’re <em>hurt</em>, or <em><strong>angry…</strong></em>' },
    { position: 'mr', kind: 'body', html: 'But not making space for yourself can lead to <em><strong>disassociation</strong></em> from your core, your voice…' },
    { position: 'you-tag', kind: 'tag', html: 'your <em>truth</em>.' },
  ],
}
