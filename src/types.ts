// Shape returned by jsonplaceholder.typicode.com/posts
export interface RawPost {
  userId: number
  id: number
  title: string
  body: string
}

export const CATEGORIES = ['Health', 'Transport', 'Education', 'Infrastructure'] as const

export type Category = (typeof CATEGORIES)[number]

// Filter accepts the four real categories plus "All"
export type CategoryFilter = 'All' | Category

export interface Announcement {
  id: number
  title: string
  body: string
  category: Category
  isUrgent: boolean
}
