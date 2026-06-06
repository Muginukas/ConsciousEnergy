import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getAllTechniques, getFeaturedTechniques } from '@/lib/content'
import { CATEGORY_SLUGS } from '@/lib/categories'
import { CategorySlug, Locale } from '@/lib/types'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import PhilosophySection from '@/components/home/PhilosophySection'
import TechniqueCard from '@/components/technique/TechniqueCard'
import Link from 'next/link'

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const all = getAllTechniques(locale)
  const featured = getFeaturedTechniques(locale)

  const counts = Object.fromEntries(
    CATEGORY_SLUGS.map((slug) => [slug, all.filter((t) => t.category === slug).length])
  ) as Record<CategorySlug, number>

  return (
    <>
      <HeroSection lang={lang} dict={dict} />
      <CategoryGrid lang={lang} dict={dict} counts={counts} />

      {/* Featured Techniques */}
      {featured.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-earth-50)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-4xl font-semibold mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {dict.home.featured.title}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                {dict.home.featured.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.slice(0, 6).map((t) => (
                <TechniqueCard key={`${t.category}-${t.slug}`} technique={t} lang={lang} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={`/${lang}/techniques`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-forest-700)',
                  color: '#fff',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                {dict.home.hero.cta} →
              </Link>
            </div>
          </div>
        </section>
      )}

      <PhilosophySection dict={dict} />
    </>
  )
}
