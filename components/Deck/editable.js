/* Helpers for the cockpit editor: discover a beat's editable text fields, and
   set a value at a dotted path immutably. Text is plain strings (see text.jsx),
   so every field round-trips through an input. */

const TOP = [
  ['eyebrow', 'label'],
  ['headline', 'headline'],
  ['caption', 'caption'],
  ['chip', 'chip'],
  ['quote', 'quote'],
  ['attribution', 'attribution'],
  ['gateLabel', 'group label'],
]

export function editableFields(content) {
  const out = []
  for (const [key, label] of TOP) {
    if (typeof content[key] === 'string') {
      out.push({ path: key, label, value: content[key], multiline: key === 'headline' || key === 'quote' })
    }
  }
  if (content.turn && typeof content.turn.label === 'string') {
    out.push({ path: 'turn.label', label: 'turn label', value: content.turn.label })
  }
  if (content.dest) {
    if (typeof content.dest.label === 'string') out.push({ path: 'dest.label', label: 'destination', value: content.dest.label })
    if (typeof content.dest.sub === 'string') out.push({ path: 'dest.sub', label: 'destination note', value: content.dest.sub, multiline: true })
  }
  ;(content.items || []).forEach((it, i) => {
    if (typeof it.label === 'string') out.push({ path: `items.${i}.label`, label: `item ${i + 1} label`, value: it.label })
    if (typeof it.text === 'string') out.push({ path: `items.${i}.text`, label: `item ${i + 1}`, value: it.text })
  })
  ;(content.annotations || []).forEach((a, i) => {
    if (typeof a.label === 'string') out.push({ path: `annotations.${i}.label`, label: `note ${i + 1} label`, value: a.label })
    if (typeof a.text === 'string') out.push({ path: `annotations.${i}.text`, label: `note ${i + 1}`, value: a.text, multiline: true })
  })
  return out
}

export function setByPath(obj, path, value) {
  const keys = path.split('.')
  const clone = Array.isArray(obj) ? [...obj] : { ...obj }
  let cur = clone
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    const next = cur[k]
    cur[k] = Array.isArray(next) ? [...next] : { ...next }
    cur = cur[k]
  }
  cur[keys[keys.length - 1]] = value
  return clone
}
