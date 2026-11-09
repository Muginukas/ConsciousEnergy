import Link from 'next/link'

export type Pillar = {
  id: string
  icon: string
  color: string
  title: string
  tagline: string
  text: string
  stat: string
  href: string
  cta: string
  links: { href: string; label: string }[]
}

export default function PillarsSection({ lang, pillars }: { lang: string; pillars: Pillar[] }) {
  const lt = lang === 'lt'
  return (
    <section id="keliai" className="scroll-mt-16 py-20 px-4" style={{ backgroundColor: 'var(--color-earth-50)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
            {lt ? 'Kas čia yra' : 'What’s inside'}
          </p>
          <h2 className="text-4xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            {lt ? 'Keturi keliai į pilnatvę' : 'Four paths to wholeness'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {lt
              ? 'Kiekvienas kelias atskiras, bet visi veda į tą patį — aukštesnę sąmonę ir gyvybingesnį kūną.'
              : 'Each path stands on its own, yet all lead to the same place — higher consciousness and a more vital body.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-3xl overflow-hidden"
              style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="p-6 pb-5" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-4xl" aria-hidden="true">{p.icon}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: p.color, color: '#fff', fontFamily: 'var(--font-ui)' }}>
                    {p.stat}
                  </span>
                </div>
                <h3 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{p.title}</h3>
                <p className="text-sm font-semibold mt-1" style={{ color: p.color, fontFamily: 'var(--font-ui)' }}>{p.tagline}</p>
              </div>
              <div className="flex flex-col flex-1 p-6 pt-4">
                <p className="leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{p.text}</p>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block rounded-full px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
                        style={{ border: `1px solid ${p.color}55`, color: p.color, backgroundColor: `${p.color}0d`, fontFamily: 'var(--font-ui)' }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:translate-x-0.5"
                  style={{ backgroundColor: p.color, color: '#fff', fontFamily: 'var(--font-ui)' }}
                >
                  {p.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
