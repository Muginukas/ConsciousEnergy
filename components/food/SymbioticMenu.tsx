'use client'

import { useMemo, useState } from 'react'
import { BODY_ANGSTROM, FOOD_TIERS, SCALE_MAX } from '@/lib/food-angstrom'
import { FOOD_GROUPS, RATING_STYLE } from '@/lib/food-combining'
import { MEALS, MENU, type Dish, type Meal } from '@/lib/food-menu'

const ui = { fontFamily: 'var(--font-ui)' }
type L = 'en' | 'lt'
type Sort = 'angstrom' | 'harmony'

const groupIcon = (id: string) => FOOD_GROUPS.find((g) => g.id === id)!.icon
const groupName = (id: string, l: L) => FOOD_GROUPS.find((g) => g.id === id)!.name[l]
const fmt = (n: number) => n.toLocaleString('lt-LT').replace(/ /g, ' ')

function Meter({ label, value, display, pct, color, marker }: { label: string; value: string; display?: string; pct: number; color: string; marker?: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1" style={ui}>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <span className="text-lg font-bold tabular-nums" style={{ color }}>{value}</span>
      </div>
      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-earth-200)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        {marker !== undefined && (
          <div className="absolute top-0 bottom-0 w-0.5" style={{ left: `${marker}%`, backgroundColor: 'var(--color-gold-400)' }} />
        )}
      </div>
      {display && <p className="mt-1 text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>{display}</p>}
    </div>
  )
}

function DishCard({ dish, l }: { dish: Dish; l: L }) {
  const tier = FOOD_TIERS.find((t) => t.id === dish.tierId)!
  const meal = MEALS.find((m) => m.id === dish.meal)!
  const hColor = dish.harmony >= 80 ? RATING_STYLE.good.color : dish.harmony >= 50 ? RATING_STYLE.ok.color : RATING_STYLE.bad.color
  const hLabel =
    dish.pairs.length === 0
      ? (l === 'lt' ? 'Valgoma atskirai — tobula' : 'Eaten alone — perfect')
      : dish.harmony === 100
        ? (l === 'lt' ? 'Pilna simbiozė' : 'Full symbiosis')
        : dish.harmony >= 70
          ? (l === 'lt' ? 'Darnus derinys' : 'Harmonious')
          : (l === 'lt' ? 'Saikingas derinys' : 'Moderate')

  return (
    <article className="rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
      <div className="px-5 pt-5 pb-4" style={{ borderTop: `5px solid ${tier.color}` }}>
        <div className="flex items-center justify-between gap-2 mb-2">
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
      </div>

      <div className="px-5 grid gap-4 sm:grid-cols-2 mb-4">
        <Meter
          label={l === 'lt' ? 'Vibracija' : 'Vibration'}
          value={`${fmt(dish.angstrom)} Å`}
          pct={(dish.angstrom / SCALE_MAX) * 100}
          marker={(BODY_ANGSTROM / SCALE_MAX) * 100}
          color={tier.color}
          display={dish.angstrom >= BODY_ANGSTROM ? (l === 'lt' ? 'Virš kūno 6 500 Å — pakelia' : 'Above the body’s 6,500 Å — lifts') : (l === 'lt' ? 'Žemiau kūno 6 500 Å — palaiko' : 'Below the body’s 6,500 Å — sustains')}
        />
        <Meter label={l === 'lt' ? 'Harmonija' : 'Harmony'} value={`${dish.harmony}%`} pct={dish.harmony} color={hColor} display={hLabel} />
      </div>

      <div className="px-5 mb-4">
        <table className="w-full text-sm" style={ui}>
          <tbody>
            {dish.ingredients.map((ing) => (
              <tr key={ing.name.en} style={{ borderTop: '1px solid var(--color-earth-200)' }}>
                <td className="py-1.5 pr-2" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>
                  {ing.name[l]}
                </td>
                <td className="py-1.5 pr-2 text-right tabular-nums whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{ing.grams} g</td>
                <td className="py-1.5 text-right tabular-nums whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{fmt(ing.angstrom)} Å</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dish.pairs.length > 0 && (
        <div className="px-5 mb-4 flex flex-wrap gap-1.5">
          {dish.pairs.map((p) => {
            const s = RATING_STYLE[p.rating]
            return (
              <span
                key={p.a + p.b}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ ...ui, backgroundColor: s.bg, color: s.color }}
                title={`${groupName(p.a, l)} + ${groupName(p.b, l)}: ${s.label[l]}`}
              >
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
  const [sort, setSort] = useState<Sort>('angstrom')

  const dishes = useMemo(() => {
    const list = MENU.filter((d) => meal === 'all' || d.meal === meal)
    return [...list].sort((a, b) => (sort === 'angstrom' ? b.angstrom - a.angstrom : b.harmony - a.harmony || b.angstrom - a.angstrom))
  }, [meal, sort])

  const chip = (active: boolean) =>
    active
      ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
      : { ...ui, backgroundColor: 'var(--color-cream)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button onClick={() => setMeal('all')} className="rounded-full px-3.5 py-2 text-sm font-medium" style={chip(meal === 'all')}>
          {l === 'lt' ? 'Visi' : 'All'}
        </button>
        {MEALS.map((m) => (
          <button key={m.id} onClick={() => setMeal(m.id)} className="rounded-full px-3.5 py-2 text-sm font-medium" style={chip(meal === m.id)}>
            {m.icon} {m.label[l]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-8 text-sm" style={ui}>
        <span style={{ color: 'var(--color-text-muted)' }}>{l === 'lt' ? 'Rikiuoti pagal:' : 'Sort by:'}</span>
        <button onClick={() => setSort('angstrom')} className="rounded-full px-3 py-1 font-medium" style={chip(sort === 'angstrom')}>
          {l === 'lt' ? 'Vibraciją (Å)' : 'Vibration (Å)'}
        </button>
        <button onClick={() => setSort('harmony')} className="rounded-full px-3 py-1 font-medium" style={chip(sort === 'harmony')}>
          {l === 'lt' ? 'Harmoniją' : 'Harmony'}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dishes.map((d) => (
          <DishCard key={d.id} dish={d} l={l} />
        ))}
      </div>
    </div>
  )
}
