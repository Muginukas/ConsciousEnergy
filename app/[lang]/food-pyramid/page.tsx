import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import {
  BODY_ANGSTROM,
  FOOD_TIERS,
  RAISE_TIPS,
  SCALE_MAX,
  type FoodTier,
} from '@/lib/food-angstrom'

export async function generateMetadata(props: PageProps<'/[lang]/food-pyramid'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Maisto piramidė pagal angstremus' : 'Food Pyramid by Ångström',
    description: lt
      ? 'André Simonetono maisto vibracijų skalė angstremais: gyvas, palaikantis, žemos vibracijos ir „negyvas“ maistas bei kaip pakelti savo lėkštės vibraciją.'
      : 'André Simoneton’s ångström scale of food vibration: living, supporting, low-vibration and “dead” foods, and how to raise the vibration of your plate.',
  }
}

const ui = { fontFamily: 'var(--font-ui)' }
const display = { fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }
const body = { fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }

/** Pyramid drawn apex-first; each band is a trapezoid slice of one triangle. */
function Pyramid({ lt }: { lt: boolean }) {
  const bands = [...FOOD_TIERS].reverse()
  const n = bands.length
  return (
    <div className="mx-auto w-full max-w-xl" role="list" aria-label={lt ? 'Maisto piramidė' : 'Food pyramid'}>
      {bands.map((tier, i) => {
        const top = 50 - (50 * i) / n
        const bottom = 50 - (50 * (i + 1)) / n
        return (
          <a
            key={tier.id}
            href={`#${tier.id}`}
            role="listitem"
            className="flex flex-col items-center justify-end text-center transition-opacity hover:opacity-90"
            style={{
              backgroundColor: tier.color,
              color: tier.textColor,
              height: i === 0 ? 110 : 76,
              paddingBottom: 10,
              marginTop: i === 0 ? 0 : 3,
              clipPath: `polygon(${top}% 0, ${100 - top}% 0, ${100 - bottom}% 100%, ${bottom}% 100%)`,
              ...ui,
            }}
          >
            <span className="text-[11px] sm:text-sm font-semibold leading-tight px-1">
              {i === 0 ? (lt ? 'Negyvas' : 'Dead') : tier.title[lt ? 'lt' : 'en']}
            </span>
            <span className="text-[10px] sm:text-xs opacity-85 leading-tight">{tier.range}</span>
          </a>
        )
      })}
      <div className="mt-3 flex justify-between text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        <span>{lt ? '▲ valgyti mažiausiai' : '▲ eat least'}</span>
        <span>{lt ? 'valgyti daugiausiai ▼' : 'eat most ▼'}</span>
      </div>
    </div>
  )
}

/** Horizontal 0–10,000 Å scale with the body's 6,500 Å reference line. */
function Scale({ lt }: { lt: boolean }) {
  const pct = (v: number) => `${(v / SCALE_MAX) * 100}%`
  const segments = FOOD_TIERS.filter((t) => t.max > 0)
  return (
    <div className="w-full">
      <div className="relative h-5 rounded-full overflow-hidden flex" style={{ backgroundColor: 'var(--color-earth-200)' }}>
        {[...segments].reverse().map((t) => (
          <div
            key={t.id}
            style={{ width: pct(t.max - t.min), backgroundColor: t.color }}
            title={`${t.title[lt ? 'lt' : 'en']} · ${t.range}`}
          />
        ))}
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{ left: pct(BODY_ANGSTROM), backgroundColor: 'var(--color-gold-400)', boxShadow: '0 0 0 1px #fff' }}
        />
      </div>
      <div className="relative h-10 mt-1 text-[11px]" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        <span className="absolute left-0">0 Å</span>
        <span className="absolute -translate-x-1/2" style={{ left: pct(3000) }}>3 000</span>
        <span
          className="absolute -translate-x-1/2 text-center font-semibold leading-tight"
          style={{ left: pct(BODY_ANGSTROM), color: 'var(--color-gold-600)' }}
        >
          6 500
          <br />
          {lt ? 'žmogaus kūnas' : 'human body'}
        </span>
        <span className="absolute right-0">10 000 Å</span>
      </div>
    </div>
  )
}

function TierCard({ tier, lt }: { tier: FoodTier; lt: boolean }) {
  const l = lt ? 'lt' : 'en'
  return (
    <section
      id={tier.id}
      className="scroll-mt-24 rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
    >
      <div className="px-5 py-4 flex flex-wrap items-baseline justify-between gap-2" style={{ backgroundColor: tier.color, color: tier.textColor }}>
        <div>
          <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: tier.textColor }}>
            {tier.title[l]}
          </h2>
          <p className="text-sm opacity-90" style={ui}>{tier.subtitle[l]}</p>
        </div>
        <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ ...ui, backgroundColor: 'rgba(255,255,255,0.18)' }}>
          {tier.range}
        </span>
      </div>
      <div className="p-5">
        <p className="text-sm font-semibold mb-2" style={{ ...ui, color: tier.color }}>
          {tier.guidance[l]}
        </p>
        <p className="mb-4 leading-relaxed" style={body}>{tier.description[l]}</p>
        <ul className="divide-y" style={{ borderColor: 'var(--color-earth-200)' }}>
          {tier.items.map((item) => (
            <li
              key={item.name.en}
              className="flex items-baseline justify-between gap-4 py-2"
              style={{ borderColor: 'var(--color-earth-200)' }}
            >
              <span style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>{item.name[l]}</span>
              <span className="shrink-0 text-sm tabular-nums" style={{ ...ui, color: 'var(--color-text-muted)' }}>
                {item.angstrom} Å
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default async function FoodPyramidPage(props: PageProps<'/[lang]/food-pyramid'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'
  const l = lt ? 'lt' : 'en'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FoodTabs lang={lang} active="pyramid" />
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
          {lt ? 'Maisto vibracija' : 'Food vibration'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={display}>
          {lt ? 'Maisto piramidė pagal angstremus' : 'The Food Pyramid by Ångström'}
        </h1>
        <p className="text-lg leading-relaxed" style={body}>
          {lt
            ? 'Prancūzų inžinierius André Simonetonas maistą vertino ne pagal kalorijas, o pagal jo skleidžiamą gyvybinę spinduliuotę, matuojamą angstremais (Å). Sveiko žmogaus kūną jis įvertino maždaug 6 500 Å. Maistas virš šios ribos, jo teigimu, mus pakelia, o žemiau jos — reikalauja mūsų pačių energijos.'
            : 'French engineer André Simoneton rated food not by calories but by the vital radiation it gives off, measured in ångströms (Å). He placed a healthy human body at about 6,500 Å. Food above that line, he held, lifts us; food below it borrows our own energy to digest.'}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center mb-14">
        <Pyramid lt={lt} />
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={display}>
            {lt ? 'Skalė' : 'The scale'}
          </h2>
          <Scale lt={lt} />
          <p className="mt-4 leading-relaxed" style={body}>
            {lt
              ? 'Kuo arčiau gamtos, tuo aukštesnė vibracija. Laikas, virimas, rafinavimas ir konservavimas ją mažina — tas pats produktas gali nukeliauti per kelias piramidės pakopas nuo daržo iki lėkštės.'
              : 'The closer to nature, the higher the vibration. Time, cooking, refining and preserving all lower it — the same food can slide down several tiers of the pyramid between the garden and the plate.'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-14">
        {FOOD_TIERS.map((tier) => (
          <TierCard key={tier.id} tier={tier} lt={lt} />
        ))}
      </div>

      <section className="mb-14 rounded-2xl p-6" style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }}>
        <h2 className="text-2xl font-semibold mb-4" style={display}>
          {lt ? 'Kaip pakelti savo lėkštės vibraciją' : 'How to raise the vibration of your plate'}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {RAISE_TIPS.map((tip, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed" style={body}>{tip[l]}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-sm leading-relaxed max-w-3xl" style={{ ...body, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Simonetono vertės (XX a. 4–5 dešimtmečiai) gautos radiestezijos metodais, remiantis Bovio biometru; jos yra apytikslės, skirtinguose šaltiniuose šiek tiek skiriasi ir nėra pripažintos šiuolaikinio mokslo. Naudokite šią piramidę kaip sąmoningo valgymo gairę kartu su subalansuota mityba, o ne vietoj gydytojo ar dietologo patarimo.'
          : 'Note. Simoneton’s values (1930s–40s) came from radiesthesia methods based on the Bovis biometer; they are approximate, vary slightly between sources and are not recognised by modern science. Use this pyramid as a guide to mindful eating alongside a balanced diet, not in place of advice from a doctor or dietitian.'}
      </p>
    </div>
  )
}
