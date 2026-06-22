'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const lang = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] ?? 'en'
    : 'en'

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1
        className="text-4xl font-semibold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        Something went wrong
      </h1>
      <p
        className="mb-8 text-sm"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: 'var(--color-forest-700)',
            color: '#fff',
            fontFamily: 'var(--font-ui)',
          }}
        >
          Try again
        </button>
        <Link
          href={`/${lang}`}
          className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
          style={{
            border: '1px solid var(--color-earth-200)',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
