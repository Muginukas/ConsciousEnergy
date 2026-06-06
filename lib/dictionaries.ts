import 'server-only'
import { Locale } from './types'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((m) => m.default),
  lt: () => import('../dictionaries/lt.json').then((m) => m.default),
}

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
