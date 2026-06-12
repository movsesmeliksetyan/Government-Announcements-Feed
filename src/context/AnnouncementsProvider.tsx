import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchAnnouncements } from '../lib/api'
import type { Announcement } from '../types'
import { AnnouncementsContext, type LoadStatus } from './announcementsContext'

// Loads the full announcements list once and keeps it in memory so the Feed,
// Bookmarks and Detail pages can all read from the same cache. Detail uses
// getById to avoid a second request when arriving from the Feed; a direct
// deep link falls back to a single-post fetch (see useAnnouncementDetail).
export function AnnouncementsProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchAnnouncements(controller.signal)
      .then((data) => {
        setAnnouncements(data)
        setStatus('success')
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err : new Error('Something went wrong'))
        setStatus('error')
      })

    return () => controller.abort()
  }, [reloadToken])

  // Reset to loading here (an event handler) rather than in the effect, then
  // bump the token to re-run the fetch.
  const retry = useCallback(() => {
    setStatus('loading')
    setError(null)
    setReloadToken((token) => token + 1)
  }, [])

  const byId = useMemo(() => {
    const map = new Map<number, Announcement>()
    for (const announcement of announcements) {
      map.set(announcement.id, announcement)
    }
    return map
  }, [announcements])

  const getById = useCallback((id: number) => byId.get(id), [byId])

  const value = useMemo(
    () => ({ status, announcements, error, retry, getById }),
    [status, announcements, error, retry, getById],
  )

  return <AnnouncementsContext.Provider value={value}>{children}</AnnouncementsContext.Provider>
}
