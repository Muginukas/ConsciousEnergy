'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HAWKINS_LEVELS,
  HawkinsLevel,
  HAWKINS_DEPTH,
  CHAKRA_DEPTH,
  VIBRATION_TIERS,
  VibrationTier,
} from '@/lib/vibration'
import { Locale } from '@/lib/types'
import type { Recommendation } from './SelfAssessment'

type Props = {
  lang: string
  dict: {
    eyebrow: string
    title: string
    scale: { heading: string; hawkins: string; solfeggio: string; tapHint: string }
    tabs: { emotion: string; view: string; process: string; power: string; force: string }
  }
  recommendations: Record<string, Recommendation[]>
}

/** Which detail the panel is showing. */
type Active =
  | { kind: 'hawkins'; idx: number }
  | { kind: 'chakra'; id: string }
  | null

/** Deterministic starfield computed once at module scope (seeded mulberry32),
 *  so server and client markup agree — no hydration mismatch, no render-scope
 *  mutation. */
const STARS = (() => {
  let seed = 0x9e3779b9
  const rnd = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return Array.from({ length: 60 }, () => ({
    left: rnd() * 100,
    top: rnd() * 100,
    size: rnd() * 2.2 + 0.6,
    opacity: rnd() * 0.5 + 0.12,
    duration: rnd() * 4 + 3,
    delay: rnd() * 5,
  }))
})()

export default function VibrationMapScene({ lang, dict, recommendations }: Props) {
  const locale = lang as Locale
  const lt = locale === 'lt'
  const [active, setActive] = useState<Active>(null)
  // Which emotion/view/process row is expanded in the level panel.
  const [openField, setOpenField] = useState<'emotion' | 'view' | 'process' | null>(null)
  // Breadcrumb of previously-open cards, for the Back button.
  const [history, setHistory] = useState<Active[]>([])

  // Open a fresh card from the map (clears drill-down history).
  const open = (next: Active) => {
    setOpenField(null)
    setHistory([])
    setActive(next)
  }
  // Drill into a linked card, remembering where we came from.
  const drill = (next: Active) => {
    setOpenField(null)
    setHistory(active ? [...history, active] : history)
    setActive(next)
  }
  // Step back to the previous card.
  const back = () => {
    setOpenField(null)
    setActive(history[history.length - 1] ?? null)
    setHistory(history.slice(0, -1))
  }
  // Close the panel entirely.
  const close = () => {
    setOpenField(null)
    setHistory([])
    setActive(null)
  }

  // Localised label for the "key to rise" line.
  const ascendLabel = lt ? 'Kaip kilti' : 'Key to rise'

  // Hawkins levels already run 700 (top) → 20 (bottom).
  const levels = HAWKINS_LEVELS
  const courageIdx = useMemo(
    () => levels.findIndex((l) => l.calibration === 200),
    [levels],
  )
  // The power/force threshold sits at the top edge of the Courage row.
  const thresholdTop = (courageIdx / levels.length) * 100

  const activeLevel: HawkinsLevel | null =
    active?.kind === 'hawkins' ? levels[active.idx] : null
  const activeTier: VibrationTier | null =
    active?.kind === 'chakra'
      ? VIBRATION_TIERS.find((t) => t.id === active.id) ?? null
      : null

  return (
    <section
      aria-label={dict.title}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100svh',
        background: `linear-gradient(180deg,
          #150b2b 0%, #1d0f3a 13%, #271240 27%, #311630 44%,
          #3a1a28 60%, #401b1f 78%, #36121a 100%)`,
      }}
    >
      {/* Spectral radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(70% 32% at 50% 4%, rgba(157,107,214,0.5) 0%, transparent 72%),
            radial-gradient(70% 30% at 50% 98%, rgba(192,57,43,0.42) 0%, transparent 72%),
            radial-gradient(45% 24% at 50% 50%, rgba(241,196,15,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [s.opacity, s.opacity * 0.25, s.opacity] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-8 text-center sm:pt-10">
        <p
          className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em]"
          style={{ color: 'var(--color-gold-200)', fontFamily: 'var(--font-ui)' }}
        >
          {dict.eyebrow}
        </p>
        <h2
          className="text-3xl font-bold sm:text-5xl"
          style={{ fontFamily: 'var(--font-display)', color: '#fff', textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
        >
          {dict.title}
        </h2>
      </div>

      {/* ── Information: Hawkins scale (left) + chakra list (right) ── */}
      <div className="relative z-10 mx-auto grid h-[100svh] max-w-3xl grid-cols-[1.1fr_0.9fr] gap-3 px-3 pb-16 pt-28 sm:px-6 sm:pt-32">
        {/* Hawkins rail — all 17 levels */}
        <div className="relative flex flex-col">
          {levels.map((lvl, i) => {
            const on = active?.kind === 'hawkins' && active.idx === i
            return (
              <button
                key={lvl.calibration}
                onClick={() => (on ? close() : open({ kind: 'hawkins', idx: i }))}
                className="group flex flex-1 items-center gap-2 rounded text-left transition-all duration-200 hover:translate-x-0.5"
                style={{ opacity: !active || on ? 1 : 0.5 }}
                aria-pressed={on}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: lvl.color, boxShadow: `0 0 8px 1px ${lvl.color}` }}
                />
                <span
                  className="w-9 shrink-0 text-right text-[0.7rem] font-semibold tabular-nums sm:text-xs"
                  style={{ color: lvl.color, fontFamily: 'var(--font-ui)' }}
                >
                  {lvl.calibration}
                </span>
                <span
                  className="truncate text-[0.7rem] font-medium sm:text-sm"
                  style={{
                    color: on ? '#fff' : 'rgba(255,255,255,0.82)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {lt ? lvl.nameLt : lvl.name}
                </span>
              </button>
            )
          })}

          {/* Power / Force threshold at 200 */}
          <div
            className="pointer-events-none absolute inset-x-0 flex items-center justify-between"
            style={{ top: `${thresholdTop}%` }}
          >
            <span
              className="rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--color-forest-200)', fontFamily: 'var(--font-ui)' }}
            >
              ↑ {dict.tabs.power}
            </span>
            <div
              className="mx-2 h-px flex-1"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
            />
            <span
              className="rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--color-gold-200)', fontFamily: 'var(--font-ui)' }}
            >
              ↓ {dict.tabs.force}
            </span>
          </div>
        </div>

        {/* Chakra list — 7 tiers (crown → root) */}
        <div className="flex flex-col justify-center gap-1.5">
          {[...VIBRATION_TIERS]
            .sort((a, b) => b.level - a.level)
            .map((tier) => {
              const on = active?.kind === 'chakra' && active.id === tier.id
              return (
                <button
                  key={tier.id}
                  onClick={() => (on ? close() : open({ kind: 'chakra', id: tier.id }))}
                  className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors"
                  style={{ opacity: !active || on ? 1 : 0.55, background: on ? `${tier.chakraColor}22` : 'transparent' }}
                  aria-pressed={on}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: tier.chakraColor, boxShadow: `0 0 8px 1px ${tier.chakraColor}` }}
                  />
                  <span className="min-w-0">
                    <span
                      className="block truncate text-sm font-semibold"
                      style={{ color: on ? '#fff' : 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)' }}
                    >
                      {lt ? tier.labelLt : tier.label}
                    </span>
                    <span
                      className="block truncate text-[0.7rem]"
                      style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-ui)' }}
                    >
                      {lt ? tier.chakraLt : tier.chakra} · {tier.solfeggioHz} Hz
                    </span>
                  </span>
                </button>
              )
            })}
        </div>
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 bottom-0 z-40 px-3 pb-4 sm:px-6 sm:pb-6"
          >
            <div
              className="mx-auto max-h-[72svh] max-w-md overflow-y-auto rounded-2xl p-5"
              style={{
                background: 'rgba(20, 12, 35, 0.94)',
                border: `1px solid ${activeLevel?.color ?? activeTier?.color ?? '#fff'}`,
                boxShadow: `0 0 40px -8px ${activeLevel?.color ?? activeTier?.color ?? '#000'}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Card controls: Back (when drilled in) + Close */}
              <div className="mb-2 flex items-center justify-between">
                {history.length > 0 ? (
                  <button
                    onClick={back}
                    className="inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-100"
                    style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)' }}
                  >
                    ‹ {lt ? 'Atgal' : 'Back'}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  onClick={close}
                  aria-label={lt ? 'Uždaryti' : 'Close'}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}
                >
                  ×
                </button>
              </div>

              {activeLevel &&
                (() => {
                  const d = HAWKINS_DEPTH[activeLevel.calibration]
                  const tier = VIBRATION_TIERS.find(
                    (t) =>
                      activeLevel.calibration >= t.hawkinsRange[0] &&
                      activeLevel.calibration <= t.hawkinsRange[1],
                  )
                  const fields = [
                    { key: 'emotion' as const, label: dict.tabs.emotion, value: lt ? activeLevel.emotionLt : activeLevel.emotion, note: d ? (lt ? d.emotionNoteLt : d.emotionNote) : '' },
                    { key: 'view' as const, label: dict.tabs.view, value: lt ? activeLevel.viewLt : activeLevel.view, note: d ? (lt ? d.viewNoteLt : d.viewNote) : '' },
                    { key: 'process' as const, label: dict.tabs.process, value: lt ? activeLevel.processLt : activeLevel.process, note: d ? (lt ? d.processNoteLt : d.processNote) : '' },
                  ]
                  return (
                    <>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
                          {lt ? activeLevel.nameLt : activeLevel.name}
                        </h3>
                        <span className="text-lg font-semibold tabular-nums" style={{ color: activeLevel.color, fontFamily: 'var(--font-ui)' }}>
                          {activeLevel.calibration}
                        </span>
                      </div>
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest"
                        style={{ background: `${activeLevel.color}26`, color: activeLevel.color, fontFamily: 'var(--font-ui)' }}
                      >
                        {activeLevel.band === 'power' ? dict.tabs.power : dict.tabs.force}
                      </span>

                      {d && (
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-body)' }}>
                          {lt ? d.descriptionLt : d.description}
                        </p>
                      )}

                      <div className="mt-3 flex flex-col gap-2">
                        {fields.map((f) => (
                          <FieldRow
                            key={f.key}
                            label={f.label}
                            value={f.value}
                            note={f.note}
                            color={activeLevel.color}
                            open={openField === f.key}
                            onToggle={() => setOpenField(openField === f.key ? null : f.key)}
                          />
                        ))}
                      </div>

                      {d && (
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
                          <span style={{ color: activeLevel.color, fontFamily: 'var(--font-ui)' }}>↑ {ascendLabel}: </span>
                          {lt ? d.ascendLt : d.ascend}
                        </p>
                      )}

                      {tier && (
                        <button
                          onClick={() => drill({ kind: 'chakra', id: tier.id })}
                          className="mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                          style={{ background: `${tier.chakraColor}26`, color: '#fff', fontFamily: 'var(--font-ui)' }}
                        >
                          {lt ? tier.chakraLt : tier.chakra} · {tier.solfeggioHz} Hz →
                        </button>
                      )}
                    </>
                  )
                })()}

              {activeTier &&
                (() => {
                  const cd = CHAKRA_DEPTH[activeTier.id]
                  return (
                    <>
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ background: `${activeTier.color}26`, color: '#fff', fontFamily: 'var(--font-ui)' }}
                      >
                        {lt ? activeTier.chakraLt : activeTier.chakra} · {activeTier.solfeggioHz} Hz
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
                        {lt ? activeTier.labelLt : activeTier.label}
                      </h3>
                      {cd && (
                        <p className="mt-1 text-base italic" style={{ color: activeTier.color, fontFamily: 'var(--font-display)' }}>
                          “{lt ? cd.mantraLt : cd.mantra}”
                        </p>
                      )}
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>
                        {lt ? activeTier.summaryLt : activeTier.summary}
                      </p>
                      {cd && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <Stat label={lt ? 'Sanskritas' : 'Sanskrit'} value={cd.sanskrit} color={activeTier.color} />
                          <Stat label={lt ? 'Bija garsas' : 'Bija sound'} value={cd.bija} color={activeTier.color} />
                          <Stat label={lt ? 'Elementas' : 'Element'} value={lt ? cd.elementLt : cd.element} color={activeTier.color} />
                          <Stat label={lt ? 'Liauka' : 'Gland'} value={lt ? cd.glandLt : cd.gland} color={activeTier.color} />
                          <Stat label={lt ? 'Vieta' : 'Location'} value={lt ? cd.locationLt : cd.location} color={activeTier.color} />
                          <Stat label="Solfeggio" value={`${activeTier.solfeggioHz} Hz`} color={activeTier.color} />
                        </div>
                      )}
                      {recommendations[activeTier.id]?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {recommendations[activeTier.id].map((r) => (
                            <a
                              key={r.href}
                              href={r.href}
                              className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
                              style={{ background: `${activeTier.color}33`, color: '#fff', fontFamily: 'var(--font-ui)' }}
                            >
                              {r.title} →
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  )
                })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll cue (hidden while a detail is open) */}
      {!active && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex flex-col items-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="mb-1 text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-ui)' }}>
            {dict.scale.tapHint}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </section>
  )
}

/** An expandable emotion/view/process row: tap to reveal a deeper note. */
function FieldRow({
  label,
  value,
  note,
  color,
  open,
  onToggle,
}: {
  label: string
  value: string
  note: string
  color: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="overflow-hidden rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left"
        aria-expanded={open}
      >
        <span className="min-w-0">
          <span className="block text-[0.65rem] uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ui)' }}>
            {label}
          </span>
          <span className="block text-sm font-semibold" style={{ color, fontFamily: 'var(--font-display)' }}>
            {value}
          </span>
        </span>
        {note && (
          <motion.span
            className="shrink-0 text-base"
            style={{ color }}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            ›
          </motion.span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && note && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-3 pb-2 text-xs leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body)' }}
          >
            {note}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
      {label && (
        <dt className="text-[0.65rem] uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ui)' }}>
          {label}
        </dt>
      )}
      <dd className="text-sm font-semibold" style={{ color, fontFamily: 'var(--font-display)' }}>
        {value}
      </dd>
    </div>
  )
}
