import '../globals.css'
import { Fraunces, Open_Sans, Crimson_Pro } from 'next/font/google'
import PortfolioShell from './PortfolioShell'

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

/* Used by the Whelm case study editorial register. Italics carry the
   manifesto/sub voice; weights kept light for editorial register. */
const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
  display: 'swap',
})

export const metadata = {
  title: 'Lorin Anderberg | Design Researcher',
  description: 'I uncover human stories and insights that transform how people navigate healthcare, education, and complex systems.',
  metadataBase: new URL('https://lorin.work'),
  openGraph: {
    title: 'Lorin Anderberg | Design Researcher',
    description: 'I uncover human stories and insights that transform how people navigate healthcare, education, and complex systems.',
    url: 'https://lorin.work',
    siteName: 'Lorin Anderberg',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${openSans.variable} ${crimsonPro.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (window.location.pathname === '/') {
              document.documentElement.dataset.theme = 'dark';
            }
          } catch(e) {}
          if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
          window.scrollTo(0, 0);
        `}} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PortfolioShell>
          {children}
        </PortfolioShell>
      </body>
    </html>
  )
}
