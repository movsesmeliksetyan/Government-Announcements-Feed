import type { Announcement, Category, RawPost } from '../types'

// Capitalize the first letter of every whitespace-delimited word.
// The rest of each word is left untouched (the API titles are lowercase,
// and the spec only asks for the first letter), and surrounding whitespace
// is trimmed so titles render cleanly as headings.
export function toTitleCase(value: string): string {
  return value
    .trim()
    .replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
}

// Derived straight from the spec's id % 4 table. We deliberately use the raw
// JS remainder (not a normalized one): for negative ids JS yields -1/-2/-3,
// which all fall through to "anything else" -> Infrastructure, matching the
// spec's wording rather than silently bucketing them elsewhere.
export function deriveCategory(id: number): Category {
  switch (id % 4) {
    case 0:
      return 'Health'
    case 1:
      return 'Transport'
    case 2:
      return 'Education'
    default:
      return 'Infrastructure'
  }
}

export function deriveIsUrgent(id: number): boolean {
  return id % 7 === 0
}

export function mapPostToAnnouncement(post: RawPost): Announcement {
  return {
    id: post.id,
    title: toTitleCase(post.title),
    body: post.body,
    category: deriveCategory(post.id),
    isUrgent: deriveIsUrgent(post.id),
  }
}
