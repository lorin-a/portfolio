/* THE SHEET TEMPLATE (FS296): the shape of content/sheets/groundswell.js,
   field by field, for every other case study.

   How to start a project: copy this file to content/sheets/<slug>.js,
   fill it from the project's source pack (docs/case-study-editorial/
   sources/<slug>/), then pass it to that project's <ProjectPreview
   sheet={…}> in app/(portfolio)/page.js. Only a project with a sheet
   opens one (ProjectPreview: canExpand needs `sheet`).

   Rules carried over from Groundswell:
   - Her words first. Copy comes from her sources verbatim, refined only
     under the standing copy rule (her draft is the source; Claude
     improves it). Anything with no source is '[LORIN TO WRITE: …]',
     never invented.
   - Every section is OPTIONAL. Leave a field out and the sheet skips
     that section cleanly; a thin project is a shorter sheet, not a
     padded one.
   - Media keys resolve through any map in lib/cloudinary.js (HOME_*,
     WHELM_*, BIRTHSTORY_PHOTOS, GS_*). A media item can instead name a
     Cloudinary public ID with `id: '…'`. An unknown key is skipped.
   - American English, curly quotes, no em dashes added to her voice,
     no "held" or other AI tells (memory: design-pass-bar).

   The title, number, and tagline come from the homepage <ProjectPreview>
   props, not from this file. */

export const template = {
  /* COVER ─────────────────────────────────────────────────────────── */

  /* The punchline, shown in the frame row as “The outcome”. One or two
     sentences. Groundswell kept it to how the work was received. */
  outcome: '[LORIN TO WRITE: what changed because of this work]',

  /* The loose pile of photographs beside the name (up to four). Choose
     for range across the project. `caption` is a short title-case label
     under each print; `alt` describes the image. */
  prints: [
    { key: '<cloudinary key>', caption: '<Short Label>', alt: '<what the photo shows>' },
  ],

  /* The facts on the loose-leaf cover sheet, as [label, value] rows.
     Groundswell used: Context, Role, Collaborators, Tools Used, Timeline. */
  meta: [
    ['Context', '[LORIN TO WRITE]'],
    ['Role', '[LORIN TO WRITE]'],
    ['Collaborators', '[LORIN TO WRITE]'],
    ['Tools Used', '[LORIN TO WRITE]'],
    ['Timeline', '[LORIN TO WRITE]'],
  ],

  /* FRAME ROW: three equal columns, matched in length ──────────────── */
  frame: {
    why: '[“The project”: what it is and who it is for]',
    research: '[“What the research told us”: method in a line, then the insight]',
    /* Optional shorter versions used in the row when the long ones run
       past the other columns. */
    short: { why: undefined, research: undefined },
  },

  /* OPTIONAL SYSTEM SECTION: a split section between the frame row and
     the components (Groundswell: “Mapping the System”). Use `media` for
     an ordinary gallery; `exhibit: 'maps'` is Groundswell's three-map
     exhibit only. Delete the whole block if the project has no system. */
  system: {
    kicker: 'Synthesis',
    label: '[Section name]',
    intro: '[One paragraph]',
    media: { stills: [{ key: '<cloudinary key>', alt: '' }] },
  },

  /* COMPONENTS: the work, one split section each (rail left, media
     right). For a single-artifact project, one component is fine. */
  components: [
    {
      key: '<slug-for-anchor>',
      name: '[Component Name, Title Case]',
      body: '[What it is, in two or three sentences]',
      /* The “My Contribution” paper strip: what she did, no “I”. */
      mine: '[LORIN TO WRITE: her contribution]',
      /* Optional: gated: true shows the media blurred as Confidential. */
      media: {
        /* A gallery, in reading order. Images by default; videos with
           type: 'video'. blur: true (or a pixel number) frosts data. */
        stills: [
          { key: '<cloudinary key>', alt: '' },
          { type: 'video', key: '<cloudinary video key>', alt: '' },
        ],
        /* Groundswell-only extras, available if a project needs them:
           motion: [...]            the interaction player (dashboard)
           phone: { key, alt }      a phone recording in the library pair
           listen: [{ key, title }] audio players
           gallery: { kind: 'cards', deck: [...], label } the card deck */
      },
    },
  ],

  /* REFLECTION: Sense · Weave · Shape cards. Each: a verb, a title, a
     two-word-ish shift, then three bullets with a two-word head. */
  reflection: [
    { id: 'sense', verb: 'Sense', title: 'What I learned', shift: ['[From]', '[To]'],
      list: [{ head: '[Two Words]', text: '[LORIN TO WRITE]' }] },
    { id: 'weave', verb: 'Weave', title: 'What I’ll carry forward', shift: ['[From]', '[To]'],
      list: [{ head: '[Two Words]', text: '[LORIN TO WRITE]' }] },
    { id: 'shape', verb: 'Shape', title: 'What’s next', shift: ['[From]', '[To]'],
      list: [{ head: '[Two Words]', text: '[LORIN TO WRITE]' }] },
  ],

  /* BEHIND THE SCENES: process galleries, side by side. */
  processTitle: 'Behind the scenes',
  process: [
    { title: 'Research', images: [{ key: '<cloudinary key>', alt: '' }] },
  ],

  /* CREDITS: either the full acknowledgements grid (Groundswell) or the
     simple credits list. Use one. */
  credit: undefined, // e.g. 'Photography by …'
  credits: [
    ['Design Team', '[names]'],
  ],
  /* acknowledgements: { columns: [{ title, people: [[name, role]] }], footer: [{ title, text }] } */
}

export default template
