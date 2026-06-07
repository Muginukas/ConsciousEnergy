const CACHE_VERSION = 'ce-cache-v1'
const OFFLINE_URL = '/offline.html'

const APP_SHELL = [
  '/en',
  '/lt',
  '/en/techniques',
  '/lt/techniques',
  OFFLINE_URL,
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

function isStaticAsset(request) {
  const url = new URL(request.url)
  return (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/_next/static/') ||
      url.pathname.startsWith('/icons/') ||
      url.pathname.startsWith('/fonts/'))
  )
}

function isTechniquePage(request) {
  const url = new URL(request.url)
  return (
    url.origin === self.location.origin &&
    /^\/(en|lt)\/techniques(\/.*)?$/.test(url.pathname)
  )
}

// Cache-first: hashed static assets never change content under the same URL
async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  const cache = await caches.open(CACHE_VERSION)
  cache.put(request, response.clone())
  return response
}

// Stale-while-revalidate: serve cached content instantly, refresh in the background.
// Only HTML documents are cached — Next.js also issues RSC-payload prefetch
// requests for the same URL, which would otherwise bloat the cache as separate variants.
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_VERSION)
  const cached = await cache.match(request)
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok && (response.headers.get('content-type') || '').includes('text/html')) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => cached)
  return cached || fetchPromise
}

// Network-first navigation with an offline fallback
async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request)
    const cache = await caches.open(CACHE_VERSION)
    cache.put(request, response.clone())
    return response
  } catch {
    const cache = await caches.open(CACHE_VERSION)
    const cached = await cache.match(request)
    return cached || cache.match(OFFLINE_URL)
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request))
    return
  }

  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request))
    return
  }

  if (isTechniquePage(request)) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }
})
