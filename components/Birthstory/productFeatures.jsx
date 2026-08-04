'use client'

import { birthPhoto } from '@/lib/cloudinary'

/* The product's five features — her copy, verbatim, in ONE place. ProductAct and
   the layout-compare route both read from here so a wording change can never
   drift between them. */

export const FEATURES = [
  {
    name: 'Documentation',
    role: 'The core feature · all information-gathering, unified',
    kind: 'doc',
    annots: {
      l: { label: 'One timeline', text: 'Medical, contextual, narrative, and feelings in one place — a birth isn’t lived in separate files.', mt: '9rem' },
      r: { label: 'Calm by default', text: 'Entries stay closed until you open one, so a tired parent meets a surface, not a wall of clinical detail.', mt: '3.5rem' },
    },
    prose: <>Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add.</>,
  },
  {
    name: 'Care Pod',
    role: 'The heart of the concept · the optional sharing and partner-participation features',
    kind: 'carepod',
    annots: {
      l: { label: 'You don’t carry it', text: 'One person you designate sends the updates, photos, and voice memos — not the laboring parent.', mt: '3rem' },
      r: { label: 'Nothing is lost', text: 'Loved ones reply, and it all saves into the story: the detail you’d have forgotten, kept.', mt: '8rem' },
    },
    prose: <>The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh. That became Care Pod: one support person sends out updates, photos, and voice memos, loved ones reply with messages and voice notes, and all of it saves into the Birth Story, so the whole story of who was there and how loved that child was stays in one place.</>,
    context: {
      photo: birthPhoto('room', 1200),
      alt: 'A partner cradles a newborn while an older sibling leans in close to see.',
      cap: 'Birth doesn’t happen to the mother alone; the people there, and those waiting to hear, each hold a piece of the story.',
    },
  },
  {
    name: 'Reflection',
    role: 'The processing and nudge requirements',
    kind: 'journal',
    annots: {
      l: { label: 'No blank page', text: 'The deck deals a prompt, because the parents who don’t already journal don’t know where to start.', mt: '3rem' },
      r: { label: 'Tag how it felt', text: 'So a memory can be found later by its emotion, not only its date.', mt: '7.5rem' },
    },
    prose: <>Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.</>,
  },
  {
    name: 'Search',
    role: 'Not required · my addition, for cognitive load',
    kind: 'search',
    annots: {
      l: { label: 'A swipe from anywhere', text: 'Reachable over any screen, so brain fog never means digging through the app for one memory.', mt: '5.5rem' },
      r: { label: 'Filter by feeling', text: 'A parent recalls a memory by how it felt, not when it was logged.', mt: '2.5rem' },
    },
    prose: <>This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory.</>,
  },
  {
    name: 'The Book',
    role: 'The optional baby book',
    kind: 'book',
    annots: {
      l: { label: 'It can leave the app', text: 'The whole record as a book or a free PDF — no one trusts something this precious to a screen that could vanish.', mt: '4rem' },
      r: { label: 'Curated together', text: 'Built from what’s already there, open to the people who were part of it.', mt: '4rem' },
    },
    prose: <>We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear.</>,
    shots: [
      ['/images/birthstory/bs-book-order.png', 'The Birth Story Book screen: order a printed keepsake or download a PDF.'],
      ['/images/birthstory/bs-book-curate.png', 'A timeline of entries with “Drag Content to Curate Your Story”, open to collaborators.'],
    ],
  },
]
