"""
Watercolor band masks for the project-folder cover (her note FS48).

Makes two alpha masks and one texture, all colour-free so any project can
tint them with its own colour in CSS:

  public/art/wc-band-mask.png   the wash: an irregular painted top edge that
                                softens as the pigment thins, solid below
  public/art/wc-band-rim.png    the rim: where pigment pools along a drying
                                watercolor edge, a thin darker line
  public/art/wc-grain.jpg       granulation, taken from the real scanned
                                watercolor in public/watercolor-blob-1024.jpg

Pure Pillow, no numpy. Deterministic (fixed seed), so re-running it gives
the same edge. Run from the repo root:  python3 scripts/make-watercolor-band.py
"""
import math
import random
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

random.seed(48)
W, H = 2400, 1600         # the edge lives in the top ~230px; the rest is solid, tall enough for any band
BASE = 150                # mean height of the edge from the top

# ── 1. The edge profile: 1/f noise (big slow swells, small quick wobbles) ──
waves = []
for octave in range(1, 11):
    freq = 2 ** octave * 0.7
    amp = 34 / (octave ** 1.05)
    waves.append((freq, amp, random.uniform(0, math.tau)))

def edge_y(x):
    t = x / W
    y = BASE
    for f, a, p in waves:
        y += a * math.sin(t * f * math.tau + p)
    return y

mask = Image.new('L', (W, H), 0)
pts = [(x, edge_y(x)) for x in range(0, W + 1, 4)]
ImageDraw.Draw(mask).polygon([(0, H)] + pts + [(W, H)], fill=255)

# ── 2. Blooms: a few soft backruns where water pushed pigment outward ──
blooms = Image.new('L', (W, H), 0)
d = ImageDraw.Draw(blooms)
for _ in range(14):
    x = random.uniform(0, W)
    r = random.uniform(10, 26)
    y = edge_y(x) - r * random.uniform(0.0, 0.35)
    d.ellipse((x - r * 1.8, y - r * 0.5, x + r * 1.8, y + r * 0.5), fill=255)
blooms = blooms.filter(ImageFilter.GaussianBlur(9))
mask = ImageChops.lighter(mask, blooms.point(lambda v: 255 if v > 150 else 0))

# ── 3. A ragged, granular edge: blur, add noise, re-threshold ──
noise = Image.effect_noise((W, H), 70).filter(ImageFilter.GaussianBlur(1.1))
soft = mask.filter(ImageFilter.GaussianBlur(5))
rough = ImageChops.add(soft, noise, scale=1.0, offset=-128)
edge = rough.point(lambda v: 255 if v > 118 else 0).filter(ImageFilter.GaussianBlur(1.2))

# ── 4. Pigment thins toward the edge: alpha ramps up over ~110px inside it ──
depth = edge.filter(ImageFilter.MinFilter(3))
for _ in range(3):
    depth = depth.filter(ImageFilter.GaussianBlur(18))
# depth is ~0.5 at the edge and 1.0 well inside; map to 0.72 → 1.0 opacity
ramp = depth.point(lambda v: int(255 * min(1, 0.8 + 0.2 * max(0, (v - 128) / 127))))
alpha = ImageChops.multiply(edge, ramp)

# ── 5. The rim: a thin band just inside the edge ──
inner = edge.filter(ImageFilter.MinFilter(7))
rim = ImageChops.subtract(edge, inner).filter(ImageFilter.GaussianBlur(2.6))
# Pooling is uneven: modulate the rim's strength along its length
wobble = Image.effect_noise((W // 40, H // 40), 120).resize((W, H), Image.BICUBIC)
wobble = wobble.filter(ImageFilter.GaussianBlur(20)).point(lambda v: int(60 + v * 0.75))
rim = ImageChops.multiply(rim, wobble)

def save_mask(a, path):
    img = Image.new('LA', (W, H), 0)
    img.putalpha(a)
    img.save(path, optimize=True)

save_mask(alpha, 'public/art/wc-band-mask.png')
save_mask(rim, 'public/art/wc-band-rim.png')

# ── 6. Granulation from the real scan: the pigment inside the blob ──
scan = Image.open('public/watercolor-blob-1024.jpg').convert('L')
crop = scan.crop((320, 430, 700, 560))                 # solid pigment, no paper
crop = ImageOps.autocontrast(crop, cutoff=1)
crop = crop.resize((1600, 548), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.4))
# centre it on mid-grey so soft-light blending lifts and lowers evenly
crop = crop.point(lambda v: int(128 + (v - 128) * 0.22))
crop.convert('RGB').save('public/art/wc-grain.jpg', quality=82)

print('wrote public/art/wc-band-mask.png, wc-band-rim.png, wc-grain.jpg')
