/**
 * SomeBuddy — Cloudinary media for the folder sheet (FS300).
 *
 * Keys are named by what each asset shows; values are public IDs in
 * portfolio/SomeBuddy/images and /videos (checked 2026-10-02 against the
 * admin API: 17 images, 8 videos, all 16:9 deck slides or renders).
 */

export const SB_IMAGES = {
  'sb-title':            '1',     // the SomeBuddy wordmark title slide, with team and studio credit
  'sb-feedback-photos':  '16',    // speed-dating feedback sessions with classmates, three photos
  'sb-feedback-asks':    '17',    // three feedback questions over a photo: trust, learning about people, patches
  'sb-brand':            '22',    // logo lockups, flower marks, palette dots, the BINGO bar
  'sb-type-color':       'sb-23', // Quicksand display, SF Pro body, four color ramps
  'sb-badge-art':        '24',    // badge illustrations: books, boba, latte, yoga mat, boot, Scottie dog, cars
  'sb-orientation':      '26',    // orientation: banners, a hand holding the bingo card, QR code, BINGO booth
  'sb-badges':           '27',    // six embroidered badges and a backpack wearing them
  'sb-app-match':        '28',    // the app: post an activity, filter by distance and interests, map and list
  'sb-app-chat':         '29',    // the app: request with a template, chat, accept or decline
  'sb-app-customize':    '30',    // the app: badge customization (color, font, shape, type color)
  'sb-app-bingo':        '31',    // the app: badge collection, bingo card, shuffled card, create new
  /* the research and brand-exploration slides from her Medium article,
     uploaded 2026-10-02 with the key as the public ID */
  'sb-research-question':  'sb-research-question',  // Medium image 5: the research question
  'sb-research-objectives': 'sb-research-objectives',  // Medium image 6: the four research objectives
  'sb-ecosystem-map':      'sb-ecosystem-map',  // Medium image 7: the ecosystem map + assumptions
  'sb-what-we-heard':      'sb-what-we-heard',  // Medium image 8: three interview quotes
  'sb-design-principles':  'sb-design-principles',  // Medium image 9: the five design principles
  'sb-persona-taskmate':   'sb-persona-taskmate',  // Medium image 10: Logistical Task Mate persona
  'sb-persona-connector':  'sb-persona-connector',  // Medium image 11: Casual Connector persona
  'sb-persona-seeker':     'sb-persona-seeker',  // Medium image 12: Friendship Seeker persona
  'sb-user-flow-1':        'sb-user-flow-1',  // Medium image 14: user flow, discovery to bingo
  'sb-user-flow-2':        'sb-user-flow-2',  // Medium image 15: user flow, sustained use
  'sb-moodboard':          'sb-moodboard',  // Medium image 18: the mood board
  'sb-color-theory':       'sb-color-theory',  // Medium image 19: color and logo explorations
  'sb-brand-feedback':     'sb-brand-feedback',  // Medium image 20: crit notes on the explorations
  /* FS369: the Zoom pitch to Student Affairs, 12 May 2025 (her old site;
     original on the LaCie root), cropped above Zoom's recording banner */
  'sb-pitch':              'sb-pitch-call',
}

export const SB_VIDEOS = {
  'sb-logo-motion':      'Final_SomeBuddy_Animated_Logo', // the logo builds, the speech-bubble D drops in and smiles
  'sb-orientation-reel': 'somebuddy-reel',                // the bingo card, banners, and booth set on campus (same footage as 'Animation')
  'sb-social-solo':      'somebuddy-reel-2',              // “SOCIAL / SOLO” kinetic type, then “Spontaneous. Simple. Social.”
  'sb-campus-collage':   'Animation_2',                   // students cut out in brand color over campus, Dippy, the skyline
  'sb-backpack-collage': 'Animation_3',                   // the backpack gains a patch; a crowd of students in brand color
  'sb-customize-motion': 'UX',                            // badge customization in use, a phone over campus
  'sb-bingo-motion':     'UX_2',                          // a bingo card fills, then shuffles
}
