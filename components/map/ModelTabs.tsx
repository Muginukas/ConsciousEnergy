'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HAWKINS_LEVELS,
  SOLFEGGIO_TONES,
  VIBRATION_TIERS,
} from '@/lib/vibration'
import { Locale } from '@/lib/types'

type TabId = 'unified' | 'hawkins' | 'solfeggio' | 'chakras'

type Props = {
  lang: string
  dict: {
    tabs: {
      heading: string
      caption: string
      unified: string
      hawkins: string
      solfeggio: string
      chakras: string
      emotion: string
      view: string
      process: string
      force: string
      power: string
    }
  }
}

const TAB_ORDER: TabId[] = ['unified', 'hawkins', 'solfeggio', 'chakras']

export default function ModelTabs({ lang, dict }: Props) {
  const locale = lang as Locale
  const [tab, setTab] = useState<TabId>('unified')
  const t = dict.tabs
  const lt = locale === 'lt'

  return (
    <section className="mb-20">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {t.heading}
      </h2>
      <p
        className="mb-6 max-w-2xl"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {t.caption}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {TAB_ORDER.map((id) => {
          const isActive = tab === id
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{
                color: isActive ? 'var(--color-cream)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: 'var(--color-forest-700)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{t[id]}</span>
            </button>
          )
        })}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === 'unified' && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VIBRATION_TIERS.map((tier) => (
              <article
                key={tier.id}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'var(--color-earth-50)',
                  border: '1px solid var(--color-earth-200)',
                  borderLeft: `4px solid ${tier.color}`,
                }}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {lt ? tier.labelLt : tier.label}
                </h3>
                <p className="text-xs" style={{ color: tier.color, fontFamily: 'var(--font-ui)' }}>
                  {lt ? tier.chakraLt : tier.chakra}
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {lt ? tier.summaryLt : tier.summary}
                </p>
                <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                  {t.hawkins} {tier.hawkinsRange[0]}–{tier.hawkinsRange[1]} · {tier.solfeggioHz} Hz
                </p>
              </article>
            ))}
          </div>
        )}

        {tab === 'hawkins' && (
          <div
            className="overflow-hidden rounded-xl"
            style={{ border: '1px solid var(--color-earth-200)' }}
          >
            {HAWKINS_LEVELS.map((lvl, i) => (
              <div
                key={lvl.calibration}
                className="flex items-center gap-4 px-4 py-2.5"
                style={{
                  backgroundColor: i % 2 ? 'var(--color-earth-50)' : 'var(--color-cream)',
                  borderLeft: `5px solid ${lvl.color}`,
                }}
              >
                <span
                  className="w-14 shrink-0 text-right text-sm font-semibold tabular-nums"
                  style={{ color: lvl.color, fontFamily: 'var(--font-ui)' }}
                >
                  {lvl.calibration}
                </span>
                <span className="flex-1">
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                  >
                    {lt ? lvl.nameLt : lvl.name}
                  </span>
                  <span
                    className="ml-2 text-xs"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                  >
                    {t.emotion}: {lt ? lvl.emotionLt : lvl.emotion} · {t.view}: {lt ? lvl.viewLt : lvl.view}
                  </span>
                </span>
                <span
                  className="hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline-block"
                  style={{
                    backgroundColor: lvl.band === 'power' ? 'var(--color-forest-50)' : 'var(--color-gold-50)',
                    color: lvl.band === 'power' ? 'var(--color-forest-700)' : 'var(--color-gold-600)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {lvl.band === 'power' ? t.power : t.force}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'solfeggio' && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOLFEGGIO_TONES.map((tone) => (
              <article
                key={tone.hz}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'var(--color-earth-50)',
                  border: '1px solid var(--color-earth-200)',
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-2xl font-semibold"
                    style={{ fontFamily: 'var(--font-display)', color: tone.color }}
                  >
                    {tone.hz}
                    <span className="ml-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Hz
                    </span>
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                  >
                    {lt ? tone.chakraLt : tone.chakra}
                  </span>
                </div>
                <h3
                  className="mt-1 text-base font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {lt ? tone.nameLt : tone.name}
                </h3>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {lt ? tone.purposeLt : tone.purpose}
                </p>
              </article>
            ))}
          </div>
        )}

        {tab === 'chakras' && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...VIBRATION_TIERS]
              .sort((a, b) => b.level - a.level)
              .map((tier) => (
                <article
                  key={tier.id}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{
                    backgroundColor: 'var(--color-earth-50)',
                    border: '1px solid var(--color-earth-200)',
                  }}
                >
                  <span
                    className="mt-1 h-4 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: tier.chakraColor }}
                  />
                  <div>
                    <h3
                      className="text-base font-semibold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                    >
                      {lt ? tier.chakraLt : tier.chakra}
                    </h3>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                    >
                      {lt ? tier.summaryLt : tier.summary}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
