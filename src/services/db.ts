import { openDB } from "idb";
import type { Activity } from "../types/Activity";

const DB_NAME = "agenda-db";
const STORE_NAME = "activities";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

// CRUD

export const getAllActivities = async (): Promise<Activity[]> => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const addActivityDB = async (activity: Activity) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, activity);
};

export const updateActivityDB = async (activity: Activity) => {
  const db = await dbPromise;
  await db.put(STORE_NAME, activity);
};

export const deleteActivityDB = async (id: string) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};