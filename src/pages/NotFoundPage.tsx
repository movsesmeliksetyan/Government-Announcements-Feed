import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        That page does not exist. <Link to="/announcements">Go to the feed</Link>.
      </p>
    </>
  )
}
