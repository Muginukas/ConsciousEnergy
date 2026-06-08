'use server'

import { createClient } from '@/lib/supabase/server'
import { CategorySlug } from '@/lib/types'

export type PracticeLog = {
  id: string
  category: CategorySlug
  slug: string
  practiced_at: string
  duration_minutes: number | null
  notes: string | null
  mood: string | null
}

export async function logPractice(
  category: CategorySlug,
  slug: string,
  entry: { duration_minutes?: number; mood?: string; notes?: string }
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'not_signed_in' as const }

  const { error } = await supabase.from('practice_logs').insert({
    user_id: user.id,
    category,
    slug,
    duration_minutes: entry.duration_minutes ?? null,
    mood: entry.mood ?? null,
    notes: entry.notes ?? null,
  })

  if (error) return { error: 'failed' as const }
  return { success: true as const }
}

export async function getPracticeHistory(): Promise<PracticeLog[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('practice_logs')
    .select('id, category, slug, practiced_at, duration_minutes, notes, mood')
    .eq('user_id', user.id)
    .order('practiced_at', { ascending: false })

  return (data ?? []) as PracticeLog[]
}
