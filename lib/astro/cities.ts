export interface Place {
  name: string
  country: string
  lat: number
  lon: number
  tz: string
}

/** Offline fallback list, used when the online place search is unavailable. */
export const CITIES: Place[] = [
  { name: 'Vilnius', country: 'Lietuva', lat: 54.6872, lon: 25.2797, tz: 'Europe/Vilnius' },
  { name: 'Kaunas', country: 'Lietuva', lat: 54.8985, lon: 23.9036, tz: 'Europe/Vilnius' },
  { name: 'Klaipėda', country: 'Lietuva', lat: 55.7033, lon: 21.1443, tz: 'Europe/Vilnius' },
  { name: 'Šiauliai', country: 'Lietuva', lat: 55.9349, lon: 23.3137, tz: 'Europe/Vilnius' },
  { name: 'Panevėžys', country: 'Lietuva', lat: 55.7348, lon: 24.3575, tz: 'Europe/Vilnius' },
  { name: 'Alytus', country: 'Lietuva', lat: 54.3963, lon: 24.0459, tz: 'Europe/Vilnius' },
  { name: 'Marijampolė', country: 'Lietuva', lat: 54.5593, lon: 23.3541, tz: 'Europe/Vilnius' },
  { name: 'Mažeikiai', country: 'Lietuva', lat: 56.3092, lon: 22.3415, tz: 'Europe/Vilnius' },
  { name: 'Jonava', country: 'Lietuva', lat: 55.0727, lon: 24.2797, tz: 'Europe/Vilnius' },
  { name: 'Utena', country: 'Lietuva', lat: 55.4979, lon: 25.5998, tz: 'Europe/Vilnius' },
  { name: 'Kėdainiai', country: 'Lietuva', lat: 55.2883, lon: 23.9748, tz: 'Europe/Vilnius' },
  { name: 'Telšiai', country: 'Lietuva', lat: 55.9814, lon: 22.2472, tz: 'Europe/Vilnius' },
  { name: 'Tauragė', country: 'Lietuva', lat: 55.2522, lon: 22.2897, tz: 'Europe/Vilnius' },
  { name: 'Ukmergė', country: 'Lietuva', lat: 55.2459, lon: 24.7604, tz: 'Europe/Vilnius' },
  { name: 'Visaginas', country: 'Lietuva', lat: 55.5986, lon: 26.4386, tz: 'Europe/Vilnius' },
  { name: 'Palanga', country: 'Lietuva', lat: 55.9175, lon: 21.0686, tz: 'Europe/Vilnius' },
  { name: 'Druskininkai', country: 'Lietuva', lat: 54.0154, lon: 23.9858, tz: 'Europe/Vilnius' },
  { name: 'Riga', country: 'Latvia', lat: 56.9496, lon: 24.1052, tz: 'Europe/Riga' },
  { name: 'Tallinn', country: 'Estonia', lat: 59.437, lon: 24.7536, tz: 'Europe/Tallinn' },
  { name: 'Warsaw', country: 'Poland', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw' },
  { name: 'Minsk', country: 'Belarus', lat: 53.9006, lon: 27.559, tz: 'Europe/Minsk' },
  { name: 'Kaliningrad', country: 'Russia', lat: 54.7104, lon: 20.4522, tz: 'Europe/Kaliningrad' },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173, tz: 'Europe/Moscow' },
  { name: 'Saint Petersburg', country: 'Russia', lat: 59.9311, lon: 30.3609, tz: 'Europe/Moscow' },
  { name: 'Kyiv', country: 'Ukraine', lat: 50.4501, lon: 30.5234, tz: 'Europe/Kyiv' },
  { name: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384, tz: 'Europe/Helsinki' },
  { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686, tz: 'Europe/Stockholm' },
  { name: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522, tz: 'Europe/Oslo' },
  { name: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683, tz: 'Europe/Copenhagen' },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lon: 13.405, tz: 'Europe/Berlin' },
  { name: 'Munich', country: 'Germany', lat: 48.1351, lon: 11.582, tz: 'Europe/Berlin' },
  { name: 'Hamburg', country: 'Germany', lat: 53.5511, lon: 9.9937, tz: 'Europe/Berlin' },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam' },
  { name: 'Brussels', country: 'Belgium', lat: 50.8503, lon: 4.3517, tz: 'Europe/Brussels' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { name: 'Manchester', country: 'United Kingdom', lat: 53.4808, lon: -2.2426, tz: 'Europe/London' },
  { name: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603, tz: 'Europe/Dublin' },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid' },
  { name: 'Barcelona', country: 'Spain', lat: 41.3874, lon: 2.1686, tz: 'Europe/Madrid' },
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393, tz: 'Europe/Lisbon' },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome' },
  { name: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.19, tz: 'Europe/Rome' },
  { name: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738, tz: 'Europe/Vienna' },
  { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, tz: 'Europe/Zurich' },
  { name: 'Prague', country: 'Czechia', lat: 50.0755, lon: 14.4378, tz: 'Europe/Prague' },
  { name: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402, tz: 'Europe/Budapest' },
  { name: 'Athens', country: 'Greece', lat: 37.9838, lon: 23.7275, tz: 'Europe/Athens' },
  { name: 'Istanbul', country: 'Türkiye', lat: 41.0082, lon: 28.9784, tz: 'Europe/Istanbul' },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { name: 'Delhi', country: 'India', lat: 28.6139, lon: 77.209, tz: 'Asia/Kolkata' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, tz: 'Asia/Bangkok' },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074, tz: 'Asia/Shanghai' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { name: 'New York', country: 'USA', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { name: 'Chicago', country: 'USA', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
  { name: 'Montreal', country: 'Canada', lat: 45.5017, lon: -73.5673, tz: 'America/Toronto' },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333, tz: 'America/Sao_Paulo' },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
]

/** Online search (Open-Meteo geocoding, free, no key). Falls back to the local list. */
export async function searchPlaces(query: string, lang: string): Promise<Place[]> {
  const q = query.trim()
  if (q.length < 2) return []
  const local = CITIES.filter((c) =>
    c.name.toLocaleLowerCase().startsWith(q.toLocaleLowerCase())
  )
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 5000)
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=${lang}&format=json`,
      { signal: ctrl.signal }
    )
    clearTimeout(t)
    if (!res.ok) return local
    const data = (await res.json()) as {
      results?: { name: string; country?: string; admin1?: string; latitude: number; longitude: number; timezone?: string }[]
    }
    const remote: Place[] = (data.results ?? [])
      .filter((r) => r.timezone)
      .map((r) => ({
        name: r.name,
        country: [r.admin1, r.country].filter(Boolean).join(', '),
        lat: r.latitude,
        lon: r.longitude,
        tz: r.timezone as string,
      }))
    return remote.length ? remote : local
  } catch {
    return local
  }
}
