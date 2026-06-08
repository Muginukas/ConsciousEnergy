import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale, CategorySlug } from '@/lib/types'
import { CATEGORY_MAP } from '@/lib/categories'
import { createClient } from '@/lib/supabase/server'
import { getPracticeHistory } from '@/app/actions/practice'
import { getTechniqueBySlug } from '@/lib/content'
import { Flame, NotebookPen } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice journal',
}

export const dynamic = 'force-dynamic'

const cardStyle = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
}

function computeStreak(timestamps: string[]): number {
  const days = new Set(timestamps.map((ts) => new Date(ts).toISOString().slice(0, 10)))
  if (days.size === 0) return 0

  const oneDay = 24 * 60 * 60 * 1000
  let cursor = new Date()
  cursor.setUTCHours(0, 0, 0, 0)

  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor = new Date(cursor.getTime() - oneDay)
  }

  let streak = 0
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor = new Date(cursor.getTime() - oneDay)
  }
  return streak
}

export default async function JournalPage(props: PageProps<'/[lang]/account/journal'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${lang}/auth/login`)

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const t = dict.journal.page
  const moods = dict.journal.modal.moods

  const history = await getPracticeHistory()
  const streak = computeStreak(history.map((entry) => entry.practiced_at))
  const dateFormatter = new Intl.DateTimeFormat(locale === 'lt' ? 'lt-LT' : 'en-US', {
    dateStyle: 'medium',
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {t.title}
      </h1>
      <p
        className="mb-10 leading-relaxed"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {t.subtitle}
      </p>

      {history.length === 0 ? (
        <div className="rounded-2xl p-8 text-center" style={cardStyle}>
          <NotebookPen size={28} className="mx-auto mb-4" style={{ color: 'var(--color-forest-700)' }} />
          <p
            className="mb-6 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            {t.empty}
          </p>
          <Link
            href={`/${lang}/techniques`}
            className="inline-block rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-forest-700)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {t.browse}
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="rounded-2xl p-5" style={cardStyle}>
              <p
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {history.length}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                {t.stats.totalSessions}
              </p>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }}
            >
              <p
                className="text-3xl font-bold mb-1 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest-700)' }}
              >
                <Flame size={24} />
                {streak}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-forest-900)', fontFamily: 'var(--font-ui)' }}>
                {t.stats.currentStreak} · {t.stats.days}
              </p>
            </div>
          </div>

          {/* History */}
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {t.history}
          </h2>
          <div className="space-y-4">
            {history.map((entry) => {
              const technique = getTechniqueBySlug(entry.category, entry.slug, locale)
              const cat = CATEGORY_MAP[entry.category as CategorySlug]
              return (
                <div key={entry.id} className="rounded-xl p-4" style={cardStyle}>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <Link
                      href={`/${lang}/techniques/${entry.category}/${entry.slug}`}
                      className="text-sm font-medium hover:underline"
                      style={{ color: cat?.color ?? 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}
                    >
                      {technique?.title ?? entry.slug}
                    </Link>
                    <span
                      className="text-xs whitespace-nowrap"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                    >
                      {dateFormatter.format(new Date(entry.practiced_at))}
                    </span>
                  </div>

                  {(entry.duration_minutes || entry.mood) && (
                    <div
                      className="flex flex-wrap gap-3 text-xs mb-1.5"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                    >
                      {entry.duration_minutes && (
                        <span>
                          {entry.duration_minutes} {t.minutes}
                        </span>
                      )}
                      {entry.mood && (
                        <span>{moods[entry.mood as keyof typeof moods] ?? entry.mood}</span>
                      )}
                    </div>
                  )}

                  {entry.notes && (
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                    >
                      {entry.notes}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
