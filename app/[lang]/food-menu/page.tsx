import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import SymbioticMenu from '@/components/food/SymbioticMenu'
import DayPlans from '@/components/food/DayPlans'
import SectionNav from '@/components/food/SectionNav'
import { DAY_PLANS, MENU } from '@/lib/food-menu'

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

      <SectionNav
        title={lt ? 'Turinys' : 'Contents'}
        items={[
          { id: 'vertes', label: lt ? 'Kaip skaičiuojamos vertės' : 'How values are calculated' },
          { id: 'dienos', label: lt ? `Dienos planai (${DAY_PLANS.length})` : `Day plans (${DAY_PLANS.length})` },
          { id: 'patiekalai', label: lt ? `Visi patiekalai (${MENU.length})` : `All dishes (${MENU.length})` },
        ]}
      />

      <div id="vertes" className="scroll-mt-24 grid gap-4 sm:grid-cols-3 mb-14">
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
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
          <h2 className="text-xl font-semibold mb-1" style={display}>{lt ? 'Žymos' : 'Tags'}</h2>
          <p className="text-sm leading-relaxed" style={body}>
            {lt
              ? 'Veganiškas, vegetariškas ir be glitimo — nustatoma automatiškai pagal ingredientus. Sezonas rodo, kada produktai švieži ir vietiniai.'
              : 'Vegan, vegetarian and gluten-free are worked out automatically from the ingredients. The season shows when the produce is fresh and local.'}
          </p>
        </div>
      </div>

      <section id="dienos" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>{lt ? 'Dienos planai' : 'Day plans'}</h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Visa diena iš meniu patiekalų, su tarpais tarp valgių pagal virškinimo laiką. Dienos vibracija — visų patiekalų vidurkis pagal gramus; paspauskite patiekalą, kad pamatytumėte jo kortelę.'
            : 'A whole day from the menu, spaced by digestion time. The day’s vibration is the gram-weighted average of all its dishes; tap a dish to see its card.'}
        </p>
        <DayPlans lang={lang} />
      </section>

      <section id="patiekalai" className="scroll-mt-24">
        <h2 className="text-3xl font-semibold mb-6" style={display}>{lt ? 'Visi patiekalai' : 'All dishes'}</h2>
        <SymbioticMenu lang={lang} />
      </section>

      <p className="mt-12 text-sm leading-relaxed max-w-3xl" style={{ ...body, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Ingredientų angstremų vertės paimtos iš Simonetono skalės, o kur jis jų nepateikė — įvertintos pagal piramidės pakopas (švieži ir žali produktai aukščiau, virti žemiau). Tai sąmoningo valgymo gairė, ne medicininė rekomendacija.'
          : 'Note. Ingredient ångström values come from Simoneton’s scale and, where he gave none, are estimated from the pyramid tiers (fresh and raw higher, cooked lower). This is a guide to mindful eating, not medical advice.'}
      </p>
    </div>
  )
}
