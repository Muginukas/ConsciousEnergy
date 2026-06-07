'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { User, LogOut } from 'lucide-react'
import { signOut } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/client'

type Dict = {
  signIn: string
  signUp: string
  account: string
  signOut: string
}

export default function UserMenu({ lang, dict }: { lang: string; dict: Dict }) {
  const [email, setEmail] = useState<string | null | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
    })

    return () => subscription.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auth state not yet known (initial load) — render nothing to avoid a flash
  if (email === undefined) return <div className="w-9 h-9" />

  if (email === null) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={`/${lang}/auth/login`}
          className="text-sm font-medium transition-colors hover:text-[--color-forest-700]"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
        >
          {dict.signIn}
        </Link>
        <Link
          href={`/${lang}/auth/sign-up`}
          className="text-sm font-medium px-3.5 py-1.5 rounded-full transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-forest-700)',
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {dict.signUp}
        </Link>
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.account}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
      >
        <User size={16} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden z-50"
          style={{
            backgroundColor: 'var(--color-cream)',
            border: '1px solid var(--color-earth-200)',
            boxShadow: '0 8px 30px rgba(45, 106, 79, 0.15)',
          }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-earth-200)' }}>
            <p
              className="text-xs truncate"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
            >
              {email}
            </p>
          </div>
          <Link
            href={`/${lang}/account`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[--color-earth-50]"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}
          >
            <User size={15} />
            {dict.account}
          </Link>
          <form action={signOut}>
            <input type="hidden" name="lang" value={lang} />
            <button
              type="submit"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors hover:bg-[--color-earth-50]"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}
            >
              <LogOut size={15} />
              {dict.signOut}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
