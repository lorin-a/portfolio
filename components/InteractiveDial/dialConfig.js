// Dial dimensions (increased ~20% for larger hero image)
export const DIAL_SIZE = 420;
export const CX = DIAL_SIZE / 2; // 210
export const CY = DIAL_SIZE / 2; // 210
export const INNER_R = 140;
export const OUTER_R = 190;
export const PHOTO_SIZE = 210;
export const INNER_TRACK_SIZE = 280;
export const OUTER_TRACK_SIZE = 380;

// Pill layout
export const ROW_H = 36;
export const ROW_GAP = 14;
export const PILL_GAP = 10;

// Dot configurations
export const DOTS = {
  // Outer ring - mantras (fill dots)
  translate: {
    type: 'fill',
    ring: 'outer',
    color: 'olive',
    angle: 0,
    label: 'Distilling Complexity',
    tooltip: 'Honoring nuance and making information approachable',
    pillStyle: 'bold',
  },
  amplify: {
    type: 'fill',
    ring: 'outer',
    color: 'terracotta',
    angle: 120,
    label: 'Amplifying Voices',
    tooltip: 'Centering the stories of the people closest to the problem',
    pillStyle: 'bold',
  },
  hold: {
    type: 'fill',
    ring: 'outer',
    color: 'plum',
    angle: 240,
    label: 'Holding Space',
    tooltip: 'Creating room for hard truths to surface safely',
    pillStyle: 'bold',
  },
  // Inner ring - paradoxes (ring dots)
  playful: {
    type: 'ring',
    ring: 'inner',
    color: 'terracotta',
    angle: 60,
    label: 'playful perfectionist',
    tooltip: 'I care about every detail but I have fun doing it',
    pillStyle: 'soft',
  },
  meticulous: {
    type: 'ring',
    ring: 'inner',
    color: 'plum',
    angle: 180,
    label: 'meticulous dreamer',
    tooltip: 'I have big visions but I sweat the small stuff',
    pillStyle: 'soft',
  },
  hopeful: {
    type: 'ring',
    ring: 'inner',
    color: 'olive',
    angle: 300,
    label: 'hopeful realist',
    tooltip: 'I tether radical imagination to reality',
    pillStyle: 'soft',
  },
};

// Animation order
export const INNER_KEYS = ['playful', 'meticulous', 'hopeful'];
export const OUTER_KEYS = ['translate', 'amplify', 'hold'];
export const ALL_KEYS = [...INNER_KEYS, ...OUTER_KEYS];
export const ROW1_KEYS = INNER_KEYS; // paradoxes on top row
export const ROW2_KEYS = OUTER_KEYS; // mantras on bottom row

// Retract order (reverse of appearance)
export const RETRACT_ORDER = ['hold', 'amplify', 'translate', 'hopeful', 'meticulous', 'playful'];

// Helper: convert angle to x,y position
export function angleToPos(angleDeg, radius) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

// Smoothstep easing for dot travel
export function easeSmooth(t) {
  return t * t * (3 - 2 * t);
}
