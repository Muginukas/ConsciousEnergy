import { ZODIAC_SIGNS, ELEMENT_MAP } from '@/lib/zodiac'
import { norm } from '@/lib/astro/ephemeris'
import { PLANETS } from '@/lib/astro/natal-data'
import type { NatalChart } from '@/lib/astro/natal'

const C = 200
const ASPECT_COLOR: Record<string, string> = {
  conjunction: '#a16207',
  sextile: '#0369a1',
  square: '#b91c1c',
  trine: '#15803d',
  opposition: '#7e22ce',
}

export default function ChartWheel({ chart }: { chart: NatalChart }) {
  const asc = chart.angles?.asc ?? 0
  const pt = (lon: number, r: number) => {
    const th = ((180 + (lon - asc)) * Math.PI) / 180
    return [C + r * Math.cos(th), C - r * Math.sin(th)] as const
  }

  // spread planet glyphs so they don't overlap
  const sorted = [...chart.planets].sort((a, b) => a.lon - b.lon)
  const display = new Map<string, number>()
  let prev = -999
  for (const p of sorted) {
    let d = p.lon
    if (d - prev < 8) d = prev + 8
    display.set(p.id, d)
    prev = d
  }

  const lonOf = (id: string) =>
    id === 'asc' ? chart.angles!.asc : id === 'mc' ? chart.angles!.mc : chart.planets.find((p) => p.id === id)!.lon

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[520px] mx-auto" role="img" aria-label="Natal chart wheel">
      <circle cx={C} cy={C} r={195} fill="#fff" stroke="var(--color-earth-200)" />
      <circle cx={C} cy={C} r={165} fill="none" stroke="var(--color-earth-200)" />
      <circle cx={C} cy={C} r={92} fill="var(--color-earth-50)" stroke="var(--color-earth-200)" />

      {/* zodiac band */}
      {ZODIAC_SIGNS.map((s, i) => {
        const start = i * 30
        const [x1, y1] = pt(start, 165)
        const [x2, y2] = pt(start, 195)
        const [gx, gy] = pt(start + 15, 180)
        const color = ELEMENT_MAP[s.element].color
        return (
          <g key={s.slug}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-earth-200)" />
            <text x={gx} y={gy} fontSize="15" textAnchor="middle" dominantBaseline="central" fill={color}>
              {s.symbol}
            </text>
          </g>
        )
      })}
      {/* degree ticks */}
      {Array.from({ length: 72 }, (_, i) => {
        const [x1, y1] = pt(i * 5, 165)
        const [x2, y2] = pt(i * 5, i % 2 ? 161 : 158)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-earth-200)" />
      })}

      {/* houses */}
      {chart.cusps?.map((c, i) => {
        const angular = i % 3 === 0
        const [x1, y1] = pt(c, 92)
        const [x2, y2] = pt(c, 165)
        const next = chart.cusps![(i + 1) % 12]
        const mid = c + norm(next - c) / 2
        const [nx, ny] = pt(mid, 100)
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={angular ? 'var(--color-text-secondary)' : 'var(--color-earth-200)'} strokeWidth={angular ? 1.4 : 0.8} />
            <text x={nx} y={ny} fontSize="8" textAnchor="middle" dominantBaseline="central" fill="var(--color-text-muted)">
              {i + 1}
            </text>
          </g>
        )
      })}
      {chart.angles && (
        <>
          <text x={pt(chart.angles.asc, 152)[0] + 4} y={pt(chart.angles.asc, 152)[1] - 6} fontSize="8" fill="var(--color-text-secondary)" fontWeight="600">ASC</text>
          <text x={pt(chart.angles.mc, 152)[0] + 3} y={pt(chart.angles.mc, 152)[1]} fontSize="8" fill="var(--color-text-secondary)" fontWeight="600">MC</text>
        </>
      )}

      {/* aspects */}
      {chart.aspects
        .filter((a) => a.type !== 'conjunction')
        .map((a, i) => {
          const [x1, y1] = pt(lonOf(a.a), 90)
          const [x2, y2] = pt(lonOf(a.b), 90)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={ASPECT_COLOR[a.type]}
              strokeWidth={a.orb < 2 ? 1.3 : 0.8}
              strokeOpacity={0.75}
              strokeDasharray={a.type === 'sextile' ? '3 2' : undefined}
            />
          )
        })}

      {/* planets */}
      {chart.planets.map((p) => {
        const d = display.get(p.id) ?? p.lon
        const [x, y] = pt(d, 132)
        const [tx, ty] = pt(p.lon, 165)
        const [tx2, ty2] = pt(p.lon, 155)
        return (
          <g key={p.id}>
            <line x1={tx} y1={ty} x2={tx2} y2={ty2} stroke="var(--color-text-primary)" strokeWidth={1} />
            <text x={x} y={y} fontSize="15" textAnchor="middle" dominantBaseline="central" fill="var(--color-text-primary)">
              {PLANETS[p.id].symbol}
            </text>
            {p.retrograde && (
              <text x={x + 8} y={y + 7} fontSize="7" fill="#b91c1c">R</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
