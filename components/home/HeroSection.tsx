import Link from 'next/link'

type Stat = { value: number; label: string }

type Props = {
  lang: string
  stats: Stat[]
}

export default function HeroSection({ lang, stats }: Props) {
  const lt = lang === 'lt'

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-28 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, var(--color-forest-900) 0%, #2a3d1a 50%, var(--color-earth-900) 100%)',
        minHeight: '82vh',
      }}
    >
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 45%, #52a07a 0%, transparent 55%),
            radial-gradient(circle at 75% 25%, var(--color-gold-400) 0%, transparent 45%),
            radial-gradient(circle at 60% 85%, #6b3fa0 0%, transparent 45%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase mb-6 opacity-80" style={{ color: 'var(--color-gold-200)', fontFamily: 'var(--font-ui)' }}>
          {lt ? 'Praktikos · Vibracija · Žvaigždės · Mityba' : 'Practice · Vibration · Stars · Nourishment'}
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
          {lt ? 'Sąmonė ir energija' : 'Consciousness & Energy'}
          <br />
          <span style={{ color: 'var(--color-gold-200)' }}>{lt ? 'viename žemėlapyje' : 'on one map'}</span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-85 leading-relaxed" style={{ color: 'var(--color-forest-200)', fontFamily: 'var(--font-body)' }}>
          {lt
            ? 'Pažinkite save per žvaigždes ir skaičius, išmatuokite savo vibraciją, keiskite ją senovinėmis praktikomis ir maitinkite gyvu, suderintu maistu. Viskas, kas pakelia sąmonę, — vienoje vietoje.'
            : 'Know yourself through the stars and numbers, measure your vibration, shift it with ancient practices and nourish it with living, well-combined food. Everything that raises consciousness — in one place.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/${lang}/map`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, var(--color-forest-500), var(--color-forest-700))',
              color: '#fff',
              fontFamily: 'var(--font-ui)',
              boxShadow: '0 4px 24px rgba(45,106,79,0.4)',
            }}
          >
            {lt ? 'Išmatuokite savo vibraciją' : 'Measure your vibration'}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#keliai"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-colors"
            style={{ color: 'var(--color-gold-200)', border: '1px solid rgba(232,212,139,0.5)', fontFamily: 'var(--font-ui)' }}
          >
            {lt ? 'Keturi keliai' : 'The four paths'} ↓
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>{s.value}</span>
                <span className="block text-xs uppercase tracking-wide opacity-75" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-forest-200)' }}>{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-earth-50))' }} />
    </section>
  )
}
