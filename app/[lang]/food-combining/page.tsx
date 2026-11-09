import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { hasLocale } from '@/lib/dictionaries'
import FoodTabs from '@/components/food/FoodTabs'
import SectionNav from '@/components/food/SectionNav'
import CombinationChecker from '@/components/food/CombinationChecker'
import {
  CONFLICT_SECTIONS,
  DIGESTION,
  EATING_ORDER,
  PLATE_RULES,
  PRODUCT_GUIDE,
  SOURCE_STYLE,
  SYMBIOSIS_SECTIONS,
  type PairCard,
  type Section,
  type Source,
} from '@/lib/food-combining-guide'

export async function generateMetadata(props: PageProps<'/[lang]/food-combining'>): Promise<Metadata> {
  const { lang } = await props.params
  const lt = lang === 'lt'
  return {
    title: lt ? 'Maisto deriniai' : 'Food Combining',
    description: lt
      ? 'Kas su kuo dera ir sukuria simbiozę, o kas nedera ir apsunkina kūną: derinių tikrintuvas, virškinimo laikai, valgymo eilė, sinergijos ir konfliktai pagal mechanizmą bei produktų porų žinynas.'
      : 'What goes with what and creates symbiosis, and what clashes: a combination checker, digestion times, eating order, synergies and conflicts by mechanism, and a per-product pairing guide.',
  }
}

type L = 'en' | 'lt'
const ui = { fontFamily: 'var(--font-ui)' }
const display = { fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }
const body = { fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }
const GOOD = '#2d6a4f'
const BAD = '#a63d2a'

function SourceTag({ source, l }: { source: Source; l: L }) {
  const s = SOURCE_STYLE[source]
  return (
    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ ...ui, color: s.color, border: `1px solid ${s.color}` }}>
      {s.label[l]}
    </span>
  )
}

function Card({ card, l, tone }: { card: PairCard; l: L; tone: 'good' | 'bad' }) {
  const accent = tone === 'good' ? GOOD : BAD
  return (
    <article className="rounded-2xl p-5 flex flex-col" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', borderTop: `4px solid ${accent}` }}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-2xl" aria-hidden="true">
          {card.a}
          <span className="mx-1 text-base font-bold" style={{ color: accent }}>{tone === 'good' ? '+' : '✕'}</span>
          {card.b}
        </span>
        <SourceTag source={card.source} l={l} />
      </div>
      <h4 className="text-lg font-semibold mb-2 leading-snug" style={display}>{card.title[l]}</h4>
      <p className="text-sm leading-relaxed" style={body}>{card.text[l]}</p>
    </article>
  )
}

function Group({ section, l, tone }: { section: Section; l: L; tone: 'good' | 'bad' }) {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-semibold mb-1" style={display}>
        <span aria-hidden="true">{section.icon}</span> {section.title[l]}
      </h3>
      <p className="mb-4 text-sm" style={{ ...body, color: 'var(--color-text-muted)' }}>{section.intro[l]}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.cards.map((c) => (
          <Card key={c.title.en} card={c} l={l} tone={tone} />
        ))}
      </div>
    </div>
  )
}

function DigestionChart({ l }: { l: L }) {
  const MAX = 300
  const ticks = [0, 60, 120, 180, 240, 300]
  const fmtT = (m: number) => (m < 60 ? `${m} min` : `${String(Math.round((m / 60) * 10) / 10).replace('.', l === 'lt' ? ',' : '.')} ${l === 'lt' ? 'val.' : 'h'}`)
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
      <ul className="space-y-2.5">
        {DIGESTION.map((r) => {
          const color = r.max <= 60 ? GOOD : r.max <= 180 ? '#b5831a' : BAD
          return (
            <li key={r.name.en} className="grid items-center gap-3" style={{ gridTemplateColumns: 'minmax(8rem, 34%) 1fr', ...ui }}>
              <span className="text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                <span aria-hidden="true">{r.icon}</span> {r.name[l]}
                <span className="block text-xs tabular-nums" style={{ color: 'var(--color-text-muted)' }}>
                  {fmtT(r.min)} – {fmtT(r.max)}
                </span>
              </span>
              <span className="relative h-4 rounded" style={{ backgroundColor: 'var(--color-earth-50)' }}>
                <span
                  className="absolute inset-y-0 rounded"
                  style={{ left: `${(r.min / MAX) * 100}%`, width: `${Math.max(3, ((r.max - r.min) / MAX) * 100)}%`, backgroundColor: color }}
                />
              </span>
            </li>
          )
        })}
      </ul>
      <div className="grid gap-3 mt-2" style={{ gridTemplateColumns: 'minmax(8rem, 34%) 1fr' }}>
        <span />
        <div className="relative h-4 text-[10px]" style={{ ...ui, color: 'var(--color-text-muted)' }}>
          {ticks.map((t) => (
            <span key={t} className="absolute whitespace-nowrap" style={{ left: `${(t / MAX) * 100}%`, transform: t === 0 ? undefined : t === MAX ? 'translateX(-100%)' : 'translateX(-50%)' }}>
              {t === 0 ? '0' : `${t / 60} ${l === 'lt' ? 'val.' : 'h'}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function FoodCombiningPage(props: PageProps<'/[lang]/food-combining'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()
  const lt = lang === 'lt'
  const l: L = lt ? 'lt' : 'en'
  const symCount = SYMBIOSIS_SECTIONS.reduce((n, s) => n + s.cards.length, 0)
  const confCount = CONFLICT_SECTIONS.reduce((n, s) => n + s.cards.length, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FoodTabs lang={lang} active="combining" />

      <header className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
          {lt ? 'Maisto suderinamumas' : 'Food compatibility'}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={display}>
          {lt ? 'Kas su kuo dera — simbiozė ir nuodai lėkštėje' : 'What Goes With What — Symbiosis and Poison on the Plate'}
        </h1>
        <p className="text-lg leading-relaxed" style={body}>
          {lt
            ? 'Svarbu ne tik ką valgome, bet ir su kuo bei kokia tvarka. Vieni produktai vienas kitą sustiprina — padeda įsisavinti vitaminus, geležį ar apsaugines medžiagas. Kiti, sumaišyti kartu, virškinami priešingomis sąlygomis: maistas užsibūna, rūgsta ir, kaip sako senosios tradicijos, tampa „nuodu“ — sunkumu, pūtimu, nuovargiu.'
            : 'It matters not only what we eat but what with, and in what order. Some foods strengthen each other — helping us absorb vitamins, iron or protective compounds. Others, mixed together, digest in opposite conditions: the meal lingers, ferments and, as the old traditions put it, turns to “poison” — heaviness, bloating and fatigue.'}
        </p>
      </header>

      <SectionNav
        title={lt ? 'Turinys' : 'Contents'}
        items={[
          { id: 'tikrintuvas', label: lt ? 'Derinių tikrintuvas' : 'Combination checker' },
          { id: 'virskinimas', label: lt ? 'Virškinimo laikas' : 'Digestion times' },
          { id: 'eile', label: lt ? 'Valgymo eilė' : 'Eating order' },
          { id: 'simbiozes', label: lt ? `Simbiozės (${symCount})` : `Symbioses (${symCount})` },
          { id: 'konfliktai', label: lt ? `Konfliktai (${confCount})` : `Conflicts (${confCount})` },
          { id: 'zinynas', label: lt ? 'Produktų porų žinynas' : 'Pairing guide' },
          { id: 'taisykles', label: lt ? 'Lėkštės taisyklės' : 'Plate rules' },
        ]}
      />

      <section id="tikrintuvas" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>{lt ? 'Derinių tikrintuvas' : 'Combination checker'}</h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Pasirinkite produktų grupę ir pamatysite, su kuo ji kuria simbiozę, kas tinka saikingai, o kas sukelia konfliktą.'
            : 'Pick a food group to see what it forms a symbiosis with, what is fine in moderation and what clashes.'}
        </p>
        <CombinationChecker lang={lang} />
      </section>

      <section id="virskinimas" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>{lt ? 'Kiek laiko virškinamas maistas' : 'How long food takes to digest'}</h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Štai kodėl deriniai svarbūs: greitas maistas, užstrigęs už lėto, ima rūgti. Apytikslis buvimo skrandyje laikas pagal maisto derinimo tradiciją — tikslus laikas priklauso nuo porcijos, paruošimo ir žmogaus.'
            : 'This is why combinations matter: quick food stuck behind slow food begins to ferment. Approximate time in the stomach according to the food-combining tradition — the real time depends on portion, preparation and the person.'}
        </p>
        <DigestionChart l={l} />
      </section>

      <section id="eile" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-semibold mb-6" style={display}>{lt ? 'Valgymo eilė' : 'The order of eating'}</h2>
        <ol className="relative space-y-4 pl-2">
          {EATING_ORDER.map((s, i) => (
            <li key={s.title.en} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }} aria-hidden="true">
                {s.icon}
              </span>
              <div className="flex-1 rounded-2xl p-4" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold" style={display}>{i + 1}. {s.title[l]}</h3>
                  <SourceTag source={s.source} l={l} />
                </div>
                <p className="text-sm leading-relaxed" style={body}>{s.text[l]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="simbiozes" className="scroll-mt-24 mb-8">
        <h2 className="text-3xl font-semibold mb-2" style={display}>
          {lt ? '✓ Simbiozės — deriniai, kurie stiprina vienas kitą' : '✓ Symbioses — pairs that make each other stronger'}
        </h2>
        <p className="mb-8 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Suskirstyta pagal tai, kaip veikia simbiozė. Žyma kortelėje rodo šaltinį: daugumą šių derinių patvirtina mitybos mokslas.'
            : 'Grouped by how the symbiosis works. The tag on each card shows the source: most of these are backed by nutrition science.'}
        </p>
        {SYMBIOSIS_SECTIONS.map((s) => (
          <Group key={s.id} section={s} l={l} tone="good" />
        ))}
      </section>

      <section id="konfliktai" className="scroll-mt-24 mb-8">
        <h2 className="text-3xl font-semibold mb-2" style={display}>
          {lt ? '✕ Konfliktai — deriniai, kurie tampa nuodu' : '✕ Conflicts — pairs that turn to poison'}
        </h2>
        <p className="mb-8 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Nuo rimčiausių iki švelniausių: pirmiausia moksliškai įrodyti pavojai, tada maistinių medžiagų vagys, galiausiai ajurvedos ir derinių tradicijos perspėjimai.'
            : 'From the most serious to the mildest: proven health risks first, then nutrient thieves, then the warnings of Ayurveda and the food-combining tradition.'}
        </p>
        {CONFLICT_SECTIONS.map((s) => (
          <Group key={s.id} section={s} l={l} tone="bad" />
        ))}
      </section>

      <section id="zinynas" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-semibold mb-2" style={display}>{lt ? 'Produktų porų žinynas' : 'Pairing guide by product'}</h2>
        <p className="mb-6 leading-relaxed max-w-3xl" style={body}>
          {lt
            ? 'Konkretūs produktai ir jų geriausi partneriai. Atidarykite produktą, kad pamatytumėte, su kuo jis dera, kas tinka saikingai ir ko vengti.'
            : 'Specific foods and their best partners. Open a food to see what it pairs with, what is fine and what to avoid.'}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {PRODUCT_GUIDE.map((p) => (
            <details key={p.name.en} className="group rounded-2xl" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
                <span className="text-lg font-semibold" style={display}>
                  <span aria-hidden="true">{p.icon}</span> {p.name[l]}
                </span>
                <span className="text-sm transition-transform group-open:rotate-180" style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">▾</span>
              </summary>
              <dl className="px-5 pb-5 space-y-2 text-sm" style={ui}>
                {(
                  [
                    ['best', lt ? '✓ Geriausia' : '✓ Best with', p.best, GOOD, '#d8efe2'],
                    ['ok', lt ? '~ Tinka' : '~ Fine with', p.ok, '#8a6a12', '#f6ecc6'],
                    ['avoid', lt ? '✕ Vengti' : '✕ Avoid', p.avoid, BAD, '#f6d9d1'],
                  ] as const
                ).map(([k, label, val, color, bg]) => (
                  <div key={k} className="rounded-lg px-3 py-2" style={{ backgroundColor: bg }}>
                    <dt className="font-semibold" style={{ color }}>{label}</dt>
                    <dd style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>{val[l]}</dd>
                  </div>
                ))}
                <p className="pt-1 leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
                  💡 {p.tip[l]}
                </p>
              </dl>
            </details>
          ))}
        </div>
      </section>

      <section id="taisykles" className="scroll-mt-24 mb-14 rounded-2xl p-6" style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }}>
        <h2 className="text-2xl font-semibold mb-4" style={display}>{lt ? 'Harmoningos lėkštės taisyklės' : 'Rules for a harmonious plate'}</h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {PLATE_RULES.map((rule, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold" style={{ ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}>
                {i + 1}
              </span>
              <span className="leading-relaxed" style={body}>{rule[l]}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-sm leading-relaxed max-w-3xl" style={{ ...body, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Pastaba. Žodis „nuodas“ čia vartojamas tradicine prasme: ajurveda tokius derinius vadina „viruddha“, o derinių tradicija (Hay, Shelton) kalba apie rūgimą ir puvimą. Atskiro baltymų ir krakmolo valgymo nauda moksliniais tyrimais nepatvirtinta, o virškinimo laikai yra apytiksliai, tačiau daugeliui žmonių šie principai padeda jaustis lengviau. Žymos „Mokslas“ kortelės remiasi patvirtintais duomenimis; skyriaus „Tikri pavojai sveikatai“ perspėjimai yra rimti. Jei vartojate vaistų ar turite ligų, pasitarkite su gydytoju ar vaistininku.'
          : 'Note. “Poison” is used here in the traditional sense: Ayurveda calls such pairs “viruddha”, and the food-combining tradition (Hay, Shelton) speaks of fermentation and putrefaction. Research has not confirmed that separating protein and starch improves health, and digestion times are approximate, though many people feel lighter following these principles. Cards tagged “Science” rest on established evidence, and the warnings under “Real health risks” are serious. If you take medication or have a health condition, talk to your doctor or pharmacist.'}
      </p>
    </div>
  )
}
