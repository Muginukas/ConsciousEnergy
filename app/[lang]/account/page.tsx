import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { Heart, NotebookPen, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account',
}

export const dynamic = 'force-dynamic'

export default async function AccountPage(props: PageProps<'/[lang]/account'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${lang}/auth/login`)

  const dict = await getDictionary(lang as Locale)
  const t = dict.auth.account

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {t.title}
      </h1>

      <div
        className="rounded-2xl p-6 mb-6"
        style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
      >
        <p
          className="text-sm mb-1"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
        >
          {t.signedInAs}
        </p>
        <p
          className="text-lg font-medium"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
        >
          {user.email}
        </p>

        <form action={signOut} className="mt-6">
          <input type="hidden" name="lang" value={lang} />
          <button
            type="submit"
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={{
              border: '1px solid var(--color-earth-200)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {t.signOut}
          </button>
        </form>
      </div>

      <Link
        href={`/${lang}/account/favorites`}
        className="flex items-center justify-between rounded-2xl p-6 mb-3 transition-colors hover:bg-[--color-earth-50]"
        style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
      >
        <span className="flex items-center gap-3">
          <Heart size={18} style={{ color: 'var(--color-forest-700)' }} />
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}
          >
            {t.links.favorites}
          </span>
        </span>
        <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} />
      </Link>

      <Link
        href={`/${lang}/account/journal`}
        className="flex items-center justify-between rounded-2xl p-6 mb-6 transition-colors hover:bg-[--color-earth-50]"
        style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
      >
        <span className="flex items-center gap-3">
          <NotebookPen size={18} style={{ color: 'var(--color-forest-700)' }} />
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}
          >
            {t.links.journal}
          </span>
        </span>
        <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} />
      </Link>

      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-forest-900)', fontFamily: 'var(--font-body)' }}
        >
          {t.comingSoon}
        </p>
      </div>
    </div>
  )
}
