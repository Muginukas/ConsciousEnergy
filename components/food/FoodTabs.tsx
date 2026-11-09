import Link from 'next/link'

type Tab = 'pyramid' | 'combining'

export default function FoodTabs({ lang, active }: { lang: string; active: Tab }) {
  const lt = lang === 'lt'
  const tabs: { id: Tab; href: string; label: string }[] = [
    { id: 'pyramid', href: `/${lang}/food-pyramid`, label: lt ? 'Maisto piramidė' : 'Food pyramid' },
    { id: 'combining', href: `/${lang}/food-combining`, label: lt ? 'Maisto deriniai' : 'Food combining' },
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
