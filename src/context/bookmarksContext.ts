import { createContext } from 'react'

export interface BookmarksContextValue {
  ids: ReadonlySet<number>
  isBookmarked: (id: number) => boolean
  toggle: (id: number) => void
  count: number
}

export const BookmarksContext = createContext<BookmarksContextValue | null>(null)
