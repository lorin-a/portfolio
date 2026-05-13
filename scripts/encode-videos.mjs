#!/usr/bin/env node
/**
 * Batch-compresses every video in the manifest to 1080p H.264 web-optimized.
 * Reads:  ~/Desktop/cloudinary-compressed/_manifest.json
 * Writes: ~/Desktop/cloudinary-compressed/<publicId>.mp4
 *
 * Settings: CRF 18, preset slow, max width 1920, faststart, AAC 128k.
 * Skips files already encoded (idempotent — safe to re-run).
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const OUTPUT = '/Users/lorinanderberg/Desktop/cloudinary-compressed'
const manifest = JSON.parse(fs.readFileSync(path.join(OUTPUT, '_manifest.json'), 'utf8'))

const CRF = 18
const PRESET = 'slow'

const fmtSize = b => (b / 1024 / 1024).toFixed(1) + ' MB'

let totalIn = 0, totalOut = 0, skipped = 0, failed = 0
const failures = []

for (const [i, item] of manifest.matched.entries()) {
  const outPath = path.join(OUTPUT, `${item.publicId}.mp4`)
  const label = `[${i + 1}/${manifest.matched.length}] ${item.publicId}`

  if (fs.existsSync(outPath)) {
    const outSize = fs.statSync(outPath).size
    totalIn += item.size
    totalOut += outSize
    skipped++
    console.log(`${label} — already encoded (${fmtSize(outSize)}), skipping`)
    continue
  }

  console.log(`${label} — encoding ${fmtSize(item.size)}...`)
  const result = spawnSync('ffmpeg', [
    '-i', item.local,
    '-vf', "scale='min(1920,iw)':-2",
    '-c:v', 'libx264',
    '-crf', String(CRF),
    '-preset', PRESET,
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-y',
    outPath,
  ], { stdio: ['ignore', 'ignore', 'pipe'] })

  if (result.status !== 0) {
    failed++
    failures.push({ publicId: item.publicId, stderr: result.stderr?.toString().slice(-500) })
    console.log(`  ✗ FAILED`)
    continue
  }

  const outSize = fs.statSync(outPath).size
  totalIn += item.size
  totalOut += outSize
  console.log(`  ✓ ${fmtSize(item.size)} → ${fmtSize(outSize)} (${(item.size / outSize).toFixed(1)}× smaller)`)
}

console.log('\n═══════════════════════════════════════════════════════════════')
console.log(`Encoded: ${manifest.matched.length - skipped - failed}  Skipped: ${skipped}  Failed: ${failed}`)
console.log(`Total: ${fmtSize(totalIn)} → ${fmtSize(totalOut)} (${(totalIn / totalOut).toFixed(1)}× reduction)`)
console.log('═══════════════════════════════════════════════════════════════')

if (failures.length) {
  console.log('\nFailures:')
  for (const f of failures) {
    console.log(`  ${f.publicId}:`)
    console.log(`    ${f.stderr}`)
  }
  process.exit(1)
}
