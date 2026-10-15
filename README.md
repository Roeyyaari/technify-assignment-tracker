# Assignment Tracker

A small web app for keeping track of school assignments. Add assignments with a course, name, due date and status, and they persist in Supabase across page refreshes.

## Features

- Add assignments with a course, assignment name, due date and status (Not Started, In Progress, Completed)
- Form validation with inline error messages
- Assignments saved to and loaded from Supabase, so they persist after a refresh
- Delete an assignment, with a confirmation prompt
- Responsive layout with light and dark mode

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [Supabase](https://supabase.com) (Postgres database)
- [Vercel](https://vercel.com) (deployment)

## Running Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root (see below).

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Restart the dev server after changing `.env.local`.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-OR-PUBLISHABLE-KEY
```

Find both in your Supabase project under **Project Settings → API**. Use the bare project URL (no `/rest/v1/` suffix) and the anon/publishable key, never the `service_role` key. See `.env.example`.

## Database

The app expects an `assignments` table in Supabase with `id`, `course`, `name`, `due_date`, `status` and `created_at` columns. Row Level Security must allow the `anon` role to select, insert and delete rows.

## Deployment

Deploy to Vercel and add the same two environment variables under **Project Settings → Environment Variables**, then redeploy. The app currently has no authentication, so anyone with access to the site can read, add and delete assignments.
