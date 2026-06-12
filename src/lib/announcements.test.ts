import { describe, it, expect } from 'vitest'
import {
  toTitleCase,
  deriveCategory,
  deriveIsUrgent,
  mapPostToAnnouncement,
} from './announcements'

describe('toTitleCase', () => {
  it('capitalizes the first letter of each word', () => {
    expect(toTitleCase('sunt aut facere')).toBe('Sunt Aut Facere')
  })

  it('leaves the rest of each word untouched', () => {
    expect(toTitleCase('iPhone and macOS')).toBe('IPhone And MacOS')
  })

  it('collapses surrounding whitespace and keeps inner spacing', () => {
    expect(toTitleCase('  hello   world  ')).toBe('Hello   World')
  })

  it('handles a single word', () => {
    expect(toTitleCase('announcement')).toBe('Announcement')
  })

  it('returns an empty string for empty or whitespace-only input', () => {
    expect(toTitleCase('')).toBe('')
    expect(toTitleCase('   ')).toBe('')
  })

  it('does not choke on leading digits or punctuation', () => {
    expect(toTitleCase('3 new rules')).toBe('3 New Rules')
    expect(toTitleCase('"quoted" word')).toBe('"quoted" Word')
  })
})

describe('deriveCategory', () => {
  it('maps each remainder to its category', () => {
    expect(deriveCategory(4)).toBe('Health') // 4 % 4 === 0
    expect(deriveCategory(1)).toBe('Transport') // 1 % 4 === 1
    expect(deriveCategory(2)).toBe('Education') // 2 % 4 === 2
    expect(deriveCategory(3)).toBe('Infrastructure') // 3 % 4 === 3
  })

  it('treats negative ids as "anything else"', () => {
    expect(deriveCategory(-2)).toBe('Infrastructure')
    expect(deriveCategory(-1)).toBe('Infrastructure')
  })
})

describe('deriveIsUrgent', () => {
  it('is urgent only for multiples of 7', () => {
    expect(deriveIsUrgent(7)).toBe(true)
    expect(deriveIsUrgent(14)).toBe(true)
    expect(deriveIsUrgent(98)).toBe(true)
    expect(deriveIsUrgent(1)).toBe(false)
    expect(deriveIsUrgent(8)).toBe(false)
  })
})

describe('mapPostToAnnouncement', () => {
  it('maps a raw post into an announcement', () => {
    const post = {
      userId: 1,
      id: 7,
      title: 'qui est esse',
      body: 'est rerum tempore',
    }

    expect(mapPostToAnnouncement(post)).toEqual({
      id: 7,
      title: 'Qui Est Esse',
      body: 'est rerum tempore',
      category: 'Infrastructure', // 7 % 4 === 3
      isUrgent: true, // 7 % 7 === 0
    })
  })
})
