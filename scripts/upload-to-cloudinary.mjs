#!/usr/bin/env node
/**
 * Uploads every compressed video to Cloudinary, replacing the existing asset
 * at the same public_id. Site code unchanged after this runs.
 *
 * Reads:  ~/Desktop/cloudinary-compressed/_manifest.json
 *         ~/Desktop/cloudinary-compressed/<publicId>.mp4 (output of encode-videos.mjs)
 *         .env.local (CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME)
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs --dry-run   # show plan, don't upload
 *   node scripts/upload-to-cloudinary.mjs             # upload for real
 *   node scripts/upload-to-cloudinary.mjs --only=BTG-Clip-2   # one file
 */
import fs from 'node:fs'
import path from 'node:path'
import { v2 as cloudinary } from 'cloudinary'

// Load .env.local manually (no dotenv dep required)
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing env vars. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env.local')
  process.exit(1)
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const OUTPUT = '/Users/lorinanderberg/Desktop/cloudinary-compressed'
const manifest = JSON.parse(fs.readFileSync(path.join(OUTPUT, '_manifest.json'), 'utf8'))

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const onlyArg = process.argv.find(a => a.startsWith('--only='))
const only = onlyArg ? onlyArg.split('=')[1] : null

const fmtSize = b => (b / 1024 / 1024).toFixed(1) + ' MB'

const targets = manifest.matched
  .filter(item => !only || item.publicId === only)
  .map(item => ({ ...item, compressed: path.join(OUTPUT, `${item.publicId}.mp4`) }))
  .filter(item => fs.existsSync(item.compressed))

if (!targets.length) {
  console.error('No compressed files found. Run scripts/encode-videos.mjs first.')
  process.exit(1)
}

console.log(`Plan: ${dryRun ? 'DRY RUN — ' : ''}upload ${targets.length} file(s) to Cloudinary`)
console.log(`Cloud: ${CLOUDINARY_CLOUD_NAME}\n`)

let ok = 0, failed = 0
for (const [i, item] of targets.entries()) {
  const size = fs.statSync(item.compressed).size
  const label = `[${i + 1}/${targets.length}] ${item.publicId} (${fmtSize(size)})`

  if (dryRun) {
    console.log(`${label} — would upload ${item.compressed}`)
    continue
  }

  process.stdout.write(`${label} — uploading...`)
  try {
    await cloudinary.uploader.upload(item.compressed, {
      public_id: item.publicId,
      resource_type: 'video',
      overwrite: true,
      invalidate: true,
    })
    process.stdout.write(' ✓\n')
    ok++
  } catch (err) {
    process.stdout.write(' ✗\n')
    console.error(`  Error: ${err.message || err}`)
    failed++
  }
}

if (!dryRun) {
  console.log(`\nDone. Uploaded ${ok}, failed ${failed}.`)
  if (failed) process.exit(1)
}
