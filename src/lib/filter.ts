import type { Announcement, CategoryFilter } from '../types'

// Filters by title substring (case-insensitive) and category at the same time.
// An empty query matches everything; the "All" category matches everything.
export function filterAnnouncements(
  announcements: Announcement[],
  query: string,
  category: CategoryFilter,
): Announcement[] {
  const needle = query.trim().toLowerCase()

  return announcements.filter((announcement) => {
    const matchesCategory = category === 'All' || announcement.category === category
    const matchesQuery = needle === '' || announcement.title.toLowerCase().includes(needle)
    return matchesCategory && matchesQuery
  })
}
