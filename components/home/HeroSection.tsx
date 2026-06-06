import Link from 'next/link'

type Props = {
  lang: string
  dict: {
    home: {
      hero: { title: string; subtitle: string; cta: string }
    }
  }
}

export default function HeroSection({ lang, dict }: Props) {
  const hero = dict.home.hero
  const [line1, line2] = hero.title.split('\n')

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-4 py-32 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, var(--color-forest-900) 0%, #2a3d1a 50%, var(--color-earth-900) 100%)`,
        minHeight: '80vh',
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, #52a07a 0%, transparent 60%),
            radial-gradient(circle at 70% 30%, var(--color-gold-400) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Tagline */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-6 opacity-70"
          style={{ color: 'var(--color-gold-200)', fontFamily: 'var(--font-ui)' }}
        >
          Ancient Wisdom · Modern Practice
        </p>

        {/* Title */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
        >
          {line1}
          <br />
          <span style={{ color: 'var(--color-gold-200)' }}>{line2}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-80 leading-relaxed"
          style={{ color: 'var(--color-forest-200)', fontFamily: 'var(--font-body)' }}
        >
          {hero.subtitle}
        </p>

        {/* CTA */}
        <Link
          href={`/${lang}/techniques`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-forest-500), var(--color-forest-700))',
            color: '#fff',
            fontFamily: 'var(--font-ui)',
            boxShadow: '0 4px 24px rgba(45,106,79,0.4)',
          }}
        >
          {hero.cta}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-earth-50))',
        }}
      />
    </section>
  )
}
