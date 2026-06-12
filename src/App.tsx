import { AnnouncementsProvider } from './context/AnnouncementsProvider'
import { useAnnouncements } from './hooks/useAnnouncements'
import './App.css'

// Temporary screen that exercises the data layer end to end. The real routed
// pages (Feed, Detail, Bookmarks) replace this in a later step.
function AnnouncementsPreview() {
  const { status, announcements, error, retry } = useAnnouncements()

  if (status === 'loading') {
    return <p>Loading announcements…</p>
  }

  if (status === 'error') {
    return (
      <div role="alert">
        <p>{error?.message ?? 'Could not load announcements.'}</p>
        <button type="button" onClick={retry}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      <p>{announcements.length} announcements loaded.</p>
      <ul>
        {announcements.slice(0, 5).map((announcement) => (
          <li key={announcement.id}>
            {announcement.title} — {announcement.category}
            {announcement.isUrgent ? ' (urgent)' : ''}
          </li>
        ))}
      </ul>
    </>
  )
}

function App() {
  return (
    <AnnouncementsProvider>
      <main className="app">
        <h1>Government Announcements</h1>
        <AnnouncementsPreview />
      </main>
    </AnnouncementsProvider>
  )
}

export default App
