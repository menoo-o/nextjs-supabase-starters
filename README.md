Next.js 15 + Supabase SSR Authentication (Login + Signup)

A complete, modern authentication setup using:

Next.js 15 server actions

Supabase Auth with SSR

Zod v4 validation

useActionState for forms

proxy middleware for protected routes

Inline form errors (Zod)

Info messages (signup confirmation)

This README explains what was built, how it works, and how to extend it later.

📁 Project Overview

This auth setup includes:

1. Zod Schemas

For validating login + signup input on the server.

2. Server Actions (loginAction, signupAction)

  -Accept validated form data

  -Return typed state (errors, issues, infoMessage)

  -No redirects unless necessary

  -Work seamlessly with useActionState

3. Reusable Initial State Objects

Ensures the form knows how to react to errors, success, and pending states.

4. Supabase SSR Client

Used inside server actions to perform login/signup securely.

5. Protected Routes via proxy.ts

Modern replacement for old Next.js middleware.
This setup ensures:

 -Only authenticated users can access /dashboard/**

 -Redirects users to login

 -Allows future expansions (role-based auth, route-specific rules)

6. Clean Form Components

Signup + login forms show:

 -Inline error messages

 -Disabled states

 -Success banners

No client-side JS needed beyond React

**🚀 How the Flow Works**

1. User submits form → useActionState runs the server action

2. Server Action validates input (Zod)

3. Server Action communicates with Supabase
   
4. Signup returns an info message

5. Protected Routes via proxy