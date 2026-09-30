"""
The cover's dissolve mask (her note FS49, 2026-09-30).

The photograph itself dissolves into the folder's own ground through a
REAL painted edge: one image, nothing laid on top of it. (This replaced the
FS48 watercolor wash, which read as a purple layer on the photo.)

Source: a 5000px scan of a real watercolor stain, from the Groundswell
watercolor project (~/Desktop/groundswell-watercolor/public/
watercolor-texture-3.png). The stain is roughly round, so its edge is
"unrolled": sampled in polar coordinates around the stain's centre, angle
across and radius down, at the SAME step in both directions so the edge
keeps its true shape. Pigment becomes the photo; bare paper becomes the
ground. The drips, lobes and specks are the paint's own.

  public/art/cover-dissolve.png   alpha mask, 2400 wide. Opaque above the
                                  painted edge, transparent below it.

Run from the repo root:  python3 scripts/make-cover-dissolve.py
"""
import math
import os
from PIL import Image, ImageFilter

SRC = os.path.expanduser('~/Desktop/groundswell-watercolor/public/watercolor-texture-3.png')
W = 2400             # output width
STEP = 2.4           # source pixels per output pixel, both directions
R0, R1 = 700, 2400   # radial window, in source pixels
A0 = 0.168           # start angle: the flattest 2400px stretch of the stain's edge
FLATTEN = 0.5        # how much of the edge's big swells to straighten (fine detail kept)
PAPER, PIGMENT = 232, 205   # grey levels: at/above PAPER is ground, at/below PIGMENT is photo

src = Image.open(SRC).convert('L')
sw, sh = src.size

# Centre of the stain: centroid of everything darker than paper.
small = src.resize((1000, 1000))
sp_small = small.load()
sx = sy = n = 0
for y in range(1000):
    for x in range(1000):
        if sp_small[x, y] < 215:
            sx += x; sy += y; n += 1
cx, cy = sx / n * sw / 1000, sy / n * sh / 1000

H = int((R1 - R0) / STEP)
rmid = (R0 + R1) / 2
sp = src.load()

def sample(x, r):
    a = A0 * math.tau + (x * STEP) / rmid
    X, Y = int(cx + r * math.cos(a)), int(cy + r * math.sin(a))
    return sp[X, Y] if 0 <= X < sw and 0 <= Y < sh else 255

# The stain is lumpy: its edge swells by ~240px even at its flattest. Find
# the edge per column, smooth it heavily to get just the big swells, and
# shift each column by most of that swell. The paint's own fine edge,
# drips and specks come through untouched; only the hills are levelled.
edge = []
for x in range(W):
    e = R1
    for r in range(R0, R1, 3):
        if sample(x, r) > 225:
            e = r
            break
    edge.append(e)
K = 160
smooth = []
for x in range(W):
    lo, hi = max(0, x - K), min(W, x + K)
    smooth.append(sum(edge[lo:hi]) / (hi - lo))
target = sum(smooth) / W
target_row = (target - R0) / STEP
# leave the levelled edge about 40% of the way down the mask
shift_all = target_row - H * 0.4

out = Image.new('L', (W, H))
op = out.load()
for x in range(W):
    off = (smooth[x] - target) * FLATTEN
    for y in range(H):
        r = R0 + (y + shift_all) * STEP + off
        v = sample(x, r)
        # pigment -> opaque (photo), paper -> transparent (ground)
        t = (PAPER - v) / (PAPER - PIGMENT)
        op[x, y] = int(255 * max(0.0, min(1.0, t)))

out = out.filter(ImageFilter.GaussianBlur(0.8))
mask = Image.new('LA', (W, H), 0)
mask.putalpha(out)
mask.save('public/art/cover-dissolve.png', optimize=True)
print(f'wrote public/art/cover-dissolve.png ({W}x{H})')
