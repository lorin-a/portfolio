import { test, expect } from '@playwright/test'

const ROUTES = [
  { path: '/', name: 'homepage' },
  { path: '/projects/groundswell', name: 'groundswell' },
]

const VIEWPORTS = [
  { width: 1440, height: 900, label: 'desktop' },
  { width: 768, height: 1024, label: 'tablet' },
  { width: 390, height: 844, label: 'mobile' },
]

for (const route of ROUTES) {
  for (const viewport of VIEWPORTS) {
    test(`${route.name} ${viewport.label} matches baseline`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      // Disable animations for stable screenshots
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `,
      })

      // Settle one frame after style injection
      await page.waitForTimeout(200)

      await expect(page).toHaveScreenshot(`${route.name}-${viewport.label}.png`, {
        fullPage: true,
      })
    })
  }
}
