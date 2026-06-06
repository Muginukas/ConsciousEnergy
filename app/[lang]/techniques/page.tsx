import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getAllTechniques } from '@/lib/content'
import { Locale } from '@/lib/types'
import TechniqueFilter from '@/components/technique/TechniqueFilter'
import type { Metadata } from 'next'

export async function generateMetadata(props: PageProps<'/[lang]/techniques'>): Promise<Metadata> {
  const { lang } = await props.params
  return {
    title: 'Technique Library',
    description: 'Browse our complete library of breathwork, meditation, yoga, kundalini, chakra, and energy practices.',
  }
}

export default async function TechniquesPage(props: PageProps<'/[lang]/techniques'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const techniques = getAllTechniques(locale)

  const subtitle = dict.techniques.subtitle.replace('{count}', String(techniques.length))

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1
          className="text-5xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {dict.techniques.title}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {subtitle}
        </p>
      </div>

      <TechniqueFilter techniques={techniques} lang={lang} dict={dict} />
    </div>
  )
}
