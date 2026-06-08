'use server'

import { createClient } from '@/lib/supabase/server'
import { CategorySlug } from '@/lib/types'

export type Comment = {
  id: string
  user_id: string
  body: string
  status: string
  created_at: string
}

export async function postComment(
  category: CategorySlug,
  slug: string,
  body: string
): Promise<{ error: string } | { comment: Comment }> {
  const trimmed = body.trim()
  if (!trimmed) return { error: 'empty' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'not_signed_in' }

  const { data, error } = await supabase
    .from('comments')
    .insert({ user_id: user.id, category, slug, body: trimmed })
    .select('id, user_id, body, status, created_at')
    .single()

  if (error || !data) return { error: error?.message ?? 'failed' }
  return { comment: data as Comment }
}

export async function deleteComment(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'not_signed_in' }

  const { error } = await supabase.from('comments').delete().eq('id', id).eq('user_id', user.id)
  if (error) return { error: error.message }
  return { success: true as const }
}

export async function reportComment(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'not_signed_in' }

  const { error } = await supabase.rpc('report_comment', { comment_id: id })
  if (error) return { error: error.message }
  return { success: true as const }
}

export async function setRating(
  category: CategorySlug,
  slug: string,
  stars: number
): Promise<{ error: string } | { success: true }> {
  if (stars < 1 || stars > 5) return { error: 'invalid' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'not_signed_in' }

  const { error } = await supabase
    .from('ratings')
    .upsert({ user_id: user.id, category, slug, stars }, { onConflict: 'user_id,category,slug' })

  if (error) return { error: error.message }
  return { success: true as const }
}
