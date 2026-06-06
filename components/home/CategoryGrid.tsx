import Link from 'next/link'
import { Wind, Moon, Flower2, Flame, Circle, Zap } from 'lucide-react'
import { CATEGORIES } from '@/lib/categories'
import { CategorySlug } from '@/lib/types'

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Wind, Moon, Flower: Flower2, Flame, Circle, Zap,
}

type Props = {
  lang: string
  dict: { home: { categories: { title: string; subtitle: string } } }
  counts: Record<CategorySlug, number>
}

export default function CategoryGrid({ lang, dict, counts }: Props) {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-semibold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {dict.home.categories.title}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
            {dict.home.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.icon] ?? Circle
            const count = counts[cat.slug] ?? 0

            return (
              <Link
                key={cat.slug}
                href={`/${lang}/techniques/${cat.slug}`}
                className="group flex flex-col p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-earth-50)',
                  border: '1px solid var(--color-earth-200)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cat.color}18` }}
                >
                  <Icon size={24} color={cat.color} />
                </div>

                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {cat.label}
                </h3>

                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {cat.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium"
                    style={{ color: cat.color, fontFamily: 'var(--font-ui)' }}
                  >
                    {count} technique{count !== 1 ? 's' : ''}
                  </span>
                  <span
                    className="text-xs transition-transform group-hover:translate-x-1"
                    style={{ color: cat.color }}
                  >
                    →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
