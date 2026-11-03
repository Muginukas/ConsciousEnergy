/**
 * Pythagorean name numerology.
 * A=1 … I=9, J=1 … R=9, S=1 … Z=8. Lithuanian letters are reduced to their
 * base letter (ą→a, č→c, ė→e, š→s, ž→z …). Y counts as a vowel (as in Lithuanian).
 */

const VALUES: Record<string, number> = Object.fromEntries(
  'abcdefghijklmnopqrstuvwxyz'.split('').map((ch, i) => [ch, (i % 9) + 1])
)
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y'])
export const MASTER = new Set([11, 22, 33])

export function baseLetter(ch: string): string {
  return ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

export function reduce(n: number, keepMaster = true): number {
  while (n > 9 && !(keepMaster && MASTER.has(n))) {
    n = String(n)
      .split('')
      .reduce((s, d) => s + Number(d), 0)
  }
  return n
}

export interface LetterInfo {
  char: string
  value: number | null
  vowel: boolean
}

export function letters(word: string): LetterInfo[] {
  return [...word].map((char) => {
    const b = baseLetter(char)
    const value = VALUES[b] ?? null
    return { char, value, vowel: value !== null && VOWELS.has(b) }
  })
}

interface PartNumbers {
  expression: number
  soul: number
  personality: number
  rawExpression: number
}

function partNumbers(word: string): PartNumbers {
  const ls = letters(word).filter((l) => l.value !== null)
  const sum = (f: (l: LetterInfo) => boolean) => ls.filter(f).reduce((s, l) => s + (l.value as number), 0)
  const raw = sum(() => true)
  return {
    rawExpression: raw,
    expression: reduce(raw),
    soul: reduce(sum((l) => l.vowel)),
    personality: reduce(sum((l) => !l.vowel)),
  }
}

export interface NameReading {
  first: PartNumbers
  last: PartNumbers | null
  /** whole name: each part reduced, then combined (standard method) */
  expression: number
  soul: number
  personality: number
  cornerstone: { char: string; value: number } | null
  firstVowel: { char: string; value: number } | null
  /** how many letters carry each number 1..9 */
  counts: number[]
  missing: number[]
  hiddenPassion: number[]
  lifePath: number | null
  birthday: number | null
  maturity: number | null
}

const combine = (a: number, b: number | undefined) => reduce(a + (b ?? 0))

export function readName(firstName: string, lastName: string, birthDate?: string): NameReading {
  const fn = firstName.trim()
  const ln = lastName.trim()
  const first = partNumbers(fn)
  const last = ln ? partNumbers(ln) : null

  const all = letters(fn + ln).filter((l) => l.value !== null)
  const counts = Array.from({ length: 9 }, (_, i) => all.filter((l) => l.value === i + 1).length)
  const max = Math.max(...counts)
  const hiddenPassion = max > 0 ? counts.map((c, i) => (c === max ? i + 1 : 0)).filter(Boolean) : []
  const missing = counts.map((c, i) => (c === 0 ? i + 1 : 0)).filter(Boolean)

  const firstLetters = letters(fn).filter((l) => l.value !== null)
  const corner = firstLetters[0]
  const vowel = firstLetters.find((l) => l.vowel)

  let lifePath: number | null = null
  let birthday: number | null = null
  if (birthDate && /^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    const [y, m, d] = birthDate.split('-').map(Number)
    const digits = (n: number) => String(n).split('').reduce((s, x) => s + Number(x), 0)
    lifePath = reduce(reduce(digits(m)) + reduce(digits(d)) + reduce(digits(y)))
    birthday = reduce(d)
  }

  const expression = combine(first.expression, last?.expression)
  return {
    first,
    last,
    expression,
    soul: combine(first.soul, last?.soul),
    personality: combine(first.personality, last?.personality),
    cornerstone: corner ? { char: corner.char.toUpperCase(), value: corner.value as number } : null,
    firstVowel: vowel ? { char: vowel.char.toUpperCase(), value: vowel.value as number } : null,
    counts,
    missing,
    hiddenPassion,
    lifePath,
    birthday,
    maturity: lifePath !== null ? reduce(lifePath + expression) : null,
  }
}
