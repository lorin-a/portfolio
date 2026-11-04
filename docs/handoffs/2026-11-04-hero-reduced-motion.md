# 🔧 Portfolio · hero — reduced motion shows the composed hero

**Model:** Opus. Her yes (2026-11-04): “open a portfolio chat to fix the reduced motion hero”. Live site; the portfolio stays dark; nothing goes live without her yes on the push (To-do with the address that changes).

## The defect (seen on lorin.work and on the dev server, Chrome 1440, `reducedMotion: 'reduce'`)
With reduced motion on, the 19 hero letters (`.scatterChar`, “Designing” / “Connection”) pile up behind the mark in the top-left corner, clipped; “Designing Connection” shows only as a faint ghost (the measure layer, which is a sizing tool at `z-index: -1`, not a display layer); Welcome, Keep Scrolling, the CTA and the site header read as hidden. The subtitle is the only thing that reads. Found by the Conductor’s scroll bench (`~/Desktop/homebase/scroll`, `pages/lorin-hero.json`): with motion off, the composed sentence, the welcome, the CTA and the nav were never readable at any scroll position.

**Cause:** `components/Hero/HeroScatter.js` lines 211–215. The reduced branch hides the flower, sets `measureRef` to `autoAlpha: 1`, and returns. It never places the letters, the marks, the CTA or the header where the scrubbed timeline ends.

## Do
1. Make the reduced branch render the timeline’s **final composed frame**, still, with no motion: each `.scatterChar` placed on its `.measureChar` mark (the same measuring the timeline already does), the marks (weave, sense, flower as the timeline leaves them), subtitle, CTA and header in their end state; the measure layer stays hidden. Reuse the timeline’s own end-state code rather than a second layout, so the two can’t drift. No pin is needed under reduced motion; the hero is one composed screen.
2. Verify at 1440, 1920 and 390 with `reducedMotion: 'reduce'` (screenshots), and that the motion version is unchanged (screenshot the top and the composed end at 1440). Then the bench: `cd ~/Desktop/homebase/scroll && node bench.mjs pages/lorin-hero.json --viewports 1440 --profiles trackpad-swipes --no-video`: the reduced survey must find “Designing Connection”, Subtitle, CTA and nav readable.
3. Commit on a branch off the live branch (check STATUS for which branch deploys); To-do for her look (`--weight look --reply yesnotes`) with the local link and how to turn reduced motion on (System Settings › Accessibility › Display › Reduce motion); after her yes, a separate To-do for the push that goes live, naming lorin.work.

## Close-out
One line to ⭐ TPM · Homebase; `history.mjs add portfolio --url … --name "Hero under reduced motion"`; `done.mjs`.
