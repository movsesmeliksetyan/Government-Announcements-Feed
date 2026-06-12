import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BOOKMARKS_KEY, loadBookmarks, saveBookmarks } from '../lib/bookmarksStorage'
import { BookmarksContext } from './bookmarksContext'

export function BookmarksProvider({ children }: { children: ReactNode }) {
  // Lazily seed from storage so the first render already has the saved ids and
  // we never need a setState-in-effect to hydrate.
  const [ids, setIds] = useState<Set<number>>(() => new Set(loadBookmarks()))

  // Persist whenever the set changes. Updaters stay pure (important under
  // StrictMode); the write happens here instead.
  useEffect(() => {
    saveBookmarks([...ids])
  }, [ids])

  // Keep other open tabs in sync. A storage event only fires in *other* tabs,
  // so reacting to it here can't loop back on our own writes.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== BOOKMARKS_KEY && event.key !== null) return
      setIds(new Set(loadBookmarks()))
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const isBookmarked = useCallback((id: number) => ids.has(id), [ids])

  const value = useMemo(
    () => ({ ids, isBookmarked, toggle, count: ids.size }),
    [ids, isBookmarked, toggle],
  )

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
}
