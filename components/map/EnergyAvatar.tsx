'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VIBRATION_TIERS } from '@/lib/vibration'
import { Locale } from '@/lib/types'

type Side = 'front' | 'back'

type Props = {
  lang: string
  activeChakraId: string | null
  onChakra: (id: string) => void
}

/** Traditional lotus-petal counts per chakra, by tier.level. */
const PETALS: Record<number, number> = { 7: 16, 6: 2, 5: 16, 4: 12, 3: 10, 2: 6, 1: 4 }

/** Hotspot positions (% of the stage) per side, keyed by tier.level. Placeholder
 *  anatomy — recalibrated against the real avatar PNG once it lands. */
const CHAKRA_POINTS: Record<Side, Record<number, { x: number; y: number }>> = {
  front: {
    7: { x: 50, y: 6 },
    6: { x: 50, y: 12 },
    5: { x: 50, y: 19 },
    4: { x: 50, y: 32 },
    3: { x: 50, y: 44 },
    2: { x: 50, y: 56 },
    1: { x: 50, y: 64 },
  },
  back: {
    7: { x: 50, y: 6 },
    6: { x: 50, y: 12 },
    5: { x: 50, y: 20 },
    4: { x: 50, y: 33 },
    3: { x: 50, y: 45 },
    2: { x: 50, y: 57 },
    1: { x: 50, y: 65 },
  },
}

const MIN_SCALE = 1
const MAX_SCALE = 4

export default function EnergyAvatar({ lang, activeChakraId, onChakra }: Props) {
  const lt = (lang as Locale) === 'lt'
  const [side, setSide] = useState<Side>('front')
  const [imgOk, setImgOk] = useState(true)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [gesturing, setGesturing] = useState(false)

  // Gesture bookkeeping (refs avoid re-renders mid-gesture).
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null)
  const panStart = useRef<{ x: number; y: number; px: number; py: number } | null>(null)

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))

  const zoomBy = (factor: number) => {
    setScale((s) => {
      const next = clampScale(s * factor)
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
  }
  const reset = () => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }
  const flip = () => {
    setSide((s) => (s === 'front' ? 'back' : 'front'))
    setPan({ x: 0, y: 0 })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    setGesturing(true)
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale }
      panStart.current = null
    } else if (pointers.current.size === 1 && scale > 1) {
      panStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      setScale(clampScale((pinchStart.current.scale * dist) / pinchStart.current.dist))
    } else if (pointers.current.size === 1 && panStart.current) {
      setPan({
        x: panStart.current.px + (e.clientX - panStart.current.x),
        y: panStart.current.py + (e.clientY - panStart.current.y),
      })
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchStart.current = null
    if (pointers.current.size === 0) {
      panStart.current = null
      setGesturing(false)
    }
  }

  const tiers = [...VIBRATION_TIERS].sort((a, b) => b.level - a.level)

  return (
    <div className="relative h-full w-full select-none">
      {/* Stage (zoom/pan surface) */}
      <div
        className="absolute inset-0 touch-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: scale > 1 ? 'grab' : 'default' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: gesturing ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          {/* Aura — soft breathing glow behind the figure */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[60%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(157,107,214,0.22) 0%, rgba(80,127,212,0.10) 45%, transparent 72%)',
            }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Torus — two faint rings + a single downward vortex sweep */}
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 h-[94%] w-[64%] -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 100 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="avatar-torus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cda8f0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#5ee7d8" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <ellipse cx={50} cy={80} rx={46} ry={70} fill="none" stroke="url(#avatar-torus)" strokeWidth={0.4} />
            <ellipse cx={50} cy={80} rx={30} ry={74} fill="none" stroke="url(#avatar-torus)" strokeWidth={0.4} />
            <motion.line
              x1={50}
              x2={50}
              stroke="#cda8f0"
              strokeWidth={0.8}
              strokeLinecap="round"
              animate={{ y1: [8, 152], y2: [20, 158], opacity: [0, 0.7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeIn' }}
            />
          </svg>

          {/* Figure — PNG when present, elegant placeholder otherwise */}
          <AnimatePresence mode="wait">
            <motion.div
              key={side}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {imgOk ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`/avatar-${side}.png`}
                  alt=""
                  className="h-full w-full object-contain"
                  onError={() => setImgOk(false)}
                  draggable={false}
                />
              ) : (
                <PlaceholderFigure />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Chakra yantra hotspots */}
          {tiers.map((tier) => {
            const p = CHAKRA_POINTS[side][tier.level]
            const on = activeChakraId === tier.id
            return (
              <button
                key={tier.id}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => onChakra(tier.id)}
                className="absolute z-10 aspect-square w-[10%] min-w-7 max-w-12 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: !activeChakraId || on ? 1 : 0.6 }}
                aria-label={lt ? tier.chakraLt : tier.chakra}
                aria-pressed={on}
              >
                <ChakraYantra level={tier.level} color={tier.chakraColor} petals={PETALS[tier.level]} active={on} />
              </button>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 right-2 z-20 flex flex-col gap-1.5">
        <Ctrl label={lt ? 'Apsukti' : 'Flip'} onClick={flip}>⟳</Ctrl>
        <Ctrl label={lt ? 'Priartinti' : 'Zoom in'} onClick={() => zoomBy(1.4)}>+</Ctrl>
        <Ctrl label={lt ? 'Atitolinti' : 'Zoom out'} onClick={() => zoomBy(1 / 1.4)}>−</Ctrl>
        <Ctrl label={lt ? 'Atstatyti' : 'Reset'} onClick={reset}>⤢</Ctrl>
      </div>

      {/* Side label */}
      <span
        className="absolute left-2 top-3 z-20 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest"
        style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-ui)' }}
      >
        {side === 'front' ? (lt ? 'Priekis' : 'Front') : lt ? 'Nugara' : 'Back'}
      </span>
    </div>
  )
}

function Ctrl({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none transition-colors"
      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'var(--font-ui)' }}
    >
      {children}
    </button>
  )
}

/** Placeholder shown until avatar-front/back.png are added. */
function PlaceholderFigure() {
  return (
    <svg viewBox="0 0 120 320" preserveAspectRatio="xMidYMid meet" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke="rgba(205,168,240,0.5)" strokeWidth={0.9} strokeLinejoin="round">
        <ellipse cx={60} cy={27} rx={8.5} ry={11} />
        <path d="M50,44 C43,47 40,60 43,90 L47,150 C48,164 49,172 51,180 L54,306 L59,306 L60,184 L61,306 L66,306 C68,172 69,164 70,150 L77,90 C80,60 77,47 70,44 C66,53 54,53 50,44 Z" />
        <path d="M49,48 C42,55 39,82 41,122 L44,121 C45,88 47,62 51,50 Z" />
        <path d="M71,48 C78,55 81,82 79,122 L76,121 C75,88 73,62 69,50 Z" />
      </g>
    </svg>
  )
}

/** The traditional central geometry of each chakra's yantra, by tier.level. */
function yantraShape(level: number) {
  switch (level) {
    case 1:
      return (
        <>
          <rect x={13} y={13} width={14} height={14} />
          <path d="M14,15 L26,15 L20,26 Z" />
        </>
      )
    case 2:
      return (
        <>
          <circle cx={20} cy={20} r={6.5} />
          <path d="M13.5,18 A8,8 0 0 0 26.5,18" fill="none" />
        </>
      )
    case 3:
      return <path d="M13,14 L27,14 L20,27 Z" />
    case 4:
      return (
        <>
          <path d="M20,12 L12,25 L28,25 Z" />
          <path d="M20,28 L12,15 L28,15 Z" />
        </>
      )
    case 5:
      return (
        <>
          <path d="M13,14 L27,14 L20,27 Z" />
          <circle cx={20} cy={19} r={3} />
        </>
      )
    case 6:
      return <path d="M13,15 L27,15 L20,28 Z" />
    case 7:
      return (
        <>
          <circle cx={20} cy={20} r={6.5} />
          <circle cx={20} cy={20} r={3.5} />
        </>
      )
    default:
      return null
  }
}

/** A chakra yantra: lotus petals enclosing the chakra's sacred geometry + bindu. */
function ChakraYantra({ level, color, petals, active }: { level: number; color: string; petals: number; active: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-full w-full"
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      aria-hidden="true"
    >
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx={20}
          cy={6.5}
          rx={1.8}
          ry={4.4}
          fill={color}
          fillOpacity={active ? 0.85 : 0.5}
          transform={`rotate(${(i / petals) * 360} 20 20)`}
        />
      ))}
      <circle cx={20} cy={20} r={9} fill="none" stroke={color} strokeOpacity={0.8} strokeWidth={0.9} />
      <g fill={color} fillOpacity={0.18} stroke={color} strokeOpacity={0.95} strokeWidth={1} strokeLinejoin="round">
        {yantraShape(level)}
      </g>
      <circle cx={20} cy={20} r={1.7} fill="#fff" fillOpacity={0.95} />
      {active && <circle cx={20} cy={20} r={13} fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={0.7} />}
    </svg>
  )
}
