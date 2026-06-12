import { NavLink, Outlet } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks'
import styles from './Layout.module.css'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
}

export function Layout() {
  const { count } = useBookmarks()

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/announcements" className={styles.brand}>
            Government Announcements
          </NavLink>
          <div className={styles.links}>
            <NavLink to="/announcements" className={navLinkClass}>
              Feed
            </NavLink>
            <NavLink to="/bookmarks" className={navLinkClass}>
              Bookmarks
              <span className={styles.count} aria-label={`${count} saved`}>
                {count}
              </span>
            </NavLink>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
