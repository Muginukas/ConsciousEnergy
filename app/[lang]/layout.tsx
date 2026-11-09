import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import { hasLocale } from '@/lib/dictionaries'
import { getDictionary } from '@/lib/dictionaries'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister'
import InstallPrompt from '@/components/pwa/InstallPrompt'

// Fonts are self-hosted (app/fonts, OFL-licensed variable fonts subset to
// Latin + Latin Extended) so builds never depend on fetching Google Fonts.
const cormorant = localFont({
  src: '../fonts/Cormorant-var.woff2',
  weight: '300 700',
  variable: '--font-display',
  display: 'swap',
})

const lora = localFont({
  src: '../fonts/Lora-var.woff2',
  weight: '400 700',
  variable: '--font-body',
  display: 'swap',
})

const dmSans = localFont({
  src: '../fonts/DMSans-var.woff2',
  weight: '100 1000',
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
    'A holistic map of consciousness and energy: breathwork, meditation, yoga and energy practices, a vibration map, zodiac and numerology, and high-vibration food combining.',
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
    'vibration',
    'zodiac',
    'human design',
    'food combining',
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
