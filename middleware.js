import { NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// TWO GATES, TWO REASONS. Both fail closed.
//
// 1. GROUNDSWELL PRIVACY GATE (2026-06-24) — a LEGAL hold.
//    The Groundswell case study (/projects/groundswell) and the standalone
//    stakeholder site (/groundswell) both reproduce Carolyn Gavin's "Blue
//    Garden" artwork. Per Schedule A, that artwork is licensed to Groundswell
//    for physical uses ONLY (mural, hangtags, Reflection Cards, flyers, the
//    grieving-pod wall) — "no other licensing usage is permitted." A public
//    website is not in scope, and altering the artwork (the watercolor
//    cinematic) is separately prohibited. Sealed until a compliant version
//    ships and/or portfolio permission is granted.
//    Password: GROUNDSWELL_GATE_PASSWORD
//
// 2. SITE HOLD (2026-08-27) — an EDITORIAL hold.
//    Only the homepage is ready to be seen. Everything else — the project
//    pages, the About route, the design system, and every draft case study —
//    is work in progress and is sealed until Lorin says otherwise. Nothing is
//    deleted: the full build is PRESERVED and reachable with the password, so
//    this is a curtain, not a demolition. Lift it by removing a path from
//    the gate, not by restoring files.
//    Password: SITE_HOLD_PASSWORD
//
// Default-deny on both: if the matching password env var is unset, the route
// is locked to everyone (including Lorin). To view a held route, set the var
// in .env.local (and in the Vercel project env) and sign in with any username
// plus that password.
// ─────────────────────────────────────────────────────────────────────────────

/** The only paths the public may reach. The homepage, and nothing else. */
const PUBLIC_PATHS = new Set(['/'])

/** Routes under the separate legal hold, which keeps its own password. */
const GROUNDSWELL_PREFIXES = ['/projects/groundswell', '/groundswell']

function hasPrefix(pathname, prefixes) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function unauthorized(realm) {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  })
}

/** Any username; only the password must match. */
function passwordFrom(request) {
  const header = request.headers.get('authorization') || ''
  const [scheme, encoded] = header.split(' ')
  if (scheme !== 'Basic' || !encoded) return null
  try {
    const decoded = atob(encoded)
    return decoded.slice(decoded.indexOf(':') + 1)
  } catch {
    return null
  }
}

function check(request, expected, realm) {
  // Fail closed: with no password configured, the route is locked to everyone.
  if (!expected) return unauthorized(realm)
  if (passwordFrom(request) !== expected) return unauthorized(realm)
  return NextResponse.next()
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next()

  if (hasPrefix(pathname, GROUNDSWELL_PREFIXES)) {
    return check(
      request,
      process.env.GROUNDSWELL_GATE_PASSWORD,
      'Groundswell archive'
    )
  }

  /* Realm is an HTTP header value: ASCII only, no smart punctuation. */
  return check(request, process.env.SITE_HOLD_PASSWORD, 'Portfolio in progress')
}

export const config = {
  matcher: [
    /* Everything except Next's own assets, the files in /public that the
       homepage needs, and the crawler files. Extensions are matched so any
       image, video, font or audio file served from /public stays reachable. */
    '/((?!_next/static|_next/image|robots\\.txt|sitemap\\.xml|favicon\\.ico|apple-touch-icon\\.png|images/|marks/|brand/|art/|video/|audio/|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|mp4|webm|mov|woff|woff2|ttf|otf|mp3|wav|ico)$).*)',
  ],
}
