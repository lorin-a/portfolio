# The About section's Currently card: her new words

**Model: Opus.** Small copy change, sent from ⭐ TPM · Mortality Commons (MC ledger 900, 9 Nov). The portfolio is live at https://lorin.work, and `main` deploys to production, so a push to `main` needs her yes first.

## Her words (9 Nov), final
The `currently` card's body in `components/AboutSection/AboutSection.js` becomes exactly:

> Designing and building projects I’m passionate about: a community commons for discussing mortality, an emotional processing tool for overwhelm, a collaborative brand identity platform, custom workspace tools for designers who code with AI, and entry-level learning modules for those who want to design with code.

(Her draft, verbatim: “designing and building projects I am passionate about: community commons for discussing mortality, emotional processing tool for overwhelm, collaborative brand identity platform, custom workspace tools for designers who code with AI, and entry-level learning modules for those who want to”, then “it was meant to say those who want to (design with code)”. The TPM added only the articles and “I’m”; she approved that read. No names, no Maria, no women’s health: her call.)

## Do
1. The folder sits on `feat/folder-expand`. Make the change on a branch off `main` (not on feat/folder-expand) so only this goes live.
2. Use curly apostrophes. Check the card at 1440 and 390, open and closed, against the other two cards: it's now the longest by far. The drop-down cascade has to fit it, with no orphan, the rag clean, and nothing clipped. If the length breaks the card's layout, fix the layout, never the words. Headless only, and close the browser.
3. Make a preview deploy, record it (`sites.mjs add portfolio "Currently card preview" <url> --kind preview`), and put her yes on her To-do: `ask.mjs add portfolio "Push the new Currently card live at https://lorin.work?" --link <preview> --weight yes --blocks chat --reply yesno`. On her yes, merge to main, push, and tell her once it's live.
4. History version, close-out, `done.mjs`.

## Success test
On the live site the Currently card reads exactly as above, at both widths, opened and closed, and nothing else on the site changed.
