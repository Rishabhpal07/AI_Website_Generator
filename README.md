# AI Website Generator

An AI-powered website design generator built with Next.js 15, Clerk authentication, Tailwind CSS, and Drizzle ORM.

## Project Overview

This app lets users generate website designs from natural language prompts, manage AI-generated projects in a user workspace, and save generated layouts to a PostgreSQL database using Neon and Drizzle.

Key features:
- Authenticated user workspace with Clerk
- AI project generation and prompt-based design creation
- Project and frame storage via Drizzle ORM + PostgreSQL
- Credit-based usage with unlimited plan support
- Modern UI built with Tailwind CSS, Radix UI, and Lucide icons

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Clerk for authentication
- Drizzle ORM + drizzle-kit
- PostgreSQL / Neon
- Axios, Zod, React Hook Form
- Sonner notifications

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

## Environment Variables

Create a `.env` file with the following values depending on your setup:

- `DATABASE_URL` - PostgreSQL connection string for Neon or another Postgres provider
- Clerk environment variables needed for `@clerk/nextjs` (e.g. `CLERK_FRONTEND_API`, `CLERK_API_KEY`, etc.)

## Project Structure

- `app/` — Next.js App Router pages and API route handlers
- `components/` — UI components and reusable primitives
- `config/` — database and Drizzle schema configuration
- `context/` — React context for user details and app state
- `hooks/` — custom hooks
- `lib/` — utility helpers
- `public/` — static assets

## Usage

1. Sign in via Clerk.
2. Enter a design prompt on the home screen.
3. Create a new project and open the AI-generated workspace.
4. Manage credits and generate frames for project designs.

## Notes

- The app stores users, projects, frames, and chat content in Postgres.
- Non-unlimited users consume a credit for each generated project.
- The UI relies on Radix UI components and Tailwind styling.

## License

This project is currently private.
