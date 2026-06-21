'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { VIBRATION_TIERS, VibrationTier } from '@/lib/vibration'
import { Locale } from '@/lib/types'

type Props = {
  lang: string
  dict: {
    eyebrow: string
    title: string
    scale: { heading: string; hawkins: string }
  }
}

/**
 * A full-screen, vector-only "map" of the unified vibration spectrum: seven
 * glowing chakra nodes strung along a central energy channel, from the dense
 * Root (bottom) to the expansive Crown (top). Built entirely from CSS gradients
 * and SVG-free divs so it stays crisp at any viewport size — the shared hero
 * image for the Vibration Map page.
 */
export default function VibrationMapScene({ lang, dict }: Props) {
  const locale = lang as Locale

  // Top (most expansive) → bottom (densest), matching the spectrum reading.
  const tiers = useMemo(
    () => [...VIBRATION_TIERS].sort((a, b) => b.level - a.level),
    [],
  )

  // Deterministic starfield so server and client markup agree (no hydration
  // mismatch). mulberry32 seeded with a fixed value.
  const stars = useMemo(() => {
    let seed = 0x9e3779b9
    const rnd = () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    return Array.from({ length: 54 }, () => ({
      left: rnd() * 100,
      top: rnd() * 100,
      size: rnd() * 2.2 + 0.6,
      opacity: rnd() * 0.5 + 0.12,
      duration: rnd() * 4 + 3,
      delay: rnd() * 5,
    }))
  }, [])

  const label = (t: VibrationTier) => (locale === 'lt' ? t.labelLt : t.label)
  const chakra = (t: VibrationTier) => (locale === 'lt' ? t.chakraLt : t.chakra)

  return (
    <section
      aria-label={dict.title}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100svh',
        background: `linear-gradient(180deg,
          #1b1033 0%,
          #241141 15%,
          #2c1340 30%,
          #341a31 46%,
          #3a1a27 62%,
          #401b1f 80%,
          #38131a 100%)`,
      }}
    >
      {/* Spectral radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 40% at 50% 8%, rgba(142,68,173,0.45) 0%, transparent 70%),
            radial-gradient(60% 40% at 50% 95%, rgba(192,57,43,0.40) 0%, transparent 70%),
            radial-gradient(40% 30% at 50% 50%, rgba(241,196,15,0.10) 0%, transparent 70%)`,
        }}
      />

      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [s.opacity, s.opacity * 0.25, s.opacity] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Heading overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-10 text-center sm:pt-12">
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: 'var(--color-gold-200)', fontFamily: 'var(--font-ui)' }}
        >
          {dict.eyebrow}
        </p>
        <h2
          className="text-4xl font-bold sm:text-5xl md:text-6xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fff',
            textShadow: '0 2px 30px rgba(0,0,0,0.45)',
          }}
        >
          {dict.title}
        </h2>
      </div>

      {/* The energy channel + nodes */}
      <div className="relative mx-auto flex h-full max-w-2xl flex-col justify-between px-6 pb-24 pt-40 sm:pt-44">
        {/* Central channel line — aligned to node centres (px-6 + half of w-16) */}
        <div
          className="absolute bottom-24 top-40 z-0 w-px sm:top-44"
          style={{
            left: '3.5rem',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {tiers.map((t, i) => (
          <motion.div
            key={t.id}
            className="relative z-10 flex items-center gap-5"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {/* Node with pulsing aura */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: t.color }}
                animate={{ scale: [1, 2.1], opacity: [0.45, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.25 }}
              />
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: t.color }}
                animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.25 + 1.4 }}
              />
              <span
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold"
                style={{
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0%, ${t.color} 55%)`,
                  boxShadow: `0 0 26px 4px ${t.color}cc, inset 0 0 14px ${t.color}`,
                  color: '#fff',
                  fontFamily: 'var(--font-ui)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.45)',
                }}
              >
                {t.level}
              </span>
            </div>

            {/* Label */}
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: t.color, fontFamily: 'var(--font-ui)' }}
              >
                {chakra(t)}
              </p>
              <p
                className="text-lg font-semibold leading-tight sm:text-xl"
                style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
              >
                {label(t)}
              </p>
              <p
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-ui)' }}
              >
                {dict.scale.hawkins} {t.hawkinsRange[0]}–{t.hawkinsRange[1]} · {t.solfeggioHz} Hz
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="mb-1 text-[0.7rem] uppercase tracking-[0.2em]"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-ui)' }}
        >
          {dict.scale.heading}
        </span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  )
}
