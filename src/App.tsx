import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FeedPage } from './pages/FeedPage'
import { DetailPage } from './pages/DetailPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/announcements" replace />} />
        <Route path="/announcements" element={<FeedPage />} />
        <Route path="/announcements/:id" element={<DetailPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
