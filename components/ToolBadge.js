import styles from './ToolBadge.module.css'

/**
 * ToolBadge - Displays a single tool/skill as a subtle pill
 * 
 * @param {string} name - Tool name to display
 */
export function ToolBadge({ name }) {
  return (
    <span className={styles.badge}>
      {name}
    </span>
  )
}

/**
 * ToolList - Displays a row of tool badges
 * 
 * @param {string[]} tools - Array of tool names
 * @param {string} label - Optional label before the tools (e.g., "Built with")
 */
export default function ToolList({ tools, label }) {
  if (!tools || tools.length === 0) return null
  
  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.list}>
        {tools.map((tool) => (
          <ToolBadge key={tool} name={tool} />
        ))}
      </div>
    </div>
  )
}
