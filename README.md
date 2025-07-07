# Next.js Platform

A modern, extensible Next.js starter platform with authentication, a comprehensive UI component library, and a robust developer experience. Built with TypeScript, Tailwind CSS, shadcn/ui, and Drizzle ORM for Postgres.

---

## Features

- **Authentication**: Integrated with [Clerk](https://clerk.com/) for user management and authentication flows.
- **UI Component Library**: Accessible, customizable components built on [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/).
- **Prettier + Husky**: Enforced code style and pre-commit hooks for consistent formatting and linting.
- **TypeScript**: Full type safety across the codebase.
- **Tailwind CSS**: Utility-first styling with custom themes and animations.
- **Custom Hooks & Utilities**: Includes `useIsMobile` for responsive logic and `cn` for className merging.
- **Modern React**: Uses React 19 features and best practices.
- **Database**: Integrated with [Drizzle ORM](https://orm.drizzle.team/) and PostgreSQL for type-safe database access.
- **Module Architecture**: Domain-driven design with separate model, action, and client layers.
- **E2E Testing**: Comprehensive end-to-end testing with Playwright and centralized test ID management.
- **Planned**:
  - Internationalization (i18n)
  - AI SDK
  - Unit test

---

## Getting Started

### 1. Install dependencies

```sh
bun install # or npm install / yarn install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root and add your Postgres connection string:

```env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
```

Replace `user`, `password`, `localhost`, and `mydb` with your Postgres credentials.

### 3. Run the development server

```sh
bun run dev # or npm run dev / yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Lint and format code

```sh
bun run lint      # Lint code
bun run format    # Format code with Prettier
```

---

## Database & Migrations

This project uses [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL for type-safe database access.

- **Schema location**: Database schema is defined in [`src/core/db-schema.ts`](src/core/db-schema.ts).
- **Database connection**: Connection setup in [`src/core/db.ts`](src/core/db.ts).
- **Drizzle config**: See [`drizzle.config.ts`](drizzle.config.ts) for Drizzle Kit configuration.

### Applying Schema Changes

1. After editing your schema, push changes directly to your database:
   ```sh
   bunx drizzle-kit push
   ```
2. Open Drizzle Studio for database management:
   ```sh
   bunx drizzle-kit studio
   ```

> Ensure your `DATABASE_URL` is set in `.env.local` before running these commands.

---

## Development Workflow

- **Pre-commit hooks**: Husky runs lint-staged to auto-format and lint code before commits.
- **Linting**: ESLint with Next.js and TypeScript rules.
- **Formatting**: Prettier with custom config.

---

## Tech Stack

- [Next.js](https://nextjs.org/) 15+
- [React](https://react.dev/) 19+
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- [Clerk](https://clerk.com/) (authentication)
- [Drizzle ORM](https://orm.drizzle.team/) (database)
- [Playwright](https://playwright.dev/) (E2E testing)
- [Zod](https://zod.dev/) (validation)
- [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Husky](https://typicode.github.io/husky/)

---

## Folder Structure

```
nextjs-platform/
├── src/
│   ├── app/           # Next.js app directory (pages, layouts, global styles)
│   ├── components/    # shadcn/ui components and custom hooks
│   │   ├── hooks/     # Custom React hooks (useIsMobile, etc.)
│   │   └── lib/       # Utility functions (cn, etc.)
│   ├── core/          # Database configuration and schemas
│   │   ├── db.ts      # Database connection setup
│   │   └── db-schema.ts # Database table definitions
│   ├── modules/       # Feature modules (domain-driven architecture)
│   │   └── sample-crud/
│   │       ├── action/    # Server actions
│   │       ├── client/    # Client components
│   │       └── model/     # Database models
│   └── middleware.ts  # Authentication middleware
├── e2e/              # End-to-end tests
│   ├── test-helpers.ts   # Test utilities and test IDs
│   └── *.spec.ts        # Playwright test files
├── public/           # Static assets
├── drizzle/          # Database migrations
├── playwright.config.ts # Playwright configuration
└── ...
```

---

## Module Architecture

This project follows a domain-driven architecture where features are organized into modules:

### Module Structure

Each module in `src/modules/` contains:

- **`model/`**: Database operations and business logic
- **`action/`**: Server actions for Next.js App Router
- **`client/`**: Client-side components and hooks

### Example Module

```
src/modules/sample-crud/
├── action/
│   └── CRUDPageAction.ts    # Server actions for CRUD operations
├── client/
│   ├── CRUDForm.tsx         # Form components
│   ├── CRUDPage.tsx         # Main page component
│   └── CRUDTable.tsx        # Table components
└── model/
    └── Global.ts            # Database model
```

---

## Testing

### End-to-End Testing

This project includes comprehensive E2E testing with Playwright:

- **Test IDs**: Centralized test ID management in `e2e/test-helpers.ts`
- **Naming Convention**: `[context]-[element-type]-[identifier]`
- **Dynamic IDs**: Support for parameterized identifiers
- **Utilities**: Helper functions for consistent test development

#### Running E2E Tests

```bash
# Install Playwright browsers (first time only)
bunx playwright install

# Run tests
bunx playwright test

# Run tests with UI
bunx playwright test --ui

# Run specific test file
bunx playwright test e2e/sample-crud.spec.ts
```

#### Test ID Examples

```typescript
// Static test IDs
testIds.globals.buttonAdd; // 'globals-button-add'
testIds.auth.signInButton; // 'auth-sign-in-button'

// Dynamic test IDs
testIds.globals.tableRow('myKey'); // 'globals-table-row-myKey'
testIds.globals.buttonEdit('myKey'); // 'globals-button-edit-myKey'
```

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

[MIT](LICENSE) (or specify your license here)
