import { ZODIAC_SIGNS, ZodiacSlug } from '../zodiac'
import {
  Angles,
  Aspect,
  HouseSystem,
  PlanetPosition,
  angles,
  findAspects,
  houseOf,
  houses,
  planetPositions,
  signIndex,
} from './ephemeris'
import { localToUtc } from './time'

export interface BirthInput {
  date: string
  time: string
  timeUnknown: boolean
  lat: number
  lon: number
  tz: string
}

export function birthUtc(b: BirthInput): Date {
  const [y, m, d] = b.date.split('-').map(Number)
  const [hh, mm] = (b.timeUnknown ? '12:00' : b.time).split(':').map(Number)
  return localToUtc(y, m, d, hh, mm, b.tz)
}

export interface NatalPlanet extends PlanetPosition {
  sign: ZodiacSlug
  house: number | null
}

export interface NatalChart {
  utc: Date
  planets: NatalPlanet[]
  angles: Angles | null
  cusps: number[] | null
  houseSystem: HouseSystem | null
  aspects: Aspect[]
}

export const signOf = (lon: number): ZodiacSlug => ZODIAC_SIGNS[signIndex(lon)].slug

export function computeNatal(b: BirthInput): NatalChart {
  const utc = birthUtc(b)
  const pos = planetPositions(utc)
  let ang: Angles | null = null
  let cusps: number[] | null = null
  let system: HouseSystem | null = null
  if (!b.timeUnknown) {
    ang = angles(utc, b.lat, b.lon)
    const h = houses(ang, b.lat)
    cusps = h.cusps
    system = h.system
  }
  const planets: NatalPlanet[] = pos.map((p) => ({
    ...p,
    sign: signOf(p.lon),
    house: cusps ? houseOf(p.lon, cusps) : null,
  }))
  const points = planets.filter((p) => p.id !== 'node').map((p) => ({ id: p.id as string, lon: p.lon }))
  if (ang) points.push({ id: 'asc', lon: ang.asc }, { id: 'mc', lon: ang.mc })
  const aspects = findAspects(points).filter((a) => !(a.a === 'asc' && a.b === 'mc'))
  return { utc, planets, angles: ang, cusps, houseSystem: system, aspects }
}
