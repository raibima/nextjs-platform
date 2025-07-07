import {db} from '@/core/db';
import {globals} from '@/core/db-schema';
import {eq} from 'drizzle-orm';

interface GlobalDto {
  key: string;
  value: string;
}

export async function getGlobalByKey(key: string): Promise<GlobalDto | null> {
  const result = await db.select().from(globals).where(eq(globals.key, key));
  if (result.length === 0) return null;
  const row = result[0];
  return {
    key: row.key,
    value: row.value,
  };
}

export async function createGlobal(
  key: string,
  value: string,
): Promise<GlobalDto> {
  await db.insert(globals).values({key, value});
  return {key, value};
}

export async function getAllGlobals(): Promise<GlobalDto[]> {
  const rows = await db.select().from(globals);
  return rows.map((row) => ({
    key: row.key,
    value: row.value,
  }));
}

export async function updateGlobal(
  key: string,
  value: string,
): Promise<GlobalDto> {
  await db.update(globals).set({value}).where(eq(globals.key, key));
  return {key, value};
}

export async function deleteGlobal(key: string): Promise<void> {
  await db.delete(globals).where(eq(globals.key, key));
}
