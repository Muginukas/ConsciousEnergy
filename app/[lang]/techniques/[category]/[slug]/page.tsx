import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getTechniqueBySlug, getAllSlugs, getTechniquesByCategory } from '@/lib/content'
import { CATEGORY_MAP, CATEGORY_SLUGS } from '@/lib/categories'
import { CategorySlug, Locale } from '@/lib/types'
import TechniqueCard from '@/components/technique/TechniqueCard'
import Link from 'next/link'
import { ChevronRight, Clock, Flame, BookOpen } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.flatMap(({ category, slug }) =>
    ['en', 'lt'].map((lang) => ({ lang, category, slug }))
  )
}

export async function generateMetadata(
  props: PageProps<'/[lang]/techniques/[category]/[slug]'>
): Promise<Metadata> {
  const { lang, category, slug } = await props.params
  const locale = hasLocale(lang) ? (lang as Locale) : 'en'
  const technique = getTechniqueBySlug(category as CategorySlug, slug, locale)
  if (!technique) return {}
  return {
    title: technique.title,
    description: technique.overview,
  }
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: '#16a34a',
  intermediate: '#d97706',
  advanced: '#dc2626',
}

export default async function TechniquePage(
  props: PageProps<'/[lang]/techniques/[category]/[slug]'>
) {
  const { lang, category, slug } = await props.params
  if (!hasLocale(lang)) notFound()

  const cat = CATEGORY_MAP[category as CategorySlug]
  if (!cat) notFound()

  const locale = lang as Locale
  const technique = getTechniqueBySlug(category as CategorySlug, slug, locale)
  if (!technique) notFound()

  const dict = await getDictionary(locale)
  const related = getTechniquesByCategory(category as CategorySlug, locale)
    .filter((t) => t.slug !== slug)
    .slice(0, 3)

  const t = dict.techniques

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
        <Link href={`/${lang}`} className="hover:underline">{dict.nav.home}</Link>
        <ChevronRight size={14} />
        <Link href={`/${lang}/techniques`} className="hover:underline">{dict.nav.techniques}</Link>
        <ChevronRight size={14} />
        <Link href={`/${lang}/techniques/${category}`} className="hover:underline">{cat.label}</Link>
        <ChevronRight size={14} />
        <span style={{ color: cat.color }}>{technique.title}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* Main content */}
        <article className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ backgroundColor: `${cat.color}18`, color: cat.color, fontFamily: 'var(--font-ui)' }}
            >
              {cat.label}
            </span>

            <h1
              className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {technique.title}
            </h1>

            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              {technique.overview}
            </p>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-3">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', fontFamily: 'var(--font-ui)' }}
              >
                <Clock size={14} style={{ color: 'var(--color-text-muted)' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>{technique.duration}</span>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', fontFamily: 'var(--font-ui)' }}
              >
                <Flame size={14} style={{ color: DIFFICULTY_COLOR[technique.difficulty] }} />
                <span style={{ color: DIFFICULTY_COLOR[technique.difficulty], fontWeight: 500 }}>
                  {t.filter[technique.difficulty as 'beginner' | 'intermediate' | 'advanced']}
                </span>
              </div>
              {technique.tradition && (
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                  style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', fontFamily: 'var(--font-ui)' }}
                >
                  <BookOpen size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <span style={{ color: 'var(--color-text-secondary)' }}>{technique.tradition}</span>
                </div>
              )}
            </div>
          </div>

          {/* Benefits */}
          {technique.benefits.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {t.benefits}
              </h2>
              <ul className="space-y-2">
                {technique.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* MDX Content (steps, tips, etc.) */}
          {technique.content && (
            <div className="prose mb-8">
              <MDXRemote source={technique.content} />
            </div>
          )}

          {/* Contraindications */}
          {technique.contraindications.length > 0 && (
            <section
              className="mb-8 p-5 rounded-xl"
              style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}
            >
              <h2
                className="text-lg font-semibold mb-3 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', color: '#991b1b' }}
              >
                ⚠ {t.contraindications}
              </h2>
              <ul className="space-y-1.5">
                {technique.contraindications.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm"
                    style={{ color: '#7f1d1d', fontFamily: 'var(--font-body)' }}
                  >
                    • {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Science note */}
          {technique.science && (
            <section className="mb-8 p-5 rounded-xl" style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}>
              <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-earth-700)' }}>
                🔬 {t.science}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}>
                {technique.science}
              </p>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="mt-10 lg:mt-0 space-y-8">
          {/* Tips */}
          {technique.tips && technique.tips.length > 0 && (
            <div className="p-5 rounded-xl" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {t.tips}
              </h3>
              <ul className="space-y-2">
                {technique.tips.map((tip, i) => (
                  <li key={i} className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                    ✦ {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related techniques */}
          {related.length > 0 && (
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {t.related}
              </h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <TechniqueCard key={r.slug} technique={r} lang={lang} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
