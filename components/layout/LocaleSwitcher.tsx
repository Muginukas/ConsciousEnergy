'use client'

import { usePathname, useRouter } from 'next/navigation'

// Remember the choice so the next visit opens in this language
// (read by middleware.ts; without it the site defaults to Lithuanian).
function rememberLocale(lang: string) {
  document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; samesite=lax`
}

type Props = {
  currentLang: string
}

export default function LocaleSwitcher({ currentLang }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLang: string) {
    rememberLocale(newLang)
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`)
    router.push(newPath)
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full px-1 py-0.5 text-xs font-medium"
      style={{ backgroundColor: 'var(--color-earth-50)', border: '1px solid var(--color-earth-200)' }}
    >
      {(['lt', 'en'] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className="px-2 py-0.5 rounded-full transition-all uppercase"
          style={{
            backgroundColor: currentLang === loc ? 'var(--color-forest-700)' : 'transparent',
            color: currentLang === loc ? '#fff' : 'var(--color-text-secondary)',
          }}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}
