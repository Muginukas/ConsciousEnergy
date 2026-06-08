import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import { Technique } from '@/lib/types'
import { CATEGORY_MAP } from '@/lib/categories'

type Props = {
  technique: Technique
  lang: string
}

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const DIFFICULTY_DOT: Record<string, string> = {
  beginner: 'bg-green-500',
  intermediate: 'bg-amber-500',
  advanced: 'bg-red-500',
}

export default function TechniqueCard({ technique, lang }: Props) {
  const category = CATEGORY_MAP[technique.category]
  const href = `/${lang}/techniques/${technique.category}/${technique.slug}`

  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--color-cream)',
        border: '1px solid var(--color-earth-200)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Color bar */}
      <div className="h-1.5" style={{ backgroundColor: category.color }} />

      <div className="p-5">
        {/* Category badge */}
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
          style={{
            backgroundColor: `${category.color}18`,
            color: category.color,
            fontFamily: 'var(--font-ui)',
          }}
        >
          {category.label}
        </span>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-2 group-hover:text-[--color-forest-700] transition-colors leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {technique.title}
        </h3>

        {/* Best For chips — primary descriptor when available */}
        {technique.bestFor && technique.bestFor.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {technique.bestFor.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${category.color}12`,
                  color: category.color,
                  fontFamily: 'var(--font-ui)',
                  border: `1px solid ${category.color}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-1"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            {technique.overview}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${DIFFICULTY_DOT[technique.difficulty]}`}
              />
              <span
                className="text-xs"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
              >
                {DIFFICULTY_LABEL[technique.difficulty]}
              </span>
            </div>
            <div
              className="flex items-center gap-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <Clock size={12} />
              <span className="text-xs" style={{ fontFamily: 'var(--font-ui)' }}>
                {technique.duration}
              </span>
            </div>
          </div>
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
            style={{ color: 'var(--color-earth-500)' }}
          />
        </div>
      </div>
    </Link>
  )
}
