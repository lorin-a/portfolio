import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Ovo&display=swap" 
          rel="stylesheet" 
        />
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
