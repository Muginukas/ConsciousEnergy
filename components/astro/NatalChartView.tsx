'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ELEMENTS, ELEMENT_MAP, MODALITIES, ZODIAC_MAP, ZodiacSlug } from '@/lib/zodiac'
import { ASPECT_DEFS, PlanetId, formatDegree, norm } from '@/lib/astro/ephemeris'
import { NatalChart, computeNatal, signOf } from '@/lib/astro/natal'
import { ASPECTS, HOUSES, MOON_IN, PLANETS, RISING_IN, SIGN_RULER, SIGN_STYLE } from '@/lib/astro/natal-data'
import { utcOffsetLabel } from '@/lib/astro/time'
import { ASPECT_PLAIN, PAIRS, PLAIN_LABELS } from '@/lib/astro/aspect-pairs'
import { GENERATIONAL_NOTE, PLANET_IN_SIGN } from '@/lib/astro/planet-signs'
import { planetInHouse } from '@/lib/astro/planet-houses'
import { astroText } from '@/lib/astro/ui-text'
import { Locale } from '@/lib/types'
import BirthForm, { BirthData, loadBirthData } from './BirthForm'
import ChartWheel from './ChartWheel'

const card = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  boxShadow: 'var(--shadow-card)',
} as const

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
      {children}
    </h2>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
      {children}
    </p>
  )
}

const compute = (d: BirthData) =>
  computeNatal({ date: d.date, time: d.time, timeUnknown: d.timeUnknown, lat: d.place.lat, lon: d.place.lon, tz: d.place.tz })

export default function NatalChartView({ lang }: { lang: string }) {
  const locale = lang as Locale
  const T = astroText(locale)
  const t = T.natal
  const [initial] = useState<BirthData | null>(() => loadBirthData())
  const [data, setData] = useState<BirthData | null>(initial)
  const [chart, setChart] = useState<NatalChart | null>(() => (initial ? compute(initial) : null))

  const calculate = (d: BirthData) => {
    setData(d)
    setChart(compute(d))
  }

  const signName = (s: ZodiacSlug) => `${ZODIAC_MAP[s].symbol} ${ZODIAC_MAP[s].name[locale]}`
  const pName = (id: string) =>
    id === 'asc' ? 'ASC' : id === 'mc' ? 'MC' : `${PLANETS[id as PlanetId].symbol} ${PLANETS[id as PlanetId].name[locale]}`

  return (
    <div>
      <BirthForm lang={lang} t={T.form} initial={initial} onSubmit={calculate} />

      {chart && data && (
        <Result
          key={chart.utc.toISOString() + data.place.lat}
          chart={chart}
          data={data}
          lang={lang}
          locale={locale}
          t={t}
          utcLabel={T.form.utc}
          signName={signName}
          pName={pName}
        />
      )}
    </div>
  )
}

function Result({
  chart,
  data,
  lang,
  locale,
  t,
  utcLabel,
  signName,
  pName,
}: {
  chart: NatalChart
  data: BirthData
  lang: string
  locale: Locale
  t: ReturnType<typeof astroText>['natal']
  utcLabel: string
  signName: (s: ZodiacSlug) => string
  pName: (id: string) => string
}) {
  const sun = chart.planets.find((p) => p.id === 'sun')!
  const moon = chart.planets.find((p) => p.id === 'moon')!
  const ascSign = chart.angles ? signOf(chart.angles.asc) : null
  const ruler = ascSign ? chart.planets.find((p) => p.id === SIGN_RULER[ascSign]) : null

  // element & modality balance
  const weights: { sign: ZodiacSlug; w: number }[] = chart.planets
    .filter((p) => p.id !== 'node')
    .map((p) => ({ sign: p.sign, w: p.id === 'sun' || p.id === 'moon' ? 2 : 1 }))
  if (ascSign) weights.push({ sign: ascSign, w: 2 })
  const total = weights.reduce((s, x) => s + x.w, 0)
  const elCount = Object.fromEntries(ELEMENTS.map((e) => [e.id, 0])) as Record<string, number>
  const moCount = Object.fromEntries(MODALITIES.map((m) => [m.id, 0])) as Record<string, number>
  for (const { sign, w } of weights) {
    elCount[ZODIAC_MAP[sign].element] += w
    moCount[ZODIAC_MAP[sign].modality] += w
  }
  const domEl = ELEMENTS.reduce((a, b) => (elCount[b.id] > elCount[a.id] ? b : a))
  const lowEl = ELEMENTS.reduce((a, b) => (elCount[b.id] < elCount[a.id] ? b : a))

  const bigThree = [
    { label: t.sun, sign: sun.sign, text: ZODIAC_MAP[sun.sign].overview[locale], deg: sun.lon },
    { label: t.moon, sign: moon.sign, text: MOON_IN[moon.sign][locale], deg: moon.lon },
    ...(ascSign && chart.angles ? [{ label: t.rising, sign: ascSign, text: RISING_IN[ascSign][locale], deg: chart.angles.asc }] : []),
  ]

  const [y, m, d] = data.date.split('-')

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {data.name || t.wheel}
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
          {d}.{m}.{y} {data.timeUnknown ? '' : data.time} ({utcOffsetLabel(chart.utc, data.place.tz)}) · {data.place.name}, {data.place.country} · {utcLabel}: {chart.utc.toISOString().slice(0, 16).replace('T', ' ')}
          {chart.houseSystem && ` · ${t.houseSystem}: ${chart.houseSystem === 'placidus' ? t.placidus : t.equal}`}
        </p>
        {data.timeUnknown && (
          <p className="mt-3 rounded-lg p-3 text-sm" style={{ backgroundColor: 'var(--color-gold-50)', color: 'var(--color-earth-700)', fontFamily: 'var(--font-ui)' }}>
            {t.noTime}
          </p>
        )}
      </header>

      <section className="mb-12 rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, var(--color-forest-50), var(--color-gold-50))', border: '1px solid var(--color-forest-200)' }}>
        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>{t.guideTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.guide.map(([h, txt]) => (
            <div key={h}>
              <p className="font-semibold mb-1" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>{h}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Big three */}
      <section className="mb-12">
        <H2>{t.bigThree}</H2>
        <div className={`grid gap-4 ${bigThree.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {bigThree.map((b) => {
            const el = ELEMENT_MAP[ZODIAC_MAP[b.sign].element]
            return (
              <div key={b.label} className="rounded-xl p-5" style={card}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
                  {b.label}
                </p>
                <Link href={`/${lang}/zodiac/${b.sign}`} className="flex items-center gap-3 mb-3">
                  <span className="text-4xl" style={{ color: el.color }}>{ZODIAC_MAP[b.sign].symbol}</span>
                  <span>
                    <span className="block text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                      {ZODIAC_MAP[b.sign].name[locale]}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{formatDegree(b.deg)}</span>
                  </span>
                </Link>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  {b.text}
                </p>
              </div>
            )
          })}
        </div>
        {ruler && ascSign && (
          <div className="mt-4 rounded-xl p-5" style={{ background: 'linear-gradient(135deg, var(--color-forest-50), var(--color-gold-50))', border: '1px solid var(--color-forest-200)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-forest-700)', fontFamily: 'var(--font-ui)' }}>
              {t.chartRuler}: {pName(ruler.id)} — {signName(ruler.sign)}
              {ruler.house ? `, ${ruler.house} ${t.house.toLowerCase()} (${HOUSES[ruler.house].name[locale]})` : ''}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{t.chartRulerText}</p>
          </div>
        )}
      </section>

      {/* Wheel + table */}
      <section className="mb-12">
        <H2>{t.wheel}</H2>
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="rounded-2xl p-3" style={card}>
            <ChartWheel chart={chart} />
          </div>
          <div className="rounded-2xl p-4 overflow-x-auto" style={card}>
            <table className="w-full text-sm" style={{ fontFamily: 'var(--font-ui)' }}>
              <thead>
                <tr style={{ color: 'var(--color-text-muted)' }}>
                  <th className="text-left font-medium pb-2">{t.planet}</th>
                  <th className="text-left font-medium pb-2">{t.sign}</th>
                  <th className="text-right font-medium pb-2">{t.degree}</th>
                  {chart.cusps && <th className="text-right font-medium pb-2">{t.house}</th>}
                </tr>
              </thead>
              <tbody>
                {chart.planets.map((p) => (
                  <tr key={p.id} style={{ borderTop: '1px solid var(--color-earth-200)' }}>
                    <td className="py-1.5" style={{ color: 'var(--color-text-primary)' }}>
                      {pName(p.id)} {p.retrograde && <span style={{ color: '#b91c1c' }}>R</span>}
                    </td>
                    <td style={{ color: ELEMENT_MAP[ZODIAC_MAP[p.sign].element].color }}>{signName(p.sign)}</td>
                    <td className="text-right tabular-nums">{formatDegree(p.lon)}</td>
                    {chart.cusps && <td className="text-right">{p.house}</td>}
                  </tr>
                ))}
                {chart.angles && (
                  <>
                    {(['asc', 'mc'] as const).map((k) => {
                      const lon = chart.angles![k]
                      return (
                        <tr key={k} style={{ borderTop: '1px solid var(--color-earth-200)' }}>
                          <td className="py-1.5 font-semibold">{k === 'asc' ? 'ASC' : 'MC'}</td>
                          <td style={{ color: ELEMENT_MAP[ZODIAC_MAP[signOf(lon)].element].color }}>{signName(signOf(lon))}</td>
                          <td className="text-right tabular-nums">{formatDegree(lon)}</td>
                          <td className="text-right">{k === 'asc' ? 1 : 10}</td>
                        </tr>
                      )
                    })}
                  </>
                )}
                <tr style={{ borderTop: '1px solid var(--color-earth-200)', color: 'var(--color-text-muted)' }}>
                  <td className="py-1.5">☋ {t.southNode}</td>
                  {(() => {
                    const sn = norm(chart.planets.find((p) => p.id === 'node')!.lon + 180)
                    return (
                      <>
                        <td>{signName(signOf(sn))}</td>
                        <td className="text-right tabular-nums">{formatDegree(sn)}</td>
                        {chart.cusps && <td />}
                      </>
                    )
                  })()}
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{t.retro}</p>
          </div>
        </div>
      </section>

      {/* Balance */}
      <section className="mb-12">
        <H2>{t.balance}</H2>
        <Caption>{t.balanceCaption}</Caption>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl p-5" style={card}>
            {ELEMENTS.map((e) => (
              <div key={e.id} className="mb-3">
                <div className="flex justify-between text-sm mb-1" style={{ fontFamily: 'var(--font-ui)' }}>
                  <span style={{ color: e.color, fontWeight: 600 }}>{e.name[locale]}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{Math.round((elCount[e.id] / total) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(elCount[e.id] / total) * 100}%`, backgroundColor: e.color }} />
                </div>
              </div>
            ))}
            <p className="mt-4 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              <strong>{t.dominant}:</strong> {domEl.name[locale]} — {domEl.quality[locale]}
              <br />
              <strong>{t.lacking}:</strong> {lowEl.name[locale]}. {lowEl.id !== domEl.id && ELEMENT_MAP[domEl.id].balance[locale]}
            </p>
          </div>
          <div className="rounded-xl p-5" style={card}>
            {MODALITIES.map((mo) => (
              <div key={mo.id} className="mb-3">
                <div className="flex justify-between text-sm mb-1" style={{ fontFamily: 'var(--font-ui)' }}>
                  <span style={{ color: 'var(--color-forest-700)', fontWeight: 600 }}>{mo.name[locale]}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{Math.round((moCount[mo.id] / total) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(moCount[mo.id] / total) * 100}%`, backgroundColor: 'var(--color-forest-500)' }} />
                </div>
              </div>
            ))}
            <p className="mt-4 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              {MODALITIES.reduce((a, b) => (moCount[b.id] > moCount[a.id] ? b : a)).description[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* Interpretations */}
      <section className="mb-12">
        <H2>{t.interpretations}</H2>
        <Caption>{t.interpretationsCaption}</Caption>
        <div className="grid gap-4 md:grid-cols-2">
          {chart.planets.map((p) => {
            const el = ELEMENT_MAP[ZODIAC_MAP[p.sign].element]
            return (
              <article key={p.id} className="rounded-xl p-5" style={{ ...card, borderLeft: `4px solid ${el.color}` }}>
                <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                  {pName(p.id)} · <span style={{ color: el.color }}>{signName(p.sign)}</span>
                  {p.house ? ` · ${p.house} ${t.house.toLowerCase()}` : ''}
                </h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                  {formatDegree(p.lon)} {p.retrograde ? '· R' : ''} · {PLANETS[p.id].keywords[locale]}
                </p>
                <dl className="flex flex-col gap-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
                  <div><dt className="inline font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t.what}: </dt><dd className="inline">{PLANETS[p.id].governs[locale]}</dd></div>
                  <div>
                    <dt className="inline font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t.how} ({ZODIAC_MAP[p.sign].name[locale]}): </dt>
                    <dd className="inline">
                      {p.id === 'moon'
                        ? MOON_IN[p.sign][locale]
                        : p.id === 'sun'
                          ? ZODIAC_MAP[p.sign].overview[locale]
                          : PLANET_IN_SIGN[p.id as 'mercury']?.[p.sign][locale] ?? SIGN_STYLE[p.sign][locale]}
                    </dd>
                  </div>
                  {(p.id === 'uranus' || p.id === 'neptune' || p.id === 'pluto') && (
                    <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>{GENERATIONAL_NOTE[locale]}</p>
                  )}
                  {p.house && (
                    <div>
                      <dt className="inline font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t.where} ({p.house}. {HOUSES[p.house].name[locale]}): </dt>
                      <dd className="inline">{planetInHouse(p.id, p.house)[locale]}</dd>
                    </div>
                  )}
                  {p.retrograde && (
                    <p className="text-xs" style={{ color: '#b91c1c' }}>{t.retroText}</p>
                  )}
                </dl>
              </article>
            )
          })}
        </div>
      </section>

      {/* Houses */}
      {chart.cusps && (
        <section className="mb-12">
          <H2>{t.houses}</H2>
          <Caption>{t.housesCaption}</Caption>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chart.cusps.map((c, i) => {
              const n = i + 1
              const inside = chart.planets.filter((p) => p.house === n)
              return (
                <div key={n} className="rounded-xl p-4" style={card}>
                  <div className="flex items-baseline justify-between mb-1" style={{ fontFamily: 'var(--font-ui)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-forest-700)' }}>{n}. {HOUSES[n].name[locale]}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{signName(signOf(c))} {formatDegree(c)}</span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{HOUSES[n].domain[locale]}</p>
                  {inside.length > 0 && (
                    <p className="text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{inside.map((p) => PLANETS[p.id].symbol + ' ' + PLANETS[p.id].name[locale]).join(', ')}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Aspects */}
      <section className="mb-12">
        <H2>{t.aspects}</H2>
        <Caption>{t.aspectsCaption}</Caption>
        <div className="grid gap-3 md:grid-cols-2">
          {chart.aspects.map((a, i) => {
            const def = ASPECT_DEFS.find((x) => x.id === a.type)!
            const info = ASPECTS[a.type]
            const pair = PAIRS[`${a.a}-${a.b}`] ?? PAIRS[`${a.b}-${a.a}`]
            const L = PLAIN_LABELS[locale]
            const tense = a.type === 'square' || a.type === 'opposition'
            const row = (label: string, text: string, color = 'var(--color-text-primary)') => (
              <p className="text-sm leading-relaxed">
                <strong style={{ color }}>{label}:</strong> {text}
              </p>
            )
            return (
              <details key={i} open={i < 6} className="rounded-xl p-4" style={{ ...card, borderLeft: `4px solid ${tense ? '#b91c1c' : a.type === 'conjunction' ? '#a16207' : '#15803d'}` }}>
                <summary className="cursor-pointer list-none flex flex-wrap items-center justify-between gap-2" style={{ fontFamily: 'var(--font-ui)' }}>
                  <span style={{ color: 'var(--color-text-primary)' }}>
                    {pName(a.a)} <span className="mx-1 text-lg" style={{ color: 'var(--color-gold-600)' }}>{def.symbol}</span> {pName(a.b)}
                  </span>
                  <span className="text-xs whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                    {info.name[locale]} ({info.nature[locale].toLowerCase()}) · {t.orb} {formatDegree(a.orb)}
                  </span>
                </summary>
                <div className="mt-3 flex flex-col gap-2" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>{ASPECT_PLAIN[a.type][locale]}</p>
                  {pair && (
                    <>
                      {row(L.about, pair.theme[locale])}
                      {a.type === 'conjunction' ? (
                        <>
                          {row(L.gift, pair.easy[locale], '#15803d')}
                          {row(L.watch, pair.hard[locale], '#b45309')}
                        </>
                      ) : tense ? (
                        row(L.challenge, pair.hard[locale], '#b91c1c')
                      ) : (
                        row(L.shows, pair.easy[locale], '#15803d')
                      )}
                      {row(L.tip, pair.tip[locale], 'var(--color-forest-700)')}
                    </>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </section>
    </div>
  )
}
