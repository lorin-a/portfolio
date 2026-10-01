'use client'

import { useEffect } from 'react'

/* The sheet lives on the dark homepage; the shell clears the theme on every
   other route, after child effects run, so this sets it a tick later. */
export default function DarkTheme() {
  useEffect(() => {
    const id = setTimeout(() => { document.documentElement.dataset.theme = 'dark' }, 0)
    return () => clearTimeout(id)
  }, [])
  return null
}
