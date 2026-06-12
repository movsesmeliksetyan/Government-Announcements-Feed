import type { Announcement, RawPost } from '../types'
import { mapPostToAnnouncement } from './announcements'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchAnnouncements(signal?: AbortSignal): Promise<Announcement[]> {
  const response = await fetch(`${BASE_URL}/posts`, { signal })
  if (!response.ok) {
    throw new Error(`Could not load announcements (status ${response.status})`)
  }
  const posts = (await response.json()) as RawPost[]
  return posts.map(mapPostToAnnouncement)
}

export async function fetchAnnouncement(id: number, signal?: AbortSignal): Promise<Announcement> {
  const response = await fetch(`${BASE_URL}/posts/${id}`, { signal })
  if (response.status === 404) {
    throw new Error(`Announcement #${id} does not exist`)
  }
  if (!response.ok) {
    throw new Error(`Could not load announcement #${id} (status ${response.status})`)
  }
  const post = (await response.json()) as RawPost
  return mapPostToAnnouncement(post)
}
