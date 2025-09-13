import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { locales } from './lib/constants'
import { getLocale } from './lib/i18n-server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: '/((?!api|_next|_vercel|docs|.*\\..*).*)'
}
