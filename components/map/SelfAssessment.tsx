'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ASSESSMENT_QUESTIONS, tierForScore } from '@/lib/vibration'
import { Locale } from '@/lib/types'

export type Recommendation = { href: string; title: string }

type Props = {
  lang: string
  recommendations: Record<string, Recommendation[]>
  dict: {
    assessment: {
      heading: string
      intro: string
      progress: string
      back: string
      restart: string
      resultEyebrow: string
      resultLead: string
      recommended: string
    }
  }
}

export default function SelfAssessment({ lang, recommendations, dict }: Props) {
  const locale = lang as Locale
  const lt = locale === 'lt'
  const a = dict.assessment

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const total = ASSESSMENT_QUESTIONS.length
  const done = answers.length === total && step >= total

  const result = useMemo(() => {
    if (!done) return null
    const avg = answers.reduce((s, v) => s + v, 0) / answers.length
    return tierForScore(avg)
  }, [done, answers])

  const choose = (score: number) => {
    const next = [...answers]
    next[step] = score
    setAnswers(next)
    setStep(step + 1)
  }

  const goBack = () => setStep(Math.max(0, step - 1))
  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  const q = ASSESSMENT_QUESTIONS[step]
  const recs = result ? recommendations[result.id] ?? [] : []

  return (
    <section className="mb-16">
      <h2
        className="text-3xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {a.heading}
      </h2>
      <p
        className="mb-6 max-w-2xl"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {a.intro}
      </p>

      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)', boxShadow: 'var(--shadow-card)' }}
      >
        <AnimatePresence mode="wait">
          {!done && q ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }}
            >
              {/* Progress */}
              <div className="mb-5">
                <div
                  className="mb-2 text-xs font-medium"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                >
                  {a.progress.replace('{current}', String(step + 1)).replace('{total}', String(total))}
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: 'var(--color-forest-700)' }}
                    initial={false}
                    animate={{ width: `${((step) / total) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <h3
                className="mb-5 text-xl font-semibold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                {lt ? q.textLt : q.text}
              </h3>

              <div className="flex flex-col gap-2.5">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => choose(opt.score)}
                    className="rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 hover:translate-x-1"
                    style={{
                      backgroundColor: 'var(--color-earth-50)',
                      border: '1px solid var(--color-earth-200)',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {lt ? opt.textLt : opt.text}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={goBack}
                  className="mt-5 text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                >
                  ← {a.back}
                </button>
              )}
            </motion.div>
          ) : (
            result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="rounded-xl p-5"
                  style={{ background: `linear-gradient(135deg, ${result.color}1a, ${result.color}05)`, border: `1px solid ${result.color}` }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: result.color, fontFamily: 'var(--font-ui)' }}
                  >
                    {a.resultEyebrow}
                  </span>
                  <h3
                    className="mt-1 text-3xl font-semibold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                  >
                    {lt ? result.labelLt : result.label}
                  </h3>
                  <p className="text-sm" style={{ color: result.color, fontFamily: 'var(--font-ui)' }}>
                    {lt ? result.chakraLt : result.chakra} · {result.solfeggioHz} Hz · {result.hawkinsRange[0]}–{result.hawkinsRange[1]}
                  </p>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    {a.resultLead} {lt ? result.summaryLt : result.summary}
                  </p>
                </div>

                {recs.length > 0 && (
                  <div className="mt-6">
                    <h4
                      className="mb-3 text-sm font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
                    >
                      {a.recommended}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {recs.map((rec) => (
                        <Link
                          key={rec.href}
                          href={rec.href}
                          className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 hover:translate-x-1"
                          style={{
                            backgroundColor: 'var(--color-earth-50)',
                            border: '1px solid var(--color-earth-200)',
                          }}
                        >
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
                          >
                            {rec.title}
                          </span>
                          <ArrowRight size={16} color="var(--color-forest-700)" className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={restart}
                  className="mt-6 rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)', fontFamily: 'var(--font-ui)' }}
                >
                  {a.restart}
                </button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
