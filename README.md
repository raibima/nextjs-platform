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
- **Planned**:
  - Internationalization (i18n)
  - AI SDK
  - Unit test
  - E2E browser test

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

- **Schema location**: Database schema is defined in [`src/lib/db.ts`](src/lib/db.ts).
- **Drizzle config**: See [`drizzle.config.ts`](drizzle.config.ts) for Drizzle Kit configuration.

### Running migrations

1. Generate migrations (after editing your schema):
   ```sh
   bunx drizzle-kit generate:pg
   # or npx drizzle-kit generate:pg
   ```
2. Apply migrations to your database:
   ```sh
   bunx drizzle-kit push:pg
   # or npx drizzle-kit push:pg
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
- [Zod](https://zod.dev/) (validation)
- [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Husky](https://typicode.github.io/husky/)

---

## Folder Structure

```
nextjs-platform/
├── src/
│   ├── app/           # Next.js app directory (entry, layout, global styles)
│   ├── components/
│   │   └── ui/        # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utility functions
├── public/            # Static assets
├── .husky/            # Git hooks
├── .eslintrc, .prettierrc, etc. # Config files
└── ...
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
