'use server'

import { createClient } from '@/lib/supabase/server'
import { CategorySlug } from '@/lib/types'

export async function toggleFavorite(category: CategorySlug, slug: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'not_signed_in' as const }

  const { data: existing } = await supabase
    .from('favorites')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('category', category)
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('category', category)
      .eq('slug', slug)
    return { favorited: false }
  }

  await supabase.from('favorites').insert({ user_id: user.id, category, slug })
  return { favorited: true }
}

export async function getFavoriteStatus(category: CategorySlug, slug: string): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('favorites')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('category', category)
    .eq('slug', slug)
    .maybeSingle()

  return !!data
}

export async function getFavorites(): Promise<{ category: CategorySlug; slug: string }[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('favorites')
    .select('category, slug')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (data ?? []) as { category: CategorySlug; slug: string }[]
}
