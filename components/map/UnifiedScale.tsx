'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VIBRATION_TIERS, VibrationTier } from '@/lib/vibration'
import { Locale } from '@/lib/types'

type Props = {
  lang: string
  dict: {
    scale: {
      heading: string
      caption: string
      tapHint: string
      hawkins: string
      solfeggio: string
      chakra: string
    }
  }
}

export default function UnifiedScale({ lang, dict }: Props) {
  const locale = lang as Locale
  const [active, setActive] = useState<VibrationTier | null>(null)
  const sc = dict.scale

  // Highest tier first so the scale reads top (expansive) → bottom (dense).
  const tiers = [...VIBRATION_TIERS].sort((a, b) => b.level - a.level)

  const label = (t: VibrationTier) => (locale === 'lt' ? t.labelLt : t.label)
  const chakra = (t: VibrationTier) => (locale === 'lt' ? t.chakraLt : t.chakra)
  const summary = (t: VibrationTier) => (locale === 'lt' ? t.summaryLt : t.summary)

  return (
    <section className="mb-20">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {sc.heading}
      </h2>
      <p
        className="mb-6 max-w-2xl"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {sc.caption}
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
        {/* The static, clickable scale */}
        <div
          className="flex flex-col gap-1.5 rounded-2xl p-3"
          style={{ backgroundColor: 'var(--color-earth-50)', border: '1px solid var(--color-earth-200)' }}
        >
          {tiers.map((t) => {
            const isActive = active?.id === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActive(isActive ? null : t)}
                className="group relative flex items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-300 hover:translate-x-1"
                style={{
                  background: `linear-gradient(90deg, ${t.color} 0%, ${t.color}cc 100%)`,
                  boxShadow: isActive ? `0 0 0 2px var(--color-cream), 0 0 0 4px ${t.color}` : 'none',
                  opacity: !active || isActive ? 1 : 0.55,
                }}
                aria-pressed={isActive}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff', fontFamily: 'var(--font-ui)' }}
                >
                  {t.level}
                </span>
                <span className="flex-1">
                  <span
                    className="block text-base font-semibold leading-tight"
                    style={{ color: '#fff', fontFamily: 'var(--font-display)' }}
                  >
                    {label(t)}
                  </span>
                  <span
                    className="block text-xs"
                    style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-ui)' }}
                  >
                    {chakra(t)}
                  </span>
                </span>
                <span
                  className="hidden shrink-0 text-right text-xs font-medium sm:block"
                  style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-ui)' }}
                >
                  {sc.hawkins} {t.hawkinsRange[0]}–{t.hawkinsRange[1]}
                  <br />
                  {t.solfeggioHz} Hz
                </span>
              </button>
            )
          })}
          <p
            className="px-2 pt-1 text-xs"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
          >
            {sc.tapHint}
          </p>
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: 'var(--color-cream)',
                  border: `1px solid ${active.color}`,
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${active.color}1a`, color: active.color, fontFamily: 'var(--font-ui)' }}
                >
                  {chakra(active)}
                </span>
                <h3
                  className="mt-3 text-2xl font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {label(active)}
                </h3>
                <p
                  className="mt-2 leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {summary(active)}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Stat label={sc.hawkins} value={`${active.hawkinsRange[0]}–${active.hawkinsRange[1]}`} color={active.color} />
                  <Stat label={sc.solfeggio} value={`${active.solfeggioHz} Hz`} color={active.color} />
                </dl>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full min-h-40 items-center justify-center rounded-2xl p-6 text-center"
                style={{
                  border: '1px dashed var(--color-earth-200)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                {sc.tapHint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{ backgroundColor: 'var(--color-earth-50)', border: '1px solid var(--color-earth-200)' }}
    >
      <dt className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
        {label}
      </dt>
      <dd className="text-base font-semibold" style={{ color, fontFamily: 'var(--font-display)' }}>
        {value}
      </dd>
    </div>
  )
}
