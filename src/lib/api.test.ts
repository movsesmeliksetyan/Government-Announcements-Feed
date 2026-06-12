import { describe, it, expect, vi, afterEach } from 'vitest'
import { fetchAnnouncements, fetchAnnouncement } from './api'

function stubFetch(handler: (url: string) => Response) {
  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => Promise.resolve(handler(String(input)))),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchAnnouncements', () => {
  it('maps the raw posts into announcements', async () => {
    stubFetch(
      () =>
        new Response(
          JSON.stringify([{ userId: 1, id: 1, title: 'a quiet road', body: 'x' }]),
          { status: 200 },
        ),
    )

    const result = await fetchAnnouncements()

    expect(result).toEqual([
      { id: 1, title: 'A Quiet Road', body: 'x', category: 'Transport', isUrgent: false },
    ])
  })

  it('throws when the response is not ok', async () => {
    stubFetch(() => new Response('boom', { status: 500 }))
    await expect(fetchAnnouncements()).rejects.toThrow(/status 500/)
  })
})

describe('fetchAnnouncement', () => {
  it('maps a single post', async () => {
    stubFetch(
      () =>
        new Response(JSON.stringify({ userId: 1, id: 7, title: 'qui est esse', body: 'b' }), {
          status: 200,
        }),
    )

    await expect(fetchAnnouncement(7)).resolves.toEqual({
      id: 7,
      title: 'Qui Est Esse',
      body: 'b',
      category: 'Infrastructure',
      isUrgent: true,
    })
  })

  it('gives a clear error on 404', async () => {
    stubFetch(() => new Response('', { status: 404 }))
    await expect(fetchAnnouncement(99999)).rejects.toThrow(/does not exist/)
  })
})
