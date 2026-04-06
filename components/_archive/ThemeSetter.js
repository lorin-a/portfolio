'use client'

import { useEffect } from 'react'

/**
 * Sets data-theme attribute on <html> for scoped dark theme.
 * Cleans up on unmount so other pages stay light.
 */
export default function ThemeSetter({ theme = 'dark' }) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [theme])

  return null
}
