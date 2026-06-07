'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toggleFavorite } from '@/app/actions/favorites'
import { CategorySlug } from '@/lib/types'

type Dict = { add: string; remove: string }

export default function FavoriteButton({
  category,
  slug,
  dict,
}: {
  category: CategorySlug
  slug: string
  dict: Dict
}) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null)
  const [favorited, setFavorited] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      const user = data.user
      setSignedIn(!!user)
      if (!user) return

      supabase
        .from('favorites')
        .select('user_id')
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('slug', slug)
        .maybeSingle()
        .then(({ data }) => setFavorited(!!data))
    })
  }, [category, slug])

  if (!signedIn) return null

  async function handleClick() {
    if (pending) return
    setPending(true)
    const previous = favorited
    setFavorited(!previous)

    const result = await toggleFavorite(category, slug)
    setFavorited('error' in result ? previous : result.favorited)
    setPending(false)
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={favorited}
      aria-label={favorited ? dict.remove : dict.add}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors"
      style={{
        backgroundColor: favorited ? 'var(--color-forest-50)' : 'var(--color-cream)',
        border: `1px solid ${favorited ? 'var(--color-forest-200)' : 'var(--color-earth-200)'}`,
        color: favorited ? 'var(--color-forest-700)' : 'var(--color-text-secondary)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <Heart size={14} fill={favorited ? 'var(--color-forest-700)' : 'none'} />
      {favorited ? dict.remove : dict.add}
    </button>
  )
}
