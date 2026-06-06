import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora, DM_Sans } from 'next/font/google'
import '../globals.css'
import { hasLocale } from '@/lib/dictionaries'
import { getDictionary } from '@/lib/dictionaries'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ui',
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'lt' }]
}

export const metadata: Metadata = {
  title: {
    default: 'ConsciousEnergy',
    template: '%s | ConsciousEnergy',
  },
  description:
    'A curated library of breathwork, meditation, yoga, kundalini, and energy practices for expanded consciousness.',
  keywords: [
    'breathwork',
    'meditation',
    'yoga',
    'kundalini',
    'chakras',
    'consciousness',
    'energy practices',
  ],
  openGraph: {
    siteName: 'ConsciousEnergy',
    type: 'website',
  },
}

export default async function LangLayout(props: LayoutProps<'/[lang]'>) {
  const { lang } = await props.params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <html
      lang={lang}
      className={`${cormorant.variable} ${lora.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{props.children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  )
}
