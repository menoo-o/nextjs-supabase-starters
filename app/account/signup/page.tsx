'use client'

import React, { use } from 'react'
import { signupAction } from './actions'
import { useActionState } from 'react';
import './signup.css'

const registerState = {
  error: null,
  issues: {},
  infoMessage: null,
};

export default function SignUpForm(){
  const [state, formAction, isPending] = useActionState(
    signupAction,
    registerState
  );

  return(
    <form action={formAction} className='signup-form'>
     
      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          disabled={isPending}
          className={state.issues?.name ? "input-error" : ""}
        />

        {state.issues?.name && (
        <p className="error">{state.issues.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={isPending}
          aria-invalid={!!state.issues?.email}
          aria-describedby={state.issues?.email ? "email-error" : undefined}
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

       <button type="submit" disabled={isPending}>
      {isPending ? "Signing up..." : "Sign Up"}
      </button>

       {/* Info message */}
      {state.infoMessage && (
        <p className="info-message">{state.infoMessage}</p>
      )}

      {/*Global form error  */}
      {state.error && (
      <p className="error global-error">{state.error}</p>
      )}



    </form>
  )
}