'use client'

import { usePathname } from 'next/navigation'

type Props = {
  currentLang: string
}

const LOCALES = ['en', 'lt'] as const

/**
 * Plain links (full page load) rather than router.push: switching the [lang]
 * root segment reloads the root layout anyway, and plain links also work in
 * in-app browsers (Messenger, Facebook) where client navigation can fail.
 * The middleware remembers the chosen language in a cookie.
 */
export default function LocaleSwitcher({ currentLang }: Props) {
  const pathname = usePathname() ?? `/${currentLang}`

  const hrefFor = (loc: string) => {
    const rest = pathname.replace(new RegExp(`^/${currentLang}(?=/|$)`), '')
    return `/${loc}${rest}`
  }

  const remember = (e: React.MouseEvent<HTMLAnchorElement>, loc: string) => {
    // keep query parameters (e.g. share links) when switching
    if (window.location.search) {
      e.preventDefault()
      window.location.assign(hrefFor(loc) + window.location.search)
    }
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs font-medium"
      style={{ backgroundColor: 'var(--color-earth-50)', border: '1px solid var(--color-earth-200)' }}
    >
      {LOCALES.map((loc) => (
        <a
          key={loc}
          href={hrefFor(loc)}
          hrefLang={loc}
          onClick={(e) => remember(e, loc)}
          aria-current={currentLang === loc ? 'true' : undefined}
          className="px-3 py-1 rounded-full transition-all uppercase"
          style={{
            backgroundColor: currentLang === loc ? 'var(--color-forest-700)' : 'transparent',
            color: currentLang === loc ? '#fff' : 'var(--color-text-secondary)',
          }}
        >
          {loc}
        </a>
      ))}
    </div>
  )
}
