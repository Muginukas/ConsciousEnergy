'use client'

import { useMemo, useState } from 'react'
import { FOOD_GROUPS, RATING_STYLE, getPair, type GroupId, type Rating } from '@/lib/food-combining'
import type { Meal } from '@/lib/food-menu'
import { BASES, BASE_SHELVES, kitchenMeal, PANTRY, PANTRY_BY_ID, combosForBase, normalize, pantryGroup, recipeCountForBase, type Recipe } from '@/lib/food-pantry'
import { harmonyColor } from './Meter'

type L = 'en' | 'lt'
const ui = { fontFamily: 'var(--font-ui)' }
const body = { fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }
const display = { fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }
const card = { backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }

const MEAL_FILTERS: (Meal | 'all')[] = ['all', 'breakfast', 'lunch', 'dinner', 'snack']
const RATINGS: Rating[] = ['good', 'ok', 'bad']

const group = (g: GroupId) => FOOD_GROUPS.find((x) => x.id === g)!
const itemName = (id: string, l: L) => PANTRY_BY_ID.get(id)?.name[l] ?? id
const itemIcon = (id: string) => PANTRY_BY_ID.get(id)?.icon ?? '•'

function examples(g: GroupId, l: L, n = 4) {
  return PANTRY.filter((p) => !p.condiment && pantryGroup(p.id) === g)
    .slice(0, n)
    .map((p) => p.name[l].toLowerCase())
    .join(', ')
}

export default function SymbiosisExplorer({ lang }: { lang: string }) {
  const l: L = lang === 'lt' ? 'lt' : 'en'
  const lt = l === 'lt'
  const [baseId, setBaseId] = useState('buckwheat')
  const [meal, setMeal] = useState<Meal | 'all'>('all')
  const [query, setQuery] = useState('')

  const bases = useMemo(() => BASES.map((b) => ({ ...b, count: recipeCountForBase(b.id) })).filter((b) => b.count > 0), [])
  const base = BASES.find((b) => b.id === baseId)!
  // Cacao, chocolate, honey and syrup carry no combining group.
  const baseGroup = pantryGroup(base.ids[0])
  const combos = useMemo(() => combosForBase(baseId, meal), [baseId, meal])
  const counts = useMemo(
    () => Object.fromEntries(MEAL_FILTERS.map((m) => [m, combosForBase(baseId, m).reduce((n, c) => n + c.recipes.length, 0)])),
    [baseId],
  )

  // Search by any name or alias of the base's pantry items ("varškė", "varškės", "curd").
  const q = normalize(query)
  const matchesQuery = (b: (typeof BASES)[number]) =>
    !q ||
    b.ids.some((id) => {
      const p = PANTRY_BY_ID.get(id)
      return !!p && [p.name.lt, p.name.en, ...(p.aliases ?? [])].some((n) => normalize(n).split(/\s+/).some((w) => w.startsWith(q.slice(0, Math.max(3, q.length - 2)))))
    })
  const shown = bases.filter(matchesQuery)

  const byRating = (r: Rating) => (baseGroup ? FOOD_GROUPS.filter((g) => getPair(baseGroup, g.id).rating === r) : [])

  return (
    <div>
      {/* Base picker */}
      <p className="mb-2 text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-secondary)' }}>
        {lt ? '1. Pasirink pagrindinį produktą' : '1. Choose a main ingredient'}
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={lt ? '🔍 Ieškok produkto, pvz.: varškė' : '🔍 Search, e.g. cottage cheese'}
        aria-label={lt ? 'Ieškoti produkto' : 'Search ingredient'}
        className="mb-4 w-full rounded-xl px-4 py-3 text-base outline-none focus:ring-2"
        style={{ ...ui, ...card, color: 'var(--color-text-primary)' }}
        autoComplete="off"
      />
      <div className="mb-8 space-y-4">
        {shown.length === 0 && (
          <p className="text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
            {lt ? 'Tokio produkto receptų dar nėra.' : 'No recipes for that ingredient yet.'}
          </p>
        )}
        {BASE_SHELVES.map((shelf) => {
          const items = shown.filter((b) => b.shelf === shelf.id)
          if (items.length === 0) return null
          return (
            <div key={shelf.id}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-text-muted)' }}>
                {shelf.name[l]}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((b) => {
                  const active = b.id === baseId
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        setBaseId(b.id)
                        setQuery('')
                      }}
                      aria-pressed={active}
                      className="rounded-full px-3 py-1.5 text-sm transition-colors"
                      style={
                        active
                          ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
                          : { ...ui, ...card, color: 'var(--color-text-secondary)' }
                      }
                    >
                      {itemIcon(b.id)} {b.label?.[l] ?? itemName(b.id, l)} <span style={{ opacity: 0.7 }}>({b.count})</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Symbiosis map for the base */}
      <section className="mb-10 rounded-2xl p-5 sm:p-6" style={card}>
        <h2 className="mb-1 text-2xl font-semibold" style={display}>
          {itemIcon(base.id)} {lt ? `Su kuo dera ${(base.label?.[l] ?? itemName(base.id, l)).toLowerCase()}?` : `What goes with ${(base.label?.[l] ?? itemName(base.id, l)).toLowerCase()}?`}
        </h2>
        {!baseGroup ? (
          <div className="mt-3 space-y-2 text-sm leading-relaxed" style={body}>
            <p>
              {lt
                ? 'Kakava, šokoladas, medus ir sirupas neturi savo derinių grupės — patys jokio konflikto nesukelia. Svarbu, su kuo juos sujungi:'
                : 'Cacao, chocolate, honey and syrup have no combining group of their own — they cause no clash by themselves. What matters is what you pair them with:'}
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{lt ? '✓ Puikiai: su datulėmis, bananais, riešutais, sėklomis, avokadu, kokosu.' : '✓ Great with dates, bananas, nuts, seeds, avocado, coconut.'}</li>
              <li>{lt ? '~ Saikingai: su kruopomis (avižomis, grikiais) ir pienu ar kefyru.' : '~ Moderate with grains (oats, buckwheat) and milk or kefir.'}</li>
              <li>{lt ? '✕ Venk: saldumynų iškart po mėsos, žuvies ar kiaušinių — cukrus už lėtų baltymų rūgsta.' : '✕ Avoid sweets straight after meat, fish or eggs — sugar held behind slow protein ferments.'}</li>
            </ul>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {lt ? 'Rinkis žalią kakavą ir juodąjį šokoladą (70 %+); medų dėk tik į šiltą, ne karštą maistą.' : 'Choose raw cacao and dark chocolate (70%+); add honey only to warm, not hot, food.'}
            </p>
          </div>
        ) : (
        <>
        <p className="mb-4 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
          {lt ? 'Grupė: ' : 'Group: '}
          {group(baseGroup).icon} {group(baseGroup).name[l]}
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {RATINGS.map((r) => {
            const s = RATING_STYLE[r]
            const title =
              r === 'good'
                ? lt ? '✓ Simbiozė — dėk drąsiai' : '✓ Symbiosis — add freely'
                : r === 'ok'
                  ? lt ? '~ Saikingai — nedaug' : '~ In moderation'
                  : lt ? '✕ Nedera — atskirai' : '✕ Keep apart'
            return (
              <div key={r} className="rounded-xl p-4" style={{ backgroundColor: s.bg }}>
                <p className="mb-2 text-sm font-bold" style={{ ...ui, color: s.color }}>{title}</p>
                <ul className="space-y-2">
                  {byRating(r).map((g) => {
                    const note = getPair(baseGroup, g.id).note
                    return (
                      <li key={g.id} className="text-sm leading-snug">
                        <span className="font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                          {g.icon} {g.name[l]}
                          {g.id === baseGroup && <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}> {lt ? '(tarpusavyje)' : '(with each other)'}</span>}
                        </span>
                        <span className="block text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>
                          {examples(g.id, l)}
                        </span>
                        {note && r !== 'good' && <span className="mt-0.5 block text-xs" style={body}>{note[l]}</span>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        </>
        )}
      </section>

      {/* Meal filter */}
      <p className="mb-2 text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-secondary)' }}>
        {lt ? '2. Kokiam valgiui?' : '2. Which meal?'}
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {MEAL_FILTERS.map((m) => {
          const active = m === meal
          const label = m === 'all' ? (lt ? 'Visi' : 'All') : `${kitchenMeal(m).icon} ${kitchenMeal(m).label[l]}`
          return (
            <button
              key={m}
              onClick={() => setMeal(m)}
              aria-pressed={active}
              disabled={counts[m] === 0}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40"
              style={active ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' } : { ...ui, ...card, color: 'var(--color-text-secondary)' }}
            >
              {label} ({counts[m]})
            </button>
          )
        })}
      </div>

      {/* Recipes grouped by combination */}
      <h2 className="mb-1 text-3xl font-semibold" style={display}>{lt ? 'Deriniai ir receptai' : 'Combinations & recipes'}</h2>
      <p className="mb-6 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Receptai sugrupuoti pagal tai, su kokiomis maisto grupėmis pagrindinis produktas sujungtas. Viršuje — pilnos simbiozės deriniai.'
          : 'Recipes are grouped by which food groups the main ingredient is paired with. Full-symbiosis combinations come first.'}
      </p>

      {combos.length === 0 ? (
        <p className="rounded-xl p-4 text-sm" style={{ ...card, ...body }}>
          {lt ? 'Šiam valgiui receptų su šiuo produktu dar nėra.' : 'No recipes with this ingredient for this meal yet.'}
        </p>
      ) : (
        <div className="space-y-10">
          {combos.map((c) => (
            <section key={c.groups.join('+')}>
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                  {c.groups.map((g) => `${group(g).icon} ${group(g).name[l]}`).join('  +  ')}
                </h3>
                <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ ...ui, backgroundColor: 'var(--color-earth-50)', color: harmonyColor(c.harmony), border: '1px solid var(--color-earth-200)' }}>
                  {c.harmony === 100 ? (lt ? 'Pilna simbiozė' : 'Full symbiosis') : lt ? `Saikingai · ${c.harmony}%` : `Moderate · ${c.harmony}%`}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {c.recipes.map((r) => (
                  <ExploreCard key={r.id} r={r} l={l} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function ExploreCard({ r, l }: { r: Recipe; l: L }) {
  const lt = l === 'lt'
  const required = r.ingredients.filter((i) => !i.optional)
  const optional = r.ingredients.filter((i) => i.optional)
  return (
    <article className="flex flex-col rounded-2xl p-5" style={card}>
      <h4 className="text-xl font-semibold leading-tight" style={display}>
        <span aria-hidden="true">{r.icon}</span> {r.name[l]}
      </h4>
      <p className="mt-1 text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        ⏱ {r.minutes} min · {r.meals.map((m) => kitchenMeal(m).label[l]).join(', ')}
      </p>
      <div className="mt-3 text-sm" style={ui}>
        <p className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
          {lt ? 'Reikės' : 'You need'}
        </p>
        <ul className="space-y-0.5 pl-1">
          {required.map((i) => (
            <li key={i.id}>
              {itemIcon(i.id)} {itemName(i.id, l)} <span style={{ color: 'var(--color-text-muted)' }}>— {i.amount[l]}</span>
            </li>
          ))}
        </ul>
        {optional.length > 0 && (
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              ＋ {lt ? 'Nebūtina: ' : 'Optional: '}
            </span>
            {optional.map((i) => itemName(i.id, l).toLowerCase()).join(', ')}
          </p>
        )}
      </div>
      <p className="mt-3 text-sm leading-snug" style={body}>{r.why[l]}</p>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold" style={{ ...ui, color: 'var(--color-forest-700)' }}>
          {lt ? 'Kaip pagaminti' : 'How to make it'}
        </summary>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed" style={body}>
          {r.steps.map((s, i) => (
            <li key={i}>{s[l]}</li>
          ))}
        </ol>
      </details>
    </article>
  )
}
