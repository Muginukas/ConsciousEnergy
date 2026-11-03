import { CHANNELS, CenterId, GATE_CENTER, HdChart } from '@/lib/astro/humandesign'

const P_COLOR = '#1c1a17'
const D_COLOR = '#c0392b'
const OFF = '#e6dccb'

const POS: Record<CenterId, [number, number]> = {
  head: [180, 45],
  ajna: [180, 125],
  throat: [180, 215],
  g: [180, 335],
  heart: [240, 395],
  spleen: [50, 460],
  solar: [310, 460],
  sacral: [180, 480],
  root: [180, 585],
}

const FILL: Record<CenterId, string> = {
  head: '#f2d16b',
  ajna: '#86b98b',
  throat: '#c4a07a',
  g: '#f2d16b',
  heart: '#e7836a',
  spleen: '#c4a07a',
  solar: '#c4a07a',
  sacral: '#e7836a',
  root: '#c4a07a',
}

function shape(c: CenterId, fill: string) {
  const [x, y] = POS[c]
  const stroke = { stroke: '#8c8070', strokeWidth: 1.2, fill }
  switch (c) {
    case 'head':
      return <polygon points={`${x},${y - 30} ${x - 32},${y + 24} ${x + 32},${y + 24}`} {...stroke} />
    case 'ajna':
      return <polygon points={`${x - 32},${y - 24} ${x + 32},${y - 24} ${x},${y + 30}`} {...stroke} />
    case 'g':
      return <polygon points={`${x},${y - 38} ${x + 38},${y} ${x},${y + 38} ${x - 38},${y}`} {...stroke} />
    case 'heart':
      return <polygon points={`${x - 20},${y + 16} ${x + 22},${y + 16} ${x + 6},${y - 22}`} {...stroke} />
    case 'spleen':
      return <polygon points={`${x - 28},${y - 36} ${x - 28},${y + 36} ${x + 30},${y}`} {...stroke} />
    case 'solar':
      return <polygon points={`${x + 28},${y - 36} ${x + 28},${y + 36} ${x - 30},${y}`} {...stroke} />
    default:
      return <rect x={x - 30} y={y - 27} width={60} height={54} rx={7} {...stroke} />
  }
}

export default function BodyGraph({ chart, labels }: { chart: HdChart; labels: Record<CenterId, string> }) {
  // group channels by center pair so parallel channels can be offset
  const groups = new Map<string, [number, number][]>()
  for (const ch of CHANNELS) {
    const key = [GATE_CENTER[ch[0]], GATE_CENTER[ch[1]]].sort().join('|')
    groups.set(key, [...(groups.get(key) ?? []), ch])
  }

  const colorsFor = (gate: number) => {
    const g = chart.gates.get(gate)
    if (!g) return [OFF]
    if (g.personality && g.design) return [P_COLOR, D_COLOR]
    return [g.personality ? P_COLOR : D_COLOR]
  }

  const lines: React.ReactNode[] = []
  const gateLabels: React.ReactNode[] = []
  for (const chans of groups.values()) {
    chans.forEach((ch, k) => {
      const [ga, gb] = ch
      const [ax, ay] = POS[GATE_CENTER[ga]]
      const [bx, by] = POS[GATE_CENTER[gb]]
      const len = Math.hypot(bx - ax, by - ay)
      const nx = -(by - ay) / len
      const ny = (bx - ax) / len
      const off = (k - (chans.length - 1) / 2) * 11
      const sx = ax + nx * off
      const sy = ay + ny * off
      const ex = bx + nx * off
      const ey = by + ny * off
      const mx = (sx + ex) / 2
      const my = (sy + ey) / 2
      const half = (gate: number, x1: number, y1: number, x2: number, y2: number) => {
        const cols = colorsFor(gate)
        return cols.map((col, i) => {
          const o = cols.length === 2 ? (i ? 1.6 : -1.6) : 0
          return (
            <line
              key={`${gate}-${ga}-${gb}-${i}`}
              x1={x1 + nx * o}
              y1={y1 + ny * o}
              x2={x2 + nx * o}
              y2={y2 + ny * o}
              stroke={col}
              strokeWidth={cols.length === 2 ? 2.6 : col === OFF ? 4 : 4}
              strokeLinecap="round"
            />
          )
        })
      }
      lines.push(...half(ga, sx, sy, mx, my), ...half(gb, mx, my, ex, ey))
      for (const [gate, gx, gy] of [
        [ga, sx + (ex - sx) * 0.3, sy + (ey - sy) * 0.3],
        [gb, sx + (ex - sx) * 0.7, sy + (ey - sy) * 0.7],
      ] as const) {
        if (chart.gates.has(gate)) {
          gateLabels.push(
            <g key={`l-${gate}-${ga}-${gb}`}>
              <circle cx={gx} cy={gy} r={7} fill="#fff" stroke="#8c8070" strokeWidth={0.6} />
              <text x={gx} y={gy} fontSize="7" textAnchor="middle" dominantBaseline="central" fill={P_COLOR} fontWeight="600">
                {gate}
              </text>
            </g>
          )
        }
      }
    })
  }

  return (
    <svg viewBox="0 0 360 630" className="w-full max-w-[380px] mx-auto" role="img" aria-label="Human Design BodyGraph">
      {lines}
      {(Object.keys(POS) as CenterId[]).map((c) => (
        <g key={c}>
          {shape(c, chart.defined.has(c) ? FILL[c] : '#fff')}
          <text
            x={POS[c][0]}
            y={POS[c][1] + (c === 'head' ? 8 : c === 'ajna' ? -6 : c === 'heart' ? 6 : 0)}
            fontSize="7"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3d2010"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {labels[c]}
          </text>
        </g>
      ))}
      {gateLabels}
    </svg>
  )
}
