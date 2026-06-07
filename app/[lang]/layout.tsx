import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Lora, DM_Sans } from 'next/font/google'
import '../globals.css'
import { hasLocale } from '@/lib/dictionaries'
import { getDictionary } from '@/lib/dictionaries'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister'
import InstallPrompt from '@/components/pwa/InstallPrompt'

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

export const viewport: Viewport = {
  themeColor: '#2D6A4F',
}

export const metadata: Metadata = {
  title: {
    default: 'ConsciousEnergy',
    template: '%s | ConsciousEnergy',
  },
  description:
    'A curated library of breathwork, meditation, yoga, kundalini, and energy practices for expanded consciousness.',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/apple-touch-icon.png',
  },
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
        <ServiceWorkerRegister />
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{props.children}</main>
        <Footer dict={dict} />
        <InstallPrompt dict={dict.installPrompt} />
      </body>
    </html>
  )
}
