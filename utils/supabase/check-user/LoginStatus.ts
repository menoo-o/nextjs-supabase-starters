'use server'

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function redirectIfLoggedIn(to: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect(to);
  }
}
