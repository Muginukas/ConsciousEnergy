'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import {
  ANIMAL_HANZI,
  ElementId,
  KE_TEXT,
  RELATION_TEXT,
  SHENG_TEXT,
  WUXING,
  WUXING_MAP,
  YMD,
  animalVersions,
  chineseYear,
  chineseYearForDate,
  controls,
  generates,
  relation,
  sameCycleYears,
} from '@/lib/wuxing'
import { CHINESE_ANIMALS } from '@/lib/zodiac'
import { loadBirthData } from '@/components/astro/BirthForm'

type L = 'en' | 'lt'

const HANZI_FONT = '"Noto Serif SC", "Noto Serif CJK SC", "Songti SC", "SimSun", serif'

const card = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  boxShadow: 'var(--shadow-card)',
} as const

const MONTHS: Record<L, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  lt: ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'],
}

const fmt = (d: YMD, l: L) => (l === 'lt' ? `${d.year} m. ${MONTHS.lt[d.month - 1]} ${d.day} d.` : `${MONTHS.en[d.month - 1]} ${d.day}, ${d.year}`)

const T = {
  en: {
    findTitle: 'Find your element',
    findIntro: 'Enter your date of birth. We calculate the exact Lunar New Year for your year, so January and February births land in the right animal.',
    dob: 'Date of birth',
    show: 'Show',
    invalid: 'Please enter a valid date.',
    lastDigit: 'The last digit of the year tells the element',
    yourYear: 'Your Chinese year',
    beforeNY: (lny: string, prev: number) =>
      `You were born before Lunar New Year (${lny}), so you belong to the Chinese year that began in ${prev}.`,
    afterNY: (lny: string) => `Lunar New Year that year fell on ${lny} — you were born after it.`,
    yang: 'Yang',
    yin: 'Yin',
    position: (n: number) => `Year ${n} of the 60-year cycle`,
    returns: 'The same combination appears in',
    nowTitle: (y: string) => `You in the current year — ${y}`,
    grid: 'Elements by year',
    gridIntro: 'Each element rules two years in a row — first Yang, then Yin — so the cycle comes round again every ten years.',
    yangYear: 'Yang year',
    yinYear: 'Yin year',
    tap: 'Tap a year to reveal its animal.',
    cycles: 'How the elements move',
    cyclesIntro: 'The elements are not static boxes but five phases of one flow. They create each other (generating cycle) and keep each other in check (controlling cycle).',
    sheng: 'Generating 生',
    ke: 'Controlling 克',
    both: 'Both',
    tapElement: 'Tap an element to see its relationships.',
    feeds: 'Feeds',
    fedBy: 'Fed by',
    restrains: 'Restrains',
    restrainedBy: 'Restrained by',
    wheel: 'An animal and an element together',
    wheelIntro: 'Twelve animals × five elements, matched by Yin and Yang, give 60 unique years. That is why any one combination — like the Fire Horse — returns only once in a lifetime.',
    animalIn: (a: string) => `The ${a} in all five elements`,
    elements: 'The five elements up close',
    season: 'Season',
    direction: 'Direction',
    colour: 'Colour',
    organs: 'Organs',
    sense: 'Sense',
    taste: 'Taste',
    virtue: 'Virtue',
    balanced: 'In balance',
    unbalanced: 'Out of balance',
    sound: 'Healing sound',
    balance: 'How to balance',
    foods: 'Foods',
    practice: 'Practices in the app',
    stems: 'Heavenly stems',
  },
  lt: {
    findTitle: 'Raskite savo elementą',
    findIntro: 'Įveskite gimimo datą. Apskaičiuojame tikslią Mėnulio Naujųjų metų datą jūsų metams, todėl gimusieji sausį ir vasarį gauna teisingą gyvūną.',
    dob: 'Gimimo data',
    show: 'Rodyti',
    invalid: 'Įveskite teisingą datą.',
    lastDigit: 'Paskutinis metų skaitmuo nurodo elementą',
    yourYear: 'Jūsų kinų metai',
    beforeNY: (lny: string, prev: number) =>
      `Gimėte prieš Mėnulio Naujuosius metus (${lny}), todėl priklausote kinų metams, prasidėjusiems ${prev} m.`,
    afterNY: (lny: string) => `Tais metais Mėnulio Naujieji metai buvo ${lny} — gimėte po jų.`,
    yang: 'Jang',
    yin: 'Jin',
    position: (n: number) => `${n}-ieji 60 metų ciklo metai`,
    returns: 'Tas pats derinys pasikartoja',
    nowTitle: (y: string) => `Jūs ir dabartiniai metai — ${y}`,
    grid: 'Elementai pagal metus',
    gridIntro: 'Kiekvienas elementas valdo dvejus metus iš eilės — pirma Jang, paskui Jin, todėl ciklas sugrįžta kas dešimt metų.',
    yangYear: 'Jang metai',
    yinYear: 'Jin metai',
    tap: 'Palieskite metus, kad pamatytumėte jų gyvūną.',
    cycles: 'Kaip elementai juda',
    cyclesIntro: 'Elementai — ne statiškos dėžutės, o penkios vienos tėkmės fazės. Jie vienas kitą kuria (generavimo ciklas) ir vienas kitą tramdo (kontrolės ciklas).',
    sheng: 'Generavimas 生',
    ke: 'Kontrolė 克',
    both: 'Abu',
    tapElement: 'Palieskite elementą, kad pamatytumėte jo ryšius.',
    feeds: 'Maitina',
    fedBy: 'Jį maitina',
    restrains: 'Tramdo',
    restrainedBy: 'Jį tramdo',
    wheel: 'Gyvūnas ir elementas kartu',
    wheelIntro: 'Dvylika gyvūnų × penki elementai, suderinti pagal Jin ir Jang, duoda 60 unikalių metų. Todėl kiekvienas derinys — pavyzdžiui, Ugnies Arklys — sugrįžta tik kartą per gyvenimą.',
    animalIn: (a: string) => `${a} visuose penkiuose elementuose`,
    elements: 'Penki elementai iš arti',
    season: 'Metų laikas',
    direction: 'Kryptis',
    colour: 'Spalva',
    organs: 'Organai',
    sense: 'Pojūtis',
    taste: 'Skonis',
    virtue: 'Dorybė',
    balanced: 'Pusiausvyroje',
    unbalanced: 'Disbalanse',
    sound: 'Gydantis garsas',
    balance: 'Kaip subalansuoti',
    foods: 'Maistas',
    practice: 'Praktikos programėlėje',
    stems: 'Dangiškieji kamienai',
  },
}

/** "Fire Horse" / "Ugnies Arklys" */
function yearName(year: number, l: L) {
  const cy = chineseYear(year)
  if (l === 'lt') {
    const gen: Record<ElementId, string> = { wood: 'Medžio', fire: 'Ugnies', earth: 'Žemės', metal: 'Metalo', water: 'Vandens' }
    return `${gen[cy.element.id]} ${cy.animal.name.lt}`
  }
  return `${cy.element.name.en} ${cy.animal.name.en}`
}

function ElementBadge({ id, size = 44 }: { id: ElementId; size?: number }) {
  const e = WUXING_MAP[id]
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: e.tint,
        color: e.color,
        border: `2px solid ${e.color}`,
        fontFamily: HANZI_FONT,
        fontSize: size * 0.5,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {e.hanzi}
    </span>
  )
}

function SectionTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
        {title}
      </h2>
      {intro && (
        <p className="mb-6 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {intro}
        </p>
      )}
    </>
  )
}

/* ───────────────────────── Finder ───────────────────────── */

function Finder({ l, today }: { l: L; today: YMD }) {
  const t = T[l]
  const [value, setValue] = useState(() => loadBirthData()?.date ?? '')
  const [submitted, setSubmitted] = useState(() => loadBirthData()?.date ?? '')
  const [error, setError] = useState(false)

  const parsed = useMemo(() => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(submitted)
    if (!m) return null
    const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])]
    const d = new Date(Date.UTC(year, month - 1, day))
    if (d.getUTCMonth() !== month - 1 || year < 1901 || year > 2099) return null
    return chineseYearForDate({ year, month, day })
  }, [submitted])

  const now = chineseYearForDate(today).cy

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = /^(\d{4})-(\d{2})-(\d{2})$/.test(value)
    setError(!ok)
    if (ok) setSubmitted(value)
  }

  const cy = parsed?.cy
  const digits = cy ? String(cy.year).split('') : []
  const rel = cy ? relation(cy.element.id, now.element.id) : null

  return (
    <section id="finder" className="mb-16 scroll-mt-24">
      <SectionTitle title={t.findTitle} intro={t.findIntro} />
      <div className="rounded-2xl p-5 sm:p-8" style={card}>
        <form onSubmit={submit} className="flex flex-col sm:flex-row sm:items-end gap-3">
          <label className="flex flex-col gap-1.5 flex-1" style={{ fontFamily: 'var(--font-ui)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.dob}</span>
            <input
              type="date"
              required
              min="1901-01-01"
              max="2099-12-31"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="rounded-lg px-4 py-3 text-base"
              style={{ border: '1px solid var(--color-earth-200)', backgroundColor: '#fff', color: 'var(--color-text-primary)' }}
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium"
            style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', fontFamily: 'var(--font-ui)' }}
          >
            <Sparkles size={16} /> {t.show}
          </button>
        </form>
        {(error || (submitted && !parsed)) && (
          <p className="mt-3 text-sm" style={{ color: '#b42318', fontFamily: 'var(--font-ui)' }}>{t.invalid}</p>
        )}

        {cy && parsed && rel && (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl p-5" style={{ backgroundColor: cy.element.tint, border: `1px solid ${cy.element.color}55` }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: cy.element.color, fontFamily: 'var(--font-ui)' }}>
                {t.yourYear}
              </p>
              <div className="flex items-center gap-4 mb-3">
                <span style={{ fontFamily: HANZI_FONT, fontSize: 56, lineHeight: 1, color: cy.element.color }} aria-hidden="true">
                  {cy.animalHanzi}
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                    {yearName(cy.year, l)}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
                    <span style={{ fontFamily: HANZI_FONT }}>{cy.ganzhi}</span> · {cy.yang ? t.yang : t.yin} · {t.position(cy.cyclePosition)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-1" aria-label={String(cy.year)}>
                {digits.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex h-10 w-8 items-center justify-center rounded-md text-xl font-bold"
                    style={
                      i === 3
                        ? { border: `2px solid ${cy.element.color}`, color: cy.element.color, backgroundColor: '#fff' }
                        : { color: 'var(--color-text-muted)' }
                    }
                  >
                    {d}
                  </span>
                ))}
                <span className="mx-2" style={{ color: 'var(--color-text-muted)' }}>→</span>
                <ElementBadge id={cy.element.id} size={36} />
                <span className="ml-1 font-semibold" style={{ color: cy.element.color, fontFamily: 'var(--font-ui)' }}>
                  {cy.element.name[l]}
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{t.lastDigit}</p>

              <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                {cy.element.inYear[l]} {cy.animal.traits[l]}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                {parsed.beforeNewYear ? t.beforeNY(fmt(parsed.lny, l), cy.year) : t.afterNY(fmt(parsed.lny, l))}
              </p>
              <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                {t.returns}: {sameCycleYears(cy.year).join(' · ')}
              </p>
            </div>

            <div className="rounded-xl p-5" style={{ backgroundColor: '#fff', border: '1px solid var(--color-earth-200)' }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
                {t.nowTitle(`${yearName(now.year, l)} ${now.ganzhi}`)}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <ElementBadge id={cy.element.id} />
                <span style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
                  {rel === 'same' ? '＝' : rel === 'nourishes-you' ? '←' : rel === 'you-nourish' ? '→' : rel === 'you-control' ? '⇢' : '⇠'}
                </span>
                <ElementBadge id={now.element.id} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                {RELATION_TEXT[rel].title[l]}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                {RELATION_TEXT[rel].text[l]}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                <strong>{T[l].balance}:</strong> {cy.element.balance[l]}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── Year grid ───────────────────────── */

function YearGrid({ l, currentYear }: { l: L; currentYear: number }) {
  const t = T[l]
  // Decade starting at a Yang Wood year (ends in 4)
  const [start, setStart] = useState(() => currentYear - ((((currentYear - 4) % 10) + 10) % 10))
  const [picked, setPicked] = useState<number>(currentYear)

  return (
    <section className="mb-16">
      <SectionTitle title={t.grid} intro={t.gridIntro} />
      <div className="rounded-2xl p-4 sm:p-6" style={{ ...card, backgroundColor: '#1d1b26' }}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setStart(start - 10)}
            className="rounded-full p-2"
            style={{ color: '#d9d4c7', border: '1px solid #3a3746' }}
            aria-label="−10"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold tracking-widest" style={{ color: '#d9d4c7', fontFamily: 'var(--font-ui)' }}>
            {start} – {start + 9}
          </span>
          <button
            onClick={() => setStart(start + 10)}
            className="rounded-full p-2"
            style={{ color: '#d9d4c7', border: '1px solid #3a3746' }}
            aria-label="+10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr) minmax(0,1fr)' }}>
          <span />
          <span className="text-center text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#a9a3b8', fontFamily: 'var(--font-ui)' }}>{t.yangYear}</span>
          <span className="text-center text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#a9a3b8', fontFamily: 'var(--font-ui)' }}>{t.yinYear}</span>
          {WUXING.map((e, i) => {
            const years = [start + i * 2, start + i * 2 + 1]
            return (
              <div key={e.id} className="contents">
                <div className="flex items-center gap-2 min-w-0">
                  <ElementBadge id={e.id} size={34} />
                  <span className="truncate text-xs sm:text-sm font-semibold uppercase tracking-wide" style={{ color: e.color === '#6f7784' ? '#c9ced6' : e.color, fontFamily: 'var(--font-ui)', filter: 'brightness(1.35)' }}>
                    {e.name[l]}
                  </span>
                </div>
                {years.map((y) => {
                  const cy = chineseYear(y)
                  const active = picked === y
                  const isNow = y === currentYear
                  return (
                    <button
                      key={y}
                      onClick={() => setPicked(y)}
                      className="relative flex items-center justify-center gap-1.5 rounded-xl px-1 py-2 transition-all"
                      style={{
                        minHeight: 56,
                        border: `1.5px solid ${active ? e.color : `${e.color}66`}`,
                        backgroundColor: active ? `${e.color}33` : 'transparent',
                        boxShadow: active ? `0 0 16px ${e.color}55` : undefined,
                        color: '#f4f1ea',
                      }}
                      aria-pressed={active}
                    >
                      {active && (
                        <span style={{ fontFamily: HANZI_FONT, fontSize: 24, lineHeight: 1, color: e.color, filter: 'brightness(1.4)' }} aria-hidden="true">
                          {cy.animalHanzi}
                        </span>
                      )}
                      <span className="flex flex-col items-center leading-tight">
                        <span className="text-base sm:text-xl font-bold" style={{ fontFamily: 'var(--font-ui)' }}>{y}</span>
                        {active && (
                          <span className="text-[10px] uppercase tracking-wide" style={{ color: '#d9d4c7' }}>{cy.animal.name[l]}</span>
                        )}
                      </span>
                      {isNow && (
                        <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--color-gold-400)' }} aria-hidden="true" />
                      )}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-center text-sm" style={{ color: '#d9d4c7', fontFamily: 'var(--font-ui)' }}>
          {(() => {
            const cy = chineseYear(picked)
            return (
              <>
                <strong style={{ color: cy.element.color, filter: 'brightness(1.4)' }}>{yearName(picked, l)}</strong>{' '}
                <span style={{ fontFamily: HANZI_FONT }}>{cy.ganzhi}</span> · {cy.yang ? t.yang : t.yin}
              </>
            )
          })()}
        </p>
        <p className="mt-1 text-center text-xs" style={{ color: '#8f8a9c', fontFamily: 'var(--font-ui)' }}>{t.tap}</p>
      </div>
    </section>
  )
}

/* ───────────────────────── Cycles diagram ───────────────────────── */

const POS: Record<ElementId, { x: number; y: number }> = (() => {
  const order: ElementId[] = ['wood', 'fire', 'earth', 'metal', 'water']
  const out = {} as Record<ElementId, { x: number; y: number }>
  order.forEach((id, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    out[id] = { x: 200 + 140 * Math.cos(a), y: 210 + 140 * Math.sin(a) }
  })
  return out
})()

function arrow(from: ElementId, to: ElementId, r = 40) {
  const a = POS[from]
  const b = POS[to]
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return { x1: a.x + ux * r, y1: a.y + uy * r, x2: b.x - ux * (r + 6), y2: b.y - uy * (r + 6) }
}

function CyclesDiagram({ l }: { l: L }) {
  const t = T[l]
  const [mode, setMode] = useState<'sheng' | 'ke' | 'both'>('both')
  const [sel, setSel] = useState<ElementId | null>('fire')

  const SHENG_C = '#c9a227'
  const KE_C = '#e0607e'

  const involved = (from: ElementId, to: ElementId) => !sel || from === sel || to === sel

  const motherOf = (id: ElementId) => WUXING.find((e) => generates(e.id) === id)!.id
  const controllerOf = (id: ElementId) => WUXING.find((e) => controls(e.id) === id)!.id

  return (
    <section className="mb-16">
      <SectionTitle title={t.cycles} intro={t.cyclesIntro} />
      <div className="rounded-2xl p-4 sm:p-6" style={card}>
        <div className="mb-4 flex flex-wrap gap-2" style={{ fontFamily: 'var(--font-ui)' }}>
          {(['sheng', 'ke', 'both'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-full px-4 py-1.5 text-sm font-medium"
              style={
                mode === m
                  ? { backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
                  : { backgroundColor: '#fff', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }
              }
            >
              {m === 'sheng' ? t.sheng : m === 'ke' ? t.ke : t.both}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
          <svg viewBox="0 0 400 410" className="w-full max-w-md mx-auto" role="img" aria-label={t.cycles}>
            <defs>
              <marker id="ah-sheng" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={SHENG_C} />
              </marker>
              <marker id="ah-ke" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={KE_C} />
              </marker>
            </defs>
            {(mode === 'sheng' || mode === 'both') &&
              WUXING.map((e) => {
                const to = generates(e.id)
                const a = arrow(e.id, to)
                const on = involved(e.id, to)
                return <line key={`s-${e.id}`} {...a} stroke={SHENG_C} strokeWidth={on ? 3.5 : 1.5} opacity={on ? 1 : 0.25} markerEnd="url(#ah-sheng)" />
              })}
            {(mode === 'ke' || mode === 'both') &&
              WUXING.map((e) => {
                const to = controls(e.id)
                const a = arrow(e.id, to)
                const on = involved(e.id, to)
                return <line key={`k-${e.id}`} {...a} stroke={KE_C} strokeWidth={on ? 3.5 : 1.5} opacity={on ? 1 : 0.25} markerEnd="url(#ah-ke)" />
              })}
            {WUXING.map((e) => {
              const p = POS[e.id]
              const active = sel === e.id
              return (
                <g key={e.id} onClick={() => setSel(active ? null : e.id)} style={{ cursor: 'pointer' }} role="button" aria-label={e.name[l]} aria-pressed={active}>
                  <circle cx={p.x} cy={p.y} r={active ? 40 : 36} fill={e.tint} stroke={e.color} strokeWidth={active ? 4 : 2.5} />
                  <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize={34} fill={e.color} style={{ fontFamily: HANZI_FONT }}>
                    {e.hanzi}
                  </text>
                  <text
                    x={p.x}
                    y={p.y + (p.y > 220 ? 58 : -48)}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={700}
                    fill={e.color}
                    style={{ fontFamily: 'var(--font-ui)', letterSpacing: 1 }}
                  >
                    {e.name[l].toUpperCase()}
                  </text>
                </g>
              )
            })}
          </svg>

          <div>
            {sel ? (
              <div style={{ fontFamily: 'var(--font-body)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <ElementBadge id={sel} size={48} />
                  <div>
                    <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: WUXING_MAP[sel].color }}>
                      {WUXING_MAP[sel].name[l]}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{WUXING_MAP[sel].keywords[l]}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <li><span style={{ color: SHENG_C }}>●</span> <strong>{t.feeds}:</strong> {SHENG_TEXT[sel][l]}</li>
                  <li><span style={{ color: SHENG_C }}>●</span> <strong>{t.fedBy}:</strong> {SHENG_TEXT[motherOf(sel)][l]}</li>
                  <li><span style={{ color: KE_C }}>●</span> <strong>{t.restrains}:</strong> {KE_TEXT[sel][l]}</li>
                  <li><span style={{ color: KE_C }}>●</span> <strong>{t.restrainedBy}:</strong> {KE_TEXT[controllerOf(sel)][l]}</li>
                </ul>
              </div>
            ) : null}
            <p className="mt-4 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{t.tapElement}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Animal wheel ───────────────────────── */

function AnimalWheel({ l, currentYear }: { l: L; currentYear: number }) {
  const t = T[l]
  const [year, setYear] = useState(currentYear)
  const cy = chineseYear(year)
  // The 12-year window starting at the Rat year at or before `year`
  const ratYear = year - cy.branchIndex
  const versions = animalVersions(cy.branchIndex)

  return (
    <section className="mb-16">
      <SectionTitle title={t.wheel} intro={t.wheelIntro} />
      <div className="rounded-2xl p-4 sm:p-6" style={{ ...card, backgroundColor: '#1d1b26' }}>
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <svg viewBox="0 0 400 400" className="w-full max-w-sm mx-auto" role="img" aria-label={t.wheel}>
              <path d="M188 14 L200 28 L212 14" fill="none" stroke="#c9a227" strokeWidth={2.5} />
              <circle cx={200} cy={200} r={170} fill="none" stroke="#3a3746" />
              {CHINESE_ANIMALS.map((a, i) => {
                // Rotate so the selected animal sits on top.
                const ang = -Math.PI / 2 + ((i - cy.branchIndex) * 2 * Math.PI) / 12
                const y = ratYear + i
                const e = chineseYear(y).element
                const active = i === cy.branchIndex
                const segR = 112
                const a0 = ang - Math.PI / 12 + 0.02
                const a1 = ang + Math.PI / 12 - 0.02
                const ri = 82
                const p = (r: number, aa: number) => `${200 + r * Math.cos(aa)},${200 + r * Math.sin(aa)}`
                return (
                  <g key={a.id} onClick={() => setYear(y)} style={{ cursor: 'pointer' }} role="button" aria-label={`${y} ${a.name[l]}`}>
                    <path
                      d={`M${p(ri, a0)} A${ri},${ri} 0 0 1 ${p(ri, a1)} L${p(segR, a1)} A${segR},${segR} 0 0 0 ${p(segR, a0)} Z`}
                      fill={e.color}
                      opacity={active ? 1 : 0.55}
                    />
                    <text x={200 + 97 * Math.cos(ang)} y={200 + 97 * Math.sin(ang) + 6} textAnchor="middle" fontSize={15} fill="#1d1b26" style={{ fontFamily: HANZI_FONT }}>
                      {e.hanzi}
                    </text>
                    <text
                      x={200 + 145 * Math.cos(ang)}
                      y={200 + 145 * Math.sin(ang) + (active ? 13 : 9)}
                      textAnchor="middle"
                      fontSize={active ? 38 : 26}
                      fill={active ? e.color : '#d9d4c7'}
                      style={{ fontFamily: HANZI_FONT, filter: active ? 'brightness(1.3)' : undefined }}
                    >
                      {ANIMAL_HANZI[i]}
                    </text>
                  </g>
                )
              })}
              <text x={200} y={205} textAnchor="middle" fontSize={44} fontWeight={800} fill={cy.element.color} style={{ fontFamily: 'var(--font-ui)', filter: 'brightness(1.35)' }}>
                {year}
              </text>
              <text x={200} y={232} textAnchor="middle" fontSize={12} fontWeight={600} fill="#d9d4c7" style={{ fontFamily: 'var(--font-ui)', letterSpacing: 1.5 }}>
                {yearName(year, l).toUpperCase()}
              </text>
            </svg>
            <div className="mt-2 flex items-center justify-center gap-3" style={{ fontFamily: 'var(--font-ui)' }}>
              <button onClick={() => setYear(year - 1)} className="rounded-full p-2" style={{ color: '#d9d4c7', border: '1px solid #3a3746' }} aria-label="−1">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setYear(year - 60)} className="rounded-full px-3 py-1.5 text-xs" style={{ color: '#d9d4c7', border: '1px solid #3a3746' }}>−60</button>
              <button onClick={() => setYear(year + 60)} className="rounded-full px-3 py-1.5 text-xs" style={{ color: '#d9d4c7', border: '1px solid #3a3746' }}>+60</button>
              <button onClick={() => setYear(year + 1)} className="rounded-full p-2" style={{ color: '#d9d4c7', border: '1px solid #3a3746' }} aria-label="+1">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: '#f4f1ea' }}>
              {t.animalIn(cy.animal.name[l])}
            </h3>
            <ul className="space-y-2">
              {versions.map((v) => {
                const active = v.element.id === cy.element.id
                return (
                  <li
                    key={v.element.id}
                    className="flex items-center gap-3 rounded-xl px-3 py-2"
                    style={{ border: `1px solid ${active ? v.element.color : '#3a3746'}`, backgroundColor: active ? `${v.element.color}26` : 'transparent' }}
                  >
                    <ElementBadge id={v.element.id} size={32} />
                    <span className="w-20 shrink-0 text-sm font-semibold" style={{ color: '#f4f1ea', fontFamily: 'var(--font-ui)' }}>
                      {v.element.name[l]}
                    </span>
                    <span className="flex flex-wrap gap-x-2 text-sm" style={{ color: '#d9d4c7', fontFamily: 'var(--font-ui)' }}>
                      {v.years.map((y) => (
                        <button key={y} onClick={() => setYear(y)} className="underline-offset-2 hover:underline" style={{ fontWeight: y === year ? 700 : 400, color: y === year ? '#fff' : undefined }}>
                          {y}
                        </button>
                      ))}
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-sm" style={{ color: '#a9a3b8', fontFamily: 'var(--font-body)' }}>
              {cy.element.inYear[l]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Element cards ───────────────────────── */

function ElementCards({ l, lang }: { l: L; lang: string }) {
  const t = T[l]
  const [open, setOpen] = useState<ElementId>('water')
  const e = WUXING_MAP[open]
  const rows: [string, string][] = [
    [t.season, e.season[l]],
    [t.direction, e.direction[l]],
    [t.colour, e.colour[l]],
    [t.organs, e.organs[l]],
    [t.sense, e.sense[l]],
    [t.taste, e.taste[l]],
    [t.stems, `${e.stems.yang.hanzi} ${e.stems.yang.pinyin} (${t.yang}) · ${e.stems.yin.hanzi} ${e.stems.yin.pinyin} (${t.yin})`],
  ]

  return (
    <section className="mb-16">
      <SectionTitle title={t.elements} />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist">
        {WUXING.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={open === x.id}
            onClick={() => setOpen(x.id)}
            className="flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-4 text-sm font-medium"
            style={{
              fontFamily: 'var(--font-ui)',
              backgroundColor: open === x.id ? x.tint : '#fff',
              border: `1.5px solid ${open === x.id ? x.color : 'var(--color-earth-200)'}`,
              color: open === x.id ? x.color : 'var(--color-text-secondary)',
            }}
          >
            <ElementBadge id={x.id} size={30} /> {x.name[l]}
          </button>
        ))}
      </div>

      <div className="rounded-2xl p-5 sm:p-8" style={{ ...card, borderTop: `5px solid ${e.color}` }}>
        <div className="flex items-start gap-4 mb-4">
          <span style={{ fontFamily: HANZI_FONT, fontSize: 64, lineHeight: 1, color: e.color }} aria-hidden="true">{e.hanzi}</span>
          <div className="min-w-0">
            <h3 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: e.color }}>
              {e.name[l]} <span className="text-lg" style={{ color: 'var(--color-text-muted)' }}>{e.pinyin}</span>
            </h3>
            <p className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
              {e.keywords[l]}
            </p>
          </div>
        </div>
        <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {e.description[l]}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt style={{ color: 'var(--color-text-muted)' }}>{k}</dt>
                <dd style={{ color: 'var(--color-text-primary)' }}>{v}</dd>
              </div>
            ))}
            <dt style={{ color: 'var(--color-text-muted)' }}>{t.virtue}</dt>
            <dd style={{ color: 'var(--color-text-primary)' }}>
              <span style={{ fontFamily: HANZI_FONT }}>{e.virtue.hanzi}</span> {e.virtue.pinyin} — {e.virtue.name[l]}
            </dd>
            <dt style={{ color: 'var(--color-text-muted)' }}>{t.sound}</dt>
            <dd style={{ color: 'var(--color-text-primary)' }}>“{e.healingSound}”</dd>
          </dl>

          <div className="space-y-3 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3" style={{ backgroundColor: e.tint }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: e.color, fontFamily: 'var(--font-ui)' }}>{t.balanced}</p>
                {e.emotion.balanced[l]}
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-cream-dark)' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{t.unbalanced}</p>
                {e.emotion.unbalanced[l]}
              </div>
            </div>
            <p><strong>{t.balance}:</strong> {e.balance[l]}</p>
            <p><strong>{t.foods}:</strong> {e.foods[l]}</p>
            <div>
              <p className="font-semibold mb-2">{t.practice}:</p>
              <div className="flex flex-wrap gap-2">
                {e.practices.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${lang}/techniques/${p.category}/${p.slug}`}
                    className="rounded-full px-3 py-1.5 text-sm font-medium"
                    style={{ backgroundColor: '#fff', border: `1px solid ${e.color}`, color: e.color, fontFamily: 'var(--font-ui)' }}
                  >
                    {p.title[l]} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Root ───────────────────────── */

export default function FiveElementsView({ lang }: { lang: string }) {
  const l: L = lang === 'lt' ? 'lt' : 'en'
  const today = useMemo<YMD>(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
  }, [])
  const currentYear = chineseYearForDate(today).cy.year

  return (
    <>
      <Finder l={l} today={today} />
      <YearGrid l={l} currentYear={currentYear} />
      <CyclesDiagram l={l} />
      <AnimalWheel l={l} currentYear={currentYear} />
      <ElementCards l={l} lang={lang} />
    </>
  )
}
