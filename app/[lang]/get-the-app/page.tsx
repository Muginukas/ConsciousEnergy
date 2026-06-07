import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { Locale } from '@/lib/types'
import PlatformInstructions from '@/components/pwa/PlatformInstructions'
import { Wifi, Zap, Smartphone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get the App',
  description:
    'Install ConsciousEnergy on your phone, tablet, or desktop for fast, offline access to your practices.',
}

export default async function GetTheAppPage(props: PageProps<'/[lang]/get-the-app'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)
  const ga = dict.getApp

  const perks = [
    { icon: Zap, title: ga.perks.fast.title, text: ga.perks.fast.text },
    { icon: Wifi, title: ga.perks.offline.title, text: ga.perks.offline.text },
    { icon: Smartphone, title: ga.perks.home.title, text: ga.perks.home.text },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
        style={{
          backgroundColor: 'var(--color-forest-50)',
          color: 'var(--color-forest-700)',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {ga.eyebrow}
      </span>

      <h1
        className="text-5xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {ga.title}
      </h1>
      <p
        className="text-lg leading-relaxed mb-12"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {ga.subtitle}
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-14">
        {perks.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl p-5"
            style={{ backgroundColor: 'var(--color-cream)', border: '1px solid var(--color-earth-200)' }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
            >
              <Icon size={16} />
            </div>
            <h3
              className="text-sm font-semibold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      <h2
        className="text-2xl font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {ga.howTitle}
      </h2>
      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
      >
        {ga.howSubtitle}
      </p>

      <PlatformInstructions dict={ga.platforms} />
    </div>
  )
}
