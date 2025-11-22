'use server'

import { redirect } from 'next/navigation'
import { loginSchema } from '@/lib/zod/loginSchema'
import { z } from "zod"; // Make sure to import z
import { createClient } from '@/utils/supabase/server'
import { LoginState } from '@/lib/types/type';

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // Extract raw input
   const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  
   // Validate with Zod
  const parseResult = loginSchema.safeParse(raw);

  if (!parseResult.success) {
  const flattenedErrors = z.flattenError(parseResult.error);
  return {
    error: "Invalid input",
    issues: flattenedErrors.fieldErrors,
  };
}

 const data = parseResult.data; // fully typed + validated
  // Now use the validated data
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

   if (error) {
    return {
      error: null,
      issues: {},
    };
  }
 // success → redirect to dashboard
  return redirect("/dashboard");
}