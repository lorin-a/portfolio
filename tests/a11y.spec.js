import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const ROUTES = [
  { path: '/', name: 'homepage' },
  { path: '/projects/groundswell', name: 'groundswell' },
]

for (const route of ROUTES) {
  test(`${route.name} has no detectable a11y violations`, async ({ page }) => {
    await page.goto(route.path)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
}
