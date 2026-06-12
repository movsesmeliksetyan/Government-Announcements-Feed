import { useAnnouncements } from '../hooks/useAnnouncements'
import { useFeedFilters } from '../hooks/useFeedFilters'
import { filterAnnouncements } from '../lib/filter'
import { CATEGORIES, type CategoryFilter } from '../types'
import { AnnouncementCard } from '../components/AnnouncementCard'
import styles from './FeedPage.module.css'

const FILTER_OPTIONS: CategoryFilter[] = ['All', ...CATEGORIES]

export function FeedPage() {
  const { status, announcements, error, retry } = useAnnouncements()
  const { query, category, setQuery, setCategory } = useFeedFilters()

  if (status === 'loading') {
    return (
      <>
        <h1 className={styles.heading}>Announcements</h1>
        <p className={styles.muted}>Loading announcements…</p>
      </>
    )
  }

  if (status === 'error') {
    return (
      <>
        <h1 className={styles.heading}>Announcements</h1>
        <div role="alert" className={styles.error}>
          <p>{error?.message ?? 'Could not load announcements.'}</p>
          <button type="button" onClick={retry} className={styles.retry}>
            Retry
          </button>
        </div>
      </>
    )
  }

  const visible = filterAnnouncements(announcements, query, category)

  return (
    <>
      <h1 className={styles.heading}>Announcements</h1>

      <div className={styles.controls}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search by title…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search announcements by title"
        />
        <label className={styles.categoryLabel}>
          <span className={styles.srOnly}>Filter by category</span>
          <select
            className={styles.select}
            value={category}
            onChange={(event) => setCategory(event.target.value as CategoryFilter)}
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className={styles.muted}>
          {announcements.length === 0
            ? 'There are no announcements right now.'
            : 'No announcements match your search.'}
        </p>
      ) : (
        <ul className={styles.list}>
          {visible.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </ul>
      )}
    </>
  )
}
