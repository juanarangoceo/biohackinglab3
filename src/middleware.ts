import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Apply 301 redirect for non-www domain
  if (url.hostname === 'biohackinglab3.com') {
    url.hostname = 'www.biohackinglab3.com'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

// Optionally configure paths to match
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
