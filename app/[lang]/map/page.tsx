import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getTechniqueBySlug } from '@/lib/content'
import { CATEGORIES } from '@/lib/categories'
import { VIBRATION_TIERS } from '@/lib/vibration'
import { Locale } from '@/lib/types'
import VibrationMapScene from '@/components/map/VibrationMapScene'
import UnifiedScale from '@/components/map/UnifiedScale'
import ModelTabs from '@/components/map/ModelTabs'
import SelfAssessment, { Recommendation } from '@/components/map/SelfAssessment'

export async function generateMetadata(props: PageProps<'/[lang]/map'>): Promise<Metadata> {
  const { lang } = await props.params
  const isLt = lang === 'lt'
  return {
    title: isLt ? 'Vibracijų žemėlapis' : 'Vibration Map',
    description: isLt
      ? 'Suvienytas sąmonės ir energijos žemėlapis, apjungiantis Hawkins skalę, Solfeggio dažnius ir čakrų sistemą — su savęs vertinimu.'
      : 'A unified map of consciousness and energy weaving Hawkins’ scale, the Solfeggio frequencies, and the chakra system — with a self-assessment.',
  }
}

/**
 * Resolve each tier's recommended practices to concrete links. Where a tier
 * names specific technique slugs we link straight to them; otherwise we fall
 * back to the tier's practice category landing page.
 */
function buildRecommendations(locale: Locale): Record<string, Recommendation[]> {
  const out: Record<string, Recommendation[]> = {}

  for (const tier of VIBRATION_TIERS) {
    const recs: Recommendation[] = []

    for (const slug of tier.practiceSlugs) {
      const tech = getTechniqueBySlug(tier.practiceCategory, slug, locale)
      if (tech) {
        recs.push({
          href: `/${locale}/techniques/${tier.practiceCategory}/${slug}`,
          title: tech.title,
        })
      }
    }

    if (recs.length === 0) {
      const cat = CATEGORIES.find((c) => c.slug === tier.practiceCategory)
      if (cat) {
        recs.push({
          href: `/${locale}/techniques/${cat.slug}`,
          title: locale === 'lt' ? cat.labelLt : cat.label,
        })
      }
    }

    out[tier.id] = recs
  }

  return out
}

export default async function MapPage(props: PageProps<'/[lang]/map'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const m = dict.map
  const recommendations = buildRecommendations(locale)

  return (
    <>
      <VibrationMapScene lang={lang} dict={m} recommendations={recommendations} />

      <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 max-w-3xl">
        <p
          className="mb-2 text-sm font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}
        >
          {m.eyebrow}
        </p>
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {m.title}
        </h1>
        <p
          className="text-lg leading-relaxed"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {m.intro}
        </p>
      </header>

      <UnifiedScale lang={lang} dict={m} />

      <ModelTabs lang={lang} dict={m} />

      <SelfAssessment lang={lang} recommendations={recommendations} dict={m} />

      <section
        className="p-6 rounded-xl"
        style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}
      >
        <h2
          className="text-xl font-semibold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-earth-700)' }}
        >
          ⚠ {m.disclaimer.title}
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}
        >
          {m.disclaimer.text}
        </p>
      </section>
      </div>
    </>
  )
}
