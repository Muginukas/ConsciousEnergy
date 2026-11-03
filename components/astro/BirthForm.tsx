'use client'

import { DateInput, TimeInput } from '@/components/ui/MaskedInputs'
import { useRef, useState } from 'react'
import { MapPin, Sparkles, Lock } from 'lucide-react'
import { Place, searchPlaces } from '@/lib/astro/cities'
import { AstroText } from '@/lib/astro/ui-text'

export interface BirthData {
  name: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  timeUnknown: boolean
  place: Place
}

const STORAGE_KEY = 'ce-birth-data'

export function loadBirthData(): BirthData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as BirthData) : null
  } catch {
    return null
  }
}

function saveBirthData(d: BirthData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d))
  } catch {
    // storage unavailable — ignore
  }
}

const inputStyle = {
  border: '1px solid var(--color-earth-200)',
  backgroundColor: '#fff',
  color: 'var(--color-text-primary)',
} as const

export default function BirthForm({
  lang,
  t,
  initial,
  onSubmit,
}: {
  lang: string
  t: AstroText['form']
  initial: BirthData | null
  onSubmit: (d: BirthData) => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [date, setDate] = useState(initial?.date ?? '')
  const [time, setTime] = useState(initial?.time ?? '12:00')
  const [timeUnknown, setTimeUnknown] = useState(initial?.timeUnknown ?? false)
  const [query, setQuery] = useState(initial?.place.name ?? '')
  const [place, setPlace] = useState<Place | null>(initial?.place ?? null)
  const [results, setResults] = useState<Place[]>([])
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(false)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = (q: string) => {
    setQuery(q)
    setPlace(null)
    if (debounce.current) clearTimeout(debounce.current)
    if (q.trim().length < 2) {
      setResults([])
      return
    }
    debounce.current = setTimeout(async () => {
      setSearching(true)
      setResults(await searchPlaces(q, lang))
      setSearching(false)
    }, 350)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !place) {
      setError(true)
      return
    }
    setError(false)
    const d: BirthData = { name, date, time: timeUnknown ? '12:00' : time || '12:00', timeUnknown, place }
    saveBirthData(d)
    onSubmit(d)
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl p-6 sm:p-8 mb-10"
      style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', boxShadow: 'var(--shadow-card)', fontFamily: 'var(--font-ui)' }}
    >
      <h2 className="text-2xl font-semibold mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
        {t.title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.name}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl px-4 py-3 text-base" style={inputStyle} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.date}</span>
          <DateInput value={date} onChange={setDate} lang={lang} required />
        </label>
        <div className="flex flex-col gap-1.5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.time}</span>
            <TimeInput value={time} onChange={setTime} lang={lang} disabled={timeUnknown} />
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} />
            {t.timeUnknown}
          </label>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2 relative">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t.place}</span>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
            <input
              value={query}
              onChange={(e) => search(e.target.value)}
              placeholder={t.placeSearch}
              autoComplete="off"
              className="w-full rounded-xl pl-10 pr-4 py-3 text-base"
              style={inputStyle}
            />
          </div>
          {!place && query.trim().length >= 2 && (
            <div className="absolute top-full z-20 mt-1 w-full overflow-hidden rounded-xl" style={{ ...inputStyle, boxShadow: 'var(--shadow-card)' }}>
              {searching && <div className="px-4 py-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{t.searching}</div>}
              {!searching && results.length === 0 && <div className="px-4 py-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{t.noResults}</div>}
              {!searching &&
                results.map((r, i) => (
                  <button
                    type="button"
                    key={`${r.name}-${r.lat}-${i}`}
                    onClick={() => {
                      setPlace(r)
                      setQuery(r.name)
                      setResults([])
                    }}
                    className="block w-full px-4 py-3 text-left text-sm hover:bg-[--color-earth-50]"
                    style={{ borderTop: i ? '1px solid var(--color-earth-200)' : undefined }}
                  >
                    <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.name}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}> · {r.country}</span>
                  </button>
                ))}
            </div>
          )}
          {place && (
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {t.selected}: {place.name}, {place.country} · {place.lat.toFixed(2)}°, {place.lon.toFixed(2)}° · {place.tz}
            </p>
          )}
        </div>
      </div>
      {!timeUnknown && (
        <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.timeHint}</p>
      )}
      {error && <p className="mt-3 text-sm" style={{ color: '#b91c1c' }}>{t.missing}</p>}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
        >
          <Sparkles size={16} /> {t.submit}
        </button>
        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <Lock size={12} /> {t.privacy}
        </span>
      </div>
    </form>
  )
}
