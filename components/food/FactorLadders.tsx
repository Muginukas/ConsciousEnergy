import { BODY_ANGSTROM, FACTORS, SCALE_MAX, tierOf } from '@/lib/food-angstrom'

const ui = { fontFamily: 'var(--font-ui)' }
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export default function FactorLadders({ lang }: { lang: string }) {
  const l = lang === 'lt' ? 'lt' : 'en'
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {FACTORS.map((fct) => (
        <article key={fct.id} className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            <span aria-hidden="true">{fct.icon}</span> {fct.title[l]}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
            {fct.text[l]}
          </p>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-text-muted)' }}>
            {l === 'lt' ? 'Pavyzdys' : 'Example'}: {fct.example[l]}
          </p>
          <ul className="space-y-2">
            {fct.steps.map((s) => {
              const t = tierOf(s.angstrom)
              return (
                <li key={s.label.en} className="grid items-center gap-2" style={{ gridTemplateColumns: 'minmax(7.5rem, 40%) 1fr 4.5rem', ...ui }}>
                  <span className="text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>{s.label[l]}</span>
                  <span className="relative h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
                    <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(2, (s.angstrom / SCALE_MAX) * 100)}%`, backgroundColor: t.color }} />
                    <span className="absolute -top-0.5 -bottom-0.5 w-0.5" style={{ left: `${(BODY_ANGSTROM / SCALE_MAX) * 100}%`, backgroundColor: 'var(--color-gold-400)' }} />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-right" style={{ color: t.color }}>{fmt(s.angstrom)} Å</span>
                </li>
              )
            })}
          </ul>
        </article>
      ))}
    </div>
  )
}
