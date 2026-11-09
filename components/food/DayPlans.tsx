import { BODY_ANGSTROM, SCALE_MAX, tierOf } from '@/lib/food-angstrom'
import { DAY_PLANS } from '@/lib/food-menu'
import { Meter, fmtA, harmonyColor } from './Meter'

const ui = { fontFamily: 'var(--font-ui)' }

export default function DayPlans({ lang }: { lang: string }) {
  const l = lang === 'lt' ? 'lt' : 'en'
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {DAY_PLANS.map((p) => {
        const tier = tierOf(p.angstrom)
        return (
          <article key={p.id} className="rounded-2xl p-5 flex flex-col" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', borderTop: `5px solid ${tier.color}` }}>
            <h3 className="text-2xl font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              <span aria-hidden="true">{p.icon}</span> {p.title[l]}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>{p.intro[l]}</p>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <Meter
                label={l === 'lt' ? 'Dienos vibracija' : 'Day’s vibration'}
                value={`${fmtA(p.angstrom)} Å`}
                pct={(p.angstrom / SCALE_MAX) * 100}
                marker={(BODY_ANGSTROM / SCALE_MAX) * 100}
                color={tier.color}
                note={tier.title[l]}
              />
              <Meter label={l === 'lt' ? 'Dienos harmonija' : 'Day’s harmony'} value={`${p.harmony}%`} pct={p.harmony} color={harmonyColor(p.harmony)} />
            </div>
            <ol className="mt-auto space-y-1.5" style={ui}>
              {p.slots.map((s) => (
                <li key={s.time} className="grid items-center gap-2 text-sm rounded-lg px-3 py-2" style={{ gridTemplateColumns: '3rem 1fr auto', backgroundColor: 'var(--color-earth-50)' }}>
                  <span className="tabular-nums font-semibold" style={{ color: 'var(--color-text-muted)' }}>{s.time}</span>
                  <a href={`#${s.dish.id}`} className="hover:underline min-w-0" style={{ color: 'var(--color-text-primary)' }}>
                    <span className="block text-[11px] uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{s.label[l]}</span>
                    <span aria-hidden="true">{s.dish.icon}</span> {s.dish.name[l]}
                  </a>
                  <span className="tabular-nums text-xs font-semibold" style={{ color: tierOf(s.dish.angstrom).color }}>{fmtA(s.dish.angstrom)} Å</span>
                </li>
              ))}
            </ol>
          </article>
        )
      })}
    </div>
  )
}
