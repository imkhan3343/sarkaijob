# SarkariJob

A scalable, Hindi-first government jobs platform for Indian job seekers.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database:** SQLite (dev) / PostgreSQL (prod) + Prisma ORM
- **Auth:** NextAuth.js with credentials (bcrypt)
- **Validation:** Zod + React Hook Form

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your settings

# Generate Prisma client
npx prisma generate

# Push schema to database (creates SQLite file for dev)
npx prisma db push

# Seed the database with initial data
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Prisma database connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js sessions |
| `NEXTAUTH_URL` | Base URL of the application |

## Prisma Commands

| Command | Description |
|---------|-------------|
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema to database |
| `npx prisma migrate dev` | Create and apply migrations |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx tsx prisma/seed.ts` | Run seed script |

## Default Admin

- **Email:** `admin@sarkarijob.local`
- **Password:** `Admin@123`

## Project Structure

```
src/
  app/           # App Router routes
  api/           # API route handlers
  components/    # Reusable UI components
  lib/           # Utilities, config, validation
  server/        # Data access & services
  types/         # TypeScript types
  hooks/         # Custom React hooks
prisma/          # Schema & seed
```

## Phases

- **Phase 1** ✅ Foundation, admin, database, auth
- **Phase 2** Content structure & homepage data logic
- **Phase 3** Detail pages, listings, state portals, search, deep SEO
- **Phase 4** Content automation pipeline
- **Phase 5** Monetization, analytics, performance, security, launch
- **Phase 6** Scaling, data moats, owned channels, extensibility
