# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.js >> homepage has no detectable a11y violations
- Location: tests/a11y.spec.js:10:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 198

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#252525",
+               "contrastRatio": 2.32,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#5d5d5d",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.32 (foreground color: #5d5d5d, background color: #252525, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body class=\"hero-loading\" style=\"overflow: hidden;\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.32 (foreground color: #5d5d5d, background color: #252525, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"Footer_linkDisabled__pxcHK\">Resume</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".Footer_linkDisabled__pxcHK",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#252525",
+               "contrastRatio": 4.21,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#868686",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body class=\"hero-loading\" style=\"overflow: hidden;\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Type: Fraunces by Phaedra Charles &amp; Flavia Zimbardi (Undercase Type).</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".Footer_colophon__LFxFT > p:nth-child(1)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#252525",
+               "contrastRatio": 4.21,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#868686",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body class=\"hero-loading\" style=\"overflow: hidden;\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Open Sans by Steve Matteson.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".Footer_colophon__LFxFT > p:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#252525",
+               "contrastRatio": 4.21,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#868686",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body class=\"hero-loading\" style=\"overflow: hidden;\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Stack: Next.js, GSAP, Cloudinary, Vercel.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".Footer_colophon__LFxFT > p:nth-child(3)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#252525",
+               "contrastRatio": 4.21,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#868686",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body class=\"hero-loading\" style=\"overflow: hidden;\">",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.21 (foreground color: #868686, background color: #252525, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>Pair: Claude Code.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".Footer_colophon__LFxFT > p:nth-child(4)",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - main [ref=e3]:
    - region "Introduction" [ref=e8]:
      - generic [ref=e10]:
        - img [ref=e11]
        - img [ref=e22]
      - generic [ref=e25]: D
      - generic [ref=e26]: e
      - generic [ref=e27]: s
      - generic [ref=e28]: i
      - generic [ref=e29]: g
      - generic [ref=e30]: "n"
      - generic [ref=e31]: i
      - generic [ref=e32]: "n"
      - generic [ref=e33]: g
      - generic [ref=e34]: C
      - generic [ref=e35]: o
      - generic [ref=e36]: "n"
      - generic [ref=e37]: "n"
      - generic [ref=e38]: e
      - generic [ref=e39]: c
      - generic [ref=e40]: t
      - generic [ref=e41]: i
      - generic [ref=e42]: o
      - generic [ref=e43]: "n"
      - generic [ref=e45]:
        - generic [ref=e46]:
          - img [ref=e47]
          - img [ref=e49]
          - img [ref=e51]
          - img [ref=e53]
          - img [ref=e55]
          - img [ref=e57]
          - img [ref=e59]
          - img [ref=e61]
          - img [ref=e63]
          - img [ref=e65]
          - img [ref=e67]
        - generic [ref=e69]:
          - img [ref=e70]
          - img [ref=e72]
          - img [ref=e74]
          - img [ref=e76]
          - img [ref=e78]
          - img [ref=e80]
          - img [ref=e82]
          - img [ref=e84]
          - img [ref=e86]
          - img [ref=e88]
          - img [ref=e90]
      - generic [ref=e93]:
        - img [ref=e94]
        - img [ref=e97]
    - generic [ref=e99]:
      - region "Groundswell" [ref=e101]:
        - button "View next image (1 of 6)" [ref=e103] [cursor=pointer]:
          - generic "Groundswell opener" [ref=e105]
      - region "BirthStory" [ref=e107]:
        - button "View next image (1 of 3)" [ref=e109] [cursor=pointer]:
          - generic "BirthStory default preview" [ref=e111]
      - region "SomeBuddy" [ref=e113]:
        - button "View next image (1 of 5)" [ref=e115] [cursor=pointer]:
          - generic "SomeBuddy animated logo" [ref=e117]
      - region "Transition Design" [ref=e119]:
        - button "View next image (1 of 5)" [ref=e121] [cursor=pointer]:
          - generic "Transition design default preview" [ref=e123]
      - region "Bridging the G.A.P." [ref=e125]:
        - button "View next image (1 of 7)" [ref=e127] [cursor=pointer]:
          - generic "Bridging the G.A.P. logo animation" [ref=e129]
    - region "About Lorin Anderberg" [ref=e133]:
      - heading "About Lorin Anderberg" [level=2] [ref=e134]
      - generic [ref=e135]:
        - generic [ref=e137]:
          - generic:
            - img
          - img "Lorin Anderberg, smiling warmly at the camera" [ref=e139]
        - paragraph [ref=e141]:
          - generic [ref=e142]:
            - generic [ref=e143]:
              - generic [ref=e144]:
                - generic [ref=e146]: T
                - generic [ref=e148]: r
                - generic [ref=e150]: a
                - generic [ref=e152]: "n"
                - generic [ref=e154]: s
                - generic [ref=e156]: l
                - generic [ref=e158]: a
                - generic [ref=e160]: t
                - generic [ref=e162]: i
                - generic [ref=e164]: "n"
                - generic [ref=e166]: g
              - generic [ref=e167]:
                - generic [ref=e169]: l
                - generic [ref=e171]: i
                - generic [ref=e173]: v
                - generic [ref=e175]: e
                - generic [ref=e177]: d
              - generic [ref=e178]:
                - generic [ref=e180]: e
                - generic [ref=e182]: x
                - generic [ref=e184]: p
                - generic [ref=e186]: e
                - generic [ref=e188]: r
                - generic [ref=e190]: i
                - generic [ref=e192]: e
                - generic [ref=e194]: "n"
                - generic [ref=e196]: c
                - generic [ref=e198]: e
              - generic [ref=e199]:
                - generic [ref=e201]: i
                - generic [ref=e203]: "n"
                - generic [ref=e205]: t
                - generic [ref=e207]: o
            - generic [ref=e208]:
              - generic [ref=e209]:
                - generic [ref=e211]: t
                - generic [ref=e213]: o
              - generic [ref=e214]:
                - generic [ref=e216]: i
                - generic [ref=e218]: m
                - generic [ref=e220]: p
                - generic [ref=e222]: r
                - generic [ref=e224]: o
                - generic [ref=e226]: v
                - generic [ref=e228]: e
              - generic [ref=e229]:
                - generic [ref=e231]: c
                - generic [ref=e233]: o
                - generic [ref=e235]: m
                - generic [ref=e237]: p
                - generic [ref=e239]: l
                - generic [ref=e241]: e
                - generic [ref=e243]: x
              - generic [ref=e244]:
                - generic [ref=e246]: s
                - generic [ref=e248]: "y"
                - generic [ref=e250]: s
                - generic [ref=e252]: t
                - generic [ref=e254]: e
                - generic [ref=e256]: m
                - generic [ref=e258]: s
                - generic [ref=e260]: .
          - generic [ref=e261]: Translating lived experience into thoughtful design to improve complex systems.
        - group "My practice" [ref=e264]
        - paragraph [ref=e265]:
          - generic [ref=e272]: Want to make something meaningful?
  - contentinfo [ref=e273]:
    - generic [ref=e274]:
      - link "LinkedIn" [ref=e275] [cursor=pointer]:
        - /url: https://www.linkedin.com/in/lorinanderberg/
      - generic: Resume
      - link "Email" [ref=e276] [cursor=pointer]:
        - /url: mailto:lorinanderberg1@gmail.com
    - generic [ref=e277]:
      - paragraph [ref=e278]: "Type: Fraunces by Phaedra Charles & Flavia Zimbardi (Undercase Type)."
      - paragraph [ref=e279]: Open Sans by Steve Matteson.
      - paragraph [ref=e280]: "Stack: Next.js, GSAP, Cloudinary, Vercel."
      - paragraph [ref=e281]: "Pair: Claude Code."
  - alert [ref=e282]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import AxeBuilder from '@axe-core/playwright'
  3  | 
  4  | const ROUTES = [
  5  |   { path: '/', name: 'homepage' },
  6  |   { path: '/projects/groundswell', name: 'groundswell' },
  7  | ]
  8  | 
  9  | for (const route of ROUTES) {
  10 |   test(`${route.name} has no detectable a11y violations`, async ({ page }) => {
  11 |     await page.goto(route.path)
  12 |     await page.waitForLoadState('networkidle')
  13 | 
  14 |     const results = await new AxeBuilder({ page })
  15 |       .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  16 |       .analyze()
  17 | 
> 18 |     expect(results.violations).toEqual([])
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  19 |   })
  20 | }
  21 | 
```