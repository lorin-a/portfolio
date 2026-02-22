import '../globals.css'
import { Fraunces, Open_Sans } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Groundswell',
  description: 'A grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with UPMC Magee-Womens Hospital.',
  metadataBase: new URL('https://lorin.work'),
  openGraph: {
    title: 'Groundswell',
    description: 'A grant-funded ecosystem of emotional support for healthcare workers at UPMC Magee-Womens Hospital.',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function StandaloneLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
