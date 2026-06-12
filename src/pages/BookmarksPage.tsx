import { useAnnouncements } from '../hooks/useAnnouncements'
import { useBookmarks } from '../hooks/useBookmarks'
import { AnnouncementCard } from '../components/AnnouncementCard'
import styles from './BookmarksPage.module.css'

export function BookmarksPage() {
  const { status, announcements, error, retry } = useAnnouncements()
  const { ids } = useBookmarks()

  if (status === 'loading') {
    return (
      <>
        <h1 className={styles.heading}>Bookmarks</h1>
        <p className={styles.muted}>Loading…</p>
      </>
    )
  }

  if (status === 'error') {
    return (
      <>
        <h1 className={styles.heading}>Bookmarks</h1>
        <div role="alert" className={styles.error}>
          <p>{error?.message ?? 'Could not load announcements.'}</p>
          <button type="button" onClick={retry} className={styles.retry}>
            Retry
          </button>
        </div>
      </>
    )
  }

  const saved = announcements.filter((announcement) => ids.has(announcement.id))

  return (
    <>
      <h1 className={styles.heading}>Bookmarks</h1>
      {saved.length === 0 ? (
        <p className={styles.muted}>You have not saved any announcements yet.</p>
      ) : (
        <ul className={styles.list}>
          {saved.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </ul>
      )}
    </>
  )
}
