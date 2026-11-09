'use client'

import { useState } from 'react'
import {
  FOOD_GROUPS,
  RATING_STYLE,
  getPair,
  type GroupId,
  type Rating,
} from '@/lib/food-combining'

const ui = { fontFamily: 'var(--font-ui)' }
const RATINGS: Rating[] = ['good', 'ok', 'bad']

export default function CombinationChecker({ lang }: { lang: string }) {
  const l = lang === 'lt' ? 'lt' : 'en'
  const [selected, setSelected] = useState<GroupId>('protein')
  const current = FOOD_GROUPS.find((g) => g.id === selected)!

  const byRating = (r: Rating) =>
    FOOD_GROUPS.map((g) => ({ group: g, pair: getPair(selected, g.id) })).filter((x) => x.pair.rating === r)

  return (
    <div>
      {/* Group picker */}
      <p className="mb-3 text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-secondary)' }}>
        {l === 'lt' ? 'Pasirinkite produktų grupę:' : 'Choose a food group:'}
      </p>
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {FOOD_GROUPS.map((g) => {
          const active = g.id === selected
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(g.id)}
              className="rounded-full px-3.5 py-2 text-sm font-medium transition-colors"
              style={
                active
                  ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
                  : { ...ui, backgroundColor: 'var(--color-cream)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }
              }
            >
              <span aria-hidden="true">{g.icon}</span> {g.name[l]}
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
        <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          <span aria-hidden="true">{current.icon}</span> {current.name[l]}
        </h3>
        <p className="text-sm mb-5" style={{ ...ui, color: 'var(--color-text-muted)' }}>{current.examples[l]}</p>

        <div className="grid gap-4 md:grid-cols-3">
          {RATINGS.map((r) => {
            const s = RATING_STYLE[r]
            const items = byRating(r)
            return (
              <div key={r} className="rounded-xl p-4" style={{ backgroundColor: s.bg }}>
                <p className="mb-3 text-sm font-bold uppercase tracking-wide" style={{ ...ui, color: s.color }}>
                  {s.symbol} {s.label[l]}
                </p>
                {items.length === 0 ? (
                  <p className="text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>—</p>
                ) : (
                  <ul className="space-y-3">
                    {items.map(({ group, pair }) => (
                      <li key={group.id}>
                        <p className="font-semibold text-sm" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                          <span aria-hidden="true">{group.icon}</span> {group.name[l]}
                          {group.id === selected && (
                            <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>
                              {' '}{l === 'lt' ? '(tarpusavyje)' : '(with itself)'}
                            </span>
                          )}
                        </p>
                        {pair.note && (
                          <p className="text-sm leading-snug mt-0.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
                            {pair.note[l]}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Full matrix */}
      <details className="rounded-2xl" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
        <summary className="cursor-pointer px-5 py-4 font-semibold" style={{ ...ui, color: 'var(--color-forest-700)' }}>
          {l === 'lt' ? 'Visa suderinamumo lentelė' : 'Full compatibility table'}
        </summary>
        <div className="px-3 pb-5 overflow-x-auto">
          <table className="mx-auto border-separate" style={{ borderSpacing: 3, ...ui }}>
            <thead>
              <tr>
                <th />
                {FOOD_GROUPS.map((g) => (
                  <th key={g.id} className="text-lg font-normal" title={g.name[l]}>
                    <span aria-label={g.name[l]}>{g.icon}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FOOD_GROUPS.map((row) => (
                <tr key={row.id}>
                  <th scope="row" className="pr-2 text-left text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                    <button onClick={() => setSelected(row.id)} className="hover:underline">
                      <span aria-hidden="true">{row.icon}</span> {row.name[l]}
                    </button>
                  </th>
                  {FOOD_GROUPS.map((col) => {
                    const s = RATING_STYLE[getPair(row.id, col.id).rating]
                    return (
                      <td
                        key={col.id}
                        className="w-8 h-8 text-center text-sm font-bold rounded-md"
                        style={{ backgroundColor: s.bg, color: s.color, minWidth: 32 }}
                        title={`${row.name[l]} + ${col.name[l]}: ${s.label[l]}`}
                      >
                        {s.symbol}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {RATINGS.map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5">
                <span className="inline-flex w-5 h-5 items-center justify-center rounded font-bold" style={{ backgroundColor: RATING_STYLE[r].bg, color: RATING_STYLE[r].color }}>
                  {RATING_STYLE[r].symbol}
                </span>
                {RATING_STYLE[r].label[l]}
              </span>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
