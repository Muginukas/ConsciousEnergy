'use client'

import { motion } from 'framer-motion'

/**
 * Atmospheric backdrop framing the spectrum between the two destinations of
 * the Map of Consciousness: paradise above the crown (radiant golden light and
 * descending rays) and the underworld below the root (fiery glow, flames and
 * rising embers). Purely decorative, dark-cosmic, slow motion.
 */

// God-ray fan descending from the top centre.
const RAYS = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => {
  const xc = 50 + k * 9
  return `M50,0 L${(xc - 1.3).toFixed(1)},100 L${(xc + 1.3).toFixed(1)},100 Z`
})

// Flame silhouettes along the bottom edge (viewBox 100 × 30, base at y=30).
const FLAMES = [10, 24, 38, 50, 62, 76, 90].map((cx, i) => {
  const w = 7 + (i % 3) * 1.6
  const h = 16 + (i % 4) * 4
  return {
    d: `M${cx - w},30 C${cx - w},${30 - h * 0.5} ${cx - w * 0.4},${30 - h * 0.7} ${cx},${30 - h} C${cx + w * 0.4},${30 - h * 0.7} ${cx + w},${30 - h * 0.5} ${cx + w},30 Z`,
    delay: (i % 5) * 0.3,
    dur: 2.4 + (i % 3) * 0.5,
  }
})

// Deterministic rising embers (seeded mulberry32 — no hydration mismatch).
const EMBERS = (() => {
  let seed = 0x1a2b3c4d
  const rnd = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return Array.from({ length: 16 }, () => ({
    left: rnd() * 100,
    size: rnd() * 2.5 + 1,
    rise: rnd() * 60 + 40,
    duration: rnd() * 4 + 4,
    delay: rnd() * 6,
  }))
})()

export default function RealmsBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── Paradise (top): radiant golden light ── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[44%]"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, rgba(255,244,212,0.32) 0%, rgba(241,196,15,0.13) 28%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        className="absolute inset-x-0 top-0 h-[58%] w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ mixBlendMode: 'screen' }}
      >
        <defs>
          <linearGradient id="paradise-ray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff6da" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f1c40f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.g
          fill="url(#paradise-ray)"
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {RAYS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </motion.g>
      </svg>

      {/* ── Underworld (bottom): fiery glow, flames, embers ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[44%]"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 100%, rgba(255,94,20,0.30) 0%, rgba(192,30,20,0.22) 30%, transparent 72%)',
          mixBlendMode: 'screen',
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-[20%] w-full"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ mixBlendMode: 'screen' }}
      >
        <defs>
          <linearGradient id="hell-flame" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c0392b" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#e67e22" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f1c40f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {FLAMES.map((f, i) => (
          <motion.path
            key={i}
            d={f.d}
            fill="url(#hell-flame)"
            style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
            animate={{ scaleY: [1, 1.18, 0.92, 1], opacity: [0.7, 0.95, 0.7] }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      {EMBERS.map((e, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: 0,
            width: e.size,
            height: e.size,
            background: 'radial-gradient(circle, #ffd27f 0%, #e0521a 70%, transparent 100%)',
          }}
          animate={{ y: [0, -e.rise], opacity: [0, 0.9, 0] }}
          transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
