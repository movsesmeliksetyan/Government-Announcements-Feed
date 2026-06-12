import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { loadBookmarks, saveBookmarks, BOOKMARKS_KEY } from './bookmarksStorage'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('loadBookmarks', () => {
  it('returns an empty array when nothing is stored', () => {
    expect(loadBookmarks()).toEqual([])
  })

  it('round-trips saved ids', () => {
    saveBookmarks([3, 1, 2])
    expect(loadBookmarks()).toEqual([3, 1, 2])
  })

  it('ignores corrupted JSON', () => {
    localStorage.setItem(BOOKMARKS_KEY, 'not json{')
    expect(loadBookmarks()).toEqual([])
  })

  it('ignores a value that is not an array', () => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify({ id: 1 }))
    expect(loadBookmarks()).toEqual([])
  })

  it('drops non-integer entries', () => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([1, 'a', 2.5, 3, null]))
    expect(loadBookmarks()).toEqual([1, 3])
  })
})

describe('saveBookmarks', () => {
  it('does not throw when storage rejects the write', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    expect(() => saveBookmarks([1, 2])).not.toThrow()
  })
})
