'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function getLang(formData: FormData): string {
  const lang = formData.get('lang')
  return lang === 'lt' ? 'lt' : 'en'
}

export async function signIn(formData: FormData) {
  const lang = getLang(formData)
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/${lang}/auth/login?error=invalid_credentials`)
  }

  redirect(`/${lang}/account`)
}

export async function signUp(formData: FormData) {
  const lang = getLang(formData)
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const origin = String(formData.get('origin') ?? '')

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback?next=/${lang}/account` },
  })

  if (error) {
    const reason = error.message.toLowerCase().includes('already registered')
      ? 'already_registered'
      : 'signup_failed'
    redirect(`/${lang}/auth/sign-up?error=${reason}`)
  }

  redirect(`/${lang}/auth/sign-up?success=check_email`)
}

export async function signOut(formData: FormData) {
  const lang = getLang(formData)
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect(`/${lang}`)
}
