import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'
import { signIn } from '@/app/actions/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
}

const inputStyle = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
}

export default async function LoginPage(props: PageProps<'/[lang]/auth/login'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const { error } = await props.searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect(`/${lang}/account`)

  const dict = await getDictionary(lang as Locale)
  const t = dict.auth.login
  const errorKey = Array.isArray(error) ? error[0] : error

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {t.title}
      </h1>
      <p
        className="mb-8 leading-relaxed"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {t.subtitle}
      </p>

      {errorKey && (
        <p
          className="mb-6 text-sm rounded-lg px-4 py-3"
          style={{
            backgroundColor: 'var(--color-gold-50)',
            border: '1px solid var(--color-gold-200)',
            color: 'var(--color-earth-700)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {t.errors[errorKey as keyof typeof t.errors] ?? t.errors.invalid_credentials}
        </p>
      )}

      <form action={signIn} className="flex flex-col gap-4">
        <input type="hidden" name="lang" value={lang} />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
          >
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg px-4 py-2.5 text-sm focus:outline-none"
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
          >
            {t.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="rounded-lg px-4 py-2.5 text-sm focus:outline-none"
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          className="mt-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-forest-700)',
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {t.submit}
        </button>
      </form>

      <p
        className="mt-6 text-sm"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
      >
        {t.noAccount}{' '}
        <Link
          href={`/${lang}/auth/sign-up`}
          className="font-medium hover:underline"
          style={{ color: 'var(--color-forest-700)' }}
        >
          {t.signUpLink}
        </Link>
      </p>
    </div>
  )
}
