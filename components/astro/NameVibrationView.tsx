'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { MASTER, NameReading, letters, readName } from '@/lib/numerology'
import { KARMIC, NUMBERS, POSITIONS } from '@/lib/numerology-data'
import { Locale } from '@/lib/types'
import { loadBirthData } from './BirthForm'

const card = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  boxShadow: 'var(--shadow-card)',
} as const

const inputStyle = {
  border: '1px solid var(--color-earth-200)',
  backgroundColor: '#fff',
  color: 'var(--color-text-primary)',
} as const

const T = {
  en: {
    title: 'Enter your name',
    first: 'First name',
    last: 'Surname',
    birth: 'Date of birth (optional — for the life path)',
    submit: 'Reveal the vibration',
    missing: 'Please enter at least your first name.',
    letters: 'Letter by letter',
    lettersCaption: 'Every letter carries a number (Pythagorean system). Vowels (highlighted) speak of the soul, consonants of the outer personality.',
    yourNumbers: 'Your numbers',
    profile: 'The vibration of your name',
    essence: 'Essence',
    feel: 'How it feels to others',
    gifts: 'Gifts',
    shadow: 'Shadow',
    love: 'Love',
    work: 'Work and calling',
    tip: 'Tip',
    color: 'Colour',
    planet: 'Planet',
    chakra: 'Chakra',
    practice: 'Practice for this chakra',
    spectrum: 'Energy spectrum of your name',
    spectrumCaption: 'How many letters carry each number — the stronger the bar, the stronger this energy in your name.',
    master: 'Master number',
    moreProfiles: 'Read about your other numbers',
    total: 'Full name',
    compareTitle: 'Name and surname together',
    harmony: 'Same vibration — your name and surname reinforce each other.',
    blend: 'Different vibrations — your name (personal self) and surname (family and public self) bring two energies together.',
    note: 'Numerology is a symbolic, contemplative tradition — not a science. Use it as an invitation to reflect, not as a fixed label.',
    reduce: 'Sum',
  },
  lt: {
    title: 'Įveskite savo vardą',
    first: 'Vardas',
    last: 'Pavardė',
    birth: 'Gimimo data (nebūtina — gyvenimo keliui)',
    submit: 'Atskleisti vibraciją',
    missing: 'Įveskite bent vardą.',
    letters: 'Raidė po raidės',
    lettersCaption: 'Kiekviena raidė turi skaičių (Pitagoro sistema). Balsės (paryškintos) kalba apie sielą, priebalsės — apie išorinę asmenybę.',
    yourNumbers: 'Jūsų skaičiai',
    profile: 'Jūsų vardo vibracija',
    essence: 'Esmė',
    feel: 'Kaip ji jaučiasi kitiems',
    gifts: 'Dovanos',
    shadow: 'Šešėlis',
    love: 'Meilė',
    work: 'Darbas ir pašaukimas',
    tip: 'Patarimas',
    color: 'Spalva',
    planet: 'Planeta',
    chakra: 'Čakra',
    practice: 'Šios čakros praktika',
    spectrum: 'Jūsų vardo energijos spektras',
    spectrumCaption: 'Kiek raidžių neša kiekvieną skaičių — kuo ilgesnė juosta, tuo stipresnė ta energija jūsų varde.',
    master: 'Meistriškas skaičius',
    moreProfiles: 'Skaitykite apie kitus savo skaičius',
    total: 'Visas vardas',
    compareTitle: 'Vardas ir pavardė kartu',
    harmony: 'Ta pati vibracija — vardas ir pavardė vienas kitą sustiprina.',
    blend: 'Skirtingos vibracijos — vardas (asmeninis „aš“) ir pavardė (giminė ir viešas „aš“) sujungia dvi energijas.',
    note: 'Numerologija — simbolinė, kontempliatyvi tradicija, o ne mokslas. Naudokite ją kaip kvietimą apmąstyti, o ne kaip nekintančią etiketę.',
    reduce: 'Suma',
  },
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{children}</h2>
  )
}

function NumberBadge({ n, size = 56 }: { n: number; size?: number }) {
  const m = NUMBERS[n]
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        backgroundColor: `${m.color.hex}1a`,
        color: m.color.hex,
        border: `2px solid ${m.color.hex}55`,
        fontFamily: 'var(--font-display)',
      }}
    >
      {n}
    </span>
  )
}

function Profile({ n, locale, lang, t }: { n: number; locale: Locale; lang: string; t: (typeof T)['en'] }) {
  const m = NUMBERS[n]
  const txt = { color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-semibold mb-1" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>{t.essence}</p>
        <p className="leading-relaxed" style={txt}>{m.essence[locale]}</p>
      </div>
      <div>
        <p className="font-semibold mb-1" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>{t.feel}</p>
        <p className="leading-relaxed" style={txt}>{m.feel[locale]}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-semibold mb-1" style={{ color: '#15803d', fontFamily: 'var(--font-ui)' }}>{t.gifts}</p>
          <ul className="list-disc pl-5 text-sm leading-relaxed" style={txt}>{m.gifts[locale].map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div>
          <p className="font-semibold mb-1" style={{ color: '#b45309', fontFamily: 'var(--font-ui)' }}>{t.shadow}</p>
          <ul className="list-disc pl-5 text-sm leading-relaxed" style={txt}>{m.shadow[locale].map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={txt}>
        <strong>{t.love}:</strong> {m.love[locale]}
        <br />
        <strong>{t.work}:</strong> {m.work[locale]}
        <br />
        <strong style={{ color: 'var(--color-forest-700)' }}>{t.tip}:</strong> {m.tip[locale]}
      </p>
      <div className="flex flex-wrap gap-2 text-xs" style={{ fontFamily: 'var(--font-ui)' }}>
        <span className="rounded-full px-3 py-1 inline-flex items-center gap-1.5" style={{ backgroundColor: 'var(--color-earth-50)' }}>
          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: m.color.hex }} /> {t.color}: {m.color.name[locale]}
        </span>
        <span className="rounded-full px-3 py-1" style={{ backgroundColor: 'var(--color-earth-50)' }}>{t.planet}: {m.planet[locale]}</span>
        <Link
          href={`/${lang}/techniques/${m.chakra.category}/${m.chakra.slug}`}
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: 'var(--color-forest-50)', color: 'var(--color-forest-700)' }}
        >
          {t.chakra}: {m.chakra.name[locale]} → {t.practice}
        </Link>
      </div>
    </div>
  )
}

export default function NameVibrationView({ lang }: { lang: string }) {
  const locale = lang as Locale
  const t = T[locale]
  const [initial] = useState(() => {
    const saved = loadBirthData()
    const parts = (saved?.name ?? '').trim().split(/\s+/)
    return { first: parts[0] ?? '', last: parts.slice(1).join(' '), date: saved?.date ?? '' }
  })
  const [first, setFirst] = useState(initial.first)
  const [last, setLast] = useState(initial.last)
  const [date, setDate] = useState(initial.date)
  const [error, setError] = useState(false)
  const [reading, setReading] = useState<{ r: NameReading; first: string; last: string } | null>(() =>
    initial.first ? { r: readName(initial.first, initial.last, initial.date), first: initial.first, last: initial.last } : null
  )

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!first.trim()) {
      setError(true)
      return
    }
    setError(false)
    setReading({ r: readName(first, last, date), first: first.trim(), last: last.trim() })
  }

  return (
    <div>
      <form onSubmit={submit} className="rounded-2xl p-6 sm:p-8 mb-10" style={{ ...card, fontFamily: 'var(--font-ui)' }}>
        <h2 className="text-2xl font-semibold mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{t.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.first}</span>
            <input value={first} onChange={(e) => setFirst(e.target.value)} className="rounded-xl px-4 py-3 text-base" style={inputStyle} autoComplete="given-name" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.last}</span>
            <input value={last} onChange={(e) => setLast(e.target.value)} className="rounded-xl px-4 py-3 text-base" style={inputStyle} autoComplete="family-name" />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.birth}</span>
            <input type="date" value={date} min="1900-01-01" max="2100-12-31" onChange={(e) => setDate(e.target.value)} className="rounded-xl px-4 py-3 text-base" style={inputStyle} />
          </label>
        </div>
        {error && <p className="mt-3 text-sm" style={{ color: '#b91c1c' }}>{t.missing}</p>}
        <button
          type="submit"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
        >
          <Sparkles size={16} /> {t.submit}
        </button>
      </form>

      {reading && <Result key={reading.first + reading.last + date} {...reading} locale={locale} lang={lang} t={t} />}

      <p className="mt-8 p-5 rounded-xl text-sm leading-relaxed" style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)', color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}>
        {t.note}
      </p>
    </div>
  )
}

function Result({ r, first, last, locale, lang, t }: { r: NameReading; first: string; last: string; locale: Locale; lang: string; t: (typeof T)['en'] }) {
  const main = NUMBERS[r.expression]
  const others = [
    r.first.expression,
    r.last?.expression,
    r.soul,
    r.personality,
    r.lifePath ?? undefined,
  ].filter((n, i, a): n is number => n !== undefined && n !== r.expression && a.indexOf(n) === i)

  const numberCards: { key: string; label: string; explain: string; n: number }[] = [
    { key: 'first', label: `${POSITIONS.firstName.name[locale]}: ${first}`, explain: POSITIONS.firstName.explain[locale], n: r.first.expression },
    ...(r.last ? [{ key: 'last', label: `${POSITIONS.lastName.name[locale]}: ${last}`, explain: POSITIONS.lastName.explain[locale], n: r.last.expression }] : []),
    { key: 'soul', label: POSITIONS.soul.name[locale], explain: POSITIONS.soul.explain[locale], n: r.soul },
    { key: 'pers', label: POSITIONS.personality.name[locale], explain: POSITIONS.personality.explain[locale], n: r.personality },
    ...(r.lifePath ? [{ key: 'lp', label: POSITIONS.lifePath.name[locale], explain: POSITIONS.lifePath.explain[locale], n: r.lifePath }] : []),
    ...(r.maturity ? [{ key: 'mat', label: POSITIONS.maturity.name[locale], explain: POSITIONS.maturity.explain[locale], n: r.maturity }] : []),
  ]

  const maxCount = Math.max(1, ...r.counts)

  return (
    <div>
      {/* Main vibration */}
      <section className="mb-12 rounded-2xl p-6 sm:p-8" style={{ background: `linear-gradient(135deg, ${main.color.hex}14, var(--color-gold-50))`, border: `1px solid ${main.color.hex}40` }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
          {POSITIONS.expression.name[locale]} · {t.total}
        </p>
        <div className="flex items-center gap-4 mb-3">
          <NumberBadge n={r.expression} size={80} />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              {first} {last}
            </h2>
            <p className="text-lg font-semibold" style={{ color: main.color.hex, fontFamily: 'var(--font-ui)' }}>
              {main.title[locale]} {MASTER.has(r.expression) && '✦'}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{main.keywords[locale]}</p>
          </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{POSITIONS.expression.explain[locale]}</p>
      </section>

      {/* Letters */}
      <section className="mb-12">
        <H2>{t.letters}</H2>
        <p className="mb-5 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{t.lettersCaption}</p>
        {[{ word: first, part: r.first }, ...(r.last ? [{ word: last, part: r.last }] : [])].map(({ word, part }) => (
          <div key={word} className="mb-4 rounded-xl p-4 overflow-x-auto" style={card}>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {letters(word)
                .filter((l) => l.value !== null)
                .map((l, i) => (
                  <span
                    key={i}
                    className="flex w-10 flex-col items-center rounded-lg py-1.5"
                    style={{
                      backgroundColor: l.vowel ? 'var(--color-gold-50)' : '#fff',
                      border: `1px solid ${l.vowel ? 'var(--color-gold-400)' : 'var(--color-earth-200)'}`,
                      fontFamily: 'var(--font-ui)',
                    }}
                  >
                    <span className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{l.char.toUpperCase()}</span>
                    <span className="text-xs font-bold" style={{ color: NUMBERS[l.value as number].color.hex }}>{l.value}</span>
                  </span>
                ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
              {t.reduce}: {part.rawExpression} → <strong style={{ color: NUMBERS[part.expression].color.hex }}>{part.expression}</strong> ({NUMBERS[part.expression].title[locale]})
            </p>
          </div>
        ))}
        {r.last && (
          <p className="text-sm rounded-lg p-3" style={{ backgroundColor: 'var(--color-forest-50)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            <strong>{t.compareTitle}:</strong> {r.first.expression} + {r.last.expression} → <strong>{r.expression}</strong>.{' '}
            {r.first.expression === r.last.expression ? t.harmony : t.blend}
          </p>
        )}
      </section>

      {/* Numbers overview */}
      <section className="mb-12">
        <H2>{t.yourNumbers}</H2>
        <div className="grid gap-3 sm:grid-cols-2">
          {numberCards.map((c) => (
            <div key={c.key} className="rounded-xl p-4 flex gap-3" style={card}>
              <NumberBadge n={c.n} size={48} />
              <div>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{c.label}</p>
                <p className="text-sm font-medium mb-1" style={{ color: NUMBERS[c.n].color.hex, fontFamily: 'var(--font-ui)' }}>
                  {NUMBERS[c.n].title[locale]} · {NUMBERS[c.n].keywords[locale]}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>{c.explain}</p>
              </div>
            </div>
          ))}
          {r.cornerstone && (
            <div className="rounded-xl p-4 flex gap-3" style={card}>
              <NumberBadge n={r.cornerstone.value} size={48} />
              <div>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
                  {POSITIONS.cornerstone.name[locale]}: {r.cornerstone.char}
                </p>
                <p className="text-sm font-medium mb-1" style={{ color: NUMBERS[r.cornerstone.value].color.hex, fontFamily: 'var(--font-ui)' }}>
                  {NUMBERS[r.cornerstone.value].keywords[locale]}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>{POSITIONS.cornerstone.explain[locale]}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main profile */}
      <section className="mb-12 rounded-2xl p-6" style={card}>
        <div className="flex items-center gap-3 mb-4">
          <NumberBadge n={r.expression} />
          <H2>
            {t.profile}: {main.title[locale]}
          </H2>
        </div>
        <Profile n={r.expression} locale={locale} lang={lang} t={t} />
      </section>

      {/* Other numbers */}
      {others.length > 0 && (
        <section className="mb-12">
          <H2>{t.moreProfiles}</H2>
          <div className="flex flex-col gap-3 mt-4">
            {others.map((n) => (
              <details key={n} className="rounded-xl p-5" style={card}>
                <summary className="cursor-pointer list-none flex items-center gap-3">
                  <NumberBadge n={n} size={40} />
                  <span className="font-semibold" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-primary)' }}>
                    {NUMBERS[n].title[locale]} <span className="font-normal text-sm" style={{ color: 'var(--color-text-muted)' }}>· {NUMBERS[n].keywords[locale]}</span>
                  </span>
                </summary>
                <div className="mt-4">
                  <Profile n={n} locale={locale} lang={lang} t={t} />
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Spectrum */}
      <section className="mb-12">
        <H2>{t.spectrum}</H2>
        <p className="mb-5 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{t.spectrumCaption}</p>
        <div className="rounded-xl p-5" style={card}>
          {r.counts.map((c, i) => {
            const n = i + 1
            return (
              <div key={n} className="flex items-center gap-3 mb-2" style={{ fontFamily: 'var(--font-ui)' }}>
                <span className="w-5 text-right font-bold" style={{ color: NUMBERS[n].color.hex }}>{n}</span>
                <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(c / maxCount) * 100}%`, backgroundColor: NUMBERS[n].color.hex }} />
                </div>
                <span className="w-28 sm:w-40 text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                  {c} · {NUMBERS[n].title[locale]}
                </span>
              </div>
            )
          })}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
            <div>
              <p className="font-semibold mb-1" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>{POSITIONS.hiddenPassion.name[locale]}</p>
              <p className="mb-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>{POSITIONS.hiddenPassion.explain[locale]}</p>
              {r.hiddenPassion.map((n) => (
                <p key={n}>
                  <strong style={{ color: NUMBERS[n].color.hex }}>{n} — {NUMBERS[n].title[locale]}:</strong> {NUMBERS[n].keywords[locale]}
                </p>
              ))}
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#b45309', fontFamily: 'var(--font-ui)' }}>{POSITIONS.karmic.name[locale]}</p>
              <p className="mb-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>{POSITIONS.karmic.explain[locale]}</p>
              {r.missing.length === 0 ? (
                <p>—</p>
              ) : (
                r.missing.map((n) => (
                  <p key={n} className="mb-1">
                    <strong style={{ color: NUMBERS[n].color.hex }}>{n}:</strong> {KARMIC[n][locale]}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
