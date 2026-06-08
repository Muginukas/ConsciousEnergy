export type CategorySlug =
  | 'breathwork'
  | 'meditation'
  | 'yoga'
  | 'kundalini'
  | 'chakras'
  | 'energy'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Locale = 'en' | 'lt'

export interface Technique {
  title: string
  slug: string
  category: CategorySlug
  difficulty: Difficulty
  duration: string
  tradition?: string
  overview: string
  benefits: string[]
  contraindications: string[]
  tips?: string[]
  science?: string
  relatedTechniques?: string[]
  isFeatured?: boolean
  bestFor?: string[]
}

export interface TechniqueWithContent extends Technique {
  content: string
}

export interface Category {
  slug: CategorySlug
  label: string
  labelLt: string
  description: string
  descriptionLt: string
  color: string
  icon: string
  count?: number
  intro?: string
}
