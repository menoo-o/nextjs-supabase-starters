'use server'


import { redirect } from 'next/navigation'
import { z } from "zod"; // Make sure to import z
import { registerSchema } from '@/lib/zod/signupSchema';
import { SignUpState } from '@/lib/types/type';
import { createClient } from '@/utils/supabase/server'


export async function signupAction(
  prevState: SignUpState,
  formData: FormData
) : Promise<SignUpState> {

  // extract raw input
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  // Validate with Zod
    const parseResult = registerSchema.safeParse(raw);

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

const {error} = await supabase.auth.signUp({
  // error here: Object literal may only specify known properties, and 'name' does not exist in type 'SignUpWithPasswordCredentials'.ts(2353)
  email: data.email,
  password: data.password,
  options:{
    data:{
       name:data.name, // ✅ putting additional info here
    }
  }
});
  

  if (error) {
    return{
      error: error.message,
      issues:{},
      infoMessage: null,
    };
  }

  return{
    error: null,
    issues: {},
    infoMessage: "Check your email to confirm your account!",
  } 
  


}