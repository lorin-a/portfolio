/* Deck copy is plain strings so it can be edited in fields (and, later, in
   place). Emphasis is a light convention: *wrapped in asterisks* renders as the
   accent italic <em>. A string round-trips cleanly through a text input; JSX
   would not. Non-string values pass through untouched (belt-and-suspenders). */
export function renderText(value) {
  if (typeof value !== 'string') return value
  const parts = value.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) =>
    part.length > 1 && part.startsWith('*') && part.endsWith('*')
      ? <em key={i}>{part.slice(1, -1)}</em>
      : part
  )
}
