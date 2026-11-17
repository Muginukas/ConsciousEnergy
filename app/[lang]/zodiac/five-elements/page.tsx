import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import ZodiacTabs from '@/components/zodiac/ZodiacTabs'
import { FiveElementsClient } from '@/components/astro/ClientViews'
import { WUXING_MAP } from '@/lib/wuxing'

const HANZI_FONT = '"Noto Serif SC", "Noto Serif CJK SC", "Songti SC", "SimSun", serif'

export async function generateMetadata(props: PageProps<'/[lang]/zodiac/five-elements'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Penki elementai — kinų zodiakas' : 'The Five Elements — Chinese zodiac',
    description: lt
      ? 'Wu Xing: Medis, Ugnis, Žemė, Metalas ir Vanduo. Sužinokite savo kinų elementą ir gyvūną pagal tikslią Mėnulio Naujųjų metų datą, 2026 Ugnies Arklio metų prasmę ir kaip elementai vienas kitą kuria bei tramdo.'
      : 'Wu Xing: Wood, Fire, Earth, Metal and Water. Find your Chinese element and animal using the exact Lunar New Year date, the meaning of the 2026 Fire Horse year and how the elements create and control each other.',
  }
}

export default async function FiveElementsPage(props: PageProps<'/[lang]/zodiac/five-elements'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'
  const fire = WUXING_MAP.fire
  const water = WUXING_MAP.water

  const text = {
    eyebrow: lt ? 'Kinų astrologija · Wu Xing' : 'Chinese astrology · Wu Xing',
    title: lt ? 'Penki elementai' : 'The Five Elements',
    intro: lt
      ? 'Kinų zodiakas — ne tik dvylika gyvūnų. Kiekvieni metai jungia gyvūną su vienu iš penkių elementų — Medžiu, Ugnimi, Žeme, Metalu ar Vandeniu — ir su Jin arba Jang poliškumu. Elementas nusako, kaip gyvūno energija juda: Vandens Arklys bėga švelniau nei Ugnies Arklys.'
      : 'The Chinese zodiac is more than twelve animals. Every year pairs an animal with one of five elements — Wood, Fire, Earth, Metal or Water — and with a Yin or Yang polarity. The element describes how the animal’s energy moves: a Water Horse runs softer than a Fire Horse.',
    spotEyebrow: lt ? 'Dabartiniai metai' : 'The current year',
    spotTitle: lt ? '2026 — Ugnies Arklio metai' : '2026 — the year of the Fire Horse',
    spotDates: lt ? '2026 m. vasario 17 d. – 2027 m. vasario 5 d.' : '17 February 2026 – 5 February 2027',
    spotBody: lt
      ? [
          'Ugnies Arklys (丙午, bǐng wǔ) — dviguba ugnis: Jang Ugnies kamienas 丙 susitinka su Arkliu, kurio prigimtinis elementas taip pat yra Ugnis. Tai greitis, drąsa, nepriklausomybė, aistra ir proveržiai — energija, kuri verčia judėti ir veikti dabar.',
          'Kadangi 10 elementų fazių ir 12 gyvūnų susitinka tik kas 60 metų, Ugnies Arklys sugrįžta retai: 1906, 1966, 2026, 2086. Japonijoje 1966-ieji (hinoeuma) buvo apipinti tokiais prietarais, kad gimstamumas tais metais krito maždaug ketvirtadaliu — gražus priminimas, kad simboliai veikia per mūsų tikėjimą jais.',
          'Kaip gyventi šiuos metus sąmoningai: naudokite ugnį pradžioms ir drąsiems sprendimams, bet ją įžeminkite. Vanduo (poilsis, tyla, lėtas kvėpavimas) neleidžia perdegti, Žemė (rutina, šiltas maistas) paverčia įkvėpimą rezultatais.',
        ]
      : [
          'The Fire Horse (丙午, bǐng wǔ) is double fire: the Yang Fire stem 丙 meets the Horse, whose own native element is also Fire. Speed, courage, independence, passion and breakthroughs — an energy that urges you to move and act now.',
          'Because the 10 element phases and the 12 animals line up only once every 60 years, the Fire Horse is rare: 1906, 1966, 2026, 2086. In Japan the 1966 Fire Horse (hinoeuma) carried such superstition that births fell by roughly a quarter that year — a striking reminder that symbols work through what we believe about them.',
          'Living the year consciously: use the fire for beginnings and bold decisions, but ground it. Water (rest, silence, slow breathing) keeps you from burning out; Earth (routine, warm food) turns inspiration into results.',
        ],
    compare: lt ? 'Tas pats gyvūnas, kitas elementas' : 'Same animal, different element',
    waterHorse: lt ? 'Vandens Arklys' : 'Water Horse',
    fireHorse: lt ? 'Ugnies Arklys' : 'Fire Horse',
    waterHorseText: lt ? 'Bėga švelniau: lankstus, intuityvus, diplomatiškas.' : 'Runs softer: adaptable, intuitive, diplomatic.',
    fireHorseText: lt ? 'Bėga karštai: drąsus, aistringas, nesustabdomas.' : 'Runs hot: bold, passionate, unstoppable.',
    next: lt
      ? 'Toliau: nuo 2027 m. vasario 6 d. — Ugnies Ožkos (丁未) metai, Jin Ugnis: švelnesnė, kūrybingesnė, labiau į vidų nukreipta liepsna.'
      : 'Next: from 6 February 2027 — the Fire Goat (丁未), Yin Fire: a gentler, more creative, more inward-turned flame.',
    howTitle: lt ? 'Kaip skaičiuojamas elementas' : 'How the element is calculated',
    how: lt
      ? [
          'Paskutinis gimimo metų skaitmuo: 0–1 Metalas, 2–3 Vanduo, 4–5 Medis, 6–7 Ugnis, 8–9 Žemė. Lyginis skaitmuo — Jang, nelyginis — Jin.',
          'Bet kinų metai prasideda ne sausio 1-ąją, o per Mėnulio Naujuosius metus — tarp sausio 21 ir vasario 20 d. Gimusieji anksčiau priklauso ankstesniems metams (ir jų elementui). Mūsų skaičiuoklė tikslią datą apskaičiuoja astronomiškai.',
          'Klasikinė BaZi (Keturių stulpų) astrologija metų ribą kartais skaičiuoja nuo Li Čun — pavasario pradžios apie vasario 4 d. Jei gimėte tarp vasario 4 d. ir Mėnulio Naujųjų metų, gali būti nurodomi skirtingi metai.',
        ]
      : [
          'The last digit of the birth year: 0–1 Metal, 2–3 Water, 4–5 Wood, 6–7 Fire, 8–9 Earth. An even digit is Yang, an odd one Yin.',
          'But the Chinese year does not start on 1 January — it starts at Lunar New Year, between 21 January and 20 February. Anyone born before it belongs to the previous year (and its element). Our calculator works out the exact date astronomically.',
          'Classical BaZi (Four Pillars) astrology sometimes draws the year line at Li Chun, the start of spring around 4 February. If you were born between 4 February and Lunar New Year, sources may give different years.',
        ],
    note: lt
      ? 'Penkių elementų teorija — tūkstantmetė kinų filosofijos, medicinos ir astrologijos tradicija, simbolinė gamtos ciklų kalba. Naudokite ją kaip savirefleksijos įrankį, ne kaip mokslinę diagnozę.'
      : 'Five Element theory is a millennia-old tradition of Chinese philosophy, medicine and astrology — a symbolic language of nature’s cycles. Use it as a tool for self-reflection, not as a scientific diagnosis.',
    signs: lt ? 'Vakarų zodiako ženklai →' : 'Western zodiac signs →',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <ZodiacTabs lang={lang} active="elements" />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
          {text.eyebrow}
        </p>
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {text.title} <span style={{ fontFamily: HANZI_FONT, color: 'var(--color-gold-600)' }} className="whitespace-nowrap">五行</span>
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {text.intro}
        </p>
      </header>

      {/* Fire Horse spotlight */}
      <section
        className="mb-16 overflow-hidden rounded-2xl p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, #1d1b26 0%, #2b1d1a 100%)', color: '#f4f1ea' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#f0a07f', fontFamily: 'var(--font-ui)' }}>
          {text.spotEyebrow} · {text.spotDates}
        </p>
        <div className="flex items-center gap-4 mb-5">
          <span style={{ fontFamily: HANZI_FONT, fontSize: 72, lineHeight: 1, color: '#f0875f' }} aria-hidden="true">馬</span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#f4f1ea' }}>
            {text.spotTitle}
          </h2>
        </div>
        <div className="space-y-3 max-w-3xl mb-6" style={{ fontFamily: 'var(--font-body)', color: '#ddd6cb' }}>
          {text.spotBody.map((p) => (
            <p key={p.slice(0, 24)} className="leading-relaxed">{p}</p>
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a9a3b8', fontFamily: 'var(--font-ui)' }}>{text.compare}</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { el: water, name: text.waterHorse, year: 2002, body: text.waterHorseText, glow: '#8fb6f0' },
            { el: fire, name: text.fireHorse, year: 2026, body: text.fireHorseText, glow: '#f0875f' },
          ].map((h) => (
            <div key={h.year} className="rounded-xl p-4 text-center" style={{ border: `1px solid ${h.glow}55`, backgroundColor: `${h.glow}12` }}>
              <span
                className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: h.glow, color: '#1d1b26', fontFamily: HANZI_FONT, fontSize: 18 }}
                aria-hidden="true"
              >
                {h.el.hanzi}
              </span>
              <span className="block" style={{ fontFamily: HANZI_FONT, fontSize: 52, lineHeight: 1.1, color: h.glow }} aria-hidden="true">馬</span>
              <p className="mt-1 text-base sm:text-lg font-bold uppercase" style={{ color: h.glow, fontFamily: 'var(--font-ui)' }}>{h.name}</p>
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-ui)' }}>{h.year}</p>
              <p className="text-xs sm:text-sm" style={{ color: '#cfc8bc', fontFamily: 'var(--font-body)' }}>{h.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm" style={{ color: '#cfc8bc', fontFamily: 'var(--font-body)' }}>{text.next}</p>
      </section>

      <FiveElementsClient lang={lang} />

      <section className="mb-16 rounded-2xl p-6" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
        <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {text.howTitle}
        </h2>
        <ul className="space-y-2 list-disc pl-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {text.how.map((h) => (
            <li key={h.slice(0, 24)}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="p-6 rounded-xl mb-8" style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}>
          ✦ {text.note}
        </p>
      </section>

      <Link href={`/${lang}/zodiac`} className="text-sm font-medium" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>
        {text.signs}
      </Link>
    </div>
  )
}
