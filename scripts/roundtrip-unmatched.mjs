#!/usr/bin/env node
/**
 * Round-trip pass for Cloudinary video IDs that don't have local source files.
 * For each unmatched publicId:
 *   1. Download original from Cloudinary
 *   2. Encode locally with CRF 18, preset slow, 1080p cap
 *   3. Compare sizes; skip upload if encoded version isn't smaller
 *   4. Upload back to Cloudinary (overwrite same public_id)
 *
 * Reads:  ~/Desktop/cloudinary-compressed/_manifest.json (unmatched array)
 * Writes: ~/Desktop/cloudinary-roundtrip/<publicId>-original.<ext>
 *         ~/Desktop/cloudinary-roundtrip/<publicId>.mp4
 *
 * Idempotent: skips downloads/encodes that already exist on disk.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { pipeline } from 'node:stream/promises'
import { v2 as cloudinary } from 'cloudinary'

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing env vars in .env.local')
  process.exit(1)
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const COMPRESSED = '/Users/lorinanderberg/Desktop/cloudinary-compressed'
const WORK = '/Users/lorinanderberg/Desktop/cloudinary-roundtrip'
fs.mkdirSync(WORK, { recursive: true })

const manifest = JSON.parse(fs.readFileSync(path.join(COMPRESSED, '_manifest.json'), 'utf8'))
const unmatched = manifest.unmatched

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const skipUpload = args.has('--no-upload')

const fmtSize = b => (b / 1024 / 1024).toFixed(1) + ' MB'

async function downloadFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
  return buf.length
}

const stats = { downloaded: 0, encoded: 0, uploaded: 0, skippedSmaller: 0, failed: 0 }
const results = []

for (const [i, item] of unmatched.entries()) {
  const label = `[${i + 1}/${unmatched.length}] ${item.publicId}`

  try {
    // 1. Get asset metadata (for source URL + format)
    const meta = await cloudinary.api.resource(item.publicId, { resource_type: 'video' })
    const originalSize = meta.bytes
    const originalUrl = meta.secure_url // delivery URL with no transforms = original-ish
    const ext = meta.format || 'mp4'
    const origPath = path.join(WORK, `${item.publicId.replace(/\//g, '_')}-original.${ext}`)
    const outPath = path.join(WORK, `${item.publicId.replace(/\//g, '_')}.mp4`)

    console.log(`${label} (${fmtSize(originalSize)}, ${meta.width}x${meta.height})`)

    // 2. Download
    if (fs.existsSync(origPath) && fs.statSync(origPath).size === originalSize) {
      console.log(`  → already downloaded, skipping`)
    } else {
      process.stdout.write(`  → downloading...`)
      await downloadFile(originalUrl, origPath)
      process.stdout.write(` ✓\n`)
      stats.downloaded++
    }

    // 3. Encode (skip if already encoded)
    if (fs.existsSync(outPath)) {
      console.log(`  → already encoded (${fmtSize(fs.statSync(outPath).size)})`)
    } else {
      process.stdout.write(`  → encoding...`)
      const result = spawnSync('ffmpeg', [
        '-i', origPath,
        '-vf', "scale='min(1920,iw)':-2",
        '-c:v', 'libx264', '-crf', '18', '-preset', 'slow',
        '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '128k',
        '-y', outPath,
      ], { stdio: ['ignore', 'ignore', 'pipe'] })
      if (result.status !== 0) throw new Error(`ffmpeg failed: ${result.stderr?.toString().slice(-300)}`)
      process.stdout.write(` ✓\n`)
      stats.encoded++
    }

    const encodedSize = fs.statSync(outPath).size
    const ratio = originalSize / encodedSize
    console.log(`  ${fmtSize(originalSize)} → ${fmtSize(encodedSize)} (${ratio.toFixed(1)}×)`)

    // 4. Upload (skip if encoded is bigger)
    if (encodedSize >= originalSize) {
      console.log(`  ⚠ encoded is not smaller, skipping upload`)
      stats.skippedSmaller++
      results.push({ publicId: item.publicId, originalSize, encodedSize, action: 'skipped' })
      continue
    }

    if (skipUpload) {
      console.log(`  → would upload (--no-upload set)`)
      results.push({ publicId: item.publicId, originalSize, encodedSize, action: 'pending' })
      continue
    }

    if (dryRun) {
      console.log(`  → would upload (dry-run)`)
      results.push({ publicId: item.publicId, originalSize, encodedSize, action: 'dry-run' })
      continue
    }

    process.stdout.write(`  → uploading...`)
    await cloudinary.uploader.upload(outPath, {
      public_id: item.publicId,
      resource_type: 'video',
      overwrite: true,
      invalidate: true,
    })
    process.stdout.write(` ✓\n`)
    stats.uploaded++
    results.push({ publicId: item.publicId, originalSize, encodedSize, action: 'uploaded' })

  } catch (err) {
    const msg = err?.message || err?.error?.message || JSON.stringify(err)
    console.log(`  ✗ FAILED: ${msg}`)
    stats.failed++
    results.push({ publicId: item.publicId, error: msg, action: 'failed' })
  }
}

console.log('\n═══════════════════════════════════════════════════════════════')
console.log(`Downloaded: ${stats.downloaded}  Encoded: ${stats.encoded}  Uploaded: ${stats.uploaded}`)
console.log(`Skipped (not smaller): ${stats.skippedSmaller}  Failed: ${stats.failed}`)

const totalIn = results.filter(r => r.originalSize).reduce((s, r) => s + r.originalSize, 0)
const totalOut = results.filter(r => r.action === 'uploaded' || r.action === 'dry-run').reduce((s, r) => s + r.encodedSize, 0)
const savedFromSkipped = results.filter(r => r.action === 'skipped').reduce((s, r) => s + r.originalSize, 0)
console.log(`Reclaimable storage: ${fmtSize(totalIn - totalOut - savedFromSkipped)}`)
console.log('═══════════════════════════════════════════════════════════════')
