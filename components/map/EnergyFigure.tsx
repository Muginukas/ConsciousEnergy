'use client'

import { motion } from 'framer-motion'

/**
 * Decorative, non-interactive layers for the energy figure — a stylised,
 * hand-coded evocation of the sacred-geometry "lightbody" art: a Flower-of-Life
 * backdrop, a breathing multi-colour aura, a slowly-circulating toroidal field,
 * a luminous standing silhouette, and roots into the earth.
 *
 * Purely visual. The interactive chakra mandalas are rendered on top of this in
 * VibrationMapScene. All layers share the 0 0 120 320 coordinate space so they
 * stay aligned with the chakra positions; mood is dark/cosmic and every
 * animation is slow and soft (no flashing).
 */

// Flower of Life — 19 circles on a triangular lattice (rows of 3·4·5·4·3).
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

// Horizontal rings that read as the toroidal surface around the body.
const TORUS_RINGS = [
  { y: 60, rx: 30 },
  { y: 110, rx: 42 },
  { y: 160, rx: 46 },
  { y: 210, rx: 42 },
  { y: 260, rx: 30 },
]

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
            <stop offset="0%" stopColor="#b98ce0" />
            <stop offset="50%" stopColor="#4fd1c5" />
            <stop offset="100%" stopColor="#e0a020" />
          </linearGradient>
          <filter id="figure-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <radialGradient id="aura-cool" cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#9d6bd6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#5a7fd4" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5a7fd4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aura-mid" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#3f9d6b" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#4fd1c5" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#4fd1c5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aura-warm" cx="50%" cy="62%" r="60%">
            <stop offset="0%" stopColor="#f1c40f" stopOpacity="0.32" />
            <stop offset="70%" stopColor="#e0a020" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Aura: three breathing, colour-layered halos ── */}
        <g>
          {[
            { fill: 'url(#aura-cool)', rx: 52, ry: 152 },
            { fill: 'url(#aura-mid)', rx: 40, ry: 136 },
            { fill: 'url(#aura-warm)', rx: 27, ry: 120 },
          ].map((a, i) => (
            <motion.ellipse
              key={i}
              cx={60}
              cy={150}
              rx={a.rx}
              ry={a.ry}
              fill={a.fill}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </g>

        {/* ── Sacred geometry: Flower of Life behind the torso ── */}
        <g
          stroke="url(#field-grad)"
          strokeWidth={0.5}
          fill="none"
          opacity={0.16}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            {FOL_CENTERS.map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={FOL_S} />
            ))}
            {/* Outer containing rings */}
            <circle cx={60} cy={150} r={FOL_S * 3} />
            <circle cx={60} cy={150} r={FOL_S * 3.4} />
          </motion.g>
        </g>

        {/* ── Toroidal field ── */}
        <motion.g
          stroke="url(#field-grad)"
          fill="none"
          strokeLinecap="round"
          animate={{ opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Field silhouette (apple/donut outline) */}
          <path d="M60,8 C20,40 14,118 16,160 C14,202 20,280 60,312" strokeWidth={0.7} opacity={0.7} />
          <path d="M60,8 C100,40 106,118 104,160 C106,202 100,280 60,312" strokeWidth={0.7} opacity={0.7} />
          {/* Central axis */}
          <path d="M60,10 L60,310" strokeWidth={0.5} opacity={0.4} />
          {/* Toroidal surface rings */}
          {TORUS_RINGS.map((r, i) => (
            <ellipse key={i} cx={60} cy={r.y} rx={r.rx} ry={6.5} strokeWidth={0.6} opacity={0.55} />
          ))}
          {/* Top & bottom vortices */}
          <ellipse cx={60} cy={13} rx={17} ry={4.5} strokeWidth={0.6} />
          <ellipse cx={60} cy={307} rx={17} ry={4.5} strokeWidth={0.6} />
        </motion.g>

        {/* ── Luminous standing silhouette ── */}
        <g fill="url(#figure-grad)" opacity={0.34} stroke="url(#figure-grad)" strokeWidth={0.8}>
          <g filter="url(#figure-glow)" opacity={0.6}>
            <circle cx={60} cy={24} r={14} />
            <path d="M44,40 C36,44 33,58 36,86 L41,150 L43,176 L47,308 L57,308 L59,182 L61,182 L63,308 L73,308 L77,176 L79,150 L84,86 C87,58 84,44 76,40 C72,52 48,52 44,40 Z" />
            <path d="M40,46 C30,58 27,92 30,132 L36,131 L43,60 Z" />
            <path d="M80,46 C90,58 93,92 90,132 L84,131 L77,60 Z" />
          </g>
          <circle cx={60} cy={24} r={14} />
          <path d="M44,40 C36,44 33,58 36,86 L41,150 L43,176 L47,308 L57,308 L59,182 L61,182 L63,308 L73,308 L77,176 L79,150 L84,86 C87,58 84,44 76,40 C72,52 48,52 44,40 Z" />
          <path d="M40,46 C30,58 27,92 30,132 L36,131 L43,60 Z" />
          <path d="M80,46 C90,58 93,92 90,132 L84,131 L77,60 Z" />
          {/* Inner central channel */}
          <path d="M60,38 L60,176" strokeWidth={0.6} opacity={0.5} />
        </g>
      </svg>

      {/* Crown cosmos halo */}
      <motion.div
        className="absolute left-1/2 top-0 h-24 w-40 -translate-x-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(157,107,214,0.55), transparent 70%)' }}
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
