'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import LocaleSwitcher from './LocaleSwitcher'

type Props = {
  lang: string
  dict: { nav: { home: string; techniques: string; about: string } }
}

export default function Header({ lang, dict }: Props) {
  const [open, setOpen] = useState(false)
  const nav = dict.nav

  return (
    <header
      style={{
        backgroundColor: 'rgba(253,250,245,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-earth-200)',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest-700)' }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 4 C14 4 8 10 8 15 C8 18.3 10.7 21 14 21 C17.3 21 20 18.3 20 15 C20 10 14 4 14 4Z"
              fill="currentColor" opacity="0.3" />
            <path d="M14 8 C14 8 10 12.5 10 15.5 C10 17.4 11.8 19 14 19 C16.2 19 18 17.4 18 15.5 C18 12.5 14 8 14 8Z"
              fill="currentColor" opacity="0.6" />
            <circle cx="14" cy="15" r="2" fill="currentColor" />
          </svg>
          ConsciousEnergy
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium transition-colors hover:text-[--color-forest-700]"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
          >
            {nav.home}
          </Link>
          <Link
            href={`/${lang}/techniques`}
            className="text-sm font-medium transition-colors hover:text-[--color-forest-700]"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
          >
            {nav.techniques}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="text-sm font-medium transition-colors hover:text-[--color-forest-700]"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
          >
            {nav.about}
          </Link>
          <LocaleSwitcher currentLang={lang} />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--color-cream)',
            borderColor: 'var(--color-earth-200)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          <Link href={`/${lang}`} onClick={() => setOpen(false)} className="text-sm font-medium">{nav.home}</Link>
          <Link href={`/${lang}/techniques`} onClick={() => setOpen(false)} className="text-sm font-medium">{nav.techniques}</Link>
          <Link href={`/${lang}/about`} onClick={() => setOpen(false)} className="text-sm font-medium">{nav.about}</Link>
          <LocaleSwitcher currentLang={lang} />
        </div>
      )}
    </header>
  )
}
