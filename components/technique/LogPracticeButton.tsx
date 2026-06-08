'use client'

import { useState, useEffect, FormEvent } from 'react'
import { NotebookPen, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { logPractice } from '@/app/actions/practice'
import { CategorySlug } from '@/lib/types'

type Dict = {
  logPractice: string
  modal: {
    title: string
    duration: string
    mood: string
    notes: string
    notesPlaceholder: string
    save: string
    saving: string
    saved: string
    cancel: string
    moods: Record<string, string>
  }
}

const MOOD_KEYS = ['energized', 'calm', 'focused', 'relaxed', 'neutral']

const fieldStyle = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
}

export default function LogPracticeButton({
  category,
  slug,
  dict,
}: {
  category: CategorySlug
  slug: string
  dict: Dict
}) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null)
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState('')
  const [mood, setMood] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user))
  }, [])

  if (!signedIn) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('saving')
    await logPractice(category, slug, {
      duration_minutes: duration ? Number(duration) : undefined,
      mood: mood || undefined,
      notes: notes.trim() || undefined,
    })
    setStatus('saved')
    setTimeout(() => {
      setOpen(false)
      setStatus('idle')
      setDuration('')
      setMood('')
      setNotes('')
    }, 1200)
  }

  return (
    <div
      className="p-5 rounded-xl"
      style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', fontFamily: 'var(--font-ui)' }}
        >
          <NotebookPen size={15} />
          {dict.logPractice}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {dict.modal.title}
            </h3>
            <button type="button" onClick={() => setOpen(false)} aria-label={dict.modal.cancel}>
              <X size={16} style={{ color: 'var(--color-text-muted)' }} />
            </button>
          </div>

          {status === 'saved' ? (
            <p className="text-sm" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-body)' }}>
              {dict.modal.saved}
            </p>
          ) : (
            <>
              <label
                className="flex flex-col gap-1 text-xs"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
              >
                {dict.modal.duration}
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="rounded-lg px-3 py-2 text-sm focus:outline-none"
                  style={fieldStyle}
                />
              </label>

              <div
                className="flex flex-col gap-1.5 text-xs"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
              >
                {dict.modal.mood}
                <div className="flex flex-wrap gap-1.5">
                  {MOOD_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMood(mood === key ? '' : key)}
                      className="px-2.5 py-1 rounded-full text-xs transition-colors"
                      style={{
                        backgroundColor: mood === key ? 'var(--color-forest-50)' : 'transparent',
                        border: `1px solid ${mood === key ? 'var(--color-forest-200)' : 'var(--color-earth-200)'}`,
                        color: mood === key ? 'var(--color-forest-700)' : 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      {dict.modal.moods[key]}
                    </button>
                  ))}
                </div>
              </div>

              <label
                className="flex flex-col gap-1 text-xs"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
              >
                {dict.modal.notes}
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={dict.modal.notesPlaceholder}
                  rows={3}
                  className="rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                  style={fieldStyle}
                />
              </label>

              <button
                type="submit"
                disabled={status === 'saving'}
                className="rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', fontFamily: 'var(--font-ui)' }}
              >
                {status === 'saving' ? dict.modal.saving : dict.modal.save}
              </button>
            </>
          )}
        </form>
      )}
    </div>
  )
}
