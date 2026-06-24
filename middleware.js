import { NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// Groundswell privacy gate (2026-06-24)
//
// The Groundswell case study (/projects/groundswell) and the standalone
// stakeholder site (/groundswell) both reproduce Carolyn Gavin's "Blue Garden"
// artwork. Per Schedule A, that artwork is licensed to Groundswell for physical
// uses ONLY (mural, hangtags, Reflection Cards, flyers, the grieving-pod wall) —
// "no other licensing usage is permitted." A public website is not in scope, and
// altering the artwork (the watercolor cinematic) is separately prohibited.
//
// Until a compliant version ships and/or portfolio permission is granted, these
// routes are sealed behind HTTP Basic auth so the full build is PRESERVED as a
// private archive but cannot be reached by the public.
//
// Default-deny: if GROUNDSWELL_GATE_PASSWORD is unset, every request is locked
// out (fail closed). To view the archive, set GROUNDSWELL_GATE_PASSWORD in
// .env.local (and in Vercel project env) and sign in with any username + that
// password.
// ─────────────────────────────────────────────────────────────────────────────

const GATED_PREFIXES = ['/projects/groundswell', '/groundswell']

function isGated(pathname) {
  return GATED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function unauthorized() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Groundswell archive", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  })
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  if (!isGated(pathname)) return NextResponse.next()

  const expected = process.env.GROUNDSWELL_GATE_PASSWORD
  // Fail closed: with no password configured, the archive is locked to everyone.
  if (!expected) return unauthorized()

  const header = request.headers.get('authorization') || ''
  const [scheme, encoded] = header.split(' ')
  if (scheme !== 'Basic' || !encoded) return unauthorized()

  let decoded = ''
  try {
    decoded = atob(encoded)
  } catch {
    return unauthorized()
  }
  // Username is ignored; only the password must match.
  const password = decoded.slice(decoded.indexOf(':') + 1)
  if (password !== expected) return unauthorized()

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/projects/groundswell',
    '/projects/groundswell/:path*',
    '/groundswell',
    '/groundswell/:path*',
  ],
}
