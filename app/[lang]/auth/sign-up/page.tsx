import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'
import { signUp } from '@/app/actions/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up',
}

const inputStyle = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
}

export default async function SignUpPage(props: PageProps<'/[lang]/auth/sign-up'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const { error, success } = await props.searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect(`/${lang}/account`)

  const dict = await getDictionary(lang as Locale)
  const t = dict.auth.signUp
  const errorKey = Array.isArray(error) ? error[0] : error
  const successKey = Array.isArray(success) ? success[0] : success

  const headerList = await headers()
  const host = headerList.get('host')
  const protocol = headerList.get('x-forwarded-proto') ?? 'https'
  const origin = `${protocol}://${host}`

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
          {t.errors[errorKey as keyof typeof t.errors] ?? t.errors.signup_failed}
        </p>
      )}

      {successKey && (
        <p
          className="mb-6 text-sm rounded-lg px-4 py-3"
          style={{
            backgroundColor: 'var(--color-forest-50)',
            border: '1px solid var(--color-forest-200)',
            color: 'var(--color-forest-900)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {t.success[successKey as keyof typeof t.success] ?? t.success.check_email}
        </p>
      )}

      {!successKey && (
        <form action={signUp} className="flex flex-col gap-4">
          <input type="hidden" name="lang" value={lang} />
          <input type="hidden" name="origin" value={origin} />
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
              minLength={6}
              className="rounded-lg px-4 py-2.5 text-sm focus:outline-none"
              style={inputStyle}
            />
            <span
              className="text-xs"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
            >
              {t.passwordHint}
            </span>
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
      )}

      <p
        className="mt-6 text-sm"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
      >
        {t.haveAccount}{' '}
        <Link
          href={`/${lang}/auth/login`}
          className="font-medium hover:underline"
          style={{ color: 'var(--color-forest-700)' }}
        >
          {t.signInLink}
        </Link>
      </p>
    </div>
  )
}
