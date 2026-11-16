'use client'

import { useEffect, useRef, useState } from 'react'
import {
  scanText,
  computeScore,
  getGrade,
  badPts,
  looksLikeProductName,
  searchLTBrand,
  KNOWN_BRANDS,
} from '@/lib/ingredient-scanner/scanner'
import type { ScanResult, GoodResult, LTBrand } from '@/lib/ingredient-scanner/scanner'
import { BAD_CATEGORIES } from '@/lib/ingredient-scanner/bad-ingredients'
import { prepareForScan } from '@/lib/ingredient-scanner/lt-terms'

const ui = { fontFamily: 'var(--font-ui)' }
const body = { fontFamily: 'var(--font-body)' }
const card = {
  backgroundColor: 'var(--color-cream)',
  border: '1px solid var(--color-earth-200)',
}

type Product = {
  productName: string
  brand: string
  ingredients: string
  scanText: string
  nutriscore: string | null
  image: string | null
}

type Analysis = { bad: ScanResult[]; good: GoodResult[]; score: number }

type HistoryItem = { query: string; name: string; score: number }
const HISTORY_KEY = 'ce_scan_history'

function analyse(text: string): Analysis {
  const { bad, good } = scanText(prepareForScan(text))
  return { bad, good, score: computeScore(bad, good) }
}

const EXAMPLES_LT = [
  { label: 'Coca-Cola', q: 'coca cola' },
  { label: 'Nutella', q: 'nutella' },
  { label: 'Pergalė', q: 'pergale' },
  { label: 'Rūta', q: 'ruta' },
  { label: 'Sudėtis: cukrus, palmių aliejus, E471…', q: 'Cukrus, palmių aliejus, kvietiniai miltai, gliukozės-fruktozės sirupas, emulsiklis E471, kvapiosios medžiagos, druska' },
]
const EXAMPLES_EN = [
  { label: 'Coca-Cola', q: 'coca cola' },
  { label: 'Nutella', q: 'nutella' },
  { label: 'Pergalė', q: 'pergale' },
  { label: 'Ingredients: oats, dates, almonds…', q: 'Rolled oats, medjool dates, almonds, raw cacao, sea salt' },
]

// Minimal typing for the browser's built-in BarcodeDetector (Chrome / Android).
type Detector = { detect(src: HTMLVideoElement): Promise<{ rawValue: string }[]> }
type DetectorCtor = new (opts: { formats: string[] }) => Detector

export default function IngredientScanner({ lang }: { lang: string }) {
  const lt = lang === 'lt'
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [brand, setBrand] = useState<LTBrand | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [camera, setCamera] = useState(false)
  const [canScanBarcode, setCanScanBarcode] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore once on mount
      if (saved) setHistory(JSON.parse(saved))
    } catch {
      // storage unavailable — history just starts empty
    }
    setCanScanBarcode('BarcodeDetector' in window && !!navigator.mediaDevices?.getUserMedia)
    return () => streamRef.current?.getTracks().forEach((t) => t.stop())
  }, [])

  function remember(query: string, name: string, score: number) {
    const next = [{ query, name, score }, ...history.filter((h) => h.query !== query)].slice(0, 8)
    setHistory(next)
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  function reset() {
    setError(null)
    setProduct(null)
    setAnalysis(null)
    setBrand(null)
  }

  function show() {
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  async function run(raw: string) {
    const q = raw.trim()
    if (!q) return
    reset()
    setInput(q)
    const isBarcode = /^\d{8,14}$/.test(q)

    // 1. A pasted ingredient list — score it directly.
    if (!isBarcode && !looksLikeProductName(q)) {
      const a = analyse(q)
      setAnalysis(a)
      show()
      return
    }

    // 2. Lithuanian brand catalogue (Pergalė, Rūta, Laima…).
    const ltBrand = !isBarcode ? searchLTBrand(q) : null
    if (ltBrand) {
      setBrand(ltBrand)
      show()
      return
    }

    // 3. Well-known products with a stored ingredient list.
    const known = KNOWN_BRANDS[q.toLowerCase()]
    if (known) {
      const p: Product = {
        productName: known.productName,
        brand: known.brand,
        ingredients: known.ingredients,
        scanText: known.ingredients,
        nutriscore: known.nutriscore ?? null,
        image: null,
      }
      const a = analyse(p.scanText)
      setProduct(p)
      setAnalysis(a)
      remember(q, p.productName, a.score)
      show()
      return
    }

    // 4. Open Food Facts (name or barcode).
    setBusy(true)
    try {
      const res = await fetch(`/api/ingredient-scan?q=${encodeURIComponent(q)}`)
      const data = (await res.json()) as { found: boolean } & Partial<Product>
      if (data.found && data.ingredients) {
        const p: Product = {
          productName: data.productName ?? q,
          brand: data.brand ?? '',
          ingredients: data.ingredients,
          scanText: data.scanText || data.ingredients,
          nutriscore: data.nutriscore ?? null,
          image: data.image ?? null,
        }
        const a = analyse(p.scanText)
        setProduct(p)
        setAnalysis(a)
        remember(q, p.productName, a.score)
        show()
      } else {
        setError(
          lt
            ? 'Produkto neradome. Nukopijuok sudėtį nuo pakuotės ir įklijuok čia — įvertinsime ją tiesiogiai.'
            : 'Product not found. Copy the ingredient list from the pack and paste it here — we will score it directly.',
        )
      }
    } catch {
      setError(lt ? 'Nepavyko prisijungti. Pabandyk dar kartą.' : 'Could not connect. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function openCamera() {
    const Ctor = (window as unknown as { BarcodeDetector?: DetectorCtor }).BarcodeDetector
    if (!Ctor) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      setCamera(true)
      const detector = new Ctor({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] })
      requestAnimationFrame(async () => {
        const video = videoRef.current
        if (!video) return
        video.srcObject = stream
        await video.play()
        const tick = async () => {
          if (!streamRef.current) return
          try {
            const codes = await detector.detect(video)
            if (codes[0]?.rawValue) {
              closeCamera()
              run(codes[0].rawValue)
              return
            }
          } catch {
            // frame not ready
          }
          setTimeout(tick, 300)
        }
        tick()
      })
    } catch {
      setError(lt ? 'Nepavyko įjungti kameros.' : 'Could not open the camera.')
    }
  }

  function closeCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCamera(false)
  }

  const examples = lt ? EXAMPLES_LT : EXAMPLES_EN

  return (
    <div>
      {/* ── Input ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          run(input)
        }}
        className="rounded-2xl p-4 sm:p-6"
        style={card}
      >
        <label htmlFor="scan-input" className="mb-2 block text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
          {lt ? 'Produkto pavadinimas, brūkšninis kodas arba sudėtis' : 'Product name, barcode or ingredient list'}
        </label>
        <textarea
          id="scan-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              run(input)
            }
          }}
          rows={3}
          placeholder={
            lt
              ? 'pvz. „Nutella“, 5000112637922 arba „cukrus, palmių aliejus, E471…“'
              : 'e.g. “Nutella”, 5000112637922 or “sugar, palm oil, E471…”'
          }
          className="w-full resize-y rounded-xl px-4 py-3 text-base outline-none focus:ring-2"
          style={{ ...body, backgroundColor: 'white', border: '1px solid var(--color-earth-200)', color: 'var(--color-text-primary)' }}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity disabled:opacity-50"
            style={{ ...ui, backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
          >
            {busy ? (lt ? 'Ieškome…' : 'Searching…') : lt ? '🔍 Tikrinti' : '🔍 Check'}
          </button>
          {canScanBarcode && (
            <button
              type="button"
              onClick={camera ? closeCamera : openCamera}
              className="rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ ...ui, backgroundColor: 'white', color: 'var(--color-forest-700)', border: '1px solid var(--color-forest-700)' }}
            >
              {camera ? (lt ? 'Uždaryti kamerą' : 'Close camera') : lt ? '📷 Skenuoti kodą' : '📷 Scan barcode'}
            </button>
          )}
        </div>
        {camera && (
          <video ref={videoRef} playsInline muted className="mt-4 w-full max-w-md rounded-xl" style={{ backgroundColor: '#000' }} />
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs self-center" style={{ ...ui, color: 'var(--color-text-muted)' }}>
            {lt ? 'Išbandyk:' : 'Try:'}
          </span>
          {examples.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => run(ex.q)}
              className="max-w-full truncate rounded-full px-3 py-1 text-xs"
              style={{ ...ui, backgroundColor: 'var(--color-earth-50)', color: 'var(--color-text-secondary)' }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-xl px-4 py-3 text-sm" style={{ ...body, backgroundColor: '#fdecea', color: '#8a1c1c' }}>
          {error}
        </p>
      )}

      <div ref={resultRef} className="scroll-mt-24">
        {brand && <BrandResult brand={brand} lt={lt} />}

        {analysis && (
          <div className="mt-6">
            {product && <ProductHeader product={product} />}
            <ScoreCard analysis={analysis} lt={lt} />
            <Findings analysis={analysis} lt={lt} />
            {product && (
              <details className="mt-4 rounded-2xl p-4" style={card}>
                <summary className="cursor-pointer text-sm font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                  {lt ? 'Visa sudėtis' : 'Full ingredient list'}
                </summary>
                <p className="mt-2 text-sm leading-relaxed" style={{ ...body, color: 'var(--color-text-secondary)' }}>
                  {product.ingredients}
                </p>
              </details>
            )}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-text-muted)' }}>
            {lt ? 'Neseniai tikrinti' : 'Recently checked'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {history.map((h) => {
              const g = getGrade(h.score)
              return (
                <button
                  key={h.query}
                  onClick={() => run(h.query)}
                  className="flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-sm"
                  style={{ ...ui, ...card }}
                >
                  <span aria-hidden>{g.emoji}</span>
                  <span className="truncate" style={{ color: 'var(--color-text-primary)' }}>{h.name}</span>
                  <span className="font-semibold" style={{ color: g.color }}>{h.score}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function ProductHeader({ product }: { product: Product }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      {product.image && (
        // eslint-disable-next-line @next/next/no-img-element -- remote Open Food Facts thumbnail
        <img src={product.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-contain" style={{ backgroundColor: 'white' }} />
      )}
      <div className="min-w-0">
        <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {product.productName}
        </h2>
        <p className="text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
          {product.brand}
          {product.nutriscore && (
            <>
              {product.brand ? ' · ' : ''}Nutri-Score {product.nutriscore.toUpperCase()}
            </>
          )}
        </p>
      </div>
    </div>
  )
}

function verdict(score: number, lt: boolean): string {
  if (score >= 750) return lt ? 'Švarus produktas — drąsiai rinkis.' : 'A clean product — a good choice.'
  if (score >= 550) return lt ? 'Neblogas pasirinkimas, bet yra ką patobulinti.' : 'A decent choice, with room to improve.'
  if (score >= 350) return lt ? 'Vidutiniškas — vartok saikingai.' : 'Middling — enjoy in moderation.'
  if (score >= 150) return lt ? 'Blogas pasirinkimas — verta ieškoti alternatyvos.' : 'A poor choice — worth finding an alternative.'
  return lt ? 'Labai žalingas — geriau vengti.' : 'Very harmful — best avoided.'
}

function ScoreCard({ analysis, lt }: { analysis: Analysis; lt: boolean }) {
  const g = getGrade(analysis.score)
  const pct = Math.max(2, Math.min(100, analysis.score / 10))
  return (
    <div className="rounded-2xl p-5 sm:p-6" style={{ ...card, borderLeft: `6px solid ${g.color}` }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ ...ui, color: 'var(--color-text-muted)' }}>
            {lt ? 'Švarumo balas' : 'Purity score'}
          </p>
          <p className="text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: g.color }}>
            {analysis.score}
            <span className="text-lg font-normal" style={{ color: 'var(--color-text-muted)' }}> / 1000</span>
          </p>
        </div>
        <p className="text-2xl font-semibold" style={{ ...ui, color: g.color }}>
          {g.emoji} {lt ? g.labelLt : g.label}
        </p>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--color-earth-200)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: g.color }} />
      </div>
      <p className="mt-3 text-base" style={{ ...body, color: 'var(--color-text-secondary)' }}>
        {verdict(analysis.score, lt)}{' '}
        {lt
          ? `Rasta ${analysis.bad.length} žalingų ir ${analysis.good.length} naudingų ingredientų.`
          : `Found ${analysis.bad.length} harmful and ${analysis.good.length} beneficial ingredients.`}
      </p>
    </div>
  )
}

const DANGER: Record<string, { lt: string; en: string; color: string }> = {
  high: { lt: 'Didelė žala', en: 'High risk', color: '#b91c1c' },
  medium: { lt: 'Vidutinė žala', en: 'Medium risk', color: '#c2410c' },
  low: { lt: 'Nedidelė žala', en: 'Low risk', color: '#a16207' },
}

function Findings({ analysis, lt }: { analysis: Analysis; lt: boolean }) {
  if (!analysis.bad.length && !analysis.good.length) {
    return (
      <p className="mt-4 text-sm" style={{ ...body, color: 'var(--color-text-muted)' }}>
        {lt
          ? 'Neatpažinome nė vieno žinomo žalingo ar ypač naudingo ingrediento.'
          : 'No known harmful or especially beneficial ingredients were recognised.'}
      </p>
    )
  }
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {analysis.bad.length > 0 && (
        <section>
          <h3 className="mb-3 text-lg font-semibold" style={{ ...ui, color: '#991b1b' }}>
            ☠️ {lt ? 'Žalingi ingredientai' : 'Harmful ingredients'}
          </h3>
          <ul className="space-y-2">
            {analysis.bad.map((r) => {
              const d = DANGER[r.ingredient.danger]
              const cat = BAD_CATEGORIES.find((c) => c.id === r.ingredient.category)
              return (
                <li key={r.ingredient.name}>
                  <details className="rounded-xl p-3" style={card}>
                    <summary className="flex cursor-pointer list-none items-start gap-3">
                      <span className="text-xl" aria-hidden>{r.ingredient.emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                          {r.ingredient.name}
                          {r.ingredient.eNumber && <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}> · {r.ingredient.eNumber}</span>}
                        </span>
                        <span className="block text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>
                          <span style={{ color: d.color, fontWeight: 600 }}>{lt ? d.lt : d.en}</span>
                          {cat && <> · {lt ? cat.labelLt : cat.label}</>}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold" style={{ ...ui, color: d.color }}>−{badPts(r)}</span>
                    </summary>
                    <div className="mt-2 space-y-2 text-sm leading-relaxed" style={{ ...body, color: 'var(--color-text-secondary)' }}>
                      <p>{r.ingredient.whyBad}</p>
                      <p>
                        <strong>{lt ? 'Slepiasi: ' : 'Hides in: '}</strong>
                        {r.ingredient.hidesIn}
                      </p>
                      {r.ingredient.bannedIn && (
                        <p>
                          <strong>{lt ? 'Reguliavimas: ' : 'Regulation: '}</strong>
                          {r.ingredient.bannedIn}
                        </p>
                      )}
                    </div>
                  </details>
                </li>
              )
            })}
          </ul>
        </section>
      )}
      {analysis.good.length > 0 && (
        <section>
          <h3 className="mb-3 text-lg font-semibold" style={{ ...ui, color: 'var(--color-forest-700)' }}>
            🌿 {lt ? 'Naudingi ingredientai' : 'Beneficial ingredients'}
          </h3>
          <ul className="space-y-2">
            {analysis.good.map((r) => (
              <li key={r.ingredient.name}>
                <details className="rounded-xl p-3" style={card}>
                  <summary className="flex cursor-pointer list-none items-start gap-3">
                    <span className="text-xl" aria-hidden>{r.ingredient.emoji}</span>
                    <span className="min-w-0 flex-1 font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>
                      {r.ingredient.name}
                    </span>
                    <span className="shrink-0 text-sm font-semibold" style={{ ...ui, color: 'var(--color-forest-700)' }}>+{r.ingredient.bonus}</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed" style={{ ...body, color: 'var(--color-text-secondary)' }}>
                    {r.ingredient.whyGood}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}
      {lt && (
        <p className="text-xs lg:col-span-2" style={{ ...ui, color: 'var(--color-text-muted)' }}>
          Išskleisk ingredientą, kad pamatytum, kodėl jis žalingas ar naudingas (paaiškinimai kol kas anglų kalba).
        </p>
      )}
    </div>
  )
}

function BrandResult({ brand, lt }: { brand: LTBrand; lt: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  const rows = brand.products
    .map((p, i) => ({ p, i, a: analyse(p.ingredients) }))
    .sort((x, y) => y.a.score - x.a.score)
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
        {brand.country} {brand.display}
      </h2>
      <p className="mb-4 text-sm" style={{ ...ui, color: 'var(--color-text-muted)' }}>
        {brand.tagline} · {lt ? `${brand.products.length} produktai, nuo geriausio` : `${brand.products.length} products, best first`}
      </p>
      <ul className="space-y-2">
        {rows.map(({ p, i, a }) => {
          const g = getGrade(a.score)
          return (
            <li key={i} className="rounded-xl" style={card}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 p-3 text-left" aria-expanded={open === i}>
                <span className="text-xl" aria-hidden>{p.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold" style={{ ...ui, color: 'var(--color-text-primary)' }}>{lt ? p.nameLt : p.name}</span>
                  <span className="block text-xs" style={{ ...ui, color: 'var(--color-text-muted)' }}>{lt ? p.categoryLt : p.category}</span>
                </span>
                <span className="shrink-0 text-right" style={ui}>
                  <span className="block text-lg font-bold" style={{ color: g.color }}>{a.score}</span>
                  <span className="block text-xs" style={{ color: g.color }}>{g.emoji} {lt ? g.labelLt : g.label}</span>
                </span>
              </button>
              {open === i && (
                <div className="px-3 pb-3">
                  <Findings analysis={a} lt={lt} />
                  <p className="mt-3 text-xs leading-relaxed" style={{ ...body, color: 'var(--color-text-muted)' }}>{p.ingredients}</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
