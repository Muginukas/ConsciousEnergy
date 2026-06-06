import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about ConsciousEnergy and our mission to make ancient practices accessible.',
}

export default async function AboutPage(props: PageProps<'/[lang]/about'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const ab = dict.about

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1
        className="text-5xl font-bold mb-10"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {ab.title}
      </h1>

      <section className="mb-10">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {ab.mission.title}
        </h2>
        <p
          className="leading-relaxed text-lg"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {ab.mission.text}
        </p>
      </section>

      <section
        className="p-6 rounded-xl"
        style={{ backgroundColor: 'var(--color-gold-50)', border: '1px solid var(--color-gold-200)' }}
      >
        <h2
          className="text-xl font-semibold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-earth-700)' }}
        >
          ⚠ {ab.disclaimer.title}
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-earth-700)', fontFamily: 'var(--font-body)' }}
        >
          {ab.disclaimer.text}
        </p>
      </section>
    </div>
  )
}
