'use client'

import { useState, useSyncExternalStore } from 'react'
import { Download, X } from 'lucide-react'

type Dict = {
  message: string
  install: string
  dismiss: string
  iosMessage: string
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'ce-install-prompt-dismissed'

// Module-level cache for the native browser event — it fires at most once per
// page load, so it's read here (outside React state) and surfaced via the
// 'install' snapshot variant for useSyncExternalStore to pick up.
let deferredPrompt: BeforeInstallPromptEvent | null = null

type Variant = 'none' | 'ios' | 'install'

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

function subscribe(callback: () => void) {
  function handlePrompt(event: Event) {
    event.preventDefault()
    deferredPrompt = event as BeforeInstallPromptEvent
    callback()
  }
  window.addEventListener('beforeinstallprompt', handlePrompt)
  return () => window.removeEventListener('beforeinstallprompt', handlePrompt)
}

function getSnapshot(): Variant {
  if (isStandalone() || localStorage.getItem(DISMISS_KEY) === '1') return 'none'
  if (deferredPrompt) return 'install'
  if (isIOS()) return 'ios'
  return 'none'
}

function getServerSnapshot(): Variant {
  return 'none'
}

export default function InstallPrompt({ dict }: { dict: Dict }) {
  const variant = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [dismissed, setDismissed] = useState(false)

  function dismiss() {
    setDismissed(true)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  async function install() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
    dismiss()
  }

  if (dismissed || variant === 'none') return null

  const showIOSHint = variant === 'ios'

  return (
    <div
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-sm z-50 rounded-2xl p-4 flex items-start gap-3"
      style={{
        backgroundColor: 'var(--color-cream)',
        border: '1px solid var(--color-earth-200)',
        boxShadow: '0 8px 30px rgba(45, 106, 79, 0.15)',
      }}
    >
      <div
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-forest-700)', color: 'var(--color-cream)' }}
      >
        <Download size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
        >
          {showIOSHint ? dict.iosMessage : dict.message}
        </p>
        {!showIOSHint && (
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={install}
              className="text-sm font-medium px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-forest-700)',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {dict.install}
            </button>
            <button
              onClick={dismiss}
              className="text-sm transition-colors hover:text-[--color-forest-700]"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}
            >
              {dict.dismiss}
            </button>
          </div>
        )}
      </div>
      <button
        onClick={dismiss}
        aria-label={dict.dismiss}
        className="shrink-0 p-1 rounded-full transition-colors hover:bg-[--color-earth-50]"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <X size={16} />
      </button>
    </div>
  )
}
