import type { NextRequest } from 'next/server'

// Product lookup for the ingredient scanner (ported from HolySnacks /api/scan):
// a barcode or product name is looked up in Open Food Facts and the product's
// ingredient list is returned. Scoring happens in the browser.

const FIELDS =
  'product_name,product_name_lt,brands,ingredients_text,ingredients_text_lt,ingredients_text_en,nutriscore_grade,image_thumb_url'

type OFFProduct = {
  product_name?: string
  product_name_lt?: string
  brands?: string
  ingredients_text?: string
  ingredients_text_lt?: string
  ingredients_text_en?: string
  nutriscore_grade?: string
  image_thumb_url?: string
}

function offFetch(url: string) {
  return fetch(url, {
    headers: { 'User-Agent': 'ConsciousEnergy-IngredientScanner/1.0' },
    signal: AbortSignal.timeout(5000),
  })
}

const hasIngredients = (p: OFFProduct) =>
  [p.ingredients_text, p.ingredients_text_lt, p.ingredients_text_en].some((t) => (t?.length ?? 0) > 10)

const fold = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

/** A hit is relevant when its name or brand contains one of the query's words. */
function relevant(q: string, name?: string, brands?: string | string[]): boolean {
  const words = fold(q).split(/[^a-z0-9]+/).filter((w) => w.length >= 3)
  const hay = fold(`${name ?? ''} ${Array.isArray(brands) ? brands.join(' ') : (brands ?? '')}`)
  return words.length === 0 || words.some((w) => hay.includes(w))
}

async function searchOFF(q: string): Promise<OFFProduct | null> {
  const e = encodeURIComponent(q)

  // 1. Search-a-licious (search.openfoodfacts.org) finds the best-matching
  //    barcodes; the product API then supplies their ingredient lists.
  try {
    const res = await offFetch(`https://search.openfoodfacts.org/search?q=${e}&page_size=12&fields=code,product_name,brands`)
    if (res.ok) {
      type Hit = { code?: string; product_name?: string; brands?: string[] }
      const data = (await res.json()) as { hits?: Hit[] }
      const codes = (data.hits ?? [])
        .filter((h) => relevant(q, h.product_name, h.brands))
        .map((h) => h.code)
        .filter((c): c is string => !!c)
        .slice(0, 6)
      const products = await Promise.all(codes.map(byBarcode))
      const p = products.find((x): x is OFFProduct => !!x)
      if (p) return p
    }
  } catch {
    // fall through to the classic search
  }

  // 2. Classic search endpoints (slower, sometimes unavailable).
  const urls = [
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${e}&search_simple=1&action=process&json=1&page_size=10&fields=${FIELDS}`,
    `https://world.openfoodfacts.org/api/v2/search?q=${e}&fields=${FIELDS}&page_size=10`,
  ]
  for (const url of urls) {
    try {
      const res = await offFetch(url)
      if (!res.ok) continue
      const data = (await res.json()) as { products?: OFFProduct[] }
      const p = (data.products ?? []).find((x) => hasIngredients(x) && relevant(q, x.product_name, x.brands))
      if (p) return p
    } catch {
      // try the next strategy
    }
  }
  return null
}

async function byBarcode(code: string): Promise<OFFProduct | null> {
  try {
    const res = await offFetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json?fields=${FIELDS}`)
    if (!res.ok) return null
    const data = (await res.json()) as { status?: number; product?: OFFProduct }
    return data.status === 1 && data.product && hasIngredients(data.product) ? data.product : null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim().slice(0, 120)
  if (!q) return Response.json({ found: false, error: 'No query' }, { status: 400 })

  const p = /^\d{8,14}$/.test(q) ? await byBarcode(q) : await searchOFF(q)
  if (!p) return Response.json({ found: false })

  return Response.json({
    found: true,
    productName: p.product_name_lt || p.product_name || q,
    brand: p.brands ?? '',
    // Label text to show the user (Lithuanian when available)…
    ingredients: p.ingredients_text_lt || p.ingredients_text || p.ingredients_text_en || '',
    // …and every language variant for the scanner to match against.
    scanText: [p.ingredients_text_en, p.ingredients_text, p.ingredients_text_lt].filter(Boolean).join('\n'),
    nutriscore: p.nutriscore_grade ?? null,
    image: p.image_thumb_url ?? null,
  })
}
