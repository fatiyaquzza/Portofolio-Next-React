# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server with Turbopack (default: http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint via next lint
```

## Architecture

This is a **Next.js 15.4 App Router** portfolio site with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui** (new-york style).

### Backend

- **Firebase** (`lib/firebase.ts`) — Auth (Google OAuth) + Firestore database
- **Firestore CRUD** (`lib/firestoreCrud.ts`) — typed helpers for `experiences` and `projects` collections. Sorts client-side by `createdAt` descending.
- **Cloudinary** (`lib/cloudinary.ts`) — unsigned upload preset for project images
- **Nodemailer** API route at `POST /api/send-email` — sends contact form emails via Gmail SMTP

### Auth & Route Protection

- **`context/AuthContext.tsx`** — `AuthProvider` wraps the app, exposes `{ user, signOut }` via `useAuth()`. User is `User | null | undefined` (undefined = loading).
- **`app/components/protectedDashboard.tsx`** — client-side route guard. Redirects unauthenticated users away from `/dashboard/*`. Admin email is hardcoded (`fatiyaquzzaaa@gmail.com`).
- **No `middleware.ts`** — all auth is client-side only.

### Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Home page (hero, experience, projects, contact) |
| `/login` | `app/login/page.tsx` | Google OAuth sign-in |
| `/dashboard` | `app/dashboard/page.tsx` | Admin hub |
| `/dashboard/experiences` | `app/dashboard/experiences/page.tsx` | Experiences CRUD |
| `/dashboard/projects` | `app/dashboard/projects/page.tsx` | Projects CRUD + Cloudinary upload |
| `POST /api/send-email` | `app/api/send-email/route.ts` | Contact form email |

### Component Layout

- **`app/layout.tsx`** — root layout: Poppins font, `AuthProvider`, `ProtectedDashboard` wrapper
- **`app/page.tsx`** — home page (client component) composes section components: `Awal`, `Experience`, `Project`, `Contact`, `Cform`
- **`app/components/`** — shared components:
  - `DarkVeil/` — WebGL animated shader background (OGL)
  - `Lanyard/` — 3D interactive ID lanyard (Three.js + Rapier physics)
  - `TextType/` — typewriter animation (GSAP)
  - `ScrollFloat/` — scroll-triggered character float (GSAP ScrollTrigger)
  - `ScrollVelocity/` — parallax scrolling text (Framer Motion)
  - `ScrambledText/` — mouse-hover text scramble (GSAP)
  - `ui/card-hover-effect.tsx` — project card grid with hover overlay
  - `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js`)
- **CSS variables** in `app/globals.css` for shadcn/ui theming (light/dark, OKLCH colors)
- **`tw-animate-css`** for animation utilities
- Dark navy/purple/blue theme with glassmorphism effects

### Path Alias

`@/*` maps to project root (configured in `tsconfig.json`).

## Conventions

- Most page components use `"use client"` — their data fetching (Firestore, fetch) happens client-side
- Auth state: check `useAuth().user` — `null` = logged out, `undefined` = loading
- Firestore data: use helpers from `lib/firestoreCrud.ts` rather than raw Firestore SDK calls
- Class merging: use `cn()` from `app/components/lib/utils.ts`

## Key Gotchas

- **`.env` is committed** — contains Firebase config and Gmail credentials. The Firebase API key is public by design; the Gmail app password is not.
- **No server-side route protection** — dashboard routes are only guarded by the client-side `ProtectedDashboard` component. The actual data is protected by Firestore security rules (server-side).
- **Firestore sorting** — queries don't use `orderBy` on the server; documents are sorted client-side by `createdAt.toMillis()`. Documents without `createdAt` get timestamp 0 and sort to the bottom.
- **Tailwind v4** — uses `@import "tailwindcss"` in CSS (not `@tailwind base/components/utilities`). Theme is configured inline in `globals.css` via `@theme inline`, not in a JS config file.
