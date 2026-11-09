'use client'

import { useMemo, useState } from 'react'
import { BODY_ANGSTROM, FOOD_TIERS, SCALE_MAX } from '@/lib/food-angstrom'
import { FOOD_GROUPS, RATING_STYLE } from '@/lib/food-combining'
import { DIETS, MEALS, MENU, SEASONS, type Diet, type Dish, type Meal, type Season } from '@/lib/food-menu'
import { Meter, fmtA, harmonyColor } from './Meter'

const ui = { fontFamily: 'var(--font-ui)' }
type L = 'en' | 'lt'
type Sort = 'angstrom' | 'harmony'

const groupIcon = (id: string) => FOOD_GROUPS.find((g) => g.id === id)!.icon
const groupName = (id: string, l: L) => FOOD_GROUPS.find((g) => g.id === id)!.name[l]
function DishCard({ dish, l }: { dish: Dish; l: L }) {
  const tier = FOOD_TIERS.find((t) => t.id === dish.tierId)!
  const meal = MEALS.find((m) => m.id === dish.meal)!
  const hLabel =
    dish.pairs.length === 0
      ? l === 'lt' ? 'Vienos grupės — tobula' : 'Single group — perfect'
      : dish.harmony === 100
        ? l === 'lt' ? 'Pilna simbiozė' : 'Full symbiosis'
        : dish.harmony >= 70
          ? l === 'lt' ? 'Darnus derinys' : 'Harmonious'
          : l === 'lt' ? 'Saikingas derinys' : 'Moderate'

  return (
    <article id={dish.id} className="scroll-mt-24 rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
      <div className="px-5 pt-5 pb-4" style={{ borderTop: `5px solid ${tier.color}` }}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ ...ui, backgroundColor: 'var(--color-earth-50)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }}>
            {meal.icon} {meal.label[l]}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ ...ui, backgroundColor: tier.color, color: tier.textColor }}>
            {tier.title[l]}
          </span>
        </div>
        <h3 className="text-2xl font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          <span aria-hidden="true">{dish.icon}</span> {dish.name[l]}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {dish.diets.map((d) => {
            const x = DIETS.find((y) => y.id === d)!
            return (
              <span key={d} className="text-[11px] px-2 py-0.5 rounded-full" style={{ ...ui, backgroundColor: 'var(--color-forest-50)', color: 'var(--color-forest-700)', border: '1px solid var(--color-forest-200)' }}>
                {x.label[l]}
              </span>
            )
          })}
          {(dish.seasons.length ? dish.seasons : (['all'] as const)).map((s) => {
            const x = SEASONS.find((y) => y.id === s)
            return (
              <span key={s} className="text-[11px] px-2 py-0.5 rounded-full" style={{ ...ui, backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', border: '1px solid var(--color-gold-200)' }}>
                {x ? `${x.icon} ${x.label[l]}` : l === 'lt' ? '📅 Visus metus' : '📅 All year'}
              </span>
            )
          })}
        </div>
      </div>

      <div className="px-5 grid gap-4 sm:grid-cols-2 mb-4">
        <Meter
          label={l === 'lt' ? 'Vibracija' : 'Vibration'}
          value={`${fmtA(dish.angstrom)} Å`}
          pct={(dish.angstrom / SCALE_MAX) * 100}
          marker={(BODY_ANGSTROM / SCALE_MAX) * 100}
          color={tier.color}
          note={dish.angstrom >= BODY_ANGSTROM ? (l === 'lt' ? 'Virš kūno 6 500 Å — pakelia' : 'Above the body’s 6,500 Å — lifts') : (l === 'lt' ? 'Žemiau kūno 6 500 Å — palaiko' : 'Below the body’s 6,500 Å — sustains')}
        />
        <Meter label={l === 'lt' ? 'Harmonija' : 'Harmony'} value={`${dish.harmony}%`} pct={dish.harmony} color={harmonyColor(dish.harmony)} note={hLabel} />
      </div>

      <div className="px-5 mb-4">
        <table className="w-full text-sm" style={ui}>
          <tbody>
            {dish.ingredients.map(({ food, grams }) => (
              <tr key={food.id} style={{ borderTop: '1px solid var(--color-earth-200)' }}>
                <td className="py-1.5 pr-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{food.name[l]}</td>
                <td className="py-1.5 pr-2 text-right tabular-nums whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{grams} g</td>
                <td className="py-1.5 text-right tabular-nums whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{fmtA(food.angstrom)} Å</td>
              </tr>
            ))}
            <tr style={{ borderTop: '2px solid var(--color-earth-200)' }}>
              <td className="py-1.5 pr-2 font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{l === 'lt' ? 'Iš viso' : 'Total'}</td>
              <td className="py-1.5 pr-2 text-right tabular-nums font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{dish.grams} g</td>
              <td className="py-1.5 text-right tabular-nums font-semibold" style={{ color: tier.color }}>{fmtA(dish.angstrom)} Å</td>
            </tr>
          </tbody>
        </table>
      </div>

      {dish.pairs.length > 0 && (
        <div className="px-5 mb-4 flex flex-wrap gap-1.5">
          {dish.pairs.map((p) => {
            const s = RATING_STYLE[p.rating]
            return (
              <span key={p.a + p.b} className="text-xs px-2 py-0.5 rounded-full" style={{ ...ui, backgroundColor: s.bg, color: s.color }} title={`${groupName(p.a, l)} + ${groupName(p.b, l)}: ${s.label[l]}`}>
                {groupIcon(p.a)}+{groupIcon(p.b)} {s.symbol}
              </span>
            )
          })}
        </div>
      )}

      <div className="mt-auto px-5 py-4 text-sm leading-relaxed" style={{ backgroundColor: 'var(--color-forest-50)', borderTop: '1px solid var(--color-forest-200)', fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
        <p className="mb-2">
          <strong style={{ ...ui, color: 'var(--color-forest-700)' }}>{l === 'lt' ? 'Simbiozė: ' : 'Symbiosis: '}</strong>
          {dish.synergy[l]}
        </p>
        <p>
          <strong style={{ ...ui, color: 'var(--color-forest-700)' }}>{l === 'lt' ? 'Kaip: ' : 'How: '}</strong>
          {dish.how[l]}
        </p>
      </div>
    </article>
  )
}

export default function SymbioticMenu({ lang }: { lang: string }) {
  const l: L = lang === 'lt' ? 'lt' : 'en'
  const [meal, setMeal] = useState<Meal | 'all'>('all')
  const [diet, setDiet] = useState<Diet | 'all'>('all')
  const [season, setSeason] = useState<Season | 'all'>('all')
  const [sort, setSort] = useState<Sort>('angstrom')

  const dishes = useMemo(() => {
    const list = MENU.filter(
      (d) =>
        (meal === 'all' || d.meal === meal) &&
        (diet === 'all' || d.diets.includes(diet)) &&
        (season === 'all' || d.seasons.length === 0 || d.seasons.includes(season)),
    )
    return [...list].sort((a, b) => (sort === 'angstrom' ? b.angstrom - a.angstrom : b.harmony - a.harmony || b.angstrom - a.angstrom))
  }, [meal, diet, season, sort])

  const chip = (active: boolean) =>
    active
      ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
      : { ...ui, backgroundColor: 'var(--color-cream)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }

  const row = (label: string, children: React.ReactNode) => (
    <div className="flex flex-wrap items-center gap-2 mb-3 text-sm" style={ui}>
      <span className="w-full sm:w-24 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      {children}
    </div>
  )

  const avgA = dishes.length ? Math.round(dishes.reduce((s, d) => s + d.angstrom, 0) / dishes.length / 50) * 50 : 0
  const avgH = dishes.length ? Math.round(dishes.reduce((s, d) => s + d.harmony, 0) / dishes.length) : 0

  return (
    <div>
      <div className="rounded-2xl p-4 mb-6" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
        {row(l === 'lt' ? 'Valgis' : 'Meal', (
          <>
            <button onClick={() => setMeal('all')} className="rounded-full px-3 py-1.5 font-medium" style={chip(meal === 'all')}>{l === 'lt' ? 'Visi' : 'All'}</button>
            {MEALS.map((m) => (
              <button key={m.id} onClick={() => setMeal(m.id)} className="rounded-full px-3 py-1.5 font-medium" style={chip(meal === m.id)}>{m.icon} {m.label[l]}</button>
            ))}
          </>
        ))}
        {row(l === 'lt' ? 'Mityba' : 'Diet', (
          <>
            <button onClick={() => setDiet('all')} className="rounded-full px-3 py-1.5 font-medium" style={chip(diet === 'all')}>{l === 'lt' ? 'Visi' : 'All'}</button>
            {DIETS.map((d) => (
              <button key={d.id} onClick={() => setDiet(d.id)} className="rounded-full px-3 py-1.5 font-medium" style={chip(diet === d.id)}>{d.icon} {d.label[l]}</button>
            ))}
          </>
        ))}
        {row(l === 'lt' ? 'Sezonas' : 'Season', (
          <>
            <button onClick={() => setSeason('all')} className="rounded-full px-3 py-1.5 font-medium" style={chip(season === 'all')}>{l === 'lt' ? 'Visi' : 'All'}</button>
            {SEASONS.map((s) => (
              <button key={s.id} onClick={() => setSeason(s.id)} className="rounded-full px-3 py-1.5 font-medium" style={chip(season === s.id)}>{s.icon} {s.label[l]}</button>
            ))}
          </>
        ))}
        {row(l === 'lt' ? 'Rikiuoti' : 'Sort', (
          <>
            <button onClick={() => setSort('angstrom')} className="rounded-full px-3 py-1.5 font-medium" style={chip(sort === 'angstrom')}>{l === 'lt' ? 'Pagal vibraciją' : 'By vibration'}</button>
            <button onClick={() => setSort('harmony')} className="rounded-full px-3 py-1.5 font-medium" style={chip(sort === 'harmony')}>{l === 'lt' ? 'Pagal harmoniją' : 'By harmony'}</button>
          </>
        ))}
      </div>

      <p className="mb-6 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        {l === 'lt' ? `Patiekalų: ${dishes.length}` : `${dishes.length} dishes`}
        {dishes.length > 0 && (l === 'lt' ? ` · vidutinė vibracija ${fmtA(avgA)} Å · vidutinė harmonija ${avgH}%` : ` · average vibration ${fmtA(avgA)} Å · average harmony ${avgH}%`)}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {dishes.map((d) => (
          <DishCard key={d.id} dish={d} l={l} />
        ))}
      </div>
      {dishes.length === 0 && (
        <p className="py-10 text-center" style={{ ...ui, color: 'var(--color-text-muted)' }}>
          {l === 'lt' ? 'Pagal šiuos filtrus patiekalų nėra.' : 'No dishes match these filters.'}
        </p>
      )}
    </div>
  )
}
