import type { Category } from '../types'
import styles from './Badges.module.css'

const categoryClass: Record<Category, string> = {
  Health: styles.health ?? '',
  Transport: styles.transport ?? '',
  Education: styles.education ?? '',
  Infrastructure: styles.infrastructure ?? '',
}

export function CategoryBadge({ category }: { category: Category }) {
  return <span className={`${styles.badge} ${categoryClass[category]}`}>{category}</span>
}

export function UrgentBadge() {
  return (
    <span className={`${styles.badge} ${styles.urgent}`}>
      <span aria-hidden="true">●</span> Urgent
    </span>
  )
}
