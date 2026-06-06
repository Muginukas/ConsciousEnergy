import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Technique, TechniqueWithContent, CategorySlug, Locale } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getTechniquesDir(locale: Locale, category?: string): string {
  const base = path.join(CONTENT_DIR, locale, 'techniques')
  return category ? path.join(base, category) : base
}

function fileToTechnique(
  filePath: string,
  locale: Locale,
  category: CategorySlug
): Technique | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const slug = path.basename(filePath, '.mdx')
    return {
      slug,
      category,
      title: data.title ?? '',
      difficulty: data.difficulty ?? 'beginner',
      duration: data.duration ?? '',
      tradition: data.tradition,
      overview: data.overview ?? '',
      benefits: data.benefits ?? [],
      contraindications: data.contraindications ?? [],
      tips: data.tips,
      science: data.science,
      relatedTechniques: data.relatedTechniques,
      isFeatured: data.isFeatured ?? false,
    } as Technique
  } catch {
    // Fall back to English if locale file doesn't exist
    if (locale !== 'en') {
      return fileToTechnique(
        filePath.replace(`/${locale}/`, '/en/'),
        'en',
        category
      )
    }
    return null
  }
}

export function getAllTechniques(locale: Locale = 'en'): Technique[] {
  const categories = fs
    .readdirSync(path.join(CONTENT_DIR, 'en', 'techniques'))
    .filter((d) => fs.statSync(path.join(CONTENT_DIR, 'en', 'techniques', d)).isDirectory())

  const techniques: Technique[] = []

  for (const category of categories) {
    const enDir = path.join(CONTENT_DIR, 'en', 'techniques', category)
    const files = fs.readdirSync(enDir).filter((f) => f.endsWith('.mdx'))

    for (const file of files) {
      const localePath = path.join(CONTENT_DIR, locale, 'techniques', category, file)
      const enPath = path.join(enDir, file)

      const filePath = fs.existsSync(localePath) ? localePath : enPath
      const t = fileToTechnique(filePath, locale, category as CategorySlug)
      if (t) techniques.push(t)
    }
  }

  return techniques
}

export function getTechniquesByCategory(
  category: CategorySlug,
  locale: Locale = 'en'
): Technique[] {
  return getAllTechniques(locale).filter((t) => t.category === category)
}

export function getTechniqueBySlug(
  category: CategorySlug,
  slug: string,
  locale: Locale = 'en'
): TechniqueWithContent | null {
  const localePath = path.join(CONTENT_DIR, locale, 'techniques', category, `${slug}.mdx`)
  const enPath = path.join(CONTENT_DIR, 'en', 'techniques', category, `${slug}.mdx`)

  let filePath = fs.existsSync(localePath) ? localePath : enPath
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    category,
    title: data.title ?? '',
    difficulty: data.difficulty ?? 'beginner',
    duration: data.duration ?? '',
    tradition: data.tradition,
    overview: data.overview ?? '',
    benefits: data.benefits ?? [],
    contraindications: data.contraindications ?? [],
    tips: data.tips,
    science: data.science,
    relatedTechniques: data.relatedTechniques,
    isFeatured: data.isFeatured ?? false,
    content,
  }
}

export function getFeaturedTechniques(locale: Locale = 'en'): Technique[] {
  return getAllTechniques(locale).filter((t) => t.isFeatured)
}

export function getAllSlugs(): { category: string; slug: string }[] {
  const categories = fs
    .readdirSync(path.join(CONTENT_DIR, 'en', 'techniques'))
    .filter((d) => fs.statSync(path.join(CONTENT_DIR, 'en', 'techniques', d)).isDirectory())

  const slugs: { category: string; slug: string }[] = []
  for (const category of categories) {
    const dir = path.join(CONTENT_DIR, 'en', 'techniques', category)
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
    for (const file of files) {
      slugs.push({ category, slug: path.basename(file, '.mdx') })
    }
  }
  return slugs
}
