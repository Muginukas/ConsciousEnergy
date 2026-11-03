import Link from 'next/link'

type Tab = 'signs' | 'natal' | 'hd' | 'name'

export default function ZodiacTabs({ lang, active }: { lang: string; active: Tab }) {
  const lt = lang === 'lt'
  const tabs: { id: Tab; href: string; label: string }[] = [
    { id: 'signs', href: `/${lang}/zodiac`, label: lt ? 'Zodiako ženklai' : 'Zodiac signs' },
    { id: 'natal', href: `/${lang}/zodiac/natal-chart`, label: lt ? 'Gimimo horoskopas' : 'Natal chart' },
    { id: 'hd', href: `/${lang}/zodiac/human-design`, label: 'Human Design' },
    { id: 'name', href: `/${lang}/zodiac/name-vibration`, label: lt ? 'Vardo vibracija' : 'Name vibration' },
  ]
  return (
    <nav className="mb-10 flex gap-2 overflow-x-auto pb-1" style={{ fontFamily: 'var(--font-ui)' }}>
      {tabs.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          style={
            t.id === active
              ? { backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }
              : { backgroundColor: 'var(--color-cream)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-earth-200)' }
          }
        >
          {t.label}
        </Link>
      ))}
    </nav>
  )
}
