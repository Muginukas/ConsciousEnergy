import * as Astronomy from 'astronomy-engine'

/**
 * Tropical geocentric positions (true ecliptic of date) for natal astrology
 * and Human Design, computed with astronomy-engine (VSOP87 / ELP-based,
 * accurate to well under an arc-minute for the modern era).
 */

export type PlanetId =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'node'

export const PLANET_IDS: PlanetId[] = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  'node',
]

const BODY: Partial<Record<PlanetId, Astronomy.Body>> = {
  mercury: Astronomy.Body.Mercury,
  venus: Astronomy.Body.Venus,
  mars: Astronomy.Body.Mars,
  jupiter: Astronomy.Body.Jupiter,
  saturn: Astronomy.Body.Saturn,
  uranus: Astronomy.Body.Uranus,
  neptune: Astronomy.Body.Neptune,
  pluto: Astronomy.Body.Pluto,
}

export const norm = (d: number) => ((d % 360) + 360) % 360
const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI

function moonLon(t: Astronomy.AstroTime): number {
  return norm(Astronomy.EclipticGeoMoon(t).lon)
}

/** True (osculating) lunar node from the Moon's orbital plane. */
function trueNode(t: Astronomy.AstroTime): number {
  const toVec = (tt: Astronomy.AstroTime) => {
    const s = Astronomy.EclipticGeoMoon(tt)
    const lo = rad(s.lon)
    const la = rad(s.lat)
    return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]
  }
  const a = toVec(t.AddDays(-0.25))
  const b = toVec(t.AddDays(0.25))
  // angular momentum h = a × b
  const hx = a[1] * b[2] - a[2] * b[1]
  const hy = a[2] * b[0] - a[0] * b[2]
  return norm(deg(Math.atan2(hx, -hy)))
}

export function longitude(id: PlanetId, t: Astronomy.AstroTime): number {
  if (id === 'sun') return norm(Astronomy.SunPosition(t).elon)
  if (id === 'moon') return moonLon(t)
  if (id === 'node') return trueNode(t)
  const v = Astronomy.GeoVector(BODY[id] as Astronomy.Body, t, true)
  return norm(Astronomy.Ecliptic(v).elon)
}

export interface PlanetPosition {
  id: PlanetId
  lon: number
  speed: number // degrees per day
  retrograde: boolean
}

export function planetPositions(date: Date): PlanetPosition[] {
  const t = Astronomy.MakeTime(date)
  return PLANET_IDS.map((id) => {
    const a = longitude(id, t.AddDays(-0.5))
    const b = longitude(id, t.AddDays(0.5))
    let speed = b - a
    if (speed > 180) speed -= 360
    if (speed < -180) speed += 360
    return { id, lon: longitude(id, t), speed, retrograde: id !== 'node' && speed < 0 }
  })
}

/* ───────────────────── Angles & houses ───────────────────── */

export interface Angles {
  asc: number
  mc: number
  ramc: number
  obliquity: number
}

export function angles(date: Date, lat: number, lonEast: number): Angles {
  const t = Astronomy.MakeTime(date)
  const eps = Astronomy.e_tilt(t).tobl
  const ramc = norm(Astronomy.SiderealTime(t) * 15 + lonEast)
  const e = rad(eps)
  const r = rad(ramc)
  const mc = norm(deg(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(e))))
  const asc = norm(deg(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(e) + Math.tan(rad(lat)) * Math.sin(e)))))
  return { asc, mc, ramc, obliquity: eps }
}

export type HouseSystem = 'placidus' | 'equal'

/** House cusps 1..12 (index 0 = 1st house). Placidus, with Equal fallback near the poles. */
export function houses(a: Angles, lat: number): { cusps: number[]; system: HouseSystem } {
  const e = rad(a.obliquity)
  const phi = rad(lat)

  const cuspFor = (fraction: number, below: boolean): number | null => {
    let lam = norm(a.ramc + (below ? 180 : 0) + (below ? -1 : 1) * fraction * 90)
    for (let i = 0; i < 50; i++) {
      const dec = Math.asin(Math.sin(e) * Math.sin(rad(lam)))
      const x = -Math.tan(phi) * Math.tan(dec)
      if (Math.abs(x) > 1) return null
      const D = deg(Math.acos(x)) // diurnal semi-arc
      const N = 180 - D // nocturnal semi-arc
      const ra = below ? a.ramc + 180 - fraction * N : a.ramc + fraction * D
      const next = norm(deg(Math.atan2(Math.sin(rad(ra)), Math.cos(rad(ra)) * Math.cos(e))))
      if (Math.abs(next - lam) < 1e-7) return next
      lam = next
    }
    return lam
  }

  const c11 = cuspFor(1 / 3, false)
  const c12 = cuspFor(2 / 3, false)
  const c2 = cuspFor(2 / 3, true)
  const c3 = cuspFor(1 / 3, true)

  if (Math.abs(lat) < 66 && c11 !== null && c12 !== null && c2 !== null && c3 !== null) {
    const cusps = [a.asc, c2, c3, norm(a.mc + 180), norm(c11 + 180), norm(c12 + 180), norm(a.asc + 180), norm(c2 + 180), norm(c3 + 180), a.mc, c11, c12]
    return { cusps, system: 'placidus' }
  }
  return { cusps: Array.from({ length: 12 }, (_, i) => norm(a.asc + i * 30)), system: 'equal' }
}

export function houseOf(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i]
    const end = cusps[(i + 1) % 12]
    const span = norm(end - start)
    if (norm(lon - start) < span) return i + 1
  }
  return 1
}

/* ───────────────────── Aspects ───────────────────── */

export type AspectId = 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition'

export const ASPECT_DEFS: { id: AspectId; angle: number; orb: number; symbol: string }[] = [
  { id: 'conjunction', angle: 0, orb: 8, symbol: '☌' },
  { id: 'sextile', angle: 60, orb: 5, symbol: '⚹' },
  { id: 'square', angle: 90, orb: 7, symbol: '□' },
  { id: 'trine', angle: 120, orb: 7, symbol: '△' },
  { id: 'opposition', angle: 180, orb: 8, symbol: '☍' },
]

export interface Aspect {
  a: string
  b: string
  type: AspectId
  orb: number
}

export function findAspects(points: { id: string; lon: number }[]): Aspect[] {
  const out: Aspect[] = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p = points[i]
      const q = points[j]
      let d = Math.abs(p.lon - q.lon)
      if (d > 180) d = 360 - d
      const lum = [p.id, q.id].some((x) => x === 'sun' || x === 'moon') ? 2 : 0
      for (const asp of ASPECT_DEFS) {
        const orb = Math.abs(d - asp.angle)
        if (orb <= asp.orb + lum) {
          out.push({ a: p.id, b: q.id, type: asp.id, orb })
          break
        }
      }
    }
  }
  return out.sort((x, y) => x.orb - y.orb)
}

/* ───────────────────── Human Design time ───────────────────── */

/** Moment when the Sun stood exactly 88° of arc before its natal position. */
export function designDate(birth: Date): Date {
  const t0 = Astronomy.MakeTime(birth)
  const target = norm(Astronomy.SunPosition(t0).elon - 88)
  let t = t0.AddDays(-89)
  for (let i = 0; i < 30; i++) {
    let diff = norm(Astronomy.SunPosition(t).elon - target)
    if (diff > 180) diff -= 360
    if (Math.abs(diff) < 1e-7) break
    t = t.AddDays(-diff / 0.9856)
  }
  return t.date
}

/* ───────────────────── Formatting ───────────────────── */

export function signIndex(lon: number): number {
  return Math.floor(norm(lon) / 30)
}

export function formatDegree(lon: number): string {
  const inSign = norm(lon) % 30
  let d = Math.floor(inSign)
  let m = Math.round((inSign - d) * 60)
  if (m === 60) {
    d += 1
    m = 0
  }
  return `${d}°${String(m).padStart(2, '0')}′`
}
