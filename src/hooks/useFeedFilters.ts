import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, type CategoryFilter } from '../types'

function parseCategory(value: string | null): CategoryFilter {
  if (value && (CATEGORIES as readonly string[]).includes(value)) {
    return value as CategoryFilter
  }
  return 'All'
}

// Search and category live in the URL query string (?q=&category=) so the Feed
// state survives refreshes, deep links and the Detail page's Back button, and
// is shareable. Updates use replace so typing doesn't flood the history stack.
export function useFeedFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const category = parseCategory(searchParams.get('category'))

  const update = useCallback(
    (next: { q?: string; category?: CategoryFilter }) => {
      setSearchParams(
        (params) => {
          if (next.q !== undefined) {
            if (next.q) params.set('q', next.q)
            else params.delete('q')
          }
          if (next.category !== undefined) {
            if (next.category !== 'All') params.set('category', next.category)
            else params.delete('category')
          }
          return params
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const setQuery = useCallback((q: string) => update({ q }), [update])
  const setCategory = useCallback((c: CategoryFilter) => update({ category: c }), [update])

  return { query, category, setQuery, setCategory }
}
