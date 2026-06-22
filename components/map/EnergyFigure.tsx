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

// ── Concentric, colour-banded aura (outer violet → inner red) ──
const AURA_BANDS = [
  { c: '#9d6bd6', rx: 58, ry: 166 },
  { c: '#5b3a8c', rx: 51, ry: 151 },
  { c: '#2980b9', rx: 44, ry: 137 },
  { c: '#27ae60', rx: 37, ry: 123 },
  { c: '#f1c40f', rx: 30, ry: 109 },
  { c: '#e67e22', rx: 23, ry: 96 },
  { c: '#c0392b', rx: 16, ry: 83 },
]

// ── Toroidal surface rings (horizontal) ──
const TORUS_RINGS = [
  { y: 55, rx: 26 },
  { y: 100, rx: 40 },
  { y: 150, rx: 45 },
  { y: 200, rx: 40 },
  { y: 248, rx: 26 },
]

// ── Poloidal field loops: up the central axis, out & down the sides ──
const POLOIDAL = [18, 32, 46].flatMap((w) => [
  `M60,16 C60,90 60,230 60,304 C${60 - w},250 ${60 - w},70 60,16 Z`,
  `M60,16 C60,90 60,230 60,304 C${60 + w},250 ${60 + w},70 60,16 Z`,
])

// ── Vortex spiral arms (squashed for funnel perspective) ──
function spiralPath(cx: number, cy: number, turns: number, maxR: number, dir: 1 | -1, startDeg: number) {
  const steps = Math.round(turns * 28)
  const s0 = (startDeg * Math.PI) / 180
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const ang = s0 + dir * t * turns * 2 * Math.PI
    const r = t * maxR
    const x = cx + r * Math.cos(ang)
    const y = cy + r * Math.sin(ang) * 0.5
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `
  }
  return d.trim()
}
const TOP_VORTEX = [0, 120, 240].map((a) => spiralPath(60, 20, 2.3, 23, 1, a))
const BOTTOM_VORTEX = [0, 120, 240].map((a) => spiralPath(60, 300, 2.3, 23, -1, a))

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

        {/* ── Aura: concentric, brighter colour bands (additive glow) ── */}
        <motion.g
          style={{ mixBlendMode: 'screen', transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{ scale: [1, 1.035, 1], opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {AURA_BANDS.map((b, i) => (
            <g key={i}>
              <ellipse cx={60} cy={150} rx={b.rx} ry={b.ry} fill={b.c} fillOpacity={0.1} />
              <ellipse
                cx={60}
                cy={150}
                rx={b.rx}
                ry={b.ry}
                fill="none"
                stroke={b.c}
                strokeOpacity={0.55}
                strokeWidth={0.7}
              />
            </g>
          ))}
        </motion.g>

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

        {/* ── Toroidal field: outline + circulating rings + flowing loops ── */}
        <g stroke="url(#field-grad)" fill="none" strokeLinecap="round">
          {/* Field silhouette */}
          <path d="M60,8 C20,40 14,118 16,160 C14,202 20,280 60,312" strokeWidth={0.8} opacity={0.65} />
          <path d="M60,8 C100,40 106,118 104,160 C106,202 100,280 60,312" strokeWidth={0.8} opacity={0.65} />

          {/* Toroidal rings — energy circling the axis (dashes travel) */}
          {TORUS_RINGS.map((r, i) => (
            <motion.ellipse
              key={`r${i}`}
              cx={60}
              cy={r.y}
              rx={r.rx}
              ry={6.5}
              strokeWidth={0.7}
              strokeOpacity={0.7}
              strokeDasharray="3 7"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Poloidal loops — flow up the centre, down the sides */}
          {POLOIDAL.map((d, i) => (
            <motion.path
              key={`p${i}`}
              d={d}
              strokeWidth={0.6}
              strokeOpacity={0.5}
              strokeDasharray="2.5 9"
              animate={{ strokeDashoffset: [0, -60] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </g>

        {/* ── Vortex funnels swirling at the crown and the root ── */}
        <motion.g
          stroke="url(#field-grad)"
          fill="none"
          strokeWidth={0.7}
          opacity={0.8}
          style={{ transformBox: 'fill-box', transformOrigin: '60px 20px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          {TOP_VORTEX.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </motion.g>
        <motion.g
          stroke="url(#field-grad)"
          fill="none"
          strokeWidth={0.7}
          opacity={0.8}
          style={{ transformBox: 'fill-box', transformOrigin: '60px 300px' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          {BOTTOM_VORTEX.map((d, i) => (
            <path key={i} d={d} />
          ))}
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
          <path d="M60,38 L60,176" strokeWidth={0.6} opacity={0.5} />
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
