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

### E2E Testing Setup

The application is fully prepared for end-to-end testing with **Playwright**.

#### Test ID Architecture

- **Naming Convention**: `[context]-[element-type]-[identifier]`
- **Dynamic IDs**: Support for parameterized identifiers (e.g., `globals-table-row-${key}`)
- **Centralized Management**: All test IDs defined in `e2e/test-helpers.ts`

#### Key Test IDs

**Authentication Flow:**

- `auth-signed-out-container` - Signed out state
- `auth-signed-in-container` - Signed in state
- `auth-sign-in-button` - Sign in button
- `auth-sign-up-button` - Sign up button
- `auth-user-button` - User profile button

**Globals Module:**

- `globals-page-container` - Main page container
- `globals-button-add` - Add global button
- `globals-table-container` - Data table
- `globals-table-row-{key}` - Specific table row
- `globals-button-edit-{key}` - Edit button for specific global
- `globals-button-delete-{key}` - Delete button for specific global
- `globals-form-add-dialog` - Add form dialog
- `globals-form-edit-dialog` - Edit form dialog
- `globals-form-key-input` - Key input field
- `globals-form-value-input` - Value input field
- `globals-form-button-submit` - Form submit button

**Toast Notifications:**

- `globals-toast-add-success` - Success adding global
- `globals-toast-add-error` - Error adding global
- `globals-toast-update-success` - Success updating global
- `globals-toast-delete-success` - Success deleting global
- `globals-toast-delete-error` - Error deleting global

#### Test Helper Utilities

Use the test helper functions for consistent test development:

```typescript
import {testIds, selectors, testPatterns} from './test-helpers';

// Basic usage
await page.click(selectors.byTestId(testIds.globals.buttonAdd));

// Dynamic IDs
await page.click(selectors.byTestId(testIds.globals.buttonEdit('myKey')));

// Wait for toast
await page.waitForSelector(testPatterns.waitForToast('success', 'add'));
```

#### Playwright Integration

To set up Playwright testing:

```bash
npm init playwright@latest
```

The application includes comprehensive test IDs for:

- Authentication flows
- CRUD operations (Create, Read, Update, Delete)
- Form interactions and validation
- Loading states and error handling
- Toast notification verification

### Unit Testing

Currently planned but not implemented:

- Component unit tests
- Utility function tests
