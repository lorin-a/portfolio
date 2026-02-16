import './globals.css'
import { Newsreader, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
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
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
