import { describe, it, expect } from 'vitest'
import { filterAnnouncements } from './filter'
import type { Announcement } from '../types'

const items: Announcement[] = [
  { id: 1, title: 'New Bus Routes', body: '', category: 'Transport', isUrgent: false },
  { id: 2, title: 'School Closures', body: '', category: 'Education', isUrgent: false },
  { id: 3, title: 'Bus Lane Works', body: '', category: 'Infrastructure', isUrgent: true },
  { id: 4, title: 'Flu Clinic Opens', body: '', category: 'Health', isUrgent: false },
]

describe('filterAnnouncements', () => {
  it('returns everything for an empty query and All category', () => {
    expect(filterAnnouncements(items, '', 'All')).toHaveLength(4)
  })

  it('filters by title, case-insensitively', () => {
    const result = filterAnnouncements(items, 'bus', 'All')
    expect(result.map((a) => a.id)).toEqual([1, 3])
  })

  it('ignores surrounding whitespace in the query', () => {
    expect(filterAnnouncements(items, '  school  ', 'All')).toHaveLength(1)
  })

  it('filters by category', () => {
    const result = filterAnnouncements(items, '', 'Health')
    expect(result.map((a) => a.id)).toEqual([4])
  })

  it('applies query and category together', () => {
    // "bus" matches ids 1 and 3, but only id 3 is Infrastructure
    const result = filterAnnouncements(items, 'bus', 'Infrastructure')
    expect(result.map((a) => a.id)).toEqual([3])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterAnnouncements(items, 'zzz', 'All')).toEqual([])
  })
})
