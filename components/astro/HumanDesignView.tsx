'use client'

import { useState } from 'react'
import { CENTER_IDS, CenterId, HdChart, channelKey, computeHumanDesign } from '@/lib/astro/humandesign'
import { HD_ANGLES, HD_AUTHORITIES, HD_CENTERS, HD_CHANNELS, HD_DEFINITIONS, HD_GATES, HD_LINES, HD_PLANET_NAMES, HD_TYPES } from '@/lib/astro/hd-data'
import { birthUtc } from '@/lib/astro/natal'
import { AUTHORITY_DEEP, CENTER_DEEP, LINE_DEEP, TYPE_DEEP } from '@/lib/astro/hd-deep'
import { channelInLife, gateInLife } from '@/lib/astro/hd-gates-deep'
import { astroText } from '@/lib/astro/ui-text'
import { Locale } from '@/lib/types'
import BirthForm, { BirthData, loadBirthData } from './BirthForm'
import BodyGraph from './BodyGraph'

const card = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
  boxShadow: 'var(--shadow-card)',
} as const

const P_COLOR = '#1c1a17'
const D_COLOR = '#c0392b'

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
      {children}
    </h2>
  )
}

const compute = (d: BirthData) =>
  computeHumanDesign(birthUtc({ date: d.date, time: d.time, timeUnknown: d.timeUnknown, lat: d.place.lat, lon: d.place.lon, tz: d.place.tz }))

export default function HumanDesignView({ lang }: { lang: string }) {
  const locale = lang as Locale
  const T = astroText(locale)
  const [initial] = useState<BirthData | null>(() => loadBirthData())
  const [data, setData] = useState<BirthData | null>(initial)
  const [chart, setChart] = useState<HdChart | null>(() => (initial ? compute(initial) : null))

  const calculate = (d: BirthData) => {
    setData(d)
    setChart(compute(d))
  }

  return (
    <div>
      <BirthForm lang={lang} t={T.form} initial={initial} onSubmit={calculate} />
      {chart && data && <Result chart={chart} data={data} locale={locale} />}
    </div>
  )
}

function Result({ chart, data, locale }: { chart: HdChart; data: BirthData; locale: Locale }) {
  const t = astroText(locale).hd
  const type = HD_TYPES[chart.type]
  const deep = TYPE_DEEP[chart.type]
  const auth = HD_AUTHORITIES[chart.authority]
  const def = HD_DEFINITIONS[chart.definition]
  const [pl, dl] = chart.profile
  const angle = HD_ANGLES[chart.cross.angle]
  const [c1, c2, c3, c4] = chart.cross.gates
  const labels = Object.fromEntries(CENTER_IDS.map((c) => [c, HD_CENTERS[c].name[locale].split(/ \(| \//)[0]])) as Record<CenterId, string>

  const summary: [string, string, string?][] = [
    [t.type, type.name[locale], `${type.share} ${t.population}`],
    [t.strategy, type.strategy[locale]],
    [t.authority, auth.name[locale]],
    [t.profile, `${pl}/${dl}`, `${HD_LINES[pl].name[locale]} / ${HD_LINES[dl].name[locale]}`],
    [t.definition, def.name[locale]],
    [t.signature, type.signature[locale]],
    [t.notSelf, type.notSelf[locale]],
    [t.cross, `${angle.name[locale]}`, `${c1}/${c2} | ${c3}/${c4}`],
  ]

  const activationList = (list: HdChart['personality'], color: string) => (
    <ul className="flex flex-col gap-1 text-sm tabular-nums" style={{ fontFamily: 'var(--font-ui)' }}>
      {list.map((a) => (
        <li key={a.planet} className="flex items-center justify-between gap-2">
          <span title={HD_PLANET_NAMES[a.planet][locale]} style={{ color }}>
            {HD_PLANET_NAMES[a.planet].symbol}
          </span>
          <span className="font-semibold" style={{ color }}>
            {a.gate}.{a.line}
          </span>
        </li>
      ))}
    </ul>
  )

  // all activated gates with which planets
  const gateRows = [...chart.gates.keys()]
    .sort((a, b) => a - b)
    .map((g) => ({
      gate: g,
      p: chart.personality.filter((a) => a.gate === g),
      d: chart.design.filter((a) => a.gate === g),
    }))

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-4xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {data.name ? `${data.name} — ` : ''}
          {type.name[locale]} {pl}/{dl}
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
          {data.date.split('-').reverse().join('.')} {data.timeUnknown ? '' : data.time} · {data.place.name} · {t.designDate}:{' '}
          {chart.designDate.toISOString().slice(0, 16).replace('T', ' ')} UTC
        </p>
        {data.timeUnknown && (
          <p className="mt-3 rounded-lg p-3 text-sm" style={{ backgroundColor: 'var(--color-gold-50)', color: 'var(--color-earth-700)', fontFamily: 'var(--font-ui)' }}>
            {t.noTime}
          </p>
        )}
      </header>

      <section className="mb-10 rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, var(--color-forest-50), var(--color-gold-50))', border: '1px solid var(--color-forest-200)' }}>
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

      {/* Summary */}
      <section className="mb-12 grid gap-3 grid-cols-2 lg:grid-cols-4">
        {summary.map(([k, v, sub]) => (
          <div key={k} className="rounded-xl p-4" style={card}>
            <p className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-gold-600)', fontFamily: 'var(--font-ui)' }}>
              {k}
            </p>
            <p className="text-lg font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              {v}
            </p>
            {sub && (
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
                {sub}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* BodyGraph */}
      <section className="mb-12">
        <H2>{t.bodygraph}</H2>
        <div className="rounded-2xl p-4" style={card}>
          <div className="grid grid-cols-[56px_1fr_56px] sm:grid-cols-[90px_1fr_90px] gap-2 items-start">
            <div>
              <p className="text-xs font-semibold mb-2 text-center" style={{ color: D_COLOR, fontFamily: 'var(--font-ui)' }}>{t.design}</p>
              {activationList(chart.design, D_COLOR)}
            </div>
            <BodyGraph chart={chart} labels={labels} />
            <div>
              <p className="text-xs font-semibold mb-2 text-center" style={{ color: P_COLOR, fontFamily: 'var(--font-ui)' }}>{t.personality}</p>
              {activationList(chart.personality, P_COLOR)}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-text-muted)' }}>
            <span><span className="inline-block w-4 h-1 align-middle mr-1" style={{ backgroundColor: P_COLOR }} />{t.legendP}</span>
            <span><span className="inline-block w-4 h-1 align-middle mr-1" style={{ backgroundColor: D_COLOR }} />{t.legendD}</span>
            <span>{t.designCaption}</span>
          </div>
        </div>
      </section>

      {/* Type & authority */}
      <section className="mb-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl p-6" style={card}>
          <H2>{type.name[locale]}</H2>
          <p className="mb-3 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{type.description[locale]}</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
            <strong>{t.strategy}:</strong> {type.strategy[locale]}
            <br />
            <strong>{t.aura}:</strong> {type.aura[locale]}
            <br />
            <strong>{t.signature}:</strong> {type.signature[locale]} · <strong>{t.notSelf}:</strong> {type.notSelf[locale]}
          </p>
          <h3 className="mt-5 mb-1 font-semibold" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-forest-700)' }}>{t.daily}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{deep.daily[locale]}</p>
          <h3 className="mt-4 mb-1 font-semibold" style={{ fontFamily: 'var(--font-ui)', color: '#b45309' }}>{t.signsLabel}</h3>
          <ul className="list-disc pl-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {deep.signs[locale].map((x) => <li key={x}>{x}</li>)}
          </ul>
          <h3 className="mt-4 mb-1 font-semibold" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-forest-700)' }}>{t.tipsLabel}</h3>
          <ul className="list-disc pl-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {deep.tips[locale].map((x) => <li key={x}>{x}</li>)}
          </ul>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            <strong>{t.loveLabel}:</strong> {deep.love[locale]}
            <br />
            <strong>{t.workLabel}:</strong> {deep.work[locale]}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-6" style={card}>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{t.authority}: {auth.name[locale]}</h3>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{auth.description[locale]}</p>
            <h4 className="mt-4 mb-1 font-semibold" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-forest-700)' }}>{t.stepsLabel}</h4>
            <ol className="list-decimal pl-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              {AUTHORITY_DEEP[chart.authority].steps[locale].map((x) => <li key={x}>{x}</li>)}
            </ol>
            <p className="mt-3 text-sm italic" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              <strong>{t.exampleLabel}:</strong> {AUTHORITY_DEEP[chart.authority].example[locale]}
            </p>
          </div>
          <div className="rounded-xl p-6" style={card}>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{t.definition}: {def.name[locale]}</h3>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{def.description[locale]}</p>
          </div>
        </div>
      </section>

      {/* Profile & cross */}
      <section className="mb-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl p-6" style={card}>
          <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>{t.profile} {pl}/{dl}</h3>
          {[
            [pl, t.personality, P_COLOR],
            [dl, t.design, D_COLOR],
          ].map(([line, label, color]) => (
            <p key={String(label)} className="mb-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              <strong style={{ color: color as string }}>
                {line} — {HD_LINES[line as number].name[locale]}
              </strong>{' '}
              ({label}): {LINE_DEEP[line as number][locale]}
            </p>
          ))}
        </div>
        <div className="rounded-xl p-6" style={card}>
          <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>{t.cross}</h3>
          <p className="mb-2 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            <strong>{angle.name[locale]}</strong> — {angle.description[locale]}
          </p>
          <ul className="text-sm flex flex-col gap-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
            {[
              [c1, '☉', P_COLOR],
              [c2, '⊕', P_COLOR],
              [c3, '☉', D_COLOR],
              [c4, '⊕', D_COLOR],
            ].map(([g, sym, col], i) => (
              <li key={i}>
                <span style={{ color: col as string }}>{sym}</span> <strong>{g}</strong> — {HD_GATES[g as number].name[locale]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Centers */}
      <section className="mb-12">
        <H2>{t.centers}</H2>
        <p className="mb-5 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{t.centersCaption}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CENTER_IDS.map((c) => {
            const on = chart.defined.has(c)
            const info = HD_CENTERS[c]
            return (
              <div key={c} className="rounded-xl p-4" style={{ ...card, borderLeft: `4px solid ${on ? 'var(--color-forest-500)' : 'var(--color-earth-200)'}` }}>
                <div className="flex justify-between items-baseline mb-1" style={{ fontFamily: 'var(--font-ui)' }}>
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{info.name[locale]}</span>
                  <span className="text-xs font-semibold" style={{ color: on ? 'var(--color-forest-700)' : 'var(--color-text-muted)' }}>{on ? t.defined : t.open}</span>
                </div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{info.theme[locale]}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{on ? info.defined[locale] : info.open[locale]}</p>
                {!on && (
                  <p className="mt-2 text-sm italic" style={{ color: '#b45309', fontFamily: 'var(--font-body)' }}>
                    {t.questionLabel}: {CENTER_DEEP[c].question[locale]}
                  </p>
                )}
                <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  <strong style={{ color: 'var(--color-forest-700)' }}>{t.tipLabel}:</strong> {CENTER_DEEP[c].tip[locale]}
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>{t.bodyLabel}: {CENTER_DEEP[c].body[locale]}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Channels */}
      <section className="mb-12">
        <H2>{t.channels}</H2>
        <p className="mb-5 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{t.channelsCaption}</p>
        {chart.channels.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>{t.noChannels}</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {chart.channels.map((ch) => {
              const info = HD_CHANNELS[channelKey(ch)]
              return (
                <div key={channelKey(ch)} className="rounded-xl p-4" style={card}>
                  <p className="font-semibold mb-1" style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-forest-700)' }}>
                    {ch[0]}–{ch[1]} · {info.name[locale]}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{info.description[locale]}</p>
                  {channelInLife(channelKey(ch)) && (
                    <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                      <strong style={{ color: 'var(--color-forest-700)' }}>{t.inLife}:</strong> {channelInLife(channelKey(ch))![locale]}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Gates */}
      <section className="mb-12">
        <H2>{t.gates}</H2>
        <p className="mb-5 max-w-2xl" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{t.gatesCaption}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {gateRows.map(({ gate, p, d }) => (
            <div key={gate} className="rounded-xl p-4" style={card}>
              <div className="flex items-baseline justify-between gap-2 mb-1" style={{ fontFamily: 'var(--font-ui)' }}>
                <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {gate}. {HD_GATES[gate].name[locale]}
                </span>
                <span className="text-xs whitespace-nowrap">
                  {d.map((a) => (
                    <span key={'d' + a.planet} className="ml-1" style={{ color: D_COLOR }}>{HD_PLANET_NAMES[a.planet].symbol}{a.gate}.{a.line}</span>
                  ))}
                  {p.map((a) => (
                    <span key={'p' + a.planet} className="ml-1" style={{ color: P_COLOR }}>{HD_PLANET_NAMES[a.planet].symbol}{a.gate}.{a.line}</span>
                  ))}
                </span>
              </div>
              <p className="text-xs mb-1 italic" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>I Ching: {HD_GATES[gate].iching}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{HD_GATES[gate].description[locale]}</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                <strong style={{ color: 'var(--color-forest-700)' }}>{t.inLife}:</strong> {gateInLife(gate)[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
