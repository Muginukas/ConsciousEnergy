import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import ZodiacTabs from '@/components/zodiac/ZodiacTabs'
import { NatalChartClient as NatalChartView } from '@/components/astro/ClientViews'

export async function generateMetadata(props: PageProps<'/[lang]/zodiac/natal-chart'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Gimimo horoskopas' : 'Natal Chart',
    description: lt
      ? 'Nemokamas tikslus gimimo horoskopas: planetos ženkluose ir namuose, Ascendentas, aspektai, elementai ir išsamios interpretacijos.'
      : 'Free accurate natal chart: planets in signs and houses, Ascendant, aspects, elements and in-depth interpretations.',
  }
}

export default async function NatalChartPage(props: PageProps<'/[lang]/zodiac/natal-chart'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <ZodiacTabs lang={lang} active="natal" />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
          {lt ? 'Astrologija' : 'Astrology'}
        </p>
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {lt ? 'Gimimo horoskopas' : 'Natal Chart'}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {lt
            ? 'Gimimo horoskopas — dangaus nuotrauka jūsų gimimo akimirką. Saulės ženklas tėra pradžia: Mėnulis, Ascendentas, kiekviena planeta, jos ženklas ir namai bei aspektai tarp jų kartu sudaro unikalų jūsų sielos žemėlapį. Planetų padėtys skaičiuojamos astronomiškai tiksliai.'
            : 'A natal chart is a snapshot of the sky at the moment you were born. Your Sun sign is only the beginning: the Moon, the Ascendant, every planet with its sign and house, and the aspects between them form a unique map of your soul. Planetary positions are calculated with astronomical precision.'}
        </p>
      </header>
      <NatalChartView lang={lang} />
    </div>
  )
}
