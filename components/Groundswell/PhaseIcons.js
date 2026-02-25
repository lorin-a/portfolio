// ─── Phase Icons (shared by GroundswellCaseStudy + ProjectSidebar) ───

export function SenseIcon() {
  const dots = [[8,8],[16,6],[24,8],[6,16],[14,14],[22,15],[10,22],[18,24],[26,22]]
  return (
    <svg width={24} height={24} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.2} style={{ fill: 'var(--color-sage)' }} opacity={0.6 + (i % 3) * 0.12} />
      ))}
    </svg>
  )
}

export function WeaveIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 16C10 8,14 8,16 16S22 24,28 16" stroke="var(--color-plum)" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <path d="M4 20C10 12,14 12,16 20S22 28,28 20" stroke="var(--color-plum)" strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.4} />
    </svg>
  )
}

export function ShapeIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {[0, 45, 90, 135].map((a, i) => (
        <ellipse key={i} cx={16} cy={16} rx={3.5} ry={9} style={{ fill: 'var(--color-terracotta)' }} opacity={0.5} transform={`rotate(${a} 16 16)`} />
      ))}
      <circle cx={16} cy={16} r={2.8} style={{ fill: 'var(--color-terracotta)' }} />
    </svg>
  )
}
