import Link from 'next/link'
import { VIBRATION_TIERS } from '@/lib/vibration'

export default function VibrationStrip({ lang }: { lang: string }) {
  const lt = lang === 'lt'
  const tiers = [...VIBRATION_TIERS].sort((a, b) => b.level - a.level)
  return (
    <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
            {lt ? 'Vibracijų žemėlapis' : 'The vibration map'}
          </p>
          <h2 className="text-4xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            {lt ? 'Septynios sąmonės pakopos' : 'Seven levels of consciousness'}
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {lt
              ? 'Nuo išlikimo iki vienovės — kiekviena pakopa turi savo čakrą, Solfeggio dažnį ir Hawkinso kalibraciją. Ir kiekvienai yra praktikos, kurios padeda pakilti aukščiau. Atlikite trumpą savęs vertinimą ir sužinokite, kur esate dabar.'
              : 'From survival to unity — each level has its chakra, Solfeggio tone and Hawkins calibration, and practices that help you rise. Take a short self-assessment to see where you are now.'}
          </p>
          <Link
            href={`/${lang}/map#assessment`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#6b3fa0', color: '#fff', fontFamily: 'var(--font-ui)' }}
          >
            {lt ? 'Atlikti savęs vertinimą' : 'Take the self-assessment'} →
          </Link>
        </div>

        <ol className="space-y-2">
          {tiers.map((t) => (
            <li key={t.id}>
              <Link
                href={`/${lang}/map`}
                className="grid items-center gap-3 rounded-xl px-4 py-2.5 transition-transform hover:translate-x-1"
                style={{ gridTemplateColumns: '2rem 1fr auto', backgroundColor: `${t.color}14`, borderLeft: `5px solid ${t.color}` }}
              >
                <span className="text-sm font-bold tabular-nums" style={{ color: t.color, fontFamily: 'var(--font-ui)' }}>{t.level}</span>
                <span className="min-w-0">
                  <span className="block font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>
                    {lt ? t.labelLt : t.label}
                  </span>
                  <span className="block text-xs truncate" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                    {lt ? t.chakraLt : t.chakra}
                  </span>
                </span>
                <span className="text-xs font-semibold tabular-nums whitespace-nowrap" style={{ color: t.color, fontFamily: 'var(--font-ui)' }}>
                  {t.solfeggioHz} Hz
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
