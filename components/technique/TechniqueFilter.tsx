'use client'

import { useState, useDeferredValue, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import Fuse from 'fuse.js'
import TechniqueCard from './TechniqueCard'
import { Technique, CategorySlug, Difficulty } from '@/lib/types'
import { CATEGORIES } from '@/lib/categories'

type Dict = {
  techniques: {
    search: string
    filter: {
      all: string
      difficulty: string
      beginner: string
      intermediate: string
      advanced: string
      clear: string
    }
    empty: string
  }
}

type Props = {
  techniques: Technique[]
  lang: string
  dict: Dict
}

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced']

export default function TechniqueFilter({ techniques, lang, dict }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategorySlug | 'all'>('all')
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')

  const deferredQuery = useDeferredValue(query)

  const fuse = useMemo(
    () =>
      new Fuse(techniques, {
        keys: ['title', 'overview', 'tradition'],
        threshold: 0.4,
      }),
    [techniques]
  )

  const filtered = useMemo(() => {
    let results = techniques

    if (deferredQuery.trim()) {
      results = fuse.search(deferredQuery).map((r) => r.item)
    }

    if (category !== 'all') {
      results = results.filter((t) => t.category === category)
    }

    if (difficulty !== 'all') {
      results = results.filter((t) => t.difficulty === difficulty)
    }

    return results
  }, [deferredQuery, category, difficulty, techniques, fuse])

  const hasFilters = query || category !== 'all' || difficulty !== 'all'

  function clearFilters() {
    setQuery('')
    setCategory('all')
    setDifficulty('all')
  }

  const t = dict.techniques

  return (
    <div>
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-muted)' }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-shadow"
            style={{
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-earth-200)',
              fontFamily: 'var(--font-ui)',
              color: 'var(--color-text-primary)',
            }}
          />
        </div>

        {/* Difficulty filter */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty | 'all')}
          className="px-3 py-2.5 rounded-xl text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-cream)',
            border: '1px solid var(--color-earth-200)',
            fontFamily: 'var(--font-ui)',
            color: 'var(--color-text-primary)',
          }}
        >
          <option value="all">{t.filter.difficulty}: {t.filter.all}</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {t.filter[d]}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-earth-50)',
              border: '1px solid var(--color-earth-200)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            <X size={14} />
            {t.filter.clear}
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategory('all')}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
          style={{
            backgroundColor: category === 'all' ? 'var(--color-forest-700)' : 'var(--color-cream)',
            color: category === 'all' ? '#fff' : 'var(--color-text-secondary)',
            border: '1px solid',
            borderColor: category === 'all' ? 'var(--color-forest-700)' : 'var(--color-earth-200)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {t.filter.all}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: category === cat.slug ? cat.color : 'var(--color-cream)',
              color: category === cat.slug ? '#fff' : 'var(--color-text-secondary)',
              border: '1px solid',
              borderColor: category === cat.slug ? cat.color : 'var(--color-earth-200)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
          <p style={{ fontFamily: 'var(--font-body)' }}>{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <TechniqueCard key={`${t.category}-${t.slug}`} technique={t} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}
