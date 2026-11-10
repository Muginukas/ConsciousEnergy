'use client'

import { useEffect, useState } from 'react'
import PantryPlanner from './PantryPlanner'
import SymbiosisExplorer from './SymbiosisExplorer'

type Mode = 'pantry' | 'explore'
const HASH: Record<Mode, string> = { pantry: '#ka-turiu', explore: '#pagal-produkta' }

export default function KitchenModes({ lang }: { lang: string }) {
  const lt = lang === 'lt'
  const [mode, setMode] = useState<Mode>('pantry')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- open the mode named in the URL once
    if (window.location.hash === HASH.explore) setMode('explore')
  }, [])

  function choose(m: Mode) {
    setMode(m)
    history.replaceState(null, '', HASH[m])
  }

  const tabs: { id: Mode; title: string; sub: string }[] = [
    {
      id: 'pantry',
      title: lt ? '🧺 Iš to, ką turiu' : '🧺 From what I have',
      sub: lt ? 'Įrašyk produktus — patikrinsime ir pasiūlysime' : 'Enter ingredients — we check and suggest',
    },
    {
      id: 'explore',
      title: lt ? '🌾 Pagal produktą' : '🌾 By ingredient',
      sub: lt ? 'Visi vieno produkto deriniai pagal simbiozę' : 'Every combination of one ingredient, by symbiosis',
    },
  ]

  return (
    <div>
      <div className="mb-8 grid gap-2 sm:grid-cols-2" role="tablist">
        {tabs.map((t) => {
          const active = t.id === mode
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => choose(t.id)}
              className="rounded-2xl px-4 py-3 text-left transition-colors"
              style={
                active
                  ? { backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', border: '1px solid var(--color-forest-700)' }
                  : { backgroundColor: 'var(--color-cream)', color: 'var(--color-text-primary)', border: '1px solid var(--color-earth-200)' }
              }
            >
              <span className="block text-base font-semibold" style={{ fontFamily: 'var(--font-ui)' }}>{t.title}</span>
              <span className="block text-xs" style={{ fontFamily: 'var(--font-ui)', opacity: 0.8 }}>{t.sub}</span>
            </button>
          )
        })}
      </div>
      {mode === 'pantry' ? <PantryPlanner lang={lang} /> : <SymbiosisExplorer lang={lang} />}
    </div>
  )
}
