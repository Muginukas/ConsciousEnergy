import Link from 'next/link'

export default function JourneySection({ lang }: { lang: string }) {
  const lt = lang === 'lt'
  const steps = [
    {
      icon: '✨',
      title: lt ? 'Pažink' : 'Know',
      text: lt
        ? 'Zodiako ženklas, gimimo horoskopas, Human Design ir vardo vibracija parodo jūsų prigimtį: stiprybes, pamokas ir ritmą.'
        : 'Your sign, natal chart, Human Design and name vibration reveal your nature: strengths, lessons and rhythm.',
      href: `/${lang}/zodiac`,
      link: lt ? 'Į zodiaką' : 'To the zodiac',
    },
    {
      icon: '📍',
      title: lt ? 'Išmatuok' : 'Measure',
      text: lt
        ? 'Vibracijų žemėlapis sujungia Hawkinso skalę, Solfeggio dažnius ir čakras. Savęs vertinimas parodo, kur esate šiandien.'
        : 'The vibration map unites Hawkins’ scale, the Solfeggio tones and the chakras. A self-assessment shows where you are today.',
      href: `/${lang}/map`,
      link: lt ? 'Į žemėlapį' : 'To the map',
    },
    {
      icon: '🧘',
      title: lt ? 'Praktikuok' : 'Practise',
      text: lt
        ? 'Kvėpavimas, meditacija, joga, kundalini ir energijos darbas — technikos, parinktos kiekvienai vibracijos pakopai.'
        : 'Breathwork, meditation, yoga, kundalini and energy work — practices chosen for each level of vibration.',
      href: `/${lang}/techniques`,
      link: lt ? 'Į technikas' : 'To the practices',
    },
    {
      icon: '🌿',
      title: lt ? 'Maitink' : 'Nourish',
      text: lt
        ? 'Gyvas, aukštos vibracijos ir tarpusavyje derantis maistas palaiko pasiektą būseną kasdien — ne tik ant kilimėlio.'
        : 'Living, high-vibration, well-combined food holds the state you reach — every day, not only on the mat.',
      href: `/${lang}/food-pyramid`,
      link: lt ? 'Į mitybą' : 'To nourishment',
    },
  ]

  return (
    <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            {lt ? 'Kaip viskas susiję' : 'How it all connects'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {lt
              ? 'Ne atskiros temos, o vienas ratas: kuo geriau save pažįstate, tuo tiksliau renkatės praktikas ir maistą — ir tuo aukštesnė tampa jūsų vibracija.'
              : 'Not separate topics but one cycle: the better you know yourself, the better you choose practices and food — and the higher your vibration rises.'}
          </p>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex flex-col rounded-2xl p-6" style={{ backgroundColor: 'var(--color-earth-50)', border: '1px solid var(--color-earth-200)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-11 h-11 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: 'var(--color-forest-50)', border: '1px solid var(--color-forest-200)' }} aria-hidden="true">
                  {s.icon}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                  {lt ? 'Žingsnis' : 'Step'} {i + 1}
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{s.text}</p>
              <Link href={s.href} className="text-sm font-semibold" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>
                {s.link} →
              </Link>
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-4 text-xl" style={{ color: 'var(--color-earth-500)' }} aria-hidden="true">→</span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
          ↻ {lt ? 'ir vėl iš pradžių — su aukštesne vibracija' : 'and round again — at a higher vibration'}
        </p>
      </div>
    </section>
  )
}
