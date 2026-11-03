import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import ZodiacTabs from '@/components/zodiac/ZodiacTabs'
import { HumanDesignClient as HumanDesignView } from '@/components/astro/ClientViews'

export async function generateMetadata(props: PageProps<'/[lang]/zodiac/human-design'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: 'Human Design',
    description: lt
      ? 'Nemokama Human Design schema: tipas, strategija, autoritetas, profilis, centrai, kanalai, vartai ir inkarnacijos kryžius.'
      : 'Free Human Design chart: type, strategy, authority, profile, centers, channels, gates and incarnation cross.',
  }
}

export default async function HumanDesignPage(props: PageProps<'/[lang]/zodiac/human-design'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <ZodiacTabs lang={lang} active="hd" />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
          {lt ? 'Žmogaus dizainas' : 'The Science of Differentiation'}
        </p>
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          Human Design
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {lt
            ? 'Human Design (Žmogaus dizainas) jungia astrologiją, I Čing, Kabalos Gyvybės medį ir čakrų sistemą į vieną schemą — BodyGraph. Ji skaičiuojama iš dviejų momentų: gimimo (sąmoninga Asmenybė) ir maždaug 88 dienų iki gimimo (nesąmoningas Dizainas). Sužinokite savo tipą, strategiją ir vidinį autoritetą — praktinius įrankius sprendimams.'
            : 'Human Design synthesises astrology, the I Ching, the Kabbalah Tree of Life and the chakra system into one chart — the BodyGraph. It is calculated from two moments: birth (the conscious Personality) and about 88 days before birth (the unconscious Design). Discover your type, strategy and inner authority — practical tools for decision-making.'}
        </p>
      </header>
      <HumanDesignView lang={lang} />
      <section className="mt-4 p-6 rounded-xl" style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}>
          {lt
            ? 'Human Design — eksperimentinė savęs pažinimo sistema, o ne mokslas. Nebandykite ja patikėti — išbandykite strategiją ir autoritetą savo gyvenime ir stebėkite, kas iš tiesų veikia.'
            : 'Human Design is an experimental system of self-knowledge, not a science. Don’t believe it — experiment with your strategy and authority in your own life and notice what actually works.'}
        </p>
      </section>
    </div>
  )
}
