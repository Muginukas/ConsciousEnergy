'use client'

import { useEffect, useMemo, useState } from 'react'
import { FOOD_GROUPS, RATING_STYLE, type GroupId } from '@/lib/food-combining'
import { MEALS, type Meal } from '@/lib/food-menu'
import {
  MEAL_TIPS,
  PANTRY,
  PANTRY_BY_ID,
  SHELVES,
  analyze,
  goodPartners,
  matchRecipes,
  pantryGroup,
  parseList,
  suggest,
  type RecipeMatch,
} from '@/lib/food-pantry'
import { Meter, harmonyColor } from './Meter'

type L = 'en' | 'lt'
const ui = { fontFamily: 'var(--font-ui)' }
const body = { fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }
const display = { fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }
const card = { backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }

const PLANNER_MEALS: Meal[] = ['breakfast', 'lunch', 'dinner']
const STORE_KEY = 'ce-pantry-v1'
const MEAL_DATIVE_LT: Partial<Record<Meal, string>> = { breakfast: 'pusryčiams', lunch: 'pietums', dinner: 'vakarienei' }
const EXAMPLE = ['eggs', 'buckwheat', 'onion', 'carrot', 'butter']

const groupName = (g: GroupId, l: L) => FOOD_GROUPS.find((x) => x.id === g)!.name[l]
const groupIcon = (g: GroupId) => FOOD_GROUPS.find((x) => x.id === g)!.icon
const itemName = (id: string, l: L) => PANTRY_BY_ID.get(id)?.name[l] ?? id
const itemIcon = (id: string) => PANTRY_BY_ID.get(id)?.icon ?? '•'

/** Pantry items from a group, owned ones first, for "e.g." hints. */
function examplesOf(g: GroupId, owned: Set<string>, l: L, n = 4) {
  const all = PANTRY.filter((p) => !p.condiment && pantryGroup(p.id) === g)
  const sorted = [...all.filter((p) => owned.has(p.id)), ...all.filter((p) => !owned.has(p.id))]
  return sorted.slice(0, n).map((p) => p.name[l].toLowerCase())
}

function joinList(xs: string[], l: L) {
  if (xs.length <= 1) return xs.join('')
  return `${xs.slice(0, -1).join(', ')} ${l === 'lt' ? 'ir' : 'and'} ${xs[xs.length - 1]}`
}

export default function PantryPlanner({ lang }: { lang: string }) {
  const l: L = lang === 'lt' ? 'lt' : 'en'
  const lt = l === 'lt'
  const [selected, setSelected] = useState<string[]>([])
  const [meal, setMeal] = useState<Meal>('dinner')
  const [text, setText] = useState('')
  const [unknown, setUnknown] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Remember the pantry between visits (per browser only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY)
      if (raw) {
        const s = JSON.parse(raw) as { selected?: string[]; meal?: Meal }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once
        if (Array.isArray(s.selected)) setSelected(s.selected.filter((id) => PANTRY_BY_ID.has(id)))
        if (s.meal && PLANNER_MEALS.includes(s.meal)) setMeal(s.meal)
      }
    } catch {}
    setLoaded(true)
  }, [])
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ selected, meal }))
    } catch {}
  }, [selected, meal, loaded])

  const owned = useMemo(() => new Set(selected), [selected])
  const analysis = useMemo(() => analyze(selected), [selected])
  const matches = useMemo(() => matchRecipes(selected, meal), [selected, meal])
  const hints = useMemo(() => suggest(text.split(/[,;]/).pop() ?? '', owned), [text, owned])

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  const add = (ids: string[]) => setSelected((s) => [...s, ...ids.filter((id) => !s.includes(id))])

  function submit() {
    const { ids, unknown: u, meal: m } = parseList(text)
    add(ids)
    if (m && PLANNER_MEALS.includes(m)) setMeal(m)
    setUnknown(u)
    setText('')
  }

  function pickHint(id: string) {
    // Keep anything typed before the last comma, add the picked item.
    const head = text.includes(',') ? text.slice(0, text.lastIndexOf(',')) : ''
    if (head.trim()) add(parseList(head).ids)
    add([id])
    setText('')
    setUnknown([])
  }

  const visible = showAll ? matches : matches.slice(0, 6)
  const tips = MEAL_TIPS[meal] ?? []
  const mealLabel = lt ? MEAL_DATIVE_LT[meal] : MEALS.find((m) => m.id === meal)!.label[l].toLowerCase()

  return (
    <div>
      {/* ---------- 1. Meal ---------- */}
      <p className="mb-2 text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-secondary)' }}>
        {lt ? '1. Kokiam valgiui?' : '1. Which meal?'}
      </p>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist">
        {PLANNER_MEALS.map((id) => {
          const m = MEALS.find((x) => x.id === id)!
          const active = id === meal
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setMeal(id)}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={
                active
                  ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
                  : { ...ui, ...card, color: 'var(--color-text-secondary)' }
              }
            >
              {m.icon} {m.label[l]}
            </button>
          )
        })}
      </div>

      {/* ---------- 2. Ingredients ---------- */}
      <p className="mb-2 text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-secondary)' }}>
        {lt ? '2. Ką turi namie?' : '2. What do you have at home?'}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="relative mb-3"
      >
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={lt ? 'pvz.: kiaušiniai, grikiai, morkos' : 'e.g. eggs, buckwheat, carrots'}
            aria-label={lt ? 'Produktai, kuriuos turi' : 'Ingredients you have'}
            className="min-w-0 flex-1 rounded-xl px-4 py-3 text-base outline-none focus:ring-2"
            style={{ ...ui, ...card, color: 'var(--color-text-primary)' }}
            autoComplete="off"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl px-4 py-3 text-sm font-semibold"
            style={{ ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
          >
            {lt ? 'Pridėti' : 'Add'}
          </button>
        </div>
        {hints.length > 0 && (
          <ul
            className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl shadow-lg"
            style={{ ...card, backgroundColor: 'var(--color-cream)' }}
          >
            {hints.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => pickHint(p.id)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-black/5"
                  style={{ ...ui, color: 'var(--color-text-primary)' }}
                >
                  {p.icon} {p.name[l]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
      {unknown.length > 0 && (
        <p className="mb-3 text-sm" style={{ ...ui, color: RATING_STYLE.bad.color }}>
          {lt ? 'Neatpažinau: ' : 'Not recognised: '}
          {unknown.join(', ')}
          {lt ? ' — pabandyk pasirinkti iš sąrašo žemiau.' : ' — try picking from the list below.'}
        </p>
      )}

      {/* Selected chips */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {selected.length === 0 ? (
          <button
            onClick={() => add(EXAMPLE)}
            className="text-sm underline underline-offset-2"
            style={{ ...ui, color: 'var(--color-forest-700)' }}
          >
            {lt ? 'Išbandyk pavyzdį: kiaušiniai, grikiai, svogūnai, morkos, sviestas' : 'Try an example: eggs, buckwheat, onion, carrots, butter'}
          </button>
        ) : (
          <>
            {selected.map((id) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm"
                style={{ ...ui, backgroundColor: 'var(--color-forest-50)', color: 'var(--color-forest-700)', border: '1px solid var(--color-forest-200)' }}
                aria-label={lt ? `Pašalinti: ${itemName(id, l)}` : `Remove ${itemName(id, l)}`}
              >
                {itemIcon(id)} {itemName(id, l)} <span aria-hidden="true">×</span>
              </button>
            ))}
            <button onClick={() => setSelected([])} className="text-xs underline" style={{ ...ui, color: 'var(--color-text-muted)' }}>
              {lt ? 'Išvalyti viską' : 'Clear all'}
            </button>
          </>
        )}
      </div>

      <details className="mb-10 rounded-2xl" style={card}>
        <summary className="cursor-pointer px-5 py-3.5 text-sm font-semibold" style={{ ...ui, color: 'var(--color-forest-700)' }}>
          {lt ? 'Arba pasirink iš lentynų' : 'Or pick from the shelves'}
        </summary>
        <div className="space-y-4 px-5 pb-5">
          {SHELVES.map((s) => (
            <div key={s.id}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-text-muted)' }}>
                {s.name[l]}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((id) => {
                  const on = owned.has(id)
                  return (
                    <button
                      key={id}
                      onClick={() => toggle(id)}
                      aria-pressed={on}
                      className="rounded-full px-3 py-1.5 text-sm transition-colors"
                      style={
                        on
                          ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
                          : { ...ui, backgroundColor: 'var(--color-earth-50)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }
                      }
                    >
                      {itemIcon(id)} {itemName(id, l)}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </details>

      {selected.length > 0 && (
        <>
          {/* ---------- 3. Combining check ---------- */}
          <section className="mb-10 rounded-2xl p-5 sm:p-6" style={card}>
            <h2 className="mb-1 text-2xl font-semibold" style={display}>
              {lt ? 'Ar tai dera kartu?' : 'Do these go together?'}
            </h2>
            <p className="mb-4 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
              {lt
                ? 'Jei viską sudėtum į vieną lėkštę. Prieskoniai (česnakas, žolelės, citrina) nevertinami.'
                : 'If everything went on one plate. Seasonings (garlic, herbs, lemon) are not counted.'}
            </p>

            {analysis.groups.length > 0 && (
              <div className="mb-5 max-w-md">
                <Meter
                  label={lt ? 'Harmonija' : 'Harmony'}
                  value={`${analysis.harmony}%`}
                  pct={analysis.harmony}
                  color={harmonyColor(analysis.harmony)}
                  note={analysis.groups.map((g) => `${groupIcon(g)} ${groupName(g, l)}`).join(' · ')}
                />
              </div>
            )}

            {analysis.conflicts.length === 0 ? (
              <div className="rounded-xl p-4" style={{ backgroundColor: RATING_STYLE.good.bg }}>
                <p className="font-semibold" style={{ ...ui, color: RATING_STYLE.good.color }}>
                  ✓ {lt ? 'Puikiai dera — gali gaminti vieną patiekalą.' : 'A good match — you can cook it as one dish.'}
                </p>
                {analysis.pairs.some((p) => p.rating === 'ok') && (
                  <p className="mt-1 text-sm" style={body}>
                    {lt ? 'Kai kurie deriniai tinka saikingai — nedidelės porcijos.' : 'Some pairs are fine in moderation — keep portions modest.'}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="mb-5 space-y-2">
                  {analysis.conflicts.map((c) => (
                    <div key={`${c.ga}-${c.gb}`} className="rounded-xl p-4" style={{ backgroundColor: RATING_STYLE.bad.bg }}>
                      <p className="font-semibold" style={{ ...ui, color: RATING_STYLE.bad.color }}>
                        ✕ {itemIcon(c.a)} {itemName(c.a, l)} + {itemIcon(c.b)} {itemName(c.b, l)}
                      </p>
                      {c.note && <p className="mt-1 text-sm leading-snug" style={body}>{c.note[l]}</p>}
                      <div className="mt-2 text-sm" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                        <strong>{lt ? 'Alternatyva:' : 'Instead:'}</strong>
                        {([[c.a, c.ga], [c.b, c.gb]] as const).map(([id, g]) => (
                          <p key={id} className="mt-0.5">
                            {itemIcon(id)} {itemName(id, l)} {lt ? 'dera su:' : 'goes well with:'}{' '}
                            {joinList(goodPartners(g).map((x) => groupName(x, l).toLowerCase()), l)}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {analysis.plates.length > 1 && (
                  <>
                    <h3 className="mb-2 text-lg font-semibold" style={display}>
                      {lt ? `Kaip suderinti: rinkis vieną lėkštę ${mealLabel}` : `How to combine: pick one plate for ${mealLabel}`}
                    </h3>
                    <div className="mb-2 grid gap-3 sm:grid-cols-2">
                      {analysis.plates.map((p, i) => {
                        const items = p.items
                        return (
                          <div key={i} className="rounded-xl p-4" style={{ backgroundColor: RATING_STYLE.good.bg }}>
                            <p className="text-xs font-bold uppercase tracking-wide" style={{ ...ui, color: RATING_STYLE.good.color }}>
                              {lt ? 'Variantas' : 'Option'} {String.fromCharCode(65 + i)}
                            </p>
                            <p className="mt-1 text-base font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                              {items.map((id) => `${itemIcon(id)} ${itemName(id, l)}`).join(' + ')}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                    <p className="mb-2 text-sm" style={body}>
                      {lt
                        ? 'Kitą produktą palik kitam valgiui — pvz., kiaušinius pusryčiams, o kruopas vakarienei, arba atvirkščiai.'
                        : 'Keep the other food for another meal — e.g. eggs for breakfast and grains for dinner, or the other way round.'}
                    </p>
                  </>
                )}
              </>
            )}

            {analysis.additions.length > 0 && (
              <div className="mt-5">
                <h3 className="mb-2 text-lg font-semibold" style={display}>{lt ? 'Ką galima pridėti' : 'What you could add'}</h3>
                <ul className="space-y-1.5">
                  {analysis.additions.map((g) => (
                    <li key={g} className="text-sm" style={body}>
                      <span style={{ color: RATING_STYLE.good.color }}>✓</span> {groupIcon(g)}{' '}
                      <strong style={{ color: 'var(--color-text-primary)' }}>{groupName(g, l)}</strong>
                      {' — '}
                      {lt ? 'pvz., ' : 'e.g. '}
                      {examplesOf(g, owned, l).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tips.length > 0 && (
              <div className="mt-6 rounded-xl px-4 py-3" style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-gold-600)' }}>
                  {MEALS.find((m) => m.id === meal)!.icon} {lt ? `Patarimai ${mealLabel}` : `Tips for ${mealLabel}`}
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm" style={{ ...body, color: 'var(--color-earth-700)' }}>
                  {tips.map((t, i) => (
                    <li key={i}>{t[l]}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ---------- 4. Recipes ---------- */}
          <section>
            <h2 className="mb-1 text-3xl font-semibold" style={display}>
              {lt ? `Receptai ${mealLabel}` : `Recipes for ${mealLabel}`}
            </h2>
            <p className="mb-5 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
              {lt
                ? 'Surikiuota pagal tai, kiek ingredientų jau turi. Visi receptai sudaryti pagal derinių principus.'
                : 'Sorted by how many ingredients you already have. Every recipe follows the combining principles.'}
            </p>
            {matches.length === 0 ? (
              <p className="rounded-xl p-4 text-sm" style={{ ...card, ...body }}>
                {lt
                  ? 'Šiems produktams šio valgio receptų dar neradau. Pridėk daugiau produktų arba pasirink kitą valgį.'
                  : 'No recipes for this meal with these ingredients yet. Add more ingredients or choose another meal.'}
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {visible.map((m) => (
                  <RecipeCard key={m.recipe.id} m={m} l={l} />
                ))}
              </div>
            )}
            {matches.length > 6 && (
              <button
                onClick={() => setShowAll((s) => !s)}
                className="mt-5 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ ...ui, ...card, color: 'var(--color-forest-700)' }}
              >
                {showAll ? (lt ? 'Rodyti mažiau' : 'Show fewer') : lt ? `Rodyti visus (${matches.length})` : `Show all (${matches.length})`}
              </button>
            )}
          </section>
        </>
      )}
    </div>
  )
}

function RecipeCard({ m, l }: { m: RecipeMatch; l: L }) {
  const lt = l === 'lt'
  const r = m.recipe
  const complete = m.missing.length === 0
  return (
    <article className="flex flex-col rounded-2xl p-5" style={{ ...card, borderTop: `5px solid ${complete ? RATING_STYLE.good.color : 'var(--color-gold-400)'}` }}>
      <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold" style={ui}>
        <span className="rounded-full px-2.5 py-1" style={{ backgroundColor: complete ? RATING_STYLE.good.bg : 'var(--color-gold-50)', color: complete ? RATING_STYLE.good.color : 'var(--color-gold-600)' }}>
          {complete
            ? lt ? '✓ Turi viską' : '✓ You have everything'
            : lt ? `Trūksta: ${m.missing.length}` : `Missing: ${m.missing.length}`}
        </span>
        <span className="rounded-full px-2.5 py-1" style={{ backgroundColor: 'var(--color-earth-50)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }}>
          ⏱ {r.minutes} min
        </span>
        <span className="rounded-full px-2.5 py-1" style={{ backgroundColor: 'var(--color-earth-50)', color: harmonyColor(r.harmony), border: '1px solid var(--color-earth-200)' }}>
          {lt ? 'Harmonija' : 'Harmony'} {r.harmony}%
        </span>
      </div>
      <h3 className="text-xl font-semibold leading-tight" style={display}>
        <span aria-hidden="true">{r.icon}</span> {r.name[l]}
      </h3>

      <ul className="mt-3 space-y-1 text-sm" style={ui}>
        {r.ingredients.map((i) => {
          const has = m.have.includes(i.id)
          return (
            <li key={i.id} className="flex items-baseline gap-2">
              <span className="w-4 shrink-0 text-center font-bold" style={{ color: has ? RATING_STYLE.good.color : i.optional ? 'var(--color-text-muted)' : RATING_STYLE.bad.color }}>
                {has ? '✓' : i.optional ? '·' : '✕'}
              </span>
              <span style={{ color: has ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                {itemName(i.id, l)} <span style={{ color: 'var(--color-text-muted)' }}>— {i.amount[l]}</span>
                {i.optional && !has && <span style={{ color: 'var(--color-text-muted)' }}> ({lt ? 'nebūtina' : 'optional'})</span>}
              </span>
            </li>
          )
        })}
      </ul>

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
