# Put the reduced-motion hero fix live at lorin.work

**For:** 🚀 Portfolio · deploy — the reduced-motion hero. Opus. Small.

**Her yes (2026-11-04, verbatim, to ⭐ TPM · Homebase):** “portfolio reduced motion approved”, then to “Push the reduced-motion hero fix live at https://lorin.work?”: “yes live”. This yes covers this one commit only.

## Do
1. `git fetch origin`. Check that `release/2026-11-04-hero-reduced-motion` is `origin/main` plus exactly one commit (c36dc5a, “fix(home): reduced motion shows the composed hero, still”). If main has moved or the branch holds anything else, stop and tell ⭐ TPM · Homebase; don't push.
2. Build clean (`npm run build`), then `git push origin release/2026-11-04-hero-reduced-motion:main`. Vercel deploys main to production.
3. Wait for the production deploy to finish (`vercel ls` or the GitHub status), then open https://lorin.work with reduced motion emulated (Playwright `emulateMedia({ reducedMotion: 'reduce' })`) at 1440 and 390: the hero opens composed and still (“Designing Connection”, marks, subtitle, View Work, nav). Also check it without reduced motion: the scroll version unchanged. Close the browser.
4. Update this repo's STATUS (one line: live, the date, the commit) and commit it on the folder's current branch (not main).

## Close-out
One line to ⭐ TPM · Homebase: live or not, with the deploy URL. `done.mjs`.
