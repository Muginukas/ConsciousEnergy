import { Category, CategorySlug } from './types'

export const CATEGORIES: Category[] = [
  {
    slug: 'breathwork',
    label: 'Breathwork',
    labelLt: 'Kvėpavimo Praktikos',
    description:
      'Conscious breathing techniques to energize, calm, and transform your state of being.',
    descriptionLt:
      'Sąmoningo kvėpavimo technikos energijai, ramybei ir vidinei transformacijai.',
    color: '#2D6A4F',
    icon: 'Wind',
  },
  {
    slug: 'meditation',
    label: 'Meditation',
    labelLt: 'Meditacija',
    description:
      'Ancient and modern practices to quiet the mind, deepen awareness, and cultivate inner peace.',
    descriptionLt:
      'Senovinės ir šiuolaikinės praktikos protui nuraminti ir vidinei ramybei atrasti.',
    color: '#4A4580',
    icon: 'Moon',
  },
  {
    slug: 'yoga',
    label: 'Yoga',
    labelLt: 'Joga',
    description:
      'Postures, breathwork, and philosophy to unite body, mind, and spirit.',
    descriptionLt:
      'Pozos, kvėpavimas ir filosofija kūnui, protui ir dvasiai suvienyti.',
    color: '#7C5C3E',
    icon: 'Flower',
  },
  {
    slug: 'kundalini',
    label: 'Kundalini',
    labelLt: 'Kundalini',
    description:
      'Practices to awaken the dormant life-force energy coiled at the base of the spine.',
    descriptionLt:
      'Praktikos pabudinančios gyvybinę Kundalini energiją stuburo apačioje.',
    color: '#C17A24',
    icon: 'Flame',
  },
  {
    slug: 'chakras',
    label: 'Chakra System',
    labelLt: 'Čakrų Sistema',
    description:
      'Explore and activate the seven energy centers that govern your physical and spiritual vitality.',
    descriptionLt:
      'Pažinkite ir aktyvuokite septynias energijos centrus, valdančius jūsų gyvybingumą.',
    color: '#6B3FA0',
    icon: 'Circle',
  },
  {
    slug: 'energy',
    label: 'Energy & Qigong',
    labelLt: 'Energija ir Qigong',
    description:
      'Cultivate and circulate life-force energy through movement, breath, and intention.',
    descriptionLt:
      'Ugdykite ir judinkite gyvybinę energiją per judėjimą, kvėpavimą ir intenciją.',
    color: '#6B8F71',
    icon: 'Zap',
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<CategorySlug, Category>

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as CategorySlug[]
