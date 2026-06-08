'use client'

import Link from 'next/link'
import { useState, useEffect, FormEvent } from 'react'
import { Trash2, Flag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { postComment, deleteComment, reportComment, type Comment } from '@/app/actions/community'
import { CategorySlug } from '@/lib/types'

type Dict = {
  title: string
  placeholder: string
  post: string
  posting: string
  signInPrompt: string
  signInLink: string
  error: string
  empty: string
  delete: string
  report: string
  reported: string
  you: string
  member: string
}

const fieldStyle = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-body)',
}

export default function CommentSection({
  category,
  slug,
  lang,
  dict,
}: {
  category: CategorySlug
  slug: string
  lang: string
  dict: Dict
}) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined)
  const [comments, setComments] = useState<Comment[] | null>(null)
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState(false)
  const [reportedIds, setReportedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))

    supabase
      .from('comments')
      .select('id, user_id, body, status, created_at')
      .eq('category', category)
      .eq('slug', slug)
      .order('created_at', { ascending: false })
      .then(({ data }) => setComments((data ?? []) as Comment[]))
  }, [category, slug])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = body.trim()
    if (!trimmed || posting) return

    setPosting(true)
    setError(false)
    const result = await postComment(category, slug, trimmed)
    if ('comment' in result) {
      setComments((prev) => [result.comment, ...(prev ?? [])])
      setBody('')
    } else {
      setError(true)
    }
    setPosting(false)
  }

  async function handleDelete(id: string) {
    setComments((prev) => (prev ?? []).filter((c) => c.id !== id))
    await deleteComment(id)
  }

  async function handleReport(id: string) {
    setReportedIds((prev) => new Set(prev).add(id))
    await reportComment(id)
  }

  const dateFormatter = new Intl.DateTimeFormat(lang === 'lt' ? 'lt-LT' : 'en-US', { dateStyle: 'medium' })

  return (
    <section className="mt-12">
      <h2
        className="text-2xl font-semibold mb-5"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {dict.title}
      </h2>

      {userId ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={dict.placeholder}
            rows={3}
            className="rounded-lg px-4 py-3 text-sm focus:outline-none resize-none"
            style={fieldStyle}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={posting || !body.trim()}
              className="self-start rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', fontFamily: 'var(--font-ui)' }}
            >
              {posting ? dict.posting : dict.post}
            </button>
            {error && (
              <span className="text-xs" style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-ui)' }}>
                {dict.error}
              </span>
            )}
          </div>
        </form>
      ) : userId === null ? (
        <p
          className="mb-8 text-sm"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}
        >
          {dict.signInPrompt}{' '}
          <Link href={`/${lang}/auth/login`} className="font-medium hover:underline" style={{ color: 'var(--color-forest-700)' }}>
            {dict.signInLink}
          </Link>
        </p>
      ) : null}

      {comments !== null && comments.length === 0 && (
        <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
          {dict.empty}
        </p>
      )}

      {comments !== null && comments.length > 0 && (
        <ul className="flex flex-col gap-4">
          {comments.map((comment) => {
            const isMine = comment.user_id === userId
            const isReported = comment.status === 'reported' || reportedIds.has(comment.id)

            return (
              <li
                key={comment.id}
                className="rounded-xl p-4"
                style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}
                  >
                    {isMine ? dict.you : dict.member}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                  >
                    {dateFormatter.format(new Date(comment.created_at))}
                  </span>
                </div>

                <p
                  className="text-sm leading-relaxed mb-2"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {comment.body}
                </p>

                {isMine ? (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-[--color-earth-700]"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                  >
                    <Trash2 size={12} />
                    {dict.delete}
                  </button>
                ) : userId ? (
                  <button
                    onClick={() => handleReport(comment.id)}
                    disabled={isReported}
                    className="inline-flex items-center gap-1.5 text-xs transition-colors hover:text-[--color-earth-700] disabled:opacity-60"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                  >
                    <Flag size={12} />
                    {isReported ? dict.reported : dict.report}
                  </button>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
