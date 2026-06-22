'use client'

import { motion } from 'framer-motion'

/**
 * Decorative, non-interactive layers for the energy figure — a stylised,
 * hand-coded "lightbody": a layered, banded aura, a swirling vortex toroidal
 * field, a Flower-of-Life backdrop, a luminous standing silhouette and roots
 * into the earth. Purely visual; the interactive chakra mandalas are drawn on
 * top in VibrationMapScene. All layers share the 0 0 120 320 coordinate space.
 * Dark/cosmic mood; motion is slow and continuous (no flashing).
 */

// ── Flower of Life — 19 circles on a triangular lattice (rows 3·4·5·4·3) ──
const FOL_S = 11
const FOL_H = FOL_S * 0.8660254
const FOL_CENTERS: Array<[number, number]> = (() => {
  const rows: Array<[number, number[]]> = [
    [-2 * FOL_H, [-1, 0, 1]],
    [-1 * FOL_H, [-1.5, -0.5, 0.5, 1.5]],
    [0, [-2, -1, 0, 1, 2]],
    [1 * FOL_H, [-1.5, -0.5, 0.5, 1.5]],
    [2 * FOL_H, [-1, 0, 1]],
  ]
  const out: Array<[number, number]> = []
  for (const [y, xs] of rows) for (const x of xs) out.push([60 + x * FOL_S, 150 + y])
  return out
})()

// ── Slender lightbody silhouette (rendered mainly as a luminous outline) ──
const BODY =
  'M50,44 C43,47 40,60 43,90 L47,150 C48,164 49,172 51,180 L54,306 L59,306 L60,184 L61,306 L66,306 C68,172 69,164 70,150 L77,90 C80,60 77,47 70,44 C66,53 54,53 50,44 Z'
const ARM_L = 'M49,48 C42,55 39,82 41,122 L44,121 C45,88 47,62 51,50 Z'
const ARM_R = 'M71,48 C78,55 81,82 79,122 L76,121 C75,88 73,62 69,50 Z'

export default function EnergyFigure() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 120 320"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="figure-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b98ce0" />
            <stop offset="30%" stopColor="#5a7fd4" />
            <stop offset="52%" stopColor="#3f9d6b" />
            <stop offset="70%" stopColor="#e0a020" />
            <stop offset="100%" stopColor="#c0392b" />
          </linearGradient>
          <linearGradient id="field-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cda8f0" />
            <stop offset="50%" stopColor="#5ee7d8" />
            <stop offset="100%" stopColor="#f4d06a" />
          </linearGradient>
          <filter id="figure-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>

        {/* ── Sacred geometry: slowly rotating Flower of Life behind the torso ── */}
        <g stroke="url(#field-grad)" strokeWidth={0.5} fill="none" opacity={0.16}>
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            {FOL_CENTERS.map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={FOL_S} />
            ))}
            <circle cx={60} cy={150} r={FOL_S * 3} />
            <circle cx={60} cy={150} r={FOL_S * 3.4} />
          </motion.g>
        </g>

        {/* ── Luminous lightbody silhouette (outline-led, professional) ── */}
        <g strokeLinejoin="round">
          {/* soft glow */}
          <g filter="url(#figure-glow)" fill="url(#figure-grad)" opacity={0.4}>
            <ellipse cx={60} cy={27} rx={8.5} ry={11} />
            <path d={BODY} />
            <path d={ARM_L} />
            <path d={ARM_R} />
          </g>
          {/* faint inner fill */}
          <g fill="url(#figure-grad)" opacity={0.13}>
            <ellipse cx={60} cy={27} rx={8.5} ry={11} />
            <path d={BODY} />
            <path d={ARM_L} />
            <path d={ARM_R} />
          </g>
          {/* crisp luminous outline */}
          <g fill="none" stroke="url(#figure-grad)" strokeWidth={0.9} opacity={0.72}>
            <ellipse cx={60} cy={27} rx={8.5} ry={11} />
            <path d={BODY} />
            <path d={ARM_L} />
            <path d={ARM_R} />
          </g>
          {/* central channel */}
          <path d="M60,40 L60,178" fill="none" stroke="url(#figure-grad)" strokeWidth={0.6} opacity={0.45} />
        </g>
      </svg>

      {/* Crown cosmos halo */}
      <motion.div
        className="absolute left-1/2 top-0 h-24 w-40 -translate-x-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(157,107,214,0.6), transparent 70%)' }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Earth roots below the feet */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[16%] w-full"
        viewBox="0 0 120 60"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <g stroke="#c0392b" strokeWidth={1.4} fill="none" strokeLinecap="round">
          <path d="M60,0 C58,14 52,20 44,30 C38,38 36,46 34,58" opacity={0.8} />
          <path d="M60,0 C62,14 68,20 76,30 C82,38 84,46 86,58" opacity={0.8} />
          <path d="M60,2 C60,18 60,32 60,56" opacity={0.7} />
          <path d="M52,18 C48,26 46,36 42,50" opacity={0.5} />
          <path d="M68,18 C72,26 74,36 78,50" opacity={0.5} />
        </g>
      </svg>
    </div>
  )
}
