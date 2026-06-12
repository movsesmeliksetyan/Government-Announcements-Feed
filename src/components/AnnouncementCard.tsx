import { Link, useLocation } from 'react-router-dom'
import type { Announcement } from '../types'
import { CategoryBadge, UrgentBadge } from './Badges'
import { BookmarkButton } from './BookmarkButton'
import styles from './AnnouncementCard.module.css'

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const location = useLocation()
  // Remember where we came from (path + filters) so Detail's Back button can
  // return here with the search and category still applied.
  const from = location.pathname + location.search

  return (
    <li className={styles.card}>
      <Link to={`/announcements/${announcement.id}`} state={{ from }} className={styles.link}>
        <h2 className={styles.title}>{announcement.title}</h2>
      </Link>
      <div className={styles.meta}>
        <div className={styles.badges}>
          <CategoryBadge category={announcement.category} />
          {announcement.isUrgent && <UrgentBadge />}
        </div>
        <BookmarkButton id={announcement.id} />
      </div>
    </li>
  )
}
