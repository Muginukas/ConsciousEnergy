/**
 * Convert a wall-clock date/time in an IANA time zone to a UTC Date.
 * Uses the runtime's tz database, so historical offsets (DST, Soviet-era
 * time in Lithuania, etc.) are respected.
 */
function zoneOffsetMs(utcMs: number, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const parts = Object.fromEntries(dtf.formatToParts(new Date(utcMs)).map((p) => [p.type, p.value]))
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second)
  )
  return asUtc - utcMs
}

export function localToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): Date {
  const wall = Date.UTC(year, month - 1, day, hour, minute)
  let utc = wall - zoneOffsetMs(wall, timeZone)
  // second pass settles DST edges
  utc = wall - zoneOffsetMs(utc, timeZone)
  return new Date(utc)
}

export function utcOffsetLabel(date: Date, timeZone: string): string {
  const mins = Math.round(zoneOffsetMs(date.getTime(), timeZone) / 60000)
  const sign = mins >= 0 ? '+' : '−'
  const a = Math.abs(mins)
  return `UTC${sign}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`
}
