import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import CombinationChecker from '@/components/food/CombinationChecker'
import {
  CONFLICTS,
  PLATE_RULES,
  SOURCE_STYLE,
  SYMBIOSES,
  type PairCard,
} from '@/lib/food-combining'

export async function generateMetadata(props: PageProps<'/[lang]/food-combining'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Maisto deriniai' : 'Food Combining',
    description: lt
      ? 'Kas su kuo dera ir sukuria simbiozę, o kas nedera ir apsunkina kūną: interaktyvus maisto grupių suderinamumas, moksliškai pagrįstos sinergijos ir ajurvedos bei derinių tradicijos perspėjimai.'
      : 'What goes with what and creates symbiosis, and what clashes and burdens the body: an interactive food-group compatibility checker, evidence-based synergies and warnings from Ayurveda and food-combining tradition.',
  }
}

const ui = { fontFamily: 'var(--font-ui)' }
const display = { fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }
const body = { fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }

function Card({ card, l, tone }: { card: PairCard; l: 'en' | 'lt'; tone: 'good' | 'bad' }) {
  const src = SOURCE_STYLE[card.source]
  const accent = tone === 'good' ? '#2d6a4f' : '#a63d2a'
  return (
    <article
      className="rounded-2xl p-5 flex flex-col"
      style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', borderTop: `4px solid ${accent}` }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-2xl" aria-hidden="true">
          {card.a}
          <span className="mx-1 text-base font-bold" style={{ color: accent }}>{tone === 'good' ? '+' : '✕'}</span>
          {card.b}
        </span>
        <span
          className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
          style={{ ...ui, color: src.color, border: `1px solid ${src.color}` }}
        >
          {src.label[l]}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2" style={display}>{card.title[l]}</h3>
      <p className="text-sm leading-relaxed" style={body}>{card.text[l]}</p>
    </article>
  )
}

export default async function FoodCombiningPage(props: PageProps<'/[lang]/food-combining'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'
  const l = lt ? 'lt' : 'en'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FoodTabs lang={lang} active="combining" />

      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
          {lt ? 'Maisto suderinamumas' : 'Food compatibility'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={display}>
          {lt ? 'Kas su kuo dera — simbiozė ir nuodai lėkštėje' : 'What Goes With What — Symbiosis and Poison on the Plate'}
        </h1>
        <p className="text-lg leading-relaxed" style={body}>
          {lt
            ? 'Svarbu ne tik ką valgome, bet ir su kuo. Vieni produktai vienas kitą sustiprina — padeda įsisavinti vitaminus, geležį ar apsaugines medžiagas. Kiti, sumaišyti kartu, virškinami priešingomis sąlygomis: maistas užsibūna, rūgsta ir, kaip sako senosios tradicijos, tampa „nuodu“ — sunkumu, pūtimu, nuovargiu.'
            : 'It’s not only what we eat but what we eat it with. Some foods strengthen each other — helping us absorb vitamins, iron or protective compounds. Others, mixed together, digest in opposite conditions: the meal lingers, ferments and, as the old traditions put it, turns to “poison” — heaviness, bloating and fatigue.'}
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>
          {lt ? 'Derinių tikrintuvas' : 'Combination checker'}
        </h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Pasirinkite produktų grupę ir pamatysite, su kuo ji kuria simbiozę, kas tinka saikingai, o kas sukelia konfliktą.'
            : 'Pick a food group to see what it forms a symbiosis with, what is fine in moderation and what clashes.'}
        </p>
        <CombinationChecker lang={lang} />
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>
          {lt ? '✓ Simbiozės — deriniai, kurie stiprina vienas kitą' : '✓ Symbioses — pairs that make each other stronger'}
        </h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Šiuos derinius patvirtina mitybos mokslas: kartu kūnas iš maisto paima daugiau nei iš kiekvieno atskirai.'
            : 'These pairings are backed by nutrition science: together the body takes more from the food than from each one alone.'}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYMBIOSES.map((c) => (
            <Card key={c.title.en} card={c} l={l} tone="good" />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>
          {lt ? '✕ Konfliktai — deriniai, kurie tampa nuodu' : '✕ Conflicts — pairs that turn to poison'}
        </h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Kai kurie perspėjimai moksliškai pagrįsti ir svarbūs sveikatai, kiti kyla iš ajurvedos ir maisto derinimo tradicijos. Žyma kortelėje rodo šaltinį.'
            : 'Some warnings are scientifically established and matter for your health; others come from Ayurveda and the food-combining tradition. The tag on each card shows the source.'}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONFLICTS.map((c) => (
            <Card key={c.title.en} card={c} l={l} tone="bad" />
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-2xl p-6" style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }}>
        <h2 className="text-2xl font-semibold mb-4" style={display}>
          {lt ? 'Harmoningos lėkštės taisyklės' : 'Rules for a harmonious plate'}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {PLATE_RULES.map((rule, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed" style={body}>{rule[l]}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-sm leading-relaxed max-w-3xl" style={{ ...body, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Žodis „nuodas“ čia vartojamas tradicine prasme: ajurveda tokius derinius vadina „viruddha“, o derinių tradicija (Hay, Shelton) kalba apie rūgimą ir puvimą. Atskiro baltymų ir krakmolo valgymo nauda moksliniais tyrimais nepatvirtinta, tačiau daugeliui žmonių šie principai padeda jaustis lengviau. Žymos „Mokslas“ kortelės remiasi patvirtintais duomenimis; perspėjimas dėl greipfrutų ir vaistų yra rimtas. Jei vartojate vaistų ar turite ligų, pasitarkite su gydytoju.'
          : 'Note. “Poison” is used here in the traditional sense: Ayurveda calls such pairs “viruddha”, and the food-combining tradition (Hay, Shelton) speaks of fermentation and putrefaction. Research has not confirmed that separating protein and starch improves health, though many people feel lighter following these principles. Cards tagged “Science” rest on established evidence, and the grapefruit-and-medicine warning is serious. If you take medication or have a health condition, talk to your doctor.'}
      </p>
    </div>
  )
}
