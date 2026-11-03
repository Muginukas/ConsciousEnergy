import { PlanetId, designDate, norm, planetPositions } from './ephemeris'

/* ───────────────────── Rave Mandala ───────────────────── */

/** Gate order around the wheel, starting with Gate 41 at 2°00′ Aquarius (302°). */
export const GATE_ORDER = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
]
const MANDALA_START = 302
const GATE_SPAN = 360 / 64 // 5.625°
const LINE_SPAN = GATE_SPAN / 6 // 0.9375°

export function gateAndLine(lon: number): { gate: number; line: number } {
  const x = norm(lon - MANDALA_START)
  const idx = Math.floor(x / GATE_SPAN)
  const line = Math.floor((x - idx * GATE_SPAN) / LINE_SPAN) + 1
  return { gate: GATE_ORDER[idx], line: Math.min(6, line) }
}

/* ───────────────────── Centers, channels ───────────────────── */

export type CenterId = 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'spleen' | 'solar' | 'sacral' | 'root'

export const CENTER_IDS: CenterId[] = ['head', 'ajna', 'throat', 'g', 'heart', 'spleen', 'solar', 'sacral', 'root']

export const CENTER_GATES: Record<CenterId, number[]> = {
  head: [64, 61, 63],
  ajna: [47, 24, 4, 17, 43, 11],
  throat: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
  g: [7, 1, 13, 10, 25, 15, 46, 2],
  heart: [21, 40, 26, 51],
  spleen: [48, 57, 44, 50, 32, 28, 18],
  solar: [36, 22, 37, 6, 49, 55, 30],
  sacral: [5, 14, 29, 59, 9, 3, 42, 27, 34],
  root: [53, 60, 52, 19, 39, 41, 58, 38, 54],
}

export const GATE_CENTER: Record<number, CenterId> = Object.fromEntries(
  CENTER_IDS.flatMap((c) => CENTER_GATES[c].map((g) => [g, c]))
) as Record<number, CenterId>

export const MOTORS: CenterId[] = ['heart', 'solar', 'sacral', 'root']

/** The 36 channels as [gateA, gateB]. */
export const CHANNELS: [number, number][] = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52], [10, 20], [10, 34], [10, 57], [11, 56],
  [12, 22], [13, 33], [16, 48], [17, 62], [18, 58], [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51],
  [26, 44], [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [34, 57], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64],
]

export const channelKey = (c: [number, number]) => `${c[0]}-${c[1]}`

/* ───────────────────── Chart ───────────────────── */

export const HD_PLANETS: (PlanetId | 'earth' | 'southNode')[] = [
  'sun', 'earth', 'node', 'southNode', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
]

export interface Activation {
  planet: (typeof HD_PLANETS)[number]
  lon: number
  gate: number
  line: number
}

export type HdType = 'manifestor' | 'generator' | 'manifestingGenerator' | 'projector' | 'reflector'
export type HdAuthority = 'emotional' | 'sacral' | 'splenic' | 'egoManifested' | 'egoProjected' | 'selfProjected' | 'mental' | 'lunar'
export type HdDefinition = 'none' | 'single' | 'split' | 'tripleSplit' | 'quadrupleSplit'

export interface HdChart {
  designDate: Date
  personality: Activation[]
  design: Activation[]
  gates: Map<number, { personality: boolean; design: boolean }>
  channels: [number, number][]
  defined: Set<CenterId>
  type: HdType
  authority: HdAuthority
  profile: [number, number]
  definition: HdDefinition
  cross: { gates: [number, number, number, number]; angle: 'right' | 'juxtaposition' | 'left' }
}

function activations(date: Date): Activation[] {
  const pos = Object.fromEntries(planetPositions(date).map((p) => [p.id, p.lon])) as Record<PlanetId, number>
  return HD_PLANETS.map((planet) => {
    let lon: number
    if (planet === 'earth') lon = norm(pos.sun + 180)
    else if (planet === 'southNode') lon = norm(pos.node + 180)
    else lon = pos[planet]
    return { planet, lon, ...gateAndLine(lon) }
  })
}

function components(defined: Set<CenterId>, channels: [number, number][]): CenterId[][] {
  const adj = new Map<CenterId, Set<CenterId>>()
  for (const c of defined) adj.set(c, new Set())
  for (const [a, b] of channels) {
    const ca = GATE_CENTER[a]
    const cb = GATE_CENTER[b]
    adj.get(ca)?.add(cb)
    adj.get(cb)?.add(ca)
  }
  const seen = new Set<CenterId>()
  const out: CenterId[][] = []
  for (const start of defined) {
    if (seen.has(start)) continue
    const comp: CenterId[] = []
    const stack = [start]
    seen.add(start)
    while (stack.length) {
      const c = stack.pop() as CenterId
      comp.push(c)
      for (const n of adj.get(c) ?? []) {
        if (!seen.has(n)) {
          seen.add(n)
          stack.push(n)
        }
      }
    }
    out.push(comp)
  }
  return out
}

export function computeHumanDesign(birthUtc: Date): HdChart {
  const dDate = designDate(birthUtc)
  const personality = activations(birthUtc)
  const design = activations(dDate)

  const gates = new Map<number, { personality: boolean; design: boolean }>()
  for (const a of personality) gates.set(a.gate, { personality: true, design: gates.get(a.gate)?.design ?? false })
  for (const a of design) gates.set(a.gate, { personality: gates.get(a.gate)?.personality ?? false, design: true })

  const channels = CHANNELS.filter(([a, b]) => gates.has(a) && gates.has(b))
  const defined = new Set<CenterId>()
  for (const [a, b] of channels) {
    defined.add(GATE_CENTER[a])
    defined.add(GATE_CENTER[b])
  }

  const comps = components(defined, channels)
  const compOf = (c: CenterId) => comps.find((x) => x.includes(c)) ?? []
  const connected = (a: CenterId, b: CenterId) => defined.has(a) && compOf(a).includes(b)
  const motorToThroat = MOTORS.some((m) => connected(m, 'throat'))
  const hasChannel = (x: number, y: number) => channels.some(([a, b]) => (a === x && b === y) || (a === y && b === x))

  let type: HdType
  if (defined.size === 0) type = 'reflector'
  else if (defined.has('sacral')) type = motorToThroat ? 'manifestingGenerator' : 'generator'
  else if (motorToThroat) type = 'manifestor'
  else type = 'projector'

  let authority: HdAuthority
  if (type === 'reflector') authority = 'lunar'
  else if (defined.has('solar')) authority = 'emotional'
  else if (defined.has('sacral')) authority = 'sacral'
  else if (defined.has('spleen')) authority = 'splenic'
  else if (defined.has('heart')) authority = hasChannel(21, 45) ? 'egoManifested' : 'egoProjected'
  else if (defined.has('g') && connected('g', 'throat')) authority = 'selfProjected'
  else authority = 'mental'

  const definition: HdDefinition = (['none', 'single', 'split', 'tripleSplit', 'quadrupleSplit'] as const)[Math.min(comps.length, 4)]

  const pSun = personality[0]
  const pEarth = personality[1]
  const dSun = design[0]
  const dEarth = design[1]
  const profile: [number, number] = [pSun.line, dSun.line]
  const angle = pSun.line === 4 && dSun.line === 1 ? 'juxtaposition' : pSun.line >= 5 ? 'left' : 'right'

  return {
    designDate: dDate,
    personality,
    design,
    gates,
    channels,
    defined,
    type,
    authority,
    profile,
    definition,
    cross: { gates: [pSun.gate, pEarth.gate, dSun.gate, dEarth.gate], angle },
  }
}
