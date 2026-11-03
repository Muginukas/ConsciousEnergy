'use client'

import dynamic from 'next/dynamic'

// Calculators read saved birth data from this device, so they render in the browser only.
export const NatalChartClient = dynamic(() => import('./NatalChartView'), { ssr: false })
export const HumanDesignClient = dynamic(() => import('./HumanDesignView'), { ssr: false })
export const NameVibrationClient = dynamic(() => import('./NameVibrationView'), { ssr: false })
