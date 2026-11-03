import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import ZodiacTabs from '@/components/zodiac/ZodiacTabs'
import { NameVibrationClient } from '@/components/astro/ClientViews'

export async function generateMetadata(props: PageProps<'/[lang]/zodiac/name-vibration'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Vardo vibracija' : 'Name Vibration',
    description: lt
      ? 'Vardo ir pavardės numerologija: kokią vibraciją neša jūsų vardas, sielos troškimas, išorinė asmenybė, gyvenimo kelias ir karminės pamokos.'
      : 'Name and surname numerology: the vibration your name carries, soul urge, outer personality, life path and karmic lessons.',
  }
}

export default async function NameVibrationPage(props: PageProps<'/[lang]/zodiac/name-vibration'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <ZodiacTabs lang={lang} active="name" />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
          {lt ? 'Numerologija' : 'Numerology'}
        </p>
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {lt ? 'Vardo vibracija' : 'The Vibration of Your Name'}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {lt
            ? 'Kiekvienas vardas yra garsas, o kiekvienas garsas — vibracija. Senovinė Pitagoro numerologija kiekvienai raidei priskiria skaičių nuo 1 iki 9. Sudėjus vardo ir pavardės raides, atsiskleidžia energija, kurią jūsų vardas neša į pasaulį: jūsų talentai, giliausias sielos troškimas ir tai, kaip jus mato kiti.'
            : 'Every name is a sound, and every sound is a vibration. Ancient Pythagorean numerology gives each letter a number from 1 to 9. Adding the letters of your first name and surname reveals the energy your name carries into the world: your talents, your soul’s deepest desire and how others see you.'}
        </p>
      </header>
      <NameVibrationClient lang={lang} />
    </div>
  )
}
