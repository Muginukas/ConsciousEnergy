import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['lt', 'en']
// Most users are Lithuanian, so Lithuanian is the default. A visitor who
// switches language keeps that choice via the NEXT_LOCALE cookie.
const DEFAULT_LOCALE = 'lt'
const LOCALE_COOKIE = 'NEXT_LOCALE'

function getLocale(request: NextRequest): string {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  return saved && LOCALES.includes(saved) ? saved : DEFAULT_LOCALE
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = LOCALES.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  if (!hasLocale) {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // Refresh the Supabase session cookie so it stays valid across requests —
  // setAll rebuilds `response` because cookies can only be attached to a
  // response that wraps the (possibly cookie-mutated) request.
  let response = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Without Supabase config (e.g. a preview environment) just serve the page.
  if (!supabaseUrl || !supabaseKey) return response

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Never let a slow or unreachable auth server block page rendering:
  // cap the session refresh and fall through on timeout or error.
  try {
    await Promise.race([
      supabase.auth.getUser(),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ])
  } catch {
    // ignore — the page still renders, the user just appears signed out
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public|images|.*\\..*).*)'],
}
