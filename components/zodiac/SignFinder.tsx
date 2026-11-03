'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  ELEMENT_MAP,
  MODALITY_MAP,
  chineseZodiac,
  cuspNeighbour,
  formatRange,
  signForDate,
} from '@/lib/zodiac'
import { Locale } from '@/lib/types'
import type { ZodiacDict } from './types'

type Result = {
  month: number
  day: number
  year: number
}

export default function SignFinder({ lang, dict }: { lang: string; dict: ZodiacDict }) {
  const locale = lang as Locale
  const f = dict.finder
  const p = dict.profile
  const [value, setValue] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (!m) {
      setError(true)
      setResult(null)
      return
    }
    const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])]
    const d = new Date(Date.UTC(year, month - 1, day))
    if (d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
      setError(true)
      setResult(null)
      return
    }
    setError(false)
    setResult({ year, month, day })
  }

  const sign = result ? signForDate(result.month, result.day) : null
  const cusp = result ? cuspNeighbour(result.month, result.day) : null
  const chinese = result ? chineseZodiac(result.year) : null
  const element = sign ? ELEMENT_MAP[sign.element] : null

  return (
    <section id="finder" className="mb-16 scroll-mt-24">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {f.heading}
      </h2>
      <p className="mb-6 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
        {f.intro}
      </p>

      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', boxShadow: 'var(--shadow-card)' }}
      >
        <form onSubmit={submit} className="flex flex-col sm:flex-row sm:items-end gap-3">
          <label className="flex flex-col gap-1.5 flex-1" style={{ fontFamily: 'var(--font-ui)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {f.label}
            </span>
            <input
              type="date"
              required
              value={value}
              min="1900-01-01"
              max="2100-12-31"
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-base outline-none focus:ring-2"
              style={{
                border: '1px solid var(--color-earth-200)',
                backgroundColor: '#fff',
                color: 'var(--color-text-primary)',
              }}
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', fontFamily: 'var(--font-ui)' }}
          >
            <Sparkles size={16} />
            {f.submit}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-sm" style={{ color: '#b91c1c', fontFamily: 'var(--font-ui)' }}>
            {f.invalid}
          </p>
        )}

        <AnimatePresence mode="wait">
          {sign && element && chinese && (
            <motion.div
              key={`${result?.year}-${result?.month}-${result?.day}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              <div
                className="md:col-span-2 rounded-xl p-6"
                style={{ backgroundColor: '#fff', border: `1px solid ${element.color}33` }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}
                >
                  {f.yourSign}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-4xl"
                    style={{ backgroundColor: `${element.color}14`, color: element.color }}
                    aria-hidden="true"
                  >
                    {sign.symbol}
                  </span>
                  <div>
                    <h3
                      className="text-3xl font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                    >
                      {sign.name[locale]}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                      {formatRange(sign, locale)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4" style={{ fontFamily: 'var(--font-ui)' }}>
                  {[
                    `${p.element}: ${element.name[locale]}`,
                    `${p.modality}: ${MODALITY_MAP[sign.modality].name[locale]}`,
                    `${p.ruler}: ${sign.ruler[locale]}`,
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-earth-50)', color: 'var(--color-text-secondary)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {sign.overview[locale]}
                </p>
                {cusp && (
                  <p
                    className="mb-4 rounded-lg p-3 text-sm"
                    style={{ backgroundColor: 'var(--color-gold-50)', color: 'var(--color-earth-700)', fontFamily: 'var(--font-ui)' }}
                  >
                    {f.cusp.replace('{sign}', `${cusp.symbol} ${cusp.name[locale]}`)}
                  </p>
                )}
                <Link
                  href={`/${lang}/zodiac/${sign.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}
                >
                  {f.readMore} <ArrowRight size={15} />
                </Link>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: '#fff', border: '1px solid var(--color-earth-200)' }}>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}
                >
                  {f.chinese}
                </p>
                <div className="text-5xl mb-2" aria-hidden="true">
                  {chinese.animal.emoji}
                </div>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {chinese.element[locale]} {chinese.animal.name[locale]}
                </h3>
                <p className="mb-3 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {chinese.animal.traits[locale]}
                </p>
                {result && result.month <= 2 && (
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                    {f.chineseNote}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
