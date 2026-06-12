import { useContext } from 'react'
import { AnnouncementsContext } from '../context/announcementsContext'

export function useAnnouncements() {
  const context = useContext(AnnouncementsContext)
  if (!context) {
    throw new Error('useAnnouncements must be used inside an AnnouncementsProvider')
  }
  return context
}
