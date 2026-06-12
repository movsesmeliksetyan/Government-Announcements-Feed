export const BOOKMARKS_KEY = 'announcements:bookmarks'

// Accessing window.localStorage can itself throw (e.g. Safari private mode, or
// when storage is disabled by policy), so even the lookup is guarded.
function getStorage(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

// Always returns a clean array of integer ids. Anything unexpected in storage
// (missing, not JSON, not an array, non-integer entries) is treated as "no
// bookmarks" rather than crashing the app.
export function loadBookmarks(): number[] {
  const storage = getStorage()
  if (!storage) return []

  try {
    const raw = storage.getItem(BOOKMARKS_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (value): value is number => typeof value === 'number' && Number.isInteger(value),
    )
  } catch {
    return []
  }
}

export function saveBookmarks(ids: number[]): void {
  const storage = getStorage()
  if (!storage) return

  try {
    storage.setItem(BOOKMARKS_KEY, JSON.stringify(ids))
  } catch {
    // Quota exceeded or storage blocked: keep the in-memory state and carry on.
  }
}
