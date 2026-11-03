import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { getTechniqueBySlug } from '@/lib/content'
import { Locale } from '@/lib/types'
import {
  ELEMENT_MAP,
  MODALITY_MAP,
  ZODIAC_MAP,
  ZODIAC_SIGNS,
  ZodiacSlug,
  compatibility,
  formatRange,
} from '@/lib/zodiac'
import CompatibilityChecker from '@/components/zodiac/CompatibilityChecker'
import ZodiacTabs from '@/components/zodiac/ZodiacTabs'
import { MOON_IN, RISING_IN, SIGN_STYLE } from '@/lib/astro/natal-data'

export async function generateStaticParams() {
  return ['en', 'lt'].flatMap((lang) => ZODIAC_SIGNS.map((s) => ({ lang, sign: s.slug })))
}

export async function generateMetadata(props: PageProps<'/[lang]/zodiac/[sign]'>): Promise<Metadata> {
  const { lang, sign } = await props.params
  const s = ZODIAC_MAP[sign as ZodiacSlug]
  if (!s) return {}
  const locale: Locale = lang === 'lt' ? 'lt' : 'en'
  return {
    title: `${s.symbol} ${s.name[locale]}`,
    description: s.overview[locale],
  }
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-semibold mb-3"
      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
    >
      {children}
    </h2>
  )
}

const card = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  boxShadow: 'var(--shadow-card)',
} as const

export default async function SignPage(props: PageProps<'/[lang]/zodiac/[sign]'>) {
  const { lang, sign } = await props.params
  if (!hasLocale(lang)) notFound()
  const s = ZODIAC_MAP[sign as ZodiacSlug]
  if (!s) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const z = dict.zodiac
  const p = z.profile
  const el = ELEMENT_MAP[s.element]
  const idx = ZODIAC_SIGNS.indexOf(s)
  const prev = ZODIAC_SIGNS[(idx + 11) % 12]
  const next = ZODIAC_SIGNS[(idx + 1) % 12]

  const practices = s.practices
    .map((ref) => {
      const t = getTechniqueBySlug(ref.category, ref.slug, locale)
      return t ? { href: `/${lang}/techniques/${ref.category}/${ref.slug}`, title: t.title, overview: t.overview } : null
    })
    .filter((x): x is { href: string; title: string; overview: string } => x !== null)

  const chakra = getTechniqueBySlug(s.chakra.category, s.chakra.slug, locale)

  const ranked = ZODIAC_SIGNS.filter((o) => o.slug !== s.slug)
    .map((o) => ({ sign: o, c: compatibility(s.slug, o.slug) }))
    .sort((a, b) => b.c.score - a.c.score)
  const best = ranked.filter((r) => r.c.score >= 85)

  const lt = locale === 'lt'
  const fmtDay = (d: Date) =>
    d.toLocaleDateString(lt ? 'lt-LT' : 'en-GB', { month: 'long', day: 'numeric', timeZone: 'UTC' })
  const startDate = Date.UTC(2001, s.start[0] - 1, s.start[1])
  const endDate = Date.UTC(s.end[0] < s.start[0] ? 2002 : 2001, s.end[0] - 1, s.end[1])
  const span = (endDate - startDate) / 86400000 + 1
  const decans = [0, 1, 2].map((k) => {
    const sub = ZODIAC_SIGNS[(idx + 4 * k) % 12]
    const a = new Date(startDate + Math.round((span * k) / 3) * 86400000)
    const b = new Date(startDate + (Math.round((span * (k + 1)) / 3) - 1) * 86400000)
    return { k, sub, range: `${fmtDay(a)} – ${fmtDay(b)}`, degrees: `${k * 10}°–${k * 10 + 10}°` }
  })

  const facts: [string, string][] = [
    [p.dates, formatRange(s, locale)],
    [p.element, el.name[locale]],
    [p.modality, MODALITY_MAP[s.modality].name[locale]],
    [p.ruler, s.ruler[locale]],
    [p.house, String(s.house)],
    [p.motto, `„${s.motto[locale]}“`],
  ]

  const correspondences: [string, string][] = [
    [p.colors, s.colors[locale].join(', ')],
    [p.stones, s.stones[locale].join(', ')],
    [p.metal, s.metal[locale]],
    [p.day, s.day[locale]],
    [p.numbers, s.numbers.join(', ')],
    [p.body, s.body[locale]],
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <ZodiacTabs lang={lang} active="signs" />
      <Link
        href={`/${lang}/zodiac`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}
      >
        <ArrowLeft size={15} /> {p.back}
      </Link>

      {/* Hero */}
      <header className="mb-10 flex flex-col sm:flex-row sm:items-center gap-6">
        <span
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-6xl"
          style={{ backgroundColor: `${el.color}14`, color: el.color, border: `2px solid ${el.color}33` }}
          aria-hidden="true"
        >
          {s.symbol}
        </span>
        <div>
          <p
            className="mb-1 text-sm font-semibold uppercase tracking-wide"
            style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}
          >
            {s.archetype[locale]} · {formatRange(s, locale)}
          </p>
          <h1
            className="text-5xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {s.name[locale]}
          </h1>
          <div className="flex flex-wrap gap-2" style={{ fontFamily: 'var(--font-ui)' }}>
            {s.keywords[locale].map((k) => (
              <span
                key={k}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: `${el.color}14`, color: el.color }}
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        <section className="lg:col-span-2 rounded-xl p-6" style={card}>
          <Heading>{p.overview}</Heading>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {s.overview[locale]}
          </p>
        </section>
        <aside className="rounded-xl p-6" style={card}>
          <dl className="grid grid-cols-1 gap-3" style={{ fontFamily: 'var(--font-ui)' }}>
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-sm border-b pb-2 last:border-0" style={{ borderColor: 'var(--color-earth-200)' }}>
                <dt style={{ color: 'var(--color-text-muted)' }}>{k}</dt>
                <dd className="text-right font-medium" style={{ color: 'var(--color-text-primary)' }}>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <section className="rounded-xl p-6" style={card}>
          <Heading>{p.strengths}</Heading>
          <ul className="flex flex-col gap-2">
            {s.strengths[locale].map((x) => (
              <li key={x} className="flex gap-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                <Check size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--color-forest-500)' }} /> {x}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl p-6" style={card}>
          <Heading>{p.challenges}</Heading>
          <ul className="flex flex-col gap-2">
            {s.challenges[locale].map((x) => (
              <li key={x} className="flex gap-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                <AlertCircle size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold-600)' }} /> {x}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {([
          [p.love, s.love[locale]],
          [p.career, s.career[locale]],
          [p.health, s.health[locale]],
        ] as const).map(([h, t]) => (
          <section key={h} className="rounded-xl p-6" style={card}>
            <Heading>{h}</Heading>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              {t}
            </p>
          </section>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {([
          [lt ? `Saulė ${s.name.lt} ženkle` : `Sun in ${s.name.en}`, SIGN_STYLE[s.slug][locale]],
          [lt ? `Mėnulis ${s.name.lt} ženkle` : `Moon in ${s.name.en}`, MOON_IN[s.slug][locale]],
          [lt ? `Ascendentas ${s.name.lt}` : `${s.name.en} Rising`, RISING_IN[s.slug][locale]],
        ] as const).map(([h, txt]) => (
          <section key={h} className="rounded-xl p-6" style={card}>
            <Heading>{h}</Heading>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{txt}</p>
          </section>
        ))}
      </div>
      <p className="-mt-6 mb-10 text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
        {lt ? 'Norite sužinoti savo Mėnulio ir Ascendento ženklus? ' : 'Want to know your Moon and Rising signs? '}
        <Link href={`/${lang}/zodiac/natal-chart`} style={{ color: 'var(--color-forest-700)', fontWeight: 600 }}>
          {lt ? 'Apskaičiuokite gimimo horoskopą →' : 'Calculate your natal chart →'}
        </Link>
      </p>

      <section className="mb-10">
        <Heading>{lt ? 'Dekanai' : 'Decans'}</Heading>
        <p className="mb-4 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {lt
            ? 'Kiekvienas ženklas padalytas į tris 10° dalis — dekanus. Kiekvieną papildomai valdo to paties elemento ženklas, suteikdamas savo atspalvį.'
            : 'Each sign is divided into three 10° parts — decans. Each is co-ruled by a sign of the same element, adding its own flavour.'}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {decans.map((dc) => (
            <div key={dc.k} className="rounded-xl p-5" style={card}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
                {lt ? `${dc.k + 1} dekanas` : `Decan ${dc.k + 1}`} · {dc.degrees}
              </p>
              <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>≈ {dc.range}</p>
              <p className="font-semibold mb-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-primary)' }}>
                {dc.sub.symbol} {dc.sub.name[locale]} · {dc.sub.ruler[locale]}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                {dc.k === 0
                  ? lt ? 'Gryniausia ženklo išraiška.' : 'The purest expression of the sign.'
                  : `${lt ? 'Papildomos savybės' : 'Added qualities'}: ${dc.sub.keywords[locale].slice(0, 3).join(', ').toLowerCase()}.`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mb-10 rounded-xl p-6"
        style={{ background: `linear-gradient(135deg, ${el.color}10, var(--color-gold-50))`, border: `1px solid ${el.color}33` }}
      >
        <Heading>✦ {p.growth}</Heading>
        <p className="text-lg leading-relaxed italic" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
          {s.growth[locale]}
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        <section className="rounded-xl p-6" style={card}>
          <Heading>{p.correspondences}</Heading>
          <dl className="grid gap-3" style={{ fontFamily: 'var(--font-ui)' }}>
            {correspondences.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-sm border-b pb-2 last:border-0" style={{ borderColor: 'var(--color-earth-200)' }}>
                <dt style={{ color: 'var(--color-text-muted)' }}>{k}</dt>
                <dd className="text-right font-medium" style={{ color: 'var(--color-text-primary)' }}>{v}</dd>
              </div>
            ))}
            {chakra && (
              <div className="flex justify-between gap-3 text-sm">
                <dt style={{ color: 'var(--color-text-muted)' }}>{p.chakra}</dt>
                <dd className="text-right font-medium">
                  <Link href={`/${lang}/techniques/${s.chakra.category}/${s.chakra.slug}`} style={{ color: 'var(--color-forest-700)' }}>
                    {chakra.title}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </section>
        <section className="rounded-xl p-6" style={card}>
          <Heading>{p.bestMatches}</Heading>
          <div className="flex flex-col gap-2">
            {best.map(({ sign: o, c }) => (
              <Link
                key={o.slug}
                href={`/${lang}/zodiac/${o.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[--color-earth-50]"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl" style={{ color: ELEMENT_MAP[o.element].color }}>{o.symbol}</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>{o.name[locale]}</span>
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {c.aspect[locale]} · {c.score}%
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {practices.length > 0 && (
        <section className="mb-10">
          <Heading>{p.practices}</Heading>
          <p className="mb-4" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {p.practicesCaption}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {practices.map((pr) => (
              <Link key={pr.href} href={pr.href} className="rounded-xl p-5 transition-transform hover:-translate-y-0.5" style={card}>
                <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest-700)' }}>
                  {pr.title}
                </h3>
                <p className="text-sm line-clamp-3" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {pr.overview}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Heading>{p.compatWith}</Heading>
      <CompatibilityChecker lang={lang} dict={z} initialA={s.slug} initialB={best[0]?.sign.slug ?? next.slug} showHeading={false} />

      <nav className="flex justify-between gap-4 pt-6" style={{ borderTop: '1px solid var(--color-earth-200)', fontFamily: 'var(--font-ui)' }}>
        <Link href={`/${lang}/zodiac/${prev.slug}`} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-forest-700)' }}>
          <ArrowLeft size={15} /> {prev.symbol} {prev.name[locale]}
        </Link>
        <Link href={`/${lang}/zodiac/${next.slug}`} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-forest-700)' }}>
          {next.name[locale]} {next.symbol} <ArrowRight size={15} />
        </Link>
      </nav>
    </div>
  )
}
