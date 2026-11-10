import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import KitchenModes from '@/components/food/KitchenModes'

export async function generateMetadata(props: PageProps<'/[lang]/food-kitchen'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Ką turiu namie' : 'From my kitchen',
    description: lt
      ? 'Įrašyk, kokius produktus turi namie — patikrinsime, ar jie dera kartu, pasiūlysime alternatyvų ir receptų vakarienei, pietums ar pusryčiams.'
      : 'Enter what you have at home — we check whether it combines well, suggest alternatives and give recipes for dinner, lunch or breakfast.',
  }
}

const ui = { fontFamily: 'var(--font-ui)' }

export default async function FoodKitchenPage(props: PageProps<'/[lang]/food-kitchen'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FoodTabs lang={lang} active="kitchen" />

      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
          {lt ? 'Deriniai + receptai' : 'Combining + recipes'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {lt ? 'Ką turiu namie' : 'From my kitchen'}
        </h1>
        <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
          {lt
            ? 'Du būdai rasti, ką gaminti. „Iš to, ką turiu“ — įrašyk produktus iš šaldytuvo ir spintelės: patikrinsime, ar jie dera vienoje lėkštėje, ir pasiūlysime receptų. „Pagal produktą“ — pasirink vieną produktą (pvz., grikius) ir pamatyk visus jo simbiotinius derinius bei receptus pusryčiams, pietums ir vakarienei.'
            : 'Two ways to find what to cook. “From what I have” — enter what’s in your fridge and cupboard: we check whether it belongs on one plate and suggest recipes. “By ingredient” — choose one ingredient (e.g. buckwheat) and see all its symbiotic combinations and recipes for breakfast, lunch and dinner.'}
        </p>
      </header>

      <KitchenModes lang={lang} />

      <p className="mt-12 text-sm leading-relaxed max-w-3xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Derinių vertinimai remiasi maisto derinimo tradicija (Hay, Shelton) ir ajurveda, sušvelninta ten, kur šiuolaikinė mityba aiškiai nesutinka. Tai sąmoningo valgymo gairė, ne medicininė rekomendacija.'
          : 'Note. Combining ratings follow the food-combining tradition (Hay, Shelton) and Ayurveda, softened where modern nutrition clearly disagrees. A guide to mindful eating, not medical advice.'}
      </p>
    </div>
  )
}
