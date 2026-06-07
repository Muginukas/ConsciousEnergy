import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale, CategorySlug } from '@/lib/types'
import { createClient } from '@/lib/supabase/server'
import { getFavorites } from '@/app/actions/favorites'
import { getTechniqueBySlug } from '@/lib/content'
import TechniqueCard from '@/components/technique/TechniqueCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorites',
}

export const dynamic = 'force-dynamic'

export default async function FavoritesPage(props: PageProps<'/[lang]/account/favorites'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${lang}/auth/login`)

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const t = dict.favorites.page

  const favorites = await getFavorites()
  const techniques = favorites
    .map(({ category, slug }) => getTechniqueBySlug(category as CategorySlug, slug, locale))
    .filter((technique) => technique !== null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
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

      {techniques.length === 0 ? (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
        >
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((technique) => (
            <TechniqueCard key={`${technique.category}-${technique.slug}`} technique={technique} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}
