import { Link, useLocation, useParams } from 'react-router-dom'
import { useAnnouncementDetail } from '../hooks/useAnnouncementDetail'
import { CategoryBadge, UrgentBadge } from '../components/Badges'
import styles from './DetailPage.module.css'

export function DetailPage() {
  const { id } = useParams()
  const location = useLocation()
  // Set by the card the user clicked; absent on a direct deep link, in which
  // case Back simply goes to the Feed.
  const backTo = (location.state as { from?: string } | null)?.from ?? '/announcements'

  const { status, announcement, error, retry } = useAnnouncementDetail(Number(id))

  return (
    <>
      <Link to={backTo} className={styles.back}>
        ← Back
      </Link>

      {status === 'loading' && <p className={styles.muted}>Loading announcement…</p>}

      {status === 'error' && (
        <div role="alert" className={styles.error}>
          <p>{error.message}</p>
          <button type="button" onClick={retry} className={styles.retry}>
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <article className={styles.article}>
          <div className={styles.badges}>
            <CategoryBadge category={announcement.category} />
            {announcement.isUrgent && <UrgentBadge />}
          </div>
          <h1 className={styles.title}>{announcement.title}</h1>
          <p className={styles.body}>{announcement.body}</p>
        </article>
      )}
    </>
  )
}
