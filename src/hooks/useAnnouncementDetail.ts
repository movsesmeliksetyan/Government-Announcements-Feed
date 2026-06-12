import { useCallback, useEffect, useState } from 'react'
import { fetchAnnouncement } from '../lib/api'
import type { Announcement } from '../types'
import { useAnnouncements } from './useAnnouncements'

export type DetailState =
  | { status: 'loading'; announcement: null; error: null }
  | { status: 'success'; announcement: Announcement; error: null }
  | { status: 'error'; announcement: null; error: Error }

const loading: DetailState = { status: 'loading', announcement: null, error: null }

// Resolves a single announcement for the Detail page. If it is already in the
// shared cache (the user came from the Feed) it is returned immediately with no
// network call. On a direct deep link the cache is empty, so we fetch just that
// one post. An invalid id is reported without hitting the network.
//
// The cached/invalid outcomes are derived during render; only the network fetch
// lives in an effect, so we never call setState synchronously from the effect.
export function useAnnouncementDetail(id: number) {
  const { getById } = useAnnouncements()
  const cached = Number.isInteger(id) ? getById(id) : undefined
  const isValidId = Number.isInteger(id) && id > 0
  const needsFetch = !cached && isValidId

  const [reloadToken, setReloadToken] = useState(0)
  // The fetch result is tagged with the request it belongs to, so a result from
  // a previous id (or a previous retry) is ignored rather than shown stale.
  const requestKey = `${id}:${reloadToken}`
  const [fetched, setFetched] = useState<{ key: string; state: DetailState } | null>(null)

  useEffect(() => {
    if (!needsFetch) return

    const controller = new AbortController()
    fetchAnnouncement(id, controller.signal)
      .then((announcement) => {
        setFetched({ key: requestKey, state: { status: 'success', announcement, error: null } })
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setFetched({
          key: requestKey,
          state: {
            status: 'error',
            announcement: null,
            error: err instanceof Error ? err : new Error('Something went wrong'),
          },
        })
      })

    return () => controller.abort()
  }, [id, needsFetch, requestKey])

  const retry = useCallback(() => setReloadToken((token) => token + 1), [])

  let state: DetailState
  if (cached) {
    state = { status: 'success', announcement: cached, error: null }
  } else if (!isValidId) {
    state = { status: 'error', announcement: null, error: new Error('That announcement id is not valid') }
  } else if (fetched?.key === requestKey) {
    state = fetched.state
  } else {
    state = loading
  }

  return { ...state, retry }
}
