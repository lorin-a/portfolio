import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPORTS_DIR = resolve(__dirname, '..', 'reports')

const ROUTES = [
  { path: '/', name: 'homepage' },
  { path: '/projects/groundswell', name: 'groundswell' },
]

const BASE_URL = process.env.LH_BASE_URL || 'http://localhost:3001'

mkdirSync(REPORTS_DIR, { recursive: true })

const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
})

const flags = {
  port: chrome.port,
  output: 'html',
  logLevel: 'error',
}

const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
  },
}

const results = []

for (const route of ROUTES) {
  const url = `${BASE_URL}${route.path}`
  process.stdout.write(`Lighthouse: ${url} ... `)

  const result = await lighthouse(url, flags, config)
  const reportPath = resolve(REPORTS_DIR, `lighthouse-${route.name}.html`)
  writeFileSync(reportPath, result.report)

  const scores = {
    perf: Math.round(result.lhr.categories.performance.score * 100),
    a11y: Math.round(result.lhr.categories.accessibility.score * 100),
    bp: Math.round(result.lhr.categories['best-practices'].score * 100),
    seo: Math.round(result.lhr.categories.seo.score * 100),
  }

  results.push({ route: route.name, ...scores, reportPath })
  console.log(`perf ${scores.perf} a11y ${scores.a11y} bp ${scores.bp} seo ${scores.seo}`)
}

await chrome.kill()

console.log('')
console.log('Reports written to:')
for (const r of results) {
  console.log(`  ${r.reportPath}`)
}

// Soft assertion: warn but do not fail if any score drops below 80.
// Tighten thresholds once a baseline exists.
const failing = results.filter(
  (r) => r.perf < 80 || r.a11y < 90 || r.bp < 80 || r.seo < 80
)
if (failing.length > 0) {
  console.log('')
  console.log('Warning: thresholds not met on some routes.')
  console.log('Targets: perf >= 80, a11y >= 90, best-practices >= 80, seo >= 80')
  process.exit(1)
}
