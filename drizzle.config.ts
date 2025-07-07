import {defineConfig} from 'drizzle-kit';
import {config} from 'dotenv';

config({path: '.env.local'});

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  dialect: 'postgresql',
  schema: './src/core/db-schema.ts',
  out: './drizzle',
});
