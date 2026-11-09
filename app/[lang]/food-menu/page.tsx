import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import SymbioticMenu from '@/components/food/SymbioticMenu'

export async function generateMetadata(props: PageProps<'/[lang]/food-menu'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Simbiotinis meniu' : 'Symbiotic Menu',
    description: lt
      ? 'Patiekalai, sujungiantys maisto piramidę ir derinių suderinamumą: kiekvienas su vibracijos verte angstremais ir harmonijos įvertinimu.'
      : 'Dishes that unite the food pyramid and food combining: each with its vibration value in ångströms and a harmony score.',
  }
}

const ui = { fontFamily: 'var(--font-ui)' }
const display = { fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }
const body = { fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }

export default async function FoodMenuPage(props: PageProps<'/[lang]/food-menu'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FoodTabs lang={lang} active="menu" />

      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
          {lt ? 'Piramidė + deriniai' : 'Pyramid + combining'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={display}>
          {lt ? 'Simbiotinis meniu' : 'The Symbiotic Menu'}
        </h1>
        <p className="text-lg leading-relaxed" style={body}>
          {lt
            ? 'Čia susijungia abu principai: kiekvienas patiekalas sudarytas iš aukštos vibracijos produktų, kurie tarpusavyje dera ir vienas kitą sustiprina. Prie kiekvieno patiekalo — dvi vertės, apskaičiuotos iš jo ingredientų.'
            : 'Here both principles meet: every dish is built from high-vibration foods that get along and strengthen each other. Each dish carries two values, calculated from its ingredients.'}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
          <h2 className="text-xl font-semibold mb-1" style={display}>{lt ? 'Vibracija (Å)' : 'Vibration (Å)'}</h2>
          <p className="text-sm leading-relaxed" style={body}>
            {lt
              ? 'Ingredientų angstremų vidurkis, pasvertas pagal gramus. Geltona žymė — žmogaus kūno 6 500 Å: virš jos patiekalas pakelia, žemiau — palaiko.'
              : 'The average ångström value of the ingredients, weighted by grams. The gold mark is the body’s 6,500 Å: above it a dish lifts, below it sustains.'}
          </p>
        </div>
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
          <h2 className="text-xl font-semibold mb-1" style={display}>{lt ? 'Harmonija (%)' : 'Harmony (%)'}</h2>
          <p className="text-sm leading-relaxed" style={body}>
            {lt
              ? 'Kiekviena patiekalo maisto grupių pora patikrinama derinių lentelėje: simbiozė = 1, saikingai = ½, konfliktas = 0. 100 % — pilna simbiozė.'
              : 'Every pair of food groups in the dish is checked against the combining table: symbiosis = 1, moderate = ½, conflict = 0. 100% means full symbiosis.'}
          </p>
        </div>
      </div>

      <SymbioticMenu lang={lang} />

      <p className="mt-12 text-sm leading-relaxed max-w-3xl" style={{ ...body, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Ingredientų angstremų vertės paimtos iš Simonetono skalės, o kur jis jų nepateikė — įvertintos pagal piramidės pakopas (švieži ir žali produktai aukščiau, virti žemiau). Tai sąmoningo valgymo gairė, ne medicininė rekomendacija.'
          : 'Note. Ingredient ångström values come from Simoneton’s scale and, where he gave none, are estimated from the pyramid tiers (fresh and raw higher, cooked lower). This is a guide to mindful eating, not medical advice.'}
      </p>
    </div>
  )
}
