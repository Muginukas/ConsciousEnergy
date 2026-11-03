'use client'

import { useState } from 'react'
import { ELEMENT_MAP, ZODIAC_MAP, ZODIAC_SIGNS, ZodiacSlug, compatibility } from '@/lib/zodiac'
import { Locale } from '@/lib/types'
import type { ZodiacDict } from './types'

type Props = {
  lang: string
  dict: ZodiacDict
  initialA?: ZodiacSlug
  initialB?: ZodiacSlug
  showHeading?: boolean
}

export default function CompatibilityChecker({ lang, dict, initialA = 'aries', initialB = 'leo', showHeading = true }: Props) {
  const locale = lang as Locale
  const c = dict.compat
  const [a, setA] = useState<ZodiacSlug>(initialA)
  const [b, setB] = useState<ZodiacSlug>(initialB)
  const res = compatibility(a, b)
  const sa = ZODIAC_MAP[a]
  const sb = ZODIAC_MAP[b]

  const select = (value: ZodiacSlug, onChange: (v: ZodiacSlug) => void, label: string) => (
    <label className="flex flex-col gap-1.5 flex-1" style={{ fontFamily: 'var(--font-ui)' }}>
      <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ZodiacSlug)}
        className="w-full rounded-xl px-4 py-3 text-base"
        style={{ border: '1px solid var(--color-earth-200)', backgroundColor: '#fff', color: 'var(--color-text-primary)' }}
      >
        {ZODIAC_SIGNS.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.symbol} {s.name[locale]}
          </option>
        ))}
      </select>
    </label>
  )

  return (
    <section className="mb-16">
      {showHeading && (
        <>
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {c.heading}
          </h2>
          <p className="mb-6 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {c.intro}
          </p>
        </>
      )}

      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {select(a, setA, c.first)}
          {select(b, setB, c.second)}
        </div>

        <div className="flex items-center justify-center gap-4 mb-5 text-4xl" aria-hidden="true">
          <span style={{ color: ELEMENT_MAP[sa.element].color }}>{sa.symbol}</span>
          <span className="text-2xl" style={{ color: 'var(--color-gold-600)' }}>✦</span>
          <span style={{ color: ELEMENT_MAP[sb.element].color }}>{sb.symbol}</span>
        </div>

        <div className="mb-2 flex items-baseline justify-between text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {c.aspect}: <strong style={{ color: 'var(--color-text-primary)' }}>{res.aspect[locale]}</strong>
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>
            {c.harmony}: <strong style={{ color: 'var(--color-forest-700)' }}>{res.score}%</strong>
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full mb-5" style={{ backgroundColor: 'var(--color-earth-200)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${res.score}%`, background: 'linear-gradient(90deg, var(--color-gold-400), var(--color-forest-500))' }}
          />
        </div>
        <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {res.summary[locale]}
        </p>
      </div>
    </section>
  )
}
