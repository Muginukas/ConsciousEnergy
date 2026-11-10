import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/content'
import { CATEGORY_SLUGS } from '@/lib/categories'
import { ZODIAC_SLUGS } from '@/lib/zodiac'

const BASE_URL = 'https://consciousenergy.lt'
const LOCALES = ['en', 'lt']

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    entries.push({ url: `${BASE_URL}/${locale}`, priority: 1.0 })
    entries.push({ url: `${BASE_URL}/${locale}/techniques`, priority: 0.9 })
    entries.push({ url: `${BASE_URL}/${locale}/about`, priority: 0.6 })
    entries.push({ url: `${BASE_URL}/${locale}/zodiac`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/zodiac/natal-chart`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/zodiac/human-design`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/zodiac/name-vibration`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/food-pyramid`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/food-combining`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/food-menu`, priority: 0.8 })
    entries.push({ url: `${BASE_URL}/${locale}/food-kitchen`, priority: 0.8 })

    for (const sign of ZODIAC_SLUGS) {
      entries.push({ url: `${BASE_URL}/${locale}/zodiac/${sign}`, priority: 0.7 })
    }

    for (const category of CATEGORY_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/techniques/${category}`,
        priority: 0.8,
      })
    }

    for (const { category, slug } of slugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/techniques/${category}/${slug}`,
        priority: 0.7,
      })
    }
  }

  return entries
}
