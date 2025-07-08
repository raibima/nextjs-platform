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

- `bunx drizzle-kit push` - Push schema changes directly to database
- `bunx drizzle-kit studio` - Open Drizzle Studio for database management

### Testing Commands

- `bunx playwright test` - Run all E2E tests
- `bunx playwright test --ui` - Run tests with Playwright UI
- `bunx playwright test e2e/sample-crud.spec.ts` - Run specific test file
- `bunx playwright install` - Install Playwright browsers (first time only)
- `bunx playwright codegen` - Generate tests with Playwright codegen

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

### Component Architecture

- **src/components/** is strictly for UI (design system-level) components only
- Page / feature-level UI should live inside either:
  - The page.tsx itself (server components)
  - src/modules/[feature]/client (client components)

### Database Layer

- Uses Drizzle ORM with PostgreSQL
- Database schema defined in `src/core/db-schema.ts`
- Database connection in `src/core/db.ts`
- Migrations stored in `./drizzle/` directory

### Module Pattern

The project follows a module-based architecture:

- **Model layer**: Database operations and business logic following specific patterns
- **Action layer**: Server actions for form handling and business logic (e.g., `CRUDPageAction.ts`)
- **Client layer**: Client-side components and hooks

#### Model Layer Requirements

A "model" must have:

1. **A DTO (Data Transfer Object) interface** that defines the structure of the data (exported)
2. **Functions to interact with the database** which operate on the DTO (exported)

**Important**: Do NOT use classes for models. Use functional approach with exported interfaces and functions.

#### Example Model Structure (`Global.ts`)

```typescript
// DTO Interface
export interface GlobalDto {
  key: string;
  value: string;
}

// Database functions
export async function getGlobalByKey(key: string): Promise<GlobalDto | null>;
export async function createGlobal(
  key: string,
  value: string,
): Promise<GlobalDto>;
export async function getAllGlobals(): Promise<GlobalDto[]>;
export async function updateGlobal(
  key: string,
  value: string,
): Promise<GlobalDto>;
export async function deleteGlobal(key: string): Promise<void>;
```

**Model Function Patterns**:

- Use async/await for all database operations
- Return DTOs or null for single record queries
- Return arrays of DTOs for list queries
- Use void return type for delete operations
- All functions should be exported for reuse

#### Action Layer Requirements

Server actions must follow these patterns:

1. **'use server' directive**: All action files must start with `'use server';`
2. **Import model functions**: Use model layer functions for database operations
3. **Export async functions**: All actions must be exported async functions
4. **Business logic validation**: Handle validation and business rules before calling model functions

#### Error Handling in Actions

**Important patterns for error handling**:

- Use try-catch blocks to catch errors but **do not throw them**
- React rewrites error messages for security reasons
- Return values that indicate errors (e.g., `null` or objects with `error` property)
- Client components should check return values and handle errors accordingly
- **Note**: Next.js APIs like `redirect` and `notFound` cannot be used inside try-catch blocks

#### Example Action Structure (`CRUDPageAction.ts`)

```typescript
'use server';

import {
  createGlobal,
  deleteGlobal,
  updateGlobal,
  getGlobalByKey,
} from '../model/Global';

export async function addGlobalAction(key: string, value: string) {
  // Business logic validation
  const existingGlobal = await getGlobalByKey(key);
  if (existingGlobal) {
    throw new Error(`A global with key "${key}" already exists`);
  }

  // Call model function
  await createGlobal(key, value);
}

export async function updateGlobalAction(key: string, value: string) {
  await updateGlobal(key, value);
}

export async function deleteGlobalAction(key: string) {
  await deleteGlobal(key);
}
```

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

**Sample CRUD Module:**

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

Playwright is already configured in this project. The configuration is in `playwright.config.ts`.

The application includes comprehensive test IDs for:

- Authentication flows
- CRUD operations (Create, Read, Update, Delete)
- Form interactions and validation
- Loading states and error handling
- Toast notification verification

#### Running Tests

```bash
# Run all tests
bunx playwright test

# Run tests with UI mode
bunx playwright test --ui

# Run specific test file
bunx playwright test e2e/sample-crud.spec.ts

# Generate test code
bunx playwright codegen http://localhost:3000
```

#### Test Development Best Practices

1. **Use centralized test IDs** - All test IDs are defined in `e2e/test-helpers.ts`
2. **Follow naming convention** - `[context]-[element-type]-[identifier]`
3. **Use helper functions** - Leverage `selectors.byTestId()` and other utilities
4. **Test client-side navigation** - Verify no full page refreshes occur during SPA interactions
5. **Handle dynamic content** - Use unique timestamps for test data to avoid conflicts

### Unit Testing

Currently planned but not implemented:

- Component unit tests
- Utility function tests

## Development Workflow

### Creating New Modules

When creating new feature modules, follow this pattern:

1. **Create module directory**: `src/modules/[module-name]/`
2. **Add model layer**: `src/modules/[module-name]/model/[Model].ts`
3. **Add action layer**: `src/modules/[module-name]/action/[ModuleName]Action.ts`
4. **Add client layer**: `src/modules/[module-name]/client/[ComponentName].tsx`
5. **Add page**: `src/app/[module-name]/page.tsx`
6. **Add tests**: `e2e/[module-name].spec.ts`
7. **Update test IDs**: Add new test IDs to `e2e/test-helpers.ts`

### Example: Sample CRUD Module

The `sample-crud` module demonstrates the complete pattern:

```
src/modules/sample-crud/
├── model/
│   └── Global.ts           # Database operations
├── action/
│   └── CRUDPageAction.ts   # Server actions
└── client/
    ├── CRUDPage.tsx        # Main page component
    ├── CRUDForm.tsx        # Form component
    └── CRUDTable.tsx       # Table component
```

### Database Schema Changes

1. **Update schema**: Modify `src/core/db-schema.ts`
2. **Push changes**: Run `bunx drizzle-kit push` to apply schema changes directly
3. **Update models**: Update relevant model files in `src/modules/*/model/`
4. **Update types**: Ensure TypeScript types are updated

### Adding Test IDs

1. **Define test IDs**: Add new test IDs to `e2e/test-helpers.ts`
2. **Follow convention**: Use `[context]-[element-type]-[identifier]` format
3. **Support dynamic IDs**: Create functions for parameterized identifiers
4. **Add to components**: Include `data-testid` attributes in components
5. **Write tests**: Create corresponding test files in `e2e/`

## Important Notes

- **Always run lint and format** before committing changes
- **Use TypeScript strictly** - no `any` types without good reason
- **Follow the module pattern** - keep features organized in their own modules
- **Test everything** - add test IDs to all interactive elements
- **Keep database operations in models** - don't put database calls in components or actions directly
