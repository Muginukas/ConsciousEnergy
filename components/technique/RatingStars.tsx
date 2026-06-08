'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { setRating } from '@/app/actions/community'
import { CategorySlug } from '@/lib/types'
import type { SupabaseClient } from '@supabase/supabase-js'

type Dict = {
  yourRating: string
  ratings: string
  noRatings: string
  error: string
}

type Aggregate = { avg: number; count: number }

const STAR_VALUES = [1, 2, 3, 4, 5]

async function fetchAggregate(
  supabase: SupabaseClient,
  category: CategorySlug,
  slug: string
): Promise<Aggregate> {
  const { data } = await supabase.from('ratings').select('stars').eq('category', category).eq('slug', slug)
  const stars = (data ?? []).map((row) => row.stars as number)
  return stars.length === 0
    ? { avg: 0, count: 0 }
    : { avg: stars.reduce((a, b) => a + b, 0) / stars.length, count: stars.length }
}

export default function RatingStars({
  category,
  slug,
  dict,
}: {
  category: CategorySlug
  slug: string
  dict: Dict
}) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined)
  const [userStars, setUserStars] = useState(0)
  const [hoverStars, setHoverStars] = useState(0)
  const [aggregate, setAggregate] = useState<Aggregate | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      const user = data.user
      setUserId(user?.id ?? null)
      if (!user) return

      supabase
        .from('ratings')
        .select('stars')
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('slug', slug)
        .maybeSingle()
        .then(({ data }) => setUserStars(data?.stars ?? 0))
    })

    fetchAggregate(supabase, category, slug).then(setAggregate)
  }, [category, slug])

  async function handleRate(stars: number) {
    if (pending || !userId) return
    setPending(true)
    setError(null)
    const previous = userStars
    setUserStars(stars)

    const supabase = createClient()
    const result = await setRating(category, slug, stars)
    if ('error' in result) {
      setUserStars(previous)
      setError(result.error)
    } else {
      setAggregate(await fetchAggregate(supabase, category, slug))
    }
    setPending(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {STAR_VALUES.map((i) => (
            <Star
              key={i}
              size={16}
              fill={aggregate && i <= Math.round(aggregate.avg) ? 'var(--color-gold-400)' : 'none'}
              style={{ color: 'var(--color-gold-600)' }}
            />
          ))}
        </div>
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
          {aggregate && aggregate.count > 0
            ? `${aggregate.avg.toFixed(1)} · ${aggregate.count} ${dict.ratings}`
            : dict.noRatings}
        </span>
      </div>

      {userId && (
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
            {dict.yourRating}
          </span>
          <div className="flex items-center gap-0.5" onMouseLeave={() => setHoverStars(0)}>
            {STAR_VALUES.map((i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHoverStars(i)}
                onClick={() => handleRate(i)}
                aria-label={`${i} / 5`}
                aria-pressed={userStars === i}
              >
                <Star
                  size={18}
                  fill={(hoverStars || userStars) >= i ? 'var(--color-gold-400)' : 'none'}
                  style={{ color: 'var(--color-gold-600)' }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <span className="text-xs" style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-ui)' }}>
          {dict.error} ({error})
        </span>
      )}
    </div>
  )
}
