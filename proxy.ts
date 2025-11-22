import { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware"

export function proxy(request: NextRequest) {

  // Job2: update session (for dashboard + account)
  return updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",  // protected
    "/account/:path*",             //  redirect only
  ],
};