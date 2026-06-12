import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookmarksProvider } from './BookmarksProvider'
import { BookmarkButton } from '../components/BookmarkButton'
import { loadBookmarks, BOOKMARKS_KEY } from '../lib/bookmarksStorage'

beforeEach(() => {
  localStorage.clear()
})

function renderButton(id: number) {
  return render(
    <BookmarksProvider>
      <BookmarkButton id={id} />
    </BookmarksProvider>,
  )
}

describe('bookmarks', () => {
  it('toggles and persists to localStorage', async () => {
    const user = userEvent.setup()
    renderButton(5)

    const add = screen.getByRole('button', { name: 'Add bookmark' })
    expect(add).toHaveAttribute('aria-pressed', 'false')

    await user.click(add)

    const remove = screen.getByRole('button', { name: 'Remove bookmark' })
    expect(remove).toHaveAttribute('aria-pressed', 'true')
    expect(loadBookmarks()).toEqual([5])

    await user.click(remove)
    expect(loadBookmarks()).toEqual([])
  })

  it('hydrates initial state from storage', () => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([9]))
    renderButton(9)

    expect(screen.getByRole('button', { name: 'Remove bookmark' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
