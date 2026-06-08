import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getTechniquesByCategory } from '@/lib/content'
import { CATEGORY_MAP, CATEGORY_SLUGS } from '@/lib/categories'
import { CategorySlug, Locale } from '@/lib/types'
import TechniqueCard from '@/components/technique/TechniqueCard'
import Link from 'next/link'
import { ChevronRight, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return CATEGORY_SLUGS.flatMap((category) =>
    ['en', 'lt'].map((lang) => ({ lang, category }))
  )
}

export async function generateMetadata(
  props: PageProps<'/[lang]/techniques/[category]'>
): Promise<Metadata> {
  const { category } = await props.params
  const cat = CATEGORY_MAP[category as CategorySlug]
  if (!cat) return {}
  return {
    title: cat.label,
    description: cat.description,
  }
}

export default async function CategoryPage(
  props: PageProps<'/[lang]/techniques/[category]'>
) {
  const { lang, category } = await props.params
  if (!hasLocale(lang)) notFound()

  const cat = CATEGORY_MAP[category as CategorySlug]
  if (!cat) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const techniques = getTechniquesByCategory(category as CategorySlug, locale)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
        <Link href={`/${lang}`} className="hover:underline">{dict.nav.home}</Link>
        <ChevronRight size={14} />
        <Link href={`/${lang}/techniques`} className="hover:underline">{dict.nav.techniques}</Link>
        <ChevronRight size={14} />
        <span style={{ color: cat.color }}>{cat.label}</span>
      </nav>

      {/* Category header */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
          style={{ backgroundColor: `${cat.color}18`, color: cat.color, fontFamily: 'var(--font-ui)' }}
        >
          {techniques.length} techniques
        </div>
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {cat.label}
        </h1>
        <p
          className="text-lg max-w-2xl leading-relaxed"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {cat.description}
        </p>

        {/* Category intro/onboarding block */}
        {cat.intro && (
          <div
            className="mt-6 max-w-3xl p-5 rounded-xl flex gap-4"
            style={{
              backgroundColor: `${cat.color}0d`,
              border: `1px solid ${cat.color}30`,
            }}
          >
            <Lightbulb
              size={20}
              className="flex-shrink-0 mt-0.5"
              style={{ color: cat.color }}
            />
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
              dangerouslySetInnerHTML={{
                __html: cat.intro.replace(
                  /\*\*(.+?)\*\*/g,
                  `<strong style="color:var(--color-text-primary)">$1</strong>`
                ),
              }}
            />
          </div>
        )}
      </div>

      {/* Technique grid */}
      {techniques.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>No techniques yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techniques.map((t) => (
            <TechniqueCard key={t.slug} technique={t} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}
