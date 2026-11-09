'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PATH_STEPS, STANCES, PathStep } from '@/lib/vibration-path'
import { Locale } from '@/lib/types'

type Props = {
  lang: string
  dict: {
    path: {
      heading: string
      intro: string
      chainHeading: string
      chainCaption: string
      lower: string
      higher: string
      practice: string
      stancesHeading: string
      stancesCaption: string
      nextStep: string
      hawkins: string
      bridge: string
    }
  }
}

export default function DailyPath({ lang, dict }: Props) {
  const lt = (lang as Locale) === 'lt'
  const p = dict.path
  const [activeId, setActiveId] = useState<string>(PATH_STEPS[0].id)
  const active = PATH_STEPS.find((s) => s.id === activeId) ?? PATH_STEPS[0]

  const label = (s: PathStep) => (lt ? s.labelLt : s.label)

  return (
    <section className="mb-20">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {p.heading}
      </h2>
      <p
        className="mb-10 max-w-3xl leading-relaxed"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {p.intro}
      </p>

      {/* ─── Thoughts → … → Destiny ─── */}
      <h3
        className="text-2xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {p.chainHeading}
      </h3>
      <p
        className="mb-5 max-w-2xl text-sm"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
      >
        {p.chainCaption}
      </p>

      <ol className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-2">
        {PATH_STEPS.map((s, i) => {
          const isActive = s.id === activeId
          return (
            <li key={s.id} className="flex items-center gap-1">
              <button
                onClick={() => setActiveId(s.id)}
                aria-pressed={isActive}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? s.color : 'var(--color-earth-50)',
                  color: isActive ? '#fff' : 'var(--color-text-primary)',
                  border: `1px solid ${isActive ? s.color : 'var(--color-earth-200)'}`,
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${s.color}22`,
                    color: isActive ? '#fff' : s.color,
                  }}
                >
                  {i + 1}
                </span>
                {label(s)}
              </button>
              {i < PATH_STEPS.length - 1 && (
                <span aria-hidden className="px-0.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  →
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="mb-16 rounded-2xl p-5 sm:p-6"
          style={{
            backgroundColor: 'var(--color-cream)',
            border: `1px solid ${active.color}`,
            borderLeft: `5px solid ${active.color}`,
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <h4
            className="text-2xl font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: active.color }}
          >
            {label(active)}
          </h4>
          <p
            className="mt-2 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            {lt ? active.textLt : active.text}
          </p>

          <div className="mt-5 grid gap-3">
            {active.pairs.map((pair, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-2">
                <Example tone="low" title={p.lower} text={lt ? pair.lowLt : pair.low} />
                <Example tone="high" title={p.higher} text={lt ? pair.highLt : pair.high} />
              </div>
            ))}
          </div>

          <div
            className="mt-5 rounded-xl px-4 py-3"
            style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}
            >
              {p.practice}
            </p>
            <p
              className="mt-1 text-sm leading-relaxed"
              style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}
            >
              {lt ? active.practiceLt : active.practice}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ─── To me / by me / through me / as me ─── */}
      <h3
        className="text-2xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {p.stancesHeading}
      </h3>
      <p
        className="mb-5 max-w-2xl text-sm"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
      >
        {p.stancesCaption}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {STANCES.map((s, i) => (
          <article
            key={s.id}
            className="flex flex-col rounded-xl p-4"
            style={{
              backgroundColor: 'var(--color-earth-50)',
              border: '1px solid var(--color-earth-200)',
              borderTop: `4px solid ${s.color}`,
            }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: s.color, fontFamily: 'var(--font-ui)' }}
              >
                {i + 1}. {lt ? s.roleLt : s.role}
              </span>
              <span className="text-xs tabular-nums" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                {p.hawkins} {s.hawkins}
              </span>
            </div>
            <h4
              className="mt-1 text-lg font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {lt ? s.nameLt : s.name}
            </h4>
            <p
              className="mt-2 text-sm italic"
              style={{ color: s.color, fontFamily: 'var(--font-body)' }}
            >
              {lt ? s.voiceLt : s.voice}
            </p>
            <p
              className="mt-2 flex-1 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              {lt ? s.textLt : s.text}
            </p>
            <p
              className="mt-3 text-sm"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}
            >
              <span className="font-semibold">{p.nextStep}:</span> {lt ? s.shiftLt : s.shift}
            </p>
          </article>
        ))}
      </div>

      <p
        className="mt-8 max-w-3xl leading-relaxed"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {p.bridge}
      </p>
    </section>
  )
}

function Example({ tone, title, text }: { tone: 'low' | 'high'; title: string; text: string }) {
  const low = tone === 'low'
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{
        backgroundColor: low ? 'var(--color-earth-50)' : 'var(--color-forest-50)',
        border: `1px solid ${low ? 'var(--color-earth-200)' : 'var(--color-forest-200)'}`,
      }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: low ? 'var(--color-text-muted)' : 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}
      >
        {low ? '↓' : '↑'} {title}
      </p>
      <p
        className="mt-0.5 text-sm leading-relaxed"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
      >
        {text}
      </p>
    </div>
  )
}
