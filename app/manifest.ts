import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ConsciousEnergy — Breathwork, Meditation & Yoga',
    short_name: 'ConsciousEnergy',
    description:
      'A curated library of breathwork, meditation, yoga, kundalini, and energy practices for expanded consciousness.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf5ee',
    theme_color: '#2d6a4f',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
