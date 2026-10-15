# Assignment Tracker

A small Technify training project. Users will track school assignments.

## Planned feature
Add assignments with:
- Course
- Assignment name
- Due date
- Status

## Stack
- Frontend: Next.js (App Router, TypeScript, Tailwind CSS)
- Database: Supabase (`assignments` table; client in `lib/supabase.ts`; keys via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, see `.env.example`)
- Deployment: Vercel

## Principles
- Keep the project intentionally small and polished.
- No extra features or dependencies beyond what is asked.
- Never commit Supabase keys or `.env.local`. No auth, edit, delete or filtering until requested.
- Do not commit unless asked.

## Commands
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — lint

## Status / roadmap
1. [x] Initial Next.js structure and simple homepage
2. [x] Add-assignment form and list (frontend state only, in `app/assignment-tracker.tsx`; Course, Assignment name and Due date are required; Status is Not Started / In Progress / Completed). No edit, delete or filtering yet; data is lost on refresh.
3. [x] Supabase integration (load on page open, insert on submit; no auth yet)
4. [ ] Deploy to Vercel
