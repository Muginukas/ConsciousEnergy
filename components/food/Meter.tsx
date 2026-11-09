import { RATING_STYLE } from '@/lib/food-combining'

const ui = { fontFamily: 'var(--font-ui)' }

export const fmtA = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export function harmonyColor(h: number) {
  return h >= 80 ? RATING_STYLE.good.color : h >= 50 ? RATING_STYLE.ok.color : RATING_STYLE.bad.color
}

export function Meter({ label, value, note, pct, color, marker }: { label: string; value: string; note?: string; pct: number; color: string; marker?: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1" style={ui}>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <span className="text-lg font-bold tabular-nums" style={{ color }}>{value}</span>
      </div>
      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-earth-200)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        {marker !== undefined && <div className="absolute top-0 bottom-0 w-0.5" style={{ left: `${marker}%`, backgroundColor: 'var(--color-gold-400)' }} />}
      </div>
      {note && <p className="mt-1 text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>{note}</p>}
    </div>
  )
}

