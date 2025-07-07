'use server';

import {
  createGlobal,
  deleteGlobal,
  updateGlobal,
  getGlobalByKey,
} from '../model/Global';

export async function addGlobalAction(key: string, value: string) {
  // Check if key already exists
  const existingGlobal = await getGlobalByKey(key);
  if (existingGlobal) {
    throw new Error(`A global with key "${key}" already exists`);
  }

  await createGlobal(key, value);
}

export async function updateGlobalAction(key: string, value: string) {
  await updateGlobal(key, value);
}

export async function deleteGlobalAction(key: string) {
  await deleteGlobal(key);
}
