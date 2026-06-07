'use client'

import { useState } from 'react'
import { Share, MoreVertical, MonitorDown } from 'lucide-react'

type Platform = {
  label: string
  steps: string[]
}

type Dict = {
  ios: Platform
  android: Platform
  desktop: Platform
}

const ICONS = {
  ios: Share,
  android: MoreVertical,
  desktop: MonitorDown,
} as const

export default function PlatformInstructions({ dict }: { dict: Dict }) {
  const [active, setActive] = useState<keyof Dict>('ios')
  const platforms = (['ios', 'android', 'desktop'] as const).map((key) => ({
    key,
    ...dict[key],
  }))

  return (
    <div>
      <div
        className="inline-flex p-1 rounded-full mb-6"
        style={{ backgroundColor: 'var(--color-cream-dark)' }}
      >
        {platforms.map((p) => {
          const Icon = ICONS[p.key]
          const isActive = active === p.key
          return (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--color-forest-700)' : 'transparent',
                color: isActive ? 'var(--color-cream)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              <Icon size={14} />
              {p.label}
            </button>
          )
        })}
      </div>

      <ol
        className="space-y-3 rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-cream)',
          border: '1px solid var(--color-earth-200)',
        }}
      >
        {dict[active].steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{
                backgroundColor: 'var(--color-forest-50)',
                color: 'var(--color-forest-700)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {i + 1}
            </span>
            <span
              className="text-sm leading-relaxed pt-0.5"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
