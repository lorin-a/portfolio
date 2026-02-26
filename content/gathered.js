/**
 * GATHERED — Collection Data
 *
 * This is the only file you need to edit to update the collection.
 * Each item needs:
 *   - id:          unique string (used as key + for accessibility)
 *   - name:        what it is
 *   - note:        one sentence about why you keep it close
 *   - link:        URL to the thing online (or null)
 *   - image:       Cloudinary public ID (e.g. "gathered/emergent-strategy")
 *                  Leave as null while using placeholder shapes
 *   - position:    { x, y } as percentages of the viewport (desktop only)
 *   - size:        { w, h } in pixels (desktop base size — scales responsively)
 *   - rotation:    degrees of rotation (-15 to 15 recommended)
 *   - zIndex:      layering order (higher = on top)
 *   - mobileOrder: controls vertical sequence on mobile (lower = earlier)
 *   - shape:       placeholder shape type (used until real images are added)
 *                  Options: "stone", "crystal", "book", "card", "textile",
 *                           "paper", "painting", "circle", "organic"
 *   - colors:      array of 2-4 hex colors for placeholder rendering
 *
 * TIPS:
 *   - Keep to 10–15 items max
 *   - Position values: x=0 is left edge, x=100 is right edge
 *   - Avoid placing items in the top-left (page title) or top-right (toggle)
 *   - Test on mobile after any position changes
 *   - Items with mobileOrder are shown in that order on small screens
 */

export const gatheredItems = [
  /* Upper-left cluster — two books leaning near each other */
  {
    id: 'emergent-strategy',
    name: 'Emergent Strategy',
    note: 'adrienne maree brown taught me that what we practice at the small scale sets the pattern for the whole system.',
    link: 'https://www.akpress.org/emergentstrategy.html',
    image: null,
    position: { x: 20, y: 14 },
    size: { w: 75, h: 110 },
    rotation: 3,
    zIndex: 5,
    mobileOrder: 1,
    shape: 'book',
    colors: ['#2C2C2C', '#5E6D52', '#A0A88A'],
  },
  {
    id: 'braiding-sweetgrass',
    name: 'Braiding Sweetgrass',
    note: 'Robin Wall Kimmerer writes about reciprocity the way I want to practice design.',
    link: 'https://milkweed.org/book/braiding-sweetgrass',
    image: null,
    position: { x: 30, y: 26 },
    size: { w: 70, h: 100 },
    rotation: -5,
    zIndex: 2,
    mobileOrder: 2,
    shape: 'book',
    colors: ['#5E6D52', '#A0A88A', '#F0ECE4'],
  },
  /* Upper-right — lone stone, isolated */
  {
    id: 'chalcedony',
    name: 'Blue Chalcedony',
    note: 'The way light passes through it differently every time I pick it up.',
    link: null,
    image: null,
    position: { x: 74, y: 12 },
    size: { w: 90, h: 70 },
    rotation: -8,
    zIndex: 3,
    mobileOrder: 4,
    shape: 'stone',
    colors: ['#8BAABE', '#6E8FAE', '#A3C4D8'],
  },
  /* Far right edge — paper, drifted high */
  {
    id: 'corita-kent',
    name: 'Corita Kent\'s Ten Rules',
    note: 'Rule 7: The only rule is work. The rest is a conversation with yourself.',
    link: 'https://www.corita.org/tenrules',
    image: null,
    position: { x: 82, y: 30 },
    size: { w: 80, h: 60 },
    rotation: 6,
    zIndex: 1,
    mobileOrder: 6,
    shape: 'paper',
    colors: ['#FBF9F6', '#F0ECE4', '#956058'],
  },
  /* Far left edge — alone at mid-height */
  {
    id: 'aventurine',
    name: 'Green Aventurine',
    note: 'My grandmother collected stones. This one found me at a flea market in Cape Town.',
    link: null,
    image: null,
    position: { x: 14, y: 50 },
    size: { w: 105, h: 80 },
    rotation: 12,
    zIndex: 4,
    mobileOrder: 5,
    shape: 'stone',
    colors: ['#7A8B6F', '#5E6D52', '#A0A88A'],
  },
  /* Right side — card + knob loose pair */
  {
    id: 'tarot-star',
    name: 'The Star — Thoth Deck',
    note: 'Hope after crisis. The card I keep pulling when I forget why I chose this path.',
    link: null,
    image: null,
    position: { x: 80, y: 56 },
    size: { w: 68, h: 105 },
    rotation: -4,
    zIndex: 6,
    mobileOrder: 3,
    shape: 'card',
    colors: ['#7A6680', '#9B8A9E', '#C4908A', '#FBF9F6'],
  },
  {
    id: 'ceramic-knob',
    name: 'Hand-Painted Ceramic Knob',
    note: 'From a market in Jaipur. Proof that craft can live inside the smallest functional thing.',
    link: null,
    image: null,
    position: { x: 76, y: 40 },
    size: { w: 48, h: 48 },
    rotation: 0,
    zIndex: 8,
    mobileOrder: 11,
    shape: 'circle',
    colors: ['#FBF9F6', '#6E8FAE', '#8BAABE'],
  },
  /* Lower left — painting, slightly inward */
  {
    id: 'childhood-painting',
    name: 'My Painting, Age 4',
    note: 'Before I learned to stay inside the lines. I\'m trying to get back here.',
    link: null,
    image: null,
    position: { x: 16, y: 74 },
    size: { w: 100, h: 75 },
    rotation: -2,
    zIndex: 1,
    mobileOrder: 8,
    shape: 'painting',
    colors: ['#7A6680', '#956058', '#C4908A', '#8BAABE'],
  },
  /* Lower center — large textile anchoring the bottom */
  {
    id: 'huipil',
    name: 'Guatemalan Huipil Fragment',
    note: 'Every stitch is a decision. The best systems are built this way too.',
    link: null,
    image: null,
    position: { x: 42, y: 78 },
    size: { w: 115, h: 95 },
    rotation: 2,
    zIndex: 2,
    mobileOrder: 7,
    shape: 'textile',
    colors: ['#956058', '#C4908A', '#7A6680', '#5E6D52'],
  },
  /* Lower right scatter — crystal + protea, different distances */
  {
    id: 'amethyst',
    name: 'Raw Amethyst',
    note: 'Unpolished on purpose. The rough edges are where the color lives.',
    link: null,
    image: null,
    position: { x: 64, y: 72 },
    size: { w: 55, h: 50 },
    rotation: 22,
    zIndex: 7,
    mobileOrder: 9,
    shape: 'crystal',
    colors: ['#7A6680', '#9B8A9E', '#8A7690'],
  },
  {
    id: 'pressed-protea',
    name: 'Pressed Protea',
    note: 'It held its shape after it dried. The best frameworks do this too.',
    link: null,
    image: null,
    position: { x: 80, y: 80 },
    size: { w: 65, h: 85 },
    rotation: 18,
    zIndex: 2,
    mobileOrder: 12,
    shape: 'organic',
    colors: ['#C4908A', '#956058', '#A0A88A'],
  },
  /* Bottom — obsidian, slightly off-center */
  {
    id: 'snowflake-obsidian',
    name: 'Snowflake Obsidian',
    note: 'Pattern within darkness. Reminds me that structure exists even where you can\'t see it yet.',
    link: null,
    image: null,
    position: { x: 52, y: 82 },
    size: { w: 70, h: 60 },
    rotation: -15,
    zIndex: 3,
    mobileOrder: 10,
    shape: 'stone',
    colors: ['#2C2C2C', '#5A5550', '#F0ECE4'],
  },
]
