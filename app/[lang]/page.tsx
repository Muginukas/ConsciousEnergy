import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getAllTechniques, getFeaturedTechniques } from '@/lib/content'
import { CATEGORIES, CATEGORY_SLUGS } from '@/lib/categories'
import { CategorySlug, Locale } from '@/lib/types'
import { VIBRATION_TIERS } from '@/lib/vibration'
import { ZODIAC_SIGNS } from '@/lib/zodiac'
import { FOODS } from '@/lib/food-db'
import { MENU, SEASONS } from '@/lib/food-menu'
import { SYMBIOSIS_SECTIONS, CONFLICT_SECTIONS } from '@/lib/food-combining-guide'
import { tierOf } from '@/lib/food-angstrom'
import HeroSection from '@/components/home/HeroSection'
import PillarsSection, { type Pillar } from '@/components/home/PillarsSection'
import JourneySection from '@/components/home/JourneySection'
import TodaySection, { type TodaySeason, type TodaySign } from '@/components/home/TodaySection'
import VibrationStrip from '@/components/home/VibrationStrip'
import CategoryGrid from '@/components/home/CategoryGrid'
import PhilosophySection from '@/components/home/PhilosophySection'
import TechniqueCard from '@/components/technique/TechniqueCard'

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const lt = locale === 'lt'
  const l = lt ? 'lt' : 'en'
  const dict = await getDictionary(locale)
  const all = getAllTechniques(locale)
  const featured = getFeaturedTechniques(locale)

  const counts = Object.fromEntries(
    CATEGORY_SLUGS.map((slug) => [slug, all.filter((t) => t.category === slug).length]),
  ) as Record<CategorySlug, number>

  const pairCount =
    SYMBIOSIS_SECTIONS.reduce((n, s) => n + s.cards.length, 0) + CONFLICT_SECTIONS.reduce((n, s) => n + s.cards.length, 0)

  const stats = [
    { value: all.length, label: lt ? 'praktikų' : 'practices' },
    { value: VIBRATION_TIERS.length, label: lt ? 'vibracijos pakopų' : 'vibration levels' },
    { value: ZODIAC_SIGNS.length, label: lt ? 'zodiako ženklų' : 'zodiac signs' },
    { value: FOODS.length, label: lt ? 'produktų su Å' : 'foods with Å' },
    { value: pairCount, label: lt ? 'maisto derinių' : 'food pairings' },
    { value: MENU.length, label: lt ? 'patiekalų' : 'dishes' },
  ]

  const pillars: Pillar[] = [
    {
      id: 'practices',
      icon: '🧘',
      color: '#2d6a4f',
      title: lt ? 'Praktikos' : 'Practices',
      tagline: lt ? 'Kvėpavimas · meditacija · joga · energija' : 'Breath · meditation · yoga · energy',
      text: lt
        ? 'Senovinių tradicijų technikų biblioteka su aiškiais žingsniais, nauda, kontraindikacijomis ir kilmės istorija — nuo pirmojo sąmoningo įkvėpio iki kundalini.'
        : 'A library of techniques from the ancient traditions with clear steps, benefits, contraindications and origins — from the first conscious breath to kundalini.',
      stat: lt ? `${all.length} technikos` : `${all.length} techniques`,
      href: `/${lang}/techniques`,
      cta: lt ? 'Naršyti technikas' : 'Browse practices',
      links: CATEGORIES.map((c) => ({ href: `/${lang}/techniques/${c.slug}`, label: lt ? c.labelLt : c.label })),
    },
    {
      id: 'map',
      icon: '🌈',
      color: '#6b3fa0',
      title: lt ? 'Vibracijų žemėlapis' : 'Vibration map',
      tagline: lt ? 'Hawkinsas · Solfeggio · čakros' : 'Hawkins · Solfeggio · chakras',
      text: lt
        ? 'Trys sąmonės modeliai, sujungti į vieną skalę su septyniomis pakopomis. Savęs vertinimas parodo, kur esate, ir pasiūlo praktikas, kurios padės pakilti.'
        : 'Three models of consciousness joined into one seven-level scale. The self-assessment shows where you are and suggests practices to help you rise.',
      stat: lt ? '7 pakopos' : '7 levels',
      href: `/${lang}/map`,
      cta: lt ? 'Atverti žemėlapį' : 'Open the map',
      links: [
        { href: `/${lang}/map`, label: lt ? 'Suvienyta skalė' : 'Unified scale' },
        { href: `/${lang}/map#assessment`, label: lt ? 'Savęs vertinimas' : 'Self-assessment' },
      ],
    },
    {
      id: 'zodiac',
      icon: '✨',
      color: '#4a4580',
      title: lt ? 'Zodiakas ir savęs pažinimas' : 'Zodiac & self-knowledge',
      tagline: lt ? 'Ženklai · horoskopas · Human Design · numerologija' : 'Signs · chart · Human Design · numerology',
      text: lt
        ? 'Dvylikos ženklų profiliai, jūsų gimimo horoskopas, Human Design kūno grafikas ir vardo vibracija — keturi veidrodžiai jūsų prigimčiai pažinti.'
        : 'Profiles of the twelve signs, your natal chart, your Human Design bodygraph and the vibration of your name — four mirrors of your nature.',
      stat: lt ? '12 ženklų' : '12 signs',
      href: `/${lang}/zodiac`,
      cta: lt ? 'Pažinti save' : 'Know yourself',
      links: [
        { href: `/${lang}/zodiac`, label: lt ? 'Zodiako ženklai' : 'Zodiac signs' },
        { href: `/${lang}/zodiac/natal-chart`, label: lt ? 'Gimimo horoskopas' : 'Natal chart' },
        { href: `/${lang}/zodiac/human-design`, label: 'Human Design' },
        { href: `/${lang}/zodiac/name-vibration`, label: lt ? 'Vardo vibracija' : 'Name vibration' },
      ],
    },
    {
      id: 'food',
      icon: '🌿',
      color: '#a8661b',
      title: lt ? 'Mityba' : 'Nourishment',
      tagline: lt ? 'Vibracija · deriniai · meniu' : 'Vibration · combining · menu',
      text: lt
        ? 'Maisto piramidė pagal Simonetono angstremus, kas su kuo dera ir sukuria simbiozę, o kas tampa nuodu, ir simbiotinis meniu su apskaičiuota kiekvieno patiekalo verte.'
        : 'A food pyramid by Simoneton’s ångströms, what combines into symbiosis and what turns to poison, and a symbiotic menu with every dish’s value calculated.',
      stat: lt ? `${FOODS.length} produktai` : `${FOODS.length} foods`,
      href: `/${lang}/food-pyramid`,
      cta: lt ? 'Į mitybą' : 'To nourishment',
      links: [
        { href: `/${lang}/food-pyramid`, label: lt ? 'Maisto piramidė' : 'Food pyramid' },
        { href: `/${lang}/food-combining`, label: lt ? 'Maisto deriniai' : 'Food combining' },
        { href: `/${lang}/food-menu`, label: lt ? 'Simbiotinis meniu' : 'Symbiotic menu' },
      ],
    },
  ]

  // Slim, single-language data for the client-side "today" section.
  const signs: TodaySign[] = ZODIAC_SIGNS.map((s) => ({
    slug: s.slug,
    symbol: s.symbol,
    name: s.name[l],
    archetype: s.archetype[l],
    motto: s.motto[l],
    overview: s.overview[l],
    keywords: s.keywords[l],
    start: s.start,
    end: s.end,
  }))
  const seasons: TodaySeason[] = SEASONS.map((s) => ({
    id: s.id,
    icon: s.icon,
    label: s.label[l],
    dishes: MENU.filter((d) => d.seasons.includes(s.id))
      .sort((a, b) => b.angstrom - a.angstrom)
      .slice(0, 3)
      .map((d) => ({ id: d.id, icon: d.icon, name: d.name[l], angstrom: d.angstrom, harmony: d.harmony, color: tierOf(d.angstrom).color })),
  }))

  return (
    <>
      <HeroSection lang={lang} stats={stats} />
      <PillarsSection lang={lang} pillars={pillars} />
      <JourneySection lang={lang} />
      <TodaySection lang={lang} signs={signs} seasons={seasons} />
      <VibrationStrip lang={lang} />
      <CategoryGrid lang={lang} dict={dict} counts={counts} />

      {featured.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-earth-50)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                {dict.home.featured.title}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>{dict.home.featured.subtitle}</p>
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
                style={{ backgroundColor: 'var(--color-forest-700)', color: '#fff', fontFamily: 'var(--font-ui)' }}
              >
                {dict.home.hero.cta} →
              </Link>
            </div>
          </div>
        </section>
      )}

      <PhilosophySection dict={dict} />

      <section className="px-4 pb-20" style={{ backgroundColor: 'var(--color-earth-50)' }}>
        <div
          className="max-w-5xl mx-auto rounded-3xl px-6 py-10 sm:px-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
          style={{ background: 'linear-gradient(135deg, var(--color-forest-900), var(--color-forest-700))', color: '#fff' }}
        >
          <span className="text-5xl" aria-hidden="true">📱</span>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {lt ? 'ConsciousEnergy visada su jumis' : 'ConsciousEnergy, always with you'}
            </h2>
            <p className="opacity-85" style={{ fontFamily: 'var(--font-body)' }}>
              {lt
                ? 'Įsidiekite programėlę į telefoną: praktikos, žemėlapis ir meniu — vienu prisilietimu, net be interneto.'
                : 'Install the app on your phone: practices, the map and the menu one tap away — even offline.'}
            </p>
          </div>
          <Link
            href={`/${lang}/get-the-app`}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-gold-200)', color: 'var(--color-forest-900)', fontFamily: 'var(--font-ui)' }}
          >
            {dict.nav.getApp} →
          </Link>
        </div>
      </section>
    </>
  )
}
