import {pgTable, text} from 'drizzle-orm/pg-core';

export const globals = pgTable('globals', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});
