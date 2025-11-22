'use server'

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value }) => supabaseResponse.cookies.set(name, value))
        },
      },
    }
  )

  // IMPORTANT: Don't remove getClaims()
   const startTime = Date.now()
   const {data} = await supabase.auth.getClaims()
   const user = data?.claims

    // 1. User is logged in → block access to login/signup
    if (
      user &&
      (
        request.nextUrl.pathname.startsWith('/account/login') ||
        request.nextUrl.pathname.startsWith('/account/signup')
      )
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    // 2. User not logged in → block access to protected pages
    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/account/login') &&
      !request.nextUrl.pathname.startsWith('/account/signup')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/account/login'
      return NextResponse.redirect(url)
    }

  return supabaseResponse
}