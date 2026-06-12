import { useBookmarks } from '../hooks/useBookmarks'
import styles from './BookmarkButton.module.css'

export function BookmarkButton({ id }: { id: number }) {
  const { isBookmarked, toggle } = useBookmarks()
  const bookmarked = isBookmarked(id)

  return (
    <button
      type="button"
      className={bookmarked ? `${styles.button} ${styles.active}` : styles.button}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      onClick={() => toggle(id)}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
          fill={bookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      <span>{bookmarked ? 'Saved' : 'Save'}</span>
    </button>
  )
}
