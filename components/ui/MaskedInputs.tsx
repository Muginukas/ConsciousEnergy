'use client'

import { useState } from 'react'

/**
 * Plain text date/time fields with a numeric keypad and automatic separators.
 * Native <input type="date|time"> is unusable in some in-app browsers
 * (Messenger, Facebook, Instagram WebViews) — typing digits does nothing there.
 */

const baseStyle = {
  border: '1px solid var(--color-earth-200)',
  backgroundColor: '#fff',
  color: 'var(--color-text-primary)',
} as const

const digitsOnly = (s: string, max: number) => s.replace(/\D/g, '').slice(0, max)

function isoToDisplay(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  return m ? `${m[3]}.${m[2]}.${m[1]}` : ''
}

function formatDate(d: string): string {
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`
  return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4)}`
}

function toIso(d: string): string | null {
  if (d.length !== 8) return null
  const day = Number(d.slice(0, 2))
  const month = Number(d.slice(2, 4))
  const year = Number(d.slice(4))
  if (year < 1900 || year > 2100) return null
  const dt = new Date(Date.UTC(year, month - 1, day))
  if (dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) return null
  return `${d.slice(4)}-${d.slice(2, 4)}-${d.slice(0, 2)}`
}

export function DateInput({
  value,
  onChange,
  lang,
  className = 'w-full rounded-xl px-4 py-3 text-base',
  required,
}: {
  value: string
  onChange: (iso: string) => void
  lang: string
  className?: string
  required?: boolean
}) {
  const [text, setText] = useState(() => isoToDisplay(value))
  const digits = text.replace(/\D/g, '')
  const invalid = digits.length === 8 && !toIso(digits)

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="bday"
        placeholder={lang === 'lt' ? 'DD.MM.MMMM' : 'DD.MM.YYYY'}
        value={text}
        required={required}
        maxLength={10}
        onChange={(e) => {
          const d = digitsOnly(e.target.value, 8)
          setText(formatDate(d))
          onChange(toIso(d) ?? '')
        }}
        className={className}
        style={invalid ? { ...baseStyle, border: '1px solid #b91c1c' } : baseStyle}
        aria-invalid={invalid}
      />
      {invalid && (
        <span className="text-xs" style={{ color: '#b91c1c' }}>
          {lang === 'lt' ? 'Neteisinga data — pvz., 15.06.1990' : 'Invalid date — e.g. 15.06.1990'}
        </span>
      )}
    </>
  )
}

function formatTime(d: string): string {
  return d.length <= 2 ? d : `${d.slice(0, 2)}:${d.slice(2)}`
}

function toTime(d: string): string | null {
  if (d.length !== 4) return null
  const h = Number(d.slice(0, 2))
  const m = Number(d.slice(2))
  return h <= 23 && m <= 59 ? `${d.slice(0, 2)}:${d.slice(2)}` : null
}

export function TimeInput({
  value,
  onChange,
  lang,
  disabled,
  className = 'w-full rounded-xl px-4 py-3 text-base disabled:opacity-50',
}: {
  value: string
  onChange: (hhmm: string) => void
  lang: string
  disabled?: boolean
  className?: string
}) {
  const [text, setText] = useState(() => (/^\d{2}:\d{2}$/.test(value) ? value : ''))
  const digits = text.replace(/\D/g, '')
  const invalid = digits.length === 4 && !toTime(digits)

  return (
    <>
      <input
        type="text"
        inputMode="numeric"
        placeholder={lang === 'lt' ? 'VV:MM (pvz., 14:30)' : 'HH:MM (e.g. 14:30)'}
        value={text}
        disabled={disabled}
        maxLength={5}
        onChange={(e) => {
          const d = digitsOnly(e.target.value, 4)
          setText(formatTime(d))
          onChange(toTime(d) ?? '')
        }}
        className={className}
        style={invalid ? { ...baseStyle, border: '1px solid #b91c1c' } : baseStyle}
        aria-invalid={invalid}
      />
      {invalid && (
        <span className="text-xs" style={{ color: '#b91c1c' }}>
          {lang === 'lt' ? 'Neteisingas laikas — pvz., 14:30' : 'Invalid time — e.g. 14:30'}
        </span>
      )}
    </>
  )
}
