import { useAnnouncements } from '../hooks/useAnnouncements'
import { useBookmarks } from '../hooks/useBookmarks'
import { AnnouncementCard } from '../components/AnnouncementCard'
import { CardSkeletonList } from '../components/Skeleton'
import { ErrorState } from '../components/ErrorState'
import styles from './BookmarksPage.module.css'

export function BookmarksPage() {
  const { status, announcements, error, retry } = useAnnouncements()
  const { ids } = useBookmarks()

  if (status === 'loading') {
    return (
      <>
        <h1 className={styles.heading}>Bookmarks</h1>
        <p className={styles.srOnly} role="status">
          Loading…
        </p>
        <CardSkeletonList count={3} />
      </>
    )
  }

  if (status === 'error') {
    return (
      <>
        <h1 className={styles.heading}>Bookmarks</h1>
        <ErrorState message={error?.message ?? 'Could not load announcements.'} onRetry={retry} />
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
