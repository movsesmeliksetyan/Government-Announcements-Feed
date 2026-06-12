import styles from './ErrorState.module.css'

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className={styles.box}>
      <p className={styles.message}>{message}</p>
      <button type="button" onClick={onRetry} className={styles.retry}>
        Retry
      </button>
    </div>
  )
}
