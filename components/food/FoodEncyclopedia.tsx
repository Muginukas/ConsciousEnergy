'use client'

import { useMemo, useState } from 'react'
import { BODY_ANGSTROM, FOOD_TIERS, SCALE_MAX, tierOf } from '@/lib/food-angstrom'
import { CATEGORIES, FOODS, type CategoryId } from '@/lib/food-db'

const ui = { fontFamily: 'var(--font-ui)' }
type L = 'en' | 'lt'
type Sort = 'high' | 'low' | 'name'
type TierFilter = 'all' | 'living' | 'supporting' | 'low' | 'dead'

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export default function FoodEncyclopedia({ lang }: { lang: string }) {
  const l: L = lang === 'lt' ? 'lt' : 'en'
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<CategoryId | 'all'>('all')
  const [tier, setTier] = useState<TierFilter>('all')
  const [sort, setSort] = useState<Sort>('high')
  const [limit, setLimit] = useState(30)

  const list = useMemo(() => {
    const nq = norm(q.trim())
    const out = FOODS.filter(
      (x) =>
        (cat === 'all' || x.cat === cat) &&
        (tier === 'all' || tierOf(x.angstrom).id === tier) &&
        (!nq || norm(x.name.lt).includes(nq) || norm(x.name.en).includes(nq)),
    )
    return out.sort((a, b) =>
      sort === 'high' ? b.angstrom - a.angstrom : sort === 'low' ? a.angstrom - b.angstrom : a.name[l].localeCompare(b.name[l], l),
    )
  }, [q, cat, tier, sort, l])

  const avg = list.length ? Math.round(list.reduce((s, x) => s + x.angstrom, 0) / list.length / 50) * 50 : 0

  const chip = (active: boolean) =>
    active
      ? { ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
      : { ...ui, backgroundColor: 'var(--color-cream)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => { setQ(e.target.value); setLimit(30) }}
        placeholder={l === 'lt' ? 'Ieškoti produkto, pvz. „grikiai“…' : 'Search a food, e.g. “buckwheat”…'}
        className="w-full rounded-xl px-4 py-3 mb-4 text-base outline-none focus:ring-2"
        style={{ ...ui, backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', color: 'var(--color-text-primary)' }}
      />

      <div className="flex flex-wrap gap-2 mb-3">
        <button onClick={() => { setCat('all'); setLimit(30) }} className="rounded-full px-3 py-1.5 text-sm font-medium" style={chip(cat === 'all')}>
          {l === 'lt' ? 'Visos kategorijos' : 'All categories'}
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => { setCat(c.id); setLimit(30) }} className="rounded-full px-3 py-1.5 text-sm font-medium" style={chip(cat === c.id)}>
            {c.icon} {c.name[l]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5 text-sm" style={ui}>
        <span style={{ color: 'var(--color-text-muted)' }}>{l === 'lt' ? 'Pakopa:' : 'Tier:'}</span>
        <button onClick={() => { setTier('all'); setLimit(30) }} className="rounded-full px-3 py-1 font-medium" style={chip(tier === 'all')}>
          {l === 'lt' ? 'Visos' : 'All'}
        </button>
        {FOOD_TIERS.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTier(t.id); setLimit(30) }}
            className="rounded-full px-3 py-1 font-medium"
            style={tier === t.id ? { ...ui, backgroundColor: t.color, color: t.textColor } : chip(false)}
          >
            {t.title[l]}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-2">
          <label htmlFor="enc-sort" style={{ color: 'var(--color-text-muted)' }}>{l === 'lt' ? 'Rikiuoti:' : 'Sort:'}</label>
          <select
            id="enc-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg px-2 py-1"
            style={{ ...ui, backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
          >
            <option value="high">{l === 'lt' ? 'Aukščiausia vibracija' : 'Highest vibration'}</option>
            <option value="low">{l === 'lt' ? 'Žemiausia vibracija' : 'Lowest vibration'}</option>
            <option value="name">{l === 'lt' ? 'Pagal pavadinimą' : 'By name'}</option>
          </select>
        </span>
      </div>

      <p className="mb-3 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        {l === 'lt' ? `Rasta produktų: ${list.length}` : `${list.length} foods`}
        {list.length > 0 && (l === 'lt' ? ` · vidurkis ${fmt(avg)} Å` : ` · average ${fmt(avg)} Å`)}
      </p>

      <ul className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
        {list.slice(0, limit).map((x, i) => {
          const t = tierOf(x.angstrom)
          const c = CATEGORIES.find((cc) => cc.id === x.cat)!
          return (
            <li
              key={x.id}
              className="grid items-center gap-x-3 gap-y-1 px-4 py-2.5"
              style={{ gridTemplateColumns: '1fr auto', borderTop: i ? '1px solid var(--color-earth-200)' : undefined }}
            >
              <div className="min-w-0">
                <p className="truncate" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
                  <span aria-hidden="true">{c.icon}</span> {x.name[l]}
                  {x.s && (
                    <span
                      className="ml-1.5 align-middle text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ ...ui, backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', border: '1px solid var(--color-gold-200)' }}
                      title={l === 'lt' ? 'Simonetono vertė' : 'Simoneton’s figure'}
                    >
                      S
                    </span>
                  )}
                </p>
              </div>
              <span className="text-sm font-semibold tabular-nums text-right" style={{ ...ui, color: t.color }}>
                {fmt(x.angstrom)} Å
              </span>
              <div className="col-span-2 relative h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
                <div className="h-full rounded-full" style={{ width: `${(x.angstrom / SCALE_MAX) * 100}%`, backgroundColor: t.color }} />
                <div className="absolute -top-0.5 -bottom-0.5 w-0.5" style={{ left: `${(BODY_ANGSTROM / SCALE_MAX) * 100}%`, backgroundColor: 'var(--color-gold-400)' }} />
              </div>
            </li>
          )
        })}
        {list.length === 0 && (
          <li className="px-4 py-6 text-center" style={{ ...ui, color: 'var(--color-text-muted)' }}>
            {l === 'lt' ? 'Nieko nerasta' : 'Nothing found'}
          </li>
        )}
      </ul>
      {list.length > limit && (
        <button
          onClick={() => setLimit((n) => n + 40)}
          className="mt-3 w-full rounded-xl px-4 py-3 text-sm font-semibold"
          style={{ ...ui, backgroundColor: 'var(--color-forest-50)', color: 'var(--color-forest-700)', border: '1px solid var(--color-forest-200)' }}
        >
          {l === 'lt' ? `Rodyti daugiau (liko ${list.length - limit})` : `Show more (${list.length - limit} left)`}
        </button>
      )}
      <p className="mt-3 text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        <span className="font-semibold px-1 rounded" style={{ backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)' }}>S</span>{' '}
        {l === 'lt'
          ? '— Simonetono pateikta vertė; kitos įvertintos pagal jo pakopas ir taisykles. Geltona žymė — kūno 6 500 Å.'
          : '— Simoneton’s own figure; others are estimated from his tiers and rules. The gold mark is the body’s 6,500 Å.'}
      </p>
    </div>
  )
}
