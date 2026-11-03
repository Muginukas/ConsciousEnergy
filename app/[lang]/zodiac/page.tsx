import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale } from '@/lib/types'
import { ELEMENTS, ELEMENT_MAP, MODALITIES, ZODIAC_SIGNS, formatRange } from '@/lib/zodiac'
import SignFinder from '@/components/zodiac/SignFinder'
import CompatibilityChecker from '@/components/zodiac/CompatibilityChecker'

export async function generateMetadata(props: PageProps<'/[lang]/zodiac'>): Promise<Metadata> {
  const { lang } = await props.params
  const isLt = lang === 'lt'
  return {
    title: isLt ? 'Zodiakas' : 'Zodiac',
    description: isLt
      ? 'Visi 12 zodiako ženklų: savybės, elementai, suderinamumas, kristalai ir praktikos. Sužinokite savo ženklą pagal gimimo datą.'
      : 'All 12 zodiac signs: traits, elements, compatibility, crystals and practices. Find your sign by date of birth.',
  }
}

export default async function ZodiacPage(props: PageProps<'/[lang]/zodiac'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const z = dict.zodiac

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 max-w-3xl">
        <p
          className="mb-2 text-sm font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}
        >
          {z.eyebrow}
        </p>
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {z.title}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {z.intro}
        </p>
      </header>

      <SignFinder lang={lang} dict={z} />

      {/* Twelve signs */}
      <section className="mb-16">
        <h2
          className="text-3xl font-semibold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {z.signsHeading}
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {z.signsCaption}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ZODIAC_SIGNS.map((s) => {
            const el = ELEMENT_MAP[s.element]
            return (
              <Link
                key={s.slug}
                href={`/${lang}/zodiac/${s.slug}`}
                className="group rounded-xl p-4 transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl" style={{ color: el.color }} aria-hidden="true">
                    {s.symbol}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: `${el.color}14`, color: el.color, fontFamily: 'var(--font-ui)' }}
                  >
                    {el.name[locale]}
                  </span>
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {s.name[locale]}
                </h3>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                  {formatRange(s, locale)}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {s.archetype[locale]}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Elements */}
      <section className="mb-16">
        <h2
          className="text-3xl font-semibold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {z.elementsHeading}
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {z.elementsCaption}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {ELEMENTS.map((e) => (
            <div
              key={e.id}
              className="rounded-xl p-5"
              style={{ backgroundColor: 'var(--color-cream)', borderLeft: `4px solid ${e.color}`, boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-2xl font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: e.color }}>
                {e.name[locale]}
              </h3>
              <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                {e.quality[locale]}
              </p>
              <p className="text-sm mb-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                {e.description[locale]}
              </p>
              <p className="text-sm italic" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                {e.balance[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modalities */}
      <section className="mb-16">
        <h2
          className="text-3xl font-semibold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {z.modalitiesHeading}
        </h2>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {z.modalitiesCaption}
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {MODALITIES.map((m) => (
            <div
              key={m.id}
              className="rounded-xl p-5"
              style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest-700)' }}>
                {m.name[locale]}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                {m.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CompatibilityChecker lang={lang} dict={z} />

      <section className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}>
        <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-earth-700)' }}>
          ✦ {z.disclaimer.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}>
          {z.disclaimer.text}
        </p>
      </section>
    </div>
  )
}
