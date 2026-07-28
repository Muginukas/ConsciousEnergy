import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'lt']
const DEFAULT_LOCALE = 'en'

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferred = acceptLang.split(',')[0].split('-')[0].toLowerCase()
  return LOCALES.includes(preferred) ? preferred : DEFAULT_LOCALE
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
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Missing/invalid Supabase config must not take down routing for the
  // whole site — session refresh is best-effort, not a hard dependency.
  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
  })

  try {
    await supabase.auth.getUser()
  } catch {
    // Network/config errors while refreshing the session should not break
    // navigation; the page itself will handle an unauthenticated state.
  }

  return response
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public|images|.*\\..*).*)'],
}
