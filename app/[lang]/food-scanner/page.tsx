import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import IngredientScanner from '@/components/food/IngredientScanner'

export async function generateMetadata(props: PageProps<'/[lang]/food-scanner'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Ingredientų skaitiklis' : 'Ingredient scanner',
    description: lt
      ? 'Įrašyk produkto pavadinimą, brūkšninį kodą arba įklijuok sudėtį — sužinosi, ar produktas geras, ar blogas, ir kurie ingredientai žalingi.'
      : 'Enter a product name, barcode or paste its ingredient list — find out whether the product is good or bad and which ingredients are harmful.',
  }
}

const ui = { fontFamily: 'var(--font-ui)' }

export default async function FoodScannerPage(props: PageProps<'/[lang]/food-scanner'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FoodTabs lang={lang} active="scanner" />

      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
          {lt ? 'Ar produktas geras?' : 'Is this product good?'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {lt ? 'Ingredientų skaitiklis' : 'Ingredient scanner'}
        </h1>
        <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
          {lt
            ? 'Įrašyk produkto pavadinimą, brūkšninį kodą arba įklijuok sudėtį nuo pakuotės. Skaitiklis atpažįsta per 80 žalingų priedų (cukrūs, rafinuoti aliejai, E numeriai, dirbtiniai saldikliai) ir naudingus ingredientus, ir suteikia švarumo balą nuo 0 iki 1000.'
            : 'Enter a product name, barcode or paste the ingredient list from the pack. The scanner recognises 80+ harmful additives (sugars, refined oils, E-numbers, artificial sweeteners) and beneficial ingredients, and gives a purity score from 0 to 1000.'}
        </p>
      </header>

      <IngredientScanner lang={lang} />

      <p className="mt-12 text-sm leading-relaxed max-w-3xl" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Skaitiklio duomenų bazė ir balai — iš HolySnacks ingredientų skaitiklio; produktų sudėtis — iš Open Food Facts ir HolySnacks lietuviškų prekių ženklų katalogo. Balas vertina tik sudėtį, ne kiekius ar maistinę vertę. Tai sąmoningo pasirinkimo gairė, ne medicininė rekomendacija.'
          : 'Note. The scanner’s database and scores come from the HolySnacks ingredient scanner; product ingredient lists come from Open Food Facts and the HolySnacks Lithuanian brand catalogue. The score judges ingredients only, not amounts or nutrition. A guide to mindful choices, not medical advice.'}
      </p>
    </div>
  )
}
