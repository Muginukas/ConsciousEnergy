'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HAWKINS_LEVELS,
  HawkinsLevel,
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

/** Anatomical vertical position (% from top of the stage) of each chakra on the
 *  standing figure — crown at the head, root at the pelvis, legs reaching down
 *  into the roots so the densest levels sit lowest. Keyed by tier.level. */
const CHAKRA_TOP: Record<number, number> = {
  7: 5, // Crown
  6: 12, // Third Eye
  5: 20, // Throat
  4: 31, // Heart
  3: 41, // Solar Plexus
  2: 50, // Sacral
  1: 60, // Root
}

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

      {/* ── Stage: Hawkins rail (left) + standing figure with chakras (right) ── */}
      <div
        className="relative z-10 mx-auto grid h-[100svh] max-w-3xl grid-cols-[1.05fr_0.95fr] gap-1 px-3 pb-16 pt-28 sm:px-6 sm:pt-32"
      >
        {/* Hawkins rail — all 17 levels */}
        <div className="relative flex flex-col">
          {levels.map((lvl, i) => {
            const on = active?.kind === 'hawkins' && active.idx === i
            return (
              <button
                key={lvl.calibration}
                onClick={() => setActive(on ? null : { kind: 'hawkins', idx: i })}
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
        </div>

        {/* Figure stage */}
        <div className="relative">
          {/* Crown cosmos halo */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-24 w-40 -translate-x-1/2"
            style={{
              background: 'radial-gradient(closest-side, rgba(157,107,214,0.55), transparent 70%)',
            }}
          />

          {/* Standing luminous silhouette */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 120 320"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="figure-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b98ce0" />
                <stop offset="30%" stopColor="#5a7fd4" />
                <stop offset="52%" stopColor="#3f9d6b" />
                <stop offset="70%" stopColor="#e0a020" />
                <stop offset="100%" stopColor="#c0392b" />
              </linearGradient>
              <filter id="figure-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.2" />
              </filter>
            </defs>
            <g
              fill="url(#figure-grad)"
              opacity="0.32"
              stroke="url(#figure-grad)"
              strokeWidth="0.8"
            >
              {/* glow pass */}
              <g filter="url(#figure-glow)" opacity="0.6">
                <circle cx="60" cy="24" r="14" />
                <path d="M44,40 C36,44 33,58 36,86 L41,150 L43,176 L47,308 L57,308 L59,182 L61,182 L63,308 L73,308 L77,176 L79,150 L84,86 C87,58 84,44 76,40 C72,52 48,52 44,40 Z" />
                <path d="M40,46 C30,58 27,92 30,132 L36,131 L43,60 Z" />
                <path d="M80,46 C90,58 93,92 90,132 L84,131 L77,60 Z" />
              </g>
              {/* solid pass */}
              <circle cx="60" cy="24" r="14" />
              <path d="M44,40 C36,44 33,58 36,86 L41,150 L43,176 L47,308 L57,308 L59,182 L61,182 L63,308 L73,308 L77,176 L79,150 L84,86 C87,58 84,44 76,40 C72,52 48,52 44,40 Z" />
              <path d="M40,46 C30,58 27,92 30,132 L36,131 L43,60 Z" />
              <path d="M80,46 C90,58 93,92 90,132 L84,131 L77,60 Z" />
            </g>
          </svg>

          {/* Earth roots below the feet */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] w-full"
            viewBox="0 0 120 60"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            <g stroke="#c0392b" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <path d="M60,0 C58,14 52,20 44,30 C38,38 36,46 34,58" opacity="0.8" />
              <path d="M60,0 C62,14 68,20 76,30 C82,38 84,46 86,58" opacity="0.8" />
              <path d="M60,2 C60,18 60,32 60,56" opacity="0.7" />
              <path d="M52,18 C48,26 46,36 42,50" opacity="0.5" />
              <path d="M68,18 C72,26 74,36 78,50" opacity="0.5" />
            </g>
          </svg>

          {/* Chakra nodes */}
          {VIBRATION_TIERS.map((tier) => {
            const on = active?.kind === 'chakra' && active.id === tier.id
            return (
              <button
                key={tier.id}
                onClick={() => setActive(on ? null : { kind: 'chakra', id: tier.id })}
                className="absolute left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ top: `${CHAKRA_TOP[tier.level]}%`, opacity: !active || on ? 1 : 0.55 }}
                aria-pressed={on}
                aria-label={lt ? tier.chakraLt : tier.chakra}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: tier.chakraColor }}
                  animate={{ scale: [0.85, 1.9], opacity: [0, 0.45, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: tier.level * 0.2 }}
                />
                <span
                  className="relative h-7 w-7 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, ${tier.chakraColor} 60%)`,
                    boxShadow: `0 0 20px 4px ${tier.chakraColor}, inset 0 0 8px ${tier.chakraColor}`,
                    outline: on ? '2px solid #fff' : 'none',
                    outlineOffset: 2,
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* Power / Force threshold at 200 — spans the whole stage */}
        <div
          className="pointer-events-none absolute inset-x-3 z-20 flex items-center justify-between sm:inset-x-6"
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
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)' }}
          />
          <span
            className="rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--color-gold-200)', fontFamily: 'var(--font-ui)' }}
          >
            ↓ {dict.tabs.force}
          </span>
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
              className="mx-auto max-w-md rounded-2xl p-5"
              style={{
                background: 'rgba(20, 12, 35, 0.92)',
                border: `1px solid ${activeLevel?.color ?? activeTier?.color ?? '#fff'}`,
                boxShadow: `0 0 40px -8px ${activeLevel?.color ?? activeTier?.color ?? '#000'}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {activeLevel && (
                <>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
                      {lt ? activeLevel.nameLt : activeLevel.name}
                    </h3>
                    <span className="text-lg font-semibold tabular-nums" style={{ color: activeLevel.color, fontFamily: 'var(--font-ui)' }}>
                      {activeLevel.calibration}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Stat label={dict.tabs.emotion} value={lt ? activeLevel.emotionLt : activeLevel.emotion} color={activeLevel.color} />
                    <Stat label={dict.tabs.view} value={lt ? activeLevel.viewLt : activeLevel.view} color={activeLevel.color} />
                    <Stat label={dict.tabs.process} value={lt ? activeLevel.processLt : activeLevel.process} color={activeLevel.color} />
                    <Stat label="" value={activeLevel.band === 'power' ? dict.tabs.power : dict.tabs.force} color={activeLevel.color} />
                  </div>
                </>
              )}

              {activeTier && (
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
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'var(--font-body)' }}>
                    {lt ? activeTier.summaryLt : activeTier.summary}
                  </p>
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
              )}
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
