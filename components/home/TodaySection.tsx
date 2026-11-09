'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

export type TodaySign = {
  slug: string
  symbol: string
  name: string
  archetype: string
  motto: string
  overview: string
  keywords: string[]
  start: [number, number]
  end: [number, number]
}

export type TodayDish = { id: string; icon: string; name: string; angstrom: number; harmony: number; color: string }

export type TodaySeason = { id: string; icon: string; label: string; dishes: TodayDish[] }

const ui = { fontFamily: 'var(--font-ui)' }
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/** Today's date as "M-D" on the client; null during server rendering. */
const subscribe = () => () => {}
const getToday = () => {
  const d = new Date()
  return `${d.getMonth() + 1}-${d.getDate()}`
}

function signFor(signs: TodaySign[], m: number, d: number): TodaySign {
  const v = m * 100 + d
  return (
    signs.find((s) => {
      const a = s.start[0] * 100 + s.start[1]
      const b = s.end[0] * 100 + s.end[1]
      return a <= b ? v >= a && v <= b : v >= a || v <= b
    }) ?? signs[0]
  )
}

function seasonFor(m: number): string {
  return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter'
}

export default function TodaySection({ lang, signs, seasons }: { lang: string; signs: TodaySign[]; seasons: TodaySeason[] }) {
  const l = lang === 'lt' ? 'lt' : 'en'
  const today = useSyncExternalStore(subscribe, getToday, () => null)
  if (!today) return <div className="min-h-[24rem]" style={{ backgroundColor: 'var(--color-earth-50)' }} />

  const [m, d] = today.split('-').map(Number)
  const sign = signFor(signs, m, d)
  const seasonInfo = seasons.find((s) => s.id === seasonFor(m)) ?? seasons[0]
  const dishes = seasonInfo.dishes

  return (
    <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-earth-50)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
            {new Date().toLocaleDateString(l === 'lt' ? 'lt-LT' : 'en-GB', { day: 'numeric', month: 'long' })}
          </p>
          <h2 className="text-4xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            {l === 'lt' ? 'Šiandienos energija' : 'Today’s energy'}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Link
            href={`/${lang}/zodiac/${sign.slug}`}
            className="lg:col-span-2 rounded-3xl p-7 flex flex-col transition-transform hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(150deg, #2b2752, #4a4580)', color: '#fff' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide opacity-75" style={ui}>
              {l === 'lt' ? 'Saulė dabar ženkle' : 'The Sun is now in'}
            </p>
            <div className="flex items-center gap-4 my-3">
              <span className="text-6xl leading-none" style={{ color: 'var(--color-gold-200)' }} aria-hidden="true">{sign.symbol}</span>
              <div>
                <p className="text-4xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{sign.name}</p>
                <p className="text-sm opacity-80" style={ui}>{sign.archetype} · „{sign.motto}“</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90 mb-4" style={{ fontFamily: 'var(--font-body)' }}>{sign.overview}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {sign.keywords.map((k) => (
                <span key={k} className="text-xs px-2.5 py-1 rounded-full" style={{ ...ui, backgroundColor: 'rgba(255,255,255,0.12)' }}>{k}</span>
              ))}
            </div>
            <span className="mt-auto text-sm font-semibold" style={{ ...ui, color: 'var(--color-gold-200)' }}>
              {l === 'lt' ? 'Sezono ženklo profilis' : 'This season’s sign'} →
            </span>
          </Link>

          <div className="lg:col-span-3 rounded-3xl p-7" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-text-muted)' }}>
              {seasonInfo.icon} {l === 'lt' ? `${seasonInfo.label} lėkštėje` : `${seasonInfo.label} on the plate`}
            </p>
            <h3 className="text-2xl font-semibold mt-1 mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              {l === 'lt' ? 'Sezono simbiotiniai patiekalai' : 'Symbiotic dishes of the season'}
            </h3>
            <ul className="space-y-3 mb-5">
              {dishes.map((dish) => {
                return (
                  <li key={dish.id}>
                    <Link
                      href={`/${lang}/food-menu#${dish.id}`}
                      className="grid items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:opacity-90"
                      style={{ gridTemplateColumns: 'auto 1fr auto', backgroundColor: 'var(--color-earth-50)', border: '1px solid var(--color-earth-200)' }}
                    >
                      <span className="text-2xl" aria-hidden="true">{dish.icon}</span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>{dish.name}</span>
                        <span className="block text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>
                          {l === 'lt' ? 'Harmonija' : 'Harmony'} {dish.harmony}%
                        </span>
                      </span>
                      <span className="text-sm font-semibold tabular-nums whitespace-nowrap" style={{ ...ui, color: dish.color }}>{fmt(dish.angstrom)} Å</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Link href={`/${lang}/food-menu`} className="text-sm font-semibold" style={{ ...ui, color: 'var(--color-forest-700)' }}>
              {l === 'lt' ? 'Visas simbiotinis meniu' : 'The full symbiotic menu'} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
