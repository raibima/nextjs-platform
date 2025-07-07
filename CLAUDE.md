# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build production version
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting

### Database Commands

- `bunx drizzle-kit generate` - Generate database migrations
- `bunx drizzle-kit push` - Push schema changes to database
- `bunx drizzle-kit studio` - Open Drizzle Studio for database management

## Project Architecture

### Core Structure

- **src/core/**: Database configuration and schemas
  - `db.ts` - Database connection using Drizzle ORM
  - `db-schema.ts` - Database table definitions
- **src/modules/**: Feature modules with domain-driven structure
  - Each module contains `model/`, `action/`, and `client/` directories
  - Models handle database operations
  - Actions contain server actions for Next.js
  - Client contains client-side components
- **src/components/**: shadcn/ui components and utilities
- **src/app/**: Next.js App Router pages and layouts

### Database Layer

- Uses Drizzle ORM with PostgreSQL
- Database schema defined in `src/core/db-schema.ts`
- Database connection in `src/core/db.ts`
- Migrations stored in `./drizzle/` directory

### Module Pattern

The project follows a module-based architecture:

- **Model layer**: Database operations and business logic (e.g., `Global.ts`)
- **Action layer**: Server actions for form handling (e.g., `GlobalPageAction.ts`)
- **Client layer**: Client-side components and hooks

### Authentication

- Uses Clerk for authentication
- Authentication middleware in `src/middleware.ts`

### UI Components

- Built on shadcn/ui and Radix UI primitives
- Components in `src/components/` directory
- Utilities in `src/components/lib/utils.ts`
- Custom hooks in `src/components/hooks/`

## Environment Setup

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string

## Code Style and Formatting

- ESLint configuration in `eslint.config.mjs`
- Prettier for code formatting
- Husky pre-commit hooks with lint-staged
- TypeScript strict mode enabled

## Testing

Currently planned but not implemented:

- Unit tests
- E2E browser tests
