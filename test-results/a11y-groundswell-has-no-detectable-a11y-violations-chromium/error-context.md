# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.js >> groundswell has no detectable a11y violations
- Location: tests/a11y.spec.js:10:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 863

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
+               "bgColor": "#fbfbfb",
+               "contrastRatio": 4.39,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7a7385",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.39 (foreground color: #7a7385, background color: #fbfbfb, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<section id=\"cards\" class=\"project_breakSection__rkrkS\">",
+                 "target": Array [
+                   "#cards",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.39 (foreground color: #7a7385, background color: #fbfbfb, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"CardCarousel_carouselCounter___sSeS\">8<!-- --> of <!-- -->15</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".CardCarousel_carouselCounter___sSeS",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#8f8a9a",
+               "contrastRatio": 3.23,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#fbfbfb",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"project_workshopLabel___kv0I\">Coloring Culture</span>",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH > .project_workshopLabel___kv0I",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"project_workshopLabel___kv0I\">Coloring Culture</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH > .project_workshopLabel___kv0I",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "19.2pt (25.6px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_workshopCarouselCard__U1QJH\">",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+         "html": "<h3 class=\"project_workshopTitle__lAzA4\">Nourishing the Flower</h3>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH > .project_workshopTitle__lAzA4",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 3.52,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7e7986",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_workshopCarouselCard__U1QJH\">",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"project_workshopBody__i4nJd\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH > .project_workshopBody__i4nJd",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_workshopCarouselCard__U1QJH\">",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<blockquote class=\"project_workshopQuote__sLgQb\">“<!-- -->Positive atmosphere, positive energy. Team player. Support one another.<!-- -->”</blockquote>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(1) > .project_workshopCarouselCard__U1QJH > .project_workshopQuotes__MfHCd > .project_workshopQuote__sLgQb",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#8f8a9a",
+               "contrastRatio": 3.23,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#fbfbfb",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"project_workshopLabel___kv0I\">Grief Scenarios</span>",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH > .project_workshopLabel___kv0I",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"project_workshopLabel___kv0I\">Grief Scenarios</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH > .project_workshopLabel___kv0I",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "19.2pt (25.6px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_workshopCarouselCard__U1QJH\">",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+         "html": "<h3 class=\"project_workshopTitle__lAzA4\">Grief Workshop</h3>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH > .project_workshopTitle__lAzA4",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 3.52,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7e7986",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_workshopCarouselCard__U1QJH\">",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"project_workshopBody__i4nJd\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH > .project_workshopBody__i4nJd",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_workshopCarouselCard__U1QJH\">",
+                 "target": Array [
+                   ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<blockquote class=\"project_workshopQuote__sLgQb\">“<!-- -->A manager or team member asking, what can I do to help? I’ve got you covered.<!-- -->”</blockquote>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".project_workshopCarouselSlot__dp_Vo:nth-child(3) > .project_workshopCarouselCard__U1QJH > .project_workshopQuotes__MfHCd > .project_workshopQuote__sLgQb",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#8f8a9a",
+               "contrastRatio": 3.23,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#fbfbfb",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"project_playtestCategoryLabel__E96mw\">FEEDBACK</span>",
+                 "target": Array [
+                   "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestCategoryLabel__E96mw",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"project_playtestCategoryLabel__E96mw\">FEEDBACK</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestCategoryLabel__E96mw",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "19.2pt (25.6px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+         "html": "<span class=\"project_playtestLabel__Yvsnu\">Accessibility</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestLabel__Yvsnu",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 3.52,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7e7986",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"project_playtestProblem__5lN9F\">Participants with larger bodies reported discomfort with table positioning, limiting their ability to rest comfortably.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestProblem__5lN9F",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<blockquote class=\"project_playtestQuote__ZXCh9\">“<!-- -->Uncomfortable for larger people. I wished to rest my head on the table but couldn't get comfortable. The biggest thing was getting comfortable.<!-- -->”</blockquote>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestQuote__ZXCh9",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>We sawed 2 inches from the table depth to accommodate a wider range of body sizes and postures.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Accessibility iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestSolution__Y_LQL > p",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#8f8a9a",
+               "contrastRatio": 3.23,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#fbfbfb",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"project_playtestCategoryLabel__E96mw\">FEEDBACK</span>",
+                 "target": Array [
+                   "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestCategoryLabel__E96mw",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.23 (foreground color: #fbfbfb, background color: #8f8a9a, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"project_playtestCategoryLabel__E96mw\">FEEDBACK</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestCategoryLabel__E96mw",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "19.2pt (25.6px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 19.2pt (25.6px), font weight: normal). Expected contrast ratio of 3:1",
+         "html": "<span class=\"project_playtestLabel__Yvsnu\">Entry Ritual</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestLabel__Yvsnu",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 3.52,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#7e7986",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.52 (foreground color: #7e7986, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"project_playtestProblem__5lN9F\">Participants who started with music reported significantly deeper engagement with other pod activities.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestProblem__5lN9F",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<blockquote class=\"project_playtestQuote__ZXCh9\">“<!-- -->The music was wonderful—it really set the tone and helped me settle in. I was able to engage with everything else more deeply after that.<!-- -->”</blockquote>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestQuote__ZXCh9",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ece9f1",
+               "contrastRatio": 2.78,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8f8a9a",
+               "fontSize": "12.0pt (16px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"project_playtestCarouselCard__cF8nu\">",
+                 "target": Array [
+                   "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.78 (foreground color: #8f8a9a, background color: #ece9f1, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p>We repositioned the table centerpiece to center and ensured music exploration was the first instruction step.</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "div[aria-label=\"Go to Entry Ritual iteration\"] > .project_playtestCarouselCard__cF8nu > .project_playtestSolution__Y_LQL > p",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fbf9f6",
+               "contrastRatio": 1.89,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#bbb7b4",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.89 (foreground color: #bbb7b4, background color: #fbf9f6, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body>",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.89 (foreground color: #bbb7b4, background color: #fbf9f6, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
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
+               "bgColor": "#fbf9f6",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8682",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body>",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
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
+               "bgColor": "#fbf9f6",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8682",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body>",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
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
+               "bgColor": "#fbf9f6",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8682",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body>",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
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
+               "bgColor": "#fbf9f6",
+               "contrastRatio": 3.43,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8682",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<body>",
+                 "target": Array [
+                   "body",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.43 (foreground color: #8a8682, background color: #fbf9f6, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
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
    - generic [ref=e4]:
      - progressbar "Reading progress"
      - generic [ref=e5]:
        - img "Groundswell installation at UPMC Magee-Womens Hospital" [ref=e7]
        - generic [ref=e9]:
          - paragraph [ref=e10]: A Design Ecology for Staff Well-Being
          - heading "Groundswell" [level=1] [ref=e11]
          - paragraph [ref=e12]: Making Space to Restore, Together
          - generic [ref=e13]:
            - generic [ref=e14]: Co-Production
            - generic [ref=e15]: Healthcare
            - generic [ref=e16]: Co-Design
        - generic [ref=e18]: Scroll
      - generic [ref=e21]:
        - generic [ref=e22]:
          - generic [ref=e23]: Client
          - generic [ref=e24]: UPMC Magee-Womens Hospital
        - generic [ref=e25]:
          - generic [ref=e26]: Duration
          - generic [ref=e27]: 15 wks research + 10 wks production + ongoing pilot
        - generic [ref=e28]:
          - generic [ref=e29]: Status
          - generic [ref=e30]: 12-month Quality Improvement Study
        - generic [ref=e31]:
          - generic [ref=e32]: Role
          - generic [ref=e33]: Research, Co-Design, Copywriting, Project Coordination, Donor Outreach
        - generic [ref=e34]:
          - generic [ref=e35]: Team
          - generic [ref=e36]: Kristin Hughes, Elijah Benzon, Kelly McDowell, Robertus Sucahyo, Greg Baltus
        - generic [ref=e37]:
          - generic [ref=e38]: Live Site
          - link "Visit Groundswell →" [ref=e39] [cursor=pointer]:
            - /url: /groundswell
      - generic [ref=e40]:
        - generic [ref=e42]:
          - heading "The Vision" [level=2] [ref=e43]
          - paragraph [ref=e44]: Groundswell is a grant-funded ecosystem of emotional support for healthcare workers, developed with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital.
          - paragraph [ref=e45]: Through communication, creativity, and connection, Groundswell fosters a culture where the emotional complexities of oncology care are acknowledged, isolation transforms into belonging, and self-care is honored as essential to delivering excellent patient care.
          - blockquote [ref=e46]: “Groundswell reminds us that caring for patients begins with caring for the people who serve them. By creating intentional spaces and practices that acknowledge the emotional realities of oncology care, we're laying the foundation for a culture where staff well-being is recognized as essential.”
          - generic [ref=e47]: — Samantha Williams, Director of Women's Cancer Services, UPMC
        - button "Play Installation Walkthrough" [ref=e52] [cursor=pointer]:
          - generic [ref=e53]: ▶
          - generic [ref=e54]: Installation Walkthrough
      - generic [ref=e56]:
        - generic [ref=e57]:
          - heading "The Ecosystem" [level=2] [ref=e58]
          - paragraph [ref=e59]:
            - emphasis [ref=e60]: Named for water that rises naturally from deep within the earth, Groundswell emerges directly from the efforts and voices of healthcare workers themselves.
          - paragraph [ref=e61]: The ecosystem comprises four interconnected components—each addressing a different dimension of workplace well-being, designed to meet staff wherever they are in their day. Together, they create the conditions for culture change to emerge from within the care community.
        - generic [ref=e63]:
          - tablist [ref=e64]:
            - tab "System Map" [selected] [ref=e65] [cursor=pointer]
            - tab "Core Values" [ref=e66] [cursor=pointer]
          - generic [ref=e67]:
            - tabpanel [ref=e68]:
              - img "Ecosystem flow diagram showing how CTB Email, Pod, Garden Art Wall, and Reflection Cards connect to moments like arriving at work, taking a break, patient loss, hard moments, and one-on-one meetings" [ref=e69]
            - tabpanel [ref=e70]:
              - 'img "Groundswell core values: Humanity, Together, Normalcy, and Compassion forming a continuous cycle" [ref=e71]'
      - generic [ref=e72]:
        - generic [ref=e74]:
          - paragraph [ref=e75]: Component 01
          - heading "Community Art Wall" [level=3] [ref=e76]
          - paragraph [ref=e77]: A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences.
          - paragraph [ref=e78]: We intentionally included family caregivers and patients because we saw how important it was for staff to hear from them—especially gratitude, as almost every desk was decorated with cards from patients and families. Staff reported discomfort expressing feelings due to fear of retaliation. We built this as an anonymous place to safely share and understand what others are feeling—giving public, collective voice to the cancer care community.
          - blockquote [ref=e79]: “Groundswell is not just a campaign—it's a commitment. By centering staff-identified well-being priorities, we're ensuring that every voice is heard and concerns are addressed.”
          - generic [ref=e80]: — Kendyl Grant, Director of Operations for the Gynecologic Oncology Division, UPMC
        - generic [ref=e81]:
          - img "Groundswell Community Art Wall" [ref=e83]
          - img "Art wall contributions from staff" [ref=e85]
          - img "Art wall community expressions" [ref=e87]
          - img "Art wall collective voice" [ref=e89]
      - generic [ref=e90]:
        - generic [ref=e91]:
          - img "Groundswell Restorative Pod" [ref=e93]
          - img "Pod interior with soft LED lighting" [ref=e95]
          - img "Pod poem and invitation to set down what you carry" [ref=e97]
          - img "Pod meditation resources and finger labyrinth" [ref=e99]
          - paragraph [ref=e104]: Staff access guided meditations and poetry on-demand
        - generic [ref=e106]:
          - paragraph [ref=e107]: Component 02
          - heading "Restorative Pod" [level=3] [ref=e108]
          - paragraph [ref=e109]: A dedicated space for emotional decompression through mindfulness activities like guided meditation.
          - paragraph [ref=e110]: We heard that staff save their tears for the car ride home or the bathroom stall—a process that takes away from their quality time with loved ones. Almost everyone we spoke to commented on the physical environment as an opportunity for improvement. Nestled in a space that once housed telephone booths, the pod invites staff to take a moment to restore, reinforcing the message that emotional labor is real work deserving of real space.
          - generic [ref=e111]:
            - paragraph [ref=e112]: Pod Audio Resources
            - generic [ref=e114]:
              - generic [ref=e115]: Poem
              - generic [ref=e116]: “Remember Your Heart”
            - generic [ref=e119]:
              - generic [ref=e120]: Guided Meditation
              - generic [ref=e121]: “Coming Home to Yourself”
      - generic [ref=e123]:
        - generic [ref=e125]:
          - paragraph [ref=e126]: Component 03
          - heading "Ceased to Breathe Email" [level=3] [ref=e127]
          - paragraph [ref=e128]: Updated patient death notification email template with compassionate visuals and language that acknowledges the impact of patient loss.
          - paragraph [ref=e129]: "What we initially saw as a cold clinical protocol was actually a staff-created innovation—a radical act of compassion one nurse manager had built to ensure colleagues learned about patient deaths with dignity. This revelation shifted our entire approach: from “the system has let you down” to “you have already created a beautiful culture of care.” Groundswell honors and amplifies what was already there by integrating a low-effort change to an Outlook email template. This component infuses the language of care into the workflow without over-burdening staff with administrative overhead."
        - generic [ref=e130]:
          - img "CTB email context and development" [ref=e132]
          - img "Redesigned Ceased to Breathe email template" [ref=e134]
          - img "CTB email detail showing compassionate language" [ref=e136]
      - generic [ref=e138]:
        - generic [ref=e139]:
          - paragraph [ref=e140]: Component 04
          - heading "Reflection Cards" [level=3] [ref=e141]
          - paragraph [ref=e142]: Guided reflection cards that help staff build a self-care practice through emotional validation and introductory exercises for emotional regulation.
          - paragraph [ref=e143]: By showing healthcare workers that the full spectrum of grief includes complex and contradictory emotions, the cards help create a more holistic culture of care. The combination of emotional identification, validation, and somatic exercises makes this a powerful tool for connection with self and others. Every staff member received their own deck; one set permanently lives in the pod.
          - paragraph [ref=e144]: Click any card to flip and explore the exercises on the back.
        - region "Reflection cards carousel" [ref=e145]:
          - generic [ref=e146]:
            - img [ref=e148]
            - img [ref=e150]
            - button "joyful card - click to flip and see exercise" [ref=e151] [cursor=pointer]:
              - generic [ref=e152]:
                - img "joyful card front" [ref=e154]
                - img "joyful card back" [ref=e156]
            - img [ref=e158]
            - img [ref=e160]
          - generic [ref=e161]:
            - button "Previous card" [ref=e162] [cursor=pointer]: ←
            - generic [ref=e163]:
              - generic [ref=e164]: Click to flip
              - generic [ref=e165]: 8 of 15
            - button "Next card" [ref=e166] [cursor=pointer]: →
      - generic [ref=e167]:
        - generic [ref=e168]:
          - generic [ref=e172]: Entry Screen
          - generic [ref=e176]: Data Module
          - generic [ref=e180]: Click-through Overlay
          - generic [ref=e184]: Chart View
          - generic [ref=e188]: Display View
          - generic [ref=e192]: Admin Page
        - generic [ref=e194]:
          - heading "The Outcomes" [level=2] [ref=e195]
          - paragraph [ref=e196]: Groundswell is now officially installed at UPMC Magee-Womens Hospital, launching a 12-month quality improvement study for Cancer Services staff.
          - paragraph [ref=e197]: The study combines quantitative data with qualitative interviews, measuring compassion fatigue, burnout, culture of employee well-being, and intent to leave—before, during, and after the installation. We built a data visualization website to track and communicate our findings, integrating survey data with video documentation. Data is blurred to protect unpublished study findings.
          - blockquote [ref=e198]: “Caring for people means seeing them as whole, complex, and beautiful human beings—not just as patients in need of medicine or surgery. Healing begins with caring for the caregivers.”
          - generic [ref=e199]: — Dr. Sarah Taylor, Gynecologic Oncology, UPMC
      - generic [ref=e200]:
        - generic [ref=e202]:
          - heading "The Context" [level=2] [ref=e203]
          - paragraph [ref=e204]: How might we create supportive environments where staff can feel nurtured, recognized, and celebrated?
          - paragraph [ref=e205]: "Healthcare workers face a dual burden: the inherently compassionate nature of their work—constant exposure to grief, loss, and trauma—combined with excessive administrative tasks that disconnect them from their original purpose of patient care."
          - paragraph [ref=e206]:
            - text: We learned about the phenomenon of
            - link "“chronic compounded grief”" [ref=e207] [cursor=pointer]:
              - /url: https://pubmed.ncbi.nlm.nih.gov/7600555/
            - text: among oncology nurses, and how repeated exposure to loss accumulates over time when not properly processed. Over 1 in 5 healthcare workers in the U.S. have experienced
            - link "PTSD" [ref=e208] [cursor=pointer]:
              - /url: https://ndpanalytics.com/wp-content/uploads/HCW-Shortage-Final-Mar-2023.pdf
            - text: .
            - link "73% of emergency physicians report stigma around mental health treatment" [ref=e209] [cursor=pointer]:
              - /url: https://www.emergencyphysicians.org/article/mental-health/poll-workplace-stigma-fear-of-professional-consequences-prevent-emergency-physicians-from-seeking-mental-health-care
            - text: in their workplace, with 27% avoiding treatment entirely due to fear of professional consequences.
          - blockquote [ref=e210]:
            - text: This is not an individual failure.
            - text: It is a systemic one.
        - generic [ref=e211]:
          - img "Groundswell installation at UPMC" [ref=e213]
          - img "Research at UPMC Magee-Womens Hospital" [ref=e215]
          - img "Engaging with healthcare workers" [ref=e217]
          - img "Rehearsing Research Activities" [ref=e219]
      - generic [ref=e220]:
        - generic [ref=e221]:
          - generic [ref=e223]:
            - blockquote [ref=e224]: “A special person can do this work forever, a good person can do it for a little while, most people couldn’t do it for a day.”
            - paragraph [ref=e225]: The system is held together by invisible labor of its staff, a finite resource that is systematically undervalued.
          - generic [ref=e227]:
            - blockquote [ref=e228]: “I feel trapped.”
            - paragraph [ref=e229]: There is no way out. If I leave my patients I will feel guilty. If I leave my workers in this mess I will feel guilty. When someone leaves, people are jealous of them for getting out.
          - generic [ref=e231]:
            - blockquote [ref=e232]: “What mental health?”
            - paragraph [ref=e233]: There are zero benefits for staff mental health. Hardly anyone uses the EAP. I would use a meditation app if it was provided.
          - generic [ref=e235]:
            - blockquote [ref=e236]: “There is no time to grieve.”
            - paragraph [ref=e237]: Once someone passes there is no time to grieve the loss before another person comes in. We are trying to find ways to share but nothing is really working.
          - generic [ref=e239]:
            - blockquote [ref=e240]: “I was not prepared for this.”
            - paragraph [ref=e241]: No one officially trained me on the emotional trauma that this job causes. I'm doing the work of a therapist and social worker, losing people daily.
          - generic [ref=e243]:
            - blockquote [ref=e244]: “I can't turn it off.”
            - paragraph [ref=e245]: Even on my days off, I keep checking Teams to stay updated. I worry about my patients when I am at home. I am so exhausted.
        - generic [ref=e247]:
          - heading "What We Heard" [level=2] [ref=e248]
          - paragraph [ref=e249]: Over 15 weeks embedded with oncology staff, we listened—in hallways, at nursing stations, and in quiet moments between shifts.
          - paragraph [ref=e250]: We conducted contextual interviews while shadowing nurses across multiple occasions, observing the windowless environment, the cramped desks, the constant interruptions. We also held an in-depth interview with a former employee who could speak freely about the culture without fear of professional consequences.
          - paragraph [ref=e251]: We sat with people and heard stories of skipping meals, saving tears for the car ride home, and feeling unprepared for the emotional load. We also heard about moments of support, bonding, and staff-funded morale events that inspired us to amplify what was already working.
      - generic [ref=e252]:
        - generic [ref=e254]:
          - paragraph [ref=e255]: Participatory Research
          - heading "The Workshops" [level=2] [ref=e256]
          - paragraph [ref=e257]: Three participatory activities designed to meet staff where they are—each one building trust, creating space for vulnerability, and honoring the expertise of those doing the work.
        - region "Workshop activities carousel" [ref=e258]:
          - generic [ref=e259]:
            - generic [ref=e261] [cursor=pointer]:
              - generic [ref=e262]: Coloring Culture
              - heading "Nourishing the Flower" [level=3] [ref=e263]
              - paragraph [ref=e264]: Using the anatomy of a flower as a metaphor for workplace health, participants mapped their experiences onto two worksheets—one flourishing, one wilting. The exercise surfaced what sustains people alongside what quietly erodes them. The session ended with the group voting on what resonated most.
              - blockquote [ref=e266]: “Positive atmosphere, positive energy. Team player. Support one another.”
              - generic [ref=e267]:
                - button "View Nourishing the Flower activity worksheets in lightbox" [ref=e268]:
                  - img "Nourishing the Flower activity worksheets" [ref=e269]
                - button "View Staff completing flower activity in lightbox" [ref=e270]:
                  - img "Staff completing flower activity" [ref=e271]
            - generic [ref=e273]:
              - generic [ref=e274]: Participatory Poster
              - heading "Women in White Coats" [level=3] [ref=e275]
              - paragraph [ref=e276]:
                - text: We partnered with
                - link "CancerBridges" [ref=e277] [cursor=pointer]:
                  - /url: https://cancerbridges.org/
                - text: "to honor women in cancer care. Each participant received a hand-made orchid pin with a removable “leaf” they could add to a shared poster answering:"
                - emphasis [ref=e278]: How has your approach to patient care evolved to help you balance compassion with self-care?
              - blockquote [ref=e280]: “Self-care to me is gifting time. 'Me' time, 'she' time, and 'we' time.”
              - generic [ref=e281]:
                - button "View Women in White Coats event honoring women in cancer care in lightbox" [ref=e282]:
                  - img "Women in White Coats event honoring women in cancer care" [ref=e283]
                - button "View Research poster with participant responses in lightbox" [ref=e284]:
                  - img "Research poster with participant responses" [ref=e285]
            - generic [ref=e287] [cursor=pointer]:
              - generic [ref=e288]: Grief Scenarios
              - heading "Grief Workshop" [level=3] [ref=e289]
              - paragraph [ref=e290]: We created a container for vulnerability—using a soft stuffed animal as a “puppet” to abstract the topic of grief. Staff were given scenarios and asked what they could do or say to support their colleague. The session ended with the group voting on what resonated most.
              - blockquote [ref=e292]: “A manager or team member asking, what can I do to help? I’ve got you covered.”
              - generic [ref=e293]:
                - button "View Grief workshop with trauma-informed facilitation in lightbox" [ref=e294]:
                  - img "Grief workshop with trauma-informed facilitation" [ref=e295]
                - button "View Staff engaging with scenario-based discussion in lightbox" [ref=e296]:
                  - img "Staff engaging with scenario-based discussion" [ref=e297]
          - generic [ref=e298]:
            - button "Previous workshop" [ref=e299] [cursor=pointer]: ←
            - generic [ref=e300]:
              - generic [ref=e301]: Click side cards to navigate
              - generic [ref=e302]: 2 of 3
            - button "Next workshop" [ref=e303] [cursor=pointer]: →
          - generic [ref=e304]:
            - button "Go to workshop 1" [ref=e305] [cursor=pointer]
            - button "Go to workshop 2" [ref=e306] [cursor=pointer]
            - button "Go to workshop 3" [ref=e307] [cursor=pointer]
      - generic [ref=e308]:
        - generic [ref=e310]:
          - heading "The Synthesis" [level=2] [ref=e311]
          - paragraph [ref=e312]: "We organized our observations and quotes through affinity mapping and a tetrahedron analysis across four dimensions: recognition, environment, culture, and systemic."
          - paragraph [ref=e313]:
            - text: "The synthesis revealed a deeper structural tension: healthcare workers face a"
            - strong [ref=e314]: dual burden
            - text: —emotional exhaustion from the inherently compassionate nature of their work (constant exposure to grief, loss, and trauma) alongside excessive administrative tasks that disconnect them from their original purpose of patient care.
          - generic [ref=e315]:
            - generic [ref=e316]:
              - generic [ref=e317]: Recognition
              - generic [ref=e318]: feeling appreciated
            - generic [ref=e319]:
              - generic [ref=e320]: Environment
              - generic [ref=e321]: workspace quality and wellbeing resources
            - generic [ref=e322]:
              - generic [ref=e323]: Culture
              - generic [ref=e324]: positive team dynamics and workplace norms
            - generic [ref=e325]:
              - generic [ref=e326]: Systemic
              - generic [ref=e327]: institutional constraints beyond individual control
        - generic [ref=e328]:
          - img "Affinity mapping session" [ref=e330]
          - img "Research synthesis and pattern identification" [ref=e332]
          - img "Identifying interconnected forces" [ref=e334]
      - generic [ref=e336]:
        - generic [ref=e337]:
          - heading "The Void" [level=2] [ref=e338]
          - paragraph [ref=e339]:
            - text: While patient-centered care aims to improve health outcomes,
            - strong [ref=e340]: it often neglects the well-being of healthcare workers
            - text: . In a profit-driven, hierarchical system that treats staff as disposable, the intense focus on patients comes at the cost of worker support, leading to burnout, poor recognition, and a toxic workplace culture. This imbalance ultimately undermines the quality of care for both patients and providers, highlighting the
            - strong [ref=e341]: urgent need for a model that values healthcare workers as essential to sustainable, high-quality care
            - text: .
        - generic [ref=e342]:
          - link "View interactive synthesis diagram in Figma (opens in new tab)" [ref=e343] [cursor=pointer]:
            - /url: https://www.figma.com/design/qmXOejgmdOtExNJVkXRvT8/Groundswell-Synthesis?node-id=0-1&t=OHmK0R38j59hR2VI-1
            - img "Synthesis diagram mapping Recognition, Environment, Culture, and Systemic Issues with The Void at center" [ref=e344]
          - paragraph [ref=e345]: View interactive diagram in Figma
      - generic [ref=e346]:
        - generic [ref=e347]:
          - img "Early lo-fi pod prototype exploring spatial concepts" [ref=e349]
          - img "Design mockup and concept visualization" [ref=e351]
          - img "Figma design boards with sketches and planning" [ref=e353]
          - img "Greg Baltus beginning pod fabrication" [ref=e355]
          - img "Construction process and assembly" [ref=e357]
          - img "Pod customization in progress" [ref=e359]
          - img "Final fabrication details" [ref=e361]
          - img "Acrylic facade with LED signaling system installed" [ref=e363]
          - img "Installation day at UPMC Magee-Womens Hospital" [ref=e365]
          - img "Final installed pod in hospital setting" [ref=e367]
        - generic [ref=e369]:
          - heading "The Making" [level=2] [ref=e370]
          - paragraph [ref=e371]: Over a 10-week production sprint, we turned concept into installation. Working hybrid between remote coordination and on-site collaboration, the team managed donor outreach, copywriting, and strategic partnerships that secured approximately $30,000 worth of donated materials and services.
          - paragraph [ref=e372]: The project required constant adaptation. Early staff feedback shifted our language from “grief” to “restoration,” reframing the messaging. Halfway through production, hospital administration required lockable doors on the pod. Our solution provided engagement, privacy, and emotional safety without surveillance—turning a constraint into an asset.
          - generic [ref=e373]:
            - generic [ref=e374]:
              - generic [ref=e375]:
                - generic [ref=e376]: Pre-Production
                - generic [ref=e377]: 2 weeks
              - generic [ref=e378]: Concept revision, project timeline, early sketches
            - generic [ref=e379]:
              - generic [ref=e380]:
                - generic [ref=e381]: Concept Revisions
                - generic [ref=e382]: 2 weeks
              - generic [ref=e383]: Content feedback, donation outreach, presentation
            - generic [ref=e384]:
              - generic [ref=e385]:
                - generic [ref=e386]: Design
                - generic [ref=e387]: 4 weeks
              - generic [ref=e388]: Graphic design, vendor coordination, prototypes
            - generic [ref=e389]:
              - generic [ref=e390]:
                - generic [ref=e391]: Fabrication
                - generic [ref=e392]: 4 weeks
              - generic [ref=e393]: Pod design and assembly, play testing, install
      - generic [ref=e395]:
        - generic [ref=e396]:
          - heading "Play Testing" [level=2] [ref=e397]
          - paragraph [ref=e398]: We invited 30 participants to test the pod experience before hospital installation. Through structured feedback sessions, we identified three critical areas for improvement and iterated rapidly to ensure the design met real user needs.
        - img "Play testing setup with participant feedback session" [ref=e400]
        - region "Play testing iterations carousel" [ref=e401]:
          - generic [ref=e402]:
            - button "Go to Accessibility iteration" [ref=e403] [cursor=pointer]:
              - generic [ref=e404]:
                - generic [ref=e405]: FEEDBACK
                - generic [ref=e406]: Accessibility
                - paragraph [ref=e407]: Participants with larger bodies reported discomfort with table positioning, limiting their ability to rest comfortably.
                - blockquote [ref=e408]: “Uncomfortable for larger people. I wished to rest my head on the table but couldn't get comfortable. The biggest thing was getting comfortable.”
                - generic [ref=e409]:
                  - generic [ref=e410]: →
                  - paragraph [ref=e411]: We sawed 2 inches from the table depth to accommodate a wider range of body sizes and postures.
            - generic [ref=e413]:
              - generic [ref=e414]: FEEDBACK
              - generic [ref=e415]: Wayfinding
              - paragraph [ref=e416]: Multiple participants expressed confusion about where to start, creating anxiety that undermined the calming intent.
              - blockquote [ref=e417]: “Not sure what to do first. I was worried about doing something wrong—eventually I let go of that, but it took time.”
              - generic [ref=e418]:
                - generic [ref=e419]: →
                - paragraph [ref=e420]: We added clear step-by-step instructions, making the digital library the explicit first step to set intention.
            - button "Go to Entry Ritual iteration" [ref=e421] [cursor=pointer]:
              - generic [ref=e422]:
                - generic [ref=e423]: FEEDBACK
                - generic [ref=e424]: Entry Ritual
                - paragraph [ref=e425]: Participants who started with music reported significantly deeper engagement with other pod activities.
                - blockquote [ref=e426]: “The music was wonderful—it really set the tone and helped me settle in. I was able to engage with everything else more deeply after that.”
                - generic [ref=e427]:
                  - generic [ref=e428]: →
                  - paragraph [ref=e429]: We repositioned the table centerpiece to center and ensured music exploration was the first instruction step.
          - generic [ref=e430]:
            - button "Previous iteration" [ref=e431] [cursor=pointer]: ←
            - generic [ref=e433]: 2 of 3
            - button "Next iteration" [ref=e434] [cursor=pointer]: →
          - generic [ref=e435]:
            - button "Go to iteration 1" [ref=e436] [cursor=pointer]
            - button "Go to iteration 2" [ref=e437] [cursor=pointer]
            - button "Go to iteration 3" [ref=e438] [cursor=pointer]
      - generic [ref=e439]:
        - generic [ref=e440]:
          - blockquote [ref=e443]: “It's remarkable what 10 minutes can do...”
          - blockquote [ref=e446]: “As soon as I stepped inside, I almost teared up. You're not always aware of how frazzled you are until you stop.”
          - blockquote [ref=e449]: “Being able to stop in the middle of the day and have the physical and mental space to get quiet and meditate is really helpful—much better than a bathroom stall.”
          - blockquote [ref=e452]: “You don't have to wait until the end of the day to refresh, but you can have micro-resets in-between.”
          - blockquote [ref=e455]: “I've worked in the trauma field, and I work with physicians—everyone needs one of these.”
        - generic [ref=e457]:
          - heading "What We Heard" [level=2] [ref=e458]
          - paragraph [ref=e459]: After implementing these changes, participants reported overwhelmingly positive experiences. The space offered emotional transformation, support, and privacy. Play testers ranged from retired nurses, UPMC administrators, design professors, mental health professionals, and designers.
          - img "Observing user interactions and gathering feedback" [ref=e460]
      - generic [ref=e462]:
        - generic [ref=e463]:
          - heading "The Reflection" [level=2] [ref=e464]
          - paragraph [ref=e465]: When design meets systems change and is rooted in relationships, outcomes become more than products—they become symbols of collaboration and seeds planted for better futures.
        - paragraph [ref=e467]: "Through Groundswell, we discovered what it means to practice healthcare design rooted in participatory research. We learned how to navigate transdisciplinary collaboration, coordinating physicians, nurses, fabricators, donors, meditation teachers, and hospital administrators toward a shared vision. More importantly, we learned to attune our design process to amplify rather than impose, to honor existing community innovations, and to build trust through sustained presence. This project fundamentally shaped how we approach design: not as outsiders with solutions, but as collaborators creating conditions for what’s already trying to emerge."
        - img "Groundswell team collaboration and installation" [ref=e469]
        - heading "Ongoing Work" [level=3] [ref=e472]
        - generic [ref=e474]:
          - generic [ref=e475]:
            - heading "Research Study" [level=4] [ref=e476]
            - paragraph [ref=e477]: Ongoing qualitative surveys and data collection throughout the 12-month pilot at UPMC Magee-Womens Hospital.
          - generic [ref=e478]:
            - heading "Academic Publication" [level=4] [ref=e479]
            - paragraph [ref=e480]:
              - text: "Research paper under peer review:"
              - emphasis [ref=e481]: "“Re-aligning Design Values: Co-Creating Resonance Through Presence, Attunement, and Harmonization With Cancer Services Staff”"
          - generic [ref=e482]:
            - heading "Data Visualization" [level=4] [ref=e483]
            - paragraph [ref=e484]: Developing a public-facing interactive data visualization platform using web-based 3D technologies to communicate study findings.
          - generic [ref=e485]:
            - heading "Expansion Proposals" [level=4] [ref=e486]
            - paragraph [ref=e487]: Submitted letters of intent to extend improved Groundswell programming to additional hospital and community settings, expanding support to family caregivers.
        - heading "In the Press" [level=3] [ref=e490]
        - generic [ref=e491]:
          - 'link "Carnegie Mellon School of Design Groundswell Creates Space for the Soul: Co-designing with Oncology Staff Read Article →" [ref=e494] [cursor=pointer]':
            - /url: https://www.design.cmu.edu/news/groundswell-creates-space-soul-co-designing-oncology-staff-upmc-magee-womens-hospital
            - generic [ref=e495]: Carnegie Mellon School of Design
            - 'heading "Groundswell Creates Space for the Soul: Co-designing with Oncology Staff" [level=4] [ref=e496]'
            - generic [ref=e497]: Read Article →
          - 'link "Carnegie Mellon School of Design Concept to Care: Designing Groundswell for Oncology Caregivers Read Article →" [ref=e500] [cursor=pointer]':
            - /url: https://www.design.cmu.edu/news/concept-care-designing-groundswell-oncology-caregivers
            - generic [ref=e501]: Carnegie Mellon School of Design
            - 'heading "Concept to Care: Designing Groundswell for Oncology Caregivers" [level=4] [ref=e502]'
            - generic [ref=e503]: Read Article →
      - generic [ref=e505]:
        - generic [ref=e506]:
          - heading "Acknowledgements" [level=2] [ref=e507]
          - paragraph [ref=e508]: This project is a tribute to the quiet strength, deep compassion, and collective spirit of those who provide oncology care. It was shaped by the voices of staff who shared their experiences—those who live this work every day.
          - paragraph [ref=e509]: Groundswell is a collaboration between Carnegie Mellon University’s School of Design, the University of Pittsburgh Schools of Medicine and Nursing, and the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. We are especially grateful to the Department of Obstetrics, Gynecology, and Reproductive Services and the incredible staff at Magee who made this project possible. Funding was provided by College of Fine Arts at CMU; the UPMC Magee-Womens Hospital Medical Staff Fund; and the Paul D. Schurgot Foundation.
        - generic [ref=e511]:
          - generic [ref=e512]:
            - heading "Leadership" [level=3] [ref=e513]
            - paragraph [ref=e514]:
              - strong [ref=e515]: Kristin Hughes, MFA
              - text: Design · Production · Project Lead · Professor · Principal Investigator · CMU
            - paragraph [ref=e516]:
              - strong [ref=e517]: Sarah E. Taylor, MD, PhD
              - text: Principal Investigator · UPMC Hillman Cancer Center
            - paragraph [ref=e518]:
              - strong [ref=e519]: Grace Campbell, PhD, MSW, RN
              - text: Supervising Faculty · Duquesne University
            - paragraph [ref=e520]:
              - strong [ref=e521]: Heidi Donovan, PhD, RN
              - text: Supervising Faculty · University of Pittsburgh School of Nursing
          - generic [ref=e522]:
            - heading "Design & Production" [level=3] [ref=e523]
            - paragraph [ref=e524]:
              - strong [ref=e525]: Lorin Anderberg, MA
              - text: Design · Development · Research · Production · Project Coordination · Donor Outreach
            - paragraph [ref=e526]:
              - strong [ref=e527]: Elijah Benzon, MA
              - text: Design · Development · Research · Production
            - paragraph [ref=e528]:
              - strong [ref=e529]: Greg Baltus
              - text: Fabrication · Hardware Assembly
            - paragraph [ref=e530]:
              - strong [ref=e531]: Kelly McDowell
              - text: Design · Development · Research
            - paragraph [ref=e532]:
              - strong [ref=e533]: Robertus Sucahyo, MBA
              - text: Development · Research
            - paragraph [ref=e534]:
              - strong [ref=e535]: Su Hong & Mia Jeong
              - text: Research Assistants
        - generic [ref=e537]:
          - heading "Donors & Partners" [level=3] [ref=e538]
          - paragraph [ref=e539]:
            - strong [ref=e540]: NookPod
            - text: donated the restorative pod structure ($13,000 value).
            - strong [ref=e541]: Greg Baltus and Hardware Assembly
            - text: provided remarkable design, engineering, and fabrication.
            - strong [ref=e542]: Catherine Liggett and Mark Staley
            - text: created custom guided meditations and poetry.
            - strong [ref=e543]: Carolyn Gavin
            - text: contributed artwork that became the visual thread unifying all program components.
            - strong [ref=e544]: Ryan Thompson
            - text: crafted the walnut tabletop from wood donated by
            - strong [ref=e545]: Eleanor Mackie Pigma
            - text: .
            - strong [ref=e546]: Fox Woodworks
            - text: provided wood elements.
          - paragraph [ref=e547]:
            - emphasis [ref=e548]: "Additional partners and donors: Schlage, Density, Dixie&Grace, Z9 Machinings, EHC Industries, Deborah Linhart, Pamela Meadowcroft, Marge Petruska, Kevin Lorenzi (photography), and Mark Baskinger (creative support and encouragement)."
        - img [ref=e551]
        - generic [ref=e553]:
          - paragraph [ref=e554]: We acknowledge that Groundswell could not have emerged without the deep trust-building between previous cohorts, Professor Kristin Hughes, and the UPMC staff. This version is intended as a first iteration. We hope to have the privilege to continue, improve, and expand based on the study’s findings.
          - paragraph [ref=e555]: Our poem was inspired by Joy Harjo’s work “Remember.”
          - paragraph [ref=e556]: To everyone who played a role in bringing this project to life—thank you.
  - contentinfo [ref=e557]:
    - generic [ref=e558]:
      - link "LinkedIn" [ref=e559] [cursor=pointer]:
        - /url: https://www.linkedin.com/in/lorinanderberg/
      - generic: Resume
      - link "Email" [ref=e560] [cursor=pointer]:
        - /url: mailto:lorinanderberg1@gmail.com
    - generic [ref=e561]:
      - paragraph [ref=e562]: "Type: Fraunces by Phaedra Charles & Flavia Zimbardi (Undercase Type)."
      - paragraph [ref=e563]: Open Sans by Steve Matteson.
      - paragraph [ref=e564]: "Stack: Next.js, GSAP, Cloudinary, Vercel."
      - paragraph [ref=e565]: "Pair: Claude Code."
  - alert [ref=e566]
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