"use client";

import { loginAction } from "@/app/account/login/actions";
import { useActionState } from "react";
import './form.css'
import Link from "next/link";

const initialState = {
  error: null,
  issues: {},
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  return (
    <form action={formAction} className="login-form">

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={isPending}
          className={state.issues?.email ? "input-error" : ""}
        />

        {state.issues?.email && (
        <p className="error">{state.issues.email[0]}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          disabled={isPending}
          className={state.issues?.password ? "input-error" : ""}
        />

      {state.issues?.password && (
        <p className="error">{state.issues.password[0]}</p>
      )}

      </div>

      {/* Wrong email/password */}
     {state.error && (
         <p className="error">{state.error}</p>
      )}


      <button disabled={isPending} type="submit">
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p>Haven't SignUp Up? 
        <Link
          href='/account/signup'
          className="signup-link"
      > Register Here </Link>
      </p>
    </form>
  );
}
