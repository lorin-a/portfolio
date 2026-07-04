import '../globals.css'
import { Fraunces, Open_Sans } from 'next/font/google'

/* The deck is its own root layout (multiple-root-layouts pattern): no Nav,
   no Footer, no Lenis. A full-screen, keyboard-advanced surface — the site's
   type and tokens, nothing else. It carries the same two faces the case
   studies use so the frames read as native site DNA. */

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Deck frames — draft',
  description: 'Register-frame preview for the case-study deck system.',
  robots: { index: false, follow: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAFAFA',
}

export default function DeckLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
