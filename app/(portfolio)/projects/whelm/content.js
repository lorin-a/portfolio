/**
 * Whelm copy — keyed by beat copyId. Edit copy here without touching
 * layout or animation code. Italics and bolds preserved as <em>/<strong>.
 *
 * Each block has a position preset (see whelm.module.css .pos_*) and
 * a kind that maps to typography (see .kind_*). Within a beat, blocks
 * reveal in document order — the orchestrator staggers them via Phase C.
 */

export const COPY = {
  title: [
    { position: 'tl', kind: 'h1', html: 'The Over Thinking, People Pleasing,<br/>Intellectualizer&rsquo;s Guide for Untangling<br/>Anxiety to Uncover Your Truth' },
    { position: 'br_sub', kind: 'sub', html: 'Something to do when everything makes sense but you still don&rsquo;t know how you feel about it' },
  ],

  /* Act I — thought spiral */
  thought_lead: [
    { position: 'tl', kind: 'lead', html: 'Do you ever have a thought&hellip;' },
  ],
  thought_quote: [
    { position: 'tl', kind: 'lead', html: 'Do you ever have a thought&hellip;' },
    { position: 'c_bot', kind: 'note', html: 'Something like&hellip;' },
    { position: 'br', kind: 'quote', html: '<q>I didn&rsquo;t really like how that made me <strong>feel&hellip;</strong></q>' },
  ],
  empathy_lead: [
    { position: 'tl', kind: 'lead', html: 'But then, you start to imagine the <em><strong>how and why</strong></em> of other people&rsquo;s behavior&hellip;' },
  ],
  empathy_quote: [
    { position: 'tl', kind: 'lead', html: 'But then, you start to imagine the <em><strong>how and why</strong></em> of other people&rsquo;s behavior&hellip;' },
    { position: 'c_bot', kind: 'note', html: 'Something like&hellip;' },
    { position: 'br', kind: 'quote', html: '<q>Well they&rsquo;re having <strong>a tough time</strong> lately and don&rsquo;t know any better&hellip;</q>' },
  ],
  persp_lead: [
    { position: 'tl', kind: 'lead', html: 'And then another thought comes in presenting more <strong>perspectives</strong> on the situation&hellip;' },
  ],
  persp_quote: [
    { position: 'tl', kind: 'lead', html: 'And then another thought comes in presenting more <strong>perspectives</strong> on the situation&hellip;' },
    { position: 'c_bot', kind: 'note', html: 'Something like&hellip;' },
    { position: 'br', kind: 'quote', html: '<q>This is just triggering me because I&rsquo;m <em><strong>overly sensitive</strong></em> about that type of thing&hellip;</q>' },
  ],

  /* Act II — distance, avoidance, truth */
  distance: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance&hellip;' },
  ],
  avoidance: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance&hellip;' },
    { position: 'ml', kind: 'body', html: 'To <strong>avoid</strong> having to admit that you&rsquo;re <em>hurt</em>, or <em><strong>angry&hellip;</strong></em>' },
  ],
  disassociation: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance&hellip;' },
    { position: 'ml', kind: 'body', html: 'To <strong>avoid</strong> having to admit that you&rsquo;re <em>hurt</em>, or <em><strong>angry&hellip;</strong></em>' },
    { position: 'mr', kind: 'body', html: 'But not making space for yourself can lead to <em><strong>disassociation</strong></em> from your core, your voice&hellip;' },
  ],
  truth: [
    { position: 'tl', kind: 'lead', html: 'It may feel <strong>safer</strong> to try to understand at a distance&hellip;' },
    { position: 'ml', kind: 'body', html: 'To <strong>avoid</strong> having to admit that you&rsquo;re <em>hurt</em>, or <em><strong>angry&hellip;</strong></em>' },
    { position: 'mr', kind: 'body', html: 'But not making space for yourself can lead to <em><strong>disassociation</strong></em> from your core, your voice&hellip;' },
    { position: 'you_tag', kind: 'tag', html: 'your <em>truth</em>.' },
  ],

  /* Act III — every angle */
  every_angle: [
    { position: 'tl', kind: 'lead', html: 'And before you know it, you&rsquo;ve considered <strong>every possible angle</strong> of the situation&hellip;' },
  ],
  everyones: [
    { position: 'tl', kind: 'lead', html: 'And before you know it, you&rsquo;ve considered <strong>every possible angle</strong> of the situation&hellip;' },
    { position: 'c_mid', kind: 'lead', html: 'empathized with <strong>everyone&rsquo;s</strong> experience&hellip;' },
  ],
  but_your_own: [
    { position: 'tl', kind: 'lead', html: 'And before you know it, you&rsquo;ve considered <strong>every possible angle</strong> of the situation&hellip;' },
    { position: 'c_mid', kind: 'lead', html: 'empathized with <strong>everyone&rsquo;s</strong> experience&hellip;' },
    { position: 'you_tag', kind: 'tag', html: 'But <em>your own</em>.' },
  ],

  /* Act IV — therapy + mom */
  aka: [
    { position: 'c_lead', kind: 'lead', html: 'Also known as,' },
  ],
  therapy: [
    { position: 'c_lead', kind: 'lead', html: 'Also known as,' },
    { position: 'c_lead2', kind: 'h2_inline', html: 'Things I learned in <strong>therapy</strong>&hellip;' },
  ],
  mom: [
    { position: 'c_lead', kind: 'lead', html: 'Also known as,' },
    { position: 'c_lead2', kind: 'h2_inline', html: 'Things I learned in <strong>therapy</strong>&hellip;' },
    { position: 'c_lead3', kind: 'h2_inline', html: 'and from my <strong>mom</strong>.' },
  ],
  mom_wisdom: [
    { position: 'c_lead', kind: 'lead', html: 'Also known as,' },
    { position: 'c_lead2', kind: 'h2_inline', html: 'Things I learned in <strong>therapy</strong>&hellip;' },
    { position: 'c_lead3', kind: 'h2_inline', html: 'and from my <strong>mom</strong>.' },
    { position: 'br', kind: 'quote', html: '<em>Growing up, my mom would help me make sense of my overwhelm by having me list out everything and get it out of my head, something that has served me well.</em>' },
  ],
}
