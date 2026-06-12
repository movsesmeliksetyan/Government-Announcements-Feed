import styles from './Skeleton.module.css'

export function Skeleton({
  width,
  height,
  radius,
}: {
  width?: string
  height?: string
  radius?: string
}) {
  return (
    <span
      className={styles.skeleton}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}

// Placeholder list shown while announcements load. Marked aria-hidden; pages
// pair it with a visually-hidden live status so screen readers hear "Loading".
export function CardSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <ul className={styles.list} aria-hidden="true">
      {Array.from({ length: count }, (_unused, index) => (
        <li key={index} className={styles.card}>
          <Skeleton width="70%" height="1.1rem" />
          <Skeleton width="5rem" height="1.5rem" radius="999px" />
        </li>
      ))}
    </ul>
  )
}

export function DetailSkeleton() {
  return (
    <div aria-hidden="true" className={styles.detail}>
      <Skeleton width="6rem" height="1.5rem" radius="999px" />
      <Skeleton width="60%" height="2rem" />
      <Skeleton width="100%" height="1rem" />
      <Skeleton width="95%" height="1rem" />
      <Skeleton width="80%" height="1rem" />
    </div>
  )
}
