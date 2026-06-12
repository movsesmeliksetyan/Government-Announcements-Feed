import { createContext } from 'react'
import type { Announcement } from '../types'

export type LoadStatus = 'loading' | 'success' | 'error'

export interface AnnouncementsContextValue {
  status: LoadStatus
  announcements: Announcement[]
  error: Error | null
  retry: () => void
  getById: (id: number) => Announcement | undefined
}

export const AnnouncementsContext = createContext<AnnouncementsContextValue | null>(null)
