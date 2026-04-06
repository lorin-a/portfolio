'use client'

import { usePathname } from 'next/navigation'
import { HeroIntroProvider } from '@/components/HeroIntroContext'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'

/**
 * Client shell for the portfolio layout.
 * Wraps Nav, main content, and Footer with the HeroIntroProvider
 * so Nav and Hero can coordinate the cinematic entrance.
 */
export default function PortfolioShell({ children }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <HeroIntroProvider isHomepage={isHomepage}>
      <Nav />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </HeroIntroProvider>
  )
}
