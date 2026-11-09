/** A compact table of contents: chips linking to sections on the page. */
export default function SectionNav({ items, title }: { items: { id: string; label: string }[]; title: string }) {
  return (
    <nav aria-label={title} className="mb-12 rounded-2xl p-4" style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-muted)' }}>
        {title}
      </p>
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="inline-block rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ fontFamily: 'var(--font-ui)', backgroundColor: 'var(--color-forest-50)', color: 'var(--color-forest-700)', border: '1px solid var(--color-forest-200)' }}
            >
              {i + 1}. {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
